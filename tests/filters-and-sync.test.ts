import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  Z_ANATOMY_CATALOG,
  Z_ANATOMY_BY_NODE,
  sanitizeNodeName,
} from '../src/shared/constants/zAnatomyCatalog.ts';
import { buildTaxonomicTree, detectRegion } from '../src/shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree } from '../src/shared/utils/filterTaxonomicTree.ts';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';

describe('Filtros Anatômicos, Outliner e Sincronização 3D Suite', () => {
  const tree = buildTaxonomicTree(Z_ANATOMY_CATALOG);

  beforeEach(() => {
    useAnatomyStore.getState().showAll();
  });

  describe('1. Sanitização Canônica Three.js (PropertyBinding.sanitizeNodeName)', () => {
    it('deve sanitizar nomes com pontos, espaços e caracteres especiais conforme o Three.js', () => {
      expect(sanitizeNodeName('Clavicle.l')).toBe('Claviclel');
      expect(sanitizeNodeName('Frontal bone')).toBe('Frontal_bone');
      expect(sanitizeNodeName('Parietal bone.r')).toBe('Parietal_boner');
      expect(sanitizeNodeName('First rib (T1).l')).toBe('First_rib_(T1)l');
    });

    it('deve garantir que 100% dos nós de skeletal_male.glb sejam indexados por Z_ANATOMY_BY_NODE', () => {
      const glbPath = path.resolve(__dirname, '../public/models/anatomy/skeletal_male.glb');
      const buffer = fs.readFileSync(glbPath);
      const jsonLength = buffer.readUInt32LE(12);
      const jsonBuffer = buffer.subarray(20, 20 + jsonLength);
      const gltf = JSON.parse(jsonBuffer.toString('utf-8'));

      const meshNodeNames: string[] = [];
      for (const node of gltf.nodes) {
        if (node.mesh !== undefined && node.name) {
          meshNodeNames.push(node.name);
        }
      }

      expect(meshNodeNames.length).toBe(335);

      for (const rawName of meshNodeNames) {
        const sanName = sanitizeNodeName(rawName);
        const item = Z_ANATOMY_BY_NODE[rawName] || Z_ANATOMY_BY_NODE[sanName];
        expect(item).toBeDefined();
      }
    });
  });

  describe('2. Detecção e Filtragem de Regiões Anatômicas', () => {
    it('deve classificar clavícula e escápula em upper_limb e não em thorax', () => {
      const clavicle = Z_ANATOMY_CATALOG.find((i) => i.node === 'Clavicle.l')!;
      const scapula = Z_ANATOMY_CATALOG.find((i) => i.node === 'Scapula.r')!;

      expect(detectRegion(clavicle)).toBe('upper_limb');
      expect(detectRegion(scapula)).toBe('upper_limb');
    });

    it('deve conter as regiões canônicas sob o sistema esquelético na árvore', () => {
      const skeletal = tree.find((n) => n.id === 'sys_skeletal')!;
      expect(skeletal).toBeDefined();

      const regionIds = skeletal.children!.map((r) => r.id);
      expect(regionIds).toContain('reg_skeletal_cranium');
      expect(regionIds).toContain('reg_skeletal_vertebral_column');
      expect(regionIds).toContain('reg_skeletal_thorax');
      expect(regionIds).toContain('reg_skeletal_upper_limb');
      expect(regionIds).toContain('reg_skeletal_pelvis');
      expect(regionIds).toContain('reg_skeletal_lower_limb');
    });
  });

  describe('3. Ocultação Dinâmica via Outliner Tree (Simulação Real)', () => {
    it('deve ocultar todos os ossos do crânio ao desmarcar o grupo Crânio & Face', () => {
      const craniumGroup = tree
        .find((n) => n.id === 'sys_skeletal')!
        .children!.find((r) => r.id === 'reg_skeletal_cranium')!;

      expect(craniumGroup).toBeDefined();

      // Desmarca o grupo Crânio & Face
      useAnatomyStore.getState().toggleGroupVisibility(craniumGroup.descendantIds);
      const hiddenSet = useAnatomyStore.getState().hiddenNodeIds;

      // Verifica ossos cranianos chave no GLB
      const cranialMeshNames = ['Frontal_bone', 'Occipital_bone', 'Parietal_bonel', 'Mandible'];

      for (const meshName of cranialMeshNames) {
        const item = Z_ANATOMY_BY_NODE[meshName] || Z_ANATOMY_BY_NODE[sanitizeNodeName(meshName)];
        const isHidden =
          hiddenSet.has(item?.id || '') ||
          hiddenSet.has(item?.node || '') ||
          hiddenSet.has(meshName) ||
          (item ? hiddenSet.has(sanitizeNodeName(item.node)) : false);

        expect(isHidden).toBe(true);
      }

      // Ossos de outras regiões (ex: fêmur, costelas) NÃO devem ser ocultados
      const nonCranialMeshNames = ['Femurl', 'First_rib_T1l', 'T12_vertebra'];
      for (const meshName of nonCranialMeshNames) {
        const item = Z_ANATOMY_BY_NODE[meshName] || Z_ANATOMY_BY_NODE[sanitizeNodeName(meshName)];
        const isHidden =
          hiddenSet.has(item?.id || '') ||
          hiddenSet.has(item?.node || '') ||
          hiddenSet.has(meshName) ||
          (item ? hiddenSet.has(sanitizeNodeName(item.node)) : false);

        expect(isHidden).toBe(false);
      }
    });

    it('deve ocultar a clavícula ao desmarcar Bones of upper limb', () => {
      const upperLimb = tree
        .find((n) => n.id === 'sys_skeletal')!
        .children!.find((r) => r.id === 'reg_skeletal_upper_limb')!;

      expect(upperLimb).toBeDefined();

      useAnatomyStore.getState().toggleGroupVisibility(upperLimb.descendantIds);
      const hiddenSet = useAnatomyStore.getState().hiddenNodeIds;

      const clavicleItem = Z_ANATOMY_BY_NODE['Claviclel'];
      expect(clavicleItem).toBeDefined();

      const isHidden =
        hiddenSet.has(clavicleItem?.id || '') ||
        hiddenSet.has(clavicleItem?.node || '') ||
        hiddenSet.has('Claviclel') ||
        hiddenSet.has(sanitizeNodeName(clavicleItem?.node || ''));

      expect(isHidden).toBe(true);
    });
  });

  describe('4. Busca Textual no Outliner (Auto-Expansão e Filtro)', () => {
    it('deve localizar a clavícula na busca textual', () => {
      const filtered = filterTaxonomicTree(tree, 'clavicula');
      expect(filtered.length).toBeGreaterThan(0);

      const sys = filtered.find((s) => s.id === 'sys_skeletal');
      expect(sys).toBeDefined();

      const upper = sys!.children!.find((r) => r.id === 'reg_skeletal_upper_limb');
      expect(upper).toBeDefined();
    });

    it('deve retornar vazio de forma segura para termo inexistente', () => {
      const filtered = filterTaxonomicTree(tree, 'termo_totalmente_inexistente_xyz_123');
      expect(filtered.length).toBe(0);
    });
  });
});

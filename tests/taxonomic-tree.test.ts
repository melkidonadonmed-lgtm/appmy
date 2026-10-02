import { describe, it, expect, beforeEach } from 'vitest';
import { Z_ANATOMY_CATALOG } from '../src/shared/constants/zAnatomyCatalog.ts';
import { buildTaxonomicTree } from '../src/shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree } from '../src/shared/utils/filterTaxonomicTree.ts';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';

describe('Taxonomic Tree & State Management Suite', () => {
  const tree = buildTaxonomicTree(Z_ANATOMY_CATALOG);

  it('deve gerar a árvore taxonômica com todos os sistemas canônicos ordenados', () => {
    expect(tree.length).toBeGreaterThan(0);

    // O primeiro sistema deve ser o Esquelético (ordem médica canônica craniocaudal)
    expect(tree[0].id).toBe('sys_skeletal');
    expect(tree[0].type).toBe('system');
    expect(tree[0].children).toBeDefined();
    expect(tree[0].children!.length).toBeGreaterThan(0);
  });

  it('deve contabilizar e agregar os descendantIds em cada nível da hierarquia', () => {
    const skeletalSystem = tree.find((n) => n.id === 'sys_skeletal')!;
    expect(skeletalSystem).toBeDefined();
    expect(skeletalSystem.descendantIds.length).toBeGreaterThan(0);

    // O total de descendentes deve ser igual à soma dos descendentes das regiões filhas
    const sumChildren = skeletalSystem.children!.reduce(
      (acc, c) => acc + c.descendantIds.length,
      0
    );
    expect(skeletalSystem.descendantIds.length).toBe(sumChildren);
  });

  it('deve conter as folhas anatômicas legítimas correspondentes ao catálogo Z-Anatomy', () => {
    const craniumRegion = tree
      .find((n) => n.id === 'sys_skeletal')!
      .children!.find((r) => r.id === 'reg_skeletal_cranium')!;

    expect(craniumRegion).toBeDefined();
    expect(craniumRegion.descendantIds.length).toBeGreaterThan(0);

    // Encontra uma folha (ex: Osso Frontal ou Vômer)
    const allCraniumLeaves: string[] = [];
    function collectLeaves(node: typeof tree[0]) {
      if (node.type === 'leaf') {
        allCraniumLeaves.push(node.id);
      } else if (node.children) {
        node.children.forEach(collectLeaves);
      }
    }
    collectLeaves(craniumRegion);

    expect(allCraniumLeaves.length).toBeGreaterThan(0);
    expect(allCraniumLeaves.some((id) => id.includes('frontal') || id.includes('vomer'))).toBe(true);
  });

  it('deve filtrar estruturas por busca textual preservando a linhagem pai-filho', () => {
    const filtered = filterTaxonomicTree(tree, 'Frontal');
    expect(filtered.length).toBeGreaterThan(0);

    // Deve conter o sistema esquelético como ancestral
    const sys = filtered.find((n) => n.id === 'sys_skeletal');
    expect(sys).toBeDefined();

    // Deve conter a região do crânio
    const cranium = sys!.children!.find((r) => r.id === 'reg_skeletal_cranium');
    expect(cranium).toBeDefined();

    // Toda folha retornada deve combinar com "frontal" (case-insensitive)
    let foundFrontalLeaf = false;
    function checkLeaves(node: typeof tree[0]) {
      if (node.type === 'leaf') {
        if (
          node.namePt.toLowerCase().includes('frontal') ||
          (node.nameTA2 && node.nameTA2.toLowerCase().includes('frontal'))
        ) {
          foundFrontalLeaf = true;
        }
      } else if (node.children) {
        node.children.forEach(checkLeaves);
      }
    }
    checkLeaves(cranium!);
    expect(foundFrontalLeaf).toBe(true);
  });

  describe('Zustand useAnatomyStore Tri-State & Visibility', () => {
    beforeEach(() => {
      useAnatomyStore.getState().showAll();
    });

    it('deve calcular corretamente o estado do checkbox Tri-State', () => {
      const store = useAnatomyStore.getState();
      const testIds = ['mesh_a', 'mesh_b', 'mesh_c'];

      // Inicialmente todos visíveis -> 'checked'
      expect(store.getGroupCheckboxState(testIds)).toBe('checked');

      // Oculta um elemento -> 'indeterminate'
      store.toggleVisibility('mesh_a');
      expect(useAnatomyStore.getState().getGroupCheckboxState(testIds)).toBe('indeterminate');

      // Oculta todos -> 'unchecked'
      store.toggleVisibility('mesh_b');
      store.toggleVisibility('mesh_c');
      expect(useAnatomyStore.getState().getGroupCheckboxState(testIds)).toBe('unchecked');

      // Alterna o grupo inteiro de volta para visível
      useAnatomyStore.getState().toggleGroupVisibility(testIds);
      expect(useAnatomyStore.getState().getGroupCheckboxState(testIds)).toBe('checked');
    });

    it('deve isolar uma estrutura ocultando todas as outras', () => {
      const allIds = ['mesh_1', 'mesh_2', 'mesh_3', 'mesh_4'];
      const store = useAnatomyStore.getState();

      store.isolateNode('mesh_2', allIds);

      const state = useAnatomyStore.getState();
      expect(state.hiddenNodeIds.has('mesh_1')).toBe(true);
      expect(state.hiddenNodeIds.has('mesh_2')).toBe(false); // Mantido visível
      expect(state.hiddenNodeIds.has('mesh_3')).toBe(true);
      expect(state.hiddenNodeIds.has('mesh_4')).toBe(true);
    });

    it('deve restaurar a visibilidade de todas as estruturas com showAll', () => {
      const store = useAnatomyStore.getState();
      store.toggleVisibility('mesh_1');
      store.toggleVisibility('mesh_2');

      expect(useAnatomyStore.getState().hiddenNodeIds.size).toBe(2);

      useAnatomyStore.getState().showAll();
      expect(useAnatomyStore.getState().hiddenNodeIds.size).toBe(0);
    });
  });
});

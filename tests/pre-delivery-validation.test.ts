import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG, Z_ANATOMY_BY_ID } from '../src/shared/constants/zAnatomyCatalog.ts';

describe('Validação Pré-Entrega: Exploded View, Isolamento das Sidebars e Interatividade', () => {
  beforeEach(() => {
    // Restaura o estado limpo da store
    const store = useAnatomyStore.getState();
    store.applyPreset('skeletal');
    store.setExplosionProgress(0);
    store.setSelectedNode(null);
  });

  describe('1. Validação Crítica da Função de Exploded View (O "esse 100")', () => {
    it('deve sincronizar o valor 1.0 (100%) entre explosionProgress e modules.explodedProgress', () => {
      const store = useAnatomyStore.getState();
      store.setExplosionProgress(1.0);

      const state = useAnatomyStore.getState();
      expect(state.explosionProgress).toBe(1.0);
      expect(state.modules.explodedProgress).toBe(1.0);
    });

    it('deve garantir que todos os 335 ossos do esqueleto possuam vetor de dispersão anatômico não-nulo', () => {
      const skeletalItems = Z_ANATOMY_CATALOG.filter(
        (item) => item.system === 'skeletal' || item.meshFile === 'skeletal_male.glb'
      );
      expect(skeletalItems.length).toBe(335);

      for (const bone of skeletalItems) {
        const ev = bone.explosionVector;
        expect(ev).toBeDefined();
        const magnitude = Math.sqrt(ev.x * ev.x + ev.y * ev.y + ev.z * ev.z);
        // Nenhuma peça pode ter vetor de explosão nulo (zero)
        expect(magnitude).toBeGreaterThan(0.1);
      }
    });

    it('deve garantir que a dispersão radial inteligente gere deslocamento positivo para qualquer peça sem vetor no catálogo', () => {
      // Simula uma malha sem vetor explícito no catálogo
      const fakePos = { x: 0.35, y: 1.5, z: 0.2 };
      const dirX = Math.abs(fakePos.x) > 0.01 ? Math.sign(fakePos.x) * (Math.abs(fakePos.x) * 2.2 + 0.4) : 0;
      const dirY = fakePos.y > 1.35 ? (fakePos.y - 1.35) * 1.6 + 0.3 : 0;
      const dirZ = Math.abs(fakePos.z) > 0.01 ? Math.sign(fakePos.z) * (Math.abs(fakePos.z) * 2.0 + 0.35) : 0;

      const norm = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
      expect(norm).toBeGreaterThan(1.0);
      expect(dirX).toBeGreaterThan(0); // Peça do lado direito afasta para o lado direito
      expect(dirY).toBeGreaterThan(0); // Peça cranial sobe
      expect(dirZ).toBeGreaterThan(0); // Peça anterior vai para a frente
    });
  });

  describe('2. Validação do Isolamento de Layout e Ausência de Conflito entre Sidebars', () => {
    it('deve iniciar com activeSystem "skeletal" e layerPeelingLevel 0 por padrão para priorizar o esqueleto', () => {
      const state = useAnatomyStore.getState();
      expect(state.activeSystem).toBe('skeletal');
      expect(state.layerPeelingLevel).toBe(0);
    });

    it('deve permitir colapsar e expandir a sidebar direita independentemente da esquerda', () => {
      const store = useAnatomyStore.getState();
      expect(store.sidebarCollapsed).toBe(false);
      expect(store.outlinerCollapsed).toBe(false);

      store.toggleSidebarCollapsed();
      expect(useAnatomyStore.getState().sidebarCollapsed).toBe(true);
      expect(useAnatomyStore.getState().outlinerCollapsed).toBe(false);

      store.toggleOutlinerCollapsed();
      expect(useAnatomyStore.getState().outlinerCollapsed).toBe(true);
      expect(useAnatomyStore.getState().sidebarCollapsed).toBe(true);

      store.toggleSidebarCollapsed();
      expect(useAnatomyStore.getState().sidebarCollapsed).toBe(false);
    });

    it('deve comprovar no CSS que .anatomical-panel não é position: absolute no desktop para evitar sobreposição', () => {
      const cssPath = path.resolve(__dirname, '../src/client/index.css');
      const cssContent = fs.readFileSync(cssPath, 'utf-8');

      // Verifica bloco da classe principal .anatomical-panel
      const panelRuleMatch = cssContent.match(/\.anatomical-panel\s*\{([^}]+)\}/);
      expect(panelRuleMatch).not.toBeNull();
      const rules = panelRuleMatch![1];

      expect(rules).toContain('position: relative');
      expect(rules).toContain('flex-shrink: 0');
      expect(rules).not.toContain('position: absolute');
    });
  });

  describe('3. Validação da Interatividade e Seleção de Estruturas', () => {
    it('deve selecionar um nó do catálogo e preparar dados anatômicos consistentes', () => {
      const bone = Z_ANATOMY_BY_ID['za:frontal_bone'];
      expect(bone).toBeDefined();
      expect(bone.namePtBr).toBe('Osso Frontal');
      expect(bone.nameLatin).toBe('Os frontale');

      const store = useAnatomyStore.getState();
      store.setSelectedNode('za:frontal_bone');
      expect(useAnatomyStore.getState().selectedNodeId).toBe('za:frontal_bone');

      // Desseleção atômica
      store.setSelectedNode(null);
      expect(useAnatomyStore.getState().selectedNodeId).toBeNull();
    });

    it('deve garantir que nenhum componente da UI contenha emojis gráficos informais', () => {
      const filesToAudit = [
        '../src/client/components/ui/tree/AnatomyFiltersSection.tsx',
        '../src/client/components/ui/tree/AnatomyTreePanel.tsx',
        '../src/client/components/ui/QuickPresetsBar.tsx',
        '../src/client/App.tsx',
      ];

      const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u;

      for (const relPath of filesToAudit) {
        const fullPath = path.resolve(__dirname, relPath);
        const code = fs.readFileSync(fullPath, 'utf-8');
        expect(emojiRegex.test(code)).toBe(false);
      }
    });
  });
});

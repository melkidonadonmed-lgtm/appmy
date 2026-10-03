import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';
import { buildTaxonomicTree } from '../src/shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree } from '../src/shared/utils/filterTaxonomicTree.ts';
import { Z_ANATOMY_CATALOG } from '../src/shared/constants/zAnatomyCatalog.ts';

describe('Suíte de Multi-Seleção de Sistemas e Sobreposição Anatômica Cruzada', () => {
  const fullTree = buildTaxonomicTree(Z_ANATOMY_CATALOG);

  beforeEach(() => {
    useAnatomyStore.getState().setAllSystems();
    useAnatomyStore.setState({
      selectedNodeId: null,
      hiddenNodeIds: new Set<string>(),
      isolatedOnly: false,
    });
  });

  describe('1. Comportamento Reativo de Multi-Seleção no useAnatomyStore', () => {
    it('deve alternar de "all" para um sistema isolado no primeiro clique', () => {
      const store = useAnatomyStore.getState();
      expect(store.activeSystems.has('all')).toBe(true);
      expect(store.isSystemActive('respiratory')).toBe(true);
      expect(store.isSystemActive('cardiovascular')).toBe(true);

      store.toggleSystem('respiratory');
      const state1 = useAnatomyStore.getState();
      expect(state1.activeSystems.has('all')).toBe(false);
      expect(state1.activeSystems.has('respiratory')).toBe(true);
      expect(state1.activeSystems.size).toBe(1);
      expect(state1.isSystemActive('respiratory')).toBe(true);
      expect(state1.isSystemActive('cardiovascular')).toBe(false);
    });

    it('deve permitir adicionar múltiplos sistemas em camadas simultâneas', () => {
      const store = useAnatomyStore.getState();
      // Inicia com respiratório
      store.toggleSystem('respiratory');

      // Adiciona cardiovascular (Vascularização do tórax/pulmão)
      store.toggleSystem('cardiovascular');

      const state2 = useAnatomyStore.getState();
      expect(state2.activeSystems.has('respiratory')).toBe(true);
      expect(state2.activeSystems.has('cardiovascular')).toBe(true);
      expect(state2.activeSystems.has('lymphatic')).toBe(false);
      expect(state2.isSystemActive('respiratory')).toBe(true);
      expect(state2.isSystemActive('cardiovascular')).toBe(true);
      expect(state2.isSystemActive('digestive')).toBe(false);

      // Adiciona linfático
      store.toggleSystem('lymphatic');
      const state3 = useAnatomyStore.getState();
      expect(state3.activeSystems.has('lymphatic')).toBe(true);
      expect(state3.activeSystems.size).toBe(3);
    });

    it('deve remover um sistema ao clicar novamente e reverter para "all" se esvaziar', () => {
      const store = useAnatomyStore.getState();
      store.toggleSystem('respiratory');
      store.toggleSystem('cardiovascular');

      // Remove respiratório
      store.toggleSystem('respiratory');
      let state = useAnatomyStore.getState();
      expect(state.activeSystems.has('respiratory')).toBe(false);
      expect(state.activeSystems.has('cardiovascular')).toBe(true);

      // Remove cardiovascular (último ativo) -> reverte deterministicamente para "all"
      store.toggleSystem('cardiovascular');
      state = useAnatomyStore.getState();
      expect(state.activeSystems.has('all')).toBe(true);
      expect(state.isSystemActive('skeletal')).toBe(true);
    });

    it('deve restaurar todos os sistemas imediatamente com setAllSystems', () => {
      const store = useAnatomyStore.getState();
      store.toggleSystem('respiratory');
      expect(useAnatomyStore.getState().activeSystems.has('all')).toBe(false);

      store.setAllSystems();
      expect(useAnatomyStore.getState().activeSystems.has('all')).toBe(true);
    });
  });

  describe('2. Sincronização da Árvore Taxonômica com Múltiplos Sistemas Ativos', () => {
    it('deve exibir apenas os sistemas selecionados simultaneamente na árvore', () => {
      const store = useAnatomyStore.getState();
      store.toggleSystem('respiratory');
      store.toggleSystem('cardiovascular');

      const activeSystems = useAnatomyStore.getState().activeSystems;

      const visible = fullTree.filter((node) => {
        const rawSys = node.systemId || node.id.replace(/^sys_/, '');
        return activeSystems.has(rawSys as any) || activeSystems.has(node.id as any);
      });

      const sysIds = visible.map((n) => n.id);
      expect(sysIds).toContain('sys_respiratory');
      expect(sysIds).toContain('sys_cardiovascular');
      expect(sysIds).not.toContain('sys_digestive');
      expect(sysIds).not.toContain('sys_urinary');
    });
  });

  describe('3. Auditoria de Código e Componentes da Ficha Clínica (UX Blindada)', () => {
    it('deve comprovar que AnatomyClinicalCard possui botões de sobreposição de camadas', () => {
      const cardPath = path.resolve(
        __dirname,
        '../src/client/components/ui/tree/AnatomyClinicalCard.tsx'
      );
      const content = fs.readFileSync(cardPath, 'utf-8');

      expect(content).toContain('outliner-clinical-layers');
      expect(content).toContain('toggleSystem(\'cardiovascular\')');
      expect(content).toContain('toggleSystem(\'lymphatic\')');
      expect(content).toContain('toggleSystem(\'nervous\')');
      expect(content).toContain('toggleSystem(\'muscular\')');
      expect(content).toContain('toggleSystem(\'skeletal\')');
    });

    it('deve comprovar que a flecha/botão de detalhes clínicos tem tamanho acessível e rótulo claro', () => {
      const cardPath = path.resolve(
        __dirname,
        '../src/client/components/ui/tree/AnatomyClinicalCard.tsx'
      );
      const content = fs.readFileSync(cardPath, 'utf-8');

      expect(content).toContain('outliner-clinical-details-toggle');
      expect(content).toContain('ChevronUp size={16}');
      expect(content).toContain('ChevronDown size={16}');
    });

    it('não deve conter nenhum emoji gráfico no AnatomyClinicalCard ou AnatomyFiltersSection', () => {
      const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

      const files = [
        path.resolve(__dirname, '../src/client/components/ui/tree/AnatomyFiltersSection.tsx'),
        path.resolve(__dirname, '../src/client/components/ui/tree/AnatomyClinicalCard.tsx'),
      ];

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        expect(emojiRegex.test(content), `Emoji encontrado em ${path.basename(file)}`).toBe(false);
      }
    });
  });
});

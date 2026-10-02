import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';
import { Z_ANATOMY_BY_ID } from '../src/shared/constants/zAnatomyCatalog.ts';

describe('Suíte de Unificação da Sidebar Esquerda e Expansão de Viewport', () => {
  beforeEach(() => {
    useAnatomyStore.setState({
      activeSystem: 'all',
      activeRegion: 'all',
      selectedNodeId: null,
      hiddenNodeIds: new Set<string>(),
      isolatedOnly: false,
      outlinerCollapsed: false,
      zenMode: false,
    });
  });

  describe('1. Sincronização de Filtros Selecionáveis no Store', () => {
    it('deve atualizar o sistema anatômico ativo deterministicamente', () => {
      const store = useAnatomyStore.getState();
      expect(store.activeSystem).toBe('all');

      store.setActiveSystem('cardiovascular');
      expect(useAnatomyStore.getState().activeSystem).toBe('cardiovascular');

      store.setActiveSystem('nervous');
      expect(useAnatomyStore.getState().activeSystem).toBe('nervous');

      store.setActiveSystem('skeletal');
      expect(useAnatomyStore.getState().activeSystem).toBe('skeletal');
    });

    it('deve atualizar a região anatômica do esqueleto deterministicamente', () => {
      const store = useAnatomyStore.getState();
      expect(store.activeRegion).toBe('all');

      store.setActiveRegion('cranium');
      expect(useAnatomyStore.getState().activeRegion).toBe('cranium');

      store.setActiveRegion('spine');
      expect(useAnatomyStore.getState().activeRegion).toBe('spine');

      store.setActiveRegion('thorax');
      expect(useAnatomyStore.getState().activeRegion).toBe('thorax');
    });
  });

  describe('2. Integridade e Ações da Ficha Clínica Integrada', () => {
    it('deve recuperar metadados médicos válidos a partir do catálogo Z-Anatomy', () => {
      const bone = Z_ANATOMY_BY_ID['za:mandible'];
      expect(bone).toBeDefined();
      expect(bone.namePtBr).toBe('Mandíbula');
      expect(bone.nameLatin).toBe('Mandibula');
      expect(bone.fmaId).toBe('TA2:mandible');

      useAnatomyStore.getState().setSelectedNode('za:mandible');
      expect(useAnatomyStore.getState().selectedNodeId).toBe('za:mandible');
    });

    it('deve alternar a visibilidade de uma peça selecionada', () => {
      const store = useAnatomyStore.getState();
      expect(store.hiddenNodeIds.has('za:mandible')).toBe(false);

      store.toggleVisibility('za:mandible');
      expect(useAnatomyStore.getState().hiddenNodeIds.has('za:mandible')).toBe(true);

      store.toggleVisibility('za:mandible');
      expect(useAnatomyStore.getState().hiddenNodeIds.has('za:mandible')).toBe(false);
    });
  });

  describe('3. Auditoria de Layout: Remoção da Sidebar Direita e Viewport Livre', () => {
    it('deve comprovar que App.tsx não renderiza AnatomicalSidebar no workspace', () => {
      const appPath = path.resolve(__dirname, '../src/client/App.tsx');
      const appContent = fs.readFileSync(appPath, 'utf-8');

      // Verifica ausência do componente AnatomicalSidebar no JSX
      expect(appContent).not.toContain('<AnatomicalSidebar');
      expect(appContent).not.toContain("import { AnatomicalSidebar }");

      // Verifica presença de AnatomyTreePanel com props de seleção
      expect(appContent).toContain('<AnatomyTreePanel');
      expect(appContent).toContain('selectedNode={selectedNode}');
      expect(appContent).toContain('onSelectNode=');
    });

    it('deve garantir que o CSS estiliza os filtros selecionáveis e o card clínico na barra esquerda', () => {
      const cssPath = path.resolve(__dirname, '../src/client/index.css');
      const cssContent = fs.readFileSync(cssPath, 'utf-8');

      expect(cssContent).toContain('.outliner-filter-grid');
      expect(cssContent).toContain('.outliner-filter-btn');
      expect(cssContent).toContain('.outliner-clinical-card');
      expect(cssContent).toContain('.outliner-action-pill');
    });
  });

  describe('4. Padrão Executivo Médico (Zero Emojis nos Novos Componentes)', () => {
    it('não deve conter nenhum caractere emoji gráfico nos novos componentes', () => {
      const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

      const files = [
        path.resolve(__dirname, '../src/client/components/ui/tree/AnatomyFiltersSection.tsx'),
        path.resolve(__dirname, '../src/client/components/ui/tree/AnatomyClinicalCard.tsx'),
        path.resolve(__dirname, '../src/client/components/ui/tree/AnatomyTreePanel.tsx'),
      ];

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        expect(
          emojiRegex.test(content),
          `Emoji encontrado em ${path.basename(file)}`
        ).toBe(false);
      }
    });
  });
});

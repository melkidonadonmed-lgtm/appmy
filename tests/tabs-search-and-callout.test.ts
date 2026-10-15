import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG } from '../src/shared/constants/zAnatomyCatalog.ts';
import { buildTaxonomicTree } from '../src/shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree } from '../src/shared/utils/filterTaxonomicTree.ts';

describe('Suíte de Testes: Navegabilidade por Abas, Search Global e Callout 3D Deslocado', () => {
  beforeEach(() => {
    useAnatomyStore.setState({
      sidebarTab: 'tree',
      selectedNodeId: null,
      cameraFocusTarget: null,
      hiddenNodeIds: new Set<string>(),
      activeSystems: new Set(['all']),
    });
  });

  describe('1. Gestão de Estado das Abas da Sidebar no Store', () => {
    it('deve inicializar a aba padrão como "tree"', () => {
      const state = useAnatomyStore.getState();
      expect(state.sidebarTab).toBe('tree');
    });

    it('deve alternar entre as 4 abas "tree", "filters", "neuro" e "details" via setSidebarTab', () => {
      const store = useAnatomyStore.getState();

      store.setSidebarTab('filters');
      expect(useAnatomyStore.getState().sidebarTab).toBe('filters');

      store.setSidebarTab('neuro');
      expect(useAnatomyStore.getState().sidebarTab).toBe('neuro');

      store.setSidebarTab('details');
      expect(useAnatomyStore.getState().sidebarTab).toBe('details');

      store.setSidebarTab('tree');
      expect(useAnatomyStore.getState().sidebarTab).toBe('tree');
    });
  });

  describe('2. Integridade e Normalização da Busca Médica Global', () => {
    const baseTree = buildTaxonomicTree(Z_ANATOMY_CATALOG);

    function searchCatalog(query: string) {
      const normalized = query
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return Z_ANATOMY_CATALOG.filter((item) => {
        const pt = (item.namePtBr || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const latin = (item.nameLatin || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const en = (item.nameEn || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return pt.includes(normalized) || latin.includes(normalized) || en.includes(normalized);
      });
    }

    it('deve localizar a Maxila Esquerda por busca sem acento e com acento no catálogo e em filterTaxonomicTree', () => {
      const resultsWithoutAccent = searchCatalog('maxila');
      expect(resultsWithoutAccent.length).toBeGreaterThan(0);
      const found = resultsWithoutAccent.find((r) => r.node.toLowerCase().includes('maxilla'));
      expect(found).toBeDefined();

      const resultsWithAccent = searchCatalog('Maxíla');
      expect(resultsWithAccent.length).toBe(resultsWithoutAccent.length);

      const treeHits = filterTaxonomicTree(baseTree, 'Maxíla');
      expect(treeHits.length).toBeGreaterThan(0);
    });

    it('deve localizar estruturas pesquisando por termo canônico em latim TA2', () => {
      const results = searchCatalog('Ramus inferolateralis');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].system).toBe('cardiovascular');

      const treeHits = filterTaxonomicTree(baseTree, 'Ramus inferolateralis');
      expect(treeHits.some((n) => n.id === 'sys_cardiovascular')).toBe(true);
    });

    it('ao selecionar nó na busca, deve atualizar selectedNodeId e cameraFocusTarget', () => {
      const maxillaItem = Z_ANATOMY_CATALOG.find((i) => i.node.toLowerCase().includes('maxilla'));
      expect(maxillaItem).toBeDefined();

      const store = useAnatomyStore.getState();
      store.setSelectedNode(maxillaItem!.id);
      if (maxillaItem!.explosionVector) {
        store.setCameraFocusTarget([
          maxillaItem!.explosionVector.x * 0.1,
          maxillaItem!.explosionVector.y * 0.1,
          maxillaItem!.explosionVector.z * 0.1,
        ]);
      }

      const updated = useAnatomyStore.getState();
      expect(updated.selectedNodeId).toBe(maxillaItem!.id);
      expect(updated.cameraFocusTarget).not.toBeNull();
    });
  });

  describe('3. Auditoria Estrutural dos Componentes e WAI-ARIA', () => {
    it('AnatomyTreePanel.tsx deve possuir navegação em abas acessível (role="tablist" e role="tab")', () => {
      const panelPath = path.resolve(__dirname, '../src/client/components/ui/tree/AnatomyTreePanel.tsx');
      const content = fs.readFileSync(panelPath, 'utf-8');

      expect(content).toContain('role="tablist"');
      expect(content).toContain('role="tab"');
      expect(content).toContain('aria-selected');
      expect(content).toContain('GlobalSearchBox');
      expect(content).toContain('outliner-tabs-nav');
    });

    it('GlobalSearchBox.tsx deve implementar atalho de teclado Ctrl+K e autocompletar', () => {
      const searchPath = path.resolve(__dirname, '../src/client/components/ui/tree/GlobalSearchBox.tsx');
      const content = fs.readFileSync(searchPath, 'utf-8');

      expect(content).toContain("key.toLowerCase() === 'k'");
      expect(content).toContain('global-search-dropdown');
      expect(content).toContain('role="listbox"');
      expect(content).toContain('role="option"');
      expect(content).toContain('Ctrl+K');
    });

    it('AnatomicalCallout3D.tsx deve conter linha guia vetorial (SVG Leader Line) e card deslocado', () => {
      const calloutPath = path.resolve(__dirname, '../src/client/components/canvas/AnatomicalCallout3D.tsx');
      const content = fs.readFileSync(calloutPath, 'utf-8');

      expect(content).toContain('callout-leader-wrapper');
      expect(content).toContain('callout-anchor-dot');
      expect(content).toContain('callout-svg-line');
      expect(content).toContain('callout-card-displaced');
      expect(content).toContain('handleFocus');
      expect(content).toContain('handleIsolate');
      expect(content).toContain('onOpenDetailsTab');
    });

    it('RealBodyAtlas.tsx deve renderizar AnatomicalCallout3D quando houver peça selecionada', () => {
      const atlasPath = path.resolve(__dirname, '../src/client/components/canvas/RealBodyAtlas.tsx');
      const content = fs.readFileSync(atlasPath, 'utf-8');

      expect(content).toContain('<AnatomicalCallout3D');
      expect(content).toContain('onOpenDetailsTab=');
    });

    it('AnatomicalCallout3D.tsx não deve usar distanceFactor nem center no Html e index.css deve estilizar o deslocamento bilateral', () => {
      const calloutPath = path.resolve(__dirname, '../src/client/components/canvas/AnatomicalCallout3D.tsx');
      const calloutContent = fs.readFileSync(calloutPath, 'utf-8');
      expect(calloutContent).not.toContain('distanceFactor=');
      expect(calloutContent).not.toMatch(/<Html[\s\S]*?\bcenter\b/);
      expect(calloutContent).toContain('side-${calloutSide}');

      const cssPath = path.resolve(__dirname, '../src/client/index.css');
      const cssContent = fs.readFileSync(cssPath, 'utf-8');
      expect(cssContent).toContain('.callout-card-displaced');
      expect(cssContent).toContain('.callout-card-displaced.side-left');
      expect(cssContent).toContain('max-width: 220px');
      expect(cssContent).toContain('.outliner-tabs-nav');
      expect(cssContent).toContain('.global-search-dropdown');
      expect(cssContent).toContain('.dissection-quick-grid');
    });

    it('useAnatomyStore deve sincronizar solidOpacity com systemOpacities.skeletal e sincronizar aliases de visibilidade', () => {
      const store = useAnatomyStore.getState();

      // 1. Densidade Óssea (100% / 35% / 0%) deve atualizar systemOpacities.skeletal
      store.setSolidOpacity(0.35);
      expect(useAnatomyStore.getState().solidOpacity).toBe(0.35);
      expect(useAnatomyStore.getState().systemOpacities.skeletal).toBe(0.35);

      store.setSolidOpacity(0.0);
      expect(useAnatomyStore.getState().systemOpacities.skeletal).toBe(0.0);

      store.setSolidOpacity(1.0);
      expect(useAnatomyStore.getState().systemOpacities.skeletal).toBe(1.0);

      // 2. toggleVisibility deve sincronizar todos os aliases (id, node, sanitizeNodeName)
      const sample = Z_ANATOMY_CATALOG[0];
      store.toggleVisibility(sample.id);
      expect(useAnatomyStore.getState().hiddenNodeIds.has(sample.id)).toBe(true);
      expect(useAnatomyStore.getState().hiddenNodeIds.has(sample.node)).toBe(true);

      // Desocultar usando o nome do nó (como no TreeItem) deve limpar também o sample.id
      store.toggleVisibility(sample.node);
      expect(useAnatomyStore.getState().hiddenNodeIds.has(sample.id)).toBe(false);
      expect(useAnatomyStore.getState().hiddenNodeIds.has(sample.node)).toBe(false);

      // 3. Sincronização bidirecional entre setXRayMode e dissection.visualMode
      store.setXRayMode(true);
      expect(useAnatomyStore.getState().dissection.visualMode).toBe('xray');
      store.setDissection((prev) => ({ ...prev, visualMode: 'mpr' }));
      expect(useAnatomyStore.getState().xRayMode).toBe(false);
      expect(useAnatomyStore.getState().modules.mprEnabled).toBe(true);
    });
  });
});

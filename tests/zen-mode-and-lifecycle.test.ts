import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as THREE from 'three';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';
import {
  loadBookmarks,
  saveBookmark,
  deleteBookmark,
  applyBookmarkToStore,
  BOOKMARKS_STORAGE_KEY,
} from '../src/client/lib/bookmarks-storage.ts';
import { disposeHierarchy } from '../src/client/lib/webgl-gc.ts';

describe('Zen Mode & Clinical Lifecycle Suite (Fase 1 a 4)', () => {
  beforeEach(() => {
    // Reseta estado do store
    useAnatomyStore.setState({
      zenMode: false,
      outlinerCollapsed: false,
      sidebarCollapsed: false,
      preZenOutlinerCollapsed: false,
      preZenSidebarCollapsed: false,
      activeSystem: 'skeletal',
      activeRegion: 'all',
      solidOpacity: 1.0,
      explosionProgress: 0.0,
      selectedNodeId: null,
      cameraFocusTarget: null,
      cameraPositionTarget: null,
    });

    // Mock do LocalStorage
    const storage: Record<string, string> = {};
    const mockStorage = {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, val: string) => {
        storage[key] = val;
      },
      removeItem: (key: string) => {
        delete storage[key];
      },
      clear: () => {
        for (const k of Object.keys(storage)) delete storage[k];
      },
    };
    vi.stubGlobal('localStorage', mockStorage);
    vi.stubGlobal('window', { localStorage: mockStorage });
  });

  describe('1. Ergonomia do Modo Foco Cirúrgico (Zen Mode 100% Viewport)', () => {
    it('deve colapsar ambos os painéis ao ativar o Zen Mode e restaurar estados prévios ao sair', () => {
      const store = useAnatomyStore.getState();
      expect(store.zenMode).toBe(false);
      expect(store.outlinerCollapsed).toBe(false);
      expect(store.sidebarCollapsed).toBe(false);

      // 1. Ativa Zen Mode
      store.toggleZenMode();
      let state = useAnatomyStore.getState();
      expect(state.zenMode).toBe(true);
      expect(state.outlinerCollapsed).toBe(true);
      expect(state.sidebarCollapsed).toBe(true);

      // 2. Desativa Zen Mode -> restaura exatamente para aberto/aberto
      store.toggleZenMode();
      state = useAnatomyStore.getState();
      expect(state.zenMode).toBe(false);
      expect(state.outlinerCollapsed).toBe(false);
      expect(state.sidebarCollapsed).toBe(false);
    });

    it('deve preservar o estado assimétrico prévio dos painéis ao alternar o Zen Mode', () => {
      // Usuário estava com a sidebar direita já recolhida, mas outliner aberto
      useAnatomyStore.setState({
        outlinerCollapsed: false,
        sidebarCollapsed: true,
      });

      const store = useAnatomyStore.getState();
      store.toggleZenMode(); // Entra em Zen Mode
      expect(useAnatomyStore.getState().zenMode).toBe(true);
      expect(useAnatomyStore.getState().outlinerCollapsed).toBe(true);
      expect(useAnatomyStore.getState().sidebarCollapsed).toBe(true);

      store.toggleZenMode(); // Sai do Zen Mode
      const restored = useAnatomyStore.getState();
      expect(restored.zenMode).toBe(false);
      expect(restored.outlinerCollapsed).toBe(false);
      expect(restored.sidebarCollapsed).toBe(true); // Permanece recolhida como estava
    });

    it('deve permitir controle imperativo via setZenMode(boolean)', () => {
      const store = useAnatomyStore.getState();
      store.setZenMode(true);
      expect(useAnatomyStore.getState().zenMode).toBe(true);
      expect(useAnatomyStore.getState().outlinerCollapsed).toBe(true);

      store.setZenMode(false);
      expect(useAnatomyStore.getState().zenMode).toBe(false);
      expect(useAnatomyStore.getState().outlinerCollapsed).toBe(false);
    });
  });

  describe('2. Persistência de Bookmarks Clínicos (LocalStorage)', () => {
    it('deve salvar, listar e excluir marcadores anatômicos no LocalStorage', () => {
      expect(loadBookmarks()).toEqual([]);

      const bm = saveBookmark('Planejamento Neurocirúrgico', {
        viewType: 'realistic',
        activeSystem: 'skeletal',
        activeRegion: 'cranium',
        layerPeelingLevel: 0,
        solidOpacity: 1.0,
        explosionProgress: 0.45,
        selectedNodeId: 'fma:cranium_overview',
        hiddenNodeIds: ['mesh_123'],
        cameraFocusTarget: [0, 1.45, 0],
        cameraPositionTarget: [0, 1.45, 3.2],
      });

      expect(bm.id).toMatch(/^bm_\d+_/);
      expect(bm.name).toBe('Planejamento Neurocirúrgico');
      expect(bm.createdAt).toBeDefined();

      const all = loadBookmarks();
      expect(all.length).toBe(1);
      expect(all[0].name).toBe('Planejamento Neurocirúrgico');

      // Aplica ao store e valida a restauração completa
      applyBookmarkToStore(bm);
      const state = useAnatomyStore.getState();
      expect(state.activeRegion).toBe('cranium');
      expect(state.explosionProgress).toBe(0.45);
      expect(state.selectedNodeId).toBe('fma:cranium_overview');
      expect(state.cameraFocusTarget).toEqual([0, 1.45, 0]);
      expect(state.cameraPositionTarget).toEqual([0, 1.45, 3.2]);
      expect(state.hiddenNodeIds.has('mesh_123')).toBe(true);

      // Remoção
      const deleted = deleteBookmark(bm.id);
      expect(deleted).toBe(true);
      expect(loadBookmarks().length).toBe(0);
    });

    it('deve lidar de forma resiliente com JSON corrompido no LocalStorage', () => {
      window.localStorage.setItem(BOOKMARKS_STORAGE_KEY, '{ corrompido : inválido }');
      const loaded = loadBookmarks();
      expect(loaded).toEqual([]);
    });
  });

  describe('3. Auditoria de Descarte de Recursos WebGL', () => {
    it('deve descartar geometrias e materiais hierárquicos sem deixar instâncias orfãs', () => {
      const root = new THREE.Group();
      const geom = new THREE.BufferGeometry();
      const mat = new THREE.MeshBasicMaterial();
      const mesh = new THREE.Mesh(geom, mat);
      root.add(mesh);

      const geoDisposeSpy = vi.spyOn(geom, 'dispose');
      const matDisposeSpy = vi.spyOn(mat, 'dispose');

      const report = disposeHierarchy(root);
      expect(report.geometriesDisposed).toBe(1);
      expect(report.materialsDisposed).toBe(1);
      expect(geoDisposeSpy).toHaveBeenCalledOnce();
      expect(matDisposeSpy).toHaveBeenCalledOnce();
    });
  });

  describe('4. Conformidade Estrita com UI Médica Executiva (Zero Emojis)', () => {
    it('não deve conter nenhum caractere emoji nos componentes modificados nesta entrega', () => {
      const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
      const files = [
        path.resolve(__dirname, '../src/client/App.tsx'),
        path.resolve(__dirname, '../src/client/components/ui/QuickPresetsBar.tsx'),
        path.resolve(__dirname, '../src/client/lib/bookmarks-storage.ts'),
        path.resolve(__dirname, '../src/client/stores/useAnatomyStore.ts'),
        path.resolve(__dirname, '../src/client/components/canvas/SceneCanvas.tsx'),
        path.resolve(__dirname, '../src/client/components/canvas/RealCraniumModel.tsx'),
      ];

      for (const file of files) {
        const text = fs.readFileSync(file, 'utf-8');
        const hasEmoji = emojiRegex.test(text);
        expect(
          hasEmoji,
          `Emoji encontrado no arquivo ${path.basename(file)}`
        ).toBe(false);
      }
    });
  });
});

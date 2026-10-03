import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as THREE from 'three';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';
import { updateMeshVisibility } from '../src/core/visibilityManager.ts';
import { applyBookmarkToStore } from '../src/client/lib/bookmarks-storage.ts';

describe('Suíte de Controle de Opacidade Individual por Camada Sobreposta', () => {
  beforeEach(() => {
    useAnatomyStore.getState().resetSystemOpacities();
    useAnatomyStore.getState().setAllSystems();
  });

  describe('1. Reatividade e Integridade no useAnatomyStore', () => {
    it('deve iniciar com opacidade 1.0 padrão para todos os sistemas anatômicos', () => {
      const store = useAnatomyStore.getState();
      expect(store.getSystemOpacity('cardiovascular')).toBe(1.0);
      expect(store.getSystemOpacity('muscular')).toBe(1.0);
      expect(store.getSystemOpacity('nervous')).toBe(1.0);
      expect(store.getSystemOpacity('lymphatic')).toBe(1.0);
      expect(store.getSystemOpacity('skeletal')).toBe(1.0);
    });

    it('deve atualizar a opacidade de um sistema específico sem afetar os demais', () => {
      const store = useAnatomyStore.getState();

      store.setSystemOpacity('cardiovascular', 0.45);
      const state1 = useAnatomyStore.getState();
      expect(state1.getSystemOpacity('cardiovascular')).toBe(0.45);
      expect(state1.getSystemOpacity('muscular')).toBe(1.0);
      expect(state1.getSystemOpacity('nervous')).toBe(1.0);

      store.setSystemOpacity('muscular', 0.2);
      const state2 = useAnatomyStore.getState();
      expect(state2.getSystemOpacity('cardiovascular')).toBe(0.45);
      expect(state2.getSystemOpacity('muscular')).toBe(0.2);
      expect(state2.getSystemOpacity('nervous')).toBe(1.0);
    });

    it('deve aplicar clamp entre 0.0 e 1.0 nas opacidades dos sistemas', () => {
      const store = useAnatomyStore.getState();

      store.setSystemOpacity('nervous', 1.5);
      expect(useAnatomyStore.getState().getSystemOpacity('nervous')).toBe(1.0);

      store.setSystemOpacity('nervous', -0.3);
      expect(useAnatomyStore.getState().getSystemOpacity('nervous')).toBe(0.0);
    });

    it('deve resetar todas as opacidades para 1.0 via resetSystemOpacities', () => {
      const store = useAnatomyStore.getState();
      store.setSystemOpacity('cardiovascular', 0.3);
      store.setSystemOpacity('muscular', 0.4);
      store.setSystemOpacity('skeletal', 0.5);

      store.resetSystemOpacities();
      const state = useAnatomyStore.getState();
      expect(state.getSystemOpacity('cardiovascular')).toBe(1.0);
      expect(state.getSystemOpacity('muscular')).toBe(1.0);
      expect(state.getSystemOpacity('skeletal')).toBe(1.0);
    });

    it('deve aplicar opacidades diferenciadas ao disparar o preset cardiorespiratory', () => {
      const store = useAnatomyStore.getState();
      store.applyPreset('cardiorespiratory');

      const state = useAnatomyStore.getState();
      expect(state.getSystemOpacity('skeletal')).toBe(0.35);
      expect(state.getSystemOpacity('cardiovascular')).toBe(1.0);
      expect(state.getSystemOpacity('respiratory')).toBe(1.0);
    });
  });

  describe('2. Propagação Factual de Opacidade no Motor Three.js (updateMeshVisibility)', () => {
    it('deve aplicar opacidade parcial e ativar transparência no material quando baseOpacity < 0.99', () => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial()
      );
      mesh.name = 'arteria_carotida';
      mesh.userData = {
        id: 'arteria_carotida',
        sistema: 'cardiovascular',
        camadaProfundidade: 1,
      };

      const mat = mesh.material as THREE.MeshStandardMaterial;
      const state = {
        hiddenIds: new Set<string>(),
        selectedId: null,
        activeDepth: 1,
        ghostMode: false,
        isolatedOnly: false,
      };

      updateMeshVisibility(mesh, state, mat, '#ef4444', 0.45);

      expect(mesh.visible).toBe(true);
      expect(mat.opacity).toBe(0.45);
      expect(mat.transparent).toBe(true);
      expect(mat.color.getHexString()).toBe('ef4444');
    });

    it('deve desativar transparência e manter opacidade 1.0 quando baseOpacity = 1.0', () => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial()
      );
      mesh.name = 'femur_direito';
      mesh.userData = {
        id: 'femur_direito',
        sistema: 'skeletal',
        camadaProfundidade: 1,
      };

      const mat = mesh.material as THREE.MeshStandardMaterial;
      const state = {
        hiddenIds: new Set<string>(),
        selectedId: null,
        activeDepth: 1,
        ghostMode: false,
        isolatedOnly: false,
      };

      updateMeshVisibility(mesh, state, mat, '#f4ede2', 1.0);

      expect(mesh.visible).toBe(true);
      expect(mat.opacity).toBe(1.0);
      expect(mat.transparent).toBe(false);
    });
  });

  describe('3. Auditoria de Código e Acessibilidade do Componente UI (AnatomyClinicalCard)', () => {
    const cardPath = path.resolve(
      __dirname,
      '../src/client/components/ui/tree/AnatomyClinicalCard.tsx'
    );
    const content = fs.readFileSync(cardPath, 'utf-8');

    it('deve conter o container de controle de opacidade das camadas', () => {
      expect(content).toContain('outliner-layers-opacity-control');
      expect(content).toContain('outliner-opacity-slider-row');
      expect(content).toContain('outliner-opacity-range');
    });

    it('deve possuir sliders específicos para vasos, músculos, nervos, linfático e esqueleto', () => {
      expect(content).toContain('range-cardio');
      expect(content).toContain('range-muscular');
      expect(content).toContain('range-nervous');
      expect(content).toContain('range-lymph');
      expect(content).toContain('range-skeletal');
    });

    it('deve possuir rótulos de acessibilidade aria-label claros em cada slider', () => {
      expect(content).toContain('aria-label="Opacidade do Sistema Cardiovascular"');
      expect(content).toContain('aria-label="Opacidade do Sistema Muscular"');
      expect(content).toContain('aria-label="Opacidade do Sistema Nervoso"');
      expect(content).toContain('aria-label="Opacidade do Sistema Linfático"');
      expect(content).toContain('aria-label="Opacidade do Sistema Esquelético"');
    });

    it('deve respeitar a regra estrita de ausência de emojis (Zero Emojis)', () => {
      const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
      expect(emojiRegex.test(content)).toBe(false);
    });

    it('deve conter a barra de presets rápidos de transparência cirúrgica', () => {
      expect(content).toContain('outliner-opacity-presets-row');
      expect(content).toContain('Angio Focus');
      expect(content).toContain('Neuro Focus');
      expect(content).toContain('Músculo 40%');
      expect(content).toContain('Reset 100%');
    });
  });

  describe('4. Sincronização e Restauração com Bookmarks (LocalStorage)', () => {
    it('deve restaurar opacidades customizadas via applyBookmarkToStore', () => {
      const dummyBookmark: any = {
        id: 'bm_test_opacity',
        name: 'Caso Clínico com Transparência',
        createdAt: new Date().toISOString(),
        viewType: 'realistic',
        activeSystem: 'all',
        activeRegion: 'thorax',
        layerPeelingLevel: 0,
        solidOpacity: 1.0,
        explosionProgress: 0.0,
        selectedNodeId: null,
        hiddenNodeIds: [],
        activeSystems: ['cardiovascular', 'muscular', 'skeletal'],
        systemOpacities: {
          cardiovascular: 1.0,
          muscular: 0.25,
          skeletal: 0.15,
        },
      };

      applyBookmarkToStore(dummyBookmark);

      const state = useAnatomyStore.getState();
      expect(state.getSystemOpacity('cardiovascular')).toBe(1.0);
      expect(state.getSystemOpacity('muscular')).toBe(0.25);
      expect(state.getSystemOpacity('skeletal')).toBe(0.15);
      expect(state.isSystemActive('cardiovascular')).toBe(true);
      expect(state.isSystemActive('muscular')).toBe(true);
    });
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { bindExplodedNode, applyExplodedStep } from '../src/core/explodedEngine.ts';
import { SYSTEM_METADATA } from '../src/shared/constants/taxonomicMetadata.ts';
import { SURGICAL_LAYERS, determineSurgicalLayer } from '../src/core/visibilityManager.ts';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';

describe('Suíte de Sincronização Árvore-3D, Blindagem de Posição e Ordem Estratigráfica', () => {
  beforeEach(() => {
    useAnatomyStore.setState({
      activeSystems: new Set(['all']),
      activeSystem: 'all',
      hiddenNodeIds: new Set(),
      explosionProgress: 0.0,
      activeDepth: 1,
    });
  });

  describe('1. Blindagem Imutável da Posição Anatômica (Anti-Drift / Anti-Flutuação)', () => {
    it('deve registrar initialPosition imutável no userData na primeira vinculação', () => {
      const mesh = new THREE.Mesh();
      mesh.position.set(0.12, 1.45, -0.05);

      const binding = bindExplodedNode(mesh, 'all');

      expect(mesh.userData.initialPosition).toBeDefined();
      expect(mesh.userData.initialPosition.x).toBeCloseTo(0.12);
      expect(mesh.userData.initialPosition.y).toBeCloseTo(1.45);
      expect(mesh.userData.initialPosition.z).toBeCloseTo(-0.05);
      expect(binding.originalPosition.x).toBeCloseTo(0.12);
    });

    it('não deve corromper originalPosition mesmo se a malha estiver deslocada no re-bind', () => {
      const mesh = new THREE.Mesh();
      mesh.position.set(0.5, 1.2, 0.3);

      // Primeiro bind: salva a posição anatômica
      bindExplodedNode(mesh, 'all');

      // Simula deslocamento pelo loop de explosão
      mesh.position.set(5.0, 8.0, 10.0);

      // Re-bind (ex: re-renderização por mudança de opacidade ou filtro)
      const secondBinding = bindExplodedNode(mesh, 'all');

      // A originalPosition NÃO pode ser 5.0, 8.0, 10.0; DEVE ser a original 0.5, 1.2, 0.3!
      expect(secondBinding.originalPosition.x).toBeCloseTo(0.5);
      expect(secondBinding.originalPosition.y).toBeCloseTo(1.2);
      expect(secondBinding.originalPosition.z).toBeCloseTo(0.3);
    });

    it('deve restaurar posição anatômica exata quando o progresso for 0.0', () => {
      const mesh = new THREE.Mesh();
      mesh.position.set(0.2, 0.8, -0.1);

      const binding = bindExplodedNode(mesh, 'all');

      // Aplica explosão a 80%
      applyExplodedStep([binding], 0.8, 1.0);
      expect(mesh.position.x).not.toBeCloseTo(0.2);

      // Retorna a 0% de explosão
      applyExplodedStep([binding], 0.0, 1.0);
      expect(mesh.position.x).toBeCloseTo(0.2);
      expect(mesh.position.y).toBeCloseTo(0.8);
      expect(mesh.position.z).toBeCloseTo(-0.1);
    });
  });

  describe('2. Ordem Estratigráfica Canônica (De Fora Para Dentro)', () => {
    it('deve priorizar o Tegumento Comum (Pele) como a primeira camada em SYSTEM_METADATA', () => {
      expect(SYSTEM_METADATA.integumentary).toBeDefined();
      expect(SYSTEM_METADATA.integumentary.order).toBe(1);
    });

    it('deve ordenar músculos antes do arcabouço ósseo em SYSTEM_METADATA', () => {
      expect(SYSTEM_METADATA.muscular.order).toBeLessThan(SYSTEM_METADATA.skeletal.order);
      expect(SYSTEM_METADATA.skeletal.order).toBe(4);
    });

    it('deve estruturar SURGICAL_LAYERS de 1 a 6 de fora para dentro', () => {
      expect(SURGICAL_LAYERS[1].labelPt).toBe('Tegumento Comum');
      expect(SURGICAL_LAYERS[2].labelPt).toBe('Muscular Superficial');
      expect(SURGICAL_LAYERS[3].labelPt).toBe('Muscular Profundo');
      expect(SURGICAL_LAYERS[4].labelPt).toBe('Esqueleto Axial & Apendicular');
      expect(SURGICAL_LAYERS[5].labelPt).toBe('Vascular & Nervoso');
      expect(SURGICAL_LAYERS[6].labelPt).toBe('Vísceras & Cavidades');
    });

    it('deve classificar sistemas nas camadas cirúrgicas corretas via determineSurgicalLayer', () => {
      expect(determineSurgicalLayer('integumentary', 'Skin')).toBe(1);
      expect(determineSurgicalLayer('muscular', 'deltoid')).toBe(2);
      expect(determineSurgicalLayer('muscular', 'intercostal_muscle')).toBe(3);
      expect(determineSurgicalLayer('skeletal', 'femur')).toBe(4);
      expect(determineSurgicalLayer('cardiovascular', 'aorta')).toBe(5);
      expect(determineSurgicalLayer('nervous', 'median_nerve')).toBe(5);
      expect(determineSurgicalLayer('lymphatic', 'thoracic_duct')).toBe(5);
      expect(determineSurgicalLayer('digestive', 'stomach')).toBe(6);
    });
  });

  describe('3. Multi-Seleção Concorrente e Sincronização Árvore <-> Three.js', () => {
    it('deve permitir seleção simultânea de múltiplos sistemas anatômicos', () => {
      const store = useAnatomyStore.getState();

      // Clica em esqueleto
      store.toggleSystem('skeletal');
      expect(useAnatomyStore.getState().activeSystems.has('skeletal')).toBe(true);
      expect(useAnatomyStore.getState().activeSystems.has('cardiovascular')).toBe(false);

      // Adiciona cardiovascular concorrentemente
      store.toggleSystem('cardiovascular');
      expect(useAnatomyStore.getState().activeSystems.has('skeletal')).toBe(true);
      expect(useAnatomyStore.getState().activeSystems.has('cardiovascular')).toBe(true);
      expect(useAnatomyStore.getState().activeSystems.has('nervous')).toBe(false);

      // Adiciona linfático via addSystem
      store.addSystem('lymphatic');
      expect(useAnatomyStore.getState().activeSystems.has('lymphatic')).toBe(true);
      expect(useAnatomyStore.getState().activeSystems.size).toBe(3);

      // Remove esqueleto via removeSystem
      store.removeSystem('skeletal');
      expect(useAnatomyStore.getState().activeSystems.has('skeletal')).toBe(false);
      expect(useAnatomyStore.getState().activeSystems.has('cardiovascular')).toBe(true);
      expect(useAnatomyStore.getState().activeSystems.has('lymphatic')).toBe(true);

      // Restaura todos
      store.setAllSystems();
      expect(useAnatomyStore.getState().activeSystems.has('all')).toBe(true);
      expect(useAnatomyStore.getState().isSystemActive('skeletal')).toBe(true);
      expect(useAnatomyStore.getState().isSystemActive('cardiovascular')).toBe(true);
    });
  });
});

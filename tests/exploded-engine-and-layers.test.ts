import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  isAxialAnchor,
  bindExplodedNode,
  applyExplodedStep,
  evaluateExplodedPosition,
} from '../src/core/explodedEngine.ts';
import {
  determineSurgicalLayer,
  isSuperficialMuscle,
  updateMeshVisibility,
  SURGICAL_LAYERS,
  VisibilityState,
} from '../src/core/visibilityManager.ts';
import { AnatomicalMeshUserData } from '../src/shared/types/anatomy.ts';

describe('Core 3D Engine: Exploded View & Axial Anchors', () => {
  it('deve identificar corretamente âncoras axiais estáticas no corpo inteiro e no crânio', () => {
    // 1. Corpo Inteiro / Tronco: Coluna e Pelve são âncoras fixas
    expect(isAxialAnchor('vertebra_t12', 'Vértebra Torácica T12', 'all')).toBe(true);
    expect(isAxialAnchor('lumbar_spine', 'Coluna Lombar', 'all')).toBe(true);
    expect(isAxialAnchor('sacrum', 'Sacro', 'all')).toBe(true);
    expect(isAxialAnchor('pelvis_r', 'Osso Ilíaco Direito', 'all')).toBe(true);
    expect(isAxialAnchor('atlas', 'Atlas C1', 'all')).toBe(true);
    expect(isAxialAnchor('hip_bone', 'Osso do Quadril', 'all')).toBe(true);

    // Peças não axiais (esqueleto apendicular e músculos) NÃO são âncoras no corpo todo
    expect(isAxialAnchor('clavicle_r', 'Clavícula Direita', 'all')).toBe(false);
    expect(isAxialAnchor('femur_l', 'Fêmur Esquerdo', 'all')).toBe(false);
    expect(isAxialAnchor('deltoide', 'Músculo Deltoide', 'all')).toBe(false);

    // 2. No Crânio Isolado: Esfenoide e Occipital servem de âncora para a calvária e face
    expect(isAxialAnchor('sphenoid_bone', 'Osso Esfenoide', 'cranium')).toBe(true);
    expect(isAxialAnchor('occipital_bone', 'Osso Occipital', 'cranium')).toBe(true);
    expect(isAxialAnchor('frontal_bone', 'Osso Frontal', 'cranium')).toBe(false);
    expect(isAxialAnchor('mandible', 'Mandíbula', 'cranium')).toBe(false);
  });

  it('deve vincular nós com bindExplodedNode e garantir deslocamento zero para âncoras', () => {
    const anchorMesh = new THREE.Mesh();
    anchorMesh.name = 'vertebra_l3';
    anchorMesh.position.set(0, 1.0, 0);

    const apendicularMesh = new THREE.Mesh();
    apendicularMesh.name = 'femur_right';
    apendicularMesh.position.set(0.2, 0.4, 0);
    apendicularMesh.userData = {
      eixoExplosao: [1, 0, 0],
      distanciaMaxima: 0.5,
    } as Partial<AnatomicalMeshUserData>;

    const anchorBinding = bindExplodedNode(anchorMesh, 'all');
    const apendicularBinding = bindExplodedNode(apendicularMesh, 'all');

    expect(anchorBinding.isAnchor).toBe(true);
    expect(anchorBinding.targetOffset.x).toBe(0);
    expect(anchorBinding.targetOffset.y).toBe(0);
    expect(anchorBinding.targetOffset.z).toBe(0);

    expect(apendicularBinding.isAnchor).toBe(false);
    expect(apendicularBinding.targetOffset.x).toBeCloseTo(0.5, 3);
  });

  it('applyExplodedStep deve manter a coluna vertebral imóvel a 100% de explosão', () => {
    const spineMesh = new THREE.Mesh();
    spineMesh.name = 'spine_vertebra_t8';
    spineMesh.position.set(0, 1.2, 0);

    const ribMesh = new THREE.Mesh();
    ribMesh.name = 'rib_5_right';
    ribMesh.position.set(0.15, 1.2, 0.05);

    const bindings = [
      bindExplodedNode(spineMesh, 'all'),
      bindExplodedNode(ribMesh, 'all'),
    ];

    // Simula 100% de visão explodida (progress = 1.0)
    for (let frame = 0; frame < 30; frame++) {
      applyExplodedStep(bindings, 1.0, 0.2);
    }

    // A coluna vertebral DEVE permanecer exatamente na posição original
    expect(spineMesh.position.x).toBe(0);
    expect(spineMesh.position.y).toBe(1.2);
    expect(spineMesh.position.z).toBe(0);

    // A costela DEVE ter se deslocado
    expect(ribMesh.position.x).toBeGreaterThan(0.15);
  });

  it('evaluateExplodedPosition deve computar a posição exata sem resíduos numéricos', () => {
    const mesh = new THREE.Mesh();
    mesh.name = 'humerus_r';
    mesh.position.set(0.3, 1.0, 0);
    mesh.userData = {
      eixoExplosao: [1, 0, 0],
      distanciaMaxima: 2.0,
    } as Partial<AnatomicalMeshUserData>;

    const binding = bindExplodedNode(mesh, 'all');
    const posAtHalf = evaluateExplodedPosition(binding, 0.5);

    expect(posAtHalf.x).toBeCloseTo(0.3 + 1.0, 3);
    expect(posAtHalf.y).toBe(1.0);
    expect(posAtHalf.z).toBe(0);
  });
});

describe('Core 3D Engine: Surgical Layers & Visibility Manager', () => {
  it('deve classificar rigorosamente as 6 camadas cirúrgicas', () => {
    expect(determineSurgicalLayer('integumentary', 'skin_mesh', 'Pele')).toBe(1);
    expect(determineSurgicalLayer('muscular', 'deltoid_ant', 'Deltoide')).toBe(2);
    expect(determineSurgicalLayer('muscular', 'transversospinalis', 'Transversoespinhal')).toBe(3);
    expect(determineSurgicalLayer('skeletal', 'femur', 'Fêmur')).toBe(4);
    expect(determineSurgicalLayer('cardiovascular', 'aorta', 'Aorta')).toBe(5);
    expect(determineSurgicalLayer('respiratory', 'lung_left', 'Pulmão Esquerdo')).toBe(6);
  });

  it('deve identificar músculos superficiais versus profundos', () => {
    expect(isSuperficialMuscle('m_trapezius', 'Trapézio')).toBe(true);
    expect(isSuperficialMuscle('m_pectoralis_major', 'Peitoral Maior')).toBe(true);
    expect(isSuperficialMuscle('m_biceps_brachii', 'Bíceps Braquial')).toBe(true);
    expect(isSuperficialMuscle('m_intercostales', 'Intercostais')).toBe(false);
    expect(isSuperficialMuscle('m_psoas_major', 'Psoas Maior')).toBe(false);
  });

  it('updateMeshVisibility deve ocultar camadas superficiais quando activeDepth for aumentado', () => {
    const skinMesh = new THREE.Mesh();
    skinMesh.name = 'skin';
    skinMesh.userData = { camadaProfundidade: 1 };
    const skinMat = new THREE.MeshStandardMaterial();

    const muscleSupMesh = new THREE.Mesh();
    muscleSupMesh.name = 'deltoid';
    muscleSupMesh.userData = { camadaProfundidade: 2 };
    const muscleSupMat = new THREE.MeshStandardMaterial();

    const boneMesh = new THREE.Mesh();
    boneMesh.name = 'humerus';
    boneMesh.userData = { camadaProfundidade: 4 };
    const boneMat = new THREE.MeshStandardMaterial();

    const state: VisibilityState = {
      hiddenIds: new Set(),
      selectedId: null,
      activeDepth: 4, // Dissecação cirúrgica até o osso (Camadas 1, 2, 3 ocultas)
      ghostMode: false,
      isolatedOnly: false,
    };

    updateMeshVisibility(skinMesh, state, skinMat);
    updateMeshVisibility(muscleSupMesh, state, muscleSupMat);
    updateMeshVisibility(boneMesh, state, boneMat);

    // Camada 1 e 2 devem estar invisíveis
    expect(skinMesh.visible).toBe(false);
    expect(muscleSupMesh.visible).toBe(false);

    // Camada 4 (osso) deve estar visível
    expect(boneMesh.visible).toBe(true);

    // O método de raycast de malhas invisíveis DEVE estar anulado para prevenir cliques falsos
    const dummyRaycaster = new THREE.Raycaster();
    const dummyIntersects: THREE.Intersection[] = [];
    skinMesh.raycast(dummyRaycaster, dummyIntersects);
    expect(dummyIntersects.length).toBe(0);
  });

  it('deve blindar o raycast em malhas em modo Ghosting (Solo)', () => {
    const targetMesh = new THREE.Mesh();
    targetMesh.name = 'target_organ';
    targetMesh.userData = { id: 'target_organ', camadaProfundidade: 6 };
    const targetMat = new THREE.MeshStandardMaterial();

    const ghostMesh = new THREE.Mesh();
    ghostMesh.name = 'surrounding_tissue';
    ghostMesh.userData = { id: 'surrounding_tissue', camadaProfundidade: 6 };
    const ghostMat = new THREE.MeshStandardMaterial();

    const state: VisibilityState = {
      hiddenIds: new Set(),
      selectedId: 'target_organ',
      activeDepth: 6,
      ghostMode: true,
      isolatedOnly: false,
    };

    updateMeshVisibility(targetMesh, state, targetMat);
    updateMeshVisibility(ghostMesh, state, ghostMat);

    expect(targetMesh.visible).toBe(true);
    expect(ghostMesh.visible).toBe(true);

    // O material da malha secundária deve estar em 10% de opacidade
    expect(ghostMat.opacity).toBeCloseTo(0.10, 2);
    expect(ghostMat.transparent).toBe(true);

    // A malha em ghosting DEVE ter o raycast anulado para não interceptar cliques no órgão alvo!
    expect(typeof ghostMesh.raycast).toBe('function');
    const dummyIntersects: THREE.Intersection[] = [];
    ghostMesh.raycast(new THREE.Raycaster(), dummyIntersects);
    expect(dummyIntersects.length).toBe(0);
  });

  it('SURGICAL_LAYERS deve ter as 6 camadas cirúrgicas documentadas', () => {
    expect(Object.keys(SURGICAL_LAYERS).length).toBe(6);
    expect(SURGICAL_LAYERS[1].labelPt).toBe('Tegumento Comum');
    expect(SURGICAL_LAYERS[4].labelPt).toBe('Esqueleto Axial & Apendicular');
    expect(SURGICAL_LAYERS[6].labelPt).toBe('Vísceras & Cavidades');
  });

  it('useAnatomyStore deve sincronizar activeDepth com clamp entre 1 e 6', async () => {
    const { useAnatomyStore } = await import('../src/client/stores/useAnatomyStore.ts');
    
    // Teste de alteração direta de profundidade
    useAnatomyStore.getState().setActiveDepth(4);
    expect(useAnatomyStore.getState().activeDepth).toBe(4);
    expect(useAnatomyStore.getState().layerPeelingLevel).toBe(4);

    // Teste de clamping inferior e superior
    useAnatomyStore.getState().setActiveDepth(0);
    expect(useAnatomyStore.getState().activeDepth).toBe(1);

    useAnatomyStore.getState().setActiveDepth(99);
    expect(useAnatomyStore.getState().activeDepth).toBe(6);

    // Teste de retrocompatibilidade com setLayerPeelingLevel
    useAnatomyStore.getState().setLayerPeelingLevel(2);
    expect(useAnatomyStore.getState().activeDepth).toBe(2);
  });
});

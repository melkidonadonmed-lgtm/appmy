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

  it('deve impedir inversão bilateral (cruzamento da linha média) na Exploded View para peças .l (+X) e .r (-X)', () => {
    // No Z-Anatomy .glb, Esquerda (.l) está em +X e Direita (.r) está em -X,
    // mas o catálogo armazena eixoExplosao.x negativo para .l e positivo para .r.
    const clavicleLeft = new THREE.Mesh();
    clavicleLeft.name = 'Clavicle.l';
    clavicleLeft.position.set(0.08, 1.41, 0.05);
    clavicleLeft.userData = {
      eixoExplosao: [-0.52, 0.25, 0.45],
      distanciaMaxima: 1.0,
    } as Partial<AnatomicalMeshUserData>;

    const clavicleRight = new THREE.Mesh();
    clavicleRight.name = 'Clavicle.r';
    clavicleRight.position.set(-0.08, 1.41, 0.05);
    clavicleRight.userData = {
      eixoExplosao: [0.52, 0.25, 0.45],
      distanciaMaxima: 1.0,
    } as Partial<AnatomicalMeshUserData>;

    const leftBinding = bindExplodedNode(clavicleLeft, 'all');
    const rightBinding = bindExplodedNode(clavicleRight, 'all');

    // A peça esquerda (+X) DEVE expandir para +X (> 0) e a direita (-X) para -X (< 0)
    expect(leftBinding.targetOffset.x).toBeGreaterThan(0);
    expect(rightBinding.targetOffset.x).toBeLessThan(0);

    const leftExploded = evaluateExplodedPosition(leftBinding, 1.0);
    const rightExploded = evaluateExplodedPosition(rightBinding, 1.0);
    expect(leftExploded.x).toBeGreaterThan(0.08);
    expect(rightExploded.x).toBeLessThan(-0.08);
  });

  it('deve realizar descompactação axial vertical (eixo Y) das vértebras quando activeRegion === "spine"', () => {
    const sacrumMesh = new THREE.Mesh();
    sacrumMesh.name = 'Sacrum';
    sacrumMesh.position.set(0, 0.92, -0.05);

    const vertebraC4 = new THREE.Mesh();
    vertebraC4.name = 'Cervical vertebra (C4)';
    vertebraC4.position.set(0, 1.48, -0.02);

    const sacrumBinding = bindExplodedNode(sacrumMesh, 'spine');
    const c4Binding = bindExplodedNode(vertebraC4, 'spine');

    expect(sacrumBinding.isAnchor).toBe(true);
    expect(c4Binding.isAnchor).toBe(false);
    expect(c4Binding.targetOffset.x).toBe(0);
    expect(c4Binding.targetOffset.z).toBe(0);
    expect(c4Binding.targetOffset.y).toBeGreaterThan(0);
  });

  it('deve filtrar malhas duplicadas entre arquivos .glb (isDuplicateCrossSystemMesh)', async () => {
    const { isDuplicateCrossSystemMesh } = await import('../src/client/components/canvas/RealBodyAtlas.tsx');
    const { Z_ANATOMY_BY_NODE } = await import('../src/shared/constants/zAnatomyCatalog.ts');

    // 1. Músculo catalogado presente por engano dentro de nervous_male.glb
    const muscleItem = Z_ANATOMY_BY_NODE['Adductor brevis.l'] || null;
    expect(isDuplicateCrossSystemMesh('nervous', 'Adductor brevis.l', muscleItem)).toBe(true);
    expect(isDuplicateCrossSystemMesh('muscular', 'Adductor brevis.l', muscleItem)).toBe(false);

    // 2. Músculo não catalogado presente dentro de nervous_male.glb
    expect(
      isDuplicateCrossSystemMesh('nervous', '(Abdominal part of pectoralis major muscle).l', null)
    ).toBe(true);

    // 3. Nervo autêntico que inerva um músculo NÃO deve ser descartado em nervous_male.glb
    expect(
      isDuplicateCrossSystemMesh('nervous', '(Nerve to stapedius muscle).l', null)
    ).toBe(false);

    // 4. Dente catalogado como skeletal presente dentro de digestive_male.glb
    const toothItem = Z_ANATOMY_BY_NODE['Upper right central incisor'] || {
      id: 'za:tooth',
      node: 'Upper right central incisor',
      nameEn: 'Upper right central incisor',
      namePtBr: 'Incisivo central superior direito',
      nameLatin: 'Dens incisivus centralis',
      system: 'skeletal',
      chapter: 2,
      fmaId: 'FMA_123',
      path: [],
      explosionVector: { x: 0, y: 0, z: 1 },
    };
    expect(isDuplicateCrossSystemMesh('digestive', 'Upper right central incisor', toothItem)).toBe(true);
    expect(isDuplicateCrossSystemMesh('digestive', 'Upper right central incisor', null)).toBe(true);
    expect(isDuplicateCrossSystemMesh('skeletal', 'Upper right central incisor', toothItem)).toBe(false);
  });

  it('getMeshAnatomicalCenter deve aplicar quaternion, scale, initialPosition e modelOffset ao boundingBox', async () => {
    const { getMeshAnatomicalCenter } = await import('../src/core/explodedEngine.ts');

    // 1. Simula lobo pulmonar / câmara cardíaca com pivô em (0,0,0) e rotação +90° em X (como em respiratory_male.glb)
    const lungGeom = new THREE.BufferGeometry();
    lungGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([0.07, 0.01, -1.28, 0.09, 0.03, -1.26]), 3)
    );
    const lungMesh = new THREE.Mesh(lungGeom);
    lungMesh.name = 'Superior lobe of left lung';
    lungMesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

    const lungCenter = getMeshAnatomicalCenter(lungMesh);
    expect(lungCenter.x).toBeCloseTo(0.08, 2);
    expect(lungCenter.y).toBeCloseTo(1.27, 2);
    expect(lungCenter.z).toBeCloseTo(0.02, 2);

    // 2. Simula Descending colon (pivô em X=-0.09 no lado direito, mas vértices reais no lado esquerdo X=+0.05)
    const colonGeom = new THREE.BufferGeometry();
    colonGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([0.13, 0.0, 0.0, 0.15, 0.0, 0.0]), 3)
    );
    const colonMesh = new THREE.Mesh(colonGeom);
    colonMesh.name = 'Descending colon';
    colonMesh.position.set(-0.09, 1.01, 0.07);
    colonMesh.userData = { initialPosition: colonMesh.position.clone() };

    const colonCenter = getMeshAnatomicalCenter(colonMesh);
    expect(colonCenter.x).toBeGreaterThan(0); // Deve estar no lado esquerdo (+X), não em -0.09!
    const colonBinding = bindExplodedNode(colonMesh, 'all');
    expect(colonBinding.targetOffset.x).toBeGreaterThan(0);

    // 3. Simula tecido mamário de integumentary_female.glb com modelOffset = [0, 0.84, 0.03]
    const breastGeom = new THREE.BufferGeometry();
    breastGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([0.08, 0.44, 0.09, 0.10, 0.46, 0.11]), 3)
    );
    const breastMesh = new THREE.Mesh(breastGeom);
    breastMesh.name = 'VH_F_main_lactiferous_ducts_L';
    breastMesh.userData = { modelOffset: [0, 0.84, 0.03] };

    const breastCenter = getMeshAnatomicalCenter(breastMesh);
    expect(breastCenter.y).toBeCloseTo(1.29, 2); // 0.45 + 0.84 = 1.29m (tórax)
  });

  it('deve priorizar sufixo .r (-X) e .l (+X) mesmo quando ramos cruzam a linha média (ex: Vagus nerve (X).r)', () => {
    const vagusRight = new THREE.Mesh();
    vagusRight.name = 'Vagus nerve (X).r';
    // Centro geométrico ligeiramente positivo (+0.02) devido aos ramos gástricos anteriores
    vagusRight.position.set(0.02, 1.33, 0.04);
    vagusRight.userData = {
      eixoExplosao: [0.35, 0.48, 0.8],
      distanciaMaxima: 0.85,
    };

    const binding = bindExplodedNode(vagusRight, 'all');
    expect(binding.targetOffset.x).toBeLessThan(0); // Nervo vago DIREITO (.r) deve explodir para -X!
  });

  it('applyExplodedStep deve restaurar a posição original mesmo para malhas temporariamente ocultas (!mesh.visible)', () => {
    const mesh = new THREE.Mesh();
    mesh.name = 'Clavicle.l';
    mesh.position.set(0.08, 1.41, 0.05);
    mesh.userData = {
      eixoExplosao: [0.5, 0.2, 0.4],
      distanciaMaxima: 1.0,
    };

    const binding = bindExplodedNode(mesh, 'all');
    applyExplodedStep([binding], 1.0, 1.0);
    expect(mesh.position.x).toBeGreaterThan(0.08);

    // Oculta a malha enquanto explodida e reseta explosionProgress para 0
    mesh.visible = false;
    applyExplodedStep([binding], 0.0, 1.0);

    // Quando voltar a ficar visível, já deve estar em sua posição anatômica original!
    expect(mesh.position.x).toBeCloseTo(0.08, 4);
    expect(mesh.position.y).toBeCloseTo(1.41, 4);
    expect(mesh.position.z).toBeCloseTo(0.05, 4);
  });

  it('updateMeshVisibility deve ocultar malhas e desativar raycast quando baseOpacity for 0 (Oculto 0%)', () => {
    const boneMesh = new THREE.Mesh();
    boneMesh.name = 'Rib_1';
    boneMesh.userData = { id: 'za:rib_1', camadaProfundidade: 4 };
    const mat = new THREE.MeshStandardMaterial();

    const state: VisibilityState = {
      hiddenIds: new Set(),
      selectedId: null,
      activeDepth: 1,
      ghostMode: false,
      isolatedOnly: false,
    };

    updateMeshVisibility(boneMesh, state, mat, '#f4ede2', 0.0);
    expect(boneMesh.visible).toBe(false);

    const intersects: THREE.Intersection[] = [];
    boneMesh.raycast(new THREE.Raycaster(), intersects);
    expect(intersects.length).toBe(0);
  });
});

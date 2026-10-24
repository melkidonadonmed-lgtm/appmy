import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as THREE from 'three';
import { bindExplodedNode, applyExplodedStep } from '../src/core/explodedEngine.ts';
import {
  resolveNeuroClinicalTargetToCatalogId,
  resolveNeuroClinicalTargetAliases,
  resolveCatalogIdToDidacticId,
  isIntracranialBrainTarget,
  FMA_TO_Z_ANATOMY_MAP,
  CRANIAL_NERVE_TO_Z_ANATOMY_MAP,
} from '../src/shared/utils/neuroTargetMapper.ts';
import { resolveBest3DTargetForCanonicalIds } from '../src/shared/utils/clinicalEnrichment.ts';
import { Z_ANATOMY_CATALOG } from '../src/shared/constants/zAnatomyCatalog.ts';
import { CRANIAL_NERVES_12 } from '../src/shared/constants/cranialNervesCatalog.ts';
import {
  VASCULAR_SYNDROMES_AND_WILLIS,
  BRODMANN_CORTICAL_REGIONS_12,
  CSF_VENTRICULAR_FLOW_STEPS,
} from '../src/shared/constants/brainClinicalCatalog.ts';
import {
  useAnatomyStore,
  DEFAULT_LAYER_ORDER,
  getSystemCheckIdsForSex,
} from '../src/client/stores/useAnatomyStore.ts';
import {
  ANATOMY_PARTS_MANIFEST,
  DRACO_STATIC_FILES,
  getTotalDownloadSizeMb,
  getPartManifestById,
  downloadPartToOfflineCache,
  getCachedPartIds,
  removePartFromOfflineCache,
} from '../src/client/lib/modelCacheManager.ts';

function resetStoreForTest() {
  const s = useAnatomyStore.getState();
  s.setBiologicalSex('male');
  s.applyPreset('all');
  s.resetLayerOrder();
  s.setPeelOnClickMode(false);
  s.clearPeeledHistory();
  s.setSelectivePartLoading(false);
  s.setViewType('realistic');
}

describe('Exploded View Engine — Median, Posterior & Radial Nervous Vector Fixes', () => {
  it('keeps median structures (laterality === 0) centered on X axis during explosion', () => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.02));
    mesh.name = 'Sternum';
    mesh.position.set(0, 1.2, 0.05);
    mesh.userData = {
      __isCatalogItem: true,
      nomePt: 'Esterno',
      sistema: 'skeletal',
      camadaProfundidade: 4,
      eixoExplosao: [0.5, 0.2, 0.5],
      distanciaMaxima: 1.0,
    };

    const bound = bindExplodedNode(mesh, 'all');
    expect(Math.abs(bound.targetOffset.x)).toBeLessThan(0.02);
    expect(bound.targetOffset.z).toBeGreaterThan(0);
  });

  it('explodes posterior visceral/muscular structures posteriorly (-Z) instead of into the spine (+Z)', () => {
    const kidneyMesh = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.02));
    kidneyMesh.name = 'Kidney.r';
    // Posterior position (z = -0.06, relZ = -0.04 < -0.015), right side (-X)
    kidneyMesh.position.set(-0.08, 1.05, -0.06);
    kidneyMesh.userData = {
      __isCatalogItem: true,
      nomePt: 'Rim Direito',
      sistema: 'urinary',
      camadaProfundidade: 6,
      eixoExplosao: [-0.5, 0, 0.4],
      distanciaMaxima: 1.0,
    };

    const bound = bindExplodedNode(kidneyMesh, 'all');
    expect(bound.targetOffset.z).toBeLessThan(0);
    expect(bound.targetOffset.x).toBeLessThan(0);
  });

  it('expands generic nervous fallback vectors (0, 0.8, 0) radially instead of uniformly translating upward', () => {
    const leftHemisphere = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.02));
    leftHemisphere.name = 'Precentral gyrus.l';
    // Left side in standard anatomical coordinates is +X
    leftHemisphere.position.set(0.06, 1.62, 0.04);
    leftHemisphere.userData = {
      __isCatalogItem: true,
      nomePt: 'Giro Pré-central Esquerdo',
      sistema: 'nervous',
      camadaProfundidade: 5,
      eixoExplosao: [0, 0.8, 0],
      distanciaMaxima: 1.0,
    };

    const rightHemisphere = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.02));
    rightHemisphere.name = 'Precentral gyrus.r';
    // Right side in standard anatomical coordinates is -X
    rightHemisphere.position.set(-0.06, 1.62, -0.06);
    rightHemisphere.userData = {
      __isCatalogItem: true,
      nomePt: 'Giro Pré-central Direito',
      sistema: 'nervous',
      camadaProfundidade: 5,
      eixoExplosao: [0, 0.8, 0],
      distanciaMaxima: 1.0,
    };

    const boundL = bindExplodedNode(leftHemisphere, 'cranium');
    const boundR = bindExplodedNode(rightHemisphere, 'cranium');

    expect(boundL.targetOffset.x).toBeGreaterThan(0);
    expect(boundR.targetOffset.x).toBeLessThan(0);
    expect(boundL.targetOffset.z).toBeGreaterThan(0);
    expect(boundR.targetOffset.z).toBeLessThan(0);

    applyExplodedStep([boundL, boundR], 0.5, 1.0);
    expect(leftHemisphere.position.x).toBeGreaterThan(0.06);
    expect(rightHemisphere.position.x).toBeLessThan(-0.06);
  });
});

describe('Neuroanatomy Target Mapper & Clinical Focus Integration', () => {
  const catalogIds = new Set(Z_ANATOMY_CATALOG.map((item) => item.id));

  it('maps all FMA and Cranial Nerve IDs to authentic Z_ANATOMY_CATALOG za:* nodes', () => {
    for (const [, zaIds] of Object.entries(FMA_TO_Z_ANATOMY_MAP)) {
      for (const zaId of zaIds) {
        expect(catalogIds.has(zaId)).toBe(true);
      }
    }
    for (const [, zaIds] of Object.entries(CRANIAL_NERVE_TO_Z_ANATOMY_MAP)) {
      for (const zaId of zaIds) {
        expect(catalogIds.has(zaId)).toBe(true);
      }
    }
  });

  it('resolves all 12 Cranial Nerves from CRANIAL_NERVES_12 to valid 3D targets', () => {
    for (const nerve of CRANIAL_NERVES_12) {
      const resolvedFromId = resolveNeuroClinicalTargetToCatalogId(nerve.id);
      const resolvedFromTargets = resolveBest3DTargetForCanonicalIds([nerve.id, ...nerve.targetNodeIds]);
      expect(resolvedFromId).toBeTruthy();
      expect(resolvedFromTargets).toBeTruthy();
      expect(catalogIds.has(resolvedFromId!)).toBe(true);
      expect(catalogIds.has(resolvedFromTargets!.nodeId)).toBe(true);
    }
  });

  it('resolves Vascular Territories, Brodmann Regions, and CSF Flow Steps to valid Z-Anatomy 3D targets', () => {
    for (const vasc of VASCULAR_SYNDROMES_AND_WILLIS) {
      const best = resolveBest3DTargetForCanonicalIds([vasc.id, ...vasc.targetNodeIds]);
      expect(best).toBeTruthy();
      expect(catalogIds.has(best!.nodeId)).toBe(true);
    }
    for (const csf of CSF_VENTRICULAR_FLOW_STEPS) {
      const best = resolveBest3DTargetForCanonicalIds([csf.id, ...csf.targetNodeIds]);
      expect(best).toBeTruthy();
      expect(catalogIds.has(best!.nodeId)).toBe(true);
    }
    for (const brod of BRODMANN_CORTICAL_REGIONS_12) {
      const best = resolveBest3DTargetForCanonicalIds([brod.id, ...brod.targetNodeIds]);
      expect(best).toBeTruthy();
      expect(catalogIds.has(best!.nodeId)).toBe(true);
    }
  });

  it('focuses intracranial targets in Realistic .GLB mode with automatic 0.28 skull translucency', () => {
    resetStoreForTest();

    useAnatomyStore.getState().focusClinicalTargetIds(['fma:50865', 'cn_iii_oculomotor']);

    const next = useAnatomyStore.getState();
    expect(next.viewType).toBe('realistic');
    expect(next.selectedNodeId).toBe('za:oculomotor_nerve_iii_l');
    expect(next.activeRegion).toBe('cranium');
    expect(next.activeSystems.has('nervous')).toBe(true);
    expect(next.activeSystems.has('skeletal')).toBe(true);
    expect(next.systemOpacities.skeletal).toBeCloseTo(0.28, 2);
    expect(isIntracranialBrainTarget(next.selectedNodeId!)).toBe(true);
  });

  it('applies the neuroanatomy preset and switches sidebarTab to neuro', () => {
    resetStoreForTest();
    useAnatomyStore.getState().applyPreset('neuroanatomy');
    const state = useAnatomyStore.getState();
    expect(state.sidebarTab).toBe('neuro');
    expect(state.activeRegion).toBe('cranium');
    expect(state.activeSystems.has('nervous')).toBe(true);
    expect(state.activeSystems.has('cardiovascular')).toBe(true);
    expect(state.systemOpacities.skeletal).toBeCloseTo(0.28, 2);
  });

  it('returns aliases for catalog IDs so RealBodyAtlas highlights matching mesh names', () => {
    const aliases = resolveNeuroClinicalTargetAliases('cn_x_vagus');
    expect(aliases).toContain('za:vagus_nerve_x_l');
    expect(aliases.length).toBeGreaterThan(1);
  });
});

describe('Click-to-Peel (Modo Bisturi 3D) & Customizable Layer Ordering', () => {
  beforeEach(() => {
    resetStoreForTest();
  });

  it('peels clicked nodes in order and restores them via undoLastPeel and clearPeeledHistory', () => {
    const store = useAnatomyStore.getState();
    store.setPeelOnClickMode(true);
    expect(useAnatomyStore.getState().peelOnClickMode).toBe(true);

    useAnatomyStore.getState().peelNodeOnClick(
      ['za:pectoralis_major_muscle_l', 'Pectoralis major muscle.l'],
      'Peitoral Maior Esquerdo'
    );
    useAnatomyStore.getState().peelNodeOnClick(
      ['za:pectoralis_minor_muscle_l', 'Pectoralis minor muscle.l'],
      'Peitoral Menor Esquerdo'
    );

    let state = useAnatomyStore.getState();
    expect(state.peeledHistory.length).toBe(2);
    expect(state.hiddenNodeIds.has('za:pectoralis_major_muscle_l')).toBe(true);
    expect(state.hiddenNodeIds.has('za:pectoralis_minor_muscle_l')).toBe(true);

    // Undo last peel (Peitoral Menor)
    useAnatomyStore.getState().undoLastPeel();
    state = useAnatomyStore.getState();
    expect(state.peeledHistory.length).toBe(1);
    expect(state.hiddenNodeIds.has('za:pectoralis_minor_muscle_l')).toBe(false);
    expect(state.hiddenNodeIds.has('za:pectoralis_major_muscle_l')).toBe(true);

    // Clear all peeled history
    useAnatomyStore.getState().clearPeeledHistory();
    state = useAnatomyStore.getState();
    expect(state.peeledHistory.length).toBe(0);
    expect(state.hiddenNodeIds.has('za:pectoralis_major_muscle_l')).toBe(false);
  });

  it('reorders anatomical layers and peels/restores layers sequentially according to custom layerOrder', () => {
    expect(useAnatomyStore.getState().layerOrder).toEqual(DEFAULT_LAYER_ORDER);
    const sampleMuscle = Z_ANATOMY_CATALOG.find((i) => i.system === 'muscular')!;
    const sampleBone = Z_ANATOMY_CATALOG.find((i) => i.system === 'skeletal')!;

    // Move muscular above integumentary (index 1 -> index 0)
    useAnatomyStore.getState().moveLayerOrder('muscular', 'up');
    expect(useAnatomyStore.getState().layerOrder[0]).toBe('muscular');
    expect(useAnatomyStore.getState().layerOrder[1]).toBe('integumentary');

    // Peel next layer in order (should peel 'muscular' first since it's now at index 0)
    useAnatomyStore.getState().peelNextLayerInOrder();
    expect(useAnatomyStore.getState().hiddenNodeIds.has(sampleMuscle.id)).toBe(true);
    expect(useAnatomyStore.getState().hiddenNodeIds.has(sampleBone.id)).toBe(false);

    // Restore previous layer in order
    useAnatomyStore.getState().restorePreviousLayerInOrder();
    expect(useAnatomyStore.getState().hiddenNodeIds.has(sampleMuscle.id)).toBe(false);

    // Reset layer order
    useAnatomyStore.getState().resetLayerOrder();
    expect(useAnatomyStore.getState().layerOrder).toEqual(DEFAULT_LAYER_ORDER);
  });
});

describe('Offline Parts Manager & Selective GPU Part Loading for High FPS', () => {
  beforeEach(() => {
    resetStoreForTest();
  });

  it('exposes complete manifest of 11 anatomical .GLB parts with valid sizes and functions', () => {
    expect(ANATOMY_PARTS_MANIFEST.length).toBe(11);
    expect(getTotalDownloadSizeMb()).toBeGreaterThan(30);
    const nervousPart = getPartManifestById('nervous');
    expect(nervousPart).toBeDefined();
    expect(nervousPart?.url).toBe('/models/anatomy/nervous_male.glb');
    expect(nervousPart?.physiologicalFunction.length).toBeGreaterThan(20);
  });

  it('manages selectivePartLoading and loadedParts without allowing zero parts in GPU', () => {
    useAnatomyStore.getState().setSelectivePartLoading(true);
    expect(useAnatomyStore.getState().selectivePartLoading).toBe(true);

    useAnatomyStore.getState().setLoadedParts(['skeletal', 'nervous']);
    expect(useAnatomyStore.getState().loadedParts.size).toBe(2);

    // Toggle off nervous -> leaves skeletal
    useAnatomyStore.getState().toggleLoadedPart('nervous');
    expect(useAnatomyStore.getState().loadedParts.has('nervous')).toBe(false);
    expect(useAnatomyStore.getState().loadedParts.has('skeletal')).toBe(true);

    // Attempting to toggle off the last remaining part ('skeletal') keeps at least 1 part
    useAnatomyStore.getState().toggleLoadedPart('skeletal');
    expect(useAnatomyStore.getState().loadedParts.size).toBe(1);
  });

  it('caches /draco/gltf/* decoder files required by useGLTF in RealBodyAtlas', () => {
    expect(DRACO_STATIC_FILES).toContain('/draco/gltf/draco_decoder.wasm');
    expect(DRACO_STATIC_FILES).toContain('/draco/gltf/draco_wasm_wrapper.js');
    expect(DRACO_STATIC_FILES).toContain('/draco/gltf/draco_decoder.js');
  });

  it('translates selectedNodeId bidirectionally when switching viewType between realistic and exploded', () => {
    useAnatomyStore.getState().focusClinicalTargetIds(['fma:lobus_frontalis']);
    expect(useAnatomyStore.getState().selectedNodeId).toBe('za:precentral_gyrus_l');

    useAnatomyStore.getState().setViewType('exploded');
    expect(useAnatomyStore.getState().selectedNodeId).toBe('fma:lobus_frontalis');
    expect(resolveCatalogIdToDidacticId('za:precentral_gyrus_l')).toBe('fma:lobus_frontalis');

    useAnatomyStore.getState().setViewType('realistic');
    expect(useAnatomyStore.getState().selectedNodeId).toBe('za:precentral_gyrus_l');
  });

  it('separates male vs female reproductive IDs when checking layer visibility and cleans peeledHistory on female toggle', () => {
    const maleIds = getSystemCheckIdsForSex('reproductive', 'male');
    const femaleIds = getSystemCheckIdsForSex('reproductive', 'female');
    expect(maleIds.length).toBeGreaterThan(0);
    expect(femaleIds.length).toBeGreaterThan(0);
    expect(maleIds.every((id) => !id.startsWith('za:vh_f_'))).toBe(true);
    expect(femaleIds.every((id) => id.startsWith('za:vh_f_'))).toBe(true);

    useAnatomyStore.getState().toggleGroupVisibility(maleIds);
    expect(maleIds.every((id) => useAnatomyStore.getState().hiddenNodeIds.has(id))).toBe(true);
    expect(femaleIds.some((id) => !useAnatomyStore.getState().hiddenNodeIds.has(id))).toBe(true);

    useAnatomyStore.getState().toggleSystemPeel('reproductive');
    expect(maleIds.some((id) => !useAnatomyStore.getState().hiddenNodeIds.has(id))).toBe(true);

    useAnatomyStore.getState().peelNodeOnClick('za:vh_f_uterus_body', 'Corpo do Útero');
    expect(useAnatomyStore.getState().peeledHistory.length).toBe(1);
    useAnatomyStore.getState().setBiologicalSex('female');
    expect(useAnatomyStore.getState().hiddenNodeIds.has('za:vh_f_uterus_body')).toBe(false);
    expect(useAnatomyStore.getState().peeledHistory.length).toBe(0);
  });

  it('defines 4-column sidebar tabs and all tactile mineral CSS classes in index.css', () => {
    const cssPath = path.resolve(process.cwd(), 'src/client/index.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('grid-template-columns: repeat(4, 1fr)');
    const requiredClasses = [
      '.tree-filters-container',
      '.filter-section-card',
      '.filter-section-header',
      '.filter-section-title',
      '.filter-icon-accent',
      '.filter-badge-value',
      '.filter-helper-text',
      '.filter-presets-grid',
      '.filter-preset-btn',
      '.layer-opacity-pill',
      '.filter-region-pills',
      '.filter-region-pill',
      '.layer-peel-list',
      '.layer-peel-item',
      '.filter-action-btn',
      '.outliner-search-icon',
    ];
    for (const cls of requiredClasses) {
      expect(css, `Missing CSS rule for ${cls}`).toContain(cls);
    }
  });

  it('executes downloadPartToOfflineCache, getCachedPartIds and removePartFromOfflineCache with isolated CacheStorage', async () => {
    const storeMap = new Map<string, Response>();
    const mockCache = {
      match: vi.fn(async (req: RequestInfo | URL) => {
        const key = typeof req === 'string' ? req : req.toString();
        return storeMap.get(key)?.clone();
      }),
      put: vi.fn(async (req: RequestInfo | URL, resp: Response) => {
        const key = typeof req === 'string' ? req : req.toString();
        storeMap.set(key, resp.clone());
      }),
      delete: vi.fn(async (req: RequestInfo | URL) => {
        const key = typeof req === 'string' ? req : req.toString();
        return storeMap.delete(key);
      }),
    };
    const mockCaches = {
      open: vi.fn(async () => mockCache),
    };
    const mockFetch = vi.fn(async () => new Response(new Uint8Array([103, 108, 84, 70]), { status: 200 }));

    vi.stubGlobal('caches', mockCaches);
    vi.stubGlobal('fetch', mockFetch);
    vi.stubGlobal('window', { caches: mockCaches, fetch: mockFetch });

    try {
      const progressSteps: number[] = [];
      const downloaded = await downloadPartToOfflineCache('endocrine', (pct) => progressSteps.push(pct));
      expect(downloaded).toBe(true);
      expect(progressSteps).toContain(100);

      const cachedIds = await getCachedPartIds();
      expect(cachedIds).toContain('endocrine');

      const removed = await removePartFromOfflineCache('endocrine');
      expect(removed).toBe(true);

      const afterRemove = await getCachedPartIds();
      expect(afterRemove).not.toContain('endocrine');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('enforces the 3-zone header, single Enquadrar 3D camera button and default hidden TelemetryOverlay', () => {
    const appSource = fs.readFileSync(path.resolve(process.cwd(), 'src/client/App.tsx'), 'utf-8');
    expect(appSource).toContain('HEADER_PRESETS');
    expect(appSource).toContain('Estúdio Neuroclínico');
    expect(appSource).not.toContain('Cloud & Telemetria');

    const gizmoSource = fs.readFileSync(
      path.resolve(process.cwd(), 'src/client/components/canvas/OrientationGizmo.tsx'),
      'utf-8'
    );
    expect(gizmoSource).toContain('Enquadrar 3D');
    expect(gizmoSource).not.toContain('Post');

    expect(useAnatomyStore.getState().modules.telemetryVisible).toBe(false);
  });

  it('assigns distinct neuroanatomical area colors and sulcal shaders for brain lobes and subcortical nuclei', async () => {
    const { getNervousTissueProfile, applyAnatomicalTissueShader } = await import(
      '../src/core/visibilityManager.ts'
    );

    const frontalSup = getNervousTissueProfile('Superior frontal gyrus.l', 'Giro Frontal Superior');
    const frontalMid = getNervousTissueProfile('Middle frontal gyrus.l', 'Giro Frontal Médio');
    const parietal = getNervousTissueProfile('Postcentral gyrus.l', 'Giro Pós-Central');
    const temporal = getNervousTissueProfile('Superior temporal gyrus.l', 'Giro Temporal Superior');
    const occipital = getNervousTissueProfile('Cuneus.l', 'Cúneo');
    const caudate = getNervousTissueProfile('Caudate nucleus.l', 'Núcleo Caudado');
    const thalamus = getNervousTissueProfile('Thalamus.l', 'Tálamo');
    const cerebellum = getNervousTissueProfile('Cerebellar hemisphere.l', 'Hemisfério Cerebelar');
    const ventricles = getNervousTissueProfile('Lateral ventricle.l', 'Ventrículo Lateral');
    const dura = getNervousTissueProfile('Falx cerebri', 'Foice do Cérebro');

    expect(frontalSup.area).toBe('frontal');
    expect(frontalSup.baseAreaHex).toBe('#8b5cf6');
    // Giros adjacentes do mesmo lobo têm tons distintos para separação visual imediata
    expect(frontalSup.colorHex).not.toBe(frontalMid.colorHex);

    expect(parietal.area).toBe('parietal');
    expect(parietal.baseAreaHex).toBe('#06b6d4');
    expect(temporal.area).toBe('temporal');
    expect(temporal.baseAreaHex).toBe('#10b981');
    expect(occipital.area).toBe('occipital');
    expect(occipital.baseAreaHex).toBe('#f59e0b');
    expect(caudate.area).toBe('basal_ganglia');
    expect(caudate.baseAreaHex).toBe('#f43f5e');
    expect(thalamus.area).toBe('diencephalon');
    expect(thalamus.baseAreaHex).toBe('#fb923c');
    expect(cerebellum.area).toBe('cerebellum');
    expect(cerebellum.shaderMode).toBe('cerebellar');
    expect(ventricles.area).toBe('ventricles');
    expect(dura.area).toBe('meninges');
    expect(dura.opacityFactor).toBeCloseTo(0.38, 2);

    const mat = new THREE.MeshStandardMaterial();
    applyAnatomicalTissueShader(mat, frontalSup.shaderMode);
    expect(mat.customProgramCacheKey()).toContain('anat_tissue_cortical');
  });
});

import { create } from 'zustand';
import { CheckboxState } from '../../shared/types/taxonomicTree.ts';
import { ActiveAnatomicalSystem, AnatomicalRegion } from '../components/canvas/AnatomicalAtlasScene.tsx';
import { DissectionState } from '../../shared/types/dissection.ts';
import {
  Z_ANATOMY_CATALOG,
  Z_ANATOMY_BY_ID,
  Z_ANATOMY_BY_NODE,
  sanitizeNodeName,
} from '../../shared/constants/zAnatomyCatalog.ts';
import { FEMALE_REPRODUCTIVE_CATALOG } from '../../shared/constants/femaleReproductiveCatalog.ts';
import { determineSurgicalLayer } from '../../core/visibilityManager.ts';
import { stepExplosionProgressLinear } from '../../core/explodedEngine.ts';
import { TwoFingerMode } from '../../core/navigationGestures.ts';

export type BiologicalSex = 'male' | 'female';

function normalizeSystemId(sys: string): ActiveAnatomicalSystem {
  if (sys === 'renal') return 'urinary';
  return sys as ActiveAnatomicalSystem;
}

function getNodeAliases(id: string): string[] {
  const item =
    Z_ANATOMY_BY_ID[id] ||
    Z_ANATOMY_BY_NODE[id] ||
    Z_ANATOMY_BY_NODE[sanitizeNodeName(id)];
  if (!item) return [id];
  return Array.from(new Set([item.id, item.node, sanitizeNodeName(item.node)]));
}

// Índices pré-computados O(1) por sistema e por camada cirúrgica para unificar Filtros <-> Árvore TA2
export const SYSTEM_DESCENDANT_ALIASES: Record<string, string[]> = {};
export const LAYER_DESCENDANT_ALIASES: Record<number, string[]> = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};
export const ALL_CATALOG_ALIASES: string[] = [];

for (const item of [...Z_ANATOMY_CATALOG, ...FEMALE_REPRODUCTIVE_CATALOG]) {
  const normSys = normalizeSystemId(item.system);
  const rawSys = item.system;
  const aliases = [item.id, item.node, sanitizeNodeName(item.node)].filter(Boolean);

  if (!SYSTEM_DESCENDANT_ALIASES[normSys]) {
    SYSTEM_DESCENDANT_ALIASES[normSys] = [];
  }
  SYSTEM_DESCENDANT_ALIASES[normSys].push(...aliases);

  if (rawSys !== normSys) {
    if (!SYSTEM_DESCENDANT_ALIASES[rawSys]) {
      SYSTEM_DESCENDANT_ALIASES[rawSys] = [];
    }
    SYSTEM_DESCENDANT_ALIASES[rawSys].push(...aliases);
  }

  const layer = determineSurgicalLayer(item.system, item.node, item.namePtBr);
  if (LAYER_DESCENDANT_ALIASES[layer]) {
    LAYER_DESCENDANT_ALIASES[layer].push(...aliases);
  }

  ALL_CATALOG_ALIASES.push(...aliases);
}

function buildHiddenSetForActiveSystems(activeSystems: Set<ActiveAnatomicalSystem>): Set<string> {
  if (activeSystems.has('all')) {
    return new Set<string>();
  }
  const nextHidden = new Set<string>();
  for (const [sysKey, aliases] of Object.entries(SYSTEM_DESCENDANT_ALIASES)) {
    const normKey = normalizeSystemId(sysKey);
    if (!activeSystems.has(normKey) && !activeSystems.has(sysKey as ActiveAnatomicalSystem)) {
      for (const alias of aliases) {
        nextHidden.add(alias);
      }
    }
  }
  return nextHidden;
}

function buildHiddenSetForDepth(depth: number): Set<string> {
  const nextHidden = new Set<string>();
  if (depth <= 1) return nextHidden;
  for (let l = 1; l < depth; l++) {
    const aliases = LAYER_DESCENDANT_ALIASES[l] || [];
    for (const a of aliases) {
      nextHidden.add(a);
    }
  }
  return nextHidden;
}

export interface ActiveModulesState {
  mprEnabled: boolean;
  explodedProgress: number; // 0.0 a 1.0
  xRayMode: boolean;
  telemetryVisible: boolean;
  solidOpacity: number; // 1.0 (sólido), 0.35 (translúcido), 0.0 (oculto)
}

interface AnatomyStore {
  // 1. Visibilidade, Foco e Seleção de Nós
  hiddenNodeIds: Set<string>;
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  cameraFocusTarget: [number, number, number] | null;
  cameraPositionTarget: [number, number, number] | null;

  // 2. Parâmetros Globais do Motor 3D e Sexo Biológico
  biologicalSex: BiologicalSex;
  setBiologicalSex: (sex: BiologicalSex) => void;
  toggleBiologicalSex: () => void;
  viewType: 'realistic' | 'exploded';
  explosionProgress: number;
  solidOpacity: number;
  xRayMode: boolean;
  activeSystem: ActiveAnatomicalSystem;
  activeRegion: AnatomicalRegion;
  layerPeelingLevel: number;
  activeDepth: number; // 1 a 6 (dissecação por camadas cirúrgicas)
  ghostMode: boolean;
  isolatedOnly: boolean;

  // 3. Multi-Seleção e Opacidades Granulares de Sistemas Anatômicos
  activeSystems: Set<ActiveAnatomicalSystem>;
  systemOpacities: Record<string, number>;
  toggleSystem: (sys: ActiveAnatomicalSystem) => void;
  toggleSystemPeel: (sys: ActiveAnatomicalSystem) => void;
  setAllSystems: () => void;
  addSystem: (sys: ActiveAnatomicalSystem) => void;
  removeSystem: (sys: ActiveAnatomicalSystem) => void;
  isSystemActive: (sys: ActiveAnatomicalSystem) => boolean;
  setSystemOpacity: (sys: ActiveAnatomicalSystem, opacity: number) => void;
  getSystemOpacity: (sys: ActiveAnatomicalSystem) => number;
  resetSystemOpacities: () => void;

  // 4. Dissecção Tomográfica Multiplanar (MPR)
  dissection: DissectionState;

  // 5. Estado dos Módulos Funcionais (Sincronizado)
  modules: ActiveModulesState;

  // 6. Layout da Interface, Navegação 3D e Estúdio Neuroclínico
  outlinerCollapsed: boolean;
  sidebarCollapsed: boolean;
  sidebarTab: 'tree' | 'filters' | 'details';
  clinicalStudioOpen: boolean;
  clinicalStudioTab: 'foramina' | 'brain' | 'nerves' | 'neuroimaging' | 'cases';
  zenMode: boolean;
  preZenOutlinerCollapsed: boolean;
  preZenSidebarCollapsed: boolean;
  twoFingerMode: TwoFingerMode;
  cameraGestureNudge: {
    verticalPanDelta: number;
    azimuthRotateDelta: number;
    dollyScale: number;
    seq: number;
  } | null;
  setSidebarTab: (tab: 'tree' | 'filters' | 'details') => void;
  setClinicalStudioOpen: (open: boolean) => void;
  setClinicalStudioTab: (tab: 'foramina' | 'brain' | 'nerves' | 'neuroimaging' | 'cases') => void;
  focusClinicalTargetIds: (targetNodeIds: string[]) => void;
  setTwoFingerMode: (mode: TwoFingerMode) => void;
  nudgeCameraRig: (delta: {
    verticalPanDelta?: number;
    azimuthRotateDelta?: number;
    dollyScale?: number;
  }) => void;

  // --- Ações de Visibilidade ---
  toggleVisibility: (id: string) => void;
  toggleGroupVisibility: (descendantIds: string[]) => void;
  getGroupCheckboxState: (descendantIds: string[]) => CheckboxState;
  isolateNode: (idOrDescendantIds: string | string[], allIds: string[]) => void;
  showAll: () => void;
  hideAll: (allIds: string[]) => void;

  // --- Ações de Foco e Seleção ---
  setHoveredNode: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  setCameraFocusTarget: (target: [number, number, number] | null) => void;
  setCameraPositionTarget: (pos: [number, number, number] | null) => void;

  // --- Ações Globais do Motor 3D ---
  setViewType: (vt: 'realistic' | 'exploded') => void;
  setExplosionProgress: (val: number) => void;
  stepExplosionProgress: (delta: number) => void;
  setSolidOpacity: (val: number) => void;
  setXRayMode: (val: boolean) => void;
  setActiveSystem: (sys: ActiveAnatomicalSystem) => void;
  setActiveRegion: (reg: AnatomicalRegion) => void;
  setLayerPeelingLevel: (level: number) => void;
  setActiveDepth: (depth: number) => void;
  toggleGhostMode: () => void;
  toggleIsolatedOnly: () => void;
  setDissection: (updater: DissectionState | ((prev: DissectionState) => DissectionState)) => void;

  // --- Ações de Módulos e Layout ---
  setModuleState: (partial: Partial<ActiveModulesState>) => void;
  toggleOutlinerCollapsed: () => void;
  toggleSidebarCollapsed: () => void;
  toggleZenMode: () => void;
  setZenMode: (zen: boolean) => void;
  restoreState: (snapshot: Partial<AnatomyStore> & { activeSystems?: ActiveAnatomicalSystem[] | Set<ActiveAnatomicalSystem> }) => void;

  // --- Presets Anatômicos Canônicos ---
  applyPreset: (presetKey: 'all' | 'skeletal' | 'cranium' | 'cardiorespiratory' | 'visceral') => void;
}

const DEFAULT_SYSTEM_OPACITIES: Record<string, number> = {
  skeletal: 1.0,
  muscular: 1.0,
  cardiovascular: 1.0,
  nervous: 1.0,
  lymphatic: 1.0,
  respiratory: 1.0,
  digestive: 1.0,
  urinary: 1.0,
  endocrine: 1.0,
  reproductive: 1.0,
  integumentary: 1.0,
};

export const useAnatomyStore = create<AnatomyStore>((set, get) => ({
  // 1. Estado Inicial
  hiddenNodeIds: new Set<string>(),
  hoveredNodeId: null,
  selectedNodeId: null,
  cameraFocusTarget: null,
  cameraPositionTarget: null,

  biologicalSex: 'male',
  setBiologicalSex: (sex: BiologicalSex) =>
    set((state) => {
      const nextHidden = new Set(state.hiddenNodeIds);
      if (sex === 'female') {
        // Ao ativar sexo Feminino, garante que a glândula mamária e o aparelho reprodutor feminino fiquem visíveis
        for (const alias of SYSTEM_DESCENDANT_ALIASES['integumentary'] || []) {
          nextHidden.delete(alias);
        }
        for (const alias of SYSTEM_DESCENDANT_ALIASES['reproductive'] || []) {
          nextHidden.delete(alias);
        }
      }
      return {
        biologicalSex: sex,
        hiddenNodeIds: nextHidden,
      };
    }),
  toggleBiologicalSex: () => {
    const nextSex: BiologicalSex = get().biologicalSex === 'male' ? 'female' : 'male';
    get().setBiologicalSex(nextSex);
  },

  viewType: 'realistic',
  explosionProgress: 0.0,
  solidOpacity: 1.0,
  xRayMode: false,
  activeSystem: 'all',
  activeRegion: 'all',
  layerPeelingLevel: 0,
  activeDepth: 1,
  ghostMode: false,
  isolatedOnly: false,

  activeSystems: new Set<ActiveAnatomicalSystem>(['all']),
  systemOpacities: { ...DEFAULT_SYSTEM_OPACITIES },

  dissection: {
    visualMode: 'solid',
    activePlane: 'sagittal',
    offset: 0.0,
    inverted: false,
    showHelper: true,
  },

  modules: {
    mprEnabled: false,
    explodedProgress: 0.0,
    xRayMode: false,
    telemetryVisible: true,
    solidOpacity: 1.0,
  },

  outlinerCollapsed: false,
  sidebarCollapsed: false,
  sidebarTab: 'tree',
  clinicalStudioOpen: false,
  clinicalStudioTab: 'foramina',
  zenMode: false,
  preZenOutlinerCollapsed: false,
  preZenSidebarCollapsed: false,
  twoFingerMode: 'pan-rotate',
  cameraGestureNudge: null,
  setSidebarTab: (tab: 'tree' | 'filters' | 'details') => set({ sidebarTab: tab }),
  setClinicalStudioOpen: (open: boolean) => set({ clinicalStudioOpen: open }),
  setClinicalStudioTab: (tab: 'foramina' | 'brain' | 'nerves' | 'neuroimaging' | 'cases') =>
    set({ clinicalStudioTab: tab, clinicalStudioOpen: true }),
  focusClinicalTargetIds: (targetNodeIds: string[]) => {
    if (!targetNodeIds || targetNodeIds.length === 0) return;
    const primaryId = targetNodeIds[0];
    const isNeuro =
      primaryId.includes('lobus') ||
      primaryId.includes('corpus_callosum') ||
      primaryId.includes('fornix') ||
      primaryId.includes('capsula') ||
      primaryId.includes('nuclei') ||
      primaryId.includes('thalamus') ||
      primaryId.includes('hypothalamus') ||
      primaryId.includes('pineal') ||
      primaryId.includes('hippocampus') ||
      primaryId.includes('meninges') ||
      primaryId.includes('circulus') ||
      primaryId.includes('nervi') ||
      primaryId.includes('cerebellum') ||
      primaryId.includes('mesencephalon') ||
      primaryId.includes('pons') ||
      primaryId.includes('medulla') ||
      primaryId.includes('ventricul');

    set((state) => {
      const nextSystems = new Set<ActiveAnatomicalSystem>(['skeletal', 'nervous']);
      return {
        viewType: isNeuro ? 'exploded' : state.viewType,
        activeSystem: isNeuro ? 'nervous' : 'skeletal',
        activeSystems: nextSystems,
        activeRegion: 'cranium',
        selectedNodeId: primaryId,
        sidebarTab: 'details',
        explosionProgress: state.explosionProgress < 0.25 ? 0.35 : state.explosionProgress,
        modules: {
          ...state.modules,
          explodedProgress: state.explosionProgress < 0.25 ? 0.35 : state.explosionProgress,
        },
      };
    });
  },
  setTwoFingerMode: (mode: TwoFingerMode) => set({ twoFingerMode: mode }),
  nudgeCameraRig: (delta) =>
    set((state) => ({
      cameraFocusTarget: null,
      cameraPositionTarget: null,
      cameraGestureNudge: {
        verticalPanDelta: delta.verticalPanDelta ?? 0,
        azimuthRotateDelta: delta.azimuthRotateDelta ?? 0,
        dollyScale: delta.dollyScale ?? 1,
        seq: (state.cameraGestureNudge?.seq ?? 0) + 1,
      },
    })),

  // --- Ações de Multi-Seleção e Opacidades (Sincronizadas com a Árvore TA2) ---
  toggleSystem: (sys: ActiveAnatomicalSystem) => {
    const normSys = normalizeSystemId(sys);
    set((state) => {
      const next = new Set(state.activeSystems);
      if (next.has('all')) {
        next.clear();
        next.add(normSys);
      } else if (next.has(normSys) || next.has(sys)) {
        next.delete(normSys);
        next.delete(sys);
        if (next.size === 0) {
          next.add('all');
        }
      } else {
        next.add(normSys);
      }

      const legacySys = next.has('all') ? 'all' : (Array.from(next)[0] as ActiveAnatomicalSystem);
      return {
        activeSystems: next,
        activeSystem: legacySys,
        hiddenNodeIds: buildHiddenSetForActiveSystems(next),
        activeDepth: 1,
        layerPeelingLevel: 0,
        isolatedOnly: false,
      };
    });
  },

  toggleSystemPeel: (sys: ActiveAnatomicalSystem) => {
    if (sys === 'all') {
      get().setAllSystems();
      return;
    }
    const normSys = normalizeSystemId(sys);
    set((state) => {
      const aliases = SYSTEM_DESCENDANT_ALIASES[normSys] || [];
      const nextHidden = new Set(state.hiddenNodeIds);
      const nextActive = new Set(state.activeSystems);

      const canonicalIds = aliases.filter((id) => id.startsWith('za:'));
      const checkIds = canonicalIds.length > 0 ? canonicalIds : aliases;
      const isCurrentlyHidden =
        (!nextActive.has('all') && !nextActive.has(normSys)) ||
        (checkIds.length > 0 && checkIds.every((id) => nextHidden.has(id)));

      let nextSex = state.biologicalSex;

      if (isCurrentlyHidden) {
        // Reexibe esta camada sem apagar as demais
        for (const alias of aliases) {
          nextHidden.delete(alias);
        }
        if (!nextActive.has('all')) {
          nextActive.add(normSys);
        }
        if (normSys === 'integumentary' && state.biologicalSex === 'male') {
          nextSex = 'female';
        }
      } else {
        // Descasca (oculta) apenas esta camada mantendo todas as camadas internas visíveis
        for (const alias of aliases) {
          nextHidden.add(alias);
        }
      }

      return {
        biologicalSex: nextSex,
        activeSystems: nextActive,
        hiddenNodeIds: nextHidden,
        isolatedOnly: false,
      };
    });
  },

  setAllSystems: () => {
    set({
      activeSystems: new Set<ActiveAnatomicalSystem>(['all']),
      activeSystem: 'all',
      hiddenNodeIds: new Set<string>(),
      activeDepth: 1,
      layerPeelingLevel: 0,
      isolatedOnly: false,
    });
  },

  addSystem: (sys: ActiveAnatomicalSystem) => {
    const normSys = normalizeSystemId(sys);
    set((state) => {
      const next = new Set(state.activeSystems);
      next.delete('all');
      next.add(normSys);
      return {
        activeSystems: next,
        activeSystem: normSys,
        hiddenNodeIds: buildHiddenSetForActiveSystems(next),
      };
    });
  },

  removeSystem: (sys: ActiveAnatomicalSystem) => {
    const normSys = normalizeSystemId(sys);
    set((state) => {
      const next = new Set(state.activeSystems);
      next.delete(normSys);
      next.delete(sys);
      if (next.size === 0) {
        next.add('all');
      }
      const legacySys = next.has('all') ? 'all' : (Array.from(next)[0] as ActiveAnatomicalSystem);
      return {
        activeSystems: next,
        activeSystem: legacySys,
        hiddenNodeIds: buildHiddenSetForActiveSystems(next),
      };
    });
  },

  isSystemActive: (sys: ActiveAnatomicalSystem) => {
    const systems = get().activeSystems;
    const normSys = normalizeSystemId(sys);
    return systems.has('all') || systems.has(normSys) || systems.has(sys);
  },

  setSystemOpacity: (sys: ActiveAnatomicalSystem, opacity: number) => {
    const clamped = Math.max(0.0, Math.min(1.0, Number(opacity.toFixed(2))));
    set((state) => ({
      systemOpacities: {
        ...state.systemOpacities,
        [sys]: clamped,
      },
      ...(sys === 'skeletal'
        ? {
            solidOpacity: clamped,
            modules: { ...state.modules, solidOpacity: clamped },
          }
        : {}),
    }));
  },

  getSystemOpacity: (sys: ActiveAnatomicalSystem) => {
    const opacities = get().systemOpacities;
    if (opacities && typeof opacities[sys] === 'number') {
      return opacities[sys];
    }
    return get().solidOpacity ?? 1.0;
  },

  resetSystemOpacities: () => {
    set((state) => ({
      solidOpacity: 1.0,
      modules: { ...state.modules, solidOpacity: 1.0 },
      systemOpacities: { ...DEFAULT_SYSTEM_OPACITIES },
    }));
  },

  // --- Ações de Visibilidade Unificadas (Árvore TA2 <-> Cenas 3D) ---
  toggleVisibility: (id: string) => {
    set((state) => {
      const next = new Set(state.hiddenNodeIds);
      const aliases = getNodeAliases(id);
      const isHidden = aliases.some((a) => next.has(a));
      let nextDepth = state.activeDepth;
      const nextActiveSystems = new Set(state.activeSystems);

      if (isHidden) {
        aliases.forEach((a) => next.delete(a));
        const item = Z_ANATOMY_BY_ID[id] || Z_ANATOMY_BY_NODE[id] || Z_ANATOMY_BY_NODE[sanitizeNodeName(id)];
        if (item) {
          const normSys = normalizeSystemId(item.system);
          if (!nextActiveSystems.has('all') && !nextActiveSystems.has(normSys)) {
            nextActiveSystems.add(normSys);
          }
          const layer = determineSurgicalLayer(item.system, item.node, item.namePtBr);
          if (layer < nextDepth) {
            nextDepth = layer;
          }
        }
      } else {
        aliases.forEach((a) => next.add(a));
      }

      return {
        hiddenNodeIds: next,
        activeSystems: nextActiveSystems,
        activeDepth: nextDepth,
        layerPeelingLevel: nextDepth > 1 ? nextDepth : 0,
      };
    });
  },

  toggleGroupVisibility: (descendantIds: string[]) => {
    set((state) => {
      const next = new Set(state.hiddenNodeIds);
      const canonicalIds = descendantIds.filter((id) => id.startsWith('za:'));
      const checkIds = canonicalIds.length > 0 ? canonicalIds : descendantIds;
      const allHidden = checkIds.every((id) => next.has(id));

      let nextDepth = state.activeDepth;
      const nextActiveSystems = new Set(state.activeSystems);

      if (allHidden) {
        for (const id of descendantIds) {
          next.delete(id);
          const item = Z_ANATOMY_BY_ID[id] || Z_ANATOMY_BY_NODE[id];
          if (item) {
            next.delete(item.id);
            next.delete(item.node);
            next.delete(sanitizeNodeName(item.node));
            const normSys = normalizeSystemId(item.system);
            if (!nextActiveSystems.has('all') && !nextActiveSystems.has(normSys)) {
              nextActiveSystems.add(normSys);
            }
            const layer = determineSurgicalLayer(item.system, item.node, item.namePtBr);
            if (layer < nextDepth) {
              nextDepth = layer;
            }
          }
        }
      } else {
        for (const id of descendantIds) {
          next.add(id);
          const item = Z_ANATOMY_BY_ID[id] || Z_ANATOMY_BY_NODE[id];
          if (item) {
            next.add(item.id);
            next.add(item.node);
            next.add(sanitizeNodeName(item.node));
          }
        }
      }

      return {
        hiddenNodeIds: next,
        activeSystems: nextActiveSystems,
        activeDepth: nextDepth,
        layerPeelingLevel: nextDepth > 1 ? nextDepth : 0,
        isolatedOnly: false,
      };
    });
  },

  getGroupCheckboxState: (descendantIds: string[]): CheckboxState => {
    const hidden = get().hiddenNodeIds;
    if (descendantIds.length === 0) return 'checked';

    const canonicalIds = descendantIds.filter((id) => id.startsWith('za:'));
    const effectiveIds = canonicalIds.length > 0 ? canonicalIds : descendantIds;

    let hiddenCount = 0;
    for (const id of effectiveIds) {
      if (hidden.has(id)) hiddenCount++;
    }

    if (hiddenCount === 0) return 'checked';
    if (hiddenCount === effectiveIds.length) return 'unchecked';
    return 'indeterminate';
  },

  isolateNode: (idOrDescendantIds: string | string[], allIds: string[]) => {
    set((state) => {
      const rawTargets = Array.isArray(idOrDescendantIds) ? idOrDescendantIds : [idOrDescendantIds];
      const targetIds = new Set<string>();
      const nextActiveSystems = new Set(state.activeSystems);
      let minLayer = state.activeDepth;

      rawTargets.forEach((rawId) => {
        getNodeAliases(rawId).forEach((alias) => targetIds.add(alias));
        const item = Z_ANATOMY_BY_ID[rawId] || Z_ANATOMY_BY_NODE[rawId];
        if (item) {
          const normSys = normalizeSystemId(item.system);
          if (!nextActiveSystems.has('all') && !nextActiveSystems.has(normSys)) {
            nextActiveSystems.add(normSys);
          }
          const layer = determineSurgicalLayer(item.system, item.node, item.namePtBr);
          if (layer < minLayer) minLayer = layer;
        }
      });

      const universe = allIds.length > 0 ? allIds : ALL_CATALOG_ALIASES;
      const nextHidden = new Set(universe.filter((id) => !targetIds.has(id)));
      return {
        hiddenNodeIds: nextHidden,
        activeSystems: nextActiveSystems,
        activeDepth: minLayer,
        isolatedOnly: true,
      };
    });
  },

  showAll: () => {
    set({
      hiddenNodeIds: new Set<string>(),
      activeSystems: new Set<ActiveAnatomicalSystem>(['all']),
      activeSystem: 'all',
      activeDepth: 1,
      layerPeelingLevel: 0,
      isolatedOnly: false,
    });
  },

  hideAll: (allIds: string[]) => {
    const universe = allIds && allIds.length > 0 ? allIds : ALL_CATALOG_ALIASES;
    const combined = new Set<string>([...universe, ...ALL_CATALOG_ALIASES]);
    set({
      hiddenNodeIds: combined,
      isolatedOnly: false,
    });
  },

  // --- Ações de Foco e Seleção ---
  setHoveredNode: (id: string | null) => set({ hoveredNodeId: id }),

  setSelectedNode: (id: string | null) => set({ selectedNodeId: id }),

  setCameraFocusTarget: (target: [number, number, number] | null) =>
    set({ cameraFocusTarget: target }),

  setCameraPositionTarget: (pos: [number, number, number] | null) =>
    set({ cameraPositionTarget: pos }),

  // --- Ações Globais do Motor 3D ---
  setViewType: (vt: 'realistic' | 'exploded') => set({ viewType: vt }),

  setExplosionProgress: (val: number) => {
    const clamped = Math.round(Math.max(0.0, Math.min(1.0, val)) * 1000) / 1000;
    set((state) => ({
      explosionProgress: clamped,
      modules: { ...state.modules, explodedProgress: clamped },
    }));
  },

  stepExplosionProgress: (delta: number) => {
    set((state) => {
      const next = stepExplosionProgressLinear(state.explosionProgress, delta);
      return {
        explosionProgress: next,
        modules: { ...state.modules, explodedProgress: next },
      };
    });
  },

  setSolidOpacity: (val: number) => {
    const clamped = Math.max(0.0, Math.min(1.0, val));
    set((state) => ({
      solidOpacity: clamped,
      modules: { ...state.modules, solidOpacity: clamped },
      systemOpacities: { ...state.systemOpacities, skeletal: clamped },
    }));
  },

  setXRayMode: (val: boolean) => {
    set((state) => ({
      xRayMode: val,
      modules: { ...state.modules, xRayMode: val },
      dissection: {
        ...state.dissection,
        visualMode: val ? 'xray' : state.dissection.visualMode === 'xray' ? 'solid' : state.dissection.visualMode,
      },
    }));
  },

  setActiveSystem: (sys: ActiveAnatomicalSystem) => {
    const normSys = sys === 'all' ? 'all' : normalizeSystemId(sys);
    const nextSystems = normSys === 'all' ? new Set<ActiveAnatomicalSystem>(['all']) : new Set<ActiveAnatomicalSystem>([normSys]);
    set({
      activeSystem: normSys,
      activeSystems: nextSystems,
      hiddenNodeIds: buildHiddenSetForActiveSystems(nextSystems),
      activeDepth: 1,
      layerPeelingLevel: 0,
    });
  },

  setActiveRegion: (reg: AnatomicalRegion) =>
    set({
      activeRegion: reg,
      cameraFocusTarget: [0, 0, 0],
    }),

  setLayerPeelingLevel: (level: number) => {
    const clamped = level > 0 ? Math.min(6, Math.max(1, level)) : 1;
    set({
      layerPeelingLevel: level,
      activeDepth: clamped,
      activeSystems: new Set<ActiveAnatomicalSystem>(['all']),
      activeSystem: 'all',
      hiddenNodeIds: buildHiddenSetForDepth(clamped),
    });
  },

  setActiveDepth: (depth: number) => {
    const clamped = Math.min(6, Math.max(1, Math.round(depth)));
    set({
      activeDepth: clamped,
      layerPeelingLevel: clamped,
      activeSystems: new Set<ActiveAnatomicalSystem>(['all']),
      activeSystem: 'all',
      hiddenNodeIds: buildHiddenSetForDepth(clamped),
    });
  },

  toggleGhostMode: () => set((state) => ({ ghostMode: !state.ghostMode })),

  toggleIsolatedOnly: () => set((state) => ({ isolatedOnly: !state.isolatedOnly })),

  setDissection: (updater) =>
    set((state) => {
      const nextDissection =
        typeof updater === 'function' ? updater(state.dissection) : updater;
      const nextXRay = nextDissection.visualMode === 'xray';
      const nextMpr = nextDissection.visualMode === 'mpr';
      return {
        dissection: nextDissection,
        xRayMode: nextXRay,
        modules: {
          ...state.modules,
          xRayMode: nextXRay,
          mprEnabled: nextMpr,
        },
      };
    }),

  // --- Ações de Módulos e Layout ---
  setModuleState: (partial: Partial<ActiveModulesState>) => {
    set((state) => {
      const nextExplodedProgress =
        partial.explodedProgress !== undefined
          ? Math.round(Math.max(0.0, Math.min(1.0, partial.explodedProgress)) * 1000) / 1000
          : state.explosionProgress;
      const nextModules = {
        ...state.modules,
        ...partial,
        explodedProgress: nextExplodedProgress,
      };
      const nextSolidOpacity =
        partial.solidOpacity !== undefined
          ? Math.max(0.0, Math.min(1.0, partial.solidOpacity))
          : state.solidOpacity;
      const nextXRay =
        partial.xRayMode !== undefined ? partial.xRayMode : state.xRayMode;
      let nextVisualMode = state.dissection.visualMode;
      if (partial.mprEnabled !== undefined) {
        nextVisualMode = partial.mprEnabled
          ? 'mpr'
          : nextVisualMode === 'mpr'
            ? (nextXRay ? 'xray' : 'solid')
            : nextVisualMode;
      } else if (partial.xRayMode !== undefined) {
        nextVisualMode = partial.xRayMode
          ? 'xray'
          : nextVisualMode === 'xray'
            ? 'solid'
            : nextVisualMode;
      }
      return {
        modules: nextModules,
        explosionProgress: nextExplodedProgress,
        solidOpacity: nextSolidOpacity,
        systemOpacities:
          partial.solidOpacity !== undefined
            ? { ...state.systemOpacities, skeletal: nextSolidOpacity }
            : state.systemOpacities,
        xRayMode: nextXRay,
        dissection:
          nextVisualMode !== state.dissection.visualMode
            ? {
                ...state.dissection,
                visualMode: nextVisualMode,
              }
            : state.dissection,
      };
    });
  },

  toggleOutlinerCollapsed: () =>
    set((state) => ({ outlinerCollapsed: !state.outlinerCollapsed })),

  toggleSidebarCollapsed: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  toggleZenMode: () => {
    set((state) => {
      if (!state.zenMode) {
        return {
          zenMode: true,
          preZenOutlinerCollapsed: state.outlinerCollapsed,
          preZenSidebarCollapsed: state.sidebarCollapsed,
          outlinerCollapsed: true,
          sidebarCollapsed: true,
        };
      } else {
        return {
          zenMode: false,
          outlinerCollapsed: state.preZenOutlinerCollapsed,
          sidebarCollapsed: state.preZenSidebarCollapsed,
        };
      }
    });
  },

  setZenMode: (zen: boolean) => {
    set((state) => {
      if (zen === state.zenMode) return state;
      if (zen) {
        return {
          zenMode: true,
          preZenOutlinerCollapsed: state.outlinerCollapsed,
          preZenSidebarCollapsed: state.sidebarCollapsed,
          outlinerCollapsed: true,
          sidebarCollapsed: true,
        };
      } else {
        return {
          zenMode: false,
          outlinerCollapsed: state.preZenOutlinerCollapsed,
          sidebarCollapsed: state.preZenSidebarCollapsed,
        };
      }
    });
  },

  restoreState: (snapshot: Partial<AnatomyStore> & { activeSystems?: ActiveAnatomicalSystem[] | Set<ActiveAnatomicalSystem> }) => {
    set((state) => {
      let resolvedSystems = state.activeSystems;
      if (snapshot.activeSystems) {
        resolvedSystems = snapshot.activeSystems instanceof Set
          ? snapshot.activeSystems
          : new Set(snapshot.activeSystems);
      }
      return {
        ...state,
        ...snapshot,
        activeSystems: resolvedSystems,
        systemOpacities: {
          ...state.systemOpacities,
          ...(snapshot.systemOpacities || {}),
        },
      };
    });
  },

  // --- Presets Anatômicos Rápidos (Sincronizados com os Checkboxes da Árvore) ---
  applyPreset: (presetKey: 'all' | 'skeletal' | 'cranium' | 'cardiorespiratory' | 'visceral') => {
    set((state) => {
      switch (presetKey) {
        case 'skeletal': {
          const nextSys = new Set<ActiveAnatomicalSystem>(['skeletal']);
          return {
            activeSystem: 'skeletal',
            activeSystems: nextSys,
            activeRegion: 'all',
            solidOpacity: 1.0,
            xRayMode: false,
            isolatedOnly: false,
            activeDepth: 1,
            layerPeelingLevel: 0,
            hiddenNodeIds: buildHiddenSetForActiveSystems(nextSys),
            explosionProgress: 0.0,
            modules: { ...state.modules, solidOpacity: 1.0, explodedProgress: 0.0, xRayMode: false },
            systemOpacities: { ...state.systemOpacities, skeletal: 1.0 },
          };
        }
        case 'cranium': {
          const nextSys = new Set<ActiveAnatomicalSystem>(['skeletal']);
          return {
            activeSystem: 'skeletal',
            activeSystems: nextSys,
            activeRegion: 'cranium',
            solidOpacity: 1.0,
            xRayMode: false,
            isolatedOnly: false,
            activeDepth: 1,
            layerPeelingLevel: 0,
            hiddenNodeIds: buildHiddenSetForActiveSystems(nextSys),
            cameraFocusTarget: [0, 1.45, 0],
            explosionProgress: 0.0,
            modules: { ...state.modules, solidOpacity: 1.0, explodedProgress: 0.0, xRayMode: false },
            systemOpacities: { ...state.systemOpacities, skeletal: 1.0 },
          };
        }
        case 'cardiorespiratory': {
          const nextSys = new Set<ActiveAnatomicalSystem>(['cardiovascular', 'respiratory', 'skeletal']);
          return {
            activeSystem: 'all',
            activeSystems: nextSys,
            activeRegion: 'thorax',
            solidOpacity: 0.35,
            xRayMode: false,
            isolatedOnly: false,
            activeDepth: 1,
            layerPeelingLevel: 0,
            hiddenNodeIds: buildHiddenSetForActiveSystems(nextSys),
            cameraFocusTarget: [0, 0.4, 0],
            explosionProgress: 0.0,
            modules: { ...state.modules, solidOpacity: 0.35, explodedProgress: 0.0, xRayMode: false },
            systemOpacities: {
              ...state.systemOpacities,
              skeletal: 0.35,
              cardiovascular: 1.0,
              respiratory: 1.0,
            },
          };
        }
        case 'visceral': {
          const nextSys = new Set<ActiveAnatomicalSystem>(['digestive', 'urinary']);
          return {
            activeSystem: 'digestive',
            activeSystems: nextSys,
            activeRegion: 'all',
            solidOpacity: 0.0,
            xRayMode: false,
            isolatedOnly: false,
            activeDepth: 1,
            layerPeelingLevel: 0,
            hiddenNodeIds: buildHiddenSetForActiveSystems(nextSys),
            cameraFocusTarget: [0, -0.2, 0],
            explosionProgress: 0.0,
            modules: { ...state.modules, solidOpacity: 0.0, explodedProgress: 0.0, xRayMode: false },
            systemOpacities: { ...state.systemOpacities, skeletal: 0.0 },
          };
        }
        case 'all':
        default:
          return {
            activeSystem: 'all',
            activeSystems: new Set<ActiveAnatomicalSystem>(['all']),
            activeRegion: 'all',
            solidOpacity: 1.0,
            xRayMode: false,
            isolatedOnly: false,
            activeDepth: 1,
            layerPeelingLevel: 0,
            hiddenNodeIds: new Set(),
            explosionProgress: 0.0,
            cameraFocusTarget: [0, 0, 0],
            modules: { ...state.modules, solidOpacity: 1.0, explodedProgress: 0.0, xRayMode: false },
            systemOpacities: { ...DEFAULT_SYSTEM_OPACITIES },
          };
      }
    });
  },
}));

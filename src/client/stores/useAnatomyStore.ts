import { create } from 'zustand';
import { CheckboxState } from '../../shared/types/taxonomicTree.ts';
import { ActiveAnatomicalSystem, AnatomicalRegion } from '../components/canvas/AnatomicalAtlasScene.tsx';
import { DissectionState } from '../../shared/types/dissection.ts';

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

  // 2. Parâmetros Globais do Motor 3D
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

  // 6. Layout da Interface
  outlinerCollapsed: boolean;
  sidebarCollapsed: boolean;
  zenMode: boolean;
  preZenOutlinerCollapsed: boolean;
  preZenSidebarCollapsed: boolean;

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
  zenMode: false,
  preZenOutlinerCollapsed: false,
  preZenSidebarCollapsed: false,

  // --- Ações de Multi-Seleção e Opacidades ---
  toggleSystem: (sys: ActiveAnatomicalSystem) => {
    set((state) => {
      const next = new Set(state.activeSystems);
      if (next.has('all')) {
        next.clear();
        next.add(sys);
      } else if (next.has(sys)) {
        next.delete(sys);
        if (next.size === 0) {
          next.add('all');
        }
      } else {
        next.add(sys);
      }

      const legacySys = next.has('all') ? 'all' : (Array.from(next)[0] as ActiveAnatomicalSystem);
      return { activeSystems: next, activeSystem: legacySys };
    });
  },

  setAllSystems: () => {
    set({
      activeSystems: new Set<ActiveAnatomicalSystem>(['all']),
      activeSystem: 'all',
    });
  },

  addSystem: (sys: ActiveAnatomicalSystem) => {
    set((state) => {
      const next = new Set(state.activeSystems);
      next.delete('all');
      next.add(sys);
      return { activeSystems: next, activeSystem: sys };
    });
  },

  removeSystem: (sys: ActiveAnatomicalSystem) => {
    set((state) => {
      const next = new Set(state.activeSystems);
      next.delete(sys);
      if (next.size === 0) {
        next.add('all');
      }
      const legacySys = next.has('all') ? 'all' : (Array.from(next)[0] as ActiveAnatomicalSystem);
      return { activeSystems: next, activeSystem: legacySys };
    });
  },

  isSystemActive: (sys: ActiveAnatomicalSystem) => {
    const systems = get().activeSystems;
    return systems.has('all') || systems.has(sys);
  },

  setSystemOpacity: (sys: ActiveAnatomicalSystem, opacity: number) => {
    const clamped = Math.max(0.0, Math.min(1.0, Number(opacity.toFixed(2))));
    set((state) => ({
      systemOpacities: {
        ...state.systemOpacities,
        [sys]: clamped,
      },
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
    set({
      systemOpacities: { ...DEFAULT_SYSTEM_OPACITIES },
    });
  },

  // --- Ações de Visibilidade ---
  toggleVisibility: (id: string) => {
    set((state) => {
      const next = new Set(state.hiddenNodeIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { hiddenNodeIds: next };
    });
  },

  toggleGroupVisibility: (descendantIds: string[]) => {
    set((state) => {
      const next = new Set(state.hiddenNodeIds);
      const allHidden = descendantIds.every((id) => next.has(id));

      if (allHidden) {
        descendantIds.forEach((id) => next.delete(id));
      } else {
        descendantIds.forEach((id) => next.add(id));
      }

      return { hiddenNodeIds: next };
    });
  },

  getGroupCheckboxState: (descendantIds: string[]): CheckboxState => {
    const hidden = get().hiddenNodeIds;
    if (descendantIds.length === 0) return 'checked';

    let hiddenCount = 0;
    for (const id of descendantIds) {
      if (hidden.has(id)) hiddenCount++;
    }

    if (hiddenCount === 0) return 'checked';
    if (hiddenCount === descendantIds.length) return 'unchecked';
    return 'indeterminate';
  },

  isolateNode: (idOrDescendantIds: string | string[], allIds: string[]) => {
    set(() => {
      const targetIds = new Set(
        Array.isArray(idOrDescendantIds) ? idOrDescendantIds : [idOrDescendantIds]
      );
      const nextHidden = new Set(allIds.filter((id) => !targetIds.has(id)));
      return {
        hiddenNodeIds: nextHidden,
        isolatedOnly: true,
      };
    });
  },

  showAll: () => {
    set({
      hiddenNodeIds: new Set<string>(),
      isolatedOnly: false,
    });
  },

  hideAll: (allIds: string[]) => {
    set({
      hiddenNodeIds: new Set<string>(allIds),
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
    const clamped = Math.max(0.0, Math.min(1.0, val));
    set((state) => ({
      explosionProgress: clamped,
      modules: { ...state.modules, explodedProgress: clamped },
    }));
  },

  setSolidOpacity: (val: number) => {
    const clamped = Math.max(0.0, Math.min(1.0, val));
    set((state) => ({
      solidOpacity: clamped,
      modules: { ...state.modules, solidOpacity: clamped },
    }));
  },

  setXRayMode: (val: boolean) => {
    set((state) => ({
      xRayMode: val,
      modules: { ...state.modules, xRayMode: val },
    }));
  },

  setActiveSystem: (sys: ActiveAnatomicalSystem) =>
    set({
      activeSystem: sys,
      activeSystems: sys === 'all' ? new Set(['all']) : new Set([sys]),
    }),

  setActiveRegion: (reg: AnatomicalRegion) => set({ activeRegion: reg }),

  setLayerPeelingLevel: (level: number) =>
    set({
      layerPeelingLevel: level,
      activeDepth: level > 0 ? Math.min(6, Math.max(1, level)) : 1,
    }),

  setActiveDepth: (depth: number) => {
    const clamped = Math.min(6, Math.max(1, Math.round(depth)));
    set({
      activeDepth: clamped,
      layerPeelingLevel: clamped,
    });
  },

  toggleGhostMode: () => set((state) => ({ ghostMode: !state.ghostMode })),

  toggleIsolatedOnly: () => set((state) => ({ isolatedOnly: !state.isolatedOnly })),

  setDissection: (updater) =>
    set((state) => ({
      dissection:
        typeof updater === 'function' ? updater(state.dissection) : updater,
    })),

  // --- Ações de Módulos e Layout ---
  setModuleState: (partial: Partial<ActiveModulesState>) => {
    set((state) => {
      const nextModules = { ...state.modules, ...partial };
      return {
        modules: nextModules,
        explosionProgress:
          partial.explodedProgress !== undefined
            ? Math.max(0.0, Math.min(1.0, partial.explodedProgress))
            : state.explosionProgress,
        solidOpacity:
          partial.solidOpacity !== undefined
            ? Math.max(0.0, Math.min(1.0, partial.solidOpacity))
            : state.solidOpacity,
        xRayMode:
          partial.xRayMode !== undefined
            ? partial.xRayMode
            : state.xRayMode,
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

  // --- Presets Anatômicos Rápidos ---
  applyPreset: (presetKey: 'all' | 'skeletal' | 'cranium' | 'cardiorespiratory' | 'visceral') => {
    set((state) => {
      switch (presetKey) {
        case 'skeletal':
          return {
            activeSystem: 'skeletal',
            activeSystems: new Set<ActiveAnatomicalSystem>(['skeletal']),
            activeRegion: 'all',
            solidOpacity: 1.0,
            xRayMode: false,
            hiddenNodeIds: new Set(),
            explosionProgress: 0.0,
            systemOpacities: { ...state.systemOpacities, skeletal: 1.0 },
          };
        case 'cranium':
          return {
            activeSystem: 'skeletal',
            activeSystems: new Set<ActiveAnatomicalSystem>(['skeletal']),
            activeRegion: 'cranium',
            solidOpacity: 1.0,
            xRayMode: false,
            cameraFocusTarget: [0, 1.45, 0],
            explosionProgress: 0.0,
            systemOpacities: { ...state.systemOpacities, skeletal: 1.0 },
          };
        case 'cardiorespiratory':
          return {
            activeSystem: 'all',
            activeSystems: new Set<ActiveAnatomicalSystem>(['cardiovascular', 'respiratory', 'skeletal']),
            activeRegion: 'thorax',
            solidOpacity: 0.35,
            xRayMode: false,
            cameraFocusTarget: [0, 0.4, 0],
            explosionProgress: 0.0,
            systemOpacities: {
              ...state.systemOpacities,
              skeletal: 0.35,
              cardiovascular: 1.0,
              respiratory: 1.0,
            },
          };
        case 'visceral':
          return {
            activeSystem: 'digestive',
            activeSystems: new Set<ActiveAnatomicalSystem>(['digestive', 'urinary']),
            activeRegion: 'all',
            solidOpacity: 0.0,
            xRayMode: false,
            cameraFocusTarget: [0, -0.2, 0],
            explosionProgress: 0.0,
          };
        case 'all':
        default:
          return {
            activeSystem: 'all',
            activeSystems: new Set<ActiveAnatomicalSystem>(['all']),
            activeRegion: 'all',
            solidOpacity: 1.0,
            xRayMode: false,
            hiddenNodeIds: new Set(),
            explosionProgress: 0.0,
            cameraFocusTarget: [0, 0, 0],
            systemOpacities: { ...DEFAULT_SYSTEM_OPACITIES },
          };
      }
    });
  },
}));

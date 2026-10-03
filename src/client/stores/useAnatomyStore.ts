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

  // 3. Dissecção Tomográfica Multiplanar (MPR)
  dissection: DissectionState;

  // 4. Estado dos Módulos Funcionais (Sincronizado)
  modules: ActiveModulesState;

  // 5. Layout da Interface
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
  restoreState: (snapshot: Partial<AnatomyStore>) => void;

  // --- Presets Anatômicos Canônicos ---
  applyPreset: (presetKey: 'all' | 'skeletal' | 'cranium' | 'cardiorespiratory' | 'visceral') => void;
}

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
  activeSystem: 'skeletal',
  activeRegion: 'all',
  layerPeelingLevel: 0,
  activeDepth: 1,
  ghostMode: false,
  isolatedOnly: false,

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
        for (const id of descendantIds) {
          next.delete(id);
        }
      } else {
        for (const id of descendantIds) {
          next.add(id);
        }
      }
      return { hiddenNodeIds: next };
    });
  },

  getGroupCheckboxState: (descendantIds: string[]): CheckboxState => {
    if (descendantIds.length === 0) return 'checked';
    const { hiddenNodeIds } = get();

    let hiddenCount = 0;
    for (const id of descendantIds) {
      if (hiddenNodeIds.has(id)) {
        hiddenCount++;
      }
    }

    if (hiddenCount === 0) return 'checked';
    if (hiddenCount === descendantIds.length) return 'unchecked';
    return 'indeterminate';
  },

  isolateNode: (idOrDescendantIds: string | string[], allIds: string[]) => {
    const keepSet = new Set(
      Array.isArray(idOrDescendantIds) ? idOrDescendantIds : [idOrDescendantIds]
    );
    const next = new Set<string>();

    for (const id of allIds) {
      if (!keepSet.has(id)) {
        next.add(id);
      }
    }

    set({ hiddenNodeIds: next });
  },

  showAll: () => set({ hiddenNodeIds: new Set() }),

  hideAll: (allIds: string[]) => set({ hiddenNodeIds: new Set(allIds) }),

  // --- Ações de Foco e Seleção ---
  setHoveredNode: (id: string | null) => set({ hoveredNodeId: id }),

  setSelectedNode: (id: string | null) => set({ selectedNodeId: id }),

  setCameraFocusTarget: (target: [number, number, number] | null) =>
    set({ cameraFocusTarget: target }),

  setCameraPositionTarget: (pos: [number, number, number] | null) =>
    set({ cameraPositionTarget: pos }),

  // --- Ações Globais do Motor 3D (Sincronização Bidirecional) ---
  setViewType: (vt: 'realistic' | 'exploded') => set({ viewType: vt }),

  setExplosionProgress: (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    set((state) => ({
      explosionProgress: clamped,
      modules: { ...state.modules, explodedProgress: clamped },
    }));
  },

  setSolidOpacity: (val: number) => {
    set((state) => ({
      solidOpacity: val,
      modules: { ...state.modules, solidOpacity: val },
    }));
  },

  setXRayMode: (val: boolean) => {
    set((state) => ({
      xRayMode: val,
      modules: { ...state.modules, xRayMode: val },
    }));
  },

  setActiveSystem: (sys: ActiveAnatomicalSystem) => set({ activeSystem: sys }),

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

  setDissection: (updater: DissectionState | ((prev: DissectionState) => DissectionState)) => {
    set((state) => {
      const next = typeof updater === 'function' ? updater(state.dissection) : updater;
      return {
        dissection: next,
        modules: {
          ...state.modules,
          mprEnabled: next.showHelper,
        },
      };
    });
  },

  // --- Ações de Módulos e Layout ---
  setModuleState: (partial: Partial<ActiveModulesState>) => {
    set((state) => {
      const nextModules = { ...state.modules, ...partial };
      return {
        modules: nextModules,
        explosionProgress:
          partial.explodedProgress !== undefined
            ? partial.explodedProgress
            : state.explosionProgress,
        solidOpacity:
          partial.solidOpacity !== undefined
            ? partial.solidOpacity
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
        // Ativa o Modo Foco Cirúrgico (100% da tela para a cena 3D)
        return {
          zenMode: true,
          preZenOutlinerCollapsed: state.outlinerCollapsed,
          preZenSidebarCollapsed: state.sidebarCollapsed,
          outlinerCollapsed: true,
          sidebarCollapsed: true,
        };
      } else {
        // Restaura a visualização anterior dos painéis
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

  restoreState: (snapshot: Partial<AnatomyStore>) => {
    set((state) => ({
      ...state,
      ...snapshot,
    }));
  },

  // --- Presets Anatômicos Rápidos ---
  applyPreset: (presetKey: 'all' | 'skeletal' | 'cranium' | 'cardiorespiratory' | 'visceral') => {
    set(() => {
      switch (presetKey) {
        case 'skeletal':
          return {
            activeSystem: 'skeletal',
            activeRegion: 'all',
            solidOpacity: 1.0,
            xRayMode: false,
            hiddenNodeIds: new Set(),
            explosionProgress: 0.0,
          };
        case 'cranium':
          return {
            activeSystem: 'skeletal',
            activeRegion: 'cranium',
            solidOpacity: 1.0,
            xRayMode: false,
            cameraFocusTarget: [0, 1.45, 0],
            explosionProgress: 0.0,
          };
        case 'cardiorespiratory':
          return {
            activeSystem: 'all',
            activeRegion: 'thorax',
            solidOpacity: 0.35,
            xRayMode: false,
            cameraFocusTarget: [0, 0.4, 0],
            explosionProgress: 0.0,
          };
        case 'visceral':
          return {
            activeSystem: 'digestive',
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
            activeRegion: 'all',
            solidOpacity: 1.0,
            xRayMode: false,
            hiddenNodeIds: new Set(),
            explosionProgress: 0.0,
            cameraFocusTarget: [0, 0, 0],
          };
      }
    });
  },
}));

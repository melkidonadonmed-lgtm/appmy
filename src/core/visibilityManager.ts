import * as THREE from 'three';
import { AnatomicalMeshUserData } from '../shared/types/anatomy.ts';
import {
  SURGICAL_LAYERS,
  SUPERFICIAL_MUSCLE_KEYWORDS,
  isFasciaOrAponeurosis,
  classifyMuscularTissue,
  isSuperficialMuscle,
  determineSurgicalLayer,
  type MuscularTissueType,
} from './surgicalLayers.ts';
import {
  getMuscleFascicleColor,
  getCorticalGyrusColor,
  getMuscularTissueProfile,
  getNervousTissueProfile,
  applyAnatomicalTissueShader,
  type AnatomicalShaderTissueType,
  type NervousFunctionalArea,
  type NervousTissueProfile,
} from './tissueShader.ts';

export {
  SURGICAL_LAYERS,
  SUPERFICIAL_MUSCLE_KEYWORDS,
  isFasciaOrAponeurosis,
  classifyMuscularTissue,
  isSuperficialMuscle,
  determineSurgicalLayer,
  getMuscleFascicleColor,
  getCorticalGyrusColor,
  getMuscularTissueProfile,
  getNervousTissueProfile,
  applyAnatomicalTissueShader,
  type MuscularTissueType,
  type AnatomicalShaderTissueType,
  type NervousFunctionalArea,
  type NervousTissueProfile,
};

export interface VisibilityState {
  hiddenIds: Set<string>;
  selectedId: string | null;
  activeDepth: number; // 1 a 6
  ghostMode: boolean;
  isolatedOnly: boolean;
}

const SCRATCH_NATURAL_COLOR = new THREE.Color();
const SELECTED_TINT_COLOR = new THREE.Color('#38bdf8');
const SELECTED_EMISSIVE_COLOR = new THREE.Color('#0ea5e9');
const GHOST_BASE_COLOR = new THREE.Color('#64748b');
const ZERO_EMISSIVE_COLOR = new THREE.Color('#000000');

const GROUP_ISOLATION_THRESHOLD = 500;
const MIN_VISIBLE_OPACITY = 0.001;
const SKELETAL_DEFAULT_ROUGHNESS = 0.54;
const SOFT_TISSUE_DEFAULT_ROUGHNESS = 0.42;
const SELECTED_LERP_FACTOR = 0.34;
const SELECTED_EMISSIVE_INTENSITY = 0.24;
const SELECTED_ROUGHNESS = 0.32;
const GHOST_ROUGHNESS = 0.72;
const GHOST_OPACITY = 0.1;
const CONTEXT_LERP_FACTOR = 0.22;
const CONTEXT_ROUGHNESS = 0.68;
const CONTEXT_MAX_OPACITY = 0.72;
const OPAQUE_THRESHOLD = 0.99;
const DEPTH_WRITE_OPACITY_THRESHOLD = 0.85;

const NOOP_RAYCAST = () => {};

/**
 * Atualiza deterministicamente a visibilidade, materiais e blindagem de raycast de uma malha
 * com zero alocações de objetos temporários no loop.
 */
export function updateMeshVisibility(
  mesh: THREE.Mesh,
  state: VisibilityState,
  baseMaterial: THREE.MeshStandardMaterial,
  defaultColor = '#cbd5e1',
  baseOpacity = 1.0
): boolean {
  const data = (mesh.userData || {}) as Partial<AnatomicalMeshUserData> & {
    __isCatalogItem?: boolean;
    __tissueColor?: string;
    __tissueOpacityFactor?: number;
    __tissueRoughness?: number;
    __tissueType?: MuscularTissueType;
  };
  const id = data.id || mesh.name;
  const depth =
    data.camadaProfundidade ??
    determineSurgicalLayer(data.sistema || '', mesh.name, data.nomePt || '');

  // 1. Regra de Profundidade Cirúrgica: Peças mais superficiais que o activeDepth são dissecadas/ocultas
  const isDepthVisible = depth >= state.activeDepth;

  // 2. Regra de Ocultar Manual (Dissecação pontual via Árvore / Filtro)
  const isManuallyHidden =
    state.hiddenIds.has(id) ||
    state.hiddenIds.has(mesh.name) ||
    (data.id ? state.hiddenIds.has(data.id) : false);

  // 3. Regra de Isolamento (Modo Solo Individual ou de Grupo)
  const isSelected =
    state.selectedId === id ||
    state.selectedId === mesh.name ||
    (data.id ? state.selectedId === data.id : false);
  const isGroupIsolationActive = state.hiddenIds.size > GROUP_ISOLATION_THRESHOLD;
  const isIsolatedHidden =
    state.isolatedOnly &&
    !isSelected &&
    (isGroupIsolationActive
      ? data.__isCatalogItem === false
      : state.selectedId !== null || data.__isCatalogItem === false);

  const visible =
    isDepthVisible &&
    !isManuallyHidden &&
    !isIsolatedHidden &&
    (isSelected || baseOpacity > MIN_VISIBLE_OPACITY);
  mesh.visible = visible;

  // 4. Blindagem Ativa do Raycaster na GPU:
  const isGhost = state.ghostMode && state.selectedId !== null && !isSelected;

  if (!visible || isGhost) {
    mesh.raycast = NOOP_RAYCAST;
  } else {
    mesh.raycast = THREE.Mesh.prototype.raycast;
  }

  if (!visible) return false;

  // 5. Aplicação de Shading e Destaque Visual (Zero-Allocation)
  const isContextAttenuated = !state.ghostMode && state.selectedId !== null && !isSelected;
  const effectiveColor = data.__tissueColor || defaultColor;
  const tissueOpacityFactor = data.__tissueOpacityFactor ?? 1.0;
  const effectiveBaseOpacity = Math.max(0.0, Math.min(1.0, baseOpacity * tissueOpacityFactor));
  const defaultRoughness =
    data.__tissueRoughness ??
    (data.sistema === 'skeletal' ? SKELETAL_DEFAULT_ROUGHNESS : SOFT_TISSUE_DEFAULT_ROUGHNESS);

  if (isSelected) {
    SCRATCH_NATURAL_COLOR.set(effectiveColor).lerp(SELECTED_TINT_COLOR, SELECTED_LERP_FACTOR);
    baseMaterial.color.copy(SCRATCH_NATURAL_COLOR);
    baseMaterial.emissive.copy(SELECTED_EMISSIVE_COLOR);
    baseMaterial.emissiveIntensity = SELECTED_EMISSIVE_INTENSITY;
    baseMaterial.roughness = SELECTED_ROUGHNESS;
    baseMaterial.opacity = 1.0;
    baseMaterial.transparent = false;
    baseMaterial.depthWrite = true;
  } else if (isGhost) {
    baseMaterial.color.copy(GHOST_BASE_COLOR);
    baseMaterial.emissive.copy(ZERO_EMISSIVE_COLOR);
    baseMaterial.emissiveIntensity = 0;
    baseMaterial.roughness = GHOST_ROUGHNESS;
    baseMaterial.opacity = GHOST_OPACITY;
    baseMaterial.transparent = true;
    baseMaterial.depthWrite = false;
  } else if (isContextAttenuated) {
    SCRATCH_NATURAL_COLOR.set(effectiveColor).lerp(GHOST_BASE_COLOR, CONTEXT_LERP_FACTOR);
    baseMaterial.color.copy(SCRATCH_NATURAL_COLOR);
    baseMaterial.emissive.copy(ZERO_EMISSIVE_COLOR);
    baseMaterial.emissiveIntensity = 0;
    baseMaterial.roughness = CONTEXT_ROUGHNESS;
    baseMaterial.opacity = Math.min(effectiveBaseOpacity, CONTEXT_MAX_OPACITY);
    baseMaterial.transparent = true;
    baseMaterial.depthWrite = effectiveBaseOpacity >= OPAQUE_THRESHOLD;
  } else {
    baseMaterial.color.set(effectiveColor);
    baseMaterial.emissive.copy(ZERO_EMISSIVE_COLOR);
    baseMaterial.emissiveIntensity = 0;
    baseMaterial.roughness = defaultRoughness;
    baseMaterial.opacity = effectiveBaseOpacity;
    baseMaterial.transparent = effectiveBaseOpacity < OPAQUE_THRESHOLD;
    baseMaterial.depthWrite =
      data.__tissueType === 'fascia'
        ? false
        : effectiveBaseOpacity >= DEPTH_WRITE_OPACITY_THRESHOLD;
  }

  return true;
}

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
  getMuscularTissueProfile,
  applyAnatomicalTissueShader,
} from './tissueShader.ts';

export {
  SURGICAL_LAYERS,
  SUPERFICIAL_MUSCLE_KEYWORDS,
  isFasciaOrAponeurosis,
  classifyMuscularTissue,
  isSuperficialMuscle,
  determineSurgicalLayer,
  getMuscleFascicleColor,
  getMuscularTissueProfile,
  applyAnatomicalTissueShader,
  type MuscularTissueType,
};

export interface VisibilityState {
  hiddenIds: Set<string>;
  selectedId: string | null;
  activeDepth: number; // 1 a 6
  ghostMode: boolean;
  isolatedOnly: boolean;
}

/**
 * Atualiza deterministicamente a visibilidade, materiais e blindagem de raycast de uma malha
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
  // Corrige bug em que ocultar manualmente poucos itens (hiddenIds.size > 0) impedia o isolamento da peça selecionada.
  const isSelected =
    state.selectedId === id ||
    state.selectedId === mesh.name ||
    (data.id ? state.selectedId === data.id : false);
  const isGroupIsolationActive = state.hiddenIds.size > 500;
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
    (isSelected || baseOpacity > 0.001);
  mesh.visible = visible;

  // 4. Blindagem Ativa do Raycaster na GPU:
  // Se invisível OU se for um objeto secundário em Ghosting (transparência 10%),
  // anula imediatamente o método raycast para que o clique nunca seja interceptado acidentalmente.
  const isGhost = state.ghostMode && state.selectedId !== null && !isSelected;

  if (!visible || isGhost) {
    mesh.raycast = () => {};
  } else {
    mesh.raycast = THREE.Mesh.prototype.raycast;
  }

  if (!visible) return false;

  // 5. Aplicação de Shading e Destaque Visual (Preservação de Relevo Anatômico + Toque Translúcido Contextual)
  const isContextAttenuated = !state.ghostMode && state.selectedId !== null && !isSelected;
  const effectiveColor = data.__tissueColor || defaultColor;
  const tissueOpacityFactor = data.__tissueOpacityFactor ?? 1.0;
  const effectiveBaseOpacity = Math.max(0.0, Math.min(1.0, baseOpacity * tissueOpacityFactor));
  const defaultRoughness =
    data.__tissueRoughness ?? (data.sistema === 'skeletal' ? 0.54 : 0.42);

  if (isSelected) {
    const naturalColor = new THREE.Color(effectiveColor);
    naturalColor.lerp(new THREE.Color('#38bdf8'), 0.24);
    baseMaterial.color.copy(naturalColor);
    baseMaterial.emissive.set('#0ea5e9');
    baseMaterial.emissiveIntensity = 0.16;
    baseMaterial.roughness = 0.34;
    baseMaterial.opacity = 1.0;
    baseMaterial.transparent = false;
    baseMaterial.depthWrite = true;
  } else if (isGhost) {
    baseMaterial.color.set('#64748b');
    baseMaterial.emissive.set('#000000');
    baseMaterial.emissiveIntensity = 0;
    baseMaterial.roughness = 0.72;
    baseMaterial.opacity = 0.10;
    baseMaterial.transparent = true;
    baseMaterial.depthWrite = false;
  } else if (isContextAttenuated) {
    const softenedColor = new THREE.Color(effectiveColor);
    softenedColor.lerp(new THREE.Color('#64748b'), 0.18);
    baseMaterial.color.copy(softenedColor);
    baseMaterial.emissive.set('#000000');
    baseMaterial.emissiveIntensity = 0;
    baseMaterial.roughness = 0.68;
    baseMaterial.opacity = Math.min(effectiveBaseOpacity, 0.72);
    baseMaterial.transparent = true;
    baseMaterial.depthWrite = effectiveBaseOpacity >= 0.99;
  } else {
    baseMaterial.color.set(effectiveColor);
    baseMaterial.emissive.set('#000000');
    baseMaterial.emissiveIntensity = 0;
    baseMaterial.roughness = defaultRoughness;
    baseMaterial.opacity = effectiveBaseOpacity;
    baseMaterial.transparent = effectiveBaseOpacity < 0.99;
    baseMaterial.depthWrite = data.__tissueType === 'fascia' ? false : effectiveBaseOpacity >= 0.85;
  }

  return true;
}

import * as THREE from 'three';
import { AnatomicalMeshUserData, SurgicalLayerDepth } from '../shared/types/anatomy.ts';

export interface VisibilityState {
  hiddenIds: Set<string>;
  selectedId: string | null;
  activeDepth: number; // 1 a 6
  ghostMode: boolean;
  isolatedOnly: boolean;
}

/**
 * Mapeamento canônico das 6 camadas cirúrgicas de dissecação
 */
export const SURGICAL_LAYERS: Record<
  SurgicalLayerDepth,
  { labelPt: string; labelLatin: string; desc: string }
> = {
  1: {
    labelPt: 'Tegumento Comum',
    labelLatin: 'Integumentum commune',
    desc: 'Pele, epiderme e tecido adiposo subcutâneo superficial',
  },
  2: {
    labelPt: 'Muscular Superficial',
    labelLatin: 'Musculi superficiales',
    desc: 'Grandes massas musculares superficiais de cobertura e alavanca',
  },
  3: {
    labelPt: 'Muscular Profundo',
    labelLatin: 'Musculi profundi',
    desc: 'Músculos posturais profundos, intercostais e manguito rotador',
  },
  4: {
    labelPt: 'Esqueleto Axial & Apendicular',
    labelLatin: 'Systema skeletale',
    desc: 'Bússola axial central (coluna, bacia) e esqueleto apendicular',
  },
  5: {
    labelPt: 'Vascular & Nervoso',
    labelLatin: 'Systema cardiovasculare et nervosum',
    desc: 'Grandes vasos, plexos nervosos, troncos e medula espinhal',
  },
  6: {
    labelPt: 'Vísceras & Cavidades',
    labelLatin: 'Viscera et organa interna',
    desc: 'Órgãos torácicos, abdominais, pélvicos e encéfalo',
  },
};

/**
 * Lista canônica de radicais de músculos superficiais (Camada 2)
 */
const SUPERFICIAL_MUSCLE_KEYWORDS = [
  'deltoid', 'deltoide', 'peitoral maior', 'pectoralis major',
  'trapezius', 'trapezio', 'trapézio', 'latissimus', 'grande dorsal',
  'rectus abdominis', 'reto abdominal', 'obliquo externo', 'obliquus externus',
  'biceps', 'bíceps', 'brachioradialis', 'braquiorradial',
  'rectus femoris', 'reto femoral', 'gastrocnemius', 'gastrocnemio', 'gastrocnêmio',
  'soleus', 'soleo', 'sóleo', 'gluteus maximus', 'gluteo maximo', 'glúteo máximo',
  'platysma', 'platisma', 'sternocleidomastoid', 'esternocleidomastoideo',
  'sartorius', 'sartorio', 'sartório', 'gracilis', 'gracil', 'grácil'
];

/**
 * Avalia se um músculo pertence à fáscia/camada muscular superficial
 */
export function isSuperficialMuscle(meshName: string, nomePt = ''): boolean {
  const combined = (meshName + ' ' + nomePt).toLowerCase();
  return SUPERFICIAL_MUSCLE_KEYWORDS.some((kw) => combined.includes(kw));
}

/**
 * Determina a camada cirúrgica (1 a 6) de qualquer peça anatômica
 */
export function determineSurgicalLayer(
  sistema: string,
  meshName: string,
  nomePt = ''
): SurgicalLayerDepth {
  const sysLower = (sistema || '').toLowerCase();

  // Camada 1: Tegumento
  if (sysLower.includes('integumentary') || sysLower.includes('tegumento') || sysLower.includes('skin')) {
    return 1;
  }

  // Camadas 2 e 3: Miologia (Superficial vs Profunda)
  if (sysLower.includes('muscular') || sysLower.includes('miologia') || sysLower.includes('muscle')) {
    return isSuperficialMuscle(meshName, nomePt) ? 2 : 3;
  }

  // Camada 4: Esqueleto e Articulações
  if (
    sysLower.includes('skeletal') ||
    sysLower.includes('esqueleto') ||
    sysLower.includes('articular') ||
    sysLower.includes('osteologia')
  ) {
    return 4;
  }

  // Camada 5: Sistema Cardiovascular, Nervoso e Linfático
  if (
    sysLower.includes('cardiovascular') ||
    sysLower.includes('nervous') ||
    sysLower.includes('nervoso') ||
    sysLower.includes('lymphatic') ||
    sysLower.includes('linfatico') ||
    sysLower.includes('linfático')
  ) {
    return 5;
  }

  // Camada 6: Órgãos Internos e Vísceras
  return 6;
}

/**
 * Atualiza determinísticamente a visibilidade, materiais e blindagem de raycast de uma malha
 */
export function updateMeshVisibility(
  mesh: THREE.Mesh,
  state: VisibilityState,
  baseMaterial: THREE.MeshStandardMaterial,
  defaultColor = '#cbd5e1'
): boolean {
  const data = (mesh.userData || {}) as Partial<AnatomicalMeshUserData>;
  const id = data.id || mesh.name;
  const depth = data.camadaProfundidade ?? determineSurgicalLayer(data.sistema || '', mesh.name, data.nomePt || '');

  // 1. Regra de Profundidade Cirúrgica: Peças mais superficiais que o activeDepth são dissecadas/ocultas
  const isDepthVisible = depth >= state.activeDepth;

  // 2. Regra de Ocultar Manual (Dissecação pontual)
  const isManuallyHidden =
    state.hiddenIds.has(id) ||
    state.hiddenIds.has(mesh.name) ||
    (data.id ? state.hiddenIds.has(data.id) : false);

  // 3. Regra de Isolamento (Modo Solo)
  const isSelected = state.selectedId === id || state.selectedId === mesh.name;
  const isIsolatedHidden = state.isolatedOnly && state.selectedId !== null && !isSelected;

  const visible = isDepthVisible && !isManuallyHidden && !isIsolatedHidden;
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

  // 5. Aplicação de Shading e Destaque Visual
  if (isSelected) {
    baseMaterial.color.set('#38bdf8');
    baseMaterial.emissive.set('#0284c7');
    baseMaterial.emissiveIntensity = 0.85;
    baseMaterial.opacity = 1.0;
    baseMaterial.transparent = false;
  } else if (isGhost) {
    baseMaterial.color.set('#64748b');
    baseMaterial.emissive.set('#000000');
    baseMaterial.emissiveIntensity = 0;
    baseMaterial.opacity = 0.10;
    baseMaterial.transparent = true;
  } else {
    baseMaterial.color.set(defaultColor);
    baseMaterial.emissive.set('#000000');
    baseMaterial.emissiveIntensity = 0;
    baseMaterial.opacity = 1.0;
    baseMaterial.transparent = false;
  }

  return true;
}

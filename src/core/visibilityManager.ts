import * as THREE from 'three';
import { AnatomicalMeshUserData, SurgicalLayerDepth } from '../shared/types/anatomy.ts';

export interface VisibilityState {
  hiddenIds: Set<string>;
  selectedId: string | null;
  activeDepth: number; // 1 a 6
  ghostMode: boolean;
  isolatedOnly: boolean;
}

export type MuscularTissueType = 'fascia' | 'tendon' | 'bursa' | 'muscle';

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
    desc: 'Fáscias de revestimento, aponeuroses e grandes massas musculares superficiais',
  },
  3: {
    labelPt: 'Muscular Profundo',
    labelLatin: 'Musculi profundi',
    desc: 'Músculos posturais profundos, intercostais, manguito rotador e bolsas sinoviais',
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
 * Lista canônica de radicais de músculos superficiais e fáscias de revestimento (Camada 2)
 */
const SUPERFICIAL_MUSCLE_KEYWORDS = [
  'deltoid', 'deltoide', 'peitoral maior', 'pectoralis major',
  'trapezius', 'trapezio', 'trapézio', 'latissimus', 'grande dorsal',
  'rectus abdominis', 'reto abdominal', 'obliquo externo', 'obliquus externus', 'external oblique',
  'biceps', 'bíceps', 'triceps', 'tríceps', 'brachioradialis', 'braquiorradial',
  'rectus femoris', 'reto femoral', 'vastus lateralis', 'vastus medialis', 'vasto lateral', 'vasto medial',
  'gastrocnemius', 'gastrocnemio', 'gastrocnêmio',
  'soleus', 'soleo', 'sóleo', 'gluteus maximus', 'gluteo maximo', 'glúteo máximo', 'gluteus medius',
  'tensor fasciae latae', 'platysma', 'platisma', 'sternocleidomastoid', 'esternocleidomastoideo',
  'sartorius', 'sartorio', 'sartório', 'gracilis', 'gracil', 'grácil',
  'adductor longus', 'semitendinosus', 'tibialis anterior', 'fibularis longus', 'peroneus longus',
  'serratus anterior', 'flexor carpi radialis', 'flexor carpi ulnaris', 'palmaris longus',
  'extensor digitorum', 'extensor carpi', 'orbicularis', 'zygomaticus', 'masseter', 'temporalis',
  'frontalis', 'occipitalis', 'occipitofrontalis',
];

/**
 * Detecta se uma estrutura pertence ao grupo de Fáscias, Aponeuroses, Retináculos e Septos
 */
export function isFasciaOrAponeurosis(meshName: string, nomePt = ''): boolean {
  const combined = `${meshName} ${nomePt}`.toLowerCase();
  if (combined.includes('tensor fasciae') || combined.includes('tensor da fáscia')) {
    return false;
  }
  return /\b(fascia|fáscia|aponeurosis|aponeurose|retinaculum|retináculo|retinaculo|tract|trato|septum|septo|arch|arco|ligament|ligamento)\b/i.test(
    combined
  );
}

/**
 * Classifica o tipo histológico/funcional de qualquer malha do sistema muscular
 */
export function classifyMuscularTissue(meshName: string, nomePt = ''): MuscularTissueType {
  const combined = `${meshName} ${nomePt}`.toLowerCase();
  if (isFasciaOrAponeurosis(meshName, nomePt)) {
    return 'fascia';
  }
  if (/\b(bursa|bursae|bolsa|bolsas|sheath|sheaths|bainha|bainhas)\b/i.test(combined)) {
    return 'bursa';
  }
  if (/\b(tendon|tendão|tendao)\b/i.test(combined)) {
    return 'tendon';
  }
  return 'muscle';
}

/**
 * Gera uma variação cromática sutil e determinística por ventre/fascículo muscular
 * para que cabeças adjacentes (ex: clavicular, acromial e espinhal do deltoide)
 * não se fundam em uma massa vermelha chapada e tenham estrias/divisões nítidas.
 */
export function getMuscleFascicleColor(meshName: string, baseHex = '#b91c1c'): string {
  let hash = 0;
  const clean = (meshName || '').toLowerCase();
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) | 0;
  }
  const base = new THREE.Color(baseHex);
  const hsl = { h: 0, s: 0, l: 0 };
  base.getHSL(hsl);
  const hueOffset = (((hash & 0xff) / 255) - 0.5) * 0.018;
  const satOffset = ((((hash >> 8) & 0xff) / 255) - 0.5) * 0.08;
  const lightOffset = ((((hash >> 16) & 0xff) / 255) - 0.5) * 0.07;
  base.setHSL(
    Math.max(0, Math.min(1, hsl.h + hueOffset)),
    Math.max(0.45, Math.min(0.88, hsl.s + satOffset)),
    Math.max(0.26, Math.min(0.46, hsl.l + lightOffset))
  );
  return `#${base.getHexString()}`;
}

/**
 * Retorna o perfil visual canônico (cor, rugosidade, fator de opacidade) para tecidos miológicos:
 * - Fáscias & Aponeuroses: Branco-perolado prateado translúcido (#e2e8f0) para ver a fáscia E os músculos abaixo
 * - Bolsas & Bainhas Sinoviais: Azul-sinovial translúcido (#7dd3fc)
 * - Tendões: Marfim colágeno denso (#ede6d6)
 * - Músculos Estriados: Carmim miofibrilar com diferenciação por fascículo
 */
export function getMuscularTissueProfile(
  meshName: string,
  nomePt = '',
  defaultMuscleColor = '#b91c1c'
): {
  tissueType: MuscularTissueType;
  colorHex: string;
  opacityFactor: number;
  roughness: number;
  metalness: number;
} {
  const tissueType = classifyMuscularTissue(meshName, nomePt);
  switch (tissueType) {
    case 'fascia':
      return {
        tissueType: 'fascia',
        colorHex: '#e2e8f0', // Branco-perolado / prateado fascial
        opacityFactor: 0.42, // Membrana translúcida que revela o ventre muscular subjacente
        roughness: 0.28,
        metalness: 0.08,
      };
    case 'bursa':
      return {
        tissueType: 'bursa',
        colorHex: '#7dd3fc', // Azul-ciano sinovial
        opacityFactor: 0.58,
        roughness: 0.22,
        metalness: 0.05,
      };
    case 'tendon':
      return {
        tissueType: 'tendon',
        colorHex: '#ede6d6', // Marfim colágeno tendíneo
        opacityFactor: 0.94,
        roughness: 0.34,
        metalness: 0.04,
      };
    case 'muscle':
    default:
      return {
        tissueType: 'muscle',
        colorHex: getMuscleFascicleColor(meshName, defaultMuscleColor),
        opacityFactor: 1.0,
        roughness: 0.38,
        metalness: 0.05,
      };
  }
}

/**
 * Injeta shader procedural GPU (Zero-Allocation em VRAM) no MeshStandardMaterial
 * para renderizar estrias musculares longitudinais (miofibrilas e perimísio) nos ventres
 * musculares e trama colágena acetinada nas fáscias e aponeuroses.
 */
export function applyAnatomicalTissueShader(
  material: THREE.MeshStandardMaterial,
  tissueType: MuscularTissueType,
  fiberAxis: [number, number, number] = [0, 1, 0],
  fiberSpan: [number, number] = [-0.1, 0.1]
): void {
  const axisVec = new THREE.Vector3(fiberAxis[0], fiberAxis[1], fiberAxis[2]);
  if (axisVec.lengthSq() < 0.0001) axisVec.set(0, 1, 0);
  axisVec.normalize();

  // Constrói dois eixos ortogonais transversais às fibras para gerar as estrias longitudinais
  const refUp = Math.abs(axisVec.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const crossU = new THREE.Vector3().crossVectors(axisVec, refUp).normalize();
  const crossV = new THREE.Vector3().crossVectors(axisVec, crossU).normalize();

  material.customProgramCacheKey = () => `anat_tissue_${tissueType}`;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFiberAxis = { value: axisVec };
    shader.uniforms.uCrossU = { value: crossU };
    shader.uniforms.uCrossV = { value: crossV };
    shader.uniforms.uFiberSpan = { value: new THREE.Vector2(fiberSpan[0], fiberSpan[1]) };
    shader.uniforms.uTissueMode = {
      value: tissueType === 'muscle' ? 1 : tissueType === 'fascia' ? 2 : tissueType === 'tendon' ? 3 : 0,
    };

    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vAnatLocalPos;`
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      vAnatLocalPos = position;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vAnatLocalPos;
      uniform vec3 uFiberAxis;
      uniform vec3 uCrossU;
      uniform vec3 uCrossV;
      uniform vec2 uFiberSpan;
      uniform int uTissueMode;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      if (uTissueMode == 1) {
        // Coordenadas transversais e longitudinais do ventre muscular
        float along = dot(vAnatLocalPos, uFiberAxis);
        float across1 = dot(vAnatLocalPos, uCrossU);
        float across2 = dot(vAnatLocalPos, uCrossV);
        float fiberCoord = across1 * 1.15 + across2 * 0.85 + along * 0.08;

        // Multicamadas de estrias miofibrilares (feixes primários, secundários e microfibrilas)
        float bundlePrimary = sin(fiberCoord * 240.0);
        float bundleSecondary = sin(fiberCoord * 580.0 + along * 18.0);
        float microStriation = sin(fiberCoord * 1250.0 - along * 28.0);
        float striationWave = bundlePrimary * 0.48 + bundleSecondary * 0.34 + microStriation * 0.18;

        // Contraste entre sulcos de perimísio (escuros) e cristas de feixes musculares (vívidas)
        float grooveMask = smoothstep(-0.65, 0.65, striationWave);
        vec3 deepGroove = diffuseColor.rgb * 0.64;
        vec3 ridgeHighlight = mix(diffuseColor.rgb * 1.18, vec3(0.95, 0.42, 0.38), 0.18);
        diffuseColor.rgb = mix(deepGroove, ridgeHighlight, grooveMask);

        // Transição tendínea nacarada sutil nas extremidades de origem/inserção do ventre
        float spanLen = max(0.02, uFiberSpan.y - uFiberSpan.x);
        float normAlong = clamp((along - uFiberSpan.x) / spanLen, 0.0, 1.0);
        float tendonTip = smoothstep(0.86, 1.0, abs(normAlong * 2.0 - 1.0));
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.91, 0.87, 0.80), tendonTip * 0.42);
      } else if (uTissueMode == 2) {
        // Trama colágena cruzada branco-perolada da fáscia
        float along = dot(vAnatLocalPos, uFiberAxis);
        float across = dot(vAnatLocalPos, uCrossU) + dot(vAnatLocalPos, uCrossV);
        float weave1 = sin((across * 420.0) + (along * 140.0));
        float weave2 = sin((across * 420.0) - (along * 140.0));
        float collagen = smoothstep(-0.3, 0.8, weave1 * 0.6 + weave2 * 0.4);
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.88, vec3(0.98, 0.99, 1.0), collagen * 0.35);
      } else if (uTissueMode == 3) {
        // Fibras colágenas paralelas densas de tendões
        float across = dot(vAnatLocalPos, uCrossU) + dot(vAnatLocalPos, uCrossV);
        float tendonFiber = sin(across * 680.0) * 0.5 + 0.5;
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.86, vec3(0.97, 0.95, 0.90), tendonFiber * 0.28);
      }`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <normal_fragment_maps>',
      `#include <normal_fragment_maps>
      if (uTissueMode == 1) {
        float across = dot(vAnatLocalPos, uCrossU) * 1.15 + dot(vAnatLocalPos, uCrossV) * 0.85;
        float along = dot(vAnatLocalPos, uFiberAxis);
        float ridgeDeriv = cos(across * 240.0) * 0.55 + cos(across * 580.0 + along * 18.0) * 0.45;
        vec3 tangentPerturb = normalize(uCrossU + uCrossV) * (ridgeDeriv * 0.16);
        normal = normalize(normal + tangentPerturb);
      }`
    );
  };
  material.needsUpdate = true;
}

/**
 * Avalia se um músculo pertence à fáscia/camada muscular superficial (Camada 2)
 */
export function isSuperficialMuscle(meshName: string, nomePt = ''): boolean {
  if (isFasciaOrAponeurosis(meshName, nomePt)) {
    return true;
  }
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

  // Camadas 2 e 3: Miologia (Fáscias & Músculos Superficiais vs Músculos Profundos)
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
  const depth = data.camadaProfundidade ?? determineSurgicalLayer(data.sistema || '', mesh.name, data.nomePt || '');

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
  const isIsolatedHidden =
    state.isolatedOnly &&
    !isSelected &&
    (state.hiddenIds.size === 0
      ? state.selectedId !== null
      : data.__isCatalogItem === false);

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
    // Preserva a cor anatômica natural da peça mesclada suavemente (24%) com ciano clínico,
    // evitando o estouramento branco (white washout) que oculta sulcos e fibras da peça.
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
    // Leve toque de translucidez/fosqueamento nas estruturas vizinhas não selecionadas
    // para destacar a peça ativa em foco nítido sem precisar pintá-la de branco.
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

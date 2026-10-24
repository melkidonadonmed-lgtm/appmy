import * as THREE from 'three';
import { classifyMuscularTissue, MuscularTissueType } from './surgicalLayers.ts';

export type AnatomicalShaderTissueType = MuscularTissueType | 'cortical' | 'cerebellar';

export type NervousFunctionalArea =
  | 'frontal'
  | 'parietal'
  | 'temporal'
  | 'occipital'
  | 'limbic'
  | 'white_matter'
  | 'basal_ganglia'
  | 'diencephalon'
  | 'cerebellum'
  | 'brainstem'
  | 'ventricles'
  | 'meninges'
  | 'spinal_cord'
  | 'cranial_nerves'
  | 'sensory'
  | 'cortex_general';

export interface NervousTissueProfile {
  area: NervousFunctionalArea;
  areaLabelPt: string;
  colorHex: string;
  baseAreaHex: string;
  opacityFactor: number;
  roughness: number;
  metalness: number;
  shaderMode: 'cortical' | 'cerebellar' | 'fascia' | 'tendon';
}

const GLSL_PRIMARY_BUNDLE_FREQ = '240.0';
const GLSL_SECONDARY_BUNDLE_FREQ = '580.0';
const GLSL_SECONDARY_ALONG_FREQ = '18.0';
const GLSL_MICRO_STRIATION_FREQ = '1250.0';
const GLSL_MICRO_ALONG_FREQ = '28.0';
const GLSL_FASCIA_WEAVE_ACROSS_FREQ = '420.0';
const GLSL_FASCIA_WEAVE_ALONG_FREQ = '140.0';
const GLSL_TENDON_FIBER_FREQ = '680.0';
const GLSL_CORTICAL_SULCUS_FREQ = '95.0';
const GLSL_CORTICAL_Y_FREQ = '62.0';
const GLSL_CORTICAL_Z_FREQ = '78.0';
const GLSL_CORTICAL_MICRO_Y_FREQ = '135.0';
const GLSL_CORTICAL_MICRO_Z_FREQ = '110.0';
const GLSL_CEREBELLAR_FOLIA_FREQ = '460.0';
const GLSL_CEREBELLAR_DEPTH_FREQ = '85.0';

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
 * Gera uma variação cromática determinística por giro/subestrutura cortical
 * dentro do mesmo lobo cerebral para que giros adjacentes (ex: frontal superior,
 * médio, inferior e pré-central) tenham separação visual imediata além do relevo sulcal.
 */
export function getCorticalGyrusColor(meshName: string, baseHex: string): string {
  let hash = 0;
  // Remove sufixos de lateralidade (.l/.r) para que giros homólogos esquerdo/direito mantenham paridade simétrica
  const clean = (meshName || '').toLowerCase().replace(/\.(l|r)$/, '').trim();
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 37 + clean.charCodeAt(i)) | 0;
  }
  const base = new THREE.Color(baseHex);
  const hsl = { h: 0, s: 0, l: 0 };
  base.getHSL(hsl);
  const hueOffset = (((hash & 0xff) / 255) - 0.5) * 0.032;
  const satOffset = ((((hash >> 8) & 0xff) / 255) - 0.5) * 0.12;
  const lightOffset = ((((hash >> 16) & 0xff) / 255) - 0.5) * 0.11;
  base.setHSL(
    (hsl.h + hueOffset + 1.0) % 1.0,
    Math.max(0.35, Math.min(0.92, hsl.s + satOffset)),
    Math.max(0.32, Math.min(0.68, hsl.l + lightOffset))
  );
  return `#${base.getHexString()}`;
}

/**
 * Classifica cada estrutura neuroanatômica do Z-Anatomy / TA2 em sua área funcional
 * e retorna paleta cromática de alto contraste, sombreamento sulcal e rugosidade física.
 */
export function getNervousTissueProfile(
  meshName: string,
  nomePt = '',
  defaultColor = '#eab308'
): NervousTissueProfile {
  const text = `${meshName} ${nomePt}`.toLowerCase();

  // 1. Meninges, Foice e Tentório (semitransparentes para visualizar o córtex subjacente)
  if (/(dura mater|falx|foice|tentorium|tentorio|tenda do cerebelo|arachnoid|aracnoide|pia mater|pia-mater|mening|diaphragma sellae)/.test(text)) {
    return {
      area: 'meninges',
      areaLabelPt: 'Meninges & Foice/Tentório',
      baseAreaHex: '#94a3b8',
      colorHex: '#94a3b8',
      opacityFactor: 0.38,
      roughness: 0.30,
      metalness: 0.06,
      shaderMode: 'fascia',
    };
  }

  // 2. Sistema Ventricular, Plexo Corióideo e Cisternas Liquóricas (LCR azul cristalino)
  if (/(ventricul|ventricle|choroid plexus|plexo corio|aqueduct|aqueduto|cistern|foramen of monro|interventricular foramen)/.test(text)) {
    return {
      area: 'ventricles',
      areaLabelPt: 'Sistema Ventricular & LCR',
      baseAreaHex: '#38bdf8',
      colorHex: getCorticalGyrusColor(meshName, '#38bdf8'),
      opacityFactor: 0.84,
      roughness: 0.18,
      metalness: 0.10,
      shaderMode: 'cortical',
    };
  }

  // 3. Órgãos Sensoriais (Olho, Córnea, Esclera, Retina, Orelha Interna)
  if (/(eyeball|bulbo ocular|cornea|sclera|esclera|retina|iris|crystalline lens|cristalino|choroid|cochlea|coclea|semicircular|vestibul|tympan)/.test(text)) {
    return {
      area: 'sensory',
      areaLabelPt: 'Órgãos Sensoriais',
      baseAreaHex: '#60a5fa',
      colorHex: getCorticalGyrusColor(meshName, '#60a5fa'),
      opacityFactor: 0.94,
      roughness: 0.24,
      metalness: 0.08,
      shaderMode: 'cortical',
    };
  }

  // 4. Cerebelo (Hemisférios, Vérmis, Lóbulos, Flóculo, Nódulo, Tonsila, Núcleos Cerebelares)
  if (/(cerebell|cerebel|vermis|floccul|floculo|nodul|tonsil|fastig|dentate nucleus|nucleo denteado|emboliform|globose|arbor vitae)/.test(text)) {
    return {
      area: 'cerebellum',
      areaLabelPt: 'Cerebelo',
      baseAreaHex: '#d97706',
      colorHex: getCorticalGyrusColor(meshName, '#d97706'),
      opacityFactor: 1.0,
      roughness: 0.44,
      metalness: 0.04,
      shaderMode: 'cerebellar',
    };
  }

  // 5. Tronco Encefálico (Mesencéfalo, Ponte, Bulbo / Medula Oblonga)
  if (/(midbrain|mesencephal|mesencefalo|collicul|coliculo|tectum|tegment|cerebral peduncle|crus cerebri)/.test(text)) {
    return {
      area: 'brainstem',
      areaLabelPt: 'Tronco Encefálico (Mesencéfalo)',
      baseAreaHex: '#ec4899',
      colorHex: getCorticalGyrusColor(meshName, '#ec4899'),
      opacityFactor: 1.0,
      roughness: 0.36,
      metalness: 0.05,
      shaderMode: 'cortical',
    };
  }
  if (/(\bpons\b|\bponte\b|pontine|pontino)/.test(text)) {
    return {
      area: 'brainstem',
      areaLabelPt: 'Tronco Encefálico (Ponte)',
      baseAreaHex: '#a855f7',
      colorHex: getCorticalGyrusColor(meshName, '#a855f7'),
      opacityFactor: 1.0,
      roughness: 0.36,
      metalness: 0.05,
      shaderMode: 'cortical',
    };
  }
  if (/(medulla oblongata|bulbo|bulbar|pyramid|piramide|olive|oliva|obex|gracile|cuneate|brainstem|tronco encefalico)/.test(text)) {
    return {
      area: 'brainstem',
      areaLabelPt: 'Tronco Encefálico (Bulbo)',
      baseAreaHex: '#6366f1',
      colorHex: getCorticalGyrusColor(meshName, '#6366f1'),
      opacityFactor: 1.0,
      roughness: 0.36,
      metalness: 0.05,
      shaderMode: 'cortical',
    };
  }

  // 6. Diencéfalo & Hipófise (Tálamo, Hipotálamo, Epitálamo, Glândula Pineal, Hipófise, Quiasma)
  if (/(thalam|talamo|hypothalam|hipotalamo|epithalam|subthalam|pineal|pituitar|hipofise|neurohypoph|adenohypoph|infundibul|tuber cinereum|optic chiasm|quiasma|geniculate|geniculado|pulvinar)/.test(text)) {
    return {
      area: 'diencephalon',
      areaLabelPt: 'Diencéfalo (Tálamo & Hipotálamo)',
      baseAreaHex: '#fb923c',
      colorHex: getCorticalGyrusColor(meshName, '#fb923c'),
      opacityFactor: 1.0,
      roughness: 0.34,
      metalness: 0.06,
      shaderMode: 'cortical',
    };
  }

  // 7. Núcleos da Base (Caudado, Putâmen, Globo Pálido, Claustrum, Accumbens, Substância Negra, Rubro)
  if (/(caudate|caudado|putamen|globus pallidus|globo palido|pallidum|lentiform|lenticular|striatum|estriado|claustrum|accumbens|substantia nigra|red nucleus|nucleo rubro|basal ganglia|nucleos da base)/.test(text)) {
    return {
      area: 'basal_ganglia',
      areaLabelPt: 'Núcleos da Base',
      baseAreaHex: '#f43f5e',
      colorHex: getCorticalGyrusColor(meshName, '#f43f5e'),
      opacityFactor: 1.0,
      roughness: 0.32,
      metalness: 0.06,
      shaderMode: 'cortical',
    };
  }

  // 8. Sistema Límbico & Córtex Insular (Hipocampo, Amígdala, Cíngulo, Parahipocampal, Ínsula, Fórnix, Mamilares)
  if (/(hippocamp|hipocampo|amygdal|amigdala|cingul|cingulo|parahippocamp|insula|uncus|dentate gyrus|giro denteado|subicul|entorhinal|fimbria|mammillary|mamilar|limbic|limbico|septum pellucidum|septo pelucido)/.test(text)) {
    return {
      area: 'limbic',
      areaLabelPt: 'Sistema Límbico & Ínsula',
      baseAreaHex: '#14b8a6',
      colorHex: getCorticalGyrusColor(meshName, '#14b8a6'),
      opacityFactor: 1.0,
      roughness: 0.36,
      metalness: 0.05,
      shaderMode: 'cortical',
    };
  }

  // 9. Substância Branca, Corpo Caloso, Fórnix, Cápsulas e Tratos Comissurais/Projeção
  if (/(corpus callosum|corpo caloso|fornix|commissur|comissura|internal capsule|capsula interna|external capsule|extreme capsule|corona radiata|coroa radiada|radiation|radiacao|tapetum|fascicul|lemnisc|stria|tract|trato|white matter|substancia branca)/.test(text)) {
    return {
      area: 'white_matter',
      areaLabelPt: 'Substância Branca & Comissuras',
      baseAreaHex: '#e2e8f0',
      colorHex: getCorticalGyrusColor(meshName, '#cbd5e1'),
      opacityFactor: 1.0,
      roughness: 0.30,
      metalness: 0.05,
      shaderMode: 'tendon',
    };
  }

  // 10. Lobo Frontal (Pré-central / M1, Frontal Superior/Médio/Inferior, Orbital, Reto, Broca, Paracentral anterior)
  if (/(frontal|precentral|pre-central|orbital gyrus|giro orbital|gyrus rectus|giro reto|straight gyrus|pars opercularis|pars triangularis|pars orbitalis|broca|subcallosal|frontomarginal)/.test(text)) {
    return {
      area: 'frontal',
      areaLabelPt: 'Lobo Frontal (Motor & Executivo)',
      baseAreaHex: '#8b5cf6',
      colorHex: getCorticalGyrusColor(meshName, '#8b5cf6'),
      opacityFactor: 1.0,
      roughness: 0.38,
      metalness: 0.05,
      shaderMode: 'cortical',
    };
  }

  // 11. Lobo Parietal (Pós-central / S1, Parietal Superior/Inferior, Supramarginal, Angular, Pré-cúneo, Paracentral)
  if (/(parietal|postcentral|pos-central|supramarginal|angular gyrus|giro angular|precuneus|pre-cuneo|paracentral)/.test(text)) {
    return {
      area: 'parietal',
      areaLabelPt: 'Lobo Parietal (Somatossensorial)',
      baseAreaHex: '#06b6d4',
      colorHex: getCorticalGyrusColor(meshName, '#06b6d4'),
      opacityFactor: 1.0,
      roughness: 0.38,
      metalness: 0.05,
      shaderMode: 'cortical',
    };
  }

  // 12. Lobo Temporal (Temporal Superior/Médio/Inferior, Heschl / Transverso, Fusiforme, Occipitotemporal, Wernicke)
  if (/(temporal|fusiform|occipitotemporal|heschl|planum temporale|wernicke)/.test(text)) {
    return {
      area: 'temporal',
      areaLabelPt: 'Lobo Temporal (Auditivo & Memória)',
      baseAreaHex: '#10b981',
      colorHex: getCorticalGyrusColor(meshName, '#10b981'),
      opacityFactor: 1.0,
      roughness: 0.38,
      metalness: 0.05,
      shaderMode: 'cortical',
    };
  }

  // 13. Lobo Occipital (Cúneo, Lingual, Calcarino / V1, Giros Occipitais)
  if (/(occipital|cuneus|\bcuneo\b|lingual gyrus|giro lingual|calcarin)/.test(text)) {
    return {
      area: 'occipital',
      areaLabelPt: 'Lobo Occipital (Visual V1)',
      baseAreaHex: '#f59e0b',
      colorHex: getCorticalGyrusColor(meshName, '#f59e0b'),
      opacityFactor: 1.0,
      roughness: 0.38,
      metalness: 0.05,
      shaderMode: 'cortical',
    };
  }

  // 14. Medula Espinhal e Raízes Medulares
  if (/(spinal cord|medula espinhal|conus medullaris|cone medular|cauda equina|filum terminale|funiculus)/.test(text)) {
    return {
      area: 'spinal_cord',
      areaLabelPt: 'Medula Espinhal',
      baseAreaHex: '#fde047',
      colorHex: getCorticalGyrusColor(meshName, '#fde047'),
      opacityFactor: 1.0,
      roughness: 0.35,
      metalness: 0.04,
      shaderMode: 'tendon',
    };
  }

  // 15. Nervos Cranianos (I-XII), Gânglios e Plexos Periféricos
  if (/(nerve|nervo|nervus|ganglion|ganglio|plexus|plexo|root|raiz|ramus|ramo|trunk|tronco simpatico|sympathetic|vagus|trigemin|facial|optic|olfactor|oculomotor|trochlear|abducen|vestibulocochlear|glossopharyng|accessory|hypogloss|sciatic|median|ulnar|radial|femoral|phrenic)/.test(text)) {
    return {
      area: 'cranial_nerves',
      areaLabelPt: 'Nervos Cranianos & Periféricos',
      baseAreaHex: '#facc15',
      colorHex: getCorticalGyrusColor(meshName, defaultColor || '#facc15'),
      opacityFactor: 1.0,
      roughness: 0.34,
      metalness: 0.06,
      shaderMode: 'tendon',
    };
  }

  // 16. Córtex Cerebral Geral / Telencéfalo restante
  return {
    area: 'cortex_general',
    areaLabelPt: 'Córtex Cerebral',
    baseAreaHex: '#c084fc',
    colorHex: getCorticalGyrusColor(meshName, '#c084fc'),
    opacityFactor: 1.0,
    roughness: 0.38,
    metalness: 0.05,
    shaderMode: 'cortical',
  };
}

/**
 * Retorna o perfil visual canônico (cor, rugosidade, fator de opacidade) para tecidos miológicos:
 * - Fáscias & Aponeuroses: Branco-perolado prateado translúcido (#e2e8f0) para ver a fáscia E os músculos abaixo
 * - Bolsas & Bainhas Sinoviais: Azul-sinovial translúcido (#7dd3fc)
 * - Tendões & Ligamentos: Marfim colágeno denso (#ede6d6)
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
        colorHex: '#e2e8f0',
        opacityFactor: 0.42,
        roughness: 0.28,
        metalness: 0.08,
      };
    case 'bursa':
      return {
        tissueType: 'bursa',
        colorHex: '#7dd3fc',
        opacityFactor: 0.58,
        roughness: 0.22,
        metalness: 0.05,
      };
    case 'tendon':
      return {
        tissueType: 'tendon',
        colorHex: '#ede6d6',
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
 * para renderizar:
 * - Estrias musculares longitudinais (miofibrilas e perimísio) nos ventres musculares
 * - Trama colágena acetinada nas fáscias e aponeuroses
 * - Fibras densas nos tendões e tratos de substância branca
 * - Sombreamento sulcal profundo e relevo giral/foliar no encéfalo e cerebelo
 * - Sombreamento de parede interna em cortes tomográficos MPR (!gl_FrontFacing)
 */
export function applyAnatomicalTissueShader(
  material: THREE.MeshStandardMaterial,
  tissueType: AnatomicalShaderTissueType,
  fiberAxis: [number, number, number] = [0, 1, 0],
  fiberSpan: [number, number] = [-0.1, 0.1]
): void {
  const axisVec = new THREE.Vector3(fiberAxis[0], fiberAxis[1], fiberAxis[2]);
  if (axisVec.lengthSq() < 0.0001) axisVec.set(0, 1, 0);
  axisVec.normalize();

  const refUp = Math.abs(axisVec.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const crossU = new THREE.Vector3().crossVectors(axisVec, refUp);
  if (crossU.lengthSq() > 1e-12) crossU.normalize();
  const crossV = new THREE.Vector3().crossVectors(axisVec, crossU);
  if (crossV.lengthSq() > 1e-12) crossV.normalize();

  const modeInt =
    tissueType === 'muscle'
      ? 1
      : tissueType === 'fascia'
        ? 2
        : tissueType === 'tendon'
          ? 3
          : tissueType === 'cortical'
            ? 4
            : tissueType === 'cerebellar'
              ? 5
              : 0;

  material.customProgramCacheKey = () => `anat_tissue_${tissueType}`;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFiberAxis = { value: axisVec };
    shader.uniforms.uCrossU = { value: crossU };
    shader.uniforms.uCrossV = { value: crossV };
    shader.uniforms.uFiberSpan = { value: new THREE.Vector2(fiberSpan[0], fiberSpan[1]) };
    shader.uniforms.uTissueMode = { value: modeInt };

    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vAnatLocalPos;
      varying vec3 vAnatLocalNormal;`
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      vAnatLocalPos = position;
      vAnatLocalNormal = normal;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vAnatLocalPos;
      varying vec3 vAnatLocalNormal;
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
        float along = dot(vAnatLocalPos, uFiberAxis);
        float across1 = dot(vAnatLocalPos, uCrossU);
        float across2 = dot(vAnatLocalPos, uCrossV);
        float fiberCoord = across1 * 1.15 + across2 * 0.85 + along * 0.08;

        float bundlePrimary = sin(fiberCoord * ${GLSL_PRIMARY_BUNDLE_FREQ});
        float bundleSecondary = sin(fiberCoord * ${GLSL_SECONDARY_BUNDLE_FREQ} + along * ${GLSL_SECONDARY_ALONG_FREQ});
        float microStriation = sin(fiberCoord * ${GLSL_MICRO_STRIATION_FREQ} - along * ${GLSL_MICRO_ALONG_FREQ});
        float striationWave = bundlePrimary * 0.48 + bundleSecondary * 0.34 + microStriation * 0.18;

        float grooveMask = smoothstep(-0.65, 0.65, striationWave);
        vec3 deepGroove = diffuseColor.rgb * 0.64;
        vec3 ridgeHighlight = mix(diffuseColor.rgb * 1.18, vec3(0.95, 0.42, 0.38), 0.18);
        diffuseColor.rgb = mix(deepGroove, ridgeHighlight, grooveMask);

        float spanLen = max(0.02, uFiberSpan.y - uFiberSpan.x);
        float normAlong = clamp((along - uFiberSpan.x) / spanLen, 0.0, 1.0);
        float tendonTip = smoothstep(0.86, 1.0, abs(normAlong * 2.0 - 1.0));
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.91, 0.87, 0.80), tendonTip * 0.42);
      } else if (uTissueMode == 2) {
        float along = dot(vAnatLocalPos, uFiberAxis);
        float across = dot(vAnatLocalPos, uCrossU) + dot(vAnatLocalPos, uCrossV);
        float weave1 = sin((across * ${GLSL_FASCIA_WEAVE_ACROSS_FREQ}) + (along * ${GLSL_FASCIA_WEAVE_ALONG_FREQ}));
        float weave2 = sin((across * ${GLSL_FASCIA_WEAVE_ACROSS_FREQ}) - (along * ${GLSL_FASCIA_WEAVE_ALONG_FREQ}));
        float collagen = smoothstep(-0.3, 0.8, weave1 * 0.6 + weave2 * 0.4);
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.88, vec3(0.98, 0.99, 1.0), collagen * 0.35);
      } else if (uTissueMode == 3) {
        float across = dot(vAnatLocalPos, uCrossU) + dot(vAnatLocalPos, uCrossV);
        float tendonFiber = sin(across * ${GLSL_TENDON_FIBER_FREQ}) * 0.5 + 0.5;
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.86, vec3(0.97, 0.95, 0.90), tendonFiber * 0.28);
      } else if (uTissueMode == 4) {
        // Córtex Encefálico & Núcleos: sombreamento sulcal profundo (vales escuros, coroas girais iluminadas)
        vec3 nLocal = normalize(vAnatLocalNormal);
        float gyralWave1 = sin(vAnatLocalPos.x * ${GLSL_CORTICAL_SULCUS_FREQ} + vAnatLocalPos.y * ${GLSL_CORTICAL_Y_FREQ}) * cos(vAnatLocalPos.z * ${GLSL_CORTICAL_Z_FREQ});
        float gyralWave2 = sin(vAnatLocalPos.y * ${GLSL_CORTICAL_MICRO_Y_FREQ} - vAnatLocalPos.z * ${GLSL_CORTICAL_MICRO_Z_FREQ}) * 0.35;
        float sulcusCavity = clamp(0.5 + 0.5 * nLocal.y, 0.0, 1.0);
        float crownMask = smoothstep(-0.55, 0.65, gyralWave1 * 0.65 + gyralWave2);
        vec3 sulcusShadow = diffuseColor.rgb * 0.54;
        vec3 gyrusCrown = mix(diffuseColor.rgb * 1.14, vec3(0.98, 0.96, 1.0), 0.10);
        diffuseColor.rgb = mix(sulcusShadow, gyrusCrown, mix(crownMask, sulcusCavity, 0.42));
      } else if (uTissueMode == 5) {
        // Folhas do Cerebelo (Folia cerebelli): estriação transversal fina com sulcos profundos
        float foliaWave = sin(vAnatLocalPos.y * ${GLSL_CEREBELLAR_FOLIA_FREQ} + vAnatLocalPos.z * ${GLSL_CEREBELLAR_DEPTH_FREQ});
        float foliaMask = smoothstep(-0.6, 0.6, foliaWave);
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.56, diffuseColor.rgb * 1.15, foliaMask);
      }
      // Quando o modelo está seccionado pelo corte MPR, escurece suavemente a parede interna (!gl_FrontFacing)
      // para dar percepção imediata de espessura e cavidade anatômica sem cintilação
      if (!gl_FrontFacing) {
        diffuseColor.rgb *= 0.72;
      }`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <normal_fragment_maps>',
      `#include <normal_fragment_maps>
      if (uTissueMode == 1) {
        float along = dot(vAnatLocalPos, uFiberAxis);
        float across1 = dot(vAnatLocalPos, uCrossU);
        float across2 = dot(vAnatLocalPos, uCrossV);
        float fiberCoord = across1 * 1.15 + across2 * 0.85 + along * 0.08;
        float ridgeDeriv = cos(fiberCoord * ${GLSL_PRIMARY_BUNDLE_FREQ}) * 0.55 + cos(fiberCoord * ${GLSL_SECONDARY_BUNDLE_FREQ} + along * ${GLSL_SECONDARY_ALONG_FREQ}) * 0.45;
        vec3 gradDir = normalize(uCrossU * 1.15 + uCrossV * 0.85);
        normal = normalize(normal + gradDir * (ridgeDeriv * 0.16));
      } else if (uTissueMode == 4) {
        float sulcusDerivX = cos(vAnatLocalPos.x * ${GLSL_CORTICAL_SULCUS_FREQ} + vAnatLocalPos.y * ${GLSL_CORTICAL_Y_FREQ}) * 0.14;
        float sulcusDerivZ = -sin(vAnatLocalPos.z * ${GLSL_CORTICAL_Z_FREQ}) * 0.14;
        normal = normalize(normal + vec3(sulcusDerivX, 0.0, sulcusDerivZ));
        // Realce de contorno giral (Fresnel sulcal) para destacar as bordas clicáveis de cada giro
        float viewDot = abs(dot(normal, normalize(vViewPosition)));
        float rimShadow = smoothstep(0.08, 0.58, viewDot);
        diffuseColor.rgb *= mix(0.62, 1.06, rimShadow);
      } else if (uTissueMode == 5) {
        float foliaDeriv = cos(vAnatLocalPos.y * ${GLSL_CEREBELLAR_FOLIA_FREQ} + vAnatLocalPos.z * ${GLSL_CEREBELLAR_DEPTH_FREQ}) * 0.18;
        normal = normalize(normal + vec3(0.0, foliaDeriv, 0.0));
      }`
    );
  };
  material.needsUpdate = true;
}

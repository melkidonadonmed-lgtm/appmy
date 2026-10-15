import { SurgicalLayerDepth } from '../shared/types/anatomy.ts';

export type MuscularTissueType = 'fascia' | 'tendon' | 'bursa' | 'muscle';

/**
 * Mapeamento canônico das 6 camadas cirúrgicas de dissecação (De Fora para Dentro)
 */
export const SURGICAL_LAYERS: Record<
  SurgicalLayerDepth,
  { labelPt: string; labelLatin: string; desc: string }
> = {
  1: {
    labelPt: 'Tegumento Comum',
    labelLatin: 'Integumentum commune',
    desc: 'Pele, epiderme, glândula mamária e tecido adiposo subcutâneo superficial',
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
    desc: 'Bússola axial central (coluna, bacia), esqueleto apendicular e ligamentos articulares',
  },
  5: {
    labelPt: 'Vascular & Nervoso',
    labelLatin: 'Systema cardiovasculare et nervosum',
    desc: 'Grandes vasos, plexos nervosos, troncos e medula espinhal',
  },
  6: {
    labelPt: 'Vísceras & Cavidades',
    labelLatin: 'Viscera et organa interna',
    desc: 'Órgãos torácicos, abdominais, pélvicos, reprodutores e encéfalo',
  },
};

/**
 * Lista canônica de radicais de músculos superficiais e fáscias de revestimento (Camada 2)
 */
export const SUPERFICIAL_MUSCLE_KEYWORDS = [
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
 * Detecta se uma estrutura pertence ao grupo de Fáscias, Aponeuroses, Retináculos e Septos.
 * Nota: Ligamentos articulares profundos (ligament/ligamento) pertencem à Camada 4 (Articular/Esquelética)
 * e não são misturados com fáscia muscular superficial.
 */
export function isFasciaOrAponeurosis(meshName: string, nomePt = ''): boolean {
  const combined = `${meshName} ${nomePt}`.toLowerCase();
  if (combined.includes('tensor fasciae') || combined.includes('tensor da fáscia')) {
    return false;
  }
  return /\b(fascia|fáscia|aponeurosis|aponeurose|retinaculum|retináculo|retinaculo|tract|trato|septum|septo|arch|arco)\b/i.test(
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
  if (/\b(tendon|tendão|tendao|ligament|ligamento)\b/i.test(combined)) {
    return 'tendon';
  }
  return 'muscle';
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
 * Determina a camada cirúrgica (1 a 6, de fora para dentro) de qualquer peça anatômica
 */
export function determineSurgicalLayer(
  sistema: string,
  meshName: string,
  nomePt = ''
): SurgicalLayerDepth {
  const sysLower = (sistema || '').toLowerCase();
  const combined = `${meshName} ${nomePt}`.toLowerCase();

  // Camada 1: Tegumento Comum e Glândula Mamária
  if (sysLower.includes('integumentary') || sysLower.includes('tegumento') || sysLower.includes('skin')) {
    return 1;
  }

  // Ligamentos articulares e cápsulas pertencem à Camada 4 (Esqueleto & Articulações),
  // exceto ligamentos peritoneais/uterinos (Camada 6) e suspensores mamários (Camada 1)
  if (
    /\b(ligament|ligamento)\b/i.test(combined) &&
    !sysLower.includes('reproductive') &&
    !sysLower.includes('digestive') &&
    !combined.includes('uteri') &&
    !combined.includes('útero') &&
    !combined.includes('ovari') &&
    !combined.includes('mamária') &&
    !combined.includes('breast')
  ) {
    return 4;
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

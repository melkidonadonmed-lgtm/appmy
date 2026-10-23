import { ZAnatomyItem, sanitizeNodeName } from '../constants/zAnatomyCatalog.ts';
import { FEMALE_REPRODUCTIVE_CATALOG } from '../constants/femaleReproductiveCatalog.ts';
import { TaxonomicTreeNode } from '../types/taxonomicTree.ts';
import { SYSTEM_METADATA, REGION_METADATA } from '../constants/taxonomicMetadata.ts';
import { determineSurgicalLayer } from '../../core/surgicalLayers.ts';

const LAYER_SCORE_MULTIPLIER = 10;
const SCORE_EPSILON = 0.01;
const DEFAULT_ORDER_FALLBACK = 99;
const DEPTH_SYSTEM = 1;
const DEPTH_REGION = 2;
const DEPTH_SUBREGION = 3;
const DEPTH_LEAF = 4;

export const MUSCULAR_SUBLAYER_METADATA: Record<
  string,
  { idSuffix: string; labelPt: string; labelTA2: string; order: number }
> = {
  'Fáscias, Aponeuroses & Retináculos': {
    idSuffix: 'fascia',
    labelPt: 'Fáscias, Aponeuroses & Retináculos',
    labelTA2: 'Fasciae, aponeuroses et retinacula',
    order: 1,
  },
  'Músculos Superficiais (Estriados)': {
    idSuffix: 'superficial',
    labelPt: 'Músculos Superficiais (Estriados)',
    labelTA2: 'Musculi superficiales',
    order: 2,
  },
  'Músculos Profundos (Estriados)': {
    idSuffix: 'deep',
    labelPt: 'Músculos Profundos (Estriados)',
    labelTA2: 'Musculi profundi',
    order: 3,
  },
  'Bolsas Sinoviais & Bainhas Tendíneas': {
    idSuffix: 'bursae',
    labelPt: 'Bolsas Sinoviais & Bainhas Tendíneas',
    labelTA2: 'Bursae et vaginae tendinum',
    order: 4,
  },
};

const SUBREGION_LABELS_PT: Record<string, string> = {
  'Thoracic skeleton': 'Costelas & Esterno (Arcabouço Ósseo)',
  'Costal cartilages': 'Cartilagens Costais & Articulações Torácicas',
  'Vertebral column': 'Vértebras & Coluna Axial',
  Cranium: 'Ossos do Neurocrânio & Viscerocrânio',
  'Extracranial bones of head': 'Mandíbula, Hioide, Ossículos & Cartilagens',
  'Axial skeleton': 'Esqueleto Axial & Cartilagens',
  'Appendicular skeleton': 'Esqueleto Apendicular & Cinturas',
  'Bones of upper limb': 'Ossos do Membro Superior & Cintura Escapular',
  'Bones of lower limb': 'Ossos do Membro Inferior & Pé',
  'Skeletal system': 'Articulações, Discos & Ligamentos',
  Heart: 'Coração & Câmaras Cardíacas',
  'Cardiac vessels': 'Vasos Coronários (Cardíacos)',
  'Pulmonary vessels': 'Vasos da Circulação Pulmonar',
  'Systemic arteries': 'Artérias & Troncos Arteriais',
  'Systemic veins': 'Veias & Seios Venosos',
  'Central nervous system': 'Sistema Nervoso Central (Encéfalo & Medula)',
  'Peripheral nervous system': 'Sistema Nervoso Periférico (Nervos & Plexos)',
  'Sense organs': 'Órgãos dos Sentidos (Olho & Orelha)',
  'Lymphoid organs': 'Órgãos Linfoides & Cadeias Ganglionares',
  'Lymphoid system': 'Vasos & Troncos Linfáticos',
  'Respiratory system': 'Vias Aéreas & Cavidade Pleural',
  Lungs: 'Pulmões & Lobos Pulmonares',
  'Tracheobronchial tree': 'Árvore Traqueobrônquica',
  Mouth: 'Cavidade Oral & Glândulas Salivares',
  'Digestive canal': 'Tubo Digestório (Esôfago ao Cólon)',
  Liver: 'Fígado & Segmentação Hepática',
  'Digestive system': 'Pâncreas, Vias Biliares & Anexos',
  'Urinary system': 'Trato Urinário (Rins, Ureteres, Bexiga & Uretra)',
  'Endocrine glands': 'Glândulas Endócrinas',
};

const CORRUPTED_NODE_LABELS_PT: Record<string, { namePt: string; nameTA2: string }> = {
  '????????': {
    namePt: 'Ramo Vascular Acessório',
    nameTA2: 'Ramus vascularis accessorius',
  },
  '?x.l': {
    namePt: 'Ramo Vascular Perforante (Esquerdo)',
    nameTA2: 'Ramus perforans sinister',
  },
  '?x.r': {
    namePt: 'Ramo Vascular Perforante (Direito)',
    nameTA2: 'Ramus perforans dexter',
  },
};

function resolveSubregionLabelPt(item: ZAnatomyItem, regId: string): string {
  const sysId = item.system || 'skeletal';
  const rawSub = item.path && item.path.length > 0 ? item.path[0] : '';
  const nameLower = `${item.node} ${item.nameEn || ''} ${item.namePtBr || ''}`.toLowerCase();

  if (sysId === 'skeletal') {
    if (regId === 'cranium') {
      if (
        nameLower.includes('mandible') ||
        nameLower.includes('hyoid') ||
        nameLower.includes('malleus') ||
        nameLower.includes('incus') ||
        nameLower.includes('stapes') ||
        nameLower.includes('cartilage') ||
        nameLower.includes('ligament') ||
        nameLower.includes('membrane') ||
        nameLower.includes('joint') ||
        nameLower.includes('disc')
      ) {
        return 'Mandíbula, Hioide, Ossículos & Articulações';
      }
      return 'Ossos do Neurocrânio & Viscerocrânio';
    }
    if (regId === 'vertebral_column') {
      if (
        nameLower.includes('disc') ||
        nameLower.includes('ligament') ||
        nameLower.includes('joint') ||
        nameLower.includes('membrane')
      ) {
        return 'Discos Intervertebrais & Ligamentos Vertebrais';
      }
      return 'Vértebras (Cervicais, Torácicas, Lombares & Sacro)';
    }
    if (regId === 'thorax') {
      if (
        rawSub === 'Costal cartilages' ||
        nameLower.includes('cartilage') ||
        nameLower.includes('ligament') ||
        nameLower.includes('joint')
      ) {
        return 'Cartilagens Costais & Articulações Torácicas';
      }
      return 'Costelas & Esterno (Arcabouço Ósseo)';
    }
    if (regId === 'upper_limb') {
      if (
        nameLower.includes('carpal') ||
        nameLower.includes('metacarpal') ||
        nameLower.includes('phalanx') ||
        nameLower.includes('scaphoid') ||
        nameLower.includes('lunate') ||
        nameLower.includes('triquetrum') ||
        nameLower.includes('pisiform') ||
        nameLower.includes('trapezium') ||
        nameLower.includes('trapezoid') ||
        nameLower.includes('capitate') ||
        nameLower.includes('hamate') ||
        nameLower.includes('sesamoid') ||
        nameLower.includes('hand') ||
        nameLower.includes('wrist')
      ) {
        return 'Ossos da Mão & Carpo (Punho, Metacarpo & Falanges)';
      }
      return 'Cintura Escapular, Braço & Antebraço';
    }
    if (regId === 'lower_limb') {
      if (
        nameLower.includes('tarsal') ||
        nameLower.includes('metatarsal') ||
        nameLower.includes('phalanx') ||
        nameLower.includes('calcaneus') ||
        nameLower.includes('talus') ||
        nameLower.includes('navicular') ||
        nameLower.includes('cuboid') ||
        nameLower.includes('cuneiform') ||
        nameLower.includes('sesamoid') ||
        nameLower.includes('foot') ||
        nameLower.includes('ankle')
      ) {
        return 'Ossos do Pé & Tarso (Calcâneo, Tálus, Metatarso & Falanges)';
      }
      return 'Coxa, Joelho & Perna (Fêmur, Patela, Tíbia & Fíbula)';
    }
  }

  if (sysId === 'nervous' && !rawSub) {
    return SUBREGION_LABELS_PT['Central nervous system'];
  }

  if (sysId === 'cardiovascular' && !rawSub) {
    return nameLower.includes('vein') || nameLower.includes('venous') || nameLower.includes('sinus')
      ? SUBREGION_LABELS_PT['Systemic veins']
      : SUBREGION_LABELS_PT['Systemic arteries'];
  }

  if (sysId === 'lymphatic') {
    if (
      nameLower.includes('spleen') ||
      nameLower.includes('thymus') ||
      nameLower.includes('tonsil')
    ) {
      return 'Órgãos Linfoides Primários & Baço';
    }
    return 'Cadeias Ganglionares & Linfonodos';
  }

  if (rawSub && SUBREGION_LABELS_PT[rawSub]) {
    return SUBREGION_LABELS_PT[rawSub];
  }

  if (rawSub) {
    return rawSub;
  }

  return '__geral__';
}

/**
 * Classifica um elemento anatômico em uma das 7 regiões corporais canônicas
 */
export function detectRegion(item: ZAnatomyItem): string {
  const pathStr = (item.path || []).join(' ').toLowerCase();
  const nameStr = `${item.node} ${item.nameEn || ''} ${item.namePtBr || ''}`.toLowerCase();
  const fullText = `${pathStr} ${nameStr}`;

  // Sistemas integralmente pélvicos/retroperitoneais unificados
  if (item.system === 'reproductive' || item.system === 'renal') {
    return 'pelvis';
  }

  // 1. Membro Inferior deve preceder Membro Superior e Crânio para evitar falsos positivos
  // como "finger of foot" (dedos do pé) ou "head of gastrocnemius / biceps femoris / hallucis"
  if (
    pathStr.includes('lower limb') ||
    fullText.includes('lower limb') ||
    fullText.includes('thigh') ||
    fullText.includes('foot') ||
    fullText.includes('femur') ||
    fullText.includes('femoral') ||
    fullText.includes('patella') ||
    fullText.includes('tibia') ||
    fullText.includes('fibula') ||
    fullText.includes('tarsal') ||
    fullText.includes('metatarsal') ||
    fullText.includes('calcaneus') ||
    fullText.includes('calcaneal') ||
    fullText.includes('talus') ||
    fullText.includes('malleolus') ||
    fullText.includes('cuboid') ||
    fullText.includes('cuneiform') ||
    fullText.includes('navicular') ||
    fullText.includes('toe') ||
    fullText.includes('fascia lata') ||
    fullText.includes('iliotibial') ||
    fullText.includes('crural') ||
    fullText.includes('sartorius') ||
    fullText.includes('quadriceps') ||
    fullText.includes('rectus femoris') ||
    fullText.includes('vastus') ||
    fullText.includes('adductor') ||
    fullText.includes('gracilis') ||
    fullText.includes('pectineus') ||
    fullText.includes('biceps femoris') ||
    fullText.includes('semitendinosus') ||
    fullText.includes('semimembranosus') ||
    fullText.includes('quadratus femoris') ||
    fullText.includes('gastrocnemius') ||
    fullText.includes('soleus') ||
    fullText.includes('plantar') ||
    fullText.includes('dorsalis pedis') ||
    fullText.includes('arcuate artery') ||
    fullText.includes('popliteal') ||
    fullText.includes('genicular') ||
    fullText.includes('saphenous') ||
    fullText.includes('perforating') ||
    fullText.includes('anserine') ||
    fullText.includes('sciatic') ||
    fullText.includes('hallucis') ||
    fullText.includes('hallux') ||
    fullText.includes('digitorum longus') ||
    fullText.includes('digitorum brevis') ||
    fullText.includes('ankle') ||
    /\bleg\b/.test(fullText)
  ) {
    return 'lower_limb';
  }

  // 2. Membro Superior deve vir antes de tórax para capturar cintura escapular (clavícula/escápula) e carpo
  if (
    pathStr.includes('upper limb') ||
    fullText.includes('upper limb') ||
    /\barm\b/.test(fullText) ||
    fullText.includes('forearm') ||
    fullText.includes('hand') ||
    fullText.includes('manus') ||
    fullText.includes('scapula') ||
    fullText.includes('subscapular') ||
    fullText.includes('suprascapular') ||
    fullText.includes('clavicle') ||
    fullText.includes('subclavian') ||
    fullText.includes('subclavius') ||
    fullText.includes('infraclavicular') ||
    fullText.includes('supraclavicular') ||
    fullText.includes('acromial') ||
    fullText.includes('subacromial') ||
    fullText.includes('coracoid') ||
    fullText.includes('humerus') ||
    fullText.includes('humeral') ||
    fullText.includes('radius') ||
    fullText.includes('radial') ||
    fullText.includes('ulna') ||
    fullText.includes('ulnar') ||
    fullText.includes('carpal') ||
    fullText.includes('metacarpal') ||
    fullText.includes('scaphoid') ||
    fullText.includes('lunate bone') ||
    fullText.includes('triquetrum') ||
    fullText.includes('pisiform') ||
    fullText.includes('trapezium') ||
    fullText.includes('trapezoid') ||
    fullText.includes('capitate') ||
    fullText.includes('hamate') ||
    fullText.includes('brachial') ||
    fullText.includes('antebrachial') ||
    fullText.includes('axilla') ||
    fullText.includes('cubital') ||
    fullText.includes('cephalic vein') ||
    fullText.includes('basilic vein') ||
    fullText.includes('collateral artery') ||
    fullText.includes('thoracodorsal') ||
    fullText.includes('interosseous') ||
    fullText.includes('deltoid') ||
    fullText.includes('supraspinatus') ||
    fullText.includes('infraspinatus') ||
    fullText.includes('teres major') ||
    fullText.includes('teres minor') ||
    fullText.includes('coracobrachialis') ||
    fullText.includes('biceps brachii') ||
    fullText.includes('triceps brachii') ||
    fullText.includes('brachioradialis') ||
    fullText.includes('bicipitoradial') ||
    fullText.includes('intertubercular') ||
    fullText.includes('pronator') ||
    fullText.includes('supinator') ||
    fullText.includes('carpi') ||
    fullText.includes('palmar') ||
    fullText.includes('pollicis') ||
    fullText.includes('indicis') ||
    fullText.includes('digiti minimi') ||
    fullText.includes('common flexor') ||
    fullText.includes('wrist') ||
    fullText.includes('finger') ||
    fullText.includes('thumb') ||
    (item.system === 'skeletal' && fullText.includes('pectoral'))
  ) {
    return 'upper_limb';
  }

  // 3. Crânio, Face, Encéfalo e Pescoço Anterior (evitando falso positivo de "head of rib" ou "head of pectoralis")
  const isThoracicOrRibHead =
    fullText.includes('rib') ||
    fullText.includes('pectoral') ||
    fullText.includes('costa') ||
    pathStr.includes('thoracic') ||
    pathStr.includes('vertebral column');

  if (
    !isThoracicOrRibHead &&
    (fullText.includes('cranium') ||
      fullText.includes('cranial') ||
      fullText.includes('of head') ||
      fullText.includes('skull') ||
      fullText.includes('mandible') ||
      fullText.includes('mandibular') ||
      fullText.includes('face') ||
      fullText.includes('facial') ||
      fullText.includes('angular') ||
      fullText.includes('buccal') ||
      fullText.includes('bucinator') ||
      fullText.includes('labial') ||
      fullText.includes('mental') ||
      fullText.includes('alveolar') ||
      fullText.includes('gingiva') ||
      fullText.includes('tongue') ||
      fullText.includes('lingual') ||
      fullText.includes('palat') ||
      fullText.includes('uvula') ||
      fullText.includes('parotid') ||
      fullText.includes('mouth') ||
      fullText.includes('cerebr') ||
      fullText.includes('brain') ||
      fullText.includes('encephalon') ||
      fullText.includes('cerebell') ||
      fullText.includes('gyrus') ||
      fullText.includes('gyri') ||
      fullText.includes('sulcus') ||
      fullText.includes('sulci') ||
      fullText.includes('insula') ||
      fullText.includes('lat_fis') ||
      fullText.includes('callos') ||
      fullText.includes('cingulate') ||
      fullText.includes('frontopolar') ||
      fullText.includes('frontobasal') ||
      fullText.includes('precentral') ||
      fullText.includes('postcentral') ||
      fullText.includes('paracentral') ||
      fullText.includes('striate') ||
      fullText.includes('thalam') ||
      fullText.includes('hippocamp') ||
      fullText.includes('amygdal') ||
      fullText.includes('caudate') ||
      fullText.includes('putamen') ||
      fullText.includes('pallid') ||
      fullText.includes('fornix') ||
      fullText.includes('commissure') ||
      fullText.includes('chiasm') ||
      fullText.includes('pineal') ||
      fullText.includes('hypophysis') ||
      fullText.includes('pons') ||
      fullText.includes('medulla') ||
      fullText.includes('midbrain') ||
      fullText.includes('meninge') ||
      fullText.includes('cavernous') ||
      fullText.includes('petrosal') ||
      fullText.includes('sagittal sinus') ||
      fullText.includes('straight sinus') ||
      fullText.includes('transverse sinus') ||
      fullText.includes('sigmoid sinus') ||
      fullText.includes('basilar') ||
      fullText.includes('communicating artery') ||
      fullText.includes('carotid') ||
      fullText.includes('jugular') ||
      fullText.includes('ophthalmic') ||
      fullText.includes('ciliary') ||
      fullText.includes('retinal') ||
      fullText.includes('orbit') ||
      fullText.includes('eye') ||
      fullText.includes('ear') ||
      fullText.includes('auricul') ||
      fullText.includes('tympan') ||
      fullText.includes('malleus') ||
      fullText.includes('incus') ||
      fullText.includes('stapes') ||
      fullText.includes('cochlea') ||
      fullText.includes('vestibul') ||
      fullText.includes('auditory') ||
      fullText.includes('mastoid') ||
      fullText.includes('nasal') ||
      fullText.includes('alar cartilage') ||
      fullText.includes('maxilla') ||
      fullText.includes('temporal') ||
      fullText.includes('frontal') ||
      fullText.includes('parietal') ||
      fullText.includes('occipital') ||
      fullText.includes('sphenoid') ||
      fullText.includes('ethmoid') ||
      fullText.includes('zygomatic') ||
      fullText.includes('lacrimal') ||
      fullText.includes('vomer') ||
      fullText.includes('masseter') ||
      fullText.includes('pterygoid') ||
      fullText.includes('epicranial') ||
      fullText.includes('platysma') ||
      fullText.includes('sternocleidomastoid') ||
      fullText.includes('hyoid') ||
      fullText.includes('digastric') ||
      fullText.includes('pharyn') ||
      fullText.includes('laryn') ||
      fullText.includes('epiglottis') ||
      fullText.includes('thyroid') ||
      fullText.includes('cricoid') ||
      fullText.includes('arytenoid') ||
      fullText.includes('corniculate') ||
      fullText.includes('olfactory') ||
      fullText.includes('optic') ||
      fullText.includes('oculomotor') ||
      fullText.includes('trochlear') ||
      fullText.includes('trigeminal') ||
      fullText.includes('abducens') ||
      fullText.includes('vagus') ||
      fullText.includes('accessory nerve') ||
      fullText.includes('hypoglossal') ||
      fullText.includes('neck'))
  ) {
    return 'cranium';
  }

  // 4. Coluna Vertebral, Dorso Profundo e Canal Medular
  if (
    pathStr.includes('vertebral column') ||
    fullText.includes('vertebra') ||
    fullText.includes('spine') ||
    fullText.includes('vertebral') ||
    fullText.includes('atlas') ||
    fullText.includes('axis') ||
    fullText.includes('cervical') ||
    fullText.includes('thoracic vertebra') ||
    fullText.includes('lumbar') ||
    fullText.includes('sacrum') ||
    fullText.includes('coccyx') ||
    fullText.includes('spinal') ||
    fullText.includes('central canal') ||
    fullText.includes('epaxial') ||
    fullText.includes('erector spinae') ||
    fullText.includes('iliocostalis') ||
    fullText.includes('longissimus') ||
    fullText.includes('transversospinal') ||
    fullText.includes('multifidus') ||
    fullText.includes('interspinales') ||
    fullText.includes('intertransversarii') ||
    fullText.includes('splenius') ||
    fullText.includes('suboccipital') ||
    fullText.includes('thoracolumbar')
  ) {
    return 'vertebral_column';
  }

  // 5. Pelve, Cintura Pélvica e Períneo
  if (
    fullText.includes('pelvi') ||
    fullText.includes('hip') ||
    fullText.includes('ilium') ||
    fullText.includes('ischium') ||
    fullText.includes('pubis') ||
    fullText.includes('pubo-') ||
    fullText.includes('pubococcygeus') ||
    fullText.includes('iliococcygeus') ||
    fullText.includes('coccygeus') ||
    fullText.includes('anal sphincter') ||
    fullText.includes('anorectal') ||
    fullText.includes('pararectal') ||
    fullText.includes('rectal') ||
    fullText.includes('sigmoid') ||
    fullText.includes('vesical') ||
    fullText.includes('bladder') ||
    fullText.includes('ureter') ||
    fullText.includes('uterus') ||
    fullText.includes('ovary') ||
    fullText.includes('prostate') ||
    fullText.includes('testis') ||
    fullText.includes('testicular') ||
    fullText.includes('penis') ||
    fullText.includes('pudendal') ||
    fullText.includes('glute') ||
    fullText.includes('trochanteric') ||
    fullText.includes('piriformis') ||
    fullText.includes('iliopsoas') ||
    fullText.includes('iliopectineal') ||
    fullText.includes('iliac') ||
    fullText.includes('sacral') ||
    fullText.includes('lacunar node') ||
    fullText.includes('psoas') ||
    fullText.includes('iliacus') ||
    fullText.includes('obturator') ||
    fullText.includes('levator ani') ||
    fullText.includes('perine') ||
    fullText.includes('inguinal')
  ) {
    return 'pelvis';
  }

  // 6. Caixa Torácica, Mediastino e Cavidade Toracoabdominal
  if (
    fullText.includes('thorax') ||
    fullText.includes('thoracic') ||
    fullText.includes('thoracis') ||
    fullText.includes('rib') ||
    fullText.includes('costa') ||
    fullText.includes('sternum') ||
    fullText.includes('parasternal') ||
    fullText.includes('lung') ||
    fullText.includes('pulmon') ||
    fullText.includes('bronch') ||
    fullText.includes('trachea') ||
    fullText.includes('pleura') ||
    fullText.includes('heart') ||
    fullText.includes('cardiac') ||
    fullText.includes('left ventricle') ||
    fullText.includes('right ventricle') ||
    fullText.includes('pericardi') ||
    fullText.includes('mediastin') ||
    fullText.includes('aorta') ||
    fullText.includes('aortic') ||
    fullText.includes('brachiocephalic') ||
    fullText.includes('vena cava') ||
    fullText.includes('caval') ||
    fullText.includes('azygos') ||
    fullText.includes('arteriosum') ||
    fullText.includes('thymus') ||
    fullText.includes('pectoral') ||
    fullText.includes('intercostal') ||
    fullText.includes('diaphragm') ||
    fullText.includes('phrenic') ||
    fullText.includes('serratus') ||
    fullText.includes('rectus abdominis') ||
    fullText.includes('obliquus') ||
    fullText.includes('transversalis') ||
    fullText.includes('abdominal') ||
    fullText.includes('epigastric') ||
    fullText.includes('trapezius') ||
    fullText.includes('latissimus') ||
    fullText.includes('rhomboid') ||
    fullText.includes('oesophag') ||
    fullText.includes('esophag') ||
    fullText.includes('stomach') ||
    fullText.includes('gastric') ||
    fullText.includes('gastro') ||
    fullText.includes('pylor') ||
    fullText.includes('duoden') ||
    fullText.includes('pancrea') ||
    fullText.includes('liver') ||
    fullText.includes('hepat') ||
    fullText.includes('cystic') ||
    fullText.includes('bile') ||
    fullText.includes('spleen') ||
    fullText.includes('splenic') ||
    fullText.includes('coeliac') ||
    fullText.includes('mesenter') ||
    fullText.includes('jejun') ||
    fullText.includes('ileum') ||
    fullText.includes('ileal') ||
    fullText.includes('ileocolic') ||
    fullText.includes('caec') ||
    fullText.includes('appendi') ||
    fullText.includes('colon') ||
    fullText.includes('colic') ||
    fullText.includes('taenia') ||
    fullText.includes('suprarenal') ||
    fullText.includes('renal') ||
    fullText.includes('kidney') ||
    fullText.includes('mammary') ||
    fullText.includes('mamária') ||
    fullText.includes('mamário') ||
    fullText.includes('lactifer') ||
    fullText.includes('areola') ||
    fullText.includes('nipple') ||
    fullText.includes('vh_f_') ||
    fullText.includes('?x') ||
    fullText.includes('????')
  ) {
    return 'thorax';
  }

  return 'systemic';
}

function createLeafNode(item: ZAnatomyItem, sysId: string, regId: string, depth: number): TaxonomicTreeNode {
  const ids = [item.id];
  if (item.node && item.node !== item.id) {
    ids.push(item.node);
  }
  const san = sanitizeNodeName(item.node);
  if (san && !ids.includes(san)) {
    ids.push(san);
  }
  const override = CORRUPTED_NODE_LABELS_PT[item.node];
  return {
    id: item.id,
    namePt: override?.namePt || item.namePtBr || item.nameEn || item.node,
    nameTA2: override?.nameTA2 || item.nameLatin,
    type: 'leaf',
    depth,
    itemCount: 1,
    descendantIds: ids,
    meshName: item.node,
    systemId: sysId,
    regionId: regId,
    data: item,
  };
}

/**
 * Calcula pontuação de profundidade estratigráfica (De Fora Para Dentro / Superficial -> Profundo):
 * Menor valor = mais externo/superficial (aparece no topo da pasta);
 * Maior valor = mais interno/profundo (aparece no fundo da pasta).
 */
function getItemOutsideToInsideScore(item: ZAnatomyItem): number {
  const surgicalLayer = determineSurgicalLayer(item.system, item.node, item.namePtBr);
  const ev = item.explosionVector || { x: 0, y: 0, z: 0 };
  const radialDistance = Math.hypot(ev.x, ev.z);
  // Estruturas com maior raio de explosão são mais superficiais/periféricas -> menor score
  return surgicalLayer * LAYER_SCORE_MULTIPLIER - radialDistance;
}

function sortItemsOutsideToInside(items: ZAnatomyItem[]): ZAnatomyItem[] {
  return [...items].sort((a, b) => {
    const diff = getItemOutsideToInsideScore(a) - getItemOutsideToInsideScore(b);
    if (Math.abs(diff) > SCORE_EPSILON) return diff;
    return (a.namePtBr || a.node).localeCompare(b.namePtBr || b.node, 'pt-BR');
  });
}

/**
 * Constrói a árvore hierárquica taxonômica completa em passagem única O(N),
 * ordenada estratigraficamente de fora para dentro (Camada 1 -> Camada 6) e
 * pré-computando a lista de descendantIds de cada nó intermediário para
 * alternâncias de visibilidade instantâneas em O(1).
 */
export function buildTaxonomicTree(
  catalog: ZAnatomyItem[],
  biologicalSex?: 'male' | 'female'
): TaxonomicTreeNode[] {
  // Quando biologicalSex === 'female', substitui os órgãos reprodutores masculinos pelos 36 órgãos reprodutores femininos (Útero, Ovários, Tubas, Vagina)
  const effectiveCatalog =
    biologicalSex === 'female'
      ? [
          ...catalog.filter((item) => item.system !== 'reproductive'),
          ...FEMALE_REPRODUCTIVE_CATALOG,
        ]
      : catalog;

  // Buckets: systemId -> regionId -> subregionKey -> items[]
  const systemBuckets = new Map<string, Map<string, Map<string, ZAnatomyItem[]>>>();

  for (const item of effectiveCatalog) {
    const sysId = item.system || 'skeletal';
    const regId = detectRegion(item);
    const subKey =
      sysId === 'muscular'
        ? item.path && item.path.length > 0
          ? item.path[0]
          : '__geral__'
        : resolveSubregionLabelPt(item, regId);

    if (!systemBuckets.has(sysId)) {
      systemBuckets.set(sysId, new Map());
    }
    const regionMap = systemBuckets.get(sysId)!;

    if (!regionMap.has(regId)) {
      regionMap.set(regId, new Map());
    }
    const subMap = regionMap.get(regId)!;

    if (!subMap.has(subKey)) {
      subMap.set(subKey, []);
    }
    subMap.get(subKey)!.push(item);
  }

  const tree: TaxonomicTreeNode[] = [];

  // Ordena os sistemas pela ordem estratigráfica médica (De Fora Para Dentro)
  const sortedSystems = Array.from(systemBuckets.keys()).sort((a, b) => {
    const orderA = SYSTEM_METADATA[a]?.order ?? DEFAULT_ORDER_FALLBACK;
    const orderB = SYSTEM_METADATA[b]?.order ?? DEFAULT_ORDER_FALLBACK;
    return orderA - orderB;
  });

  for (const sysId of sortedSystems) {
    const regionMap = systemBuckets.get(sysId)!;
    const systemDescendants = new Set<string>();
    let systemLeafCount = 0;

    // Caso especial para o Sistema Muscular: organiza o 1º nível em 4 camadas funcionais
    // (1. Fáscias & Aponeuroses, 2. Músculos Superficiais, 3. Músculos Profundos, 4. Bolsas & Bainhas)
    // para que o usuário possa ligar/desligar a fáscia ou a musculatura superficial com 1 clique!
    if (sysId === 'muscular') {
      const sublayerBuckets = new Map<string, Map<string, ZAnatomyItem[]>>();

      for (const [regId, subMap] of regionMap.entries()) {
        for (const [subKey, items] of subMap.entries()) {
          const layerKey = MUSCULAR_SUBLAYER_METADATA[subKey]
            ? subKey
            : 'Músculos Profundos (Estriados)';
          if (!sublayerBuckets.has(layerKey)) {
            sublayerBuckets.set(layerKey, new Map());
          }
          const regInLayer = sublayerBuckets.get(layerKey)!;
          if (!regInLayer.has(regId)) {
            regInLayer.set(regId, []);
          }
          regInLayer.get(regId)!.push(...items);
        }
      }

      const sortedLayers = Array.from(sublayerBuckets.keys()).sort((a, b) => {
        const orderA = MUSCULAR_SUBLAYER_METADATA[a]?.order ?? DEFAULT_ORDER_FALLBACK;
        const orderB = MUSCULAR_SUBLAYER_METADATA[b]?.order ?? DEFAULT_ORDER_FALLBACK;
        return orderA - orderB;
      });

      const sublayerNodes: TaxonomicTreeNode[] = [];

      for (const layerKey of sortedLayers) {
        const meta = MUSCULAR_SUBLAYER_METADATA[layerKey] || {
          idSuffix: layerKey.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          labelPt: layerKey,
          labelTA2: layerKey,
          order: DEFAULT_ORDER_FALLBACK,
        };
        const regInLayer = sublayerBuckets.get(layerKey)!;
        const sortedRegs = Array.from(regInLayer.keys()).sort((a, b) => {
          const orderA = REGION_METADATA[a]?.order ?? DEFAULT_ORDER_FALLBACK;
          const orderB = REGION_METADATA[b]?.order ?? DEFAULT_ORDER_FALLBACK;
          return orderA - orderB;
        });

        const layerRegionNodes: TaxonomicTreeNode[] = [];
        const layerDescendants = new Set<string>();
        let layerLeafCount = 0;

        for (const regId of sortedRegs) {
          const items = sortItemsOutsideToInside(regInLayer.get(regId)!);
          const leafNodes = items.map((item) => createLeafNode(item, sysId, regId, DEPTH_LEAF));
          const regDescendants = new Set<string>();

          for (const leaf of leafNodes) {
            for (const id of leaf.descendantIds) {
              regDescendants.add(id);
              layerDescendants.add(id);
              systemDescendants.add(id);
            }
          }

          layerLeafCount += leafNodes.length;
          systemLeafCount += leafNodes.length;

          const regMeta = REGION_METADATA[regId];
          layerRegionNodes.push({
            id: `reg_muscular_${meta.idSuffix}_${regId}`,
            namePt: regMeta?.labelPt || regId,
            nameTA2: regMeta?.labelTA2,
            type: 'region',
            depth: DEPTH_SUBREGION,
            itemCount: leafNodes.length,
            descendantIds: Array.from(regDescendants),
            children: leafNodes,
            systemId: sysId,
            regionId: regId,
          });
        }

        sublayerNodes.push({
          id: `sub_muscular_${meta.idSuffix}`,
          namePt: meta.labelPt,
          nameTA2: meta.labelTA2,
          type: 'subregion',
          depth: DEPTH_REGION,
          itemCount: layerLeafCount,
          descendantIds: Array.from(layerDescendants),
          children: layerRegionNodes,
          systemId: sysId,
        });
      }

      const sysMeta = SYSTEM_METADATA[sysId];
      tree.push({
        id: `sys_${sysId}`,
        namePt: sysMeta?.labelPt || sysId,
        nameTA2: sysMeta?.labelTA2,
        type: 'system',
        depth: DEPTH_SYSTEM,
        itemCount: systemLeafCount,
        descendantIds: Array.from(systemDescendants),
        children: sublayerNodes,
        systemId: sysId,
      });
      continue;
    }

    // Demais sistemas: Sistema -> Região Craniocaudal -> Sub-região (De Fora Para Dentro) -> Folhas (De Fora Para Dentro)
    const regionNodes: TaxonomicTreeNode[] = [];
    const sortedRegions = Array.from(regionMap.keys()).sort((a, b) => {
      const orderA = REGION_METADATA[a]?.order ?? DEFAULT_ORDER_FALLBACK;
      const orderB = REGION_METADATA[b]?.order ?? DEFAULT_ORDER_FALLBACK;
      return orderA - orderB;
    });

    for (const regId of sortedRegions) {
      const subMap = regionMap.get(regId)!;
      const subEntries = Array.from(subMap.entries()).sort(([, itemsA], [, itemsB]) => {
        const avgA =
          itemsA.reduce((acc, it) => acc + getItemOutsideToInsideScore(it), 0) /
          Math.max(1, itemsA.length);
        const avgB =
          itemsB.reduce((acc, it) => acc + getItemOutsideToInsideScore(it), 0) /
          Math.max(1, itemsB.length);
        return avgA - avgB;
      });

      const subNodes: TaxonomicTreeNode[] = [];
      const regionDescendants = new Set<string>();
      let regionLeafCount = 0;

      // Se houver apenas 1 subgrupo na região, nivela as folhas diretamente sob a região para evitar cliques extras redundantes
      const flattenSingleSubgroup = subEntries.length === 1;

      for (const [subKey, rawItems] of subEntries) {
        const items = sortItemsOutsideToInside(rawItems);
        const isDirectLeaf = flattenSingleSubgroup || subKey === '__geral__';
        const leafNodes: TaxonomicTreeNode[] = items.map((item) =>
          createLeafNode(item, sysId, regId, isDirectLeaf ? DEPTH_SUBREGION : DEPTH_LEAF)
        );

        const subDescendants = new Set<string>();
        for (const leaf of leafNodes) {
          for (const id of leaf.descendantIds) {
            subDescendants.add(id);
            regionDescendants.add(id);
          }
        }

        regionLeafCount += leafNodes.length;
        systemLeafCount += leafNodes.length;

        if (!isDirectLeaf) {
          subNodes.push({
            id: `sub_${sysId}_${regId}_${subKey.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
            namePt: subKey,
            type: 'subregion',
            depth: DEPTH_SUBREGION,
            itemCount: leafNodes.length,
            descendantIds: Array.from(subDescendants),
            children: leafNodes,
            systemId: sysId,
            regionId: regId,
          });
        } else {
          subNodes.push(...leafNodes);
        }
      }

      for (const id of regionDescendants) {
        systemDescendants.add(id);
      }

      const regMeta = REGION_METADATA[regId];
      regionNodes.push({
        id: `reg_${sysId}_${regId}`,
        namePt: regMeta?.labelPt || regId,
        nameTA2: regMeta?.labelTA2,
        type: 'region',
        depth: DEPTH_REGION,
        itemCount: regionLeafCount,
        descendantIds: Array.from(regionDescendants),
        children: subNodes,
        systemId: sysId,
        regionId: regId,
      });
    }

    const sysMeta = SYSTEM_METADATA[sysId];
    let systemLabelPt = sysMeta?.labelPt || sysId;
    if (biologicalSex && sysId === 'reproductive') {
      systemLabelPt =
        biologicalSex === 'female'
          ? 'Sistema Reprodutor Feminino (Útero & Ovários)'
          : 'Sistema Reprodutor Masculino';
    } else if (biologicalSex && sysId === 'integumentary') {
      systemLabelPt =
        biologicalSex === 'female'
          ? 'Tegumento & Glândula Mamária (Feminino)'
          : 'Tegumento & Glândula Mamária (Ativa Feminino)';
    }

    tree.push({
      id: `sys_${sysId}`,
      namePt: systemLabelPt,
      nameTA2: sysMeta?.labelTA2,
      type: 'system',
      depth: DEPTH_SYSTEM,
      itemCount: systemLeafCount,
      descendantIds: Array.from(systemDescendants),
      children: regionNodes,
      systemId: sysId,
    });
  }

  return tree;
}

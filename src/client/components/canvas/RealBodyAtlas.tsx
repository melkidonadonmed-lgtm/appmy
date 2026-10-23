import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { AnatomicalCallout3D } from './AnatomicalCallout3D.tsx';
import {
  Z_ANATOMY_BY_NODE,
  Z_ANATOMY_BY_ID,
  ZAnatomyItem,
  sanitizeNodeName,
} from '../../../shared/constants/zAnatomyCatalog.ts';
import { detectRegion } from '../../../shared/utils/buildTaxonomicTree.ts';
import { AnyAnatomicalNode, GeneralAnatomicalNode, AnatomicalRegion, ActiveAnatomicalSystem } from './AnatomicalAtlasScene.tsx';
import { DissectionVisualMode } from '../../../shared/types/dissection.ts';
import { disposeHierarchy, logWebGLGarbageCollection } from '../../lib/webgl-gc.ts';
import {
   useAnatomyStore,
  registerMeshWorldCenter,
} from '../../stores/useAnatomyStore.ts';
import {
  bindExplodedNode,
  applyExplodedStep,
  evaluateExplodedPosition,
  getMeshAnatomicalCenter,
  ExplodedNodeBinding,
} from '../../../core/explodedEngine.ts';
import {
  updateMeshVisibility,
  determineSurgicalLayer,
  getMuscularTissueProfile,
  applyAnatomicalTissueShader,
  VisibilityState,
} from '../../../core/visibilityManager.ts';
import { AnatomicalMeshUserData } from '../../../shared/types/anatomy.ts';
import { installOfflineCacheFetchInterceptor } from '../../lib/modelCacheManager.ts';

// Configuração do decodificador Draco local offline em public/draco/gltf/
const DRACO_DECODER_PATH = '/draco/gltf/';
const CRANIUM_FOCUS_OFFSET_Y = -4.6;
const DEFAULT_MODEL_OFFSET: [number, number, number] = [0, 0, 0];
const FEMALE_PELVIC_OFFSET: [number, number, number] = [0, 0.84, 0.03];

if (typeof window !== 'undefined') {
  installOfflineCacheFetchInterceptor();
}

export interface RealBodyAtlasProps {
  explosionProgress: number; // 0.0 a 1.0
  selectedNodeId: string | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  activeSystem: string;
  activeRegion?: AnatomicalRegion;
  layerPeelingLevel?: number;
  realSkullOpacity?: number;
  visualMode?: DissectionVisualMode;
}

interface MeshAnimData {
  mesh: THREE.Mesh;
  binding: ExplodedNodeBinding;
  item: ZAnatomyItem | null;
  baseMaterial: THREE.MeshStandardMaterial;
}

const NERVOUS_AND_SENSORY_REGEX =
  /nerve|branch|ramus|rami|ganglion|ganglia|plexus|cord|root|tract|fascicul|funicul|lemnisc|peduncl|cortex|gyrus|gyri|sulcus|sulci|lobe|lobul|nucleus|nuclei|ventric|matter|commissur|fornix|thalam|hypothalam|epithalam|subthalam|pons|medulla|cerebell|cerebr|hippocamp|amygdal|striat|putamen|pallid|caudate|capsul|collicul|chiasm|olfactor|dura|arachnoid|pia|tentor|falx|filum|cauda|conus|mening|cistern|sinus|choroid|ependym|septum|corpus callosum|ansae|ansa|truncus|trunk|fibers|fibres|decussat|olive|olivary|pyramid|tegment|tectum|aqueduct|infundibul|mamillar|habenul|pineal|pituitar|neurohypoph|opercul|insul|cuneus|precuneus|cingul|parahippocamp|uncus|fimbria|indusium|tapetum|alveus|stria|taenia|velum|fastig|floccul|nodul|uvula|tonsil|vermis|hemispher|arbor|dentat|emboliform|globos|claustr|subicul|presubicul|parasubicul|entorhinal|perirhinal|geniculat|pulvinar|lamina|tuber|optic|oculomotor|trochlear|trigemin|abducens|vestibulocochlear|glossopharyng|vagus|accessory|hypogloss|eyeball|cornea|sclera|retina|iris|lens|vitreous|lacrimal|nasolacrimal|cochlea|vestibul|tympan|auditory|midbrain|fossa|pole|plane|culmen|declive|canal|substance|reticular|lat_fis/i;

const INTEGUMENTARY_LABELS_PT: Record<string, { pt: string; latin: string }> = {
  vh_f_fat: { pt: 'Tecido Adiposo Mamário', latin: 'Corpus adiposum mammae' },
  vh_f_nipple: { pt: 'Papila Mamária (Mamilo)', latin: 'Papilla mammaria' },
  vh_f_areola: { pt: 'Aréola Mamária', latin: 'Areola mammae' },
  vh_f_areolar_tubercles: { pt: 'Glândulas Areolares (de Montgomery)', latin: 'Glandulae areolares' },
  vh_f_mammary_lobes: { pt: 'Lobos da Glândula Mamária', latin: 'Lobi glandulae mammariae' },
  vh_f_main_lactiferous_ducts: { pt: 'Ductos Lactíferos Principais', latin: 'Ductus lactiferi' },
  vh_f_main_lactiferous_sinuses: { pt: 'Seios Lactíferos', latin: 'Sinus lactiferi' },
  vh_f_suspensory_ligaments: { pt: 'Ligamentos Suspensores da Mama (de Cooper)', latin: 'Ligamenta suspensoria mammaria' },
};

/**
 * Formata nomes de malhas não catalogadas (incluindo nomes sanitizados pelo Three.js GLTFLoader
 * como "Deltoid_fascial", "Temporoparietalis_musclel" ou "VH_F_fat_L") para nomenclatura clínica limpa.
 */
export function formatAnatomicalMeshName(rawInput: string): { namePtBr: string; nameLatin: string } {
  const raw = (rawInput || '').trim();
  if (!raw) return { namePtBr: 'Estrutura Anatômica', nameLatin: 'Structura anatomica' };

  // 1. Estruturas mamárias/tegumentares (VH_F_*_L / _R)
  const vhfMatch = raw.match(/^(vh_f_[a-z_]+?)_([lr])$/i);
  if (vhfMatch) {
    const baseKey = vhfMatch[1].toLowerCase();
    const sidePt = vhfMatch[2].toLowerCase() === 'l' ? ' (Esquerdo)' : ' (Direito)';
    const sideLat = vhfMatch[2].toLowerCase() === 'l' ? ' sinister' : ' dexter';
    const mapped = INTEGUMENTARY_LABELS_PT[baseKey];
    if (mapped) {
      return {
        namePtBr: `${mapped.pt}${sidePt}`,
        nameLatin: `${mapped.latin}${sideLat}`,
      };
    }
  }

  // 2. Detecta sufixo de lateralidade tanto no formato original (.l / .r / _L / _R)
  // quanto no formato sanitizado pelo Three.js GLTFLoader (ex: "Deltoid_fascial", "Temporoparietalis_musclel")
  let sideSuffixPt = '';
  let base = raw.replace(/[()]/g, '');

  if (/\.(?:o|e)?\d*([lr])$/i.test(base)) {
    const m = base.match(/\.(?:o|e)?\d*([lr])$/i)!;
    sideSuffixPt = m[1].toLowerCase() === 'l' ? ' (Esquerdo)' : ' (Direito)';
    base = base.replace(/\.(?:o|e)?\d*[lr]$/i, '');
  } else if (/_([lr])$/i.test(base)) {
    const m = base.match(/_([lr])$/i)!;
    sideSuffixPt = m[1].toLowerCase() === 'l' ? ' (Esquerdo)' : ' (Direito)';
    base = base.replace(/_[lr]$/i, '');
  } else if (/(muscle|fascia|tendon|bursa|ligament|tract|sheath|aponeurosis|part|head|belly)([lr])$/i.test(base)) {
    const m = base.match(/(muscle|fascia|tendon|bursa|ligament|tract|sheath|aponeurosis|part|head|belly)([lr])$/i)!;
    sideSuffixPt = m[2].toLowerCase() === 'l' ? ' (Esquerdo)' : ' (Direito)';
    base = base.slice(0, -1);
  }

  const cleanLatin = base.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  const cleanPt = cleanLatin
    .replace(/\bmuscle\b/gi, 'Músculo')
    .replace(/\bfascia\b/gi, 'Fáscia')
    .replace(/\btendon\b/gi, 'Tendão')
    .replace(/\bligament\b/gi, 'Ligamento')
    .replace(/\bbursa\b/gi, 'Bolsa Sinovial')
    .replace(/\btract\b/gi, 'Trato');

  return {
    namePtBr: `${cleanPt}${sideSuffixPt}`,
    nameLatin: cleanLatin,
  };
}

/**
 * Detecta malhas duplicadas exportadas acidentalmente em múltiplos arquivos .glb do Z-Anatomy
 * (ex.: 278 músculos dentro de nervous_male.glb, 29 dentes/cartilagens dentro de digestive_male.glb
 * e 705 decalques ósseos de origem/inserção .ol/.or/.el/.er dentro de muscular_male.glb),
 * evitando sobreposição (Z-fighting), fragmentos flutuantes e interceptação duplicada de cliques.
 */
export function isDuplicateCrossSystemMesh(
  systemName: string,
  meshName: string,
  item: ZAnatomyItem | null
): boolean {
  const normalizedCurrent = systemName === 'renal' ? 'urinary' : systemName;

  if (item && item.system) {
    const normalizedItem = item.system === 'renal' ? 'urinary' : item.system;
    if (normalizedItem !== normalizedCurrent) {
      return true;
    }
  }

  // Descarta decalques de pintura de origem (.ol/.or) e inserção (.el/.er) óssea exportados em muscular_male.glb
  if (normalizedCurrent === 'muscular') {
    if (/\.(?:o|e)\d*[lr]$/i.test(meshName) || /(?:[a-z_])(?:o|e)\d+[lr]$/i.test(meshName)) {
      return true;
    }
  }

  if (normalizedCurrent === 'digestive') {
    if (/\btooth\b|\bincisor\b|\bcanine\b|\bpremolar\b|\bmolar\b|\bthyroid cartilage\b/i.test(meshName)) {
      return true;
    }
  }

  if (normalizedCurrent === 'nervous') {
    if (!NERVOUS_AND_SENSORY_REGEX.test(meshName)) {
      return true;
    }
  } else if (normalizedCurrent !== 'muscular') {
    const isNerveStructure = /\bnerve\b|\bramus\b|\bbranch\b|\bplexus\b|\bganglion\b/i.test(meshName);
    if (!isNerveStructure && /\bmuscle\b|\bsphincter\b/i.test(meshName)) {
      return true;
    }
  }

  return false;
}

/**
 * Filtra se um nó pertence à região anatômica selecionada pelo usuário,
 * combinando metadados taxonômicos, palavras-chave e coordenadas 3D da malha.
 */
export function isNodeInRegion(
  item: ZAnatomyItem | null,
  meshName: string,
  region: AnatomicalRegion,
  mesh?: THREE.Mesh
): boolean {
  if (region === 'all' || !region) return true;

  if (item) {
    const detected = detectRegion(item);
    if (detected !== 'systemic') {
      return region === 'spine' ? detected === 'vertebral_column' : region === detected;
    }
  }

  const pathStr = (item?.path || []).join(' ').toLowerCase();
  const nameLower = (item?.nameEn || item?.namePtBr || meshName).toLowerCase();
  const center = mesh
    ? (mesh.userData?.anatomicalCenter as THREE.Vector3 | undefined) || getMeshAnatomicalCenter(mesh)
    : null;
  const hasCoords = Boolean(center && center.lengthSq() > 0.0001);

  switch (region) {
    case 'cranium':
      if (
        pathStr.includes('cranium') ||
        pathStr.includes('head') ||
        pathStr.includes('skull') ||
        pathStr.includes('mandible') ||
        [
          'frontal', 'parietal', 'occipital', 'temporal', 'sphenoid', 'ethmoid',
          'maxilla', 'mandible', 'zygomatic', 'nasal', 'lacrimal', 'vomer',
          'palatine', 'concha', 'tooth', 'incisor', 'canine', 'molar', 'premolar', 'hyoid',
          'brain', 'cerebr', 'cerebell', 'pons', 'medulla', 'cranial', 'optic', 'ocul',
          'facial', 'trigemin', 'parotid', 'submandibular', 'sublingual', 'tongue',
          'masseter', 'pterygoid', 'orbicularis', 'buccinator', 'platysma', 'eye', 'ear'
        ].some((k) => nameLower.includes(k))
      ) {
        return true;
      }
      return hasCoords ? center!.y >= 1.46 && Math.abs(center!.x) <= 0.16 : false;

    case 'spine':
      if (
        pathStr.includes('vertebral') ||
        pathStr.includes('vertebra') ||
        pathStr.includes('spine') ||
        [
          'atlas', 'axis', 'cervical', 'thoracic vertebra', 'lumbar', 'sacrum', 'coccyx',
          'spinal', 'intervertebral', 'erector', 'multifidus', 'rotatores', 'semispinalis',
          'longissimus', 'iliocostalis', 'splenius', 'suboccipital'
        ].some((k) => nameLower.includes(k))
      ) {
        return true;
      }
      return hasCoords
        ? Math.abs(center!.x) <= 0.09 && center!.y >= 0.82 && center!.y <= 1.50 && center!.z <= 0.01
        : false;

    case 'thorax':
      if (
        pathStr.includes('thorax') ||
        pathStr.includes('rib') ||
        pathStr.includes('sternum') ||
        [
          'rib', 'sternum', 'xiphoid', 'costal cartilage', 'cartilage of',
          'heart', 'ventricle', 'atrium', 'aorta', 'pulmon', 'lung', 'bronch', 'trachea',
          'pleura', 'pericard', 'mediastin', 'pectoral', 'intercostal', 'diaphragm',
          'serratus', 'subclav', 'mammary', 'breast', 'nipple', 'areola', 'esophag', 'thymus',
          'vh_f_', 'lactiferous', 'suspensory'
        ].some((k) => nameLower.includes(k))
      ) {
        return true;
      }
      return hasCoords
        ? Math.abs(center!.x) <= 0.20 && center!.y >= 1.04 && center!.y <= 1.44
        : false;

    case 'upper_limb':
      if (nameLower.includes('foot') || nameLower.includes('toe') || nameLower.includes('hallux')) {
        return false;
      }
      if (
        pathStr.includes('upper limb') ||
        pathStr.includes('pectoral') ||
        pathStr.includes('arm') ||
        [
          'clavicle', 'scapula', 'humerus', 'radius', 'ulna',
          'carpal', 'metacarpal', 'phalanx', 'scaphoid', 'lunate',
          'triquetrum', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate',
          'deltoid', 'biceps brachii', 'triceps', 'brachi', 'forearm', 'hand', 'wrist',
          'thumb', 'palmar', 'thenar', 'hypothenar', 'axillar', 'cephalic', 'basilic',
          'median nerve', 'ulnar', 'radial', 'supraspinatus', 'infraspinatus', 'subscapularis',
          'pronator', 'supinator', 'flexor carpi', 'extensor carpi'
        ].some((k) => nameLower.includes(k))
      ) {
        return true;
      }
      return hasCoords
        ? Math.abs(center!.x) > 0.16 && center!.y >= 0.70 && center!.y <= 1.46
        : false;

    case 'pelvis':
      if (
        pathStr.includes('pelvi') ||
        [
          'hip bone', 'ilium', 'ischium', 'pubis', 'sacrum',
          'iliac', 'psoas', 'piriformis', 'obturator', 'levator ani', 'coccygeus',
          'perine', 'bladder', 'ureter', 'urethra', 'prostate', 'uter', 'ovar',
          'testis', 'penis', 'rectum', 'sigmoid', 'glute', 'pudendal'
        ].some((k) => nameLower.includes(k))
      ) {
        return true;
      }
      return hasCoords
        ? Math.abs(center!.x) <= 0.20 && center!.y >= 0.74 && center!.y <= 1.04
        : false;

    case 'lower_limb':
      if (
        pathStr.includes('lower limb') ||
        pathStr.includes('leg') ||
        [
          'femur', 'patella', 'tibia', 'fibula', 'calcaneus', 'talus',
          'navicular', 'cuneiform', 'cuboid', 'metatarsal', 'sesamoid',
          'femoral', 'quadriceps', 'rectus femoris', 'vastus', 'sartorius', 'gracilis',
          'adductor', 'pectineus', 'biceps femoris', 'semitendinosus', 'semimembranosus',
          'poplite', 'tibial', 'fibular', 'perone', 'gastrocnemius', 'soleus', 'plantaris',
          'plantar', 'foot', 'toe', 'hallux', 'saphenous', 'sciatic'
        ].some((k) => nameLower.includes(k))
      ) {
        return true;
      }
      return hasCoords ? center!.y > 0.001 && center!.y < 0.82 : false;

    default:
      return true;
  }
}

import { resolveRichClinicalData } from '../../../shared/utils/clinicalEnrichment.ts';

/**
 * Converte um item do catálogo Z-Anatomy para a interface canônica AnyAnatomicalNode
 */
function toAnatomicalNode(item: ZAnatomyItem): AnyAnatomicalNode {
  return {
    id: item.id,
    fmaId: item.fmaId,
    namePtBr: item.namePtBr,
    nameLatin: item.nameLatin,
    chapter: item.chapter as 2 | 4 | 5 | 7 | 8 | 9,
    systemName: item.system === 'skeletal' ? 'Sistema Esquelético (Osteologia)' : item.system,
    meshName: item.node,
    parentId: item.path.length > 0 ? item.path[item.path.length - 1] : undefined,
    colorHex: item.system === 'skeletal' ? '#f4ede2' : '#38bdf8',
    explosionVector: item.explosionVector,
    clinicalData: resolveRichClinicalData(item),
  } as AnyAnatomicalNode;
}

interface PreparedMeshEntry {
  mesh: THREE.Mesh;
  item: ZAnatomyItem | null;
  baseMaterial: THREE.MeshStandardMaterial;
}

interface PreparedSystemCacheEntry {
  sourceScene: THREE.Object3D;
  clonedScene: THREE.Object3D;
  entries: PreparedMeshEntry[];
}

const PREPARED_SYSTEM_CACHE = new Map<string, PreparedSystemCacheEntry>();
const HOVER_SCRATCH_COLOR = new THREE.Color();
const HOVER_TINT_COLOR = new THREE.Color('#38bdf8');
const HOVER_EMISSIVE_COLOR = new THREE.Color('#0284c7');

function getOrCreatePreparedSystem(
  glbPath: string,
  systemName: string,
  defaultColor: string,
  sourceScene: THREE.Object3D
): PreparedSystemCacheEntry {
  const cacheKey = `${glbPath}::${systemName}::${defaultColor}`;
  const cached = PREPARED_SYSTEM_CACHE.get(cacheKey);
  if (cached && cached.sourceScene === sourceScene) {
    return cached;
  }

  const clonedScene = sourceScene.clone(true);
  const entries: PreparedMeshEntry[] = [];

  clonedScene.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const rawName = (mesh.userData?.name as string) || mesh.name;
    const item =
      Z_ANATOMY_BY_NODE[rawName] ||
      Z_ANATOMY_BY_NODE[mesh.name] ||
      Z_ANATOMY_BY_NODE[sanitizeNodeName(rawName)] ||
      Z_ANATOMY_BY_NODE[sanitizeNodeName(mesh.name)] ||
      null;

    if (isDuplicateCrossSystemMesh(systemName, rawName, item)) {
      mesh.visible = false;
      mesh.raycast = () => {};
      return;
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    if (!mesh.userData) mesh.userData = {};
    if (!mesh.userData.initialPosition) {
      mesh.userData.initialPosition = mesh.position.clone();
    }

    const formatted = formatAnatomicalMeshName(rawName);
    const nomePtResolved = item?.namePtBr || formatted.namePtBr;
    const layer = determineSurgicalLayer(systemName, rawName, nomePtResolved);
    const fallbackId = item?.id || `za:${mesh.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    const muscularProfile =
      systemName === 'muscular'
        ? getMuscularTissueProfile(rawName, nomePtResolved, defaultColor)
        : null;

    mesh.userData = {
      ...mesh.userData,
      id: fallbackId,
      nomePt: nomePtResolved,
      nomeLatin: item?.nameLatin || formatted.nameLatin,
      sistema: systemName,
      camadaProfundidade: layer,
      eixoExplosao: item?.explosionVector
        ? [item.explosionVector.x, item.explosionVector.y, item.explosionVector.z]
        : undefined,
      isAnchor: false,
      __isCatalogItem: Boolean(item),
      ...(muscularProfile
        ? {
            __tissueType: muscularProfile.tissueType,
            __tissueColor: muscularProfile.colorHex,
            __tissueOpacityFactor: muscularProfile.opacityFactor,
            __tissueRoughness: muscularProfile.roughness,
          }
        : {}),
    } as AnatomicalMeshUserData & {
      __isCatalogItem?: boolean;
      __tissueType?: string;
      __tissueColor?: string;
      __tissueOpacityFactor?: number;
      __tissueRoughness?: number;
    };

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(muscularProfile ? muscularProfile.colorHex : defaultColor),
      roughness: muscularProfile
        ? muscularProfile.roughness
        : systemName === 'skeletal'
        ? 0.54
        : 0.42,
      metalness: muscularProfile ? muscularProfile.metalness : 0.04,
      side: THREE.DoubleSide,
    });

    if (muscularProfile && mesh.geometry) {
      if (!mesh.geometry.boundingBox) {
        mesh.geometry.computeBoundingBox();
      }
      const bbox = mesh.geometry.boundingBox;
      let fiberAxis: [number, number, number] = [0, 1, 0];
      let fiberSpan: [number, number] = [-0.1, 0.1];
      if (bbox && !bbox.isEmpty()) {
        const dx = bbox.max.x - bbox.min.x;
        const dy = bbox.max.y - bbox.min.y;
        const dz = bbox.max.z - bbox.min.z;
        if (dx >= dy && dx >= dz) {
          fiberAxis = [1, 0, 0];
          fiberSpan = [bbox.min.x, bbox.max.x];
        } else if (dz >= dx && dz >= dy) {
          fiberAxis = [0, 0, 1];
          fiberSpan = [bbox.min.z, bbox.max.z];
        } else {
          fiberAxis = [0, 1, 0];
          fiberSpan = [bbox.min.y, bbox.max.y];
        }
      }
      applyAnatomicalTissueShader(mat, muscularProfile.tissueType, fiberAxis, fiberSpan);
    }

    mesh.userData.__customMat = true;
    mesh.material = mat;

    entries.push({
      mesh,
      item,
      baseMaterial: mat,
    });
  });

  const prepared: PreparedSystemCacheEntry = {
    sourceScene,
    clonedScene,
    entries,
  };
  PREPARED_SYSTEM_CACHE.set(cacheKey, prepared);
  return prepared;
}

/**
 * Subcomponente de Sistema Anatômico Real que carrega o modelo GLB,
 * vincula os materiais em cache e computa a animação de explosão sem realocação de shaders
 */
function RealSystemModel({
  glbPath,
  systemName,
  defaultColor,
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  activeRegion = 'all',
  opacity = 1.0,
  isXRay = false,
  magnitude = 0.35,
  modelOffset = DEFAULT_MODEL_OFFSET,
}: {
  glbPath: string;
  systemName: string;
  defaultColor: string;
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  activeRegion?: AnatomicalRegion;
  opacity?: number;
  isXRay?: boolean;
  magnitude?: number;
  modelOffset?: [number, number, number];
}) {
  const [offsetX, offsetY, offsetZ] = modelOffset;
  const { scene } = useGLTF(glbPath, DRACO_DECODER_PATH);
  const preparedSystem = useMemo(
    () => getOrCreatePreparedSystem(glbPath, systemName, defaultColor, scene),
    [glbPath, systemName, defaultColor, scene]
  );
  const clonedScene = preparedSystem.clonedScene;
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const storeHoveredNode = useAnatomyStore((s) => s.hoveredNodeId);
  const storeSelectedNodeId = useAnatomyStore((s) => s.selectedNodeId);
  const setStoreHoveredNode = useAnatomyStore((s) => s.setHoveredNode);
  const setStoreSelectedNode = useAnatomyStore((s) => s.setSelectedNode);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);

  const effectiveSelectedId = selectedNodeId || storeSelectedNodeId;
  const effectiveHovered = storeHoveredNode || hoveredNode;

  const storeActiveDepth = useAnatomyStore((s) => s.activeDepth);

  const [clickedLocalAnchor, setClickedLocalAnchor] = useState<{
    mesh: THREE.Mesh;
    basePoint: [number, number, number];
  } | null>(null);

  // Vincula deslocamentos de Exploded View por região reutilizando malhas e materiais pré-compilados
  const animNodes = useMemo(() => {
    const list: MeshAnimData[] = [];

    for (let i = 0; i < preparedSystem.entries.length; i++) {
      const { mesh, item, baseMaterial } = preparedSystem.entries[i];

      if (mesh.userData?.initialPosition) {
        mesh.position.copy(mesh.userData.initialPosition as THREE.Vector3);
      }

      mesh.userData.regiao = activeRegion;
      mesh.userData.distanciaMaxima = magnitude;
      mesh.userData.modelOffset = modelOffset;

      const binding = bindExplodedNode(mesh, activeRegion);
      const center = mesh.userData.anatomicalCenter as THREE.Vector3 | undefined;
      if (center) {
        const coords: [number, number, number] = [center.x, center.y, center.z];
        if (item?.id) registerMeshWorldCenter(item.id, coords);
        if (item?.node) registerMeshWorldCenter(item.node, coords);
        if (mesh.userData.id) registerMeshWorldCenter(mesh.userData.id as string, coords);
        registerMeshWorldCenter(mesh.name, coords);
      }

      list.push({
        mesh,
        binding,
        item,
        baseMaterial,
      });
    }

    return list;
  }, [preparedSystem, activeRegion, magnitude, offsetX, offsetY, offsetZ]);

  const prevHoveredEntryRef = useRef<MeshAnimData | null>(null);

  // Atualização determinística de visibilidade por região, 6 camadas e seleção (desacoplada do hover O(1))
  useEffect(() => {
    const visibilityState: VisibilityState = {
      hiddenIds: hiddenNodeIds,
      selectedId: effectiveSelectedId,
      activeDepth: storeActiveDepth,
      ghostMode,
      isolatedOnly,
    };

    const catalogNodes = animNodes.filter((d) => d.item !== null);
    const isEntireSystemHiddenInTree =
      catalogNodes.length > 0 &&
      catalogNodes.every(
        (d) =>
          hiddenNodeIds.has(d.item!.id) ||
          hiddenNodeIds.has(d.item!.node) ||
          hiddenNodeIds.has(d.mesh.name)
      );

    const hiddenMuscularSublayers = new Set<string>();
    if (systemName === 'muscular' && !isEntireSystemHiddenInTree) {
      for (const tType of ['fascia', 'superficial_muscle', 'deep_muscle', 'bursa']) {
        const subCatalog = catalogNodes.filter((d) => d.mesh.userData?.__tissueType === tType);
        if (
          subCatalog.length > 0 &&
          subCatalog.every(
            (d) =>
              hiddenNodeIds.has(d.item!.id) ||
              hiddenNodeIds.has(d.item!.node) ||
              hiddenNodeIds.has(d.mesh.name)
          )
        ) {
          hiddenMuscularSublayers.add(tType);
        }
      }
    }

    for (let i = 0; i < animNodes.length; i++) {
      const { mesh, item, baseMaterial } = animNodes[i];
      if (!item) {
        const meshTissueType = mesh.userData?.__tissueType as string | undefined;
        if (
          isEntireSystemHiddenInTree ||
          (systemName === 'muscular' && meshTissueType && hiddenMuscularSublayers.has(meshTissueType))
        ) {
          mesh.visible = false;
          mesh.raycast = () => {};
          continue;
        }
      }

      const isRegionVisible = isNodeInRegion(item, mesh.name, activeRegion, mesh);
      if (!isRegionVisible) {
        mesh.visible = false;
        mesh.raycast = () => {};
        continue;
      }

      updateMeshVisibility(
        mesh,
        visibilityState,
        baseMaterial,
        defaultColor,
        isXRay ? 0.22 : opacity
      );
    }
    prevHoveredEntryRef.current = null;
  }, [
    animNodes,
    effectiveSelectedId,
    ghostMode,
    isolatedOnly,
    activeRegion,
    systemName,
    opacity,
    isXRay,
    defaultColor,
    hiddenNodeIds,
    storeActiveDepth,
  ]);

  // Atualização O(1) dedicada exclusivamente ao destaque de Hover (restaura 1 malha anterior + ilumina 1 malha atual)
  useEffect(() => {
    const visibilityState: VisibilityState = {
      hiddenIds: hiddenNodeIds,
      selectedId: effectiveSelectedId,
      activeDepth: storeActiveDepth,
      ghostMode,
      isolatedOnly,
    };

    const prev = prevHoveredEntryRef.current;
    if (prev && prev.mesh.visible) {
      updateMeshVisibility(
        prev.mesh,
        visibilityState,
        prev.baseMaterial,
        defaultColor,
        isXRay ? 0.22 : opacity
      );
    }
    prevHoveredEntryRef.current = null;

    if (!effectiveHovered) return;

    const target = animNodes.find(
      (d) =>
        d.mesh.name === effectiveHovered ||
        d.mesh.userData?.id === effectiveHovered ||
        (d.item?.id && d.item.id === effectiveHovered) ||
        (d.item?.node && d.item.node === effectiveHovered)
    );

    if (!target || !target.mesh.visible) return;

    const isSelected =
      effectiveSelectedId === target.item?.id ||
      effectiveSelectedId === target.mesh.userData?.id ||
      effectiveSelectedId === target.mesh.name;

    if (!isSelected) {
      const baseHex = (target.mesh.userData?.__tissueColor as string) || defaultColor;
      HOVER_SCRATCH_COLOR.set(baseHex).lerp(HOVER_TINT_COLOR, 0.2);
      target.baseMaterial.color.copy(HOVER_SCRATCH_COLOR);
      target.baseMaterial.emissive.copy(HOVER_EMISSIVE_COLOR);
      target.baseMaterial.emissiveIntensity = 0.14;
      prevHoveredEntryRef.current = target;
    }
  }, [
    effectiveHovered,
    animNodes,
    effectiveSelectedId,
    hiddenNodeIds,
    storeActiveDepth,
    ghostMode,
    isolatedOnly,
    defaultColor,
    isXRay,
    opacity,
  ]);

  // Array otimizado de nós vinculados para o loop da GPU
  const bindings = useMemo(() => animNodes.map((d) => d.binding), [animNodes]);
  const lastAppliedProgressRef = useRef<number>(-1);

  useEffect(() => {
    lastAppliedProgressRef.current = -1;
  }, [bindings]);

  // Animação da Exploded View no loop Three.js useFrame com avanço 100% linear e trava de inatividade (zero travamento em repouso)
  useFrame(() => {
    const storeProgress = useAnatomyStore.getState().explosionProgress;
    const liveProgress = Number.isFinite(storeProgress) ? storeProgress : explosionProgress;
    if (Math.abs(liveProgress - lastAppliedProgressRef.current) > 0.0005) {
      applyExplodedStep(bindings, liveProgress, 1.0);
      lastAppliedProgressRef.current = liveProgress;
    }
  });

  // Localiza o item atualmente selecionado para renderizar o Pin 3D e guiar a câmera
  const selectedMeshItem = useMemo(() => {
    if (!effectiveSelectedId) return null;
    return (
      animNodes.find(
        (d) =>
          d.item?.id === effectiveSelectedId ||
          d.mesh.userData?.id === effectiveSelectedId ||
          d.mesh.name === effectiveSelectedId
      ) || null
    );
  }, [effectiveSelectedId, animNodes]);

  // Centralização suave de câmera ao selecionar a peça
  useEffect(() => {
    if (selectedMeshItem && selectedMeshItem.mesh.visible) {
      selectedMeshItem.mesh.updateWorldMatrix(true, false);
      const box = new THREE.Box3().setFromObject(selectedMeshItem.mesh);
      if (!box.isEmpty()) {
        const center = box.getCenter(new THREE.Vector3());
        setCameraFocusTarget([center.x, center.y, center.z]);
        if (typeof window !== 'undefined') {
          (window as unknown as { __selectedMeshWorldCenter?: [number, number, number] }).__selectedMeshWorldCenter = [
            center.x,
            center.y,
            center.z,
          ];
        }
      }
    }
  }, [selectedMeshItem, setCameraFocusTarget]);

  const calloutAnchorPosition = useMemo<[number, number, number]>(() => {
    if (!selectedMeshItem) return [0, 0, 0];
    const mesh = selectedMeshItem.mesh;
    const binding = selectedMeshItem.binding;
    const targetMeshPos = binding
      ? evaluateExplodedPosition(binding, explosionProgress)
      : mesh.position;
    const initPos =
      (mesh.userData?.initialPosition as THREE.Vector3 | undefined) ||
      new THREE.Vector3();

    // Se o usuário clicou diretamente sobre a superfície 3D da malha, ancora o ponto exatamente no local clicado
    // (acompanhando o deslocamento da Exploded View). Se selecionou pela árvore/busca, usa o centro anatômico real.
    if (clickedLocalAnchor && clickedLocalAnchor.mesh === mesh) {
      return [
        clickedLocalAnchor.basePoint[0] + (targetMeshPos.x - initPos.x),
        clickedLocalAnchor.basePoint[1] + (targetMeshPos.y - initPos.y),
        clickedLocalAnchor.basePoint[2] + (targetMeshPos.z - initPos.z),
      ];
    }

    const anatomicalCenter =
      (mesh.userData?.anatomicalCenter as THREE.Vector3 | undefined) ||
      getMeshAnatomicalCenter(mesh);
    // Subtrai modelOffset pois o <AnatomicalCallout3D> já é renderizado dentro de <group position={modelOffset}>
    return [
      anatomicalCenter.x - offsetX + (targetMeshPos.x - initPos.x),
      anatomicalCenter.y - offsetY + (targetMeshPos.y - initPos.y),
      anatomicalCenter.z - offsetZ + (targetMeshPos.z - initPos.z),
    ];
  }, [selectedMeshItem, explosionProgress, offsetX, offsetY, offsetZ, clickedLocalAnchor]);

  return (
    <group position={modelOffset}>
      <primitive
        object={clonedScene}
        onPointerOver={(e: {
          stopPropagation: () => void;
          object: THREE.Object3D;
          nativeEvent?: PointerEvent | MouseEvent;
        }) => {
          e.stopPropagation();
          // Não dispara hover durante arraste orbital/pan da câmera (botões do mouse pressionados)
          if (e.nativeEvent && typeof e.nativeEvent.buttons === 'number' && e.nativeEvent.buttons > 0) {
            return;
          }
          const nextName = e.object.name;
          if (hoveredNode !== nextName) {
            setHoveredNode(nextName);
          }
          if (useAnatomyStore.getState().hoveredNodeId !== nextName) {
            setStoreHoveredNode(nextName);
          }
        }}
        onPointerOut={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          if (hoveredNode !== null) {
            setHoveredNode(null);
          }
          if (useAnatomyStore.getState().hoveredNodeId !== null) {
            setStoreHoveredNode(null);
          }
        }}
        onClick={(e: {
          stopPropagation: () => void;
          object: THREE.Object3D;
          point?: THREE.Vector3;
          altKey?: boolean;
          delta?: number;
        }) => {
          e.stopPropagation();
          // Ignora cliques gerados ao soltar o mouse após arrastar/girar a câmera (> 5px)
          if (typeof e.delta === 'number' && e.delta > 5) {
            return;
          }
          const target = animNodes.find((d) => d.mesh === e.object);
          const rawName = (e.object.userData?.name as string) || e.object.name;
          const resolvedItem =
            target?.item ||
            Z_ANATOMY_BY_NODE[rawName] ||
            Z_ANATOMY_BY_NODE[e.object.name] ||
            Z_ANATOMY_BY_NODE[sanitizeNodeName(rawName)] ||
            Z_ANATOMY_BY_NODE[sanitizeNodeName(e.object.name)] ||
            null;

          // Modo Bisturi 3D (Click-to-Peel) ou atalho Alt+Clique: retira imediatamente a estrutura clicada!
          const storeState = useAnatomyStore.getState();
          if (storeState.peelOnClickMode || e.altKey) {
            const formatted = formatAnatomicalMeshName(rawName);
            const fallbackId =
              resolvedItem?.id ||
              (e.object.userData?.id as string) ||
              `za:${e.object.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
            const labelPt = resolvedItem?.namePtBr || formatted.namePtBr || e.object.name;
            storeState.peelNodeOnClick(fallbackId, labelPt, [
              e.object.name,
              rawName,
              sanitizeNodeName(rawName),
              ...(resolvedItem ? [resolvedItem.id, resolvedItem.node] : []),
            ]);
            setHoveredNode(null);
            setStoreHoveredNode(null);
            return;
          }

          if (target && e.point && e.object.parent) {
            const localPt = e.object.parent.worldToLocal(e.point.clone());
            const initPos =
              (target.mesh.userData?.initialPosition as THREE.Vector3 | undefined) ||
              target.mesh.position;
            setClickedLocalAnchor({
              mesh: target.mesh,
              basePoint: [
                localPt.x - (target.mesh.position.x - initPos.x),
                localPt.y - (target.mesh.position.y - initPos.y),
                localPt.z - (target.mesh.position.z - initPos.z),
              ],
            });
          } else {
            setClickedLocalAnchor(null);
          }

          if (resolvedItem) {
            const node = toAnatomicalNode(resolvedItem);
            const nextVal = effectiveSelectedId === node.id ? null : node;
            setStoreSelectedNode(nextVal ? node.id : null);
            onSelectNode(nextVal);
          } else if (e.object.name) {
            const formatted = formatAnatomicalMeshName(rawName);
            const fallbackNode: GeneralAnatomicalNode = {
              id: (e.object.userData?.id as string) || `za:${e.object.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
              namePtBr: formatted.namePtBr,
              nameLatin: formatted.nameLatin,
              chapter: systemName === 'muscular' ? 3 : 2,
              systemName:
                systemName === 'muscular'
                  ? 'Sistema Muscular (Miologia)'
                  : systemName === 'integumentary'
                  ? 'Sistema Tegumentar'
                  : systemName,
              meshName: e.object.name,
              clinicalData: {
                origin: `Estrutura integrante do ${systemName}`,
                insertion: 'Plano anatômico dissecado',
                clinicalSignificance: `Módulo anatômico Z-Anatomy: ${formatted.namePtBr}.`,
              },
            };
            const nextVal = effectiveSelectedId === fallbackNode.id ? null : fallbackNode;
            setStoreSelectedNode(nextVal ? fallbackNode.id : null);
            onSelectNode(nextVal);
          }
        }}
      />

      {/* Callout 3D Elegante com Linha Guia (Leader Line) Deslocada do Modelo */}
      {selectedMeshItem && selectedMeshItem.mesh.visible && (
        <AnatomicalCallout3D
          node={
            selectedMeshItem.item
              ? toAnatomicalNode(selectedMeshItem.item)
              : (() => {
                  const rawName =
                    (selectedMeshItem.mesh.userData?.name as string) ||
                    selectedMeshItem.mesh.name;
                  const formatted = formatAnatomicalMeshName(rawName);
                  return {
                    id:
                      (selectedMeshItem.mesh.userData?.id as string) ||
                      `za:${selectedMeshItem.mesh.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
                    namePtBr: formatted.namePtBr,
                    nameLatin: formatted.nameLatin,
                    chapter: systemName === 'muscular' ? 3 : 2,
                    systemName:
                      systemName === 'muscular'
                        ? 'Sistema Muscular (Miologia)'
                        : systemName === 'integumentary'
                        ? 'Sistema Tegumentar'
                        : systemName,
                    meshName: selectedMeshItem.mesh.name,
                  } as AnyAnatomicalNode;
                })()
          }
          position={calloutAnchorPosition}
          worldPosition={[
            calloutAnchorPosition[0] + offsetX,
            calloutAnchorPosition[1] + offsetY,
            calloutAnchorPosition[2] + offsetZ,
          ]}
          onClose={() => {
            setClickedLocalAnchor(null);
            setStoreSelectedNode(null);
            onSelectNode(null);
          }}
          onOpenDetailsTab={() => useAnatomyStore.getState().setSidebarTab('details')}
        />
      )}
    </group>
  );
}

/**
 * Componente Principal do Atlas Corporal Real Z-Anatomy
 * Gerencia escala e centralização dinâmica de acordo com a região selecionada
 */
export function RealBodyAtlas({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  activeSystem,
  activeRegion = 'all',
  layerPeelingLevel: _layerPeelingLevel = 0,
  realSkullOpacity = 1.0,
  visualMode = 'solid',
}: RealBodyAtlasProps) {
  const groupRef = useRef<THREE.Group>(null);
  const storeModules = useAnatomyStore((s) => s.modules);
  const storeExplosionProgress = useAnatomyStore((s) => s.explosionProgress);
  const storeSelectedNodeId = useAnatomyStore((s) => s.selectedNodeId);

  // Sincroniza a seleção na aplicação quando o nó for clicado na árvore
  useEffect(() => {
    if (storeSelectedNodeId && storeSelectedNodeId !== selectedNodeId) {
      const item = Z_ANATOMY_BY_ID[storeSelectedNodeId] || Z_ANATOMY_BY_NODE[storeSelectedNodeId];
      if (item) {
        onSelectNode(toAnatomicalNode(item));
      }
    }
  }, [storeSelectedNodeId, selectedNodeId, onSelectNode]);

  const effectiveExplosion = Number.isFinite(storeExplosionProgress)
    ? storeExplosionProgress
    : explosionProgress > 0
    ? explosionProgress
    : storeModules.explodedProgress;
  const effectiveOpacity = Math.abs(realSkullOpacity - 1.0) > 1e-4 ? realSkullOpacity : storeModules.solidOpacity;
  const effectiveXRay = visualMode === 'xray' || storeModules.xRayMode;

  // Coleta de Lixo WebGL Determinística ao desmontar
  useEffect(() => {
    return () => {
      PREPARED_SYSTEM_CACHE.clear();
      if (groupRef.current) {
        const report = disposeHierarchy(groupRef.current);
        logWebGLGarbageCollection('RealBodyAtlas', report);
      }
    };
  }, []);

  // Determina quais sistemas devem ser exibidos e suas respectivas opacidades individuais
  const storeActiveSystems = useAnatomyStore((s) => s.activeSystems);
  const storeSystemOpacities = useAnatomyStore((s) => s.systemOpacities);
  const biologicalSex = useAnatomyStore((s) => s.biologicalSex);
  const selectivePartLoading = useAnatomyStore((s) => s.selectivePartLoading);
  const loadedParts = useAnatomyStore((s) => s.loadedParts);

  const isSysActive = (sys: ActiveAnatomicalSystem) => {
    const altSys = (sys === 'urinary' ? 'renal' : sys) as ActiveAnatomicalSystem;
    if (storeActiveSystems && storeActiveSystems.size > 0) {
      if (storeActiveSystems.has(sys) || storeActiveSystems.has(altSys)) {
        return true;
      }
      if (storeActiveSystems.has('all')) {
        if (selectivePartLoading && loadedParts && loadedParts.size > 0) {
          return loadedParts.has(sys) || loadedParts.has(altSys);
        }
        return true;
      }
      return false;
    }
    return activeSystem === sys || activeSystem === altSys || activeSystem === 'all';
  };

  const getSysOpacity = (sys: ActiveAnatomicalSystem, fallback = effectiveOpacity) => {
    if (storeSystemOpacities && typeof storeSystemOpacities[sys] === 'number') {
      return storeSystemOpacities[sys];
    }
    return fallback;
  };

  const showIntegumentary =
    isSysActive('integumentary') &&
    (biologicalSex === 'female' || Boolean(storeActiveSystems && storeActiveSystems.has('integumentary')));
  const integumentaryOpacity = getSysOpacity('integumentary', 0.85);

  const showSkeletal = isSysActive('skeletal');
  const skeletalOpacity = getSysOpacity('skeletal');

  // O sistema muscular aparece conforme seleção concorrente ou modo global
  const showMuscular = isSysActive('muscular');
  const muscularOpacity = getSysOpacity('muscular');

  const showRespiratory = isSysActive('respiratory');
  const respiratoryOpacity = getSysOpacity('respiratory');

  const showCardiovascular = isSysActive('cardiovascular');
  const cardioOpacity = getSysOpacity('cardiovascular');

  const showDigestive = isSysActive('digestive');
  const digestiveOpacity = getSysOpacity('digestive');

  const showNervous = isSysActive('nervous');
  const nervousOpacity = getSysOpacity('nervous');

  const showRenal = isSysActive('urinary');
  const renalOpacity = getSysOpacity('urinary');

  const showLymphatic = isSysActive('lymphatic');
  const lymphaticOpacity = getSysOpacity('lymphatic');

  const showEndocrine = isSysActive('endocrine');
  const endocrineOpacity = getSysOpacity('endocrine');

  const showReproductive = isSysActive('reproductive');
  const reproductiveOpacity = getSysOpacity('reproductive');

  // Centralização e Escala Adaptativa conforme a região selecionada:
  // Se o usuário selecionou apenas o Crânio, centralizamos a cabeça no meio do viewport com zoom cirúrgico!
  const { position, scale } = useMemo<{ position: [number, number, number]; scale: [number, number, number] }>(() => {
    if (activeRegion === 'cranium') {
      return {
        position: [0, CRANIUM_FOCUS_OFFSET_Y, 0],
        scale: [3.1, 3.1, 3.1],
      };
    }
    if (activeRegion === 'spine') {
      return {
        position: [0, -2.6, 0],
        scale: [2.5, 2.5, 2.5],
      };
    }
    if (activeRegion === 'thorax') {
      return {
        position: [0, -2.9, 0],
        scale: [2.5, 2.5, 2.5],
      };
    }
    if (activeRegion === 'upper_limb') {
      return {
        position: [0, -2.6, 0],
        scale: [2.2, 2.2, 2.2],
      };
    }
    if (activeRegion === 'pelvis') {
      return {
        position: [0, -1.8, 0],
        scale: [2.3, 2.3, 2.3],
      };
    }
    if (activeRegion === 'lower_limb') {
      return {
        position: [0, -0.6, 0],
        scale: [2.0, 2.0, 2.0],
      };
    }
    // Visão Padrão: Corpo Humano Completo
    return {
      position: [0, -0.8, 0],
      scale: [1.7, 1.7, 1.7],
    };
  }, [activeRegion]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 0. Sistema Tegumentar e Mamário Real (Exclusivo do Modelo Feminino ou quando isolado) */}
      {showIntegumentary && (
        <RealSystemModel
          glbPath="/models/anatomy/integumentary_female.glb"
          systemName="integumentary"
          defaultColor="#d4a373" // Tom de pele canônico
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={integumentaryOpacity}
          isXRay={effectiveXRay}
          magnitude={0.42}
          modelOffset={FEMALE_PELVIC_OFFSET}
        />
      )}

      {/* 1. Esqueleto Humano Completo (335 Ossos Reais com Filtro por Região) */}
      {showSkeletal && (
        <RealSystemModel
          glbPath="/models/anatomy/skeletal_male.glb"
          systemName="skeletal"
          defaultColor="#e8dfd1" // Marfim cortical PBR equilibrado sem estourar branco
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={skeletalOpacity}
          isXRay={effectiveXRay}
          magnitude={activeRegion === 'cranium' ? 0.45 : 0.28}
        />
      )}

      {/* 2. Sistema Muscular Real Z-Anatomy (Músculos Reais sem decalques ósseos) */}
      {showMuscular && (
        <RealSystemModel
          glbPath="/models/anatomy/muscular_male.glb"
          systemName="muscular"
          defaultColor="#b91c1c" // Tom avermelhado muscular realista
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={muscularOpacity}
          isXRay={effectiveXRay}
          magnitude={0.34}
        />
      )}

      {/* 3. Sistema Respiratório Real (Traqueia, Brônquios, Pulmões com Lobos) */}
      {showRespiratory && (
        <RealSystemModel
          glbPath="/models/anatomy/respiratory_male.glb"
          systemName="respiratory"
          defaultColor="#67e8f9" // Tom ciano pulmonar
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={respiratoryOpacity}
          isXRay={effectiveXRay}
          magnitude={0.22}
        />
      )}

      {/* 4. Sistema Cardiovascular Real (Coração e Grandes Vasos) */}
      {showCardiovascular && (
        <RealSystemModel
          glbPath="/models/anatomy/cardiovascular_male.glb"
          systemName="cardiovascular"
          defaultColor="#ef4444" // Vermelho vascular cardíaco
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={cardioOpacity}
          isXRay={effectiveXRay}
          magnitude={0.25}
        />
      )}

      {/* 5. Sistema Digestório Real (Esôfago, Estômago, Fígado, Pâncreas, Intestinos) */}
      {showDigestive && (
        <RealSystemModel
          glbPath="/models/anatomy/digestive_male.glb"
          systemName="digestive"
          defaultColor="#f59e0b" // Âmbar digestório
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={digestiveOpacity}
          isXRay={effectiveXRay}
          magnitude={0.22}
        />
      )}

      {/* 6. Sistema Nervoso Real (Encéfalo, Cerebelo, Medula Espinhal) */}
      {showNervous && (
        <RealSystemModel
          glbPath="/models/anatomy/nervous_male.glb"
          systemName="nervous"
          defaultColor="#eab308" // Amarelo neuro
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={nervousOpacity}
          isXRay={effectiveXRay}
          magnitude={0.26}
        />
      )}

      {/* 7. Sistema Renal / Urinário Real (Rins e Vias Urinárias) */}
      {showRenal && (
        <RealSystemModel
          glbPath="/models/anatomy/renal_male.glb"
          systemName="urinary"
          defaultColor="#a855f7" // Púrpura urológico
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={renalOpacity}
          isXRay={effectiveXRay}
          magnitude={0.22}
        />
      )}

      {/* 8. Sistema Linfático Real (Vasos e Linfonodos) */}
      {showLymphatic && (
        <RealSystemModel
          glbPath="/models/anatomy/lymphatic_male.glb"
          systemName="lymphatic"
          defaultColor="#10b981" // Verde linfático
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={lymphaticOpacity}
          isXRay={effectiveXRay}
          magnitude={0.25}
        />
      )}

      {/* 9. Sistema Endócrino Real (Tireoide, Suprarrenais, Hipófise) */}
      {showEndocrine && (
        <RealSystemModel
          glbPath="/models/anatomy/endocrine_male.glb"
          systemName="endocrine"
          defaultColor="#8b5cf6" // Violeta endócrino
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={endocrineOpacity}
          isXRay={effectiveXRay}
          magnitude={0.22}
        />
      )}

      {/* 10. Sistema Reprodutor Real (Sincronizado por Sexo Biológico: Feminino vs Masculino) */}
      {showReproductive && biologicalSex === 'female' && (
        <RealSystemModel
          glbPath="/models/anatomy/reproductive_female.glb"
          systemName="reproductive"
          defaultColor="#f43f5e" // Coral reprodutor feminino
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={reproductiveOpacity}
          isXRay={effectiveXRay}
          magnitude={0.28}
          modelOffset={FEMALE_PELVIC_OFFSET}
        />
      )}
      {showReproductive && biologicalSex !== 'female' && (
        <RealSystemModel
          glbPath="/models/anatomy/reproductive_male.glb"
          systemName="reproductive"
          defaultColor="#f43f5e" // Coral reprodutor masculino
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={reproductiveOpacity}
          isXRay={effectiveXRay}
          magnitude={0.22}
        />
      )}
    </group>
  );
}

// Preload dos modelos principais para carregamento instantâneo em ambiente de navegador
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  useGLTF.preload('/models/anatomy/skeletal_male.glb', DRACO_DECODER_PATH);
  useGLTF.preload('/models/anatomy/integumentary_female.glb', DRACO_DECODER_PATH);
  useGLTF.preload('/models/anatomy/reproductive_female.glb', DRACO_DECODER_PATH);
}



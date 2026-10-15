import { ZAnatomyItem, sanitizeNodeName } from '../constants/zAnatomyCatalog.ts';
import { FEMALE_REPRODUCTIVE_CATALOG } from '../constants/femaleReproductiveCatalog.ts';
import { TaxonomicTreeNode } from '../types/taxonomicTree.ts';
import { SYSTEM_METADATA, REGION_METADATA } from '../constants/taxonomicMetadata.ts';
import { determineSurgicalLayer } from '../../core/surgicalLayers.ts';

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

/**
 * Classifica um elemento anatômico em uma das 7 regiões corporais canônicas
 */
export function detectRegion(item: ZAnatomyItem): string {
  const pathStr = (item.path || []).join(' ').toLowerCase();
  const nameStr = `${item.node} ${item.nameEn || ''} ${item.namePtBr || ''}`.toLowerCase();
  const fullText = `${pathStr} ${nameStr}`;

  // Membro Superior deve vir antes de tórax para capturar cintura escapular (clavícula/escápula)
  if (
    fullText.includes('upper limb') ||
    fullText.includes('arm') ||
    fullText.includes('forearm') ||
    fullText.includes('hand') ||
    fullText.includes('scapula') ||
    fullText.includes('clavicle') ||
    fullText.includes('humerus') ||
    fullText.includes('radius') ||
    fullText.includes('ulna') ||
    fullText.includes('carpal') ||
    fullText.includes('metacarpal') ||
    fullText.includes('brachial') ||
    fullText.includes('antebrachial') ||
    fullText.includes('deltoid') ||
    fullText.includes('supraspinatus') ||
    fullText.includes('infraspinatus') ||
    fullText.includes('subscapularis') ||
    fullText.includes('biceps brachii') ||
    fullText.includes('triceps brachii') ||
    fullText.includes('brachioradialis') ||
    fullText.includes('pronator') ||
    fullText.includes('supinator') ||
    fullText.includes('flexor carpi') ||
    fullText.includes('extensor carpi') ||
    fullText.includes('palmar') ||
    fullText.includes('pollicis') ||
    fullText.includes('wrist') ||
    fullText.includes('finger') ||
    fullText.includes('thumb') ||
    (item.system === 'skeletal' && fullText.includes('pectoral'))
  ) {
    return 'upper_limb';
  }

  if (
    fullText.includes('cranium') ||
    fullText.includes('head') ||
    fullText.includes('skull') ||
    fullText.includes('mandible') ||
    fullText.includes('face') ||
    fullText.includes('facial') ||
    fullText.includes('cerebr') ||
    fullText.includes('brain') ||
    fullText.includes('encephalon') ||
    fullText.includes('cerebell') ||
    fullText.includes('eye') ||
    fullText.includes('ear') ||
    fullText.includes('nasal') ||
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
    fullText.includes('palatine') ||
    fullText.includes('masseter') ||
    fullText.includes('pterygoid') ||
    fullText.includes('epicranial') ||
    fullText.includes('platysma') ||
    fullText.includes('sternocleidomastoid') ||
    fullText.includes('hyoid') ||
    fullText.includes('digastric') ||
    fullText.includes('pharyn') ||
    fullText.includes('laryn') ||
    fullText.includes('neck')
  ) {
    return 'cranium';
  }

  if (
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
    fullText.includes('spinal cord') ||
    fullText.includes('epaxial') ||
    fullText.includes('erector spinae') ||
    fullText.includes('iliocostalis') ||
    fullText.includes('longissimus') ||
    fullText.includes('transversospinal') ||
    fullText.includes('multifidus') ||
    fullText.includes('splenius') ||
    fullText.includes('suboccipital') ||
    fullText.includes('thoracolumbar')
  ) {
    return 'vertebral_column';
  }

  if (
    fullText.includes('thorax') ||
    fullText.includes('thoracic') ||
    fullText.includes('rib') ||
    fullText.includes('sternum') ||
    fullText.includes('costal') ||
    fullText.includes('lung') ||
    fullText.includes('bronch') ||
    fullText.includes('trachea') ||
    fullText.includes('heart') ||
    fullText.includes('cardiac') ||
    fullText.includes('mediastin') ||
    fullText.includes('pectoral') ||
    fullText.includes('intercostal') ||
    fullText.includes('diaphragm') ||
    fullText.includes('serratus') ||
    fullText.includes('rectus abdominis') ||
    fullText.includes('obliquus') ||
    fullText.includes('abdominal') ||
    fullText.includes('trapezius') ||
    fullText.includes('latissimus') ||
    fullText.includes('mammary') ||
    fullText.includes('mamária') ||
    fullText.includes('mamário') ||
    fullText.includes('lactifer') ||
    fullText.includes('areola') ||
    fullText.includes('nipple') ||
    fullText.includes('vh_f_')
  ) {
    return 'thorax';
  }

  if (
    fullText.includes('pelvi') ||
    fullText.includes('hip') ||
    fullText.includes('ilium') ||
    fullText.includes('ischium') ||
    fullText.includes('pubis') ||
    fullText.includes('bladder') ||
    fullText.includes('ureter') ||
    fullText.includes('uterus') ||
    fullText.includes('ovary') ||
    fullText.includes('prostate') ||
    fullText.includes('testis') ||
    fullText.includes('glute') ||
    fullText.includes('piriformis') ||
    fullText.includes('iliopsoas') ||
    fullText.includes('psoas') ||
    fullText.includes('iliacus') ||
    fullText.includes('obturator') ||
    fullText.includes('levator ani') ||
    fullText.includes('perine') ||
    fullText.includes('inguinal')
  ) {
    return 'pelvis';
  }

  if (
    fullText.includes('lower limb') ||
    fullText.includes('leg') ||
    fullText.includes('thigh') ||
    fullText.includes('foot') ||
    fullText.includes('femur') ||
    fullText.includes('patella') ||
    fullText.includes('tibia') ||
    fullText.includes('fibula') ||
    fullText.includes('tarsal') ||
    fullText.includes('metatarsal') ||
    fullText.includes('toe') ||
    fullText.includes('calcaneus') ||
    fullText.includes('fascia lata') ||
    fullText.includes('iliotibial') ||
    fullText.includes('crural') ||
    fullText.includes('sartorius') ||
    fullText.includes('quadriceps') ||
    fullText.includes('rectus femoris') ||
    fullText.includes('vastus') ||
    fullText.includes('adductor') ||
    fullText.includes('gracilis') ||
    fullText.includes('biceps femoris') ||
    fullText.includes('semitendinosus') ||
    fullText.includes('semimembranosus') ||
    fullText.includes('gastrocnemius') ||
    fullText.includes('soleus') ||
    fullText.includes('plantar') ||
    fullText.includes('hallucis') ||
    fullText.includes('ankle')
  ) {
    return 'lower_limb';
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
  return {
    id: item.id,
    namePt: item.namePtBr || item.nameEn || item.node,
    nameTA2: item.nameLatin,
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
  return surgicalLayer * 10 - radialDistance;
}

function sortItemsOutsideToInside(items: ZAnatomyItem[]): ZAnatomyItem[] {
  return [...items].sort((a, b) => {
    const diff = getItemOutsideToInsideScore(a) - getItemOutsideToInsideScore(b);
    if (Math.abs(diff) > 0.01) return diff;
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
    const subKey = item.path && item.path.length > 0 ? item.path[0] : '__geral__';

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
    const orderA = SYSTEM_METADATA[a]?.order ?? 99;
    const orderB = SYSTEM_METADATA[b]?.order ?? 99;
    return orderA - orderB;
  });

  for (const sysId of sortedSystems) {
    const regionMap = systemBuckets.get(sysId)!;
    const systemDescendants = new Set<string>();

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
        const orderA = MUSCULAR_SUBLAYER_METADATA[a]?.order ?? 99;
        const orderB = MUSCULAR_SUBLAYER_METADATA[b]?.order ?? 99;
        return orderA - orderB;
      });

      const sublayerNodes: TaxonomicTreeNode[] = [];

      for (const layerKey of sortedLayers) {
        const meta = MUSCULAR_SUBLAYER_METADATA[layerKey] || {
          idSuffix: layerKey.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          labelPt: layerKey,
          labelTA2: layerKey,
          order: 99,
        };
        const regInLayer = sublayerBuckets.get(layerKey)!;
        const sortedRegs = Array.from(regInLayer.keys()).sort((a, b) => {
          const orderA = REGION_METADATA[a]?.order ?? 99;
          const orderB = REGION_METADATA[b]?.order ?? 99;
          return orderA - orderB;
        });

        const layerRegionNodes: TaxonomicTreeNode[] = [];
        const layerDescendants = new Set<string>();

        for (const regId of sortedRegs) {
          const items = sortItemsOutsideToInside(regInLayer.get(regId)!);
          const leafNodes = items.map((item) => createLeafNode(item, sysId, regId, 4));
          const regDescendants = new Set<string>();

          for (const leaf of leafNodes) {
            for (const id of leaf.descendantIds) {
              regDescendants.add(id);
              layerDescendants.add(id);
              systemDescendants.add(id);
            }
          }

          const regMeta = REGION_METADATA[regId];
          layerRegionNodes.push({
            id: `reg_muscular_${meta.idSuffix}_${regId}`,
            namePt: regMeta?.labelPt || regId,
            nameTA2: regMeta?.labelTA2,
            type: 'region',
            depth: 3,
            itemCount: regDescendants.size,
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
          depth: 2,
          itemCount: layerDescendants.size,
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
        depth: 1,
        itemCount: systemDescendants.size,
        descendantIds: Array.from(systemDescendants),
        children: sublayerNodes,
        systemId: sysId,
      });
      continue;
    }

    // Demais sistemas: Sistema -> Região Craniocaudal -> Sub-região (De Fora Para Dentro) -> Folhas (De Fora Para Dentro)
    const regionNodes: TaxonomicTreeNode[] = [];
    const sortedRegions = Array.from(regionMap.keys()).sort((a, b) => {
      const orderA = REGION_METADATA[a]?.order ?? 99;
      const orderB = REGION_METADATA[b]?.order ?? 99;
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

      for (const [subKey, rawItems] of subEntries) {
        const items = sortItemsOutsideToInside(rawItems);
        const leafNodes: TaxonomicTreeNode[] = items.map((item) =>
          createLeafNode(item, sysId, regId, subKey === '__geral__' ? 3 : 4)
        );

        const subDescendants = new Set<string>();
        for (const leaf of leafNodes) {
          for (const id of leaf.descendantIds) {
            subDescendants.add(id);
            regionDescendants.add(id);
          }
        }

        if (subKey !== '__geral__') {
          subNodes.push({
            id: `sub_${sysId}_${regId}_${subKey.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
            namePt: subKey,
            type: 'subregion',
            depth: 3,
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
        depth: 2,
        itemCount: regionDescendants.size,
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
      depth: 1,
      itemCount: systemDescendants.size,
      descendantIds: Array.from(systemDescendants),
      children: regionNodes,
      systemId: sysId,
    });
  }

  return tree;
}

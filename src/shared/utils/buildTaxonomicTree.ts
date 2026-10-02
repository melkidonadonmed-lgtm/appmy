import { ZAnatomyItem } from '../constants/zAnatomyCatalog.ts';
import { TaxonomicTreeNode } from '../types/taxonomicTree.ts';
import { SYSTEM_METADATA, REGION_METADATA } from '../constants/taxonomicMetadata.ts';

/**
 * Classifica um elemento anatômico em uma das 7 regiões corporais canônicas
 */
export function detectRegion(item: ZAnatomyItem): string {
  const pathStr = (item.path || []).join(' ').toLowerCase();
  const nameStr = `${item.node} ${item.nameEn || ''} ${item.namePtBr || ''}`.toLowerCase();
  const fullText = `${pathStr} ${nameStr}`;

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
    fullText.includes('palatine')
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
    fullText.includes('spinal cord')
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
    fullText.includes('pectoral')
  ) {
    return 'thorax';
  }

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
    fullText.includes('finger') ||
    fullText.includes('thumb')
  ) {
    return 'upper_limb';
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
    fullText.includes('testis')
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
    fullText.includes('calcaneus')
  ) {
    return 'lower_limb';
  }

  return 'systemic';
}

/**
 * Constrói a árvore hierárquica taxonômica completa em passagem única O(N),
 * pré-computando a lista de descendantIds de cada nó intermediário para
 * alternâncias de visibilidade instantâneas em O(1).
 */
export function buildTaxonomicTree(catalog: ZAnatomyItem[]): TaxonomicTreeNode[] {
  // Buckets: systemId -> regionId -> subregionKey -> items[]
  const systemBuckets = new Map<string, Map<string, Map<string, ZAnatomyItem[]>>>();

  for (const item of catalog) {
    const sysId = item.system || 'skeletal';
    const regId = detectRegion(item);
    const subKey = (item.path && item.path.length > 0) ? item.path[0] : '__geral__';

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

  // Ordena os sistemas pela ordem canônica médica
  const sortedSystems = Array.from(systemBuckets.keys()).sort((a, b) => {
    const orderA = SYSTEM_METADATA[a]?.order ?? 99;
    const orderB = SYSTEM_METADATA[b]?.order ?? 99;
    return orderA - orderB;
  });

  for (const sysId of sortedSystems) {
    const regionMap = systemBuckets.get(sysId)!;
    const regionNodes: TaxonomicTreeNode[] = [];
    const systemDescendants = new Set<string>();

    // Ordena as regiões de craniocaudal (cabeça aos pés)
    const sortedRegions = Array.from(regionMap.keys()).sort((a, b) => {
      const orderA = REGION_METADATA[a]?.order ?? 99;
      const orderB = REGION_METADATA[b]?.order ?? 99;
      return orderA - orderB;
    });

    for (const regId of sortedRegions) {
      const subMap = regionMap.get(regId)!;
      const subNodes: TaxonomicTreeNode[] = [];
      const regionDescendants = new Set<string>();

      for (const [subKey, items] of subMap.entries()) {
        const leafNodes: TaxonomicTreeNode[] = items.map((item) => {
          const ids = [item.id];
          if (item.node && item.node !== item.id) {
            ids.push(item.node);
          }
          return {
            id: item.id,
            namePt: item.namePtBr || item.nameEn || item.node,
            nameTA2: item.nameLatin,
            type: 'leaf',
            depth: subKey === '__geral__' ? 3 : 4,
            itemCount: 1,
            descendantIds: ids,
            meshName: item.node,
            systemId: sysId,
            regionId: regId,
            data: item,
          };
        });

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
    tree.push({
      id: `sys_${sysId}`,
      namePt: sysMeta?.labelPt || sysId,
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

import { AnatomicalNode, ClinicalReference } from '../types/anatomy.ts';
import { Z_ANATOMY_CATALOG, Z_ANATOMY_BY_ID } from '../constants/zAnatomyCatalog.ts';
import { CRANIUM_22_NODES } from '../constants/cranium.ts';
import { ALL_NEUROLOGY_NODES } from '../constants/neurology.ts';
import { CRANIAL_FORAMINA_14, CRANIAL_LANDMARKS_AND_FRACTURE_SIGNS } from '../constants/craniumStratigraphyForamina.ts';
import { BRODMANN_CORTICAL_REGIONS_12, VASCULAR_SYNDROMES_AND_WILLIS } from '../constants/brainClinicalCatalog.ts';
import { CRANIAL_NERVES_12 } from '../constants/cranialNervesCatalog.ts';
import { resolveNeuroClinicalTargetToCatalogId } from './neuroTargetMapper.ts';

function normalizeStr(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

interface KeywordClinicalRule {
  keywords: string[];
  nodeMatchId?: string;
  clinicalOverride?: ClinicalReference;
  ptNameOverride?: string;
}

const KEYWORD_ENRICHMENT_RULES: KeywordClinicalRule[] = [
  { keywords: ['frontal bone', 'os frontale', 'osso frontal'], nodeMatchId: 'fma:os_frontale' },
  { keywords: ['parietal bone', 'os parietale', 'osso parietal'], nodeMatchId: 'fma:os_parietale_dexter' },
  { keywords: ['occipital bone', 'os occipitale', 'osso occipital', 'foramen magnum'], nodeMatchId: 'fma:os_occipitale' },
  { keywords: ['temporal bone', 'os temporale', 'osso temporal', 'petrous', 'mastoid'], nodeMatchId: 'fma:os_temporale_dexter' },
  { keywords: ['sphenoid', 'esfenoide', 'sella turcica', 'optic canal'], nodeMatchId: 'fma:os_sphenoidale' },
  { keywords: ['ethmoid', 'etmoide', 'cribriform', 'crista galli'], nodeMatchId: 'fma:os_ethmoidale' },
  { keywords: ['maxilla', 'maxila'], nodeMatchId: 'fma:maxilla_dextra' },
  { keywords: ['zygomatic', 'zigomatico'], nodeMatchId: 'fma:os_zygomaticum_dexter' },
  { keywords: ['mandible', 'mandibula'], nodeMatchId: 'fma:mandibula' },
  { keywords: ['frontal lobe', 'lobus frontalis', 'precentral gyrus', 'broca', 'frontal pole'], nodeMatchId: 'fma:lobus_frontalis' },
  { keywords: ['parietal lobe', 'lobus parietalis', 'postcentral gyrus', 'supramarginal', 'angular gyrus'], nodeMatchId: 'fma:lobus_parietalis' },
  { keywords: ['temporal lobe', 'lobus temporalis', 'heschl', 'wernicke', 'superior temporal gyrus'], nodeMatchId: 'fma:lobus_temporalis' },
  { keywords: ['occipital lobe', 'lobus occipitalis', 'calcarine', 'cuneus'], nodeMatchId: 'fma:lobus_occipitalis' },
  { keywords: ['insula', 'insular'], nodeMatchId: 'fma:lobus_insulari' },
  { keywords: ['corpus callosum', 'corpo caloso', 'splenium', 'genu of corpus'], nodeMatchId: 'fma:corpus_callosum' },
  { keywords: ['fornix', 'septum pellucidum', 'septo pelucido'], nodeMatchId: 'fma:fornix' },
  { keywords: ['internal capsule', 'capsula interna', 'corona radiata'], nodeMatchId: 'fma:capsula_interna' },
  { keywords: ['caudate', 'putamen', 'globus pallidus', 'lentiform', 'striatum', 'substantia nigra', 'subthalamic'], nodeMatchId: 'fma:nuclei_basales' },
  { keywords: ['thalamus', 'talamo', 'geniculate', 'pulvinar'], nodeMatchId: 'fma:thalamus' },
  { keywords: ['hypothalamus', 'hipotalamo', 'mammillary', 'infundibulum', 'pituitary'], nodeMatchId: 'fma:hypothalamus' },
  { keywords: ['pineal', 'epithalamus', 'habenula'], nodeMatchId: 'fma:glandula_pinealis' },
  { keywords: ['hippocampus', 'hipocampo', 'amygdala', 'amigdala', 'parahippocampal', 'uncus', 'dentate gyrus'], nodeMatchId: 'fma:hippocampus_amygdala' },
  { keywords: ['dura mater', 'falx cerebri', 'tentorium', 'arachnoid', 'pia mater', 'mening'], nodeMatchId: 'fma:meninges_craniales' },
  { keywords: ['anterior cerebral artery', 'middle cerebral artery', 'posterior cerebral artery', 'basilar artery', 'circle of willis', 'communicating artery'], nodeMatchId: 'fma:circulus_arteriosus_cerebri' },
  { keywords: ['cerebellum', 'cerebelo', 'vermis', 'floccul', 'tonsil of cerebellum'], nodeMatchId: 'fma:cerebellum' },
  { keywords: ['midbrain', 'mesencephal', 'cerebral peduncle', 'colliculus'], nodeMatchId: 'fma:mesencephalon' },
  { keywords: ['pons', 'ponte', 'pontine'], nodeMatchId: 'fma:pons' },
  { keywords: ['medulla oblongata', 'bulbo', 'pyramid', 'olivary'], nodeMatchId: 'fma:medulla_oblongata' },
  { keywords: ['lateral ventricle', 'ventriculo lateral', 'choroid plexus'], nodeMatchId: 'fma:ventriculi_laterales' },
  { keywords: ['third ventricle', 'fourth ventricle', 'cerebral aqueduct', 'aqueduto'], nodeMatchId: 'fma:ventriculus_tertius_et_quartus' },
];

const CANONICAL_NODE_LOOKUP: Record<string, AnatomicalNode> = {};
for (const c of CRANIUM_22_NODES) {
  CANONICAL_NODE_LOOKUP[c.id] = c;
  CANONICAL_NODE_LOOKUP[c.meshName] = c;
}
for (const n of ALL_NEUROLOGY_NODES) {
  CANONICAL_NODE_LOOKUP[n.id] = n;
  CANONICAL_NODE_LOOKUP[n.meshName] = n;
}

/**
 * Resolve dados clínicos ricos para qualquer estrutura anatômica selecionada
 * (seja da Vista Didática ou do modelo .GLB Z-Anatomy).
 */
export function resolveRichClinicalData(
  itemOrName: { id?: string; namePtBr?: string; nameEn?: string; nameLatin?: string; path?: string[]; system?: string },
  fallbackClinical?: ClinicalReference
): ClinicalReference {
  if (itemOrName.id && CANONICAL_NODE_LOOKUP[itemOrName.id]?.clinicalData) {
    return CANONICAL_NODE_LOOKUP[itemOrName.id].clinicalData!;
  }

  const combined = normalizeStr(
    `${itemOrName.namePtBr || ''} ${itemOrName.nameEn || ''} ${itemOrName.nameLatin || ''} ${(itemOrName.path || []).join(' ')}`
  );

  // 1. Verifica correspondência direta com os 12 Pares de Nervos Cranianos
  for (const cn of CRANIAL_NERVES_12) {
    const cnNameNorm = normalizeStr(cn.namePtBr);
    const cnLatNorm = normalizeStr(cn.nameLatin.replace(/\(.*\)/, '').trim());
    if (
      (cnNameNorm.length > 5 && combined.includes(cnNameNorm)) ||
      (cnLatNorm.length > 5 && combined.includes(cnLatNorm))
    ) {
      return {
        origin: `Origem Real: ${cn.realOriginNuclei} | Origem Aparente: ${cn.apparentOriginBrain}`,
        insertion: `Passagem Craniana (Forame): ${cn.cranialForamenName}`,
        innervation: `${cn.romanNumeral} (${cn.modality}) — ${cn.fiberTypesDetail}`,
        functionalAction: `${cn.anatomicalFunction} | Exame Físico: ${cn.semiologyManeuver}`,
        clinicalSignificance: cn.clinicalPathology,
      };
    }
  }

  // 2. Verifica correspondência com as regras de palavras-chave do Crânio e Encéfalo
  for (const rule of KEYWORD_ENRICHMENT_RULES) {
    if (rule.keywords.some((kw) => combined.includes(normalizeStr(kw)))) {
      if (rule.clinicalOverride) return rule.clinicalOverride;
      if (rule.nodeMatchId && CANONICAL_NODE_LOOKUP[rule.nodeMatchId]?.clinicalData) {
        return CANONICAL_NODE_LOOKUP[rule.nodeMatchId].clinicalData!;
      }
    }
  }

  return (
    fallbackClinical || {
      origin: (itemOrName.path || []).join(' > ') || 'Plano anatômico catalogado',
      insertion: `Estrutura integrante do sistema ${itemOrName.system || 'anatômico'}`,
      clinicalSignificance: `Peça anatômica real escaneada do catálogo médico Z-Anatomy (Terminologia Anatomica TA2: ${itemOrName.nameLatin || itemOrName.namePtBr}).`,
    }
  );
}

/**
 * Encontra o melhor nó correspondente no catálogo Z-Anatomy (.GLB) ou nos catálogos didáticos
 * para focar no visualizador 3D quando o usuário aciona "Focar no 3D" em um Forame, Nervo ou Caso Clínico.
 */
export function resolveBest3DTargetForCanonicalIds(
  targetNodeIds: string[],
  viewType: 'realistic' | 'exploded' = 'realistic'
): { nodeId: string; node: AnatomicalNode; systemToActivate?: string; regionToActivate?: string } | null {
  if (!targetNodeIds || targetNodeIds.length === 0) return null;

  for (const targetId of targetNodeIds) {
    const canonical = CANONICAL_NODE_LOOKUP[targetId];

    if (viewType === 'exploded' && canonical) {
      const isNervous = canonical.chapter === 4;
      return {
        nodeId: canonical.id,
        node: canonical,
        systemToActivate: isNervous ? 'nervous' : 'skeletal',
        regionToActivate: 'cranium',
      };
    }

    // 1. Verifica mapeamento direto FMA -> Z-Anatomy .GLB (`za:*`)
    const mappedZaId = resolveNeuroClinicalTargetToCatalogId(targetId);
    const directZa = Z_ANATOMY_BY_ID[mappedZaId];
    if (directZa) {
      return {
        nodeId: directZa.id,
        node: {
          ...(canonical || {
            id: directZa.id,
            namePtBr: directZa.namePtBr,
            nameLatin: directZa.nameLatin,
            chapter: directZa.chapter,
            systemName: directZa.system,
            meshName: directZa.node,
            clinicalData: resolveRichClinicalData(directZa),
          }),
          id: directZa.id,
          meshName: directZa.node,
          explosionVector: directZa.explosionVector,
        },
        systemToActivate: directZa.system,
        regionToActivate: 'cranium',
      };
    }

    if (!canonical) continue;

    const isNervous = canonical.chapter === 4;
    const systemToActivate = isNervous ? 'nervous' : 'skeletal';

    // 2. Fallback por palavras-chave no Z_ANATOMY_CATALOG
    const searchKeywords = [
      canonical.nameLatin.split('(')[0].trim(),
      canonical.namePtBr.split('(')[0].trim(),
    ].map(normalizeStr);

    const matchedZa = Z_ANATOMY_CATALOG.find((za) => {
      const zaLat = normalizeStr(za.nameLatin);
      const zaEn = normalizeStr(za.nameEn);
      const zaPt = normalizeStr(za.namePtBr);
      return searchKeywords.some(
        (kw) => kw.length >= 4 && (zaLat.includes(kw) || zaEn.includes(kw) || zaPt.includes(kw))
      );
    });

    if (matchedZa) {
      return {
        nodeId: matchedZa.id,
        node: {
          ...canonical,
          id: matchedZa.id,
          meshName: matchedZa.node,
          explosionVector: matchedZa.explosionVector,
        },
        systemToActivate: matchedZa.system,
        regionToActivate: 'cranium',
      };
    }

    return {
      nodeId: canonical.id,
      node: canonical,
      systemToActivate,
      regionToActivate: 'cranium',
    };
  }

  return null;
}

export interface ClinicalQuickSearchItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  studioTab: 'foramina' | 'brain' | 'nerves' | 'neuroimaging' | 'cases';
  targetNodeIds: string[];
}

/**
 * Busca rápida em Forames, Pares Cranianos, Áreas de Brodmann, Marcos Craniométricos e Síndromes Vasculares
 * para alimentar a GlobalSearchBox (Ctrl+K).
 */
export function searchNeuroClinicalEntities(rawQuery: string, limit = 5): ClinicalQuickSearchItem[] {
  const q = normalizeStr(rawQuery.trim());
  if (!q || q.length < 2) return [];

  const results: ClinicalQuickSearchItem[] = [];

  for (const f of CRANIAL_FORAMINA_14) {
    const text = normalizeStr(
      `${f.namePtBr} ${f.nameLatin} ${f.fossa} ${f.clinicalSyndrome.name} ${f.structuresPassing.nerves.join(' ')}`
    );
    if (text.includes(q)) {
      results.push({
        id: f.id,
        title: f.namePtBr,
        subtitle: `${f.fossa} • ${f.clinicalSyndrome.name}`,
        badge: 'Forame Base',
        studioTab: 'foramina',
        targetNodeIds: f.targetNodeIds,
      });
      if (results.length >= limit) return results;
    }
  }

  for (const cn of CRANIAL_NERVES_12) {
    const text = normalizeStr(
      `${cn.romanNumeral} ${cn.namePtBr} ${cn.nameLatin} ${cn.cranialForamenName} ${cn.clinicalPathology}`
    );
    if (text.includes(q)) {
      results.push({
        id: cn.id,
        title: `${cn.romanNumeral} — ${cn.namePtBr}`,
        subtitle: `${cn.modality} • ${cn.cranialForamenName}`,
        badge: 'Par Craniano',
        studioTab: 'nerves',
        targetNodeIds: cn.targetNodeIds,
      });
      if (results.length >= limit) return results;
    }
  }

  for (const ba of BRODMANN_CORTICAL_REGIONS_12) {
    const text = normalizeStr(
      `${ba.gyrusOrRegion} ${ba.brodmannAreas} ${ba.lobe} ${ba.clinicalLesionSyndrome}`
    );
    if (text.includes(q)) {
      results.push({
        id: ba.id,
        title: `${ba.brodmannAreas} — ${ba.gyrusOrRegion}`,
        subtitle: `Lobo ${ba.lobe} • ${ba.vascularSupply}`,
        badge: 'Brodmann',
        studioTab: 'brain',
        targetNodeIds: ba.targetNodeIds,
      });
      if (results.length >= limit) return results;
    }
  }

  for (const lm of CRANIAL_LANDMARKS_AND_FRACTURE_SIGNS) {
    const text = normalizeStr(`${lm.namePtBr} ${lm.nameLatin} ${lm.clinicalAndSurgicalRelevance}`);
    if (text.includes(q)) {
      results.push({
        id: lm.id,
        title: lm.namePtBr,
        subtitle: lm.anatomicalLocation,
        badge: 'Marco Crânio',
        studioTab: 'foramina',
        targetNodeIds: lm.targetNodeIds,
      });
      if (results.length >= limit) return results;
    }
  }

  for (const vs of VASCULAR_SYNDROMES_AND_WILLIS) {
    const text = normalizeStr(
      `${vs.arteryName} ${vs.nameLatin} ${vs.clinicalOutput.motorDeficit} ${vs.clinicalOutput.corticalOrCranialSigns.join(' ')}`
    );
    if (text.includes(q)) {
      results.push({
        id: vs.id,
        title: vs.arteryName,
        subtitle: vs.circulationSystem,
        badge: 'Vascular / AVC',
        studioTab: 'brain',
        targetNodeIds: vs.targetNodeIds,
      });
      if (results.length >= limit) return results;
    }
  }

  return results;
}

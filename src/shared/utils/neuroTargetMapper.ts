import { Z_ANATOMY_BY_ID } from '../constants/zAnatomyCatalog.ts';

/**
 * Mapeamento determinístico bidirecional entre os identificadores clínicos/didáticos (FMA / TA2)
 * do Estúdio Neuroclínico e os identificadores reais de malhas .GLB do Z-Anatomy (`za:*`).
 * Permite que todos os botões de foco 3D da Neuroanatomia funcionem tanto no Modo Real (.GLB)
 * quanto no Modo Esquema Didático Explosivo.
 */
export const FMA_TO_Z_ANATOMY_MAP: Record<string, string[]> = {
  // Neurocrânio e Viscerocrânio (22 ossos)
  'fma:os_frontale': ['za:frontal_bone', 'za:sinus_of_frontal_bone'],
  'fma:os_parietale_dextrum': ['za:parietal_bone_r'],
  'fma:os_parietale_dexter': ['za:parietal_bone_r'],
  'fma:os_parietale_sinistrum': ['za:parietal_bone_l'],
  'fma:os_parietale_sinister': ['za:parietal_bone_l'],
  'fma:os_temporale_dextrum': ['za:temporal_bone_r'],
  'fma:os_temporale_dexter': ['za:temporal_bone_r'],
  'fma:os_temporale_sinistrum': ['za:temporal_bone_l'],
  'fma:os_temporale_sinister': ['za:temporal_bone_l'],
  'fma:os_occipitale': ['za:occipital_bone'],
  'fma:os_sphenoidale': ['za:sphenoid_bone', 'za:sinus_of_sphenoid_bone'],
  'fma:os_ethmoidale': [
    'za:anterior_cells_of_ethmoid_bone_l',
    'za:anterior_cells_of_ethmoid_bone_r',
    'za:middle_cells_of_ethmoid_bone_l',
  ],
  'fma:maxilla_dextra': ['za:maxilla_r'],
  'fma:maxilla_sinistra': ['za:maxilla_l'],
  'fma:os_zygomaticum_dextrum': ['za:zygomatic_bone_r'],
  'fma:os_zygomaticum_dexter': ['za:zygomatic_bone_r'],
  'fma:os_zygomaticum_sinistrum': ['za:zygomatic_bone_l'],
  'fma:os_zygomaticum_sinister': ['za:zygomatic_bone_l'],
  'fma:os_nasale_dextrum': ['za:nasal_bone_r'],
  'fma:os_nasale_dexter': ['za:nasal_bone_r'],
  'fma:os_nasale_sinistrum': ['za:nasal_bone_l'],
  'fma:os_nasale_sinister': ['za:nasal_bone_l'],
  'fma:os_lacrimale_dextrum': ['za:ampulla_of_lacrimal_canaliculus_r', 'za:maxilla_r'],
  'fma:os_lacrimale_dexter': ['za:ampulla_of_lacrimal_canaliculus_r', 'za:maxilla_r'],
  'fma:os_lacrimale_sinistrum': ['za:ampulla_of_lacrimal_canaliculus_l', 'za:maxilla_l'],
  'fma:os_lacrimale_sinister': ['za:ampulla_of_lacrimal_canaliculus_l', 'za:maxilla_l'],
  'fma:os_palatinum_dextrum': ['za:palatine_bone_r'],
  'fma:os_palatinum_dexter': ['za:palatine_bone_r'],
  'fma:os_palatinum_sinistrum': ['za:palatine_bone_l'],
  'fma:os_palatinum_sinister': ['za:palatine_bone_l'],
  'fma:concha_nasalis_inferior_dextra': ['za:inferior_nasal_concha_bone_r'],
  'fma:concha_nasalis_inferior_sinistra': ['za:inferior_nasal_concha_bone_l'],
  'fma:vomer': ['za:vomer'],
  'fma:mandibula': ['za:mandible'],

  // Telencéfalo e Lobos Cerebrais (Áreas de Brodmann)
  'fma:lobus_frontalis': [
    'za:precentral_gyrus_l',
    'za:superior_frontal_gyrus_l',
    'za:middle_frontal_gyrus_l',
    'za:precentral_gyrus_r',
  ],
  'fma:lobus_parietalis': [
    'za:postcentral_gyrus_l',
    'za:superior_parietal_lobule_l',
    'za:angular_gyrus_l',
    'za:postcentral_gyrus_r',
  ],
  'fma:lobus_temporalis': [
    'za:middle_temporal_gyrus_l',
    'za:inferior_temporal_gyrus_l',
    'za:lateral_occipitotemporal_gyrus_l',
    'za:middle_temporal_gyrus_r',
  ],
  'fma:lobus_occipitalis': [
    'za:lateral_occipital_gyrus_middle_occipital_gyrus_l',
    'za:inferior_occipital_gyrus_and_sulcus_l',
    'za:lateral_occipital_gyrus_middle_occipital_gyrus_r',
  ],
  'fma:lobus_insularis': [
    'za:insula_subcentral_gyrus_and_ant_and_post_sulci_l',
    'za:circular_sulcus_of_insula_l',
    'za:insula_subcentral_gyrus_and_ant_and_post_sulci_r',
  ],
  'fma:lobus_insulari': [
    'za:insula_subcentral_gyrus_and_ant_and_post_sulci_l',
    'za:circular_sulcus_of_insula_l',
    'za:insula_subcentral_gyrus_and_ant_and_post_sulci_r',
  ],

  // Comissuras, Cápsula Interna, Núcleos da Base, Diencéfalo e Sistema Límbico
  'fma:corpus_callosum': ['za:corpus_callosum'],
  'fma:fornix': ['za:fornix_l', 'za:fornix_r'],
  'fma:corpus_callosum_fornix': ['za:corpus_callosum', 'za:fornix_l', 'za:fornix_r'],
  'fma:capsula_interna': ['za:caudate_nucleus_l', 'za:putamen_l', 'za:thalamus_l'],
  'fma:nuclei_basales': [
    'za:putamen_l',
    'za:caudate_nucleus_l',
    'za:globus_pallidus_l',
    'za:putamen_r',
  ],
  'fma:thalamus': ['za:thalamus_l', 'za:thalamus_r'],
  'fma:thalamus_et_nuclei_basales': [
    'za:thalamus_l',
    'za:thalamus_r',
    'za:caudate_nucleus_l',
    'za:putamen_l',
  ],
  'fma:hypothalamus': ['za:hypothalamus'],
  'fma:glandula_pinealis': ['za:pineal_gland'],
  'fma:hypothalamus_pituitary_pineal': [
    'za:hypothalamus',
    'za:pineal_gland',
    'za:stria_medullaris_thalami_l',
  ],
  'fma:hippocampus_amygdala': [
    'za:hippocampus_l',
    'za:hippocampus_r',
    'za:fornix_l',
    'za:hippocampal_commissure',
  ],
  'fma:hippocampus_limbic': [
    'za:hippocampus_l',
    'za:hippocampus_r',
    'za:fornix_l',
    'za:hippocampal_commissure',
  ],

  // Tronco Encefálico e Cerebelo
  'fma:truncus_encephali': ['za:pons_l', 'za:midbrain_l', 'za:medulla_oblongata_l'],
  'fma:mesencephalon': ['za:midbrain_l', 'za:midbrain_r', 'za:aqueduct_of_midbrain'],
  'fma:pons': ['za:pons_l', 'za:pons_r'],
  'fma:medulla_oblongata': [
    'za:medulla_oblongata_l',
    'za:medulla_oblongata_r',
    'za:pyramid_of_medulla_oblongata_l',
  ],
  'fma:cerebellum': [
    'za:tonsil_of_cerebellum_l',
    'za:tonsil_of_cerebellum_r',
    'za:lingula_of_cerebellum',
    'za:folium_of_vermis',
    'za:pyramis_of_vermis',
  ],

  // Sistema Ventricular, Meninges, Vascularização e Nervos Cranianos
  'fma:ventriculi_encephali': [
    'za:lateral_ventricle_l',
    'za:third_ventricle',
    'za:fourth_ventricle',
  ],
  'fma:ventriculi_laterales': [
    'za:lateral_ventricle_l',
    'za:lateral_ventricle_r',
    'za:choroid_plexus_l',
  ],
  'fma:ventriculus_tertius_et_quartus': [
    'za:third_ventricle',
    'za:fourth_ventricle',
    'za:aqueduct_of_midbrain',
  ],
  'fma:meninges_craniales': [
    'za:falx_cerebri',
    'za:tentorium_cerebelli_l',
    'za:tentorium_cerebelli_r',
  ],
  'fma:meninges_dura_mater': [
    'za:falx_cerebri',
    'za:tentorium_cerebelli_l',
    'za:tentorium_cerebelli_r',
  ],
  'fma:circulus_arteriosus_cerebri': [
    'za:basilar_artery',
    'za:middle_cerebral_artery_m1_segment_l',
    'za:anterior_cerebral_artery_l',
    'za:internal_carotid_artery_l',
  ],
  'fma:nervi_craniales_i_xii': [
    'za:trigeminal_nerve_v_l',
    'za:optic_nerve_ii_l',
    'za:oculomotor_nerve_iii_l',
    'za:facial_nerve_vii_l',
    'za:vagus_nerve_x_l',
  ],
};

/**
 * Mapeamento direto de cada um dos 12 Pares de Nervos Cranianos (I a XII)
 * para suas malhas 3D autênticas no catálogo Z-Anatomy (`nervous_male.glb`).
 */
export const CRANIAL_NERVE_TO_Z_ANATOMY_MAP: Record<string, string[]> = {
  cn_i: ['za:olfactory_nerve_i_l', 'za:olfactory_nerve_i_r'],
  cn_ii: ['za:optic_nerve_ii_l', 'za:optic_nerve_ii_r', 'za:optic_chiasm_l'],
  cn_iii: ['za:oculomotor_nerve_iii_l', 'za:oculomotor_nerve_iii_r'],
  cn_iv: ['za:trochlear_nerve_iv_l', 'za:trochlear_nerve_iv_r'],
  cn_v: [
    'za:trigeminal_nerve_v_l',
    'za:trigeminal_nerve_v_r',
    'za:sensory_root_of_trigeminal_nerve_l',
  ],
  cn_vi: ['za:abducens_nerve_vi_l', 'za:abducens_nerve_vi_r'],
  cn_vii: ['za:facial_nerve_vii_l', 'za:facial_nerve_vii_r'],
  cn_viii: ['za:vestibulocochlear_nerve_viii_l', 'za:vestibulocochlear_nerve_viii_r'],
  cn_ix: ['za:glossopharyngeal_nerve_ix_l', 'za:glossopharyngeal_nerve_ix_r'],
  cn_x: ['za:vagus_nerve_x_l', 'za:vagus_nerve_x_r'],
  cn_xi: ['za:accessory_nerve_xi_l', 'za:accessory_nerve_xi_r'],
  cn_xii: ['za:hypoglossal_nerve_xii_l', 'za:hypoglossal_nerve_xii_r'],
  'fma:50863': ['za:olfactory_nerve_i_l', 'za:olfactory_nerve_i_r'],
  'fma:50864': ['za:optic_nerve_ii_l', 'za:optic_nerve_ii_r', 'za:optic_chiasm_l'],
  'fma:50865': ['za:oculomotor_nerve_iii_l', 'za:oculomotor_nerve_iii_r'],
  'fma:50866': ['za:trochlear_nerve_iv_l', 'za:trochlear_nerve_iv_r'],
  'fma:50867': ['za:trigeminal_nerve_v_l', 'za:trigeminal_nerve_v_r'],
  'fma:50868': ['za:abducens_nerve_vi_l', 'za:abducens_nerve_vi_r'],
  'fma:50869': ['za:facial_nerve_vii_l', 'za:facial_nerve_vii_r'],
  'fma:50870': ['za:vestibulocochlear_nerve_viii_l', 'za:vestibulocochlear_nerve_viii_r'],
  'fma:50871': ['za:glossopharyngeal_nerve_ix_l', 'za:glossopharyngeal_nerve_ix_r'],
  'fma:50872': ['za:vagus_nerve_x_l', 'za:vagus_nerve_x_r'],
  'fma:50873': ['za:accessory_nerve_xi_l', 'za:accessory_nerve_xi_r'],
  'fma:50874': ['za:hypoglossal_nerve_xii_l', 'za:hypoglossal_nerve_xii_r'],
};

/**
 * Verifica se o ID alvo corresponde a uma estrutura intracraniana/encefálica,
 * exigindo atenuação translúcida da calota craniana no modo .GLB para visualização direta.
 */
export function isIntracranialBrainTarget(targetId: string): boolean {
  if (!targetId) return false;
  const lower = targetId.toLowerCase();
  if (
    lower.startsWith('cn_') ||
    Boolean(CRANIAL_NERVE_TO_Z_ANATOMY_MAP[lower]) ||
    lower.includes('lobus') ||
    lower.includes('gyrus') ||
    lower.includes('lobule') ||
    lower.includes('corpus_callosum') ||
    lower.includes('fornix') ||
    lower.includes('capsula') ||
    lower.includes('nuclei') ||
    lower.includes('caudate') ||
    lower.includes('putamen') ||
    lower.includes('pallidus') ||
    lower.includes('thalamus') ||
    lower.includes('hypothalamus') ||
    lower.includes('pineal') ||
    lower.includes('hippocampus') ||
    lower.includes('meninges') ||
    lower.includes('falx') ||
    lower.includes('tentorium') ||
    lower.includes('circulus') ||
    lower.includes('cerebral_artery') ||
    lower.includes('basilar') ||
    lower.includes('nervi') ||
    lower.includes('nerve') ||
    lower.includes('cerebell') ||
    lower.includes('vermis') ||
    lower.includes('truncus') ||
    lower.includes('mesencephalon') ||
    lower.includes('midbrain') ||
    lower.includes('pons') ||
    lower.includes('medulla') ||
    lower.includes('ventricul') ||
    lower.includes('choroid') ||
    lower.includes('insula')
  ) {
    return true;
  }
  return false;
}

function getCranialNerveCatalogIds(cranialNerveId?: string): string[] | null {
  if (!cranialNerveId) return null;
  if (CRANIAL_NERVE_TO_Z_ANATOMY_MAP[cranialNerveId]) {
    return CRANIAL_NERVE_TO_Z_ANATOMY_MAP[cranialNerveId];
  }
  const lower = cranialNerveId.toLowerCase();
  if (CRANIAL_NERVE_TO_Z_ANATOMY_MAP[lower]) {
    return CRANIAL_NERVE_TO_Z_ANATOMY_MAP[lower];
  }
  const orderedKeys = [
    'cn_xii',
    'cn_xi',
    'cn_x',
    'cn_ix',
    'cn_viii',
    'cn_vii',
    'cn_vi',
    'cn_v',
    'cn_iv',
    'cn_iii',
    'cn_ii',
    'cn_i',
  ];
  for (const key of orderedKeys) {
    if (lower === key || lower.startsWith(`${key}_`)) {
      return CRANIAL_NERVE_TO_Z_ANATOMY_MAP[key];
    }
  }
  return null;
}

/**
 * Resolve um identificador clínico/didático (`fma:*` ou `cn_*`) para o identificador
 * canônico `za:*` existente em `Z_ANATOMY_CATALOG`.
 */
export function resolveNeuroClinicalTargetToCatalogId(
  targetId: string,
  cranialNerveId?: string
): string {
  const cnCandidates = getCranialNerveCatalogIds(cranialNerveId || targetId);
  if (cnCandidates) {
    const valid = cnCandidates.find((id) => Boolean(Z_ANATOMY_BY_ID[id]));
    if (valid) return valid;
  }

  if (Z_ANATOMY_BY_ID[targetId]) {
    return targetId;
  }

  const mapped = FMA_TO_Z_ANATOMY_MAP[targetId];
  if (mapped && mapped.length > 0) {
    const valid = mapped.find((id) => Boolean(Z_ANATOMY_BY_ID[id]));
    return valid || mapped[0];
  }

  return targetId;
}

/**
 * Expande um ID ou lista de IDs clínicos/didáticos em todos os seus equivalentes `za:*` e `fma:*`.
 */
export function resolveNeuroClinicalTargetAliases(
  targetIds: string | string[],
  cranialNerveId?: string
): string[] {
  const list = Array.isArray(targetIds) ? targetIds : [targetIds];
  const result = new Set<string>();
  const cnCandidates = getCranialNerveCatalogIds(cranialNerveId);
  if (cnCandidates) {
    for (const id of cnCandidates) {
      result.add(id);
    }
  }
  for (const rawId of list) {
    result.add(rawId);
    const mapped = FMA_TO_Z_ANATOMY_MAP[rawId] || getCranialNerveCatalogIds(rawId);
    if (mapped) {
      for (const zId of mapped) {
        result.add(zId);
      }
    }
  }
  return Array.from(result);
}

/**
 * Resolve inversamente um identificador `za:*` (ou `cn_*`) para o identificador
 * didático `fma:*` usado em `NeurologyScene` e `CraniumScene`.
 */
export function resolveCatalogIdToDidacticId(targetId: string): string {
  if (!targetId) return targetId;
  if (targetId.startsWith('fma:')) return targetId;
  if (getCranialNerveCatalogIds(targetId)) {
    return 'fma:nervi_craniales_i_xii';
  }
  for (const [fmaId, zaList] of Object.entries(FMA_TO_Z_ANATOMY_MAP)) {
    if (zaList.includes(targetId)) {
      return fmaId;
    }
  }
  for (const [, zaList] of Object.entries(CRANIAL_NERVE_TO_Z_ANATOMY_MAP)) {
    if (zaList.includes(targetId)) {
      return 'fma:nervi_craniales_i_xii';
    }
  }
  return targetId;
}

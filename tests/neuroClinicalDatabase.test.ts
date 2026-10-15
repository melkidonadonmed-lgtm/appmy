import { describe, it, expect } from 'vitest';
import {
  MONRO_KELLIE_PRINCIPLE,
  CRANIAL_STRATIGRAPHY_LAYERS,
  CRANIAL_LANDMARKS_AND_FRACTURE_SIGNS,
  CRANIAL_FORAMINA_14,
} from '../src/shared/constants/craniumStratigraphyForamina.ts';
import {
  BRODMANN_CORTICAL_REGIONS_12,
  SUBCORTICAL_AND_POSTERIOR_FOSSA_STRUCTURES,
  WHITE_MATTER_FIBERS,
  GLIAL_CELLS_CATALOG,
  CSF_VENTRICULAR_FLOW_STEPS,
  VASCULAR_SYNDROMES_AND_WILLIS,
} from '../src/shared/constants/brainClinicalCatalog.ts';
import { CRANIAL_NERVES_12 } from '../src/shared/constants/cranialNervesCatalog.ts';
import {
  HOUNSFIELD_SCALE_ENTRIES,
  INTRACRANIAL_HEMORRHAGES_MATRIX,
  EARLY_MCA_ISCHEMIA_SIGNS,
  ASPECTS_10_REGIONS,
  HERNIATION_RED_FLAGS,
  CLINICAL_SIMULATION_CASES,
  calculateAspectsScore,
} from '../src/shared/constants/neuroimagingCasesCatalog.ts';
import {
  NEUROLOGY_NODES,
  DEEP_NEUROANATOMY_NODES,
  ALL_NEUROLOGY_NODES,
} from '../src/shared/constants/neurology.ts';
import {
  resolveRichClinicalData,
  resolveBest3DTargetForCanonicalIds,
  searchNeuroClinicalEntities,
} from '../src/shared/utils/clinicalEnrichment.ts';
import { Z_ANATOMY_CATALOG } from '../src/shared/constants/zAnatomyCatalog.ts';

describe('Neuroclinical Knowledge Base & Parameterized Catalogs', () => {
  it('validates Monro-Kellie, 14 Stratigraphic layers (SCALP/Calvaria/Meninges), Landmarks, and 14 Cranial Base Foramina', () => {
    expect(MONRO_KELLIE_PRINCIPLE).toContain('80%');
    expect(CRANIAL_STRATIGRAPHY_LAYERS).toHaveLength(14);
    expect(CRANIAL_STRATIGRAPHY_LAYERS.filter((s) => s.group === 'scalp')).toHaveLength(5);
    expect(CRANIAL_STRATIGRAPHY_LAYERS.filter((s) => s.group === 'calvaria')).toHaveLength(3);
    expect(CRANIAL_STRATIGRAPHY_LAYERS.filter((s) => s.group === 'meninges_spaces')).toHaveLength(6);

    expect(CRANIAL_LANDMARKS_AND_FRACTURE_SIGNS.length).toBeGreaterThanOrEqual(10);
    expect(CRANIAL_FORAMINA_14).toHaveLength(14);

    const fossae = new Set(CRANIAL_FORAMINA_14.map((f) => f.fossa));
    expect(fossae.has('Fossa Craniana Anterior')).toBe(true);
    expect(fossae.has('Fossa Craniana Média')).toBe(true);
    expect(fossae.has('Fossa Craniana Posterior')).toBe(true);

    for (const foramen of CRANIAL_FORAMINA_14) {
      const totalPassing =
        foramen.structuresPassing.nerves.length + foramen.structuresPassing.vessels.length;
      expect(totalPassing).toBeGreaterThan(0);
      expect(foramen.targetNodeIds.length).toBeGreaterThan(0);
    }
  });

  it('validates 12 Brodmann cortical regions, Subcortical nuclei, White matter, Glia, CSF flow, and Circle of Willis', () => {
    expect(BRODMANN_CORTICAL_REGIONS_12).toHaveLength(12);
    expect(SUBCORTICAL_AND_POSTERIOR_FOSSA_STRUCTURES).toHaveLength(5);
    expect(WHITE_MATTER_FIBERS).toHaveLength(3);
    expect(GLIAL_CELLS_CATALOG).toHaveLength(4);
    expect(CSF_VENTRICULAR_FLOW_STEPS).toHaveLength(5);
    expect(VASCULAR_SYNDROMES_AND_WILLIS).toHaveLength(5);

    const broca = BRODMANN_CORTICAL_REGIONS_12.find((b) => b.id === 'ba_44_45_broca');
    expect(broca?.brodmannAreas).toContain('44');
    expect(broca?.clinicalLesionSyndrome).toContain('Broca');
  });

  it('validates all 12 Cranial Nerves (NC I to NC XII) and semiology differentials', () => {
    expect(CRANIAL_NERVES_12).toHaveLength(12);
    expect(CRANIAL_NERVES_12[0].romanNumeral).toBe('NC I');
    expect(CRANIAL_NERVES_12[11].romanNumeral).toBe('NC XII');

    for (const cn of CRANIAL_NERVES_12) {
      expect(cn.realOriginNuclei.length).toBeGreaterThan(5);
      expect(cn.apparentOriginBrain.length).toBeGreaterThan(5);
      expect(cn.cranialForamenName.length).toBeGreaterThan(3);
      expect(cn.semiologyManeuver.length).toBeGreaterThan(10);
      expect(cn.clinicalPathology.length).toBeGreaterThan(10);
    }

    const cn7 = CRANIAL_NERVES_12.find((c) => c.number === 7);
    expect(cn7?.specialClinicalDifferentiation).toBeDefined();
  });

  it('validates Neuroimaging catalog, 10 ASPECTS regions, and deterministic calculateAspectsScore()', () => {
    expect(HOUNSFIELD_SCALE_ENTRIES).toHaveLength(7);
    expect(INTRACRANIAL_HEMORRHAGES_MATRIX).toHaveLength(4);
    expect(EARLY_MCA_ISCHEMIA_SIGNS).toHaveLength(4);
    expect(ASPECTS_10_REGIONS).toHaveLength(10);
    expect(HERNIATION_RED_FLAGS).toHaveLength(2);
    expect(CLINICAL_SIMULATION_CASES).toHaveLength(3);

    const ganglionic = ASPECTS_10_REGIONS.filter((r) => r.level.startsWith('Ganglionar'));
    const supraganglionic = ASPECTS_10_REGIONS.filter((r) => r.level.startsWith('Supraganglionar'));
    expect(ganglionic).toHaveLength(7);
    expect(supraganglionic).toHaveLength(3);

    const normalEval = calculateAspectsScore([]);
    expect(normalEval.totalScore).toBe(10);
    expect(normalEval.isFavorableForThrombectomy).toBe(true);

    const moderateEval = calculateAspectsScore(['I', 'L', 'M1', 'M2']);
    expect(moderateEval.totalScore).toBe(6);
    expect(moderateEval.isFavorableForThrombectomy).toBe(true);

    // Deduplication check + extensive stroke (< 6)
    const severeEval = calculateAspectsScore(['C', 'L', 'IC', 'I', 'M1', 'M2', 'M2']);
    expect(severeEval.totalScore).toBe(4);
    expect(severeEval.isFavorableForThrombectomy).toBe(false);
  });

  it('validates expanded 3D Neurology nodes (10 base + 12 deep = 22 total) and clinical enrichment utilities', () => {
    expect(NEUROLOGY_NODES).toHaveLength(10);
    expect(DEEP_NEUROANATOMY_NODES).toHaveLength(12);
    expect(ALL_NEUROLOGY_NODES).toHaveLength(22);

    const sampleItem = Z_ANATOMY_CATALOG[0];
    const enriched = resolveRichClinicalData(sampleItem);
    expect(enriched.clinicalSignificance.length).toBeGreaterThan(15);

    const resolvedTarget = resolveBest3DTargetForCanonicalIds(['fma:os_sphenoidale']);
    expect(resolvedTarget).toBeTruthy();

    const searchHits = searchNeuroClinicalEntities('Forame Magno');
    expect(searchHits.length).toBeGreaterThan(0);
    expect(searchHits[0].studioTab).toBe('foramina');
  });
});

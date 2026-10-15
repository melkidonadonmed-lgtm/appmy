/**
 * Contratos tipados para a Base de Conhecimento Neuroanatômico, Cranioencefálico,
 * Neuroimagem (TC/ASPECTS), 12 Pares Cranianos e Simulador Topográfico de Casos Clínicos.
 */

export type StratigraphyGroup = 'scalp' | 'calvaria' | 'meninges_spaces';

export interface StratigraphyLayerEntry {
  id: string;
  group: StratigraphyGroup;
  orderOuterToInner: number;
  codeOrMnemonic?: string;
  namePtBr: string;
  nameLatin: string;
  biomechanicalAndVascularFeatures: string;
  clinicalCorrelation: string;
  targetNodeIds: string[];
}

export interface CranialLandmarkEntry {
  id: string;
  namePtBr: string;
  nameLatin: string;
  category: 'suture' | 'craniometric_point' | 'bone_feature' | 'base_fracture_sign';
  anatomicalLocation: string;
  clinicalAndSurgicalRelevance: string;
  targetNodeIds: string[];
}

export type CranialFossaType =
  | 'Fossa Craniana Anterior'
  | 'Fossa Craniana Média'
  | 'Fossa Craniana Posterior'
  | 'Exocraniano';

export interface CranialForamenEntry {
  id: string;
  namePtBr: string;
  nameLatin: string;
  fossa: CranialFossaType;
  bones: string[];
  structuresPassing: {
    nerves: string[];
    vessels: string[];
  };
  clinicalSyndrome: {
    name: string;
    signs: string[];
  };
  targetNodeIds: string[];
}

export interface WhiteMatterFiberEntry {
  id: string;
  category: 'Associacao' | 'Comissural' | 'Projecao';
  namePtBr: string;
  nameLatin: string;
  mainTractsAndSubdivisions: string[];
  connectedRegions: string;
  clinicalLesionSyndrome: string;
  targetNodeIds: string[];
}

export interface GlialCellEntry {
  id: string;
  namePtBr: string;
  embryologicalOrigin: string;
  physiologicalRole: string;
  clinicalCorrelation: string;
}

export interface BrodmannRegionEntry {
  id: string;
  lobe: 'Frontal' | 'Parietal' | 'Temporal' | 'Occipital' | 'Ínsula';
  gyrusOrRegion: string;
  nameLatin: string;
  brodmannAreas: string;
  primaryFunction: string;
  clinicalLesionSyndrome: string;
  vascularSupply: string;
  targetNodeIds: string[];
}

export interface SubcorticalStructureEntry {
  id: string;
  division: 'Nucleos da Base' | 'Diencefalo' | 'Tronco Encefalico' | 'Cerebelo';
  namePtBr: string;
  nameLatin: string;
  components: string[];
  physiology: string;
  clinicalSyndrome: string;
  targetNodeIds: string[];
}

export interface CsfFlowStepEntry {
  stepNumber: number;
  id: string;
  structureName: string;
  nameLatin: string;
  mechanismOrFlow: string;
  pathologyCorrelation: string;
  targetNodeIds: string[];
}

export interface VascularSyndromeEntry {
  id: string;
  arteryName: string;
  nameLatin: string;
  circulationSystem: 'Circulação Anterior (Carotídea — 80%)' | 'Circulação Posterior (Vertebrobasilar — 20%)' | 'Polígono de Willis (Anastomótico)';
  irrigatedTerritory: string[];
  clinicalOutput: {
    motorDeficit: string;
    sensoryDeficit: string;
    corticalOrCranialSigns: string[];
    visualOrAutonomicSigns: string;
  };
  aneurysmOrHemorrhageNote?: string;
  targetNodeIds: string[];
}

export type CranialNerveModality =
  | 'Sensitivo Especial'
  | 'Motor Somático'
  | 'Motor Somático + Parassimpático'
  | 'Motor Somático/Branquial'
  | 'Misto';

export interface CranialNerveEntry {
  id: string;
  number: number;
  romanNumeral: string;
  namePtBr: string;
  nameLatin: string;
  modality: CranialNerveModality;
  fiberTypesDetail: string;
  realOriginNuclei: string;
  apparentOriginBrain: string;
  cranialForamenId: string;
  cranialForamenName: string;
  anatomicalFunction: string;
  semiologyManeuver: string;
  clinicalPathology: string;
  specialClinicalDifferentiation?: {
    title: string;
    comparisonPoints: Array<{ label: string; description: string }>;
  };
  targetNodeIds: string[];
}

export interface HounsfieldScaleEntry {
  id: string;
  substanceOrTissue: string;
  huRange: string;
  radiologicalAppearance: string;
  clinicalNote: string;
}

export interface IntracranialHemorrhageEntry {
  id: string;
  namePtBr: string;
  anatomicalSpace: string;
  classicRupturedVessel: string;
  ctMorphology: string;
  suturesAndDuralRelation: string;
  temporalDensityEvolution: string;
  classicClinicalPresentation: string;
  targetNodeIds: string[];
}

export interface AspectsRegionEntry {
  id: 'C' | 'L' | 'IC' | 'I' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6';
  code: string;
  namePtBr: string;
  level: 'Ganglionar (Tálamo e Núcleos da Base)' | 'Supraganglionar (Acima dos Ventrículos Laterais)';
  anatomicalDescription: string;
  pointValue: 1;
  targetNodeIds: string[];
}

export interface AspectsCalculationResult {
  totalScore: number;
  subtractedPoints: number;
  affectedRegions: AspectsRegionEntry[];
  isFavorableForThrombectomy: boolean;
  clinicalInterpretation: string;
  recommendedAction: string;
}

export interface HerniationRedFlagEntry {
  id: string;
  namePtBr: string;
  radiologicalThreshold: string;
  biomechanicalMechanism: string;
  clinicalConsequence: string;
  targetNodeIds: string[];
}

export interface ClinicalCaseReasoningStep {
  findingTitle: string;
  anatomicalStructure: string;
  pathwayExplanation: string;
}

export interface ClinicalSimulationCase {
  id: string;
  caseNumber: number;
  title: string;
  category: string;
  patientPresentation: string;
  vitalSigns?: string;
  neurologicalExamFindings: string[];
  keyClinicalQuestion: string;
  keyClinicalAnswer: string;
  reasoningSteps: ClinicalCaseReasoningStep[];
  finalDiagnosis: {
    syndromeName: string;
    exactTopography: string;
    vesselInvolved: string;
    immediateManagement: string;
  };
  quizOptions: Array<{
    id: string;
    label: string;
    isCorrect: boolean;
    feedback: string;
  }>;
  targetNodeIds: string[];
}

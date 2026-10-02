/**
 * Definições tipadas e contratos de dados para o Atlas 3D de Anatomia Médica.
 * Compatível com a Terminologia Anatomica internacional e o modelo FMA (Foundational Model of Anatomy).
 */

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export type AnatomicalPlane = 'sagittal' | 'coronal' | 'axial';

export type AnatomicalChapter =
  | 1 // Generalidades e Termos de Orientação
  | 2 // Sistema Esquelético e Articular (Osteologia)
  | 3 // Sistema Muscular (Miologia)
  | 4 // Sistema Nervoso
  | 5 // Sistema Cardiovascular
  | 6 // Sistema Linfático
  | 7 // Sistema Respiratório
  | 8 // Sistema Digestório
  | 9 // Sistema Urinário
  | 10 // Sistema Reprodutor
  | 11 // Sistema Endócrino
  | 13 // Órgãos dos Sentidos (Visão e Audição/Equilíbrio)
  | 14; // Tegumento Comum (Pele e Fáscias)

export interface ClinicalReference {
  origin?: string;
  insertion?: string;
  innervation?: string;
  vascularization?: string;
  functionalAction?: string;
  clinicalSignificance?: string;
}

export interface AnatomicalNode {
  id: string; // Ex: 'fma:skull_frontal_bone'
  fmaId?: string; // ID da Foundational Model of Anatomy
  namePtBr: string; // Nome em Português do Brasil
  nameLatin: string; // Nome oficial na Terminologia Anatomica
  chapter: AnatomicalChapter;
  systemName: string;
  parentId?: string; // Nó pai no grafo de cena (ex: 'fma:cranium')
  meshName: string; // Identificador da sub-malha no arquivo .glb
  colorHex?: string; // Cor padrão de renderização ou destaque
  explosionVector?: Vector3D; // Vetor direcional opcional de deslocamento na vista explodida
  explosionMagnitudeMultiplier?: number; // Multiplicador específico para acidentes anatômicos
  layerDepth?: number; // 0 = pele, 1 = fáscia, 2 = superficial, 3 = profundo
  clinicalData?: ClinicalReference;
}

export interface ExplodedViewState {
  progress: number; // 0.0 (montado) a 1.0 (explosão máxima)
  isolatedNodeId: string | null; // Nó isolado em foco
  ghostMode: boolean; // Transparência a 10% nas malhas não selecionadas
  activeChapter: AnatomicalChapter;
}

export interface TelemetryMetrics {
  fps: number;
  triangles: number;
  drawCalls: number;
  geometriesCount: number;
  texturesCount: number;
  memoryMB: number;
}

export type ActiveAnatomicalSystem =
  | 'skeletal'
  | 'muscular'
  | 'cardiovascular'
  | 'nervous'
  | 'respiratory'
  | 'digestive'
  | 'lymphatic'
  | 'urinary'
  | 'reproductive'
  | 'endocrine'
  | 'sensory'
  | 'integumentary'
  | 'all';


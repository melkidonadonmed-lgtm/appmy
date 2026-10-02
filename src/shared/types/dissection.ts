/**
 * Contratos de dados e tipagens para a ferramenta de Dissecção Tomográfica Multiplanar (MPR)
 * e Modos de Renderização Cirúrgica do Atlas 3D de Anatomia Médica.
 * Em conformidade com a Terminologia Anatomica e padrões radiológicos (TC / RM).
 */

export type DissectionVisualMode = 'solid' | 'xray' | 'mpr';

export type MprPlaneType = 'sagittal' | 'coronal' | 'axial';

export interface AnatomicalLandmark {
  offsetMin: number;
  offsetMax: number;
  namePtBr: string;
  nameLatin: string;
  clinicalSignificance: string;
}

export interface DissectionState {
  visualMode: DissectionVisualMode;
  activePlane: MprPlaneType;
  offset: number; // Intervalo típico: -2.5 a +2.5 decímetros anatômicos
  inverted: boolean;
  showHelper: boolean;
}

export interface PlaneVectorDef {
  normal: { x: number; y: number; z: number };
  constant: number;
}

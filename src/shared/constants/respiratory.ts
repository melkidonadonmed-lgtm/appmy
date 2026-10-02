import { AnatomicalNode } from '../types/anatomy.ts';

export type RespiratoryRegion =
  | 'upper_airway'
  | 'tracheobronchial_tree'
  | 'pulmonary_parenchyma';

export interface RespiratoryNode extends AnatomicalNode {
  respiratoryRegion: RespiratoryRegion;
  lungSide?: 'right' | 'left';
  bronchialGeneration?: number; // 0 = traqueia, 1 = brônquios principais, 2 = lobares
  hasFissureSeparation?: boolean;
}

/**
 * Catálogo canônico do Sistema Respiratório (Capítulo 7 da Terminologia Anatomica e FMA).
 * Abrange laringe, traqueia, bifurcação brônquica segmentar (carina) e lobos pulmonares dissecáveis.
 */
export const RESPIRATORY_NODES: RespiratoryNode[] = [
  // ==========================================
  // VIA AÉREA SUPERIOR & LARINGE
  // ==========================================
  {
    id: 'fma:larynx',
    fmaId: 'FMA:55000',
    namePtBr: 'Laringe e Complexo Cartilaginoso',
    nameLatin: 'Larynx',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'larynx_complex',
    respiratoryRegion: 'upper_airway',
    colorHex: '#38bdf8',
    explosionVector: { x: 0, y: 0.35, z: 0.4 },
    explosionMagnitudeMultiplier: 1.1,
    clinicalData: {
      origin: 'Estende-se de C3 a C6, conectando a laringofaringe à traqueia',
      insertion: 'Articula-se superiormente com o osso hioide e inferiormente com a traqueia',
      innervation: 'Nervos laríngeos recorrente e laríngeo superior (ramos do nervo vago - NC X)',
      vascularization: 'Artérias laríngeas superior (ramo da tireóidea superior) e inferior',
      functionalAction: 'Esfíncter de proteção da via aérea inferior durante a deglutição e órgão primário da fonação (pregas vocais)',
      clinicalSignificance: 'Sítio de laringite, edema de glote anafilático e paralisia de cordas vocais por lesão iatrogênica do nervo laríngeo recorrente em tireoidectomias.',
    },
  },

  // ==========================================
  // ÁRVORE TRAQUEOBRÔNQUICA
  // ==========================================
  {
    id: 'fma:trachea',
    fmaId: 'FMA:7394',
    namePtBr: 'Traqueia e Anéis Cartilaginosos',
    nameLatin: 'Trachea',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'trachea_tube',
    respiratoryRegion: 'tracheobronchial_tree',
    bronchialGeneration: 0,
    colorHex: '#0ea5e9',
    explosionVector: { x: 0, y: 0.1, z: 0.25 },
    explosionMagnitudeMultiplier: 1.05,
    clinicalData: {
      origin: 'Continuação da laringe na borda inferior da cartilagem cricóidea (nível de C6)',
      insertion: 'Termina ao nível do ângulo esternal (T4-T5) bifurcando-se na carina traqueal',
      innervation: 'Ramos dos nervos vagos (parassimpático/broncoconstrição) e troncos simpáticos',
      vascularization: 'Artérias tireóideas inferiores e ramos bronquiais da aorta torácica',
      functionalAction: 'Condução e condicionamento (aquecimento, umidificação e filtração mucociliar) do ar inspirado',
      clinicalSignificance: 'Ponto anatômico de traqueostomia eletiva (2º ao 4º anel) e via de intubação endotraqueal orotraqueal (TOT).',
    },
  },
  {
    id: 'fma:bronchus_principalis_dexter',
    fmaId: 'FMA:7409',
    namePtBr: 'Brônquio Principal Direito',
    nameLatin: 'Bronchus principalis dexter',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'bronchus_main_r',
    respiratoryRegion: 'tracheobronchial_tree',
    lungSide: 'right',
    bronchialGeneration: 1,
    colorHex: '#0284c7',
    explosionVector: { x: 0.45, y: 0.05, z: 0.2 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Bifurcação da traqueia na carina traqueal',
      insertion: 'Penetra no hilo pulmonar direito emitindo o brônquio lobar superior antes do hilo (eparterial)',
      innervation: 'Plexo pulmonar anterior e posterior (vago e simpático)',
      vascularization: 'Artéria bronquial direita (geralmente originada da 3ª intercostal posterior ou aorta)',
      functionalAction: 'Condução aérea exclusiva para o pulmão direito; trajetória mais larga, curta (~2,5 cm) e verticalizada',
      clinicalSignificance: 'Local preferencial de alojamento de corpos estranhos aspirados em pediatria e adultos devido ao alinhamento quase retilíneo com a traqueia.',
    },
  },
  {
    id: 'fma:bronchus_principalis_sinister',
    fmaId: 'FMA:7410',
    namePtBr: 'Brônquio Principal Esquerdo',
    nameLatin: 'Bronchus principalis sinister',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'bronchus_main_l',
    respiratoryRegion: 'tracheobronchial_tree',
    lungSide: 'left',
    bronchialGeneration: 1,
    colorHex: '#0284c7',
    explosionVector: { x: -0.45, y: 0.05, z: 0.2 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Bifurcação da traqueia na carina traqueal',
      insertion: 'Passa inferiormente ao arco aórtico e anteriormente ao esôfago até o hilo pulmonar esquerdo',
      innervation: 'Plexo pulmonar esquerdo',
      vascularization: 'Duas artérias bronquiais esquerdas diretamente da aorta torácica descendente',
      functionalAction: 'Condução aérea para o pulmão esquerdo; trajetória mais longa (~5 cm), estreita e horizontalizada',
      clinicalSignificance: 'Menor incidência de broncoaspiração, porém sujeito a compressão extrínseca por dilatações do átrio esquerdo ou aneurismas de arco aórtico.',
    },
  },

  // ==========================================
  // PARÊNQUIMA PULMONAR DIREITO (3 LOBOS)
  // ==========================================
  {
    id: 'fma:lobus_superior_pulmonis_dextri',
    fmaId: 'FMA:7339',
    namePtBr: 'Pulmão Direito: Lobo Superior',
    nameLatin: 'Lobus superior pulmonis dextri',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'lung_right_superior',
    respiratoryRegion: 'pulmonary_parenchyma',
    lungSide: 'right',
    hasFissureSeparation: true,
    colorHex: '#67e8f9',
    explosionVector: { x: 0.85, y: 0.5, z: 0.1 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Ápice pulmonar elevando-se cerca de 2-3 cm acima da clavícula através da abertura superior do tórax',
      insertion: 'Limitado inferiormente pela fissura horizontal (anterior) e fissura oblíqua (posterior)',
      innervation: 'Plexo pulmonar visceral simpático e parassimpático',
      vascularization: 'Artéria pulmonar direita e drenagem por veias pulmonares direitas',
      functionalAction: 'Hematose alveolar em segmentos apical, posterior e anterior',
      clinicalSignificance: 'Sítio clássico de reativação de tuberculose pós-primária (infiltrado cavitário apical) e carcinoma broncogênico de células não pequenas.',
    },
  },
  {
    id: 'fma:lobus_medius_pulmonis_dextri',
    fmaId: 'FMA:7340',
    namePtBr: 'Pulmão Direito: Lobo Médio',
    nameLatin: 'Lobus medius pulmonis dextri',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'lung_right_middle',
    respiratoryRegion: 'pulmonary_parenchyma',
    lungSide: 'right',
    hasFissureSeparation: true,
    colorHex: '#22d3ee',
    explosionVector: { x: 0.95, y: -0.1, z: 0.35 },
    explosionMagnitudeMultiplier: 1.3,
    clinicalData: {
      origin: 'Região cuneiforme anterior do hemitórax direito',
      insertion: 'Compreendido entre a fissura horizontal superiormente e a fissura oblíqua postero-inferiormente',
      functionalAction: 'Ventilação e troca gasosa nos segmentos lateral e medial',
      clinicalSignificance: 'Síndrome do lobo médio (atelectasia crônica recorrente por compressão brônquica por linfonodos peribrônquicos inflamados).',
    },
  },
  {
    id: 'fma:lobus_inferior_pulmonis_dextri',
    fmaId: 'FMA:7341',
    namePtBr: 'Pulmão Direito: Lobo Inferior',
    nameLatin: 'Lobus inferior pulmonis dextri',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'lung_right_inferior',
    respiratoryRegion: 'pulmonary_parenchyma',
    lungSide: 'right',
    hasFissureSeparation: true,
    colorHex: '#06b6d4',
    explosionVector: { x: 0.85, y: -0.65, z: -0.15 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Ocupa a maior parte da face posterior e base diafragmática do pulmão direito',
      insertion: 'Separado dos lobos superior e médio pela fissura oblíqua maior',
      functionalAction: 'Maior volume de troca gasosa basal dependente da gravidade',
      clinicalSignificance: 'Região de maior estase e consolidação em pneumonias adquiridas na comunidade (PAC) e derrames pleurais no recesso costodiafragmático.',
    },
  },

  // ==========================================
  // PARÊNQUIMA PULMONAR ESQUERDO (2 LOBOS)
  // ==========================================
  {
    id: 'fma:lobus_superior_pulmonis_sinistri',
    fmaId: 'FMA:7342',
    namePtBr: 'Pulmão Esquerdo: Lobo Superior e Língula',
    nameLatin: 'Lobus superior pulmonis sinistri',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'lung_left_superior',
    respiratoryRegion: 'pulmonary_parenchyma',
    lungSide: 'left',
    hasFissureSeparation: true,
    colorHex: '#67e8f9',
    explosionVector: { x: -0.85, y: 0.45, z: 0.1 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Ápice do hemitórax esquerdo com a incisura cardíaca acentuada na borda anterior',
      insertion: 'Emite o processo lingular (língula do pulmão esquerdo, análoga ao lobo médio direito)',
      functionalAction: 'Ventilação pulmonar esquerda superior e peri-cardíaca',
      clinicalSignificance: 'A incisura cardíaca expõe a área nua do pericárdio; bronquiectasias de língula associadas a micobactérias não tuberculosas (Síndrome de Lady Windermere).',
    },
  },
  {
    id: 'fma:lobus_inferior_pulmonis_sinistri',
    fmaId: 'FMA:7343',
    namePtBr: 'Pulmão Esquerdo: Lobo Inferior',
    nameLatin: 'Lobus inferior pulmonis sinistri',
    chapter: 7,
    systemName: 'Sistema Respiratório',
    meshName: 'lung_left_inferior',
    respiratoryRegion: 'pulmonary_parenchyma',
    lungSide: 'left',
    hasFissureSeparation: true,
    colorHex: '#06b6d4',
    explosionVector: { x: -0.85, y: -0.65, z: -0.15 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Face póstero-basal do hemitórax esquerdo em íntimo contato com a cúpula hemidiafragmática esquerda',
      insertion: 'Separado do lobo superior pela fissura oblíqua esquerda',
      functionalAction: 'Troca gasosa pulmonar posteroinferior esquerda',
      clinicalSignificance: 'Sítio de broncopneumonias aspirativas em decúbito e contusões pulmonares torácicas por desaceleração.',
    },
  },
];

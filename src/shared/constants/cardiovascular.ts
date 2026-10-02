import { AnatomicalNode } from '../types/anatomy.ts';

export type VesselType = 'artery' | 'vein' | 'heart_chamber' | 'valve';

export interface CardiovascularNode extends AnatomicalNode {
  vesselType: VesselType;
  oxygenated: boolean;
  bloodFlowDirection?: 'afferent' | 'efferent';
}

/**
 * Catálogo canônico do Sistema Cardiovascular (Capítulo 5 da Terminologia Anatomica e FMA).
 * Inclui as 4 câmaras cardíacas, valvas e a rede tubular cérvico-craniana (Carótidas e Jugulares).
 */
export const CARDIOVASCULAR_NODES: CardiovascularNode[] = [
  // ==========================================
  // CÂMARAS CARDÍACAS (Coração 3D)
  // ==========================================
  {
    id: 'fma:ventriculus_sinister',
    fmaId: 'FMA:7101',
    namePtBr: 'Ventrículo Esquerdo',
    nameLatin: 'Ventriculus sinister cordis',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'left_ventricle',
    vesselType: 'heart_chamber',
    oxygenated: true,
    colorHex: '#ef4444',
    explosionVector: { x: -0.4, y: -0.5, z: 0.3 },
    explosionMagnitudeMultiplier: 1.1,
    clinicalData: {
      origin: 'Ápice (ápex) e maior parte da face esternocostal e diafragmática',
      insertion: 'Contínuo com a valva aórtica e o vestíbulo aórtico',
      functionalAction: 'Bombeia sangue arterial oxigenado sob alta pressão sistêmica para todo o corpo através da artéria aorta',
      clinicalSignificance: 'Principal sítio de infarto agudo do miocárdio (IAM), hipertrofia ventricular esquerda por hipertensão arterial e insuficiência cardíaca.',
    },
  },
  {
    id: 'fma:ventriculus_dexter',
    fmaId: 'FMA:7098',
    namePtBr: 'Ventrículo Direito',
    nameLatin: 'Ventriculus dexter cordis',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'right_ventricle',
    vesselType: 'heart_chamber',
    oxygenated: false,
    colorHex: '#3b82f6',
    explosionVector: { x: 0.4, y: -0.5, z: 0.3 },
    explosionMagnitudeMultiplier: 1.1,
    clinicalData: {
      origin: 'Face anterior esternocostal do coração',
      insertion: 'Contínuo com o cone arterioso e o tronco pulmonar',
      functionalAction: 'Recebe sangue venoso do átrio direito e o bombeia para a circulação pulmonar (pequena circulação)',
      clinicalSignificance: 'Sujeito a sobrecarga em tromboembolismo pulmonar (TEP) agudo (cor pulmonale) e hipertensão pulmonar.',
    },
  },
  {
    id: 'fma:atrium_sinistrum',
    fmaId: 'FMA:7099',
    namePtBr: 'Átrio Esquerdo',
    nameLatin: 'Atrium sinistrum cordis',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'left_atrium',
    vesselType: 'heart_chamber',
    oxygenated: true,
    colorHex: '#f87171',
    explosionVector: { x: -0.3, y: 0.2, z: -0.4 },
    explosionMagnitudeMultiplier: 1.0,
    clinicalData: {
      origin: 'Base do coração (face posterior)',
      insertion: 'Recebe as 4 veias pulmonares (duas direitas e duas esquerdas)',
      functionalAction: 'Recebe sangue arterial recém-oxigenado dos pulmões e o direciona ao VE através da valva mitral',
      clinicalSignificance: 'Sítio mais comum de dilatação e formação de trombos murais na fibrilação atrial (FA), principal causa de AVC cardioembólico.',
    },
  },
  {
    id: 'fma:atrium_dextrum',
    fmaId: 'FMA:7096',
    namePtBr: 'Átrio Direito',
    nameLatin: 'Atrium dextrum cordis',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'right_atrium',
    vesselType: 'heart_chamber',
    oxygenated: false,
    colorHex: '#60a5fa',
    explosionVector: { x: 0.4, y: 0.2, z: -0.2 },
    explosionMagnitudeMultiplier: 1.0,
    clinicalData: {
      origin: 'Margem direita do coração',
      insertion: 'Recebe a veia cava superior, veia cava inferior e seio coronário',
      functionalAction: 'Recebe todo o retorno venoso sistêmico; abriga o nó sinoatrial (marcapasso natural cardíaco)',
      clinicalSignificance: 'Ponto de implante de cateter venoso central (CVC) e eletrodos de marcapasso definitivo.',
    },
  },

  // ==========================================
  // REDE TUBULAR ARTERIAL (Cérebro & Cabeça)
  // ==========================================
  {
    id: 'fma:arcus_aortae',
    fmaId: 'FMA:3734',
    namePtBr: 'Arco Aórtico e Aorta Ascendente',
    nameLatin: 'Arcus aortae',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'aorta_arch',
    vesselType: 'artery',
    oxygenated: true,
    colorHex: '#ef4444',
    explosionVector: { x: 0, y: 0.6, z: 0 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Óstio da aorta no ventrículo esquerdo',
      insertion: 'Emite o tronco braquiocefálico, artéria carótida comum esquerda e artéria subclávia esquerda',
      functionalAction: 'Tronco arterial principal de distribuição sanguínea sistêmica sob alta pressão elástica',
      clinicalSignificance: 'Sede de dissecção aórtica (Stanford A) e aterosclerose aórtica.',
    },
  },
  {
    id: 'fma:arteria_carotis_communis_dextra',
    fmaId: 'FMA:3940',
    namePtBr: 'Artéria Carótida Comum Direita',
    nameLatin: 'Arteria carotis communis dextra',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'carotid_common_r',
    vesselType: 'artery',
    oxygenated: true,
    colorHex: '#ef4444',
    explosionVector: { x: 0.6, y: 0.4, z: 0.3 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Bifurcação do tronco braquiocefálico atrás da articulação esternoclavicular',
      insertion: 'Bifurca-se ao nível de C4 (cartilagem tireóidea) em carótida interna e externa',
      functionalAction: 'Principal eixo de suprimento arterial para a cabeça, pescoço e encéfalo',
      clinicalSignificance: 'Ponto de palpação do pulso carotídeo em reanimação cardiopulmonar (RCP) e ausculta de sopros estenóticos.',
    },
  },
  {
    id: 'fma:arteria_carotis_interna_dextra',
    fmaId: 'FMA:3947',
    namePtBr: 'Artéria Carótida Interna Direita',
    nameLatin: 'Arteria carotis interna dextra',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'carotid_internal_r',
    vesselType: 'artery',
    oxygenated: true,
    colorHex: '#dc2626',
    explosionVector: { x: 0.7, y: 0.7, z: 0.2 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Bifurcação carotídea no trígono carotídeo do pescoço',
      insertion: 'Entra na cavidade craniana pelo canal carótico do osso temporal e forma o Polígono de Willis',
      functionalAction: 'Suprimento sanguíneo do hemisfério cerebral ipsilateral, órbita e globo ocular (via artéria oftálmica)',
      clinicalSignificance: 'Estenose aterosclerótica carotídea é a causa mais comum de Ataque Isquêmico Transitório (AIT) e AVC isquêmico.',
    },
  },

  // ==========================================
  // REDE TUBULAR VENOSA (Drenagem da Cabeça)
  // ==========================================
  {
    id: 'fma:vena_jugularis_interna_dextra',
    fmaId: 'FMA:4729',
    namePtBr: 'Veia Jugular Interna Direita',
    nameLatin: 'Vena jugularis interna dextra',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'jugular_internal_r',
    vesselType: 'vein',
    oxygenated: false,
    colorHex: '#3b82f6',
    explosionVector: { x: 0.75, y: 0.5, z: 0.1 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Continuação direta do seio sigmóideo no forame jugular da base do crânio',
      insertion: 'Une-se à veia subclávia atrás da extremidade esternal da clavícula para formar a veia braquiocefálica',
      functionalAction: 'Drena a maior parte do sangue venoso do encéfalo, crânio, face profunda e órgãos do pescoço',
      clinicalSignificance: 'Principal sítio de punção guiada por ultrassom para acesso venoso central e monitorização de pressão venosa central (PVC).',
    },
  },
  {
    id: 'fma:vena_cava_superior',
    fmaId: 'FMA:4720',
    namePtBr: 'Veia Cava Superior',
    nameLatin: 'Vena cava superior',
    chapter: 5,
    systemName: 'Sistema Cardiovascular',
    meshName: 'vena_cava_superior',
    vesselType: 'vein',
    oxygenated: false,
    colorHex: '#2563eb',
    explosionVector: { x: 0.35, y: 0.3, z: 0 },
    explosionMagnitudeMultiplier: 1.1,
    clinicalData: {
      origin: 'Confluência das veias braquiocefálicas direita e esquerda',
      insertion: 'Desemboca na porção súpero-posterior do átrio direito',
      functionalAction: 'Conduz todo o sangue desoxigenado da cabeça, pescoço, membros superiores e tórax de volta ao coração',
      clinicalSignificance: 'A síndrome da veia cava superior (SVCS) por compressão neoplásica gera edema em pelerine e turgência jugular.',
    },
  },
];

import { AnatomicalNode } from '../types/anatomy.ts';

export type NeurologicalRegion =
  | 'telencephalon'
  | 'diencephalon'
  | 'mesencephalon'
  | 'rhombencephalon'
  | 'cerebellum'
  | 'ventricular_system';

export interface NeurologyNode extends AnatomicalNode {
  region: NeurologicalRegion;
  isCSF?: boolean; // Líquido Cefalorraquidiano (Ventrículos)
  corticalBrodmannArea?: string; // e.g. 'Áreas 4 (Córtex Motor Primário)'
  functionalModality?: 'motor' | 'sensory' | 'limbic' | 'autonomic' | 'cognitive' | 'conduit';
}

/**
 * Catálogo canônico do Sistema Nervoso Central (Capítulo 4 da Terminologia Anatomica e FMA).
 * Inclui os lobos cerebrais, cerebelo, tronco encefálico e sistema ventricular com LCR.
 */
export const NEUROLOGY_NODES: NeurologyNode[] = [
  // ==========================================
  // TELENCÉFALO (LOBOS CEREBRAIS)
  // ==========================================
  {
    id: 'fma:lobus_frontalis',
    fmaId: 'FMA:61825',
    namePtBr: 'Lobo Frontal',
    nameLatin: 'Lobus frontalis',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'lobe_frontal',
    region: 'telencephalon',
    functionalModality: 'motor',
    corticalBrodmannArea: 'Áreas 4 (Motor Primário), 6 (Pré-motor) e 44/45 (Área de Broca)',
    colorHex: '#8b5cf6',
    explosionVector: { x: 0, y: 0.5, z: 0.7 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Polo anterior do encéfalo até o sulco central (de Rolando) e sulco lateral (de Sylvius)',
      insertion: 'Conecta-se ao tálamo, gânglios da base e trato corticoespinhal via cápsula interna',
      functionalAction: 'Planejamento motor voluntário, julgamento executivo, personalidade, controle inibitório e produção da fala articulada (Broca)',
      clinicalSignificance: 'Lesões provocam afasia de Broca (não-fluente), síndrome pré-frontal com desinibição ou apatia, e paresia contralateral (AVC de ACM/ACA).',
    },
  },
  {
    id: 'fma:lobus_parietalis',
    fmaId: 'FMA:61826',
    namePtBr: 'Lobo Parietal',
    nameLatin: 'Lobus parietalis',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'lobe_parietal',
    region: 'telencephalon',
    functionalModality: 'sensory',
    corticalBrodmannArea: 'Áreas 3, 1, 2 (Córtex Somatossensorial Primário)',
    colorHex: '#06b6d4',
    explosionVector: { x: 0, y: 0.8, z: -0.2 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Posterior ao sulco central, acima do sulco lateral até o sulco parieto-occipital',
      insertion: 'Integra vias aferentes talamocorticais sensoriais e emite conexões associativas para lobos vizinhos',
      functionalAction: 'Processamento somatossensorial (tato, propriocepção, dor), mapa corporal (homúnculo sensitivo) e percepção visuoespacial',
      clinicalSignificance: 'Lesões no hemisfério não-dominante causam heminegligência visuoespacial; no dominante, Síndrome de Gerstmann (agrafia, acalculia, desorientação direita/esquerda).',
    },
  },
  {
    id: 'fma:lobus_temporalis',
    fmaId: 'FMA:61827',
    namePtBr: 'Lobo Temporal',
    nameLatin: 'Lobus temporalis',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'lobe_temporal',
    region: 'telencephalon',
    functionalModality: 'cognitive',
    corticalBrodmannArea: 'Áreas 41/42 (Auditivo Primário), 22 (Área de Wernicke) e Hipocampo',
    colorHex: '#10b981',
    explosionVector: { x: 0.7, y: 0.1, z: 0.1 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Abaixo do sulco lateral (de Sylvius), repousando na fossa craniana média',
      insertion: 'Emite o fascículo arqueado em direção à área de Broca e conecta-se ao sistema límbico',
      functionalAction: 'Processamento auditivo primário, compreensão da linguagem falada (Wernicke), consolidação de memórias declarativas (hipocampo) e olfato',
      clinicalSignificance: 'Afasia de Wernicke (fluente, mas sem compreensão de fala), epilepsia do lobo temporal com crises focais sensitivas/psíquicas e amnésia anterógrada.',
    },
  },
  {
    id: 'fma:lobus_occipitalis',
    fmaId: 'FMA:61828',
    namePtBr: 'Lobo Occipital',
    nameLatin: 'Lobus occipitalis',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'lobe_occipital',
    region: 'telencephalon',
    functionalModality: 'sensory',
    corticalBrodmannArea: 'Área 17 (Córtex Visual Primário V1 / Sulco Calcarino)',
    colorHex: '#eab308',
    explosionVector: { x: 0, y: 0.35, z: -0.9 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Posterior ao sulco parieto-occipital e incisura pré-occipital na fossa craniana posterior superior',
      insertion: 'Recebe as radiações ópticas (trato geniculocalcarino) oriundas do corpo geniculado lateral do tálamo',
      functionalAction: 'Recepção e decodificação visual primária (luminosidade, contraste, cor, formas e movimento)',
      clinicalSignificance: 'Lesões vasculares (AVC de artéria cerebral posterior) causam hemianopsia homônima contralateral com preservação macular ou cegueira cortical.',
    },
  },

  // ==========================================
  // CEREBELO
  // ==========================================
  {
    id: 'fma:cerebellum',
    fmaId: 'FMA:61829',
    namePtBr: 'Cerebelo',
    nameLatin: 'Cerebellum',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'cerebellum',
    region: 'cerebellum',
    functionalModality: 'motor',
    colorHex: '#f97316',
    explosionVector: { x: 0, y: -0.4, z: -0.7 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Fossa craniana posterior, recoberto pela tenda do cerebelo (tentório) e situado dorsalmente à ponte e ao bulbo',
      insertion: 'Comunica-se com o tronco encefálico via três pedúnculos cerebelares (superior, médio e inferior)',
      functionalAction: 'Coordenação motora fina, controle do tônus muscular, equilíbrio dinâmico e aprendizagem motora',
      clinicalSignificance: 'Síndrome cerebelar com ataxia da marcha, dismetria (teste índex-nariz anormal), disdiadococinesia, nistagmo e tremor intencional. Herniação de tonsilas cerebelares (Chiari).',
    },
  },

  // ==========================================
  // TRONCO ENCEFÁLICO
  // ==========================================
  {
    id: 'fma:mesencephalon',
    fmaId: 'FMA:61830',
    namePtBr: 'Mesencéfalo',
    nameLatin: 'Mesencephalon',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'brainstem_midbrain',
    region: 'mesencephalon',
    functionalModality: 'conduit',
    colorHex: '#ec4899',
    explosionVector: { x: 0, y: 0.1, z: 0 },
    explosionMagnitudeMultiplier: 0.6,
    clinicalData: {
      origin: 'Transição entre o diencéfalo superiormente e a ponte inferiormente',
      insertion: 'Contém os pedúnculos cerebrais, substância negra, núcleo rubro e os colículos superiores/inferiores',
      functionalAction: 'Condução de vias motoras descendentes, controle dos reflexos visuais/auditivos e produção de dopamina motora',
      clinicalSignificance: 'Degeneração dos neurônios dopaminérgicos da substância negra compacta desencadeia a Doença de Parkinson. Origem dos nervos cranianos oculomotor (NC III) e troclear (NC IV).',
    },
  },
  {
    id: 'fma:pons',
    fmaId: 'FMA:61831',
    namePtBr: 'Ponte de Varólio',
    nameLatin: 'Pons',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'brainstem_pons',
    region: 'rhombencephalon',
    functionalModality: 'conduit',
    colorHex: '#d946ef',
    explosionVector: { x: 0, y: -0.15, z: 0.05 },
    explosionMagnitudeMultiplier: 0.6,
    clinicalData: {
      origin: 'Entre o mesencéfalo e o bulbo, anterior ao quarto ventrículo e cerebelo',
      insertion: 'Conecta os hemisférios cerebelares através dos pedúnculos cerebelares médios e conduz o trato corticoespinhal',
      functionalAction: 'Centro de relé cerebelar, controle respiratório rítmico (centros apnêustico e pneumotáxico) e sono REM',
      clinicalSignificance: 'Mielinólise pontina central por rápida correção de hiponatremia; lesões pontinas bilaterais causam Síndrome de Enclaustramento (Locked-in Syndrome). Emerge o nervo trigêmeo (NC V).',
    },
  },
  {
    id: 'fma:medulla_oblongata',
    fmaId: 'FMA:61832',
    namePtBr: 'Bulbo (Medula Oblonga)',
    nameLatin: 'Medulla oblongata',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'brainstem_medulla',
    region: 'rhombencephalon',
    functionalModality: 'autonomic',
    colorHex: '#c084fc',
    explosionVector: { x: 0, y: -0.45, z: 0 },
    explosionMagnitudeMultiplier: 0.7,
    clinicalData: {
      origin: 'Contínuo inferiormente com a medula espinhal ao nível do forame magno occipital',
      insertion: 'Possui as pirâmides bulbares (onde ocorre o cruzamento do trato corticoespinhal - decussação das pirâmides) e olivas bulbares',
      functionalAction: 'Centro cardiorrespiratório e vasomotor autônomo vital (pressão arterial, frequência cardíaca, vômito, tosse e deglutição)',
      clinicalSignificance: 'Lesões bulbares são de altíssima letalidade por parada cardiorrespiratória instantânea. Síndrome de Wallenberg (AVC da artéria cerebelar posteroinferior - PICA).',
    },
  },

  // ==========================================
  // SISTEMA VENTRICULAR E LCR
  // ==========================================
  {
    id: 'fma:ventriculi_laterales',
    fmaId: 'FMA:61833',
    namePtBr: 'Ventrículos Laterais (com LCR)',
    nameLatin: 'Ventriculi laterales',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'ventricles_lateral',
    region: 'ventricular_system',
    isCSF: true,
    functionalModality: 'conduit',
    colorHex: '#38bdf8', // Turquesa/Ciano luminoso para fluido LCR
    explosionVector: { x: 0, y: 0.3, z: 0.1 },
    explosionMagnitudeMultiplier: 0.9,
    clinicalData: {
      origin: 'Cavidades curvas em forma de C profundas no interior de cada hemisfério cerebral',
      insertion: 'Drenam para o terceiro ventrículo através dos forames interventriculares (de Monro)',
      functionalAction: 'Produção contínua da maior parte do Líquido Cefalorraquidiano (LCR) pelos plexos corióideos (~500 mL/dia) e amortecimento mecânico do encéfalo',
      clinicalSignificance: 'Dilatação ventricular em hidrocefalia comunicante ou por estenose do forame de Monro. Alvo de derivação ventrículo-peritoneal (DVP).',
    },
  },
  {
    id: 'fma:ventriculus_tertius_et_quartus',
    fmaId: 'FMA:61834',
    namePtBr: 'Terceiro e Quarto Ventrículos (Aqueduto)',
    nameLatin: 'Ventriculus tertius et quartus cordis/cerebri',
    chapter: 4,
    systemName: 'Sistema Nervoso',
    meshName: 'ventricles_3rd_4th',
    region: 'ventricular_system',
    isCSF: true,
    functionalModality: 'conduit',
    colorHex: '#0ea5e9',
    explosionVector: { x: 0, y: -0.1, z: -0.15 },
    explosionMagnitudeMultiplier: 0.85,
    clinicalData: {
      origin: 'Fenda sagital no diencéfalo (III ventrículo) conectada ao IV ventrículo pelo estreito Aqueduto Mesencefálico (de Sylvius)',
      insertion: 'Comunica-se com o espaço subaracnóideo através das aberturas laterais (de Luschka) e mediana (de Magendie)',
      functionalAction: 'Condução unidirecional de Líquido Cefalorraquidiano (LCR) do encéfalo superior para o espaço subaracnóideo periencefálico e perimedular',
      clinicalSignificance: 'A estenose congênita ou tumoral do aqueduto de Sylvius é a causa primária de hidrocefalia não-comunicante obstrutiva aguda, com hipertensão intracraniana grave.',
    },
  },
];

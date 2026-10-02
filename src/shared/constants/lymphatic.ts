import { AnatomicalNode } from '../types/anatomy.ts';

export type LymphaticStructureType =
  | 'duct'
  | 'node_chain'
  | 'cistern';

export interface LymphaticNode extends AnatomicalNode {
  lymphaticType: LymphaticStructureType;
  drainageTerritory: string;
  isSentinelNode?: boolean;
}

/**
 * Catálogo canônico do Sistema Linfático (Capítulo 6 da Terminologia Anatomica e FMA).
 * Inclui o ducto torácico principal, cisterna do quilo, ducto linfático direito,
 * cadeias linfonodais cervicais profundas, mediastinais, axilares e o linfonodo sentinela de Virchow.
 */
export const LYMPHATIC_NODES: LymphaticNode[] = [
  // ==========================================
  // GRANDES TRONCOS E VASOS CONDUTORES
  // ==========================================
  {
    id: 'fma:ductus_thoracicus',
    fmaId: 'FMA:5031',
    namePtBr: 'Ducto Torácico',
    nameLatin: 'Ductus thoracicus',
    chapter: 6,
    systemName: 'Sistema Linfático',
    meshName: 'thoracic_duct',
    lymphaticType: 'duct',
    drainageTerritory: 'Todo o corpo abaixo do diafragma e a metade esquerda do corpo acima do diafragma (~75% da linfa total)',
    colorHex: '#34d399',
    explosionVector: { x: -0.15, y: 0.35, z: -0.15 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Continuação superior da cisterna do quilo no abdome ao nível de L1-L2',
      insertion: 'Atravessa o hiato aórtico (T12), ascende no mediastino posterior e drena no ângulo venoso jugulossubclávio esquerdo (Pirogoff)',
      innervation: 'Inervação autonômica perivascular de fibras simpáticas que modulam o tônus contrátil',
      vascularization: 'Vasos linfáticos nutridores provenientes de artérias intercostais posteriores',
      functionalAction: 'Condução unidirecional da linfa e quilo (lipídios emulsionados absorvidos pelos lactíferos intestinais) de volta à circulação venosa',
      clinicalSignificance: 'Lesões cirúrgicas em esofagectomias ou cirurgias aórticas resultam em quilotórax de difícil resolução clínica.',
    },
  },
  {
    id: 'fma:cisterna_chyli',
    fmaId: 'FMA:5030',
    namePtBr: 'Cisterna do Quilo (de Pecquet)',
    nameLatin: 'Cisterna chyli',
    chapter: 6,
    systemName: 'Sistema Linfático',
    meshName: 'cisterna_chyli',
    lymphaticType: 'cistern',
    drainageTerritory: 'Confluência dos troncos linfáticos lombares direito/esquerdo e troncos intestinais',
    colorHex: '#4ade80',
    explosionVector: { x: 0.05, y: -0.4, z: -0.2 },
    explosionMagnitudeMultiplier: 1.1,
    clinicalData: {
      origin: 'Bolsa sacular retroperitoneal dilatada situada anterior aos corpos vertebrais de L1 e L2',
      insertion: 'Estreita-se cranialmente para originar diretamente o ducto torácico',
      functionalAction: 'Reservatório coletor de linfa rica em quilomícrons oriunda do trato digestório e membros inferiores',
      clinicalSignificance: 'Dilatações anômalas ou obstruções filariais podem causar ascite quilosa e linfedema escrotal/de membros inferiores.',
    },
  },
  {
    id: 'fma:ductus_lymphaticus_dexter',
    fmaId: 'FMA:5032',
    namePtBr: 'Ducto Linfático Direito (Grande Veia Linfática)',
    nameLatin: 'Ductus lymphaticus dexter',
    chapter: 6,
    systemName: 'Sistema Linfático',
    meshName: 'right_lymphatic_duct',
    lymphaticType: 'duct',
    drainageTerritory: 'Hemiface direita, hemicrânio direito, hemitórax direito e membro superior direito (~25% da linfa corporal)',
    colorHex: '#22c55e',
    explosionVector: { x: 0.45, y: 0.45, z: 0.1 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'União dos troncos jugular direito, subclávio direito e broncomediastinal direito na base do pescoço',
      insertion: 'Desemboca na confluência das veias jugular interna direita e subclávia direita',
      functionalAction: 'Drenagem linfática rápida do quadrante superior direito devolvendo líquidos intersticiais e células de vigilância imune',
      clinicalSignificance: 'Via de disseminação linfática de tumores do pulmão direito e mama direita.',
    },
  },

  // ==========================================
  // CADEIAS GANGLIONARES CERVICAIS E SENTINELAS
  // ==========================================
  {
    id: 'fma:nodi_cervicales_profundi_superiores',
    fmaId: 'FMA:61245',
    namePtBr: 'Linfonodos Cervicais Profundos Superiores (Jugulodigástricos)',
    nameLatin: 'Nodi lymphoidei cervicales laterales profundi superiores',
    chapter: 6,
    systemName: 'Sistema Linfático',
    meshName: 'lymph_nodes_jugulodigastric',
    lymphaticType: 'node_chain',
    drainageTerritory: 'Língua, amígdalas palatinas, faringe, laringe e cavidade nasal posterior',
    colorHex: '#86efac',
    explosionVector: { x: 0.6, y: 0.65, z: 0.35 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Ao longo da veia jugular interna, no cruzamento com o ventre posterior do músculo digástrico (Nível II cervical)',
      insertion: 'Emitem vasos eferentes para a cadeia juguloomo-hioidea inferior',
      functionalAction: 'Primeira estação de filtração imunitária contra patógenos da cavidade oral e faringe',
      clinicalSignificance: 'Aumento doloroso em amigdalites bacterianas agudas (linfonodo sentinela de Küttner); sítio comum de metástases de carcinomas espinocelulares (CEC) de orofaringe.',
    },
  },
  {
    id: 'fma:nodi_cervicales_profundi_inferiores',
    fmaId: 'FMA:61247',
    namePtBr: 'Linfonodos Cervicais Profundos Inferiores (Juguloomo-hioideos)',
    nameLatin: 'Nodi lymphoidei cervicales laterales profundi inferiores',
    chapter: 6,
    systemName: 'Sistema Linfático',
    meshName: 'lymph_nodes_omohyoid',
    lymphaticType: 'node_chain',
    drainageTerritory: 'Língua sublingual, laringe infraglótica e tireoide',
    colorHex: '#86efac',
    explosionVector: { x: 0.65, y: 0.3, z: 0.25 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Sobre a veia jugular interna, adjacente ao tendão intermediário do músculo omo-hioideo (Nível IV cervical)',
      insertion: 'Tronco linfático jugular',
      functionalAction: 'Barreira imunológica contra disseminação de infecções e neoplasias da laringe e tireoide',
      clinicalSignificance: 'Envolvimento no esvaziamento cervical radical ou seletivo por câncer papilífero de tireoide.',
    },
  },
  {
    id: 'fma:nodus_supraclavicularis_sinister',
    fmaId: 'FMA:12780',
    namePtBr: 'Linfonodo Supraclavicular Esquerdo (Linfonodo de Virchow)',
    nameLatin: 'Nodus lymphoideus supraclavicularis sinister - Virchow',
    chapter: 6,
    systemName: 'Sistema Linfático',
    meshName: 'lymph_node_virchow',
    lymphaticType: 'node_chain',
    isSentinelNode: true,
    drainageTerritory: 'Drenagem retrograda ou terminal do ducto torácico oriunda de órgãos abdominais e pélvicos',
    colorHex: '#10b981',
    explosionVector: { x: -0.65, y: 0.25, z: 0.35 },
    explosionMagnitudeMultiplier: 1.3,
    clinicalData: {
      origin: 'Fossa supraclavicular esquerda, profundamente à inserção clavicular do músculo esternocleidomastóideo',
      insertion: 'Em íntima proximidade com a terminação do ducto torácico',
      functionalAction: 'Filtro sentinela terminal antes do influxo da linfa na circulação sistêmica venosa',
      clinicalSignificance: 'Sinal de Troisier / Linfonodo de Virchow: Linfadenopatia supraclavicular esquerda endurecida e indolor, clássico sinal patognomônico de metástase de neoplasia gastrointestinal oculta (especialmente adenocarcinoma gástrico).',
    },
  },
  {
    id: 'fma:nodi_axillares_apicales',
    fmaId: 'FMA:12781',
    namePtBr: 'Linfonodos Axilares Apicais',
    nameLatin: 'Nodi lymphoidei axillares apicales',
    chapter: 6,
    systemName: 'Sistema Linfático',
    meshName: 'lymph_nodes_axillary_apical',
    lymphaticType: 'node_chain',
    drainageTerritory: 'Glândula mamária (quadrante superolateral), parede torácica lateral e todos os grupos axilares inferiores',
    colorHex: '#4ade80',
    explosionVector: { x: -0.9, y: 0.2, z: -0.1 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Ápice da fossa axilar, medial à veia axilar e acima da borda superior do músculo peitoral menor (Nível III de Berg)',
      insertion: 'Tronco linfático subclávio',
      functionalAction: 'Ponto crítico de confluência da drenagem linfática da mama e do membro superior',
      clinicalSignificance: 'Estadiamento oncológico fundamental no carcinoma de mama; sua ressecção cirúrgica ampla eleva o risco de linfedema crônico no membro superior ipsilateral.',
    },
  },
  {
    id: 'fma:nodi_tracheobronchiales',
    fmaId: 'FMA:12782',
    namePtBr: 'Linfonodos Traqueobrônquicos (Subcarinais e Hilares)',
    nameLatin: 'Nodi lymphoidei tracheobronchiales',
    chapter: 6,
    systemName: 'Sistema Linfático',
    meshName: 'lymph_nodes_tracheobronchial',
    lymphaticType: 'node_chain',
    drainageTerritory: 'Parênquima pulmonar bilateral, brônquios e coração',
    colorHex: '#16a34a',
    explosionVector: { x: 0, y: 0.05, z: 0.1 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Bifurcação da traqueia abaixo da carina (linfonodos subcarinais - Estação 7 de Mountain)',
      insertion: 'Drenam cranialmente para os linfonodos paratraqueais e troncos broncomediastinais',
      functionalAction: 'Filtração imune pulmonar e contenção de inalantes particulados (antracose/carvão)',
      clinicalSignificance: 'Envolvimento no estadiamento N2 de câncer pulmonar não pequenas células via biópsia guiada por ultrassom endobrônquico (EBUS).',
    },
  },
];

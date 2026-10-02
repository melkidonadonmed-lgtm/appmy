import { AnatomicalNode } from '../types/anatomy.ts';

export type DigestiveTractSection =
  | 'foregut'
  | 'midgut'
  | 'hepatobiliary';

export interface DigestiveNode extends AnatomicalNode {
  digestiveTractSection: DigestiveTractSection;
  peritonealStatus: 'intraperitoneal' | 'retroperitoneal';
  isSphincter?: boolean;
}

/**
 * Catálogo canônico do Sistema Digestório Superior & Médio (Capítulo 8 da Terminologia Anatomica e FMA).
 * Abrange o esôfago, estômago segmentado (fundo/corpo e antro/piloro), fígado (lobos direito e esquerdo),
 * complexo vesicular biliar, ducto colédoco e duodeno.
 */
export const DIGESTIVE_NODES: DigestiveNode[] = [
  // ==========================================
  // TUBO DIGESTÓRIO SUPERIOR
  // ==========================================
  {
    id: 'fma:oesophagus',
    fmaId: 'FMA:7131',
    namePtBr: 'Esôfago Cervicotorácico',
    nameLatin: 'Oesophagus',
    chapter: 8,
    systemName: 'Sistema Digestório',
    meshName: 'oesophagus_tube',
    digestiveTractSection: 'foregut',
    peritonealStatus: 'retroperitoneal',
    colorHex: '#fb923c',
    explosionVector: { x: 0, y: 0.1, z: -0.2 },
    explosionMagnitudeMultiplier: 1.1,
    clinicalData: {
      origin: 'Continuação da laringofaringe ao nível da vértebra C6',
      insertion: 'Atravessa o hiato esofágico do diafragma (nível T10) até a cárdia gástrica (T11)',
      innervation: 'Plexo esofágico formado pelos troncos vagais anterior e posterior e cadeia simpática torácica',
      vascularization: 'Artérias tireóideas inferiores, ramos esofágicos da aorta torácica e gástrica esquerda',
      functionalAction: 'Condução peristáltica autônoma do bolo alimentar da orofaringe até a cavidade gástrica',
      clinicalSignificance: 'Sede de doença do refluxo gastroesofágico (DRGE), esôfago de Barrett (metaplasia intestinal), megaesôfago chagásico e varizes esofágicas por hipertensão portal.',
    },
  },
  {
    id: 'fma:gaster_fundus_corpus',
    fmaId: 'FMA:7148',
    namePtBr: 'Estômago: Fundo e Corpo Gástrico',
    nameLatin: 'Gaster - Fundus et Corpus',
    chapter: 8,
    systemName: 'Sistema Digestório',
    meshName: 'stomach_body',
    digestiveTractSection: 'foregut',
    peritonealStatus: 'intraperitoneal',
    colorHex: '#f97316',
    explosionVector: { x: -0.55, y: -0.75, z: 0.25 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Abaixo da cúpula diafragmática esquerda, contínuo com a cárdia e curvatura maior e menor',
      insertion: 'Transição distal com o antro gástrico na incisura angular da curvatura menor',
      innervation: 'Inervação parassimpática via nervos vagos (aumenta motilidade e secreção) e simpática via nervos esplâncnicos',
      vascularization: 'Artérias gástricas esquerda (tronco celíaco) e direita, gastromentais esquerda e direita',
      functionalAction: 'Reservatório mecânico e químico de quimo; produção de ácido clorídrico (HCl), pepsina e fator intrínseco pelas células parietais',
      clinicalSignificance: 'Gastrites erosivas, gastrite atrófica autoimune com anemia perniciosa por déficit de fator intrínseco e adenocarcinoma gástrico.',
    },
  },
  {
    id: 'fma:gaster_antrum_pylorus',
    fmaId: 'FMA:14561',
    namePtBr: 'Estômago: Antro Pilórico e Esfíncter Pilórico',
    nameLatin: 'Gaster - Antrum pyloricum et Pylorus',
    chapter: 8,
    systemName: 'Sistema Digestório',
    meshName: 'stomach_pylorus',
    digestiveTractSection: 'foregut',
    peritonealStatus: 'intraperitoneal',
    isSphincter: true,
    colorHex: '#ea580c',
    explosionVector: { x: -0.2, y: -0.9, z: 0.4 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Incisura angular gástrica estendendo-se até o sulco pré-pilórico',
      insertion: 'Valva e esfíncter pilórico que se abre na primeira porção do bulbo duodenal',
      functionalAction: 'Trituração e bombeamento antral com regulação neuro-hormonal do esvaziamento para o duodeno',
      clinicalSignificance: 'Sítio predominante de úlcera péptica associada a infecção por Helicobacter pylori e estenose hipertrófica do piloro em lactentes.',
    },
  },

  // ==========================================
  // COMPLEXO HEPATOBILIAR
  // ==========================================
  {
    id: 'fma:lobus_hepatis_dexter',
    fmaId: 'FMA:14656',
    namePtBr: 'Fígado: Lobo Direito',
    nameLatin: 'Lobus hepatis dexter',
    chapter: 8,
    systemName: 'Sistema Digestório',
    meshName: 'liver_lobe_right',
    digestiveTractSection: 'hepatobiliary',
    peritonealStatus: 'intraperitoneal',
    colorHex: '#b45309',
    explosionVector: { x: 0.7, y: -0.65, z: 0.35 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Ocupa a maior parte do hipocôndrio direito e flanco direito até a linha cantlie e fossa da vesícula',
      insertion: 'Contém os segmentos funcionais de Couinaud V, VI, VII e VIII com suas tríades portais',
      innervation: 'Plexo hepático derivado do plexo celíaco e tronco vagal anterior',
      vascularization: 'Duplo suprimento: Veia porta (75-80% do fluxo venoso rico em nutrientes) e Artéria hepática própria (20-25% arterial oxigenado)',
      functionalAction: 'Metabolismo de glicogênio, síntese de albumina e fatores de coagulação, desintoxicação de xenobióticos e secreção de bile',
      clinicalSignificance: 'Fígado esteatótico, cirrose hepática com shunts portossistêmicos, abscessos amebianos e carcinoma hepatocelular (CHC).',
    },
  },
  {
    id: 'fma:lobus_hepatis_sinister',
    fmaId: 'FMA:14657',
    namePtBr: 'Fígado: Lobo Esquerdo',
    nameLatin: 'Lobus hepatis sinister',
    chapter: 8,
    systemName: 'Sistema Digestório',
    meshName: 'liver_lobe_left',
    digestiveTractSection: 'hepatobiliary',
    peritonealStatus: 'intraperitoneal',
    colorHex: '#d97706',
    explosionVector: { x: 0.15, y: -0.55, z: 0.5 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Estende-se sobre o epigástrio e hipocôndrio esquerdo até a fossa gástrica',
      insertion: 'Separado do lobo direito pela fissura do ligamento redondo e ligamento falciforme (segmentos II e III)',
      functionalAction: 'Metabolismo hepático e drenagem biliar via ducto hepático esquerdo',
      clinicalSignificance: 'Lobo frequentemente preservado em transplantes hepáticos intervivos pediátricos (doador adulto de lobo lateral esquerdo).',
    },
  },
  {
    id: 'fma:vesica_biliaris',
    fmaId: 'FMA:7202',
    namePtBr: 'Vesícula Biliar e Ducto Cístico',
    nameLatin: 'Vesica biliaris et Ductus cysticus',
    chapter: 8,
    systemName: 'Sistema Digestório',
    meshName: 'gallbladder_sac',
    digestiveTractSection: 'hepatobiliary',
    peritonealStatus: 'intraperitoneal',
    colorHex: '#10b981',
    explosionVector: { x: 0.45, y: -0.85, z: 0.6 },
    explosionMagnitudeMultiplier: 1.35,
    clinicalData: {
      origin: 'Fossa cística na face visceral inferior do fígado entre os lobos direito e quadrado',
      insertion: 'O colo da vesícula estreita-se no ducto cístico com as pregas espirais (válvulas de Heister)',
      functionalAction: 'Armazenamento e concentração de até 10x da bile hepática, contraindo sob estímulo de colecistoquinina (CCK)',
      clinicalSignificance: 'Colelitíase (cálculos de colesterol ou pigmentares), colecistite aguda com sinal de Murphy positivo e pancreatite biliar.',
    },
  },
  {
    id: 'fma:ductus_choledochus',
    fmaId: 'FMA:9706',
    namePtBr: 'Ducto Colédoco (Via Biliar Principal)',
    nameLatin: 'Ductus choledochus',
    chapter: 8,
    systemName: 'Sistema Digestório',
    meshName: 'bile_duct_common',
    digestiveTractSection: 'hepatobiliary',
    peritonealStatus: 'retroperitoneal',
    colorHex: '#059669',
    explosionVector: { x: 0.35, y: -0.9, z: 0.4 },
    explosionMagnitudeMultiplier: 1.3,
    clinicalData: {
      origin: 'União do ducto hepático comum com o ducto cístico na margem livre do omento menor',
      insertion: 'Desce retroduodenal e intrapancreático para se unir ao ducto pancreático principal na ampola hepatopancreática (de Vater)',
      functionalAction: 'Condução final da bile para a luz duodenal através do esfíncter de Oddi',
      clinicalSignificance: 'Coledocolitíase com colangite aguda ascendente (Tríade de Charcot / Pêntade de Reynolds) e colangiocarcinoma.',
    },
  },
  {
    id: 'fma:duodenum',
    fmaId: 'FMA:7206',
    namePtBr: 'Duodeno: Alça Superior e Descendente',
    nameLatin: 'Duodenum',
    chapter: 8,
    systemName: 'Sistema Digestório',
    meshName: 'duodenum_loop',
    digestiveTractSection: 'midgut',
    peritonealStatus: 'retroperitoneal',
    colorHex: '#f59e0b',
    explosionVector: { x: 0.1, y: -1.05, z: 0.25 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Inicia no bulbo duodenal ao nível de L1, curvando-se em forma de "C" ao redor da cabeça do pâncreas',
      insertion: 'Transição na flexura duodenojejunal (ângulo de Treitz) ao nível de L2',
      functionalAction: 'Neutralização do quimo ácido com bicarbonato pancreático e início da absorção intestinal de ferro e cálcio',
      clinicalSignificance: 'Sítio de úlceras pépticas de parede posterior com risco de hemorragia digestiva alta maciça por erosão da artéria gastroduodenal.',
    },
  },
];

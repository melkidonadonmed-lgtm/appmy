import { AnatomicalNode } from '../types/anatomy.ts';

export type EndocrineAxis =
  | 'hypothalamic_pituitary'
  | 'thyroid_parathyroid'
  | 'adrenal';

export interface EndocrineNode extends AnatomicalNode {
  endocrineAxis: EndocrineAxis;
  hormonesSecreted: string;
}

/**
 * Catálogo canônico do Sistema Endócrino (Capítulo 11 da Terminologia Anatomica e FMA).
 * Inclui a hipófise (sela turca), glândula tireoide, paratireoides e as glândulas suprarrenais bilaterais.
 */
export const ENDOCRINE_NODES: EndocrineNode[] = [
  // ==========================================
  // EIXO HIPOTÁLAMO-HIPOFISÁRIO
  // ==========================================
  {
    id: 'fma:glandula_pituitaria',
    fmaId: 'FMA:13889',
    namePtBr: 'Hipófise (Glândula Pituitária)',
    nameLatin: 'Glandula pituitaria',
    chapter: 11,
    systemName: 'Sistema Endócrino',
    meshName: 'pituitary_gland',
    endocrineAxis: 'hypothalamic_pituitary',
    hormonesSecreted: 'Adenoipófise: GH, ACTH, TSH, FSH, LH, Prolactina; Neuro-hipófise: ADH (Vasopressina) e Ocitocina',
    colorHex: '#e11d48',
    explosionVector: { x: 0, y: 0.15, z: 0.12 },
    explosionMagnitudeMultiplier: 1.1,
    clinicalData: {
      origin: 'Fossa hipofisária da sela turca no corpo do osso esfenoide, coberta pelo diafragma da sela',
      insertion: 'Conectada ao assoalho do terceiro ventrículo (hipotálamo) através do infundíbulo hipofisário',
      innervation: 'Trato hipotálamo-hipofisário para a neuro-hipófise e fibras simpáticas perivasculares',
      vascularization: 'Artérias hipofisárias superior e inferior e sistema porta-hipofisário venoso',
      functionalAction: 'Glândula mestra coordenadora de toda a cascata hormonal periférica do organismo',
      clinicalSignificance: 'Macroadenomas hipofisários comprimem o quiasma óptico suprajacente causando hemianopsia bitemporal e pan-hipopituitarismo ou acromegalia / Síndrome de Cushing.',
    },
  },

  // ==========================================
  // COMPLEXO TIREOIDE E PARATIREOIDES
  // ==========================================
  {
    id: 'fma:glandula_thyroidea',
    fmaId: 'FMA:9603',
    namePtBr: 'Glândula Tireoide: Lobos e Istmo',
    nameLatin: 'Glandula thyroidea',
    chapter: 11,
    systemName: 'Sistema Endócrino',
    meshName: 'thyroid_gland',
    endocrineAxis: 'thyroid_parathyroid',
    hormonesSecreted: 'Tiroxina (T4), Tri-iodotironina (T3) e Calcitonina (células C parafoliculares)',
    colorHex: '#f43f5e',
    explosionVector: { x: 0, y: 0.45, z: 0.35 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Região cervical anterior infra-hióidea, abraçando a traqueia dos anéis 2 ao 4',
      insertion: 'Composta por lobos direito e esquerdo conectados pelo istmo da tireoide (frequentemente com lobo piramidal remanescente do ducto tireoglosso)',
      innervation: 'Gânglios simpáticos cervicais superior, médio e inferior',
      vascularization: 'Artérias tireóideas superiores (ramos da carótida externa) e inferiores (ramos do tronco tireocervical)',
      functionalAction: 'Regulação do metabolismo basal, termogênese, consumo de oxigênio e desenvolvimento neuronal',
      clinicalSignificance: 'Hipotireoidismo (tireoidite de Hashimoto), hipertireoidismo (doença de Graves com bócio difuso e exoftalmia) e carcinoma papilífero de tireoide.',
    },
  },
  {
    id: 'fma:glandulae_parathyroideae',
    fmaId: 'FMA:9604',
    namePtBr: 'Glândulas Paratireoides (Superiores e Inferiores)',
    nameLatin: 'Glandulae parathyroideae',
    chapter: 11,
    systemName: 'Sistema Endócrino',
    meshName: 'parathyroid_glands',
    endocrineAxis: 'thyroid_parathyroid',
    hormonesSecreted: 'Paratormônio (PTH)',
    colorHex: '#fbbf24',
    explosionVector: { x: 0.22, y: 0.48, z: 0.22 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Quatro pequenas glândulas ovoides situadas na face posterior da cápsula fascial da tireoide',
      insertion: 'Origem embriológica nas 3ª e 4ª bolsas faríngeas',
      functionalAction: 'Manutenção rigorosa da calcemia plasmática via reabsorção óssea osteoclástica, reabsorção renal de cálcio e ativação da vitamina D (1,25-di-hidroxicolecalciferol)',
      clinicalSignificance: 'Remoção iatrogênica inadvertida em tireoidectomias totais causa hipocalcemia aguda grave com tetania e sinais de Chvostek e Trousseau.',
    },
  },

  // ==========================================
  // EIXO SUPRARRENAL / ADRENAL BILATERAL
  // ==========================================
  {
    id: 'fma:glandula_suprarenalis_dextra',
    fmaId: 'FMA:9605',
    namePtBr: 'Glândula Suprarrenal (Adrenal) Direita',
    nameLatin: 'Glandula suprarenalis dextra',
    chapter: 11,
    systemName: 'Sistema Endócrino',
    meshName: 'adrenal_gland_r',
    endocrineAxis: 'adrenal',
    hormonesSecreted: 'Córtex: Aldosterona (zona glomerulosa), Cortisol (zona fasciculada), DHEA/Androgênios (zona reticular); Medula: Adrenalina e Noradrenalina',
    colorHex: '#eab308',
    explosionVector: { x: 0.65, y: -0.52, z: -0.25 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Formato piramidal cuneiforme situado sobre o polo súpero-medial do rim direito, em contato posterior com o diafragma e anterior com a VCI',
      insertion: 'Envolvida pela fáscia de Gerota, separada do rim por septo fibroso',
      innervation: 'Fibras pré-ganglionares simpáticas diretas para as células cromafins da medula adrenal',
      vascularization: 'Três artérias suprarrenais (superior da frênica inferior, média da aorta e inferior da artéria renal); drenagem venosa curta direta para a VCI',
      functionalAction: 'Resposta integrada ao estresse agudo e crônico (luta ou fuga), controle da pressão arterial e balanço eletrolítico de sódio/potássio',
      clinicalSignificance: 'Insuficiência adrenal primária (Doença de Addison), Síndrome de Cushing por adenoma adrenal e Feocromocitoma medular.',
    },
  },
  {
    id: 'fma:glandula_suprarenalis_sinistra',
    fmaId: 'FMA:9606',
    namePtBr: 'Glândula Suprarrenal (Adrenal) Esquerda',
    nameLatin: 'Glandula suprarenalis sinistra',
    chapter: 11,
    systemName: 'Sistema Endócrino',
    meshName: 'adrenal_gland_l',
    endocrineAxis: 'adrenal',
    hormonesSecreted: 'Mineralocorticoides, Glicocorticoides e Catecolaminas medulares',
    colorHex: '#eab308',
    explosionVector: { x: -0.65, y: -0.48, z: -0.25 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Formato semilunar sobre o polo medial do rim esquerdo, posterior à bolsa omental e estômago',
      insertion: 'Artérias suprarrenais superior, média e inferior; drenagem venosa via veia suprarrenal esquerda para a veia renal esquerda',
      functionalAction: 'Manutenção do tônus simpático e homeostase glicêmica sob controle do ACTH hipofisário',
      clinicalSignificance: 'Hiperaldosteronismo primário (Síndrome de Conn) com hipertensão refratária e hipocalemia, e incidentalomas adrenais em tomografias.',
    },
  },
];

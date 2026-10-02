import { AnatomicalNode } from '../types/anatomy.ts';

export type ReproductiveDimorphism =
  | 'male'
  | 'female';

export interface ReproductiveNode extends AnatomicalNode {
  reproductiveDimorphism: ReproductiveDimorphism;
  gonadalAxisFunction: string;
}

/**
 * Catálogo canônico do Sistema Reprodutor Pélvico (Capítulo 10 da Terminologia Anatomica e FMA).
 * Inclui os órgãos pélvicos masculinos (próstata, ductos deferentes, vesículas seminais e gônadas testiculares)
 * e femininos (útero, tubas uterinas e gônadas ovarianas).
 */
export const REPRODUCTIVE_NODES: ReproductiveNode[] = [
  // ==========================================
  // APARELHO REPRODUTOR MASCULINO
  // ==========================================
  {
    id: 'fma:prostata',
    fmaId: 'FMA:9601',
    namePtBr: 'Próstata e Glândulas Anexas',
    nameLatin: 'Prostata',
    chapter: 10,
    systemName: 'Sistema Reprodutor',
    meshName: 'prostate_gland',
    reproductiveDimorphism: 'male',
    gonadalAxisFunction: 'Secreção de fluido prostático levemente alcalino rico em PSA e zinco que neutraliza a acidez vaginal',
    colorHex: '#3b82f6',
    explosionVector: { x: 0, y: -1.65, z: 0.2 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Base contígua ao colo vesical e ápice repousando sobre o esfíncter urogenital estriado',
      insertion: 'Atravessada pela uretra prostática e ductos ejaculatórios; dividida nas zonas de McNeal (periférica, central, de transição e estroma fibromuscular)',
      innervation: 'Plexo prostático derivado do plexo hipogástrico inferior (fibras cavernosas para a ereção peniana)',
      vascularization: 'Artérias vesicais inferiores e ramos prostáticos da artéria retal média',
      functionalAction: 'Liquefação do coágulo seminal e motilidade espermática',
      clinicalSignificance: 'Hiperplasia prostática benigna (HPB na zona de transição causando sintomas urinários obstrutivos) e Adenocarcinoma de próstata (70% na zona periférica, palpável no toque retal).',
    },
  },
  {
    id: 'fma:ductus_deferens_vesicula',
    fmaId: 'FMA:18249',
    namePtBr: 'Ductos Deferentes e Vesículas Seminais',
    nameLatin: 'Ductus deferens et Vesicula seminalis',
    chapter: 10,
    systemName: 'Sistema Reprodutor',
    meshName: 'vas_deferens_seminal',
    reproductiveDimorphism: 'male',
    gonadalAxisFunction: 'Condução peristáltica rápida e produção de 60-70% do volume ejaculado rico em frutose e prostaglandinas',
    colorHex: '#60a5fa',
    explosionVector: { x: 0.35, y: -1.5, z: 0.05 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Continuação da cauda do epidídimo, sobe pelo canal inguinal no funículo espermático',
      insertion: 'Cruza o ureter na pelve e une-se ao ducto da vesícula seminal formando o ducto ejaculatório',
      functionalAction: 'Propulsão vigorosa de espermatozoides durante a emissão e ejaculação',
      clinicalSignificance: 'Sítio anatômico de realização da vasectomia eletiva (secção e ligadura bilateral do ducto deferente no escroto superior).',
    },
  },
  {
    id: 'fma:testis_epididymis',
    fmaId: 'FMA:7210',
    namePtBr: 'Testículos e Epidídimo',
    nameLatin: 'Testis et Epididymis',
    chapter: 10,
    systemName: 'Sistema Reprodutor',
    meshName: 'testis_gonad',
    reproductiveDimorphism: 'male',
    gonadalAxisFunction: 'Espermatogênese nos túbulos seminíferos e secreção de testosterona pelas células intersticiais de Leydig sob estímulo do LH/FSH',
    colorHex: '#93c5fd',
    explosionVector: { x: 0.25, y: -1.9, z: 0.25 },
    explosionMagnitudeMultiplier: 1.3,
    clinicalData: {
      origin: 'Desenvolvem-se no retroperitônio e descem para a bolsa escrotal pelo canal inguinal no período fetal',
      insertion: 'Envolvidos pela túnica albugínea e túnica vaginal (remanescente peritoneal)',
      innervation: 'Plexo testicular acompanhando a artéria gonadal',
      vascularization: 'Artérias testiculares diretamente da aorta abdominal L2; drenagem venosa via plexo pampiniforme (veia testicular direita na VCI, esquerda na veia renal)',
      functionalAction: 'Produção contínua de gametas masculinos e maturação funcional de mobilidade no epidídimo',
      clinicalSignificance: 'Torção testicular (emergência cirúrgica com isquemia gonadal dentro de 6h), criptorquidia e varicocele (mais comum à esquerda por razões hemodinâmicas).',
    },
  },

  // ==========================================
  // APARELHO REPRODUTOR FEMININO
  // ==========================================
  {
    id: 'fma:uterus',
    fmaId: 'FMA:17558',
    namePtBr: 'Útero: Fundo, Corpo e Colo Uterino',
    nameLatin: 'Uterus',
    chapter: 10,
    systemName: 'Sistema Reprodutor',
    meshName: 'uterus_organ',
    reproductiveDimorphism: 'female',
    gonadalAxisFunction: 'Acomodação, implantação embrionária e contratilidade miometrial na expulsão do feto',
    colorHex: '#ec4899',
    explosionVector: { x: 0, y: -1.45, z: 0.15 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Órgão muscular oco piriforme situado na pelve menor, entre a bexiga urinária anteriormente e o reto posteriormente',
      insertion: 'Sustentado pelos ligamentos cardinais (de Mackenrodt), uterossacros e ligamento largo do útero',
      innervation: 'Plexo uterovaginal derivado do plexo hipogástrico inferior',
      vascularization: 'Artérias uterinas (ramos da artéria ilíaca interna que cruzam os ureteres superiormente — "água corre sob a ponte")',
      functionalAction: 'Ciclo endometrial proliferativo/secretor menstrual e hipertrofia extrema na gestação',
      clinicalSignificance: 'Leiomiomas uterinos (miomas), endometriose, adenomiose e carcinoma de colo de útero prevenível via exame citopatológico (Papanicolaou) de rastreamento de HPV.',
    },
  },
  {
    id: 'fma:tuba_uterina',
    fmaId: 'FMA:17565',
    namePtBr: 'Tubas Uterinas (Trompas de Falópio)',
    nameLatin: 'Tuba uterina',
    chapter: 10,
    systemName: 'Sistema Reprodutor',
    meshName: 'fallopian_tubes',
    reproductiveDimorphism: 'female',
    gonadalAxisFunction: 'Captação do ovócito secundário pelas fímbrias e sítio anatômico de fertilização na ampola',
    colorHex: '#f472b6',
    explosionVector: { x: 0.55, y: -1.35, z: 0.1 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Estendem-se lateralmente dos cornos uterinos abrindo-se na cavidade peritoneal adjacente aos ovários',
      insertion: 'Segmentadas em porção uterina intramural, istmo, ampola e infundíbulo com fímbrias (fímbria ovárica aderida ao ovário)',
      functionalAction: 'Transporte ciliar e peristáltico do zigoto fecundado em direção à cavidade endometrial',
      clinicalSignificance: 'Gravidez ectópica tubária (sítio de mais de 95% das gestações ectópicas, com risco de rotura tubária e choque hemorrágico) e salpingite/DIP.',
    },
  },
  {
    id: 'fma:ovarium',
    fmaId: 'FMA:7213',
    namePtBr: 'Ovários Bilaterais (Gônadas Femininas)',
    nameLatin: 'Ovarium',
    chapter: 10,
    systemName: 'Sistema Reprodutor',
    meshName: 'ovary_gonad',
    reproductiveDimorphism: 'female',
    gonadalAxisFunction: 'Foliculogênese cíclica mensal e síntese de esteroides sexuais femininos (estrogênios e progesterona)',
    colorHex: '#fb7185',
    explosionVector: { x: 0.7, y: -1.4, z: 0.0 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Fossa ovárica na parede pélvica lateral, suspensos pelo ligamento suspensor do ovário (infundibulopélvico) e ligamento próprio do ovário',
      insertion: 'Único órgão verdadeiramente intraperitoneal não recoberto por peritônio parietal (revestido pelo epitélio germinativo)',
      innervation: 'Plexo ovárico derivado do plexo aórtico e renal',
      vascularization: 'Artérias ováricas originadas da aorta abdominal ao nível de L2; drenagem venosa ovárica direta na VCI à direita e veia renal à esquerda',
      functionalAction: 'Ovulação cíclica periódica e manutenção do endométrio secretor gestacional pelo corpo lúteo',
      clinicalSignificance: 'Síndrome dos ovários policísticos (SOP), cistos foliculares funcionais, torção ovariana e neoplasias epiteliais ovarianas.',
    },
  },
];

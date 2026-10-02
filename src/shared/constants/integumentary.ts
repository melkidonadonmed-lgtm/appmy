import { AnatomicalNode } from '../types/anatomy.ts';

export interface IntegumentaryNode extends AnatomicalNode {
  chapter: 14;
  systemName: 'Sistema Tegumentar';
  paired?: boolean;
  layerDepth: 3; // Camada mais externa
}

/**
 * Catálogo canônico do Capítulo 14 da Terminologia Anatomica (IFAA) e Foundational Model of Anatomy (FMA):
 * Tegumento Comum (Integumentum commune) - Pele, Fáscias e Tecido Subcutâneo.
 */
export const INTEGUMENTARY_NODES: IntegumentaryNode[] = [
  // 1. Pele e Epiderme Crânio-Facial
  {
    id: 'fma:facial_cranial_skin',
    fmaId: 'FMA:7163',
    namePtBr: 'Pele e Epiderme Crânio-Facial',
    nameLatin: 'Cutis capitis et faciei',
    chapter: 14,
    systemName: 'Sistema Tegumentar',
    paired: false,
    meshName: 'facial_cranial_skin',
    colorHex: '#fed7aa', // Tom de pele sutil/translúcido
    explosionVector: { x: 0, y: 0.4, z: 0.8 },
    explosionMagnitudeMultiplier: 1.4,
    layerDepth: 3,
    clinicalData: {
      origin: 'Camada epitelial estratificada queratinizada (epiderme) e conjuntiva densa (derme) cobrindo todo o arcabouço facial.',
      innervation: 'Nervo trigêmeo (NC V) em suas 3 divisões sensitivas: oftálmica (V1), maxilar (V2) e mandibular (V3).',
      vascularization: 'Artéria facial, artéria temporal superficial e ramos da artéria oftálmica (supratroclear e supraorbital).',
      functionalAction: 'Barreira física contra patógenos, termorregulação por sudorese e rica sensibilidade somatossensorial.',
      clinicalSignificance: 'Linhas de clivagem de Langer ditam a orientação de incisões eletivas para cicatrizes mínimas. Sítio prevalente de carcinomas basocelular e espinocelular por fotoexposição ultravioleta.',
    },
  },

  // 2. Gálea Aponeurótica do Escalpelo
  {
    id: 'fma:galea_aponeurotica',
    fmaId: 'FMA:46554',
    namePtBr: 'Gálea Aponeurótica (Escalpelo)',
    nameLatin: 'Galea aponeurotica (Epicranium)',
    chapter: 14,
    systemName: 'Sistema Tegumentar',
    paired: false,
    meshName: 'galea_aponeurotica',
    colorHex: '#e0e7ff',
    explosionVector: { x: 0, y: 0.9, z: -0.1 },
    explosionMagnitudeMultiplier: 1.3,
    layerDepth: 3,
    clinicalData: {
      origin: 'Lâmina tendínea fibrosa contínua unindo o ventre frontal e occipital do músculo occipitofrontal.',
      innervation: 'Nervo facial (NC VII - ramos temporal e auricular posterior).',
      vascularization: 'Ramos das artérias occipital e temporal superficial.',
      functionalAction: 'Movimentação em bloco do couro cabeludo sobre o pericrânio e expressão de espanto/elevação das sobrancelhas.',
      clinicalSignificance: 'Compõe a camada "A" do acrônimo cirúrgico SCALP. O tecido conjuntivo frouxo subaponeurótico ("L") é a "área perigosa da cabeça", onde hematomas e infecções se propagam livremente até os olhos e seios venosos durais via veias emissárias.',
    },
  },

  // 3. Pele Nasal e Periorbital
  {
    id: 'fma:periorbital_nasal_skin',
    fmaId: 'FMA:70544',
    namePtBr: 'Pele Nasal e Periorbital',
    nameLatin: 'Cutis periorbitalis et nasalis',
    chapter: 14,
    systemName: 'Sistema Tegumentar',
    paired: false,
    meshName: 'periorbital_nasal_skin',
    colorHex: '#fdba74',
    explosionVector: { x: 0, y: 0.1, z: 1.2 },
    explosionMagnitudeMultiplier: 1.3,
    layerDepth: 3,
    clinicalData: {
      origin: 'Revestimento tegumentar da pirâmide nasal e pálpebras superior/inferior.',
      innervation: 'Nervo infratroclear, nervo nasal externo e nervo infraorbital (NC V2).',
      vascularization: 'Artéria angular (ramo terminal da artéria facial) anastomosada com a artéria dorsal do nariz.',
      functionalAction: 'Proteção do bulbo ocular, oclusão palpebral reflexa e acomodação da mobilidade do orifício nasal.',
      clinicalSignificance: 'A pele palpebral é a mais delgada do corpo humano (~0.5 mm), suscetível a equimoses ("olhos de guaxinim" nas fraturas de base de crânio anterior) e blefarite.',
    },
  },

  // 4. Tecido Subcutâneo e Fáscias Faciais
  {
    id: 'fma:subcutaneous_fascia',
    fmaId: 'FMA:9630',
    namePtBr: 'Tecido Subcutâneo e Fáscia Superficial (SMAS)',
    nameLatin: 'Tela subcutanea et Fascia superficialis (SMAS)',
    chapter: 14,
    systemName: 'Sistema Tegumentar',
    paired: false,
    meshName: 'subcutaneous_fascia',
    colorHex: '#fef08a',
    explosionVector: { x: 0.5, y: -0.2, z: 0.7 },
    explosionMagnitudeMultiplier: 1.2,
    layerDepth: 3,
    clinicalData: {
      origin: 'Coxins adiposos faciais e sistema músculo-aponeurótico superficial (SMAS) subjacente à derme.',
      innervation: 'Ramos terminais motores do nervo facial (NC VII) transitam profundamente ao SMAS.',
      vascularization: 'Plexo vascular subdérmico fascial.',
      functionalAction: 'Amortecimento mecânico, preenchimento estético e transmissão do tônus muscular mímico à pele.',
      clinicalSignificance: 'O corpo adiposo da bochecha (coxim de Bichat) atua na sucção do recém-nascido e é foco de bichectomias estéticas. O SMAS é o plano anatômico primordial em ritidoplastias (facelift) para reposicionamento dos tecidos caídos.',
    },
  },
];

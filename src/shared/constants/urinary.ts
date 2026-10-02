import { AnatomicalNode } from '../types/anatomy.ts';

export type UrinaryRegion =
  | 'kidney_parenchyma'
  | 'collecting_system'
  | 'lower_urinary_tract';

export interface UrinaryNode extends AnatomicalNode {
  urinaryRegion: UrinaryRegion;
  kidneySide?: 'right' | 'left';
  hasConstrictionPoints?: boolean;
}

/**
 * Catálogo canônico do Sistema Urinário (Capítulo 9 da Terminologia Anatomica e FMA).
 * Abrange o parênquima renal bilateral (córtex e medula com pirâmides de Malpighi),
 * pelve renal, ureteres condutores retroperitoneais e a bexiga com trígono vesical.
 */
export const URINARY_NODES: UrinaryNode[] = [
  // ==========================================
  // PARÊNQUIMA RENAL BILATERAL (RINS)
  // ==========================================
  {
    id: 'fma:ren_dexter',
    fmaId: 'FMA:7203',
    namePtBr: 'Rim Direito: Córtex e Parênquima',
    nameLatin: 'Ren dexter',
    chapter: 9,
    systemName: 'Sistema Urinário',
    meshName: 'kidney_right',
    urinaryRegion: 'kidney_parenchyma',
    kidneySide: 'right',
    colorHex: '#854d0e',
    explosionVector: { x: 0.65, y: -0.75, z: -0.25 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Espaço retroperitoneal paravertebral direito ao nível de T12 a L3 (mais baixo devido ao lobo hepático direito)',
      insertion: 'Envolvido pela fáscia renal de Gerota e cápsula adiposa perirrenal',
      innervation: 'Plexo renal derivado dos nervos esplâncnicos menor e imo e gânglio aorticorrenal',
      vascularization: 'Artéria renal direita (passa posteriormente à veia cava inferior) e veia renal direita',
      functionalAction: 'Ultrafiltração glomerular plasmática, balanço hidroeletrolítico, produção de eritropoietina (EPO) e renina',
      clinicalSignificance: 'Sítio de carcinoma de células renais (CCR de células claras), glomerulonefrites e traumatismos por contusão em flanco.',
    },
  },
  {
    id: 'fma:ren_sinister',
    fmaId: 'FMA:7204',
    namePtBr: 'Rim Esquerdo: Córtex e Parênquima',
    nameLatin: 'Ren sinister',
    chapter: 9,
    systemName: 'Sistema Urinário',
    meshName: 'kidney_left',
    urinaryRegion: 'kidney_parenchyma',
    kidneySide: 'left',
    colorHex: '#854d0e',
    explosionVector: { x: -0.65, y: -0.7, z: -0.25 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Espaço retroperitoneal paravertebral esquerdo ao nível de T11 a L2 (mais elevado, em contato com o baço e cauda pancreática)',
      insertion: 'Fixado à parede posterior do tronco pela gordura pararrenal e fáscia de Gerota',
      innervation: 'Plexo renal e fibras vasomotoras simpáticas',
      vascularization: 'Artéria renal esquerda (mais curta) e veia renal esquerda (mais longa, cruza a aorta anterior sob a pinça mesentérica)',
      functionalAction: 'Filtração glomerular e regulação da volemia sistêmica',
      clinicalSignificance: 'Síndrome do Quebra-Nozes (compressão da veia renal esquerda entre a aorta abdominal e a artéria mesentérica superior gerando hematúria e varicocele esquerda).',
    },
  },
  {
    id: 'fma:medulla_renalis',
    fmaId: 'FMA:15610',
    namePtBr: 'Medula Renal e Pirâmides de Malpighi',
    nameLatin: 'Medulla renalis et Pyramides renales',
    chapter: 9,
    systemName: 'Sistema Urinário',
    meshName: 'kidney_medulla_pyramids',
    urinaryRegion: 'kidney_parenchyma',
    colorHex: '#a16207',
    explosionVector: { x: 0.0, y: -0.72, z: -0.3 },
    explosionMagnitudeMultiplier: 1.1,
    clinicalData: {
      origin: 'Interior do seio renal, composta por 8 a 18 pirâmides cônicas estriadas separadas pelas colunas renais de Bertin',
      insertion: 'Vértices das pirâmides formam as papilas renais que desembocam nos cálices menores',
      functionalAction: 'Hiperosmolaridade contracorrente nas alças de Henle e ductos coletores para concentração máxima da urina sob ação do ADH',
      clinicalSignificance: 'Necrose de papila renal associada ao uso crônico de anti-inflamatórios não esteroides (AINEs), nefropatia falciforme e diabetes mellitus descompensado.',
    },
  },

  // ==========================================
  // SISTEMA COLETOR E CONDUTOR (PELVE E URETERES)
  // ==========================================
  {
    id: 'fma:pelvis_renalis',
    fmaId: 'FMA:15622',
    namePtBr: 'Pelve Renal e Cálices Coletores',
    nameLatin: 'Pelvis renalis et Calices',
    chapter: 9,
    systemName: 'Sistema Urinário',
    meshName: 'renal_pelvis',
    urinaryRegion: 'collecting_system',
    colorHex: '#ca8a04',
    explosionVector: { x: 0.25, y: -0.78, z: -0.15 },
    explosionMagnitudeMultiplier: 1.15,
    clinicalData: {
      origin: 'Confluência dos cálices maiores no hilo renal posterior aos vasos renais',
      insertion: 'Estreita-se no vértice inferior para formar a junção ureteropélvica (JUP)',
      functionalAction: 'Coleta inicial e afunilamento peristáltico da urina para o ureter proximal',
      clinicalSignificance: 'Sítio de hidronefrose por estenose da JUP e alojamento de cálculos coraliformes (estruvita por Proteus mirabilis).',
    },
  },
  {
    id: 'fma:ureter_dexter',
    fmaId: 'FMA:15900',
    namePtBr: 'Ureter Direito Retroperitoneal',
    nameLatin: 'Ureter dexter',
    chapter: 9,
    systemName: 'Sistema Urinário',
    meshName: 'ureter_tube_r',
    urinaryRegion: 'collecting_system',
    kidneySide: 'right',
    hasConstrictionPoints: true,
    colorHex: '#eab308',
    explosionVector: { x: 0.45, y: -1.05, z: -0.1 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Junção ureteropélvica (JUP) no hilo renal direito',
      insertion: 'Desce sobre o músculo psoas maior, cruza os vasos ilíacos externos e penetra na parede póstero-lateral da bexiga (JUV)',
      innervation: 'Plexos renal, aórtico e hipogástrico superior',
      vascularization: 'Ramos das artérias renais, gonadais, ilíacas comuns e vesicais inferiores',
      functionalAction: 'Ondas peristálticas ativas da musculatura lisa que transportam jatos urinários contra a pressão intraluminal',
      clinicalSignificance: 'Cólicas nefréticas intensas causadas por impactação de cálculos nos 3 pontos de constrição fisiológica (JUP, cruzamento ilíaco e JUV).',
    },
  },
  {
    id: 'fma:ureter_sinister',
    fmaId: 'FMA:15901',
    namePtBr: 'Ureter Esquerdo Retroperitoneal',
    nameLatin: 'Ureter sinister',
    chapter: 9,
    systemName: 'Sistema Urinário',
    meshName: 'ureter_tube_l',
    urinaryRegion: 'collecting_system',
    kidneySide: 'left',
    hasConstrictionPoints: true,
    colorHex: '#eab308',
    explosionVector: { x: -0.45, y: -1.05, z: -0.1 },
    explosionMagnitudeMultiplier: 1.2,
    clinicalData: {
      origin: 'Junção ureteropélvica (JUP) no hilo renal esquerdo',
      insertion: 'Passa posteriormente ao cólon descendente e mesocólon sigmoide até o trígono vesical',
      functionalAction: 'Condução peristáltica da urina para a cavidade pélvica',
      clinicalSignificance: 'Risco de lesão iatrogênica em cirurgias ginecológicas (histerectomia) e colectomias esquerdas devido à íntima relação anatômica com os vasos uterinos.',
    },
  },

  // ==========================================
  // TRATO URINÁRIO INFERIOR (BEXIGA URINÁRIA)
  // ==========================================
  {
    id: 'fma:vesica_urinaria',
    fmaId: 'FMA:15902',
    namePtBr: 'Bexiga Urinária: Corpo e Músculo Detrusor',
    nameLatin: 'Vesica urinaria',
    chapter: 9,
    systemName: 'Sistema Urinário',
    meshName: 'urinary_bladder_body',
    urinaryRegion: 'lower_urinary_tract',
    colorHex: '#facc15',
    explosionVector: { x: 0.0, y: -1.35, z: 0.2 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Situada na pelve menor, posterior à sínfise púbica (espaço retropúbico de Retzius)',
      insertion: 'Cúpula vesical coberta pelo peritônio parietal; o ápice conecta-se ao umbigo pelo ligamento umbilical mediano (úracu)',
      innervation: 'Parassimpático (nervos esplâncnicos pélvicos S2-S4 que contraem o detrusor) e simpático (relaxa detrusor e fecha colo)',
      vascularization: 'Artérias vesicais superiores (ramos da artéria umbilical patente) e vesicais inferiores',
      functionalAction: 'Reservatório expansível de alta complacência com capacidade fisiológica média de 400 a 500 mL',
      clinicalSignificance: 'Cistite bacteriana (especialmente por Escherichia coli), bexiga neurogênica pós-TRM e carcinoma urotelial de bexiga.',
    },
  },
  {
    id: 'fma:trigonum_vesicae',
    fmaId: 'FMA:15903',
    namePtBr: 'Trígono Vesical e Esfíncter Uretral Interno',
    nameLatin: 'Trigonum vesicae et Cervix',
    chapter: 9,
    systemName: 'Sistema Urinário',
    meshName: 'bladder_trigone',
    urinaryRegion: 'lower_urinary_tract',
    colorHex: '#f59e0b',
    explosionVector: { x: 0.0, y: -1.5, z: 0.15 },
    explosionMagnitudeMultiplier: 1.25,
    clinicalData: {
      origin: 'Base interna da bexiga, delimitada triangularmente pelos dois óstios ureterais e pelo óstio interno da uretra',
      insertion: 'Mucosa lisa e aderida firmemente à camada muscular subjacente sem pregas',
      functionalAction: 'Mecanismo de válvula antirrefluxo vesicoureteral e controle involuntário do colo vesical na continência',
      clinicalSignificance: 'Refluxo vesicoureteral (RVU) na infância com pielonefrites de repetição e ponto de biópsia diagnóstica em cistoscopias.',
    },
  },
];

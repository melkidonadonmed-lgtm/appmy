import { AnatomicalNode } from '../types/anatomy.ts';

export interface SensoryNode extends AnatomicalNode {
  chapter: 13;
  systemName: 'Órgãos dos Sentidos';
  sensoryType: 'visual' | 'auditory_vestibular';
  paired: boolean;
}

/**
 * Catálogo canônico do Capítulo 13 da Terminologia Anatomica (IFAA) e Foundational Model of Anatomy (FMA):
 * Órgãos dos Sentidos (Organa sensuum) - Aparelho Visual e Aparelho Vestibulococlear.
 */
export const SENSORY_NODES: SensoryNode[] = [
  // 1. Aparelho Visual: Bulbo Ocular Direito
  {
    id: 'fma:eyeball_r',
    fmaId: 'FMA:58296',
    namePtBr: 'Bulbo Ocular Direito',
    nameLatin: 'Bulbus oculi dexter',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'visual',
    paired: true,
    meshName: 'eyeball_r',
    colorHex: '#e2e8f0', // Esclera branca
    explosionVector: { x: 0.8, y: 0.2, z: 1.5 },
    explosionMagnitudeMultiplier: 1.3,
    layerDepth: 2,
    clinicalData: {
      origin: 'Alojado na órbita craniana óssea direita, envolto pela cápsula de Tenon e coxim adiposo orbitário.',
      innervation: 'Nervo óptico (NC II) sensorial; nervo oculomotor (NC III) parassimpático esfincteriano.',
      vascularization: 'Artéria oftálmica (ramo da artéria carótida interna) e veias oftálmicas.',
      functionalAction: 'Recepção, focalização de fótons e transdução fotoelétrica retiniana.',
      clinicalSignificance: 'Vulnerável a traumas orbitários, glaucoma por elevação da pressão intraocular (PIO > 21 mmHg) e neuropatia óptica isquêmica.',
    },
  },

  // 2. Aparelho Visual: Bulbo Ocular Esquerdo
  {
    id: 'fma:eyeball_l',
    fmaId: 'FMA:58297',
    namePtBr: 'Bulbo Ocular Esquerdo',
    nameLatin: 'Bulbus oculi sinister',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'visual',
    paired: true,
    meshName: 'eyeball_l',
    colorHex: '#e2e8f0',
    explosionVector: { x: -0.8, y: 0.2, z: 1.5 },
    explosionMagnitudeMultiplier: 1.3,
    layerDepth: 2,
    clinicalData: {
      origin: 'Alojado na cavidade orbitária óssea esquerda, em íntima relação com o canal óptico e fissura orbitária superior.',
      innervation: 'Nervo óptico (NC II) sensorial; nervos ciliares curtos e longos.',
      vascularization: 'Artéria central da retina (ramo terminal da oftálmica).',
      functionalAction: 'Captação visual bilateral e formação de visão estereoscópica tridimensional.',
      clinicalSignificance: 'A oclusão da artéria central da retina produz amaurose súbita indolor com palidez retiniana e mancha vermelho-cereja.',
    },
  },

  // 3. Córnea Bilateral
  {
    id: 'fma:cornea',
    fmaId: 'FMA:58238',
    namePtBr: 'Córnea (Túnica Fibrosa Anterior)',
    nameLatin: 'Cornea',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'visual',
    paired: true,
    meshName: 'cornea',
    colorHex: '#38bdf8', // Translúcido refrativo
    explosionVector: { x: 0, y: 0.2, z: 1.8 },
    explosionMagnitudeMultiplier: 1.4,
    layerDepth: 3,
    clinicalData: {
      origin: 'Porção anterior modificada da túnica fibrosa ocular, transparente e avascular.',
      innervation: 'Nervo oftálmico (NC V1 - ramos ciliares) altamente inervada com nociceptores táteis.',
      vascularization: 'Avascular; nutre-se por difusão do humor aquoso na câmara anterior e filme lacrimal.',
      functionalAction: 'Principal elemento refrativo do olho humano, responsável por cerca de 43 das 60 dioptrias totais.',
      clinicalSignificance: 'Sítio do reflexo corneopalpebral (aferência NC V1, eferência motora NC VII). Patologias incluem ceratocone, úlceras infecciosas e ceratite herpética.',
    },
  },

  // 4. Cristalino / Lente Ocular
  {
    id: 'fma:lens',
    fmaId: 'FMA:58241',
    namePtBr: 'Cristalino (Lente Biconvexa)',
    nameLatin: 'Lens',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'visual',
    paired: true,
    meshName: 'lens',
    colorHex: '#93c5fd',
    explosionVector: { x: 0, y: 0.2, z: 1.6 },
    explosionMagnitudeMultiplier: 1.3,
    layerDepth: 2,
    clinicalData: {
      origin: 'Suspenso atrás da íris e pupila pelas fibras zonulares de Zinn conectadas ao corpo ciliar.',
      innervation: 'Controle de acomodação mediado por fibras parassimpáticas pós-ganglionares do nervo oculomotor (NC III).',
      vascularization: 'Totalmente avascular; nutrido pelo fluxo contínuo do humor aquoso.',
      functionalAction: 'Mecanismo de acomodação visual dinâmica para focalização nítida de objetos próximos e distantes na retina.',
      clinicalSignificance: 'Opacificação progressiva das proteínas cristalinas caracteriza a catarata senil, reversível cirurgicamente por facoemulsificação com implante de LIO.',
    },
  },

  // 5. Retina e Túnica Nervosa
  {
    id: 'fma:retina',
    fmaId: 'FMA:58243',
    namePtBr: 'Retina (Túnica Interna Sensorial)',
    nameLatin: 'Retina',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'visual',
    paired: true,
    meshName: 'retina',
    colorHex: '#f59e0b',
    explosionVector: { x: 0, y: 0.15, z: 1.2 },
    explosionMagnitudeMultiplier: 1.2,
    layerDepth: 1,
    clinicalData: {
      origin: 'Derivado neuroectodérmico do cálice óptico, revestindo internamente as três quartas partes posteriores do bulbo.',
      innervation: 'Camadas de fotorreceptores (bastonetes para visão escotópica, cones para cores e alta acuidade macular).',
      vascularization: 'Artéria e veia central da retina suplementadas pelos capilares da coroide (coriocapilar).',
      functionalAction: 'Fototransdução e processamento neural primário de contraste e cor transmitidos pelos axônios ganglionares.',
      clinicalSignificance: 'A mácula lútea e fóvea central determinam a visão de alta resolução. Descolamento de retina (separação do epitélio pigmentar) exige intervenção cirúrgica de urgência.',
    },
  },

  // 6. Nervos Ópticos e Quiasma Óptico
  {
    id: 'fma:optic_chiasm_tract',
    fmaId: 'FMA:50862',
    namePtBr: 'Nervo Óptico (NC II) e Quiasma Óptico',
    nameLatin: 'Nervus opticus et Chiasma opticum',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'visual',
    paired: false,
    meshName: 'optic_chiasm_tract',
    colorHex: '#fbbf24',
    explosionVector: { x: 0, y: 0.1, z: 0.9 },
    explosionMagnitudeMultiplier: 1.0,
    layerDepth: 1,
    clinicalData: {
      origin: 'Confluência dos axônios das células ganglionares retinianas que atravessam a lâmina crivosa escleral e o canal óptico.',
      innervation: 'Segundo par craniano (NC II), envolto pelas três bainhas meníngeas (dura-máter, aracnoide e pia-máter).',
      vascularization: 'Ramos piais da artéria cerebral anterior e artéria oftálmica.',
      functionalAction: 'Decussação das fibras nasais (responsáveis pelo campo temporal contralateral) e projeção aos corpos geniculados laterais.',
      clinicalSignificance: 'Compressão do quiasma por adenoma de hipófise produz o déficit campimétrico clássico: hemianopsia bitemporal heterônima.',
    },
  },

  // 7. Músculos Extraoculares da Órbita
  {
    id: 'fma:extraocular_muscles',
    fmaId: 'FMA:49035',
    namePtBr: 'Músculos Extraoculares da Órbita',
    nameLatin: 'Musculi externi bulbi oculi',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'visual',
    paired: true,
    meshName: 'extraocular_muscles',
    colorHex: '#ef4444',
    explosionVector: { x: 0, y: 0.3, z: 1.4 },
    explosionMagnitudeMultiplier: 1.3,
    layerDepth: 2,
    clinicalData: {
      origin: 'Anel tendíneo comum (de Zinn) no ápice da órbita.',
      insertion: 'Esclera anterior ao equador do bulbo ocular.',
      innervation: 'Reto lateral pelo NC VI (abducente); oblíquo superior pelo NC IV (troclear); retos medial, superior, inferior e oblíquo inferior pelo NC III (oculomotor).',
      functionalAction: 'Movimentação conjugada precisa dos olhos: abdução, adução, elevação, depressão e torção intorsional/extorsional.',
      clinicalSignificance: 'Lesões do NC VI provocam estrabismo convergente com diplopia horizontal; lesões do NC III resultam em ptose, midríase e olho desviado "para baixo e para fora".',
    },
  },

  // 8. Orelha Média e Cadeia Ossicular
  {
    id: 'fma:middle_ear_ossicles',
    fmaId: 'FMA:52748',
    namePtBr: 'Cadeia Ossicular da Orelha Média (Martelo, Bigorna e Estribo)',
    nameLatin: 'Ossicula auditus (Malleus, Incus et Stapes)',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'auditory_vestibular',
    paired: true,
    meshName: 'middle_ear_ossicles',
    colorHex: '#fde047',
    explosionVector: { x: 1.3, y: 0.1, z: -0.2 },
    explosionMagnitudeMultiplier: 1.5,
    layerDepth: 2,
    clinicalData: {
      origin: 'Cavidade timpânica escavada no interior da porção petrosa do osso temporal.',
      innervation: 'Músculo tensor do tímpano (NC V3 mandibular); músculo estapédio (NC VII facial).',
      vascularization: 'Artérias timpânica anterior, estilo-mastoídea e petrosa superficial.',
      functionalAction: 'Transformação mecânica da vibração aérea timpânica em ondas de pressão hidráulica no líquido da perilinfa com ganho de impedância de 22:1.',
      clinicalSignificance: 'Fixação do estribo por osteodistrofia (otosclerose) é causa primária de perda auditiva de condução progressiva em adultos jovens.',
    },
  },

  // 9. Orelha Interna e Labirinto Ósseo
  {
    id: 'fma:inner_ear_labyrinth',
    fmaId: 'FMA:60907',
    namePtBr: 'Labirinto Ósseo da Orelha Interna (Cóclea e Canais Semicirculares)',
    nameLatin: 'Labyrinthus osseus (Cochlea et Canales semicirculares)',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'auditory_vestibular',
    paired: true,
    meshName: 'inner_ear_labyrinth',
    colorHex: '#38bdf8',
    explosionVector: { x: 1.1, y: 0.15, z: -0.3 },
    explosionMagnitudeMultiplier: 1.4,
    layerDepth: 1,
    clinicalData: {
      origin: 'Encravado profundamente na pirâmide do rochedo temporal, delimitando perilinfa e endolinfa.',
      innervation: 'Nervo vestibulococlear (NC VIII): gânglio espiral de Corti e gânglio vestibular de Scarpa.',
      vascularization: 'Artéria labiríntica (ramo da AICA - artéria cerebelar anteroinferior ou basilar).',
      functionalAction: 'Tonotopia coclear (frequências agudas na base, graves no ápice) e detecção tridimensional de aceleração angular nos canais semicirculares.',
      clinicalSignificance: 'Deslocamento de otólitos da mácula do utrículo para o canal semicircular posterior desencadeia a Vertigem Posicional Paroxística Benigna (VPPB), tratada com manobra de Epley.',
    },
  },

  // 10. Nervo Vestibulococlear (NC VIII)
  {
    id: 'fma:vestibulocochlear_nerve',
    fmaId: 'FMA:50868',
    namePtBr: 'Nervo Vestibulococlear (NC VIII)',
    nameLatin: 'Nervus vestibulocochlearis',
    chapter: 13,
    systemName: 'Órgãos dos Sentidos',
    sensoryType: 'auditory_vestibular',
    paired: true,
    meshName: 'vestibulocochlear_nerve',
    colorHex: '#a855f7',
    explosionVector: { x: 0.9, y: 0.05, z: -0.4 },
    explosionMagnitudeMultiplier: 1.2,
    layerDepth: 1,
    clinicalData: {
      origin: 'Emerge do sulco bulhopontino no ângulo pontocerebelar e penetra no meato acústico interno.',
      innervation: 'Fibras aferentes somáticas especiais puras (sensoriais da audição e equilíbrio).',
      vascularization: 'Artéria labiríntica.',
      functionalAction: 'Condução de potenciais de ação auditivos aos núcleos cocleares e vestibulares do tronco encefálico.',
      clinicalSignificance: 'Neurinoma do acústico (Schwannoma vestibular) causa hipoacusia neurossensorial unilateral progressiva, zumbido e instabilidade de marcha.',
    },
  },
];

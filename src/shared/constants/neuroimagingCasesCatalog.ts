import {
  HounsfieldScaleEntry,
  IntracranialHemorrhageEntry,
  AspectsRegionEntry,
  AspectsCalculationResult,
  HerniationRedFlagEntry,
  ClinicalSimulationCase,
} from '../types/neuroClinical.ts';

/**
 * Módulos 1 e 3 — Guia Parametrizado de Neuroimagem (TC de Crânio Sem Contraste,
 * Escala UH, Sangramentos Intracranianos, Calculadora ASPECTS e Red Flags)
 * e Simulador de Casos Clínicos (Motor de Raciocínio Topográfico).
 */

export const HOUNSFIELD_SCALE_ENTRIES: HounsfieldScaleEntry[] = [
  {
    id: 'hu_air',
    substanceOrTissue: 'Ar (Seios paranasais, células mastoideas, pneumoencéfalo)',
    huRange: '-1000 UH',
    radiologicalAppearance: 'Preto absoluto (Hipodenso extremo)',
    clinicalNote: 'Presença de bolhas de -1000 UH dentro da cavidade craniana indica pneumoencéfalo (fratura aberta ou de base de crânio comunicando com seios paranasais/mastoide).',
  },
  {
    id: 'hu_fat',
    substanceOrTissue: 'Gordura (Tecido adiposo subcutâneo e intraorbitário)',
    huRange: '-50 a -100 UH',
    radiologicalAppearance: 'Cinza muito escuro / Quase preto',
    clinicalNote: 'Útil para identificar cistos dermoides ou lipomas do corpo caloso.',
  },
  {
    id: 'hu_csf',
    substanceOrTissue: 'Líquor (LCR nos ventrículos, cisternas e sulcos)',
    huRange: '0 a +15 UH',
    radiologicalAppearance: 'Hipodenso (Cinza escuro homogêneo)',
    clinicalNote: 'Edema citotóxico isquêmico estabelecido e áreas de encefalomalácia antiga aproximam-se progressivamente da densidade liquórica.',
  },
  {
    id: 'hu_white_matter',
    substanceOrTissue: 'Substância Branca (Coroa radiada, cápsula interna, corpo caloso)',
    huRange: '+20 a +30 UH',
    radiologicalAppearance: 'Cinza intermediário escuro',
    clinicalNote: 'Mais hipodensa que o córtex devido ao alto teor lipídico das bainhas de mielina.',
  },
  {
    id: 'hu_gray_matter',
    substanceOrTissue: 'Substância Cinzenta (Córtex cerebral, Tálamo e Núcleos da Base)',
    huRange: '+35 a +45 UH',
    radiologicalAppearance: 'Cinza claro',
    clinicalNote: 'Mais hiperdensa que a substância branca por maior densidade de corpos neuronais e leito capilar. A perda dessa diferenciação é sinal precoce de AVC isquêmico.',
  },
  {
    id: 'hu_acute_blood',
    substanceOrTissue: 'Sangue Agudo / Coágulo Recente (< 72 horas)',
    huRange: '+50 a +80 UH',
    radiologicalAppearance: 'Branco brilhante (Hiperdenso)',
    clinicalNote: 'A hiperdensidade decorre da retração do coágulo e alta concentração proteica da globina (hemoglobina). Permite descartar hemorragia aguda imediatamente na TC sem contraste.',
  },
  {
    id: 'hu_bone_calcification',
    substanceOrTissue: 'Calcificações Fisiológicas (Pineal, Plexo Coroide, Foice) e Osso Cortical',
    huRange: '+150 a +1000 UH',
    radiologicalAppearance: 'Branco intenso estourado',
    clinicalNote: 'Exige mudança para "Janela Óssea" (L: ~500, W: ~2500) para distinguir traços de fratura linear ou afundamento das suturas cranianas.',
  },
];

export const INTRACRANIAL_HEMORRHAGES_MATRIX: IntracranialHemorrhageEntry[] = [
  {
    id: 'hem_epidural',
    namePtBr: 'Hematoma Epidural (Extradural) Agudo',
    anatomicalSpace: 'Espaço virtual entre a Tábua Óssea Interna e o folheto periosteal da Dura-máter.',
    classicRupturedVessel: 'Artéria Meníngea Média (85% dos casos — ramo anterior sob o Ptério temporoparietal).',
    ctMorphology: 'Biconvexo (Lenticular / Formato de Limão).',
    suturesAndDuralRelation: 'NÃO cruza linhas de sutura (o folheto periosteal é fundido às suturas), mas pode cruzar a linha média (foice) e o tentório.',
    temporalDensityEvolution: 'Sempre hiperdenso (+50 a +80 UH) na fase aguda, por vezes com "Swirl Sign" (sinal do redemoinho hipodenso indicando sangramento arterial ativo). Emergência neurocirúrgica imediata.',
    classicClinicalPresentation: 'Trauma temporal direto + perda transitória da consciência seguida de Intervalo Lúcido e deterioração neurológica rápida em minutos/horas, anisocoria ipsilateral (herniação uncal) e hemiparesia contralateral.',
    targetNodeIds: ['fma:os_temporale_sinister', 'fma:os_sphenoidale', 'fma:meninges_craniales'],
  },
  {
    id: 'hem_subdural',
    namePtBr: 'Hematoma Subdural (Agudo, Subagudo e Crônico)',
    anatomicalSpace: 'Espaço subdural, entre o folheto meníngeo da Dura-máter e a Aracnoide-máter.',
    classicRupturedVessel: 'Veias em Ponte (cortico-durais) que atravessam o espaço subdural rumo ao Seio Sagital Superior.',
    ctMorphology: 'Crescente (Côncavo-convexo / Formato de Banana) acompanhando toda a convexidade hemisférica.',
    suturesAndDuralRelation: 'CRUZA linhas de sutura livremente, mas NÃO cruza a Foice do Cérebro nem o Tentório do Cerebelo (pode laminar ao longo da fissura inter-hemisférica e da tenda).',
    temporalDensityEvolution: 'Agudo (< 3 dias): Hiperdenso (branco). Subagudo (3 a 21 dias): ISODENSO ao córtex (+35 UH — armadilha diagnóstica: procurar apagamento de sulcos e compressão ventricular). Crônico (> 21 dias): Hipodenso (cinza escuro/preto, ou nível líquido-líquido se ressangrar).',
    classicClinicalPresentation: 'Idosos (atrofia cerebral estira as veias em ponte), etilistas ou anticoagulados; trauma leve (muitas vezes esquecido) evoluindo com cefaleia progressiva, flutuação cognitiva, sonolência ou hemiparesia subaguda.',
    targetNodeIds: ['fma:meninges_craniales', 'fma:lobus_frontalis', 'fma:lobus_parietalis'],
  },
  {
    id: 'hem_subarachnoid_sah',
    namePtBr: 'Hemorragia Subaracnóidea (HSA)',
    anatomicalSpace: 'Espaço Subaracnóideo real (cisternas da base, fissura sylviana, fissura inter-hemisférica e sulcos corticais).',
    classicRupturedVessel: 'Ruptura de Aneurisma Sacular no Polígono de Willis (ACoA, ACoP, bifurcação da ACM) na HSA espontânea; contusão de pequenos vasos piais na HSA traumática.',
    ctMorphology: 'Estrelada ("Pentágono da Base" branco hiperdenso preenchendo a cisterna suprasselar/interpeduncular e desenhando os sulcos corticais).',
    suturesAndDuralRelation: 'Espalha-se difusamente por todo o compartimento liquórico e frequentemente reflui para os ventrículos (hemoventrículo — Escala de Fisher modificada).',
    temporalDensityEvolution: 'Máxima sensibilidade da TC (> 98%) nas primeiras 6 horas; clareia progressivamente nos dias seguintes conforme o LCR circula (se TC normal com alta suspeita após 6h -> Punção Lombar para pesquisa de xantocromia).',
    classicClinicalPresentation: '"A pior dor de cabeça da vida" de início hiperagudo (Thunderclap Headache — atinge pico em segundos), náuseas/vômitos, fotofobia, meningismo (rigidez de nuca, sinais de Brudzinski e Kernig) e síncope/rebaixamento do sensório.',
    targetNodeIds: ['fma:circulus_arteriosus_cerebri', 'fma:meninges_craniales', 'fma:ventriculus_tertius_et_quartus'],
  },
  {
    id: 'hem_intraparenchymal_ich',
    namePtBr: 'Hemorragia Intraparenquimatosa (HIP / AVCh)',
    anatomicalSpace: 'Interior do parênquima encefálico (núcleos da base, tálamo, ponte, cerebelo ou substância branca lobar).',
    classicRupturedVessel: 'Hipertensão Arterial Sistêmica crônica: ruptura de microaneurismas de Charcot-Bouchard nas Artérias Lenticuloestriadas (Putâmen/Cápsula), Talamoperfurantes ou Pontinas. Idosos normotensos (hemorragia lobar superficial): Angiopatia Amiloide Cerebral.',
    ctMorphology: 'Massa hiperdensa arredondada ou ovalada intraparenquimatosa cercada por halo hipodenso de edema peri-hematoma e efeito de massa.',
    suturesAndDuralRelation: 'Restrita inicialmente ao parênquima, mas hematomas talâmicos e caudados frequentemente rompem para dentro do sistema ventricular adjacente (inundação ventricular).',
    temporalDensityEvolution: 'Aguda hiperdensa brilhante (+60 a +80 UH); reabsorve centripetamente (da periferia para o centro) ao longo de semanas, deixando cavidade residual hipodensa de encefalomalácia com gliose.',
    classicClinicalPresentation: 'Pico hipertensivo grave + déficit neurológico focal súbito que piora progressivamente ao longo de 30–90 minutos + cefaleia intensa, vômitos em jato e queda rápida do nível de consciência.',
    targetNodeIds: ['fma:nuclei_basales', 'fma:capsula_interna', 'fma:thalamus', 'fma:circulus_arteriosus_cerebri'],
  },
];

export const EARLY_MCA_ISCHEMIA_SIGNS: string[] = [
  '1. Sinal da Artéria Cerebral Média Hiperdensa: trombo agudo intraluminal no segmento M1 brilha em branco no trajeto horizontal da fissura sylviana antes mesmo do parênquima infartar.',
  '2. Sinal da Fita Insular (Insular Ribbon Sign): perda da definição entre o córtex da ínsula e a cápsula extrema subjacente (zona de fronteira mais vulnerável à oligoemia da ACM).',
  '3. Obscurecimento do Núcleo Lentiforme: apagamento dos contornos nítidos do Putâmen e Globo Pálido em relação à Cápsula Interna (oclusão dos óstios das artérias lenticuloestriadas).',
  '4. Apagamento dos Sulcos Corticais e Perda da Diferenciação Cortico-Subcortical: o edema citotóxico (falência da Na+/K+ ATPase) reduz a densidade do córtex em ~2 UH a cada 1% de aumento de água tecidual.',
];

export const ASPECTS_10_REGIONS: AspectsRegionEntry[] = [
  // Nível Ganglionar (7 regiões)
  {
    id: 'C',
    code: 'C',
    namePtBr: 'Núcleo Caudado (Cabeça)',
    level: 'Ganglionar (Tálamo e Núcleos da Base)',
    anatomicalDescription: 'Parede anterolateral do corno frontal do ventrículo lateral, irrigada pelas lenticuloestriadas mediais/recorrente de Heubner.',
    pointValue: 1,
    targetNodeIds: ['fma:nuclei_basales', 'fma:ventriculi_laterales'],
  },
  {
    id: 'L',
    code: 'L',
    namePtBr: 'Núcleo Lentiforme (Putâmen + Globo Pálido)',
    level: 'Ganglionar (Tálamo e Núcleos da Base)',
    anatomicalDescription: 'Cunha cinzenta lateral à cápsula interna, irrigada pelas artérias lenticuloestriadas laterais (ramo M1 da ACM).',
    pointValue: 1,
    targetNodeIds: ['fma:nuclei_basales'],
  },
  {
    id: 'IC',
    code: 'IC',
    namePtBr: 'Cápsula Interna (Joelho e Braço Posterior)',
    level: 'Ganglionar (Tálamo e Núcleos da Base)',
    anatomicalDescription: 'Feixe compacto de fibras de projeção motoras (trato corticoespinhal) entre o Tálamo e o Núcleo Lentiforme.',
    pointValue: 1,
    targetNodeIds: ['fma:capsula_interna'],
  },
  {
    id: 'I',
    code: 'I',
    namePtBr: 'Córtex da Ínsula (Fita Insular)',
    level: 'Ganglionar (Tálamo e Núcleos da Base)',
    anatomicalDescription: 'Córtex profundo ao fundo da fissura sylviana, irrigado pelos ramos insulares M2 da ACM.',
    pointValue: 1,
    targetNodeIds: ['fma:lobus_insulari'],
  },
  {
    id: 'M1',
    code: 'M1',
    namePtBr: 'M1 — Córtex Frontal Anterior da ACM (Opérculo Frontal)',
    level: 'Ganglionar (Tálamo e Núcleos da Base)',
    anatomicalDescription: 'Córtex anterolateral do lobo frontal (inclui giro frontal inferior / Área de Broca no nível ganglionar).',
    pointValue: 1,
    targetNodeIds: ['fma:lobus_frontalis'],
  },
  {
    id: 'M2',
    code: 'M2',
    namePtBr: 'M2 — Córtex Temporal Anterior da ACM (Lateral à Ínsula)',
    level: 'Ganglionar (Tálamo e Núcleos da Base)',
    anatomicalDescription: 'Córtex temporal lateral situado anteriormente ao plano da fita insular.',
    pointValue: 1,
    targetNodeIds: ['fma:lobus_temporalis'],
  },
  {
    id: 'M3',
    code: 'M3',
    namePtBr: 'M3 — Córtex Temporal Posterior da ACM',
    level: 'Ganglionar (Tálamo e Núcleos da Base)',
    anatomicalDescription: 'Córtex temporal posterior (inclui giro temporal superior posterior / Área de Wernicke no nível ganglionar).',
    pointValue: 1,
    targetNodeIds: ['fma:lobus_temporalis'],
  },
  // Nível Supraganglionar (3 regiões)
  {
    id: 'M4',
    code: 'M4',
    namePtBr: 'M4 — Córtex Anterior Superior da ACM (Frontal Rostral)',
    level: 'Supraganglionar (Acima dos Ventrículos Laterais)',
    anatomicalDescription: 'Território cortical frontal superior/lateral imediatamente acima do plano de M1.',
    pointValue: 1,
    targetNodeIds: ['fma:lobus_frontalis'],
  },
  {
    id: 'M5',
    code: 'M5',
    namePtBr: 'M5 — Córtex Lateral Superior da ACM (Pré-central e Pós-central)',
    level: 'Supraganglionar (Acima dos Ventrículos Laterais)',
    anatomicalDescription: 'Território cortical frontoparietal lateral (córtex motor e somatossensorial primário da face e membro superior) acima de M2.',
    pointValue: 1,
    targetNodeIds: ['fma:lobus_frontalis', 'fma:lobus_parietalis'],
  },
  {
    id: 'M6',
    code: 'M6',
    namePtBr: 'M6 — Córtex Posterior Superior da ACM (Parietal Inferior)',
    level: 'Supraganglionar (Acima dos Ventrículos Laterais)',
    anatomicalDescription: 'Território cortical parietal posterior (giros supramarginal e angular) imediatamente acima de M3.',
    pointValue: 1,
    targetNodeIds: ['fma:lobus_parietalis'],
  },
];

/**
 * Calcula de forma determinística o Escore ASPECTS (Alberta Stroke Program Early CT Score).
 * Parte de 10 (TC normal) e subtrai 1 ponto por cada região do território da ACM com hipodensidade precoce.
 */
export function calculateAspectsScore(affectedRegionIds: string[]): AspectsCalculationResult {
  const uniqueIds = new Set(affectedRegionIds);
  const affectedRegions = ASPECTS_10_REGIONS.filter((r) => uniqueIds.has(r.id));
  const subtractedPoints = affectedRegions.length;
  const totalScore = Math.max(0, 10 - subtractedPoints);
  const isFavorableForThrombectomy = totalScore >= 6;

  let clinicalInterpretation = '';
  let recommendedAction = '';

  if (totalScore === 10) {
    clinicalInterpretation = 'TC sem sinais de hipodensidade isquêmica precoce estabelecida no território da ACM (ASPECTS 10/10).';
    recommendedAction = 'Janela ideal para reperfusão aguda: avaliar elegibilidade imediata para Trombólise EV (rtPA/Tenecteplase) e Angio-TC para Trombectomia Mecânica se houver oclusão de grande vaso (LVO).';
  } else if (totalScore >= 6) {
    clinicalInterpretation = `Área de infarto precoce pequena a moderada (${subtractedPoints} ${subtractedPoints === 1 ? 'região acometida' : 'regiões acometidas'} — ASPECTS ${totalScore}/10). Grande volume de penumbra isquêmica salvável.`;
    recommendedAction = 'Critério radiológico FAVORÁVEL (Cut-off >= 6) para Trombectomia Mecânica em oclusão proximal (ACI/M1) e trombólise endovenosa dentro da janela terapêutica.';
  } else {
    clinicalInterpretation = `Infarto precoce extenso no território da ACM (${subtractedPoints} regiões acometidas — ASPECTS ${totalScore}/10 < 6). Alto risco de transformação hemorrágica sintomática e edema maligno de ACM.`;
    recommendedAction = 'Atenção: ASPECTS < 6 indica núcleo isquêmico extenso; avaliar protocolo de perfusão avançada, controle estrito de PIC e vigilância para Craniectomia Descompressiva precoce se evoluir para infarto maligno de ACM.';
  }

  return {
    totalScore,
    subtractedPoints,
    affectedRegions,
    isFavorableForThrombectomy,
    clinicalInterpretation,
    recommendedAction,
  };
}

export const HERNIATION_RED_FLAGS: HerniationRedFlagEntry[] = [
  {
    id: 'rf_midline_shift',
    namePtBr: 'Desvio de Linha Média (DLM) > 5 mm',
    radiologicalThreshold: 'DLM > 5 mm medido ao nível do Septo Pelúcido (entre os cornos frontais) ou da Glândula Pineal calcificada.',
    biomechanicalMechanism: 'Herniação Subfalcina: o giro do cíngulo é empurrado por baixo da borda livre da Foice do Cérebro para o hemisfério oposto.',
    clinicalConsequence: 'Pode comprimir a Artéria Cerebral Anterior (ACA) ipsilateral/contralateral contra a foice, causando infarto secundário frontal (paralisia crural adicional). Critério clássico para evacuação neurocirúrgica de urgência.',
    targetNodeIds: ['fma:fornix', 'fma:glandula_pinealis', 'fma:meninges_craniales'],
  },
  {
    id: 'rf_basal_cisterns_effacement',
    namePtBr: 'Apagamento das Cisternas da Base (Suprasselar e Perimesencefálica)',
    radiologicalThreshold: 'Perda do contorno liquórico escuro do "pentágono da base" e das cisternas ambiens/interpeduncular ao redor do mesencéfalo.',
    biomechanicalMechanism: 'Herniação Uncal Transtentorial Lateral: o Úncus do lobo temporal medial desliza sobre a borda livre da incisura do Tentório do Cerebelo.',
    clinicalConsequence: 'Comprime sequencialmente: (1) Nervo Oculomotor NC III ipsilateral -> midríase paralítica; (2) Pedúnculo Cerebral mesencefálico -> hemiplegia contralateral (ou ipsilateral no fenômeno de Kernohan); (3) Artéria Cerebral Posterior (ACP) -> infarto occipital e hemorragia mesencefálica de Duret.',
    targetNodeIds: ['fma:hippocampus_amygdala', 'fma:mesencephalon', 'fma:nervi_craniales_i_xii'],
  },
];

export const CLINICAL_SIMULATION_CASES: ClinicalSimulationCase[] = [
  {
    id: 'case_1_wallenberg',
    caseNumber: 1,
    title: 'Síndrome Alterna de Tronco Encefálico (Território Vertebrobasilar)',
    category: 'Vascular / Tronco Encefálico',
    patientPresentation: 'Homem, 58 anos, hipertenso e tabagista, admitido no pronto-socorro após início súbito (há 2 horas) de vertigem rotatória intensa, náuseas, soluços incoercíveis, dificuldade para engolir (disfagia) e voz rouca. Lúcido, orientado, força muscular grau V nos 4 membros (SEM hemiparesia!).',
    neurologicalExamFindings: [
      '1. Ptose palpebral parcial, miose e anidrose na hemiface ESQUERDA (Síndrome de Horner ipsilateral).',
      '2. Queda do véu palatino à ESQUERDA, abolição do reflexo nauseoso à esquerda e desvio da úvula para a DIREITA.',
      '3. Ataxia apendicular (dismetria nas provas índex-nariz e calcanhar-joelho) no hemicorpo ESQUERDO.',
      '4. Perda da sensibilidade térmica e dolorosa na hemiface ESQUERDA.',
      '5. Perda da sensibilidade térmica e dolorosa no tronco e membros à DIREITA (hemi-hipoestesia corporal cruzada).',
    ],
    keyClinicalQuestion: 'Qual é a topografia exata da lesão, o vaso ocluído e por que NÃO há hemiparesia neste paciente?',
    keyClinicalAnswer: 'Porção dorsolateral do Bulbo à Esquerda (Síndrome de Wallenberg) por oclusão da Artéria Vertebral Intracraniana Esquerda ou PICA Esquerda. Não há hemiparesia porque o trato corticoespinhal desce nas pirâmides bulbares (porção ventromedial anterior), irrigadas pela Artéria Espinhal Anterior.',
    reasoningSteps: [
      {
        findingTitle: 'Hipoestesia Térmica/Dolorosa Cruzada (Face Esq x Corpo Dir)',
        anatomicalStructure: 'Trato/Núcleo Espinhal do Trigêmeo Esquerdo + Trato Espinotalâmico Lateral Esquerdo',
        pathwayExplanation: 'Assinatura patognomônica da porção lateral do tronco: as fibras trigeminais de dor/temperatura da face entram na ponte e descem IPSILATERALMENTE no bulbo esquerdo; já o trato espinotalâmico lateral esquerdo traz a dor/temperatura do corpo DIREITO (pois já decussou na medula espinhal).',
      },
      {
        findingTitle: 'Disfagia, Rouquidão, Soluços e Sinal da Cortina',
        anatomicalStructure: 'Núcleo Ambíguo Esquerdo (Origem motora de NC IX e NC X)',
        pathwayExplanation: 'Paralisia ipsilateral dos músculos constritores da faringe, levantador do véu palatino e laringe (nervo laríngeo recorrente), desviando a úvula para o lado são (direito).',
      },
      {
        findingTitle: 'Síndrome de Horner Ipsilateral + Ataxia Ipsilateral + Vertigem',
        anatomicalStructure: 'Trato Hipotálamo-Espinhal Simpático + Pedúnculo Cerebelar Inferior (Corpo Restiforme) + Núcleos Vestibulares Inferiores',
        pathwayExplanation: 'Todas essas 3 estruturas situam-se no quadrante dorsolateral retro-olivar do bulbo esquerdo.',
      },
      {
        findingTitle: 'Ausência de Hemiparesia (Força Grau V nos 4 Membros)',
        anatomicalStructure: 'Pirâmide Bulbar Ventromedial e Lemnisco Medial (Poupados)',
        pathwayExplanation: 'O trato corticoespinhal motor e o lemnisco medial ficam na porção anteromedial do bulbo, suprida pela Artéria Espinhal Anterior.',
      },
    ],
    finalDiagnosis: {
      syndromeName: 'Síndrome de Wallenberg (Síndrome Bulbar Lateral Esquerda)',
      exactTopography: 'Porção dorsolateral (retro-olivar) do Bulbo (Medula Oblonga) à esquerda',
      vesselInvolved: 'Artéria Vertebral Intracraniana Esquerda (mais comum) ou seu ramo direto, a PICA (Artéria Cerebelar Inferior Posterior) Esquerda',
      immediateManagement: 'Dieta zero com avaliação fonoaudiológica rigorosa (alto risco de broncoaspiração por lesão do Núcleo Ambíguo), neuroimagem de urgência (RM com difusão + Angio-TC/RM de vasos cervicais/intracranianos para investigar aterotrombose ou dissecção vertebral) e terapia de reperfusão/antiagregação.',
    },
    quizOptions: [
      {
        id: 'opt_wallenberg',
        label: 'Síndrome de Wallenberg (Bulbo Dorsolateral Esquerdo — Artéria Vertebral / PICA Esquerda)',
        isCorrect: true,
        feedback: 'Exato! O achado sensitivo alterno (face esquerda + corpo direito) associado a lesão do Núcleo Ambíguo (IX/X), Horner e ataxia cerebelar sem déficit motor piramidal localiza a lesão no bulbo dorsolateral esquerdo.',
      },
      {
        id: 'opt_weber',
        label: 'Síndrome de Weber (Base do Pedúnculo Cerebral Mesencefálico Esquerdo — ACP)',
        isCorrect: false,
        feedback: 'Incorreto. A Síndrome de Weber acomete o mesencéfalo anterior, causando paralisia do III par ipsilateral (ptose + midríase + estrabismo divergente) associada a hemiplegia contralateral.',
      },
      {
        id: 'opt_dejerine',
        label: 'Síndrome Bulbar Medial de Dejerine (Artéria Espinhal Anterior Esquerda)',
        isCorrect: false,
        feedback: 'Incorreto. A Síndrome Bulbar Medial lesa a pirâmide bulbar (hemiplegia contralateral), o lemnisco medial (perda proprioceptiva contralateral) e o nervo hipoglosso NC XII (desvio da língua para a esquerda).',
      },
    ],
    targetNodeIds: ['fma:medulla_oblongata', 'fma:cerebellum', 'fma:circulus_arteriosus_cerebri'],
  },
  {
    id: 'case_2_epidural_uncal',
    caseNumber: 2,
    title: 'Traumatismo Cranioencefálico, Intervalo Lúcido e Herniação Cerebral',
    category: 'Neurotrauma / Emergência Cirúrgica',
    patientPresentation: 'Jovem de 22 anos sofre queda de motocicleta sem capacete, batendo a região temporoparietal direita no meio-fio. Perde a consciência por 2 minutos no local, mas recobra a lucidez (Glasgow 15) no transporte do SAMU, referindo cefaleia temporal direita. Quarenta minutos após a admissão, evolui com sonolência, vômitos e queda abrupta para Glasgow 7 (O1 V2 M4).',
    vitalSigns: 'PA: 190x110 mmHg | FC: 46 bpm | FR: 10 irpm com pausas apneicas irregulares (Tríade de Cushing)',
    neurologicalExamFindings: [
      '1. Anisocoria: Pupila DIREITA midriática (6 mm) e fixa/arreativa à luz; pupila esquerda miótica e fotorreagente (2 mm).',
      '2. Hemiplegia proporcional à ESQUERDA (face, braço e perna) com Sinal de Babinski à esquerda.',
      '3. Equimose e crepitação óssea na escama temporal direita (região do Ptério).',
    ],
    keyClinicalQuestion: 'Por que a pupila dilatou à DIREITA enquanto a paralisia motora ocorreu à ESQUERDA?',
    keyClinicalAnswer: 'O Hematoma Epidural Agudo na fossa média direita empurra o Úncus do lobo temporal direito através da incisura da tenda do cerebelo (Herniação Uncal Direita), comprimindo as fibras parassimpáticas periféricas do NC III Direito (midríase ipsilateral) e a base do Pedúnculo Cerebral Direito acima da decussação piramidal (hemiplegia contralateral à esquerda).',
    reasoningSteps: [
      {
        findingTitle: 'Trauma no Ptério Direito + Intervalo Lúcido',
        anatomicalStructure: 'Ptério Direito + Ramo Anterior da Artéria Meníngea Média (Forame Espinhoso)',
        pathwayExplanation: 'A fratura da fina escama temporal no Ptério lacera a Artéria Meníngea Média. O sangue arterial de alta pressão descola a dura-máter da tábua interna formando um Hematoma Epidural Agudo biconvexo (lenticular).',
      },
      {
        findingTitle: 'Midríase Paralítica Ipsilateral (Direita)',
        anatomicalStructure: 'Úncus do Giro Parahipocampal Direito → Nervo Oculomotor (NC III) Direito',
        pathwayExplanation: 'Na Herniação Uncal Transtentorial, o úncus escorrega pela borda livre do tentório e esmaga a superfície dorsomedial do NC III direito, onde correm as fibras parassimpáticas constritoras da pupila (Edinger-Westphal). Sem parassimpático, o simpático dilata a pupila direita sem oposição.',
      },
      {
        findingTitle: 'Hemiplegia Contralateral (Esquerda) e Exceção de Kernohan',
        anatomicalStructure: 'Base do Pedúnculo Cerebral Direito no Mesencéfalo (Trato Corticoespinhal)',
        pathwayExplanation: 'Logo atrás do III par está o pedúnculo cerebral direito; como o trato corticoespinhal só vai decussar lá embaixo no bulbo, a compressão mesencefálica direita causa hemiplegia esquerda. (Exceção clássica: se o mesencéfalo for tão deslocado que o pedúnculo oposto [esquerdo] bater contra a borda rígida do tentório contralateral — Incisura de Kernohan — ocorre hemiplegia ipsilateral à midríase).',
      },
      {
        findingTitle: 'PA 190x110 mmHg + FC 46 bpm + Bradipneia Irregular',
        anatomicalStructure: 'Bulbo (Centros Vasomotor e Respiratório — Tríade de Cushing)',
        pathwayExplanation: 'Resposta simpática reflexa extrema à isquemia do tronco por aumento crítico da Pressão Intracraniana (PIC), tentando manter a Pressão de Perfusão Cerebral (PPC = PAM - PIC).',
      },
    ],
    finalDiagnosis: {
      syndromeName: 'Hematoma Epidural Agudo Temporoparietal Direito com Herniação Uncal Transtentorial Direita',
      exactTopography: 'Espaço Epidural da Fossa Média Direita (sob o Ptério) + Incisura Tentorial Direita',
      vesselInvolved: 'Artéria Meníngea Média Direita (emergente do Forame Espinhoso do Esfenoide)',
      immediateManagement: '1) Intubação Orotraqueal imediata de sequência rápida (Glasgow <= 8); 2) Medidas neuroprotetoras de resgate da PIC (cabeceira elevada a 30° centrada, solução salina hipertônica 20% ou manitol EV); 3) TC sem contraste instantânea e Craniotomia Descompressiva de Emergência para drenagem do coágulo e coagulação da artéria meníngea média.',
    },
    quizOptions: [
      {
        id: 'opt_epidural_uncal',
        label: 'Hematoma Epidural Agudo Direito (Artéria Meníngea Média) + Herniação Uncal Direita',
        isCorrect: true,
        feedback: 'Perfeito! Trauma temporal no Ptério com intervalo lúcido, aspecto biconvexo na TC, midríase direita (NC III ipsilateral) e hemiplegia esquerda (pedúnculo cerebral direito) fecham o diagnóstico.',
      },
      {
        id: 'opt_subdural_chronic',
        label: 'Hematoma Subdural Crônico Direito (Veias em Ponte) + Herniação Subfalcina',
        isCorrect: false,
        feedback: 'Incorreto. O hematoma subdural ocorre por ruptura de veias em ponte (formato em crescente que cruza suturas), e a herniação subfalcina comprime a ACA (giro do cíngulo), não causando a tríade clássica uncal aguda pós-intervalo lúcido.',
      },
      {
        id: 'opt_sah_acop',
        label: 'Ruptura de Aneurisma da Artéria Comunicante Anterior (ACoA)',
        isCorrect: false,
        feedback: 'Incorreto. Aneurismas de ACoA comprimem o quiasma óptico (hemianopsia bitemporal) e causam HSA espontânea em trovoada.',
      },
    ],
    targetNodeIds: ['fma:os_temporale_dexter', 'fma:os_sphenoidale', 'fma:hippocampus_amygdala', 'fma:mesencephalon'],
  },
  {
    id: 'case_3_mca_cortical_stroke',
    caseNumber: 3,
    title: 'Síndrome Cortical Extensa vs. Subcortical Lacunar (Território Carotídeo)',
    category: 'AVC Isquêmico / Córtex & Linguagem',
    patientPresentation: 'Mulher, 74 anos, portadora de Fibrilação Atrial crônica sem anticoagulação, apresenta início hiperagudo (há 1 hora) de paralisia à direita e perda completa da fala e compreensão.',
    neurologicalExamFindings: [
      '1. Hemiplegia e hemi-hipoestesia DIREITA de franco predomínio BRAQUIOFACIAL: paralisia facial central à direita (fecha os dois olhos com força, mas a rima labial desvia para a esquerda), braço direito plégico (grau 0) e perna direita parética (grau III).',
      '2. Olhar conjugado desviado fixamente para a ESQUERDA.',
      '3. Afasia Global: não compreende comandos verbais simples e não emite palavras inteligíveis.',
      '4. Hemianopsia homônima à DIREITA na campimetria por ameaça.',
    ],
    keyClinicalQuestion: 'Como diferenciar clinicamente à beira do leito este AVC Cortical extenso de um AVC Lacunar na Cápsula Interna?',
    keyClinicalAnswer: 'Por dois critérios determinísticos: (1) Distribuição motora desproporcionada (predomínio braquiofacial da convexidade da ACM, poupando parcialmente a perna na face medial da ACA) — na Cápsula Interna as fibras estão compactadas e a hemiplegia é proporcional (face = braço = perna); e (2) Presença de sinais corticais (Afasia Global, Desvio do olhar conjugado e Hemianopsia), que estão ausentes nos infartos lacunares puros da cápsula interna.',
    reasoningSteps: [
      {
        findingTitle: 'Déficit Motor/Sensitivo Direita com Predomínio Braquiofacial + Paralisia Facial Central',
        anatomicalStructure: 'Giro Pré-central (Área 4) e Pós-central (Áreas 3,1,2) na Convexidade Superolateral Esquerda',
        pathwayExplanation: 'No Homúnculo de Penfield, a face e o membro superior ocupam a superfície lateral do hemisfério (irrigada pela ACM), enquanto o membro inferior fica no lóbulo paracentral medial (irrigado pela ACA, que está pérvia). A paralisia facial poupa a testa/olhos porque o andar superior do núcleo do VII recebe fibras corticonucleares bilaterais.',
      },
      {
        findingTitle: 'Afasia Global (Perda de Expressão + Perda de Compreensão)',
        anatomicalStructure: 'Área de Broca (Áreas 44/45 — Giro Frontal Inferior) + Área de Wernicke (Área 22 — Giro Temporal Superior) no Hemisfério Dominante Esquerdo',
        pathwayExplanation: 'A oclusão proximal do tronco M1 da ACM esquerda compromete simultaneamente a divisão superior (Broca) e a divisão inferior (Wernicke).',
      },
      {
        findingTitle: 'Desvio Conjugado do Olhar para a Esquerda',
        anatomicalStructure: 'Campo Ocular Frontal Esquerdo (Área 8 de Brodmann)',
        pathwayExplanation: 'O Campo Ocular Frontal esquerdo empurra os olhos para a direita. Na lesão isquêmica esquerda, o campo direito sadio atua sem oposição, desviando os olhos para a esquerda ("no AVC hemisférico, o paciente olha para o próprio infarto").',
      },
      {
        findingTitle: 'Hemianopsia Homônima Direita',
        anatomicalStructure: 'Radiações Ópticas Esquerdas (Feixe Geniculocalcarino Parietotemporal)',
        pathwayExplanation: 'As radiações ópticas caminham na substância branca profunda ao córtex temporoparietal da ACM esquerda.',
      },
    ],
    finalDiagnosis: {
      syndromeName: 'AVC Isquêmico Cardioembólico Extenso em Território Total da Artéria Cerebral Média (ACM) Esquerda',
      exactTopography: 'Convexidade frontotemporoparietal esquerda (Áreas 4, 6, 8, 3/1/2, 44/45, 22 e radiações ópticas)',
      vesselInvolved: 'Tronco Principal (Segmento M1) da Artéria Cerebral Média Esquerda (oclusão de grande vaso — LVO)',
      immediateManagement: 'Calcular o Escore ASPECTS na TC sem contraste (se >= 6 e dentro de 4,5h: Trombólise EV com rtPA/Tenecteplase + Trombectomia Mecânica endovascular imediata do segmento M1 esquerdo). Posteriormente, iniciar anticoagulação oral direta (DOAC) para prevenção secundária da Fibrilação Atrial.',
    },
    quizOptions: [
      {
        id: 'opt_mca_m1_left',
        label: 'AVC Isquêmico Extenso de Tronco M1 da Artéria Cerebral Média (ACM) Esquerda',
        isCorrect: true,
        feedback: 'Correto! Hemiplegia direita de predomínio braquiofacial + Afasia Global + Desvio conjugado do olhar para a esquerda + Hemianopsia homônima direita caracterizam a síndrome completa de M1 no hemisfério dominante.',
      },
      {
        id: 'opt_internal_capsule_lacunar',
        label: 'AVC Lacunar Motor Puro no Braço Posterior da Cápsula Interna Esquerda',
        isCorrect: false,
        feedback: 'Incorreto. O infarto lacunar da cápsula interna produz hemiplegia proporcional (face = braço = perna) e NÃO apresenta sinais corticais como afasia, hemianopsia ou desvio conjugado do olhar.',
      },
      {
        id: 'opt_aca_left',
        label: 'AVC Isquêmico da Artéria Cerebral Anterior (ACA) Esquerda',
        isCorrect: false,
        feedback: 'Incorreto. A oclusão da ACA causa hemiparesia de predomínio CRURAL (perna muito mais acometida que o braço), abulia e incontinência urinária.',
      },
    ],
    targetNodeIds: ['fma:lobus_frontalis', 'fma:lobus_temporalis', 'fma:lobus_parietalis', 'fma:circulus_arteriosus_cerebri'],
  },
];

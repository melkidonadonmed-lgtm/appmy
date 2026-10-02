export interface SystemMetadata {
  labelPt: string;
  labelTA2: string;
  icon: string;
  colorHex: string;
  order: number;
}

export interface RegionMetadata {
  labelPt: string;
  labelTA2: string;
  order: number;
}

export const SYSTEM_METADATA: Record<string, SystemMetadata> = {
  skeletal: {
    labelPt: 'Sistema Esquelético (Osteologia)',
    labelTA2: 'Systema skeletale',
    icon: '🦴',
    colorHex: '#f4ede2',
    order: 1,
  },
  articular: {
    labelPt: 'Sistema Articular (Artrologia)',
    labelTA2: 'Systema articulare',
    icon: '🔗',
    colorHex: '#cbd5e1',
    order: 2,
  },
  muscular: {
    labelPt: 'Sistema Muscular (Miologia)',
    labelTA2: 'Systema musculare',
    icon: '💪',
    colorHex: '#ef4444',
    order: 3,
  },
  nervous: {
    labelPt: 'Sistema Nervoso (Neurologia)',
    labelTA2: 'Systema nervosum',
    icon: '🧠',
    colorHex: '#eab308',
    order: 4,
  },
  cardiovascular: {
    labelPt: 'Sistema Cardiovascular (Angiologia)',
    labelTA2: 'Systema cardiovasculare',
    icon: '🫀',
    colorHex: '#f43f5e',
    order: 5,
  },
  respiratory: {
    labelPt: 'Sistema Respiratório',
    labelTA2: 'Systema respiratorium',
    icon: '🫁',
    colorHex: '#06b6d4',
    order: 6,
  },
  digestive: {
    labelPt: 'Sistema Digestório',
    labelTA2: 'Systema digestorium',
    icon: '🍱',
    colorHex: '#f59e0b',
    order: 7,
  },
  renal: {
    labelPt: 'Sistema Urinário',
    labelTA2: 'Systema urinarium',
    icon: '🫧',
    colorHex: '#a855f7',
    order: 8,
  },
  endocrine: {
    labelPt: 'Sistema Endócrino',
    labelTA2: 'Systema endocrineum',
    icon: '⚡',
    colorHex: '#10b981',
    order: 9,
  },
  reproductive: {
    labelPt: 'Sistema Genital / Reprodutor',
    labelTA2: 'Systema genitalium',
    icon: '🧬',
    colorHex: '#ec4899',
    order: 10,
  },
  lymphatic: {
    labelPt: 'Sistema Linfático',
    labelTA2: 'Systema lymphoideum',
    icon: '🛡️',
    colorHex: '#34d399',
    order: 11,
  },
  sensory: {
    labelPt: 'Órgãos dos Sentidos',
    labelTA2: 'Organa sensuum',
    icon: '👁️',
    colorHex: '#38bdf8',
    order: 12,
  },
  integumentary: {
    labelPt: 'Tegumento Comum (Pele)',
    labelTA2: 'Integumentum commune',
    icon: '✨',
    colorHex: '#fb923c',
    order: 13,
  },
};

export const REGION_METADATA: Record<string, RegionMetadata> = {
  cranium: {
    labelPt: 'Crânio & Face',
    labelTA2: 'Cranium et facies',
    order: 1,
  },
  vertebral_column: {
    labelPt: 'Coluna Vertebral',
    labelTA2: 'Columna vertebralis',
    order: 2,
  },
  thorax: {
    labelPt: 'Caixa Torácica & Tórax',
    labelTA2: 'Thorax',
    order: 3,
  },
  upper_limb: {
    labelPt: 'Membros Superiores',
    labelTA2: 'Membra superiora',
    order: 4,
  },
  pelvis: {
    labelPt: 'Pelve & Cintura Pélvica',
    labelTA2: 'Pelvis',
    order: 5,
  },
  lower_limb: {
    labelPt: 'Membros Inferiores',
    labelTA2: 'Membra inferiora',
    order: 6,
  },
  systemic: {
    labelPt: 'Estruturas Sistêmicas',
    labelTA2: 'Corpus universum',
    order: 7,
  },
};

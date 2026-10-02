import React, { useState } from 'react';
import {
  Sliders,
  ChevronDown,
  ChevronRight,
  Bone,
  Activity,
  HeartPulse,
  Brain,
  Wind,
  Utensils,
  Shield,
  Droplet,
  Zap,
  Dna,
  MapPin,
  Check,
} from 'lucide-react';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { ActiveAnatomicalSystem } from '../../../../shared/types/anatomy.ts';
import { AnatomicalRegion } from '../../canvas/AnatomicalAtlasScene.tsx';

interface SystemOption {
  id: ActiveAnatomicalSystem;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const SYSTEMS: SystemOption[] = [
  { id: 'all', label: 'Todos', icon: Sliders },
  { id: 'skeletal', label: 'Ossos (Cap. 2)', icon: Bone },
  { id: 'muscular', label: 'Músculos (Cap. 3)', icon: Activity },
  { id: 'cardiovascular', label: 'Cardio (Cap. 5)', icon: HeartPulse },
  { id: 'nervous', label: 'Nervoso (Cap. 4)', icon: Brain },
  { id: 'respiratory', label: 'Respiratório (Cap. 7)', icon: Wind },
  { id: 'digestive', label: 'Digestório (Cap. 8)', icon: Utensils },
  { id: 'lymphatic', label: 'Linfático (Cap. 6)', icon: Shield },
  { id: 'urinary', label: 'Urinário (Cap. 9)', icon: Droplet },
  { id: 'endocrine', label: 'Endócrino (Cap. 11)', icon: Zap },
  { id: 'reproductive', label: 'Reprodutor (Cap. 10)', icon: Dna },
];

interface RegionOption {
  id: AnatomicalRegion;
  label: string;
}

const REGIONS: RegionOption[] = [
  { id: 'all', label: 'Todo o Esqueleto' },
  { id: 'cranium', label: 'Crânio & Face' },
  { id: 'spine', label: 'Coluna (C1-L5)' },
  { id: 'thorax', label: 'Caixa Torácica' },
  { id: 'upper_limb', label: 'Membros Sup.' },
  { id: 'pelvis', label: 'Pelve & Cintura' },
  { id: 'lower_limb', label: 'Membros Inf.' },
];

export const AnatomyFiltersSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const activeSystem = useAnatomyStore((s) => s.activeSystem);
  const setActiveSystem = useAnatomyStore((s) => s.setActiveSystem);

  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const setActiveRegion = useAnatomyStore((s) => s.setActiveRegion);

  const activeSystemLabel =
    SYSTEMS.find((s) => s.id === activeSystem)?.label || 'Todos';

  return (
    <div className="outliner-modules-card">
      {/* Cabeçalho Colapsável */}
      <button
        id="outliner-filters-header-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        className="outliner-modules-toggle"
        aria-expanded={isExpanded}
        aria-controls="outliner-filters-content"
      >
        <div className="outliner-modules-toggle-left">
          <Sliders size={13} className="text-cyan-400" aria-hidden="true" />
          <span>Filtros Selecionáveis</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="outliner-count-badge" style={{ textTransform: 'capitalize' }}>
            {activeSystemLabel}
          </span>
          {isExpanded ? (
            <ChevronDown size={14} aria-hidden="true" />
          ) : (
            <ChevronRight size={14} aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Conteúdo Expansível */}
      {isExpanded && (
        <div
          id="outliner-filters-content"
          role="region"
          aria-labelledby="outliner-filters-header-btn"
          className="outliner-modules-body"
        >
          {/* Seletor de Sistemas Anatômicos */}
          <div style={{ marginBottom: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#94a3b8',
                marginBottom: '0.35rem',
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Sistemas Anatômicos
            </span>
            <div
              className="outliner-filter-grid"
              role="group"
              aria-label="Filtro de sistemas anatômicos"
            >
              {SYSTEMS.map((sys) => {
                const Icon = sys.icon;
                const isActive = activeSystem === sys.id;
                return (
                  <button
                    key={sys.id}
                    onClick={() => setActiveSystem(sys.id)}
                    aria-pressed={isActive}
                    className={`outliner-filter-btn ${isActive ? 'active' : ''}`}
                    title={`Filtrar sistema: ${sys.label}`}
                  >
                    <Icon size={11} aria-hidden="true" />
                    <span>{sys.label}</span>
                    {isActive && <Check size={10} style={{ marginLeft: 'auto' }} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seletor de Regiões do Esqueleto (Quando 'skeletal' ou 'all') */}
          {(activeSystem === 'skeletal' || activeSystem === 'all') && (
            <div style={{ paddingTop: '0.45rem', borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: '#38bdf8',
                  marginBottom: '0.35rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <MapPin size={11} aria-hidden="true" />
                <span>Região do Esqueleto</span>
              </div>
              <div
                className="outliner-filter-grid"
                role="group"
                aria-label="Filtro de regiões anatômicas do esqueleto"
              >
                {REGIONS.map((reg) => {
                  const isActive = activeRegion === reg.id;
                  return (
                    <button
                      key={reg.id}
                      onClick={() => setActiveRegion(reg.id)}
                      aria-pressed={isActive}
                      className={`outliner-filter-btn ${isActive ? 'active' : ''}`}
                      title={`Filtrar região: ${reg.label}`}
                    >
                      <span>{reg.label}</span>
                      {isActive && <Check size={10} style={{ marginLeft: 'auto' }} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

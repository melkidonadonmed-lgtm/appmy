import React, { useState, useMemo } from 'react';
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
  Layers,
  Focus,
} from 'lucide-react';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { ActiveAnatomicalSystem } from '../../../../shared/types/anatomy.ts';
import { AnatomicalRegion } from '../../canvas/AnatomicalAtlasScene.tsx';
import { Z_ANATOMY_CATALOG } from '../../../../shared/constants/zAnatomyCatalog.ts';
import { FEMALE_REPRODUCTIVE_CATALOG } from '../../../../shared/constants/femaleReproductiveCatalog.ts';

interface SystemOption {
  id: ActiveAnatomicalSystem;
  label: string;
  orderBadge?: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const SYSTEMS: SystemOption[] = [
  { id: 'all', label: 'Mostrar Todos', icon: Sliders },
  { id: 'integumentary', label: 'Tegumento & Mama', orderBadge: '1ª', icon: Shield },
  { id: 'muscular', label: 'Músculos & Fáscias', orderBadge: '2ª', icon: Activity },
  { id: 'skeletal', label: 'Esqueleto & Lig.', orderBadge: '3ª', icon: Bone },
  { id: 'cardiovascular', label: 'Cardiovascular', orderBadge: '4ª', icon: HeartPulse },
  { id: 'lymphatic', label: 'Linfático', orderBadge: '5ª', icon: Shield },
  { id: 'nervous', label: 'Sistema Nervoso', orderBadge: '6ª', icon: Brain },
  { id: 'respiratory', label: 'Respiratório', orderBadge: '7ª', icon: Wind },
  { id: 'digestive', label: 'Digestório', orderBadge: '8ª', icon: Utensils },
  { id: 'urinary', label: 'Urinário / Renal', orderBadge: '9ª', icon: Droplet },
  { id: 'endocrine', label: 'Endócrino', orderBadge: '10ª', icon: Zap },
  { id: 'reproductive', label: 'Reprodutor', orderBadge: '11ª', icon: Dna },
];

interface RegionOption {
  id: AnatomicalRegion;
  label: string;
}

const REGIONS: RegionOption[] = [
  { id: 'all', label: 'Corpo Inteiro' },
  { id: 'cranium', label: 'Crânio & Face' },
  { id: 'spine', label: 'Coluna (C1-L5)' },
  { id: 'thorax', label: 'Caixa Torácica' },
  { id: 'upper_limb', label: 'Membros Sup.' },
  { id: 'pelvis', label: 'Pelve & Cintura' },
  { id: 'lower_limb', label: 'Membros Inf.' },
];

export const AnatomyFiltersSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filterClickMode, setFilterClickMode] = useState<'peel' | 'isolate'>('peel');

  const activeSystems = useAnatomyStore((s) => s.activeSystems);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const biologicalSex = useAnatomyStore((s) => s.biologicalSex);
  const toggleSystem = useAnatomyStore((s) => s.toggleSystem);
  const toggleSystemPeel = useAnatomyStore((s) => s.toggleSystemPeel);
  const setAllSystems = useAnatomyStore((s) => s.setAllSystems);

  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const setActiveRegion = useAnatomyStore((s) => s.setActiveRegion);

  // Agrupa os IDs canônicos por sistema para refletir fielmente se a camada foi desmarcada/descascada
  const canonicalIdsBySystem = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const item of [...Z_ANATOMY_CATALOG, ...FEMALE_REPRODUCTIVE_CATALOG]) {
      const sysKey = item.system === 'renal' ? 'urinary' : item.system;
      if (!map[sysKey]) map[sysKey] = [];
      map[sysKey].push(item.id);
    }
    return map;
  }, []);

  const isSystemVisibleOnCanvas = (sysId: ActiveAnatomicalSystem): boolean => {
    if (sysId === 'all') {
      return activeSystems.has('all') && hiddenNodeIds.size === 0;
    }
    if (sysId === 'integumentary' && biologicalSex === 'male' && !activeSystems.has('integumentary')) {
      return false;
    }
    const sysActiveInSet = activeSystems.has('all') || activeSystems.has(sysId);
    if (!sysActiveInSet) return false;
    const ids = canonicalIdsBySystem[sysId] || [];
    if (ids.length === 0) return true;
    return ids.some((id) => !hiddenNodeIds.has(id));
  };

  const visibleSystemsCount = useMemo(() => {
    return SYSTEMS.filter((s) => s.id !== 'all' && isSystemVisibleOnCanvas(s.id)).length;
  }, [activeSystems, hiddenNodeIds, biologicalSex]);

  const activeSystemsLabel =
    visibleSystemsCount >= 10 && hiddenNodeIds.size === 0
      ? 'Todos'
      : `${visibleSystemsCount}/11 visíveis`;

  const handleSystemClick = (sysId: ActiveAnatomicalSystem) => {
    if (sysId === 'all') {
      setAllSystems();
      return;
    }
    if (filterClickMode === 'peel') {
      toggleSystemPeel(sysId);
    } else {
      toggleSystem(sysId);
    }
  };

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
          <span>Camadas & Filtros (De Fora p/ Dentro)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="outliner-count-badge">
            {activeSystemsLabel}
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
          {/* Seletor de Modo de Clique nos Filtros: Descascar Camada vs Isolar */}
          <div className="outliner-filter-mode-bar" role="group" aria-label="Modo de ação dos filtros de sistema">
            <button
              type="button"
              onClick={() => setFilterClickMode('peel')}
              aria-pressed={filterClickMode === 'peel'}
              className={`outliner-filter-mode-pill ${filterClickMode === 'peel' ? 'active' : ''}`}
              title="Modo Descascar: Clicar em uma camada oculta ou exibe apenas ela, mantendo todas as camadas internas visíveis"
            >
              <Layers size={11} aria-hidden="true" />
              <span>Descascar Camada (Ligar/Desligar)</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterClickMode('isolate')}
              aria-pressed={filterClickMode === 'isolate'}
              className={`outliner-filter-mode-pill ${filterClickMode === 'isolate' ? 'active' : ''}`}
              title="Modo Isolar: Clicar em um sistema exibe somente ele e oculta o restante"
            >
              <Focus size={11} aria-hidden="true" />
              <span>Isolar Sistema</span>
            </button>
          </div>

          {/* Seletor de Sistemas Anatômicos (Ordenado de Fora para Dentro: 1ª a 11ª Camada) */}
          <div style={{ marginBottom: '0.5rem' }}>
            <span className="outliner-filter-section-label">
              Sistemas (1ª Externa → 11ª Interna)
            </span>
            <div
              className="outliner-filter-grid"
              role="group"
              aria-label="Filtro de sistemas anatômicos"
            >
              {SYSTEMS.map((sys) => {
                const Icon = sys.icon;
                const isActive = isSystemVisibleOnCanvas(sys.id);
                const dynamicLabel =
                  sys.id === 'reproductive'
                    ? biologicalSex === 'female'
                      ? 'Reprodutor (Fem)'
                      : 'Reprodutor (Masc)'
                    : sys.label;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => handleSystemClick(sys.id)}
                    onDoubleClick={() => {
                      if (sys.id !== 'all') toggleSystem(sys.id);
                    }}
                    aria-pressed={isActive}
                    className={`outliner-filter-btn ${isActive ? 'active' : ''}`}
                    title={
                      filterClickMode === 'peel'
                        ? `Clique para ligar/desligar ${dynamicLabel} sem ocultar o interior (Duplo-clique para isolar)`
                        : `Isolar/acumular sistema: ${dynamicLabel}`
                    }
                  >
                    {sys.orderBadge ? (
                      <span className="outliner-layer-order-badge">{sys.orderBadge}</span>
                    ) : (
                      <Icon size={11} aria-hidden="true" />
                    )}
                    <span>{dynamicLabel}</span>
                    {isActive && <Check size={10} style={{ marginLeft: 'auto' }} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seletor de Regiões Corporais */}
          <div style={{ paddingTop: '0.45rem', borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.07))' }}>
            <div className="outliner-filter-section-label accent">
              <MapPin size={11} aria-hidden="true" />
              <span>Região Corporal (Topografia)</span>
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
                    type="button"
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
        </div>
      )}
    </div>
  );
};

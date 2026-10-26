import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Check,
  Layers,
  RotateCcw,
  Eye,
  EyeOff,
  BookOpen,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  HardDriveDownload,
} from 'lucide-react';
import { useAnatomyStore, getSystemCheckIdsForSex } from '../../../stores/useAnatomyStore.ts';
import { ActiveAnatomicalSystem } from '../../../../shared/types/anatomy.ts';
import { AnatomicalRegion } from '../../canvas/AnatomicalAtlasScene.tsx';
import { ModuleLayersSection } from './ModuleLayersSection.tsx';
import { OfflinePartsManagerSection } from './OfflinePartsManagerSection.tsx';

const GHOST_OPACITY_THRESHOLD = 0.85;
const GHOST_OPACITY_VALUE = 0.3;
const SOLID_OPACITY_VALUE = 1.0;
const INACTIVE_CARD_OPACITY = 0.65;

interface SystemLayerMeta {
  id: ActiveAnatomicalSystem;
  label: string;
  latinName: string;
  physiologicalFunction: string;
}

const SYSTEM_METADATA: Record<string, SystemLayerMeta> = {
  integumentary: {
    id: 'integumentary',
    label: 'Tegumento & Mama',
    latinName: 'Integumentum commune & Mamma',
    physiologicalFunction:
      'Barreira física termorreguladora, recepção somatossensorial e parênquima mamário.',
  },
  muscular: {
    id: 'muscular',
    label: 'Músculos & Fáscias',
    latinName: 'Systema musculare & Fasciae',
    physiologicalFunction:
      'Biomecânica locomotora, postura antigravitacional e contenção miofascial.',
  },
  skeletal: {
    id: 'skeletal',
    label: 'Esqueleto & Ligamentos',
    latinName: 'Systema skeletale & Articulares',
    physiologicalFunction:
      'Arcabouço estrutural rígido, proteção do neuroeixo/mediastino e alavancas articulares.',
  },
  cardiovascular: {
    id: 'cardiovascular',
    label: 'Cardiovascular',
    latinName: 'Systema cardiovasculare',
    physiologicalFunction:
      'Perfusão hemodinâmica arterial sistêmica/pulmonar e retorno venoso.',
  },
  nervous: {
    id: 'nervous',
    label: 'Sistema Nervoso',
    latinName: 'Systema nervosum (SNC + SNP)',
    physiologicalFunction:
      'Processamento cortical, controle motor/sensitivo e 12 pares cranianos (NC I–XII).',
  },
  lymphatic: {
    id: 'lymphatic',
    label: 'Linfático & Imune',
    latinName: 'Systema lymphoideum',
    physiologicalFunction:
      'Drenagem intersticial pelo ducto torácico e vigilância imunológica linfonodal.',
  },
  respiratory: {
    id: 'respiratory',
    label: 'Respiratório',
    latinName: 'Systema respiratorium',
    physiologicalFunction:
      'Condução aerífera traqueobrônquica e hematose alvéolo-capilar.',
  },
  digestive: {
    id: 'digestive',
    label: 'Digestório',
    latinName: 'Systema digestorium',
    physiologicalFunction:
      'Motilidade gastrointestinal, absorção enteral e metabolismo hepatobiliar.',
  },
  urinary: {
    id: 'urinary',
    label: 'Urinário / Renal',
    latinName: 'Systema urinarium',
    physiologicalFunction:
      'Ultrafiltração glomerular, osmorregulação e condução pieloureteral.',
  },
  endocrine: {
    id: 'endocrine',
    label: 'Endócrino',
    latinName: 'Glandulae endocrinae',
    physiologicalFunction:
      'Regulação neuroendócrina hipotalâmico-hipofisária, tireoidiana e adrenal.',
  },
  reproductive: {
    id: 'reproductive',
    label: 'Reprodutor',
    latinName: 'Systema genitale',
    physiologicalFunction:
      'Gametogênese, esteroidogênese gonadal e anatomia pélvica interna.',
  },
};

const REGIONS: Array<{ id: AnatomicalRegion; label: string }> = [
  { id: 'all', label: 'Corpo Inteiro' },
  { id: 'cranium', label: 'Crânio & Face' },
  { id: 'spine', label: 'Coluna' },
  { id: 'thorax', label: 'Tórax' },
  { id: 'upper_limb', label: 'Membros Sup.' },
  { id: 'pelvis', label: 'Pelve' },
  { id: 'lower_limb', label: 'Membros Inf.' },
];

export const AnatomyFiltersSection: React.FC = React.memo(() => {
  const [showLayerFunctions, setShowLayerFunctions] = useState(false);
  const [showOfflineManager, setShowOfflineManager] = useState(false);

  const activeSystems = useAnatomyStore((s) => s.activeSystems);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const biologicalSex = useAnatomyStore((s) => s.biologicalSex);
  const systemOpacities = useAnatomyStore((s) => s.systemOpacities);
  const setSystemOpacity = useAnatomyStore((s) => s.setSystemOpacity);
  const toggleSystem = useAnatomyStore((s) => s.toggleSystem);
  const toggleSystemPeel = useAnatomyStore((s) => s.toggleSystemPeel);
  const setAllSystems = useAnatomyStore((s) => s.setAllSystems);

  const layerOrder = useAnatomyStore((s) => s.layerOrder);
  const moveLayerOrder = useAnatomyStore((s) => s.moveLayerOrder);
  const resetLayerOrder = useAnatomyStore((s) => s.resetLayerOrder);
  const peelNextLayerInOrder = useAnatomyStore((s) => s.peelNextLayerInOrder);
  const restorePreviousLayerInOrder = useAnatomyStore((s) => s.restorePreviousLayerInOrder);

  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const setActiveRegion = useAnatomyStore((s) => s.setActiveRegion);

  const isSystemVisibleOnCanvas = (sysId: ActiveAnatomicalSystem): boolean => {
    if (sysId === 'all') {
      return activeSystems.has('all') && hiddenNodeIds.size === 0;
    }
    if (sysId === 'integumentary' && biologicalSex === 'male' && !activeSystems.has('integumentary')) {
      return false;
    }
    const sysActiveInSet = activeSystems.has('all') || activeSystems.has(sysId);
    if (!sysActiveInSet) return false;
    const ids = getSystemCheckIdsForSex(sysId, biologicalSex);
    if (ids.length === 0) return true;
    return ids.some((id) => !hiddenNodeIds.has(id));
  };

  const visibleSystemsCount = useMemo(
    () => layerOrder.filter((sysId) => isSystemVisibleOnCanvas(sysId)).length,
    [layerOrder, activeSystems, hiddenNodeIds, biologicalSex]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {/* 1. Controles de Dissecação por Planos Cirúrgicos (1 a 6), Exploded View, MPR e Densidade no topo */}
      <ModuleLayersSection />

      <div className="outliner-modules-card">
        <div className="outliner-modules-body" style={{ paddingTop: '0.45rem' }}>
          {/* 2. Região Corporal */}
          <div style={{ marginBottom: '0.65rem' }}>
            <div className="outliner-filter-section-label accent">
              <MapPin size={11} strokeWidth={1.5} aria-hidden="true" />
              <span>Região Corporal</span>
            </div>
            <div
              className="outliner-filter-grid"
              role="group"
              aria-label="Filtro de regiões anatômicas"
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
                  >
                    <span>{reg.label}</span>
                    {isActive && (
                      <Check size={10} strokeWidth={1.5} style={{ marginLeft: 'auto' }} aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Camadas Anatômicas (De Fora para Dentro: 1ª a 11ª) */}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.4rem',
              }}
            >
              <span className="outliner-filter-section-label" style={{ marginBottom: 0 }}>
                Camadas ({visibleSystemsCount}/{layerOrder.length})
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <button
                  type="button"
                  onClick={resetLayerOrder}
                  className="outliner-mini-btn"
                  title="Restaurar ordem canônica das camadas (1ª Ext a 11ª Int)"
                >
                  <span>Ordem</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowLayerFunctions((v) => !v)}
                  aria-pressed={showLayerFunctions}
                  className={`outliner-mini-btn ${showLayerFunctions ? 'active' : ''}`}
                  title="Exibir resumo fisiológico de cada camada"
                >
                  <BookOpen size={10} strokeWidth={1.5} aria-hidden="true" />
                  <span>Info</span>
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.35rem',
                marginBottom: '0.45rem',
              }}
            >
              <button
                type="button"
                onClick={peelNextLayerInOrder}
                className="outliner-mini-btn"
                style={{ justifyContent: 'center', padding: '0.35rem 0.25rem' }}
                title="Retirar a próxima camada externa"
              >
                <Layers size={11} strokeWidth={1.5} aria-hidden="true" />
                <span>-1 Camada</span>
              </button>
              <button
                type="button"
                onClick={restorePreviousLayerInOrder}
                className="outliner-mini-btn"
                style={{ justifyContent: 'center', padding: '0.35rem 0.25rem' }}
                title="Devolver a última camada retirada"
              >
                <RotateCcw size={11} strokeWidth={1.5} aria-hidden="true" />
                <span>+1 Camada</span>
              </button>
              <button
                type="button"
                onClick={setAllSystems}
                aria-pressed={isSystemVisibleOnCanvas('all')}
                className={`outliner-mini-btn ${isSystemVisibleOnCanvas('all') ? 'active' : ''}`}
                style={{ justifyContent: 'center', padding: '0.35rem 0.25rem' }}
                title="Mostrar todas as 11 camadas anatômicas"
              >
                <Check size={11} strokeWidth={1.5} aria-hidden="true" />
                <span>Todas</span>
              </button>
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}
              role="group"
              aria-label="Lista de camadas anatômicas"
            >
              {layerOrder.map((sysId, index) => {
                const meta = SYSTEM_METADATA[sysId] || {
                  id: sysId,
                  label: sysId,
                  latinName: '',
                  physiologicalFunction: '',
                };
                const isActive = isSystemVisibleOnCanvas(sysId);
                const currentOpacity = systemOpacities[sysId as ActiveAnatomicalSystem] ?? SOLID_OPACITY_VALUE;
                const isGhostOpacity = isActive && currentOpacity < GHOST_OPACITY_THRESHOLD;
                const dynamicLabel =
                  sysId === 'reproductive'
                    ? biologicalSex === 'female'
                      ? 'Reprodutor (Feminino)'
                      : 'Reprodutor (Masculino)'
                    : meta.label;

                return (
                  <div
                    key={sysId}
                    className="layer-peel-item"
                    style={{
                      padding: '0.36rem 0.45rem',
                      borderRadius: '0.4rem',
                      background: isActive ? 'var(--bg-tertiary)' : 'var(--bg-well)',
                      border: '1px solid var(--border-subtle)',
                      opacity: isActive ? SOLID_OPACITY_VALUE : INACTIVE_CARD_OPACITY,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.28rem',
                        width: '100%',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSystemPeel(sysId)}
                        onDoubleClick={() => toggleSystem(sysId)}
                        aria-pressed={isActive}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.38rem',
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          padding: 0,
                          textAlign: 'left',
                          flex: 1,
                          minWidth: 0,
                        }}
                        title={`Clique para mostrar/ocultar ${dynamicLabel} (Duplo-clique para isolar)`}
                      >
                        <span className="outliner-layer-order-badge">{index + 1}ª</span>
                        <span
                          style={{
                            fontSize: '0.73rem',
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {dynamicLabel}
                        </span>
                        {isActive ? (
                          <Eye size={11} strokeWidth={1.5} style={{ marginLeft: 'auto', opacity: 0.8, flexShrink: 0 }} aria-hidden="true" />
                        ) : (
                          <EyeOff size={11} strokeWidth={1.5} style={{ marginLeft: 'auto', opacity: 0.45, flexShrink: 0 }} aria-hidden="true" />
                        )}
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.18rem', flexShrink: 0 }}>
                        <button
                          type="button"
                          onClick={() => moveLayerOrder(sysId, 'up')}
                          disabled={index === 0}
                          className="outliner-mini-btn"
                          style={{ padding: '0.12rem 0.22rem' }}
                          title={`Mover ${dynamicLabel} para cima na fila de dissecação`}
                          aria-label={`Subir prioridade de ${dynamicLabel}`}
                        >
                          <ArrowUp size={10} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveLayerOrder(sysId, 'down')}
                          disabled={index === layerOrder.length - 1}
                          className="outliner-mini-btn"
                          style={{ padding: '0.12rem 0.22rem' }}
                          title={`Mover ${dynamicLabel} para baixo na fila de dissecação`}
                          aria-label={`Descer prioridade de ${dynamicLabel}`}
                        >
                          <ArrowDown size={10} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isActive) toggleSystemPeel(sysId);
                            setSystemOpacity(
                              sysId as ActiveAnatomicalSystem,
                              isGhostOpacity ? SOLID_OPACITY_VALUE : GHOST_OPACITY_VALUE
                            );
                          }}
                          className={`outliner-mini-btn ${isGhostOpacity ? 'active' : ''}`}
                          style={{ padding: '0.12rem 0.35rem', fontSize: '0.64rem' }}
                          title="Alternar translucidez desta camada (30% vs 100%)"
                        >
                          <span>{isGhostOpacity ? '30%' : '100%'}</span>
                        </button>
                      </div>
                    </div>

                    {showLayerFunctions && meta.physiologicalFunction && (
                      <p
                        style={{
                          fontSize: '0.66rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.35,
                          margin: '0.25rem 0 0 0',
                        }}
                      >
                        {meta.physiologicalFunction}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Gerenciador de Partes na GPU & Cache Offline (.GLB) */}
      <div className="outliner-modules-card">
        <button
          type="button"
          onClick={() => setShowOfflineManager((v) => !v)}
          className="outliner-modules-toggle"
          aria-expanded={showOfflineManager}
        >
          <div className="outliner-modules-toggle-left">
            <HardDriveDownload size={13} strokeWidth={1.5} className="text-cyan-400" aria-hidden="true" />
            <span>Otimizador GPU & Cache Offline (.GLB)</span>
          </div>
          {showOfflineManager ? (
            <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
        {showOfflineManager && (
          <div className="outliner-modules-body">
            <OfflinePartsManagerSection />
          </div>
        )}
      </div>
    </div>
  );
});

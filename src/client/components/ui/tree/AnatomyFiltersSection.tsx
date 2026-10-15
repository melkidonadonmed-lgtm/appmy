import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Check,
  Layers,
  RotateCcw,
  Eye,
  EyeOff,
  BookOpen,
} from 'lucide-react';
import { useAnatomyStore, getSystemCheckIdsForSex } from '../../../stores/useAnatomyStore.ts';
import { ActiveAnatomicalSystem } from '../../../../shared/types/anatomy.ts';
import { AnatomicalRegion } from '../../canvas/AnatomicalAtlasScene.tsx';

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

export const AnatomyFiltersSection: React.FC = () => {
  const [showLayerFunctions, setShowLayerFunctions] = useState(false);

  const activeSystems = useAnatomyStore((s) => s.activeSystems);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const biologicalSex = useAnatomyStore((s) => s.biologicalSex);
  const systemOpacities = useAnatomyStore((s) => s.systemOpacities);
  const setSystemOpacity = useAnatomyStore((s) => s.setSystemOpacity);
  const toggleSystem = useAnatomyStore((s) => s.toggleSystem);
  const toggleSystemPeel = useAnatomyStore((s) => s.toggleSystemPeel);
  const setAllSystems = useAnatomyStore((s) => s.setAllSystems);

  const layerOrder = useAnatomyStore((s) => s.layerOrder);
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
    <div className="outliner-modules-card">
      <div className="outliner-modules-body" style={{ paddingTop: '0.45rem' }}>
        {/* 1. Região Corporal */}
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
              Camadas ({visibleSystemsCount}/11)
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <button
                type="button"
                onClick={peelNextLayerInOrder}
                className="outliner-mini-btn"
                title="Retirar a próxima camada externa"
              >
                <Layers size={10} strokeWidth={1.5} aria-hidden="true" />
                <span>-1 Camada</span>
              </button>
              <button
                type="button"
                onClick={restorePreviousLayerInOrder}
                className="outliner-mini-btn"
                title="Devolver a última camada retirada"
              >
                <RotateCcw size={10} strokeWidth={1.5} aria-hidden="true" />
                <span>+1</span>
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

          <div style={{ marginBottom: '0.35rem' }}>
            <button
              type="button"
              onClick={setAllSystems}
              aria-pressed={isSystemVisibleOnCanvas('all')}
              className={`outliner-filter-btn ${isSystemVisibleOnCanvas('all') ? 'active' : ''}`}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Mostrar Todas as Camadas</span>
              {isSystemVisibleOnCanvas('all') && (
                <Check size={10} strokeWidth={1.5} style={{ marginLeft: 'auto' }} aria-hidden="true" />
              )}
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
              const currentOpacity = systemOpacities[sysId as ActiveAnatomicalSystem] ?? 1.0;
              const isGhostOpacity = isActive && currentOpacity < 0.85;
              const dynamicLabel =
                sysId === 'reproductive'
                  ? biologicalSex === 'female'
                    ? 'Reprodutor (Feminino)'
                    : 'Reprodutor (Masculino)'
                  : meta.label;

              return (
                <div
                  key={sysId}
                  style={{
                    padding: '0.36rem 0.45rem',
                    borderRadius: '0.4rem',
                    background: isActive ? 'var(--bg-tertiary)' : 'var(--bg-well)',
                    border: '1px solid var(--border-subtle)',
                    opacity: isActive ? 1 : 0.65,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.35rem',
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
                        gap: '0.4rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        flex: 1,
                      }}
                      title={`Clique para mostrar/ocultar ${dynamicLabel} (Duplo-clique para isolar)`}
                    >
                      <span className="outliner-layer-order-badge">{index + 1}ª</span>
                      <span style={{ fontSize: '0.74rem', fontWeight: 600 }}>{dynamicLabel}</span>
                      {isActive ? (
                        <Eye size={11} strokeWidth={1.5} style={{ marginLeft: 'auto', opacity: 0.8 }} aria-hidden="true" />
                      ) : (
                        <EyeOff size={11} strokeWidth={1.5} style={{ marginLeft: 'auto', opacity: 0.45 }} aria-hidden="true" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!isActive) toggleSystemPeel(sysId);
                        setSystemOpacity(sysId as ActiveAnatomicalSystem, isGhostOpacity ? 1.0 : 0.3);
                      }}
                      className={`outliner-mini-btn ${isGhostOpacity ? 'active' : ''}`}
                      style={{ padding: '0.12rem 0.38rem', fontSize: '0.64rem' }}
                      title="Alternar translucidez desta camada (30% vs 100%)"
                    >
                      <span>{isGhostOpacity ? '30%' : '100%'}</span>
                    </button>
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
  );
};

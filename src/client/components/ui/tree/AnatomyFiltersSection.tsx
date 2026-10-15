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
  Scissors,
  Undo2,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  BookOpen,
} from 'lucide-react';
import { useAnatomyStore, getSystemCheckIdsForSex } from '../../../stores/useAnatomyStore.ts';
import { ActiveAnatomicalSystem } from '../../../../shared/types/anatomy.ts';
import { AnatomicalRegion } from '../../canvas/AnatomicalAtlasScene.tsx';
import { ANATOMY_PARTS_MANIFEST } from '../../../lib/modelCacheManager.ts';
import { OfflinePartsManagerSection } from './OfflinePartsManagerSection.tsx';

interface SystemOption {
  id: ActiveAnatomicalSystem;
  label: string;
  latinName?: string;
  physiologicalFunction?: string;
  clinicalRelation?: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const SYSTEM_METADATA: Record<string, SystemOption> = {
  all: {
    id: 'all',
    label: 'Mostrar Todos',
    icon: Sliders,
  },
  integumentary: {
    id: 'integumentary',
    label: 'Tegumento & Mama',
    latinName: 'Integumentum commune & Glandula mammaria',
    physiologicalFunction:
      'Barreira física termorreguladora, recepção somatossensorial exteroceptiva e parênquima lactífero mamário.',
    clinicalRelation: '1ª camada superficial; rebater para expor fáscia peitoral e drenagem linfática axilar.',
    icon: Shield,
  },
  muscular: {
    id: 'muscular',
    label: 'Músculos & Fáscias',
    latinName: 'Systema musculare & Fasciae',
    physiologicalFunction:
      'Biomecânica locomotora, postura antigravitacional, contenção miofascial compartimental e termogênese.',
    clinicalRelation: '2ª camada; protege feixes vasculonervosos profundos e articulações sinoviais.',
    icon: Activity,
  },
  skeletal: {
    id: 'skeletal',
    label: 'Esqueleto & Lig.',
    latinName: 'Systema skeletale & Articulares',
    physiologicalFunction:
      'Arcabouço estrutural rígido, proteção da medula e encéfalo, alavancas biomecânicas e homeostase mineral.',
    clinicalRelation: '3ª camada; tornar translúcido (35%) para inspecionar encéfalo intracraniano ou mediastino.',
    icon: Bone,
  },
  cardiovascular: {
    id: 'cardiovascular',
    label: 'Cardiovascular',
    latinName: 'Systema cardiovasculare',
    physiologicalFunction:
      'Perfusão hemodinâmica arterial sistêmica/pulmonar, Polígono de Willis e retorno venoso cavo/jugular.',
    clinicalRelation: '4ª camada; acompanha nervos periféricos em bainhas vasculonervosas.',
    icon: HeartPulse,
  },
  lymphatic: {
    id: 'lymphatic',
    label: 'Linfático & Imune',
    latinName: 'Systema lymphoideum',
    physiologicalFunction:
      'Drenagem do fluido intersticial, transporte de quilomícrons (ducto torácico) e vigilância imunológica.',
    clinicalRelation: '5ª camada; cadeias sentinela cervicais, axilares, mediastinais e inguinais.',
    icon: Shield,
  },
  nervous: {
    id: 'nervous',
    label: 'Sistema Nervoso',
    latinName: 'Systema nervosum (SNC + SNP)',
    physiologicalFunction:
      'Processamento cortical, controle motor piramidal/extrapiramidal, sensibilidade e integração autonômica (I–XII).',
    clinicalRelation: '6ª camada; protegido pelo neurocrânio e canal vertebral.',
    icon: Brain,
  },
  respiratory: {
    id: 'respiratory',
    label: 'Respiratório',
    latinName: 'Systema respiratorium',
    physiologicalFunction:
      'Condução aerífera traqueobrônquica, hematose alveolar e regulação do equilíbrio ácido-básico.',
    clinicalRelation: '7ª camada; ocupa as cavidades pleurais laterais ao mediastino.',
    icon: Wind,
  },
  digestive: {
    id: 'digestive',
    label: 'Digestório',
    latinName: 'Systema digestorium',
    physiologicalFunction:
      'Motilidade gastrointestinal, digestão enzimática, absorção enteral e metabolismo hepatobiliar.',
    clinicalRelation: '8ª camada; órgãos peritoneais e secundariamente retroperitoneais.',
    icon: Utensils,
  },
  urinary: {
    id: 'urinary',
    label: 'Urinário / Renal',
    latinName: 'Systema urinarium',
    physiologicalFunction:
      'Ultrafiltração glomerular, osmorregulação, depuração metabólica e condução pieloureteral.',
    clinicalRelation: '9ª camada; loja renal retroperitoneal (T12–L3) anterior ao m. psoas maior.',
    icon: Droplet,
  },
  endocrine: {
    id: 'endocrine',
    label: 'Endócrino',
    latinName: 'Glandulae endocrinae',
    physiologicalFunction:
      'Regulação neuroendócrina hipotalâmico-hipofisária, metabolismo tireoidiano e resposta corticomedular adrenal.',
    clinicalRelation: '10ª camada; relação íntima com sela túrcica, traqueia e polo renal superior.',
    icon: Zap,
  },
  reproductive: {
    id: 'reproductive',
    label: 'Reprodutor',
    latinName: 'Systema genitale',
    physiologicalFunction:
      'Gametogênese, esteroidogênese gonadal e órgãos pélvicos internos e perineais.',
    clinicalRelation: '11ª camada profunda na cavidade pélvica verdadeira.',
    icon: Dna,
  },
};

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
  const [showLayerFunctions, setShowLayerFunctions] = useState(true);

  const activeSystems = useAnatomyStore((s) => s.activeSystems);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const biologicalSex = useAnatomyStore((s) => s.biologicalSex);
  const systemOpacities = useAnatomyStore((s) => s.systemOpacities);
  const setSystemOpacity = useAnatomyStore((s) => s.setSystemOpacity);
  const toggleSystem = useAnatomyStore((s) => s.toggleSystem);
  const toggleSystemPeel = useAnatomyStore((s) => s.toggleSystemPeel);
  const setAllSystems = useAnatomyStore((s) => s.setAllSystems);

  const peelOnClickMode = useAnatomyStore((s) => s.peelOnClickMode);
  const togglePeelOnClickMode = useAnatomyStore((s) => s.togglePeelOnClickMode);
  const peeledHistory = useAnatomyStore((s) => s.peeledHistory);
  const undoLastPeel = useAnatomyStore((s) => s.undoLastPeel);
  const clearPeeledHistory = useAnatomyStore((s) => s.clearPeeledHistory);

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

  const visibleSystemsCount = useMemo(() => {
    return layerOrder.filter((sysId) => isSystemVisibleOnCanvas(sysId)).length;
  }, [layerOrder, activeSystems, hiddenNodeIds, biologicalSex]);

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
    <div>
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
            <Sliders size={13} strokeWidth={1.5} className="text-cyan-400" aria-hidden="true" />
            <span>Camadas, Bisturi 3D & Funções</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="outliner-count-badge">{activeSystemsLabel}</span>
            {isExpanded ? (
              <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
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
            {/* 1. MODO BISTURI 3D (Click-to-Peel igual Z-Anatomy / Complete Anatomy) */}
            <div
              style={{
                padding: '0.5rem',
                marginBottom: '0.55rem',
                borderRadius: '0.45rem',
                background: peelOnClickMode
                  ? 'rgba(20, 184, 166, 0.14)'
                  : 'var(--bg-well, rgba(0, 0, 0, 0.25))',
                border: peelOnClickMode
                  ? '1px solid rgba(20, 184, 166, 0.45)'
                  : '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.4rem',
                  marginBottom: '0.35rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Scissors size={13} strokeWidth={1.5} className="text-cyan-400" aria-hidden="true" />
                  <span style={{ fontSize: '0.73rem', fontWeight: 600 }}>
                    Bisturi 3D (Clicar p/ Retirar Camada)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={togglePeelOnClickMode}
                  aria-pressed={peelOnClickMode}
                  className={`outliner-mini-btn ${peelOnClickMode ? 'active' : ''}`}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontWeight: 600,
                    background: peelOnClickMode ? 'rgba(20, 184, 166, 0.28)' : undefined,
                    borderColor: peelOnClickMode ? 'rgba(20, 184, 166, 0.65)' : undefined,
                  }}
                  title="Quando ativo, cada clique em uma estrutura no modelo 3D retira (oculta) essa peça para expor a camada profunda seguinte (ou segure Alt+Clique)"
                >
                  <span>{peelOnClickMode ? 'ATIVO (Clique retira)' : 'Ativar Bisturi'}</span>
                </button>
              </div>

              <p
                style={{
                  fontSize: '0.66rem',
                  color: 'var(--text-muted, #94a3b8)',
                  lineHeight: 1.35,
                  margin: '0 0 0.4rem 0',
                }}
              >
                Posicione a câmera e clique diretamente sobre músculos, ossos ou vasos no 3D para ir retirando camada por camada (atalho rápido: <strong>Alt + Clique</strong>).
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                <button
                  type="button"
                  onClick={peelNextLayerInOrder}
                  className="outliner-mini-btn"
                  title="Retirar a próxima camada externa segundo a ordem configurada abaixo"
                >
                  <Layers size={11} strokeWidth={1.5} aria-hidden="true" />
                  <span>Retirar Próxima Camada</span>
                </button>

                <button
                  type="button"
                  onClick={restorePreviousLayerInOrder}
                  className="outliner-mini-btn"
                  title="Devolver a última camada de sistema ocultada na sequência"
                >
                  <RotateCcw size={11} strokeWidth={1.5} aria-hidden="true" />
                  <span>Devolver Camada</span>
                </button>

                {peeledHistory.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={undoLastPeel}
                      className="outliner-mini-btn"
                      title="Desfazer a última peça retirada com o Bisturi 3D"
                    >
                      <Undo2 size={11} strokeWidth={1.5} aria-hidden="true" />
                      <span>Desfazer Peça ({peeledHistory.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={clearPeeledHistory}
                      className="outliner-mini-btn"
                      title="Restaurar todas as peças retiradas individualmente"
                    >
                      <span>Restaurar ({peeledHistory.length})</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 2. Seletor de Modo de Clique nos Filtros: Descascar Camada vs Isolar */}
            <div className="outliner-filter-mode-bar" role="group" aria-label="Modo de ação dos filtros de sistema">
              <button
                type="button"
                onClick={() => setFilterClickMode('peel')}
                aria-pressed={filterClickMode === 'peel'}
                className={`outliner-filter-mode-pill ${filterClickMode === 'peel' ? 'active' : ''}`}
                title="Modo Descascar: Clicar em uma camada oculta ou exibe apenas ela, mantendo todas as camadas internas visíveis"
              >
                <Layers size={11} strokeWidth={1.5} aria-hidden="true" />
                <span>Descascar Camada (Ligar/Desligar)</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterClickMode('isolate')}
                aria-pressed={filterClickMode === 'isolate'}
                className={`outliner-filter-mode-pill ${filterClickMode === 'isolate' ? 'active' : ''}`}
                title="Modo Isolar: Clicar em um sistema exibe somente ele e oculta o restante"
              >
                <Focus size={11} strokeWidth={1.5} aria-hidden="true" />
                <span>Isolar Sistema</span>
              </button>
            </div>

            {/* 3. Organização de Camadas & Funções Fisiológicas (Reordenável) */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.35rem',
                }}
              >
                <span className="outliner-filter-section-label" style={{ marginBottom: 0 }}>
                  Ordem das Camadas (1ª → 11ª) & Funções
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowLayerFunctions((v) => !v)}
                    aria-pressed={showLayerFunctions}
                    className={`outliner-mini-btn ${showLayerFunctions ? 'active' : ''}`}
                    title="Mostrar ou ocultar a descrição detalhada das funções fisiológicas e relações cirúrgicas de cada camada"
                  >
                    <BookOpen size={10} strokeWidth={1.5} aria-hidden="true" />
                    <span>{showLayerFunctions ? 'Ocultar Funções' : 'Ver Funções'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetLayerOrder}
                    className="outliner-mini-btn"
                    title="Restaurar ordem estratigráfica padrão (1ª Externa → 11ª Interna)"
                  >
                    <RotateCcw size={10} strokeWidth={1.5} aria-hidden="true" />
                    <span>Padrão</span>
                  </button>
                </div>
              </div>

              {/* Botão Mostrar Todos */}
              <div style={{ marginBottom: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => handleSystemClick('all')}
                  aria-pressed={isSystemVisibleOnCanvas('all')}
                  className={`outliner-filter-btn ${isSystemVisibleOnCanvas('all') ? 'active' : ''}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  title="Restaurar visibilidade de todas as 11 camadas anatômicas"
                >
                  <Sliders size={11} strokeWidth={1.5} aria-hidden="true" />
                  <span>Mostrar Todas as 11 Camadas Anatômicas</span>
                  {isSystemVisibleOnCanvas('all') && (
                    <Check size={10} strokeWidth={1.5} style={{ marginLeft: 'auto' }} aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Lista Ordenável de Camadas com Função Fisiológica e Translucência */}
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '0.32rem' }}
                role="group"
                aria-label="Ordem estratigráfica das camadas anatômicas e funções"
              >
                {layerOrder.map((sysId, index) => {
                  const meta = SYSTEM_METADATA[sysId] || {
                    id: sysId,
                    label: sysId,
                    icon: Layers,
                  };
                  const Icon = meta.icon;
                  const isActive = isSystemVisibleOnCanvas(sysId);
                  const currentOpacity = systemOpacities[sysId as ActiveAnatomicalSystem] ?? 1.0;
                  const isGhostOpacity = isActive && currentOpacity < 0.85;
                  const dynamicLabel =
                    sysId === 'reproductive'
                      ? biologicalSex === 'female'
                        ? 'Reprodutor (Feminino)'
                        : 'Reprodutor (Masculino)'
                      : meta.label;

                  const partManifest = ANATOMY_PARTS_MANIFEST.find((p) => p.id === sysId);

                  return (
                    <div
                      key={sysId}
                      style={{
                        padding: '0.4rem 0.45rem',
                        borderRadius: '0.4rem',
                        background: isActive
                          ? 'var(--bg-elevated, rgba(255, 255, 255, 0.04))'
                          : 'var(--bg-well, rgba(0, 0, 0, 0.2))',
                        border: isActive
                          ? '1px solid var(--border-strong, rgba(255, 255, 255, 0.14))'
                          : '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
                        opacity: isActive ? 1 : 0.68,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.3rem',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleSystemClick(sysId)}
                          onDoubleClick={() => toggleSystem(sysId)}
                          aria-pressed={isActive}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary, #f8fafc)',
                            cursor: 'pointer',
                            padding: 0,
                            textAlign: 'left',
                            flex: 1,
                          }}
                          title={
                            filterClickMode === 'peel'
                              ? `Clique para ligar/desligar ${dynamicLabel} (Duplo-clique para isolar)`
                              : `Isolar sistema: ${dynamicLabel}`
                          }
                        >
                          <span className="outliner-layer-order-badge">{index + 1}ª</span>
                          <Icon size={12} strokeWidth={1.5} className="text-cyan-400" aria-hidden="true" />
                          <span style={{ fontSize: '0.73rem', fontWeight: 600 }}>{dynamicLabel}</span>
                          {isActive ? (
                            <Eye size={11} strokeWidth={1.5} className="text-cyan-400" aria-hidden="true" />
                          ) : (
                            <EyeOff size={11} strokeWidth={1.5} aria-hidden="true" />
                          )}
                        </button>

                        {/* Controles rápidos de Translucência (100% / 35%) e Ordem (Subir / Descer) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (!isActive) toggleSystemPeel(sysId);
                              setSystemOpacity(sysId as ActiveAnatomicalSystem, isGhostOpacity ? 1.0 : 0.3);
                            }}
                            className={`outliner-mini-btn ${isGhostOpacity ? 'active' : ''}`}
                            style={{ padding: '0.12rem 0.32rem', fontSize: '0.62rem' }}
                            title="Alternar translucência cirúrgica (30% vs 100%) para ver estruturas subjacentes através desta camada"
                          >
                            <span>{isGhostOpacity ? '30%' : '100%'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => moveLayerOrder(sysId, 'up')}
                            disabled={index === 0}
                            className="outliner-mini-btn"
                            style={{ padding: '0.12rem 0.25rem', opacity: index === 0 ? 0.35 : 1 }}
                            title={`Subir ${dynamicLabel} na ordem de dissecação`}
                            aria-label={`Mover camada ${dynamicLabel} para cima`}
                          >
                            <ArrowUp size={10} strokeWidth={1.5} aria-hidden="true" />
                          </button>

                          <button
                            type="button"
                            onClick={() => moveLayerOrder(sysId, 'down')}
                            disabled={index === layerOrder.length - 1}
                            className="outliner-mini-btn"
                            style={{
                              padding: '0.12rem 0.25rem',
                              opacity: index === layerOrder.length - 1 ? 0.35 : 1,
                            }}
                            title={`Descer ${dynamicLabel} na ordem de dissecação`}
                            aria-label={`Mover camada ${dynamicLabel} para baixo`}
                          >
                            <ArrowDown size={10} strokeWidth={1.5} aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {showLayerFunctions && (
                        <div style={{ marginTop: '0.28rem', paddingLeft: '0.15rem' }}>
                          {meta.latinName && (
                            <div
                              style={{
                                fontSize: '0.62rem',
                                fontStyle: 'italic',
                                color: 'var(--text-muted, #94a3b8)',
                                marginBottom: '0.12rem',
                              }}
                            >
                              {meta.latinName}
                              {partManifest ? ` • ${partManifest.meshCount} malhas` : ''}
                            </div>
                          )}
                          {meta.physiologicalFunction && (
                            <p
                              style={{
                                fontSize: '0.66rem',
                                color: 'var(--text-secondary, #cbd5e1)',
                                lineHeight: 1.35,
                                margin: '0 0 0.15rem 0',
                              }}
                            >
                              <strong>Função:</strong> {meta.physiologicalFunction}
                            </p>
                          )}
                          {meta.clinicalRelation && (
                            <p
                              style={{
                                fontSize: '0.63rem',
                                color: 'var(--text-muted, #94a3b8)',
                                lineHeight: 1.3,
                                margin: 0,
                              }}
                            >
                              <strong>Dissecação:</strong> {meta.clinicalRelation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Seletor de Regiões Corporais */}
            <div style={{ paddingTop: '0.45rem', borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.07))' }}>
              <div className="outliner-filter-section-label accent">
                <MapPin size={11} strokeWidth={1.5} aria-hidden="true" />
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
                      {isActive && <Check size={10} strokeWidth={1.5} style={{ marginLeft: 'auto' }} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Seção de Download Offline & Carregamento Seletivo GPU (Alto FPS) */}
      <OfflinePartsManagerSection />
    </div>
  );
};

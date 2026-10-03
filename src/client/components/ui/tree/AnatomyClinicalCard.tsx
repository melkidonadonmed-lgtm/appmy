import React, { useEffect } from 'react';
import {
  Stethoscope,
  X,
  Focus,
  Maximize2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  HeartPulse,
  Shield,
  Brain,
  Activity,
  Bone,
  Check,
  Layers,
  Sliders,
} from 'lucide-react';
import { AnyAnatomicalNode } from '../../canvas/AnatomicalAtlasScene.tsx';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG } from '../../../../shared/constants/zAnatomyCatalog.ts';

interface AnatomyClinicalCardProps {
  selectedNode: AnyAnatomicalNode;
  onClose: () => void;
  allCatalogIds: string[];
}

export const AnatomyClinicalCard: React.FC<AnatomyClinicalCardProps> = ({
  selectedNode,
  onClose,
  allCatalogIds,
}) => {
  // Detalhes clínicos iniciam recolhidos para não tampar a árvore ou o viewport 3D
  const [detailsExpanded, setDetailsExpanded] = React.useState(false);

  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const toggleVisibility = useAnatomyStore((s) => s.toggleVisibility);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);
  const isolatedOnly = useAnatomyStore((s) => s.isolatedOnly);
  const toggleIsolatedOnly = useAnatomyStore((s) => s.toggleIsolatedOnly);
  const toggleSystem = useAnatomyStore((s) => s.toggleSystem);
  const isSystemActive = useAnatomyStore((s) => s.isSystemActive);
  const setSystemOpacity = useAnatomyStore((s) => s.setSystemOpacity);
  const getSystemOpacity = useAnatomyStore((s) => s.getSystemOpacity);
  const resetSystemOpacities = useAnatomyStore((s) => s.resetSystemOpacities);

  const isCurrentHidden = hiddenNodeIds.has(selectedNode.id);

  // Fecha o card ao pressionar a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleFocus = () => {
    const item = Z_ANATOMY_CATALOG.find(
      (c) => c.id === selectedNode.id || c.node === selectedNode.id
    );
    if (item && item.explosionVector) {
      setCameraFocusTarget([
        item.explosionVector.x * 0.1,
        item.explosionVector.y * 0.1,
        item.explosionVector.z * 0.1,
      ]);
    } else {
      setCameraFocusTarget([0, 0, 0]);
    }
  };

  const handleIsolate = () => {
    isolateNode([selectedNode.id], allCatalogIds);
    toggleIsolatedOnly();
  };

  const isCardioActive = isSystemActive('cardiovascular');
  const isLymphActive = isSystemActive('lymphatic');
  const isNervousActive = isSystemActive('nervous');
  const isMuscularActive = isSystemActive('muscular');
  const isSkeletalActive = isSystemActive('skeletal');

  // Sliders de opacidade para as camadas ativas
  const cardioOpacity = getSystemOpacity('cardiovascular');
  const lymphOpacity = getSystemOpacity('lymphatic');
  const nervousOpacity = getSystemOpacity('nervous');
  const muscularOpacity = getSystemOpacity('muscular');
  const skeletalOpacity = getSystemOpacity('skeletal');

  const hasAnyActiveLayer =
    isCardioActive || isLymphActive || isNervousActive || isMuscularActive || isSkeletalActive;

  return (
    <div
      className="outliner-clinical-card"
      role="region"
      aria-label="Ficha clínica da estrutura selecionada"
    >
      {/* Cabeçalho do Card */}
      <div className="outliner-clinical-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
          <Stethoscope size={14} className="text-cyan-400" aria-hidden="true" />
          <span className="outliner-clinical-title">Ficha Anatômica</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <button
            type="button"
            onClick={onClose}
            title="Fechar seleção (Esc)"
            aria-label="Fechar ficha clínica e desselecionar estrutura"
            className="outliner-icon-btn danger"
          >
            <X size={13} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Identificação da Peça */}
      <div className="outliner-clinical-body">
        <div className="outliner-clinical-name-pt">{selectedNode.namePtBr}</div>
        {selectedNode.nameLatin && (
          <div className="outliner-clinical-name-latin">{selectedNode.nameLatin}</div>
        )}

        <div className="outliner-clinical-tags">
          {selectedNode.fmaId && (
            <span className="fma-chip">{selectedNode.fmaId}</span>
          )}
          {selectedNode.systemName && (
            <span className="outliner-system-tag">{selectedNode.systemName}</span>
          )}
        </div>

        {/* Barra de Ações Rápidas Clínicas */}
        <div className="outliner-clinical-actions" role="group" aria-label="Ações de visualização 3D">
          <button
            type="button"
            onClick={handleFocus}
            title="Focar câmera 3D nesta estrutura (Tecla F)"
            className="outliner-action-pill"
          >
            <Focus size={11} aria-hidden="true" />
            <span>Focar (F)</span>
          </button>
          <button
            type="button"
            onClick={handleIsolate}
            title="Isolar estrutura no 3D (Tecla I)"
            className={`outliner-action-pill ${isolatedOnly ? 'active' : ''}`}
          >
            <Maximize2 size={11} aria-hidden="true" />
            <span>{isolatedOnly ? 'Restaurar' : 'Isolar (I)'}</span>
          </button>
          <button
            type="button"
            onClick={() => toggleVisibility(selectedNode.id)}
            title="Ocultar ou exibir esta peça (Tecla H)"
            className={`outliner-action-pill ${isCurrentHidden ? 'active-warning' : ''}`}
          >
            {isCurrentHidden ? (
              <Eye size={11} aria-hidden="true" />
            ) : (
              <EyeOff size={11} aria-hidden="true" />
            )}
            <span>{isCurrentHidden ? 'Exibir (H)' : 'Ocultar (H)'}</span>
          </button>
        </div>

        {/* Sobreposição de Camadas Funcionais (Multi-Sistema com 1 Clique) */}
        <div className="outliner-clinical-layers" role="group" aria-label="Sobreposição rápida de camadas anatômicas">
          <div className="outliner-clinical-layers-title">
            <Layers size={11} aria-hidden="true" />
            <span>Sobrepor Camadas Relacionadas:</span>
          </div>
          <div className="outliner-clinical-layers-grid">
            <button
              type="button"
              onClick={() => toggleSystem('cardiovascular')}
              title={isCardioActive ? 'Ocultar vascularização' : 'Sobrepor vascularização (artérias e veias)'}
              className={`outliner-layer-btn cardio ${isCardioActive ? 'active' : ''}`}
            >
              <HeartPulse size={11} aria-hidden="true" />
              <span>Vascularização</span>
              {isCardioActive && <Check size={10} aria-hidden="true" />}
            </button>

            <button
              type="button"
              onClick={() => toggleSystem('lymphatic')}
              title={isLymphActive ? 'Ocultar sistema linfático' : 'Sobrepor sistema linfático'}
              className={`outliner-layer-btn lymph ${isLymphActive ? 'active' : ''}`}
            >
              <Shield size={11} aria-hidden="true" />
              <span>Linfático</span>
              {isLymphActive && <Check size={10} aria-hidden="true" />}
            </button>

            <button
              type="button"
              onClick={() => toggleSystem('nervous')}
              title={isNervousActive ? 'Ocultar inervação' : 'Sobrepor inervação e nervos'}
              className={`outliner-layer-btn nervous ${isNervousActive ? 'active' : ''}`}
            >
              <Brain size={11} aria-hidden="true" />
              <span>Inervação</span>
              {isNervousActive && <Check size={10} aria-hidden="true" />}
            </button>

            <button
              type="button"
              onClick={() => toggleSystem('muscular')}
              title={isMuscularActive ? 'Ocultar músculos e fáscias' : 'Sobrepor musculatura e fáscias'}
              className={`outliner-layer-btn muscular ${isMuscularActive ? 'active' : ''}`}
            >
              <Activity size={11} aria-hidden="true" />
              <span>Fáscias/Músc.</span>
              {isMuscularActive && <Check size={10} aria-hidden="true" />}
            </button>

            <button
              type="button"
              onClick={() => toggleSystem('skeletal')}
              title={isSkeletalActive ? 'Ocultar esqueleto' : 'Sobrepor arcabouço ósseo'}
              className={`outliner-layer-btn skeletal ${isSkeletalActive ? 'active' : ''}`}
              style={{ gridColumn: 'span 2' }}
            >
              <Bone size={11} aria-hidden="true" />
              <span>Esqueleto / Arcabouço Ósseo</span>
              {isSkeletalActive && <Check size={10} aria-hidden="true" />}
            </button>
          </div>

          {/* Sliders de Transparência / Opacidade Individual por Camada Sobreposta */}
          {hasAnyActiveLayer && (
            <div className="outliner-layers-opacity-control" role="group" aria-label="Controle de transparência das camadas sobrepostas">
              <div className="outliner-opacity-control-header">
                <Sliders size={11} aria-hidden="true" />
                <span>Transparência das Camadas:</span>
              </div>

              {isCardioActive && (
                <div className="outliner-opacity-slider-row">
                  <span className="outliner-slider-label text-rose-400">Vasos:</span>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={cardioOpacity}
                    onChange={(e) => setSystemOpacity('cardiovascular', parseFloat(e.target.value))}
                    aria-label="Opacidade do Sistema Cardiovascular"
                    className="outliner-opacity-range range-cardio"
                  />
                  <span className="outliner-slider-value">{Math.round(cardioOpacity * 100)}%</span>
                </div>
              )}

              {isMuscularActive && (
                <div className="outliner-opacity-slider-row">
                  <span className="outliner-slider-label text-orange-400">Músculos:</span>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={muscularOpacity}
                    onChange={(e) => setSystemOpacity('muscular', parseFloat(e.target.value))}
                    aria-label="Opacidade do Sistema Muscular"
                    className="outliner-opacity-range range-muscular"
                  />
                  <span className="outliner-slider-value">{Math.round(muscularOpacity * 100)}%</span>
                </div>
              )}

              {isNervousActive && (
                <div className="outliner-opacity-slider-row">
                  <span className="outliner-slider-label text-amber-300">Nervos:</span>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={nervousOpacity}
                    onChange={(e) => setSystemOpacity('nervous', parseFloat(e.target.value))}
                    aria-label="Opacidade do Sistema Nervoso"
                    className="outliner-opacity-range range-nervous"
                  />
                  <span className="outliner-slider-value">{Math.round(nervousOpacity * 100)}%</span>
                </div>
              )}

              {isLymphActive && (
                <div className="outliner-opacity-slider-row">
                  <span className="outliner-slider-label text-emerald-400">Linfático:</span>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={lymphOpacity}
                    onChange={(e) => setSystemOpacity('lymphatic', parseFloat(e.target.value))}
                    aria-label="Opacidade do Sistema Linfático"
                    className="outliner-opacity-range range-lymph"
                  />
                  <span className="outliner-slider-value">{Math.round(lymphOpacity * 100)}%</span>
                </div>
              )}

              {isSkeletalActive && (
                <div className="outliner-opacity-slider-row">
                  <span className="outliner-slider-label text-slate-300">Esqueleto:</span>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={skeletalOpacity}
                    onChange={(e) => setSystemOpacity('skeletal', parseFloat(e.target.value))}
                    aria-label="Opacidade do Sistema Esquelético"
                    className="outliner-opacity-range range-skeletal"
                  />
                  <span className="outliner-slider-value">{Math.round(skeletalOpacity * 100)}%</span>
                </div>
              )}

              {/* Presets Rápidos de Transparência Cirúrgica / Radiológica */}
              <div className="outliner-opacity-presets-row" role="group" aria-label="Presets rápidos de transparência">
                <button
                  type="button"
                  onClick={() => {
                    setSystemOpacity('cardiovascular', 1.0);
                    setSystemOpacity('muscular', 0.2);
                    setSystemOpacity('skeletal', 0.15);
                  }}
                  title="Focar na vascularização com transparência muscular e óssea"
                  className="outliner-opacity-preset-btn"
                >
                  Angio Focus
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSystemOpacity('nervous', 1.0);
                    setSystemOpacity('muscular', 0.15);
                    setSystemOpacity('skeletal', 0.3);
                  }}
                  title="Focar na inervação com transparência muscular"
                  className="outliner-opacity-preset-btn"
                >
                  Neuro Focus
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSystemOpacity('muscular', 0.4);
                  }}
                  title="Definir musculatura para 40% de opacidade"
                  className="outliner-opacity-preset-btn"
                >
                  Músculo 40%
                </button>
                <button
                  type="button"
                  onClick={() => resetSystemOpacities()}
                  title="Restaurar todas as camadas para 100% de opacidade"
                  className="outliner-opacity-preset-btn reset"
                >
                  Reset 100%
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Botão de Expansão de Detalhes Clínicos com Flecha Proeminente de 16px */}
        {selectedNode.clinicalData && (
          <button
            type="button"
            onClick={() => setDetailsExpanded(!detailsExpanded)}
            title={detailsExpanded ? 'Ocultar detalhes clínicos' : 'Exibir literatura e detalhes clínicos'}
            aria-expanded={detailsExpanded}
            className="outliner-clinical-details-toggle"
          >
            <span>{detailsExpanded ? 'Ocultar Literatura Clínica' : 'Ver Literatura & Correlação Clínica'}</span>
            {detailsExpanded ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </button>
        )}

        {/* Detalhes Médicos e Correlações (Expandidos apenas sob demanda) */}
        {detailsExpanded && selectedNode.clinicalData && (
          <div className="outliner-clinical-details scrollbar-thin">
            {selectedNode.clinicalData.clinicalSignificance && (
              <div className="outliner-clinical-field">
                <span className="outliner-field-label">Importância Médica:</span>
                <p className="outliner-field-text">
                  {selectedNode.clinicalData.clinicalSignificance}
                </p>
              </div>
            )}
            {selectedNode.clinicalData.insertion && (
              <div className="outliner-clinical-field">
                <span className="outliner-field-label">Relações & Inserção:</span>
                <p className="outliner-field-text">
                  {selectedNode.clinicalData.insertion}
                </p>
              </div>
            )}
            {selectedNode.clinicalData.functionalAction && (
              <div className="outliner-clinical-field">
                <span className="outliner-field-label">Função / Fisiologia:</span>
                <p className="outliner-field-text">
                  {selectedNode.clinicalData.functionalAction}
                </p>
              </div>
            )}
            {selectedNode.clinicalData.innervation && (
              <div className="outliner-clinical-field">
                <span className="outliner-field-label">Inervação:</span>
                <p className="outliner-field-text">
                  {selectedNode.clinicalData.innervation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

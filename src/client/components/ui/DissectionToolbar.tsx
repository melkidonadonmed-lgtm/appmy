import { useState } from 'react';
import {
  Layers,
  Sparkles,
  Scissors,
  RotateCcw,
  ArrowLeftRight,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Activity,
  Sliders,
  Maximize2,
  Undo2,
  Focus,
} from 'lucide-react';
import { DissectionState, DissectionVisualMode, MprPlaneType } from '../../../shared/types/dissection.ts';
import { getAnatomicalLandmark } from '../../lib/dissection-planes.ts';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import { SURGICAL_LAYERS } from '../../../core/visibilityManager.ts';
import { SurgicalLayerDepth } from '../../../shared/types/anatomy.ts';

interface DissectionToolbarProps {
  dissection: DissectionState;
  onChange: (next: DissectionState) => void;
}

export function DissectionToolbar({ dissection, onChange }: DissectionToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const explosionProgress = useAnatomyStore((s) => s.explosionProgress);
  const setExplosionProgress = useAnatomyStore((s) => s.setExplosionProgress);
  const activeDepth = useAnatomyStore((s) => s.activeDepth);
  const setActiveDepth = useAnatomyStore((s) => s.setActiveDepth);
  const peelOnClickMode = useAnatomyStore((s) => s.peelOnClickMode);
  const togglePeelOnClickMode = useAnatomyStore((s) => s.togglePeelOnClickMode);
  const peeledHistory = useAnatomyStore((s) => s.peeledHistory);
  const undoLastPeel = useAnatomyStore((s) => s.undoLastPeel);
  const ghostMode = useAnatomyStore((s) => s.ghostMode);
  const toggleGhostMode = useAnatomyStore((s) => s.toggleGhostMode);
  const isolatedOnly = useAnatomyStore((s) => s.isolatedOnly);
  const selectedNodeId = useAnatomyStore((s) => s.selectedNodeId);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);
  const showAll = useAnatomyStore((s) => s.showAll);

  const explosionPct = Math.round(explosionProgress * 100);
  const depthPct = Math.round(((activeDepth - 1) / 5) * 100);
  const landmark = getAnatomicalLandmark(dissection.activePlane, dissection.offset);

  const handleModeChange = (mode: DissectionVisualMode) => {
    onChange({
      ...dissection,
      visualMode: mode,
    });
    if (mode === 'mpr') {
      setIsExpanded(true);
    }
  };

  const handlePlaneChange = (plane: MprPlaneType) => {
    onChange({
      ...dissection,
      activePlane: plane,
    });
  };

  const handleOffsetChange = (offset: number) => {
    onChange({
      ...dissection,
      offset,
    });
  };

  const handleToggleInvert = () => {
    onChange({
      ...dissection,
      inverted: !dissection.inverted,
    });
  };

  const handleToggleHelper = () => {
    onChange({
      ...dissection,
      showHelper: !dissection.showHelper,
    });
  };

  const handleResetMpr = () => {
    onChange({
      ...dissection,
      offset: 0,
      inverted: false,
    });
  };

  return (
    <div className="dissection-toolbar">
      {/* Barra Compacta de Ferramentas 3D */}
      <div className="dissection-header">
        <div className="mode-toggle-group">
          <button
            type="button"
            className={`mode-btn ${dissection.visualMode === 'solid' ? 'active' : ''}`}
            onClick={() => handleModeChange('solid')}
            title="Visualização Sólida Padrão"
          >
            <Layers size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>Sólido</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${dissection.visualMode === 'xray' ? 'active' : ''}`}
            onClick={() => handleModeChange('xray')}
            title="Modo Translúcido (Raio-X)"
          >
            <Sparkles size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>Raio-X</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${dissection.visualMode === 'mpr' ? 'active' : ''}`}
            onClick={() => handleModeChange('mpr')}
            title="Corte Tomográfico Multiplanar (Sagital, Coronal, Axial)"
          >
            <Scissors size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>Corte MPR</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${ghostMode ? 'active' : ''}`}
            onClick={toggleGhostMode}
            aria-pressed={ghostMode}
            title="Contexto Fantasma (Tecla G): Mantém estruturas ao redor em 10% de opacidade para enxergar a peça selecionada em profundidade"
          >
            <Eye size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>Fantasma</span>
          </button>
          {(selectedNodeId || isolatedOnly) && (
            <button
              type="button"
              className={`mode-btn ${isolatedOnly ? 'active' : ''}`}
              onClick={() => {
                if (isolatedOnly) {
                  showAll();
                } else if (selectedNodeId) {
                  isolateNode(selectedNodeId, []);
                }
              }}
              aria-pressed={isolatedOnly}
              title="Modo Isolado / Solo (Tecla I): Exibe apenas a estrutura selecionada ou restaura todas"
            >
              <Focus size={13} strokeWidth={1.5} aria-hidden="true" />
              <span>{isolatedOnly ? 'Sair Solo' : 'Isolar'}</span>
            </button>
          )}
        </div>

        {/* Bisturi 3D Direto (Click-to-Peel) + Desfazer */}
        <div className="mode-toggle-group">
          <button
            type="button"
            className={`mode-btn ${peelOnClickMode ? 'active' : ''}`}
            onClick={togglePeelOnClickMode}
            aria-pressed={peelOnClickMode}
            title="Modo Bisturi 3D: Clique em qualquer peça no modelo 3D para retirá-la (ou use Alt+Clique)"
          >
            <Scissors size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>{peelOnClickMode ? 'Bisturi: ON' : 'Bisturi 3D'}</span>
          </button>

          {peeledHistory.length > 0 && (
            <button
              type="button"
              className="mode-btn"
              onClick={undoLastPeel}
              title={`Desfazer última peça retirada (${peeledHistory.length} no histórico)`}
            >
              <Undo2 size={13} strokeWidth={1.5} aria-hidden="true" />
              <span>Desfazer ({peeledHistory.length})</span>
            </button>
          )}
        </div>

        <button
          type="button"
          className="dissection-collapse-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Ocultar controles de Explosão e Camadas' : 'Abrir controles de Explosão 3D e Camadas'}
          aria-label={isExpanded ? 'Ocultar controles de Explosão e Camadas' : 'Abrir controles de Explosão 3D e Camadas'}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronUp size={14} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Sliders Limpos de Exploded View e Camadas nos Modos Sólido e Raio-X */}
      {isExpanded && dissection.visualMode !== 'mpr' && (
        <div className="dissection-body">
          <div className="dissection-quick-grid">
            <div className="dissection-control-row">
              <div className="slider-header">
                <span className="control-label">
                  <Maximize2 size={11} strokeWidth={1.5} aria-hidden="true" />
                  <span>Exploded View:</span>
                </span>
                <div className="slider-step-controls">
                  <span className="slider-value">{explosionPct}%</span>
                  <button
                    type="button"
                    className="slider-step-btn"
                    onClick={() => setExplosionProgress(0)}
                    disabled={explosionPct === 0}
                    style={{ opacity: explosionPct > 0 ? 1 : 0.4 }}
                    title="Zerar Exploded View"
                  >
                    0%
                  </button>
                </div>
              </div>
              <div className="slider-track-wrap">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explosionProgress}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                  aria-label="Controle de Exploded View"
                  className="range-slider"
                  style={{ '--slider-pct': `${explosionPct}%` } as React.CSSProperties}
                />
              </div>
            </div>

            <div className="dissection-control-row">
              <div className="slider-header">
                <span className="control-label">
                  <Sliders size={11} strokeWidth={1.5} aria-hidden="true" />
                  <span>Camada ({activeDepth}/6):</span>
                </span>
                <span
                  className="slider-value"
                  title={SURGICAL_LAYERS[(activeDepth as SurgicalLayerDepth) || 1]?.labelPt}
                >
                  {SURGICAL_LAYERS[(activeDepth as SurgicalLayerDepth) || 1]?.labelPt}
                </span>
              </div>
              <div className="slider-track-wrap">
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={activeDepth}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onChange={(e) => setActiveDepth(parseInt(e.target.value, 10))}
                  aria-label="Camada cirúrgica de 1 a 6"
                  className="range-slider"
                  style={{ '--slider-pct': `${depthPct}%` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controles de Corte Tomográfico MPR */}
      {isExpanded && dissection.visualMode === 'mpr' && (
        <div className="dissection-body">
          <div className="dissection-control-row">
            <span className="control-label">Plano de Secção:</span>
            <div className="mpr-plane-buttons">
              <button
                type="button"
                className={`plane-btn ${dissection.activePlane === 'sagittal' ? 'active-sagittal' : ''}`}
                onClick={() => handlePlaneChange('sagittal')}
              >
                Sagital (X)
              </button>
              <button
                type="button"
                className={`plane-btn ${dissection.activePlane === 'coronal' ? 'active-coronal' : ''}`}
                onClick={() => handlePlaneChange('coronal')}
              >
                Coronal (Z)
              </button>
              <button
                type="button"
                className={`plane-btn ${dissection.activePlane === 'axial' ? 'active-axial' : ''}`}
                onClick={() => handlePlaneChange('axial')}
              >
                Axial (Y)
              </button>
            </div>
          </div>

          <div className="dissection-control-row">
            <div className="slider-header">
              <span className="control-label">Posição do Corte:</span>
              <div className="slider-step-controls">
                <button
                  type="button"
                  className="slider-step-btn"
                  onClick={() => handleOffsetChange(Math.max(-2.2, Number((dissection.offset - 0.05).toFixed(2))))}
                  title="Recuar corte em 0.05 cm"
                >
                  -0.05
                </button>
                <span className="slider-value">
                  {dissection.offset >= 0 ? `+${dissection.offset.toFixed(2)}` : dissection.offset.toFixed(2)} cm
                </span>
                <button
                  type="button"
                  className="slider-step-btn"
                  onClick={() => handleOffsetChange(Math.min(2.2, Number((dissection.offset + 0.05).toFixed(2))))}
                  title="Avançar corte em 0.05 cm"
                >
                  +0.05
                </button>
              </div>
            </div>
            <div className="slider-track-wrap">
              <input
                type="range"
                min="-2.2"
                max="2.2"
                step="0.01"
                value={dissection.offset}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => handleOffsetChange(parseFloat(e.target.value))}
                className="range-slider"
                aria-label="Profundidade do corte MPR"
              />
            </div>
          </div>

          <div className="dissection-actions-row">
            <button
              type="button"
              className={`action-btn ${dissection.inverted ? 'active' : ''}`}
              onClick={handleToggleInvert}
            >
              <ArrowLeftRight size={13} strokeWidth={1.5} aria-hidden="true" />
              <span>Inverter</span>
            </button>

            <button
              type="button"
              className={`action-btn ${dissection.showHelper ? 'active' : ''}`}
              onClick={handleToggleHelper}
            >
              {dissection.showHelper ? (
                <Eye size={13} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <EyeOff size={13} strokeWidth={1.5} aria-hidden="true" />
              )}
              <span>Guia 3D</span>
            </button>

            <button type="button" className="action-btn" onClick={handleResetMpr}>
              <RotateCcw size={13} strokeWidth={1.5} aria-hidden="true" />
              <span>Centro</span>
            </button>
          </div>

          <div className="landmark-card">
            <div className="landmark-header">
              <Activity size={13} strokeWidth={1.5} color="var(--accent)" aria-hidden="true" />
              <div className="landmark-titles">
                <span className="landmark-pt">{landmark.namePtBr}</span>
                <span className="landmark-latin">{landmark.nameLatin}</span>
              </div>
            </div>
            <p className="landmark-desc">{landmark.clinicalSignificance}</p>
          </div>
        </div>
      )}
    </div>
  );
}

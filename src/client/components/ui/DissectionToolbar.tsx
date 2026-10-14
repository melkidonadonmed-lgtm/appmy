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
  const ghostMode = useAnatomyStore((s) => s.ghostMode);
  const toggleGhostMode = useAnatomyStore((s) => s.toggleGhostMode);
  const showAll = useAnatomyStore((s) => s.showAll);
  const applyPreset = useAnatomyStore((s) => s.applyPreset);
  const setSelectedNode = useAnatomyStore((s) => s.setSelectedNode);

  const landmark = getAnatomicalLandmark(dissection.activePlane, dissection.offset);

  const handleModeChange = (mode: DissectionVisualMode) => {
    onChange({
      ...dissection,
      visualMode: mode,
    });
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

  const handleReset = () => {
    onChange({
      ...dissection,
      offset: 0,
      inverted: false,
    });
  };

  const handleFullSceneReset = () => {
    setExplosionProgress(0);
    setActiveDepth(1);
    showAll();
    setSelectedNode(null);
    applyPreset('all');
    handleReset();
  };

  return (
    <div className="dissection-toolbar">
      {/* Barra Principal de Ferramentas */}
      <div className="dissection-header">
        <div className="dissection-title-wrap">
          <Scissors size={15} strokeWidth={1.5} color="#38bdf8" />
          <span className="dissection-title">Dissecção & Tomografia MPR</span>
        </div>

        {/* Alternador de Modos de Visualização Cirúrgica */}
        <div className="mode-toggle-group">
          <button
            type="button"
            className={`mode-btn ${dissection.visualMode === 'solid' ? 'active' : ''}`}
            onClick={() => handleModeChange('solid')}
            title="Modo Anatômico Canônico Sólido e Exploded View"
          >
            <Layers size={13} strokeWidth={1.5} />
            <span>Sólido</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${dissection.visualMode === 'xray' ? 'active' : ''}`}
            onClick={() => handleModeChange('xray')}
            title="Modo Translúcido / Raio-X Cirúrgico"
          >
            <Sparkles size={13} strokeWidth={1.5} />
            <span>Raio-X</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${dissection.visualMode === 'mpr' ? 'active' : ''}`}
            onClick={() => handleModeChange('mpr')}
            title="Corte Tomográfico Multiplanar (MPR)"
          >
            <Scissors size={13} strokeWidth={1.5} />
            <span>Corte MPR</span>
          </button>
        </div>

        <button
          type="button"
          className="dissection-collapse-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Recolher Painel de Dissecção' : 'Expandir Painel de Dissecção'}
        >
          {isExpanded ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Controles Diretos de Exploded View e Camadas Cirúrgicas no Modo Sólido */}
      {isExpanded && dissection.visualMode === 'solid' && (
        <div className="dissection-body">
          <div className="dissection-quick-grid">
            {/* Controle Rápido 1: Exploded View */}
            <div className="dissection-control-row">
              <div className="slider-header">
                <span className="control-label">
                  <Maximize2 size={11} strokeWidth={1.5} />
                  <span>Exploded View:</span>
                </span>
                <span className="slider-value">{Math.round(explosionProgress * 100)}%</span>
              </div>
              <div className="slider-track-wrap">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explosionProgress}
                  onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                  aria-label="Controle rápido de Exploded View"
                  className="range-slider"
                />
              </div>
            </div>

            {/* Controle Rápido 2: Dissecação Estratigráfica (Camadas 1 a 6) */}
            <div className="dissection-control-row">
              <div className="slider-header">
                <span className="control-label">
                  <Sliders size={11} strokeWidth={1.5} />
                  <span>Plano ({activeDepth}/6):</span>
                </span>
                <span className="slider-value">
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
                  onChange={(e) => setActiveDepth(parseInt(e.target.value, 10))}
                  aria-label="Controle rápido de camada cirúrgica de 1 a 6"
                  className="range-slider"
                />
              </div>
            </div>
          </div>

          <div className="dissection-actions-row">
            <button
              type="button"
              className={`action-btn ${ghostMode ? 'active' : ''}`}
              onClick={toggleGhostMode}
              title="Alternar Modo Ghosting Contextual (Atenua estruturas vizinhas ao selecionar uma peça)"
            >
              <Eye size={13} strokeWidth={1.5} />
              <span>Ghosting: {ghostMode ? 'Ativo' : 'Inativo'}</span>
            </button>

            <button
              type="button"
              className="action-btn"
              onClick={handleFullSceneReset}
              title="Restaurar posição anatômica, camadas e seleção (Atalho: R)"
            >
              <RotateCcw size={13} strokeWidth={1.5} />
              <span>Restaurar Cena (R)</span>
            </button>
          </div>
        </div>
      )}

      {/* Controles Avançados do Corte MPR */}
      {isExpanded && dissection.visualMode === 'mpr' && (
        <div className="dissection-body">
          {/* Seletor de Planos Anatômicos */}
          <div className="dissection-control-row">
            <span className="control-label">Plano de Secção:</span>
            <div className="mpr-plane-buttons">
              <button
                type="button"
                className={`plane-btn ${dissection.activePlane === 'sagittal' ? 'active-sagittal' : ''}`}
                onClick={() => handlePlaneChange('sagittal')}
                title="Plano Sagital: Separação Direita/Esquerda (Eixo X)"
              >
                Sagital (X)
              </button>
              <button
                type="button"
                className={`plane-btn ${dissection.activePlane === 'coronal' ? 'active-coronal' : ''}`}
                onClick={() => handlePlaneChange('coronal')}
                title="Plano Coronal: Separação Anterior/Posterior (Eixo Z)"
              >
                Coronal (Z)
              </button>
              <button
                type="button"
                className={`plane-btn ${dissection.activePlane === 'axial' ? 'active-axial' : ''}`}
                onClick={() => handlePlaneChange('axial')}
                title="Plano Axial: Separação Cranial/Caudal (Eixo Y)"
              >
                Axial (Y)
              </button>
            </div>
          </div>

          {/* Slider de Profundidade Milimétrica */}
          <div className="dissection-control-row">
            <div className="slider-header">
              <span className="control-label">Profundidade do Corte:</span>
              <span className="slider-value">
                {dissection.offset >= 0 ? `+${dissection.offset.toFixed(2)}` : dissection.offset.toFixed(2)} cm
              </span>
            </div>
            <div className="slider-track-wrap">
              <input
                type="range"
                min="-2.2"
                max="2.2"
                step="0.05"
                value={dissection.offset}
                onChange={(e) => handleOffsetChange(parseFloat(e.target.value))}
                className="range-slider"
              />
            </div>
          </div>

          {/* Ações Auxiliares: Inverter, Gizmo e Reset */}
          <div className="dissection-actions-row">
            <button
              type="button"
              className={`action-btn ${dissection.inverted ? 'active' : ''}`}
              onClick={handleToggleInvert}
              title="Inverter Sentido da Secção (Cortar metade oposta)"
            >
              <ArrowLeftRight size={13} strokeWidth={1.5} />
              <span>Inverter ({dissection.inverted ? 'Invertido' : 'Padrão'})</span>
            </button>

            <button
              type="button"
              className={`action-btn ${dissection.showHelper ? 'active' : ''}`}
              onClick={handleToggleHelper}
              title="Exibir/Ocultar Lâmina Visual do Plano no Espaço 3D"
            >
              {dissection.showHelper ? <Eye size={13} strokeWidth={1.5} /> : <EyeOff size={13} strokeWidth={1.5} />}
              <span>Lâmina 3D</span>
            </button>

            <button
              type="button"
              className="action-btn"
              onClick={handleReset}
              title="Restaurar Secção na Linha Média / Centro (0.00 cm)"
            >
              <RotateCcw size={13} strokeWidth={1.5} />
              <span>Resetar</span>
            </button>
          </div>

          {/* Card de Correlação Anatômica Clínica em Tempo Real */}
          <div className="landmark-card">
            <div className="landmark-header">
              <Activity size={13} strokeWidth={1.5} color="#38bdf8" />
              <div className="landmark-titles">
                <span className="landmark-pt">{landmark.namePtBr}</span>
                <span className="landmark-latin">{landmark.nameLatin}</span>
              </div>
            </div>
            <p className="landmark-desc">{landmark.clinicalSignificance}</p>
          </div>
        </div>
      )}

      {/* Informação do modo Raio-X */}
      {isExpanded && dissection.visualMode === 'xray' && (
        <div className="dissection-body">
          <div className="landmark-card" style={{ marginTop: '0.25rem' }}>
            <div className="landmark-header">
              <Sparkles size={13} strokeWidth={1.5} color="#38bdf8" />
              <span className="landmark-pt">Visualização de Translucência Cirúrgica (Raio-X)</span>
            </div>
            <p className="landmark-desc">
              A atenuação da opacidade do arcabouço osteomuscular e visceromegalias permite a avaliação de relações anatômicas profundas, canais vasculonervosos e estruturas retroperitoneais sem oclusão de visão.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

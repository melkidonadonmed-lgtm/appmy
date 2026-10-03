import React, { useState } from 'react';
import {
  Sliders,
  ChevronDown,
  ChevronRight,
  Scissors,
  Layers,
  Sparkles,
  Activity,
} from 'lucide-react';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { SURGICAL_LAYERS } from '../../../../core/visibilityManager.ts';
import { SurgicalLayerDepth } from '../../../../shared/types/anatomy.ts';

interface ModuleLayersSectionProps {
  onToggleMpr?: () => void;
  mprActive?: boolean;
}

export const ModuleLayersSection: React.FC<ModuleLayersSectionProps> = ({
  onToggleMpr,
  mprActive = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { modules, setModuleState, activeDepth, setActiveDepth } = useAnatomyStore();

  return (
    <div className="outliner-modules-card">
      {/* Cabeçalho Colapsável */}
      <button
        id="outliner-modules-header-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        className="outliner-modules-toggle"
        aria-expanded={isExpanded}
        aria-controls="outliner-modules-content"
      >
        <div className="outliner-modules-toggle-left">
          <Sliders size={13} className="text-cyan-400" aria-hidden="true" />
          <span>Módulos & Camadas</span>
        </div>
        {isExpanded ? (
          <ChevronDown size={14} aria-hidden="true" />
        ) : (
          <ChevronRight size={14} aria-hidden="true" />
        )}
      </button>

      {/* Conteúdo Expansível */}
      {isExpanded && (
        <div
          id="outliner-modules-content"
          role="region"
          aria-labelledby="outliner-modules-header-btn"
          className="outliner-modules-body"
        >
          {/* Módulo 1: Dissecção Tomográfica MPR */}
          <div className="outliner-module-row">
            <span className="outliner-module-label">
              <Scissors size={13} style={{ color: '#34d399' }} aria-hidden="true" />
              <span>Dissecção MPR</span>
            </span>
            <button
              onClick={() => {
                if (onToggleMpr) onToggleMpr();
                setModuleState({ mprEnabled: !modules.mprEnabled });
              }}
              aria-pressed={mprActive || modules.mprEnabled}
              aria-label="Alternar corte tomográfico MPR"
              className={`outliner-module-badge-btn ${
                mprActive || modules.mprEnabled ? 'active-emerald' : ''
              }`}
            >
              {mprActive || modules.mprEnabled ? 'Ativo' : 'Inativo'}
            </button>
          </div>

          {/* Módulo 2: Exploded View 3D */}
          <div className="outliner-slider-container">
            <div className="outliner-slider-header">
              <span className="outliner-module-label">
                <Layers size={13} style={{ color: '#38bdf8' }} aria-hidden="true" />
                <span>Exploded View (GPU)</span>
              </span>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
                {Math.round(modules.explodedProgress * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={modules.explodedProgress}
              onChange={(e) =>
                setModuleState({ explodedProgress: parseFloat(e.target.value) })
              }
              aria-label="Progresso da vista explodida do esqueleto"
              aria-valuenow={Math.round(modules.explodedProgress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${Math.round(modules.explodedProgress * 100)}%`}
              className="outliner-range-input"
            />
          </div>

          {/* Módulo 3: Planos Cirúrgicos de Dissecação (1 a 6) */}
          <div className="outliner-slider-container">
            <div className="outliner-slider-header">
              <span className="outliner-module-label">
                <Sliders size={13} style={{ color: '#a78bfa' }} aria-hidden="true" />
                <span>Dissecação (Camadas 1 a 6)</span>
              </span>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#a78bfa', fontWeight: 600 }}>
                {activeDepth}/6: {SURGICAL_LAYERS[(activeDepth as SurgicalLayerDepth) || 1]?.labelPt}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={activeDepth}
              onChange={(e) => setActiveDepth(parseInt(e.target.value, 10))}
              aria-label="Plano cirúrgico de dissecação anatômica de 1 a 6"
              aria-valuenow={activeDepth}
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuetext={SURGICAL_LAYERS[(activeDepth as SurgicalLayerDepth) || 1]?.labelPt}
              className="outliner-range-input"
            />
            <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.2rem', lineHeight: '1.25' }}>
              <span style={{ color: '#cbd5e1', fontWeight: 500, fontStyle: 'italic' }}>
                {SURGICAL_LAYERS[(activeDepth as SurgicalLayerDepth) || 1]?.labelLatin}
              </span>
              {' — '}
              <span>
                {SURGICAL_LAYERS[(activeDepth as SurgicalLayerDepth) || 1]?.desc}
              </span>
            </div>
          </div>

          {/* Módulo 3: Densidade Óssea */}
          <div className="outliner-module-row">
            <span className="outliner-module-label">
              <Sparkles size={13} style={{ color: '#fbbf24' }} aria-hidden="true" />
              <span>Densidade Óssea</span>
            </span>
            <div
              className="outliner-density-btn-group"
              role="group"
              aria-label="Opções de densidade do esqueleto"
            >
              <button
                onClick={() => setModuleState({ solidOpacity: 1.0, xRayMode: false })}
                aria-pressed={modules.solidOpacity === 1.0 && !modules.xRayMode}
                className={`outliner-density-btn ${
                  modules.solidOpacity === 1.0 && !modules.xRayMode ? 'active' : ''
                }`}
                title="100% Sólido"
              >
                100%
              </button>
              <button
                onClick={() => setModuleState({ solidOpacity: 0.35, xRayMode: false })}
                aria-pressed={modules.solidOpacity === 0.35 && !modules.xRayMode}
                className={`outliner-density-btn ${
                  modules.solidOpacity === 0.35 && !modules.xRayMode ? 'active' : ''
                }`}
                title="Translúcido (35%)"
              >
                35%
              </button>
              <button
                onClick={() => setModuleState({ xRayMode: !modules.xRayMode })}
                aria-pressed={modules.xRayMode}
                className={`outliner-density-btn ${
                  modules.xRayMode ? 'active' : ''
                }`}
                title="Modo Raio-X"
              >
                X-Ray
              </button>
            </div>
          </div>

          {/* Módulo 4: Telemetria de Renderização */}
          <div className="outliner-module-row">
            <span className="outliner-module-label">
              <Activity size={13} style={{ color: '#c084fc' }} aria-hidden="true" />
              <span>Telemetria HUD</span>
            </span>
            <button
              onClick={() =>
                setModuleState({ telemetryVisible: !modules.telemetryVisible })
              }
              aria-pressed={modules.telemetryVisible}
              aria-label="Alternar exibição do painel de telemetria FPS e draw calls"
              className={`outliner-module-badge-btn ${
                modules.telemetryVisible ? 'active-purple' : ''
              }`}
            >
              {modules.telemetryVisible ? 'Visível' : 'Oculto'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

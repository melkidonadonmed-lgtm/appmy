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
  const { modules, setModuleState, activeDepth, setActiveDepth, stepExplosionProgress } = useAnatomyStore();

  const explodedPct = Math.round(modules.explodedProgress * 100);
  const depthPct = Math.round(((activeDepth - 1) / 5) * 100);

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
          <Sliders size={13} strokeWidth={1.5} className="text-cyan-400" aria-hidden="true" />
          <span>Módulos & Camadas</span>
        </div>
        {isExpanded ? (
          <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
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
              <Scissors size={13} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
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

          {/* Módulo 2: Exploded View 3D Linear */}
          <div className="outliner-slider-container">
            <div className="outliner-slider-header">
              <span className="outliner-module-label">
                <Layers size={13} strokeWidth={1.5} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <span>Exploded View (GPU)</span>
              </span>
              <div className="slider-step-controls">
                <button
                  type="button"
                  className="slider-step-btn"
                  onClick={() => stepExplosionProgress(-0.1)}
                  title="Reduzir 10% (Avanço Linear)"
                >
                  -10%
                </button>
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {explodedPct}%
                </span>
                <button
                  type="button"
                  className="slider-step-btn"
                  onClick={() => stepExplosionProgress(0.1)}
                  title="Avançar 10% (Avanço Linear)"
                >
                  +10%
                </button>
              </div>
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
              aria-valuenow={explodedPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${explodedPct}%`}
              className="outliner-range-input"
              style={{ '--slider-pct': `${explodedPct}%` } as React.CSSProperties}
            />
            <div className="linear-pct-steps" role="group" aria-label="Saltos lineares de Exploded View na sidebar">
              {[0, 0.25, 0.5, 0.75, 1].map((mark) => {
                const pct = Math.round(mark * 100);
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setModuleState({ explodedProgress: mark })}
                    className={`linear-pct-pill ${explodedPct === pct ? 'active' : ''}`}
                  >
                    {pct}%
                  </button>
                );
              })}
            </div>
          </div>

          {/* Módulo 3: Planos Cirúrgicos de Dissecação (1 a 6) */}
          <div className="outliner-slider-container">
            <div className="outliner-slider-header">
              <span className="outliner-module-label">
                <Sliders size={13} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
                <span>Dissecação (Camadas 1 a 6)</span>
              </span>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>
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
              style={{ '--slider-pct': `${depthPct}%` } as React.CSSProperties}
            />
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: '1.25' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontStyle: 'italic' }}>
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
              <Sparkles size={13} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
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
              <Activity size={13} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
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

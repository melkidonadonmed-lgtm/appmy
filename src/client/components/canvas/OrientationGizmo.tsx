import React, { useState } from 'react';
import { Compass, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';

export const OrientationGizmo: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const setCameraPositionTarget = useAnatomyStore((s) => s.setCameraPositionTarget);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);

  const orientTo = (pos: [number, number, number], target: [number, number, number] = [0, 0, 0]) => {
    setCameraFocusTarget(target);
    setCameraPositionTarget(pos);
  };

  return (
    <div className="orientation-gizmo-container" aria-label="Widget de Orientação Anatômica 3D">
      <div className="orientation-gizmo-header" onClick={() => setCollapsed(!collapsed)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Compass size={14} className="text-cyan-400" aria-hidden="true" />
          <span className="orientation-gizmo-title">Orientação 3D</span>
        </div>
        <button
          type="button"
          aria-label={collapsed ? 'Expandir cubo de orientação' : 'Recolher cubo de orientação'}
          className="orientation-gizmo-collapse-btn"
        >
          {collapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
        </button>
      </div>

      {!collapsed && (
        <div className="orientation-gizmo-body">
          <div className="orientation-btn-grid">
            <button
              type="button"
              onClick={() => orientTo([0, 0, 4.5])}
              className="orientation-btn"
              title="Vista Anterior (Frontal)"
              aria-label="Vista Anterior"
            >
              Ant
            </button>
            <button
              type="button"
              onClick={() => orientTo([0, 0, -4.5])}
              className="orientation-btn"
              title="Vista Posterior (Dorsal)"
              aria-label="Vista Posterior"
            >
              Post
            </button>
            <button
              type="button"
              onClick={() => orientTo([4.5, 0, 0])}
              className="orientation-btn"
              title="Vista Lateral Direita"
              aria-label="Vista Lateral Direita"
            >
              Lat D
            </button>
            <button
              type="button"
              onClick={() => orientTo([-4.5, 0, 0])}
              className="orientation-btn"
              title="Vista Lateral Esquerda"
              aria-label="Vista Lateral Esquerda"
            >
              Lat E
            </button>
            <button
              type="button"
              onClick={() => orientTo([0, 4.5, 0.01])}
              className="orientation-btn"
              title="Vista Superior (Cranial)"
              aria-label="Vista Superior"
            >
              Sup
            </button>
            <button
              type="button"
              onClick={() => orientTo([0, -4.5, 0.01])}
              className="orientation-btn"
              title="Vista Inferior (Podálica/Caudal)"
              aria-label="Vista Inferior"
            >
              Inf
            </button>
          </div>

          <button
            type="button"
            onClick={() => orientTo([2.5, 2.2, 4.5], [0, 0, 0])}
            className="orientation-reset-btn"
            title="Restaurar Visão Isométrica Anatômica Padrão"
            aria-label="Restaurar Visão Isométrica 3D"
          >
            <RotateCcw size={11} aria-hidden="true" />
            <span>Perspectiva 3D</span>
          </button>
        </div>
      )}
    </div>
  );
};

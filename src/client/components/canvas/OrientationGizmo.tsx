import React, { useState } from 'react';
import {
  Compass,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  MoveVertical,
  RotateCw,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';

const GIZMO_CAMERA_DIST = 4.5;
const GIZMO_CAMERA_DIST_NEG = -4.5;

export const OrientationGizmo: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const setCameraPositionTarget = useAnatomyStore((s) => s.setCameraPositionTarget);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);
  const twoFingerMode = useAnatomyStore((s) => s.twoFingerMode);
  const setTwoFingerMode = useAnatomyStore((s) => s.setTwoFingerMode);
  const nudgeCameraRig = useAnatomyStore((s) => s.nudgeCameraRig);

  const orientTo = (pos: [number, number, number], target: [number, number, number] = [0, 0, 0]) => {
    setCameraFocusTarget(target);
    setCameraPositionTarget(pos);
  };

  return (
    <div className="orientation-gizmo-container" aria-label="Widget de Orientação Anatômica 3D">
      <div className="orientation-gizmo-header" onClick={() => setCollapsed(!collapsed)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Compass size={14} strokeWidth={1.5} className="text-cyan-400" aria-hidden="true" />
          <span className="orientation-gizmo-title">Orientação 3D</span>
        </div>
        <button
          type="button"
          aria-label={collapsed ? 'Expandir cubo de orientação' : 'Recolher cubo de orientação'}
          className="orientation-gizmo-collapse-btn"
        >
          {collapsed ? <ChevronDown size={13} strokeWidth={1.5} /> : <ChevronUp size={13} strokeWidth={1.5} />}
        </button>
      </div>

      {!collapsed && (
        <div className="orientation-gizmo-body">
          {/* Alternador de Gesto de 2 Dedos (Subir/Descer + Girar vs Scroll Zoom) */}
          <button
            type="button"
            onClick={() => setTwoFingerMode(twoFingerMode === 'pan-rotate' ? 'zoom' : 'pan-rotate')}
            className={`orientation-gesture-toggle ${twoFingerMode === 'pan-rotate' ? 'active' : ''}`}
            title="Alternar gesto de 2 dedos no trackpad/touch: Subir/Descer e Girar (Pinça para Zoom) ou Scroll para Zoom"
            aria-label="Alternar modo de gesto de 2 dedos"
            aria-pressed={twoFingerMode === 'pan-rotate'}
          >
            <MoveVertical size={11} strokeWidth={1.5} aria-hidden="true" />
            <span>{twoFingerMode === 'pan-rotate' ? '2 Dedos: Subir & Girar' : '2 Dedos: Zoom'}</span>
          </button>

          {/* Controles Táteis de Elevação Craniocaudal (Eixo Y) e Rotação Orbital */}
          <div className="orientation-rig-controls" role="group" aria-label="Elevação vertical e rotação orbital">
            <button
              type="button"
              onClick={() => nudgeCameraRig({ verticalPanDelta: 0.18 })}
              className="orientation-btn"
              title="Subir câmera no eixo craniocaudal (2 dedos para cima)"
              aria-label="Subir câmera"
            >
              <ArrowUp size={11} strokeWidth={1.5} aria-hidden="true" />
              <span>Subir</span>
            </button>
            <button
              type="button"
              onClick={() => nudgeCameraRig({ verticalPanDelta: -0.18 })}
              className="orientation-btn"
              title="Descer câmera no eixo craniocaudal (2 dedos para baixo)"
              aria-label="Descer câmera"
            >
              <ArrowDown size={11} strokeWidth={1.5} aria-hidden="true" />
              <span>Descer</span>
            </button>
            <button
              type="button"
              onClick={() => nudgeCameraRig({ azimuthRotateDelta: -0.28 })}
              className="orientation-btn"
              title="Rotacionar câmera para a esquerda (Eixo Y)"
              aria-label="Girar à esquerda"
            >
              <RotateCcw size={11} strokeWidth={1.5} aria-hidden="true" />
              <span>Girar E</span>
            </button>
            <button
              type="button"
              onClick={() => nudgeCameraRig({ azimuthRotateDelta: 0.28 })}
              className="orientation-btn"
              title="Rotacionar câmera para a direita (Eixo Y)"
              aria-label="Girar à direita"
            >
              <RotateCw size={11} strokeWidth={1.5} aria-hidden="true" />
              <span>Girar D</span>
            </button>
          </div>

          <div className="orientation-btn-grid">
            <button
              type="button"
              onClick={() => orientTo([0, 0, GIZMO_CAMERA_DIST])}
              className="orientation-btn"
              title="Vista Anterior (Frontal)"
              aria-label="Vista Anterior"
            >
              Ant
            </button>
            <button
              type="button"
              onClick={() => orientTo([0, 0, GIZMO_CAMERA_DIST_NEG])}
              className="orientation-btn"
              title="Vista Posterior (Dorsal)"
              aria-label="Vista Posterior"
            >
              Post
            </button>
            <button
              type="button"
              onClick={() => orientTo([GIZMO_CAMERA_DIST_NEG, 0, 0])}
              className="orientation-btn"
              title="Vista Lateral Direita"
              aria-label="Vista Lateral Direita"
            >
              Lat D
            </button>
            <button
              type="button"
              onClick={() => orientTo([GIZMO_CAMERA_DIST, 0, 0])}
              className="orientation-btn"
              title="Vista Lateral Esquerda"
              aria-label="Vista Lateral Esquerda"
            >
              Lat E
            </button>
            <button
              type="button"
              onClick={() => orientTo([0, GIZMO_CAMERA_DIST, 0.01])}
              className="orientation-btn"
              title="Vista Superior (Cranial)"
              aria-label="Vista Superior"
            >
              Sup
            </button>
            <button
              type="button"
              onClick={() => orientTo([0, GIZMO_CAMERA_DIST_NEG, 0.01])}
              className="orientation-btn"
              title="Vista Inferior (Podálica/Caudal)"
              aria-label="Vista Inferior"
            >
              Inf
            </button>
          </div>

          <button
            type="button"
            onClick={() => orientTo([2.5, 2.2, GIZMO_CAMERA_DIST], [0, 0, 0])}
            className="orientation-reset-btn"
            title="Restaurar Visão Isométrica Anatômica Padrão"
            aria-label="Restaurar Visão Isométrica 3D"
          >
            <RotateCcw size={11} strokeWidth={1.5} aria-hidden="true" />
            <span>Perspectiva 3D</span>
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Compass,
  Move,
  Rotate3d,
  ArrowUp,
  ArrowDown,
  ZoomIn,
  ZoomOut,
  HelpCircle,
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import { AnatomicalCameraPreset } from '../../../core/navigationGestures.ts';

const DEFAULT_CAMERA_POS: [number, number, number] = [2.5, 2.2, 4.5];
const DEFAULT_CAMERA_TARGET: [number, number, number] = [0, 0, 0];

const ANATOMICAL_VIEWS: Array<{ id: AnatomicalCameraPreset; label: string; title: string }> = [
  { id: 'front', label: 'Frente', title: 'Vista Anterior (Coronal Frontal)' },
  { id: 'back', label: 'Dorso', title: 'Vista Dorsal (Costas)' },
  { id: 'right', label: 'Dir.', title: 'Vista Lateral Direita do Paciente' },
  { id: 'left', label: 'Esq.', title: 'Vista Lateral Esquerda do Paciente' },
  { id: 'top', label: 'Topo', title: 'Vista Superior (Axial Cranial)' },
];

export const OrientationGizmo: React.FC = () => {
  const [showGuide, setShowGuide] = useState(false);

  const setCameraPositionTarget = useAnatomyStore((s) => s.setCameraPositionTarget);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);
  const setCameraPresetView = useAnatomyStore((s) => s.setCameraPresetView);
  const cameraInteractionMode = useAnatomyStore((s) => s.cameraInteractionMode);
  const setCameraInteractionMode = useAnatomyStore((s) => s.setCameraInteractionMode);
  const nudgeCameraRig = useAnatomyStore((s) => s.nudgeCameraRig);

  const handleResetCamera = () => {
    setCameraFocusTarget(DEFAULT_CAMERA_TARGET);
    setCameraPositionTarget(DEFAULT_CAMERA_POS);
  };

  return (
    <div className="orientation-gizmo-container" aria-label="Controles de Câmera e Movimentação do Boneco 3D">
      {showGuide && (
        <div className="navigation-help-popover" role="region" aria-label="Guia de movimentação 3D">
          <div className="navigation-help-title">Como movimentar e interagir com o modelo 3D</div>
          <ul className="navigation-help-list">
            <li>
              <strong>Girar 360°:</strong> Arraste com botão esquerdo (modo <em>Girar</em>) ou 2 dedos na horizontal.
            </li>
            <li>
              <strong>Subir / Descer Corpo (Pan):</strong> Ative <em>Mover</em> abaixo (ou arraste com botão direito / Shift+Scroll).
            </li>
            <li>
              <strong>Aproximar na Peça:</strong> Dê <strong>Duplo-Clique</strong> em qualquer osso ou órgão (ou tecla <code>F</code>).
            </li>
            <li>
              <strong>Dissecar a Jato:</strong> Segure <code>Alt + Clique</code> (ou ative <em>Bisturi 3D</em>) para retirar uma peça.
            </li>
          </ul>
        </div>
      )}

      <div className="orientation-dock-bar">
        {/* 1. Alternador de Modo do Mouse/Toque: Girar Órbita vs Mover Corpo */}
        <div className="orientation-mode-pill-group" role="group" aria-label="Modo de arraste do mouse">
          <button
            type="button"
            onClick={() => setCameraInteractionMode('rotate')}
            aria-pressed={cameraInteractionMode === 'rotate'}
            className={`orientation-mini-btn ${cameraInteractionMode === 'rotate' ? 'active' : ''}`}
            title="Modo Girar: Arrastar com botão esquerdo gira o boneco em 360°"
          >
            <Rotate3d size={12} strokeWidth={1.5} aria-hidden="true" />
            <span>Girar</span>
          </button>
          <button
            type="button"
            onClick={() => setCameraInteractionMode('pan')}
            aria-pressed={cameraInteractionMode === 'pan'}
            className={`orientation-mini-btn ${cameraInteractionMode === 'pan' ? 'active' : ''}`}
            title="Modo Mover Corpo: Arrastar com botão esquerdo sobe, desce e move o boneco livremente"
          >
            <Move size={12} strokeWidth={1.5} aria-hidden="true" />
            <span>Mover</span>
          </button>
        </div>

        {/* 2. Elevação Craniocaudal e Zoom Direto */}
        <div className="orientation-mode-pill-group" role="group" aria-label="Elevação vertical e zoom">
          <button
            type="button"
            onClick={() => nudgeCameraRig({ verticalPanDelta: 0.22 })}
            className="orientation-icon-btn"
            title="Subir câmera em direção à cabeça (Eixo Craniocaudal +Y)"
            aria-label="Subir câmera para região cranial"
          >
            <ArrowUp size={12} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudgeCameraRig({ verticalPanDelta: -0.22 })}
            className="orientation-icon-btn"
            title="Descer câmera em direção aos membros inferiores (Eixo Craniocaudal -Y)"
            aria-label="Descer câmera para região caudal"
          >
            <ArrowDown size={12} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudgeCameraRig({ dollyScale: 0.84 })}
            className="orientation-icon-btn"
            title="Aproximar Zoom (+)"
            aria-label="Aproximar zoom"
          >
            <ZoomIn size={12} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudgeCameraRig({ dollyScale: 1.18 })}
            className="orientation-icon-btn"
            title="Afastar Zoom (-)"
            aria-label="Afastar zoom"
          >
            <ZoomOut size={12} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {/* 3. Vistas Anatômicas Ortogonais de 1 Clique */}
        <div className="orientation-mode-pill-group" role="group" aria-label="Vistas anatômicas rápidas">
          {ANATOMICAL_VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setCameraPresetView(v.id)}
              className="orientation-view-btn"
              title={v.title}
            >
              <span>{v.label}</span>
            </button>
          ))}
        </div>

        {/* 4. Enquadramento Padrão e Guia de Interação */}
        <button
          type="button"
          onClick={handleResetCamera}
          className="orientation-reset-btn"
          title="Centralizar e restaurar perspectiva 3D da câmera (Tecla R)"
          aria-label="Restaurar perspectiva 3D da câmera"
        >
          <Compass size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>Enquadrar 3D</span>
        </button>

        <button
          type="button"
          onClick={() => setShowGuide((prev) => !prev)}
          aria-expanded={showGuide}
          className={`orientation-icon-btn ${showGuide ? 'active' : ''}`}
          title="Como movimentar e interagir com o boneco 3D"
          aria-label="Guia de movimentação 3D"
        >
          <HelpCircle size={13} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

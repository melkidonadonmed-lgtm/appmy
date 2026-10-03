import React from 'react';
import { Html } from '@react-three/drei';
import { Focus, Maximize2, Eye, EyeOff, X, FileText } from 'lucide-react';
import { AnyAnatomicalNode } from './AnatomicalAtlasScene.tsx';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';

export interface AnatomicalCallout3DProps {
  node: AnyAnatomicalNode;
  position: [number, number, number];
  onClose: () => void;
  onOpenDetailsTab?: () => void;
}

export const AnatomicalCallout3D: React.FC<AnatomicalCallout3DProps> = ({
  node,
  position,
  onClose,
  onOpenDetailsTab,
}) => {
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const toggleVisibility = useAnatomyStore((s) => s.toggleVisibility);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);
  const toggleIsolatedOnly = useAnatomyStore((s) => s.toggleIsolatedOnly);
  const isolatedOnly = useAnatomyStore((s) => s.isolatedOnly);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);

  const isCurrentHidden = hiddenNodeIds.has(node.id);

  const handleFocus = () => {
    if (node.explosionVector) {
      setCameraFocusTarget([
        node.explosionVector.x * 0.1,
        node.explosionVector.y * 0.1,
        node.explosionVector.z * 0.1,
      ]);
    } else {
      setCameraFocusTarget([position[0], position[1], position[2]]);
    }
  };

  const handleIsolate = () => {
    isolateNode([node.id], []);
    toggleIsolatedOnly();
  };

  return (
    <Html
      position={position}
      center
      distanceFactor={4.5}
      style={{
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <div className="callout-leader-wrapper">
        {/* 1. Ponto de Ancoragem 3D Centralizado na Malha (Dot Luminoso Pulsante) */}
        <div className="callout-anchor-dot" />

        {/* 2. Linha Guia Vetorial SVG (Leader Line) Deslocando o Card */}
        <svg
          className="callout-svg-line"
          width="110"
          height="80"
          viewBox="0 0 110 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 80 L 45 35 L 105 35"
            stroke="url(#lineGradient)"
            strokeWidth="1.8"
            strokeDasharray="3 3"
            className="callout-path-anim"
          />
          <circle cx="105" cy="35" r="3" fill="#38bdf8" />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* 3. Card Deslocado para Fora da Silhueta do Modelo */}
        <div className="callout-card-displaced" style={{ pointerEvents: 'auto' }}>
          <div className="callout-card-header">
            <div className="callout-card-badge">{node.systemName || 'Estrutura'}</div>
            <button
              type="button"
              onClick={onClose}
              title="Fechar (Esc)"
              className="callout-close-btn"
            >
              <X size={12} aria-hidden="true" />
            </button>
          </div>

          <div className="callout-card-body">
            <div className="callout-card-name-pt">{node.namePtBr}</div>
            {node.nameLatin && (
              <div className="callout-card-name-latin">{node.nameLatin}</div>
            )}
          </div>

          {/* Ações Rápidas sem precisar ir até a sidebar */}
          <div className="callout-card-actions">
            <button
              type="button"
              onClick={handleFocus}
              title="Focar câmera 3D (Tecla F)"
              className="callout-action-btn"
            >
              <Focus size={11} aria-hidden="true" />
              <span>Focar (F)</span>
            </button>
            <button
              type="button"
              onClick={handleIsolate}
              title="Isolar estrutura (Tecla I)"
              className={`callout-action-btn ${isolatedOnly ? 'active' : ''}`}
            >
              <Maximize2 size={11} aria-hidden="true" />
              <span>{isolatedOnly ? 'Restaurar' : 'Isolar'}</span>
            </button>
            <button
              type="button"
              onClick={() => toggleVisibility(node.id)}
              title="Ocultar/Exibir (Tecla H)"
              className={`callout-action-btn ${isCurrentHidden ? 'warning' : ''}`}
            >
              {isCurrentHidden ? (
                <Eye size={11} aria-hidden="true" />
              ) : (
                <EyeOff size={11} aria-hidden="true" />
              )}
            </button>
            {onOpenDetailsTab && (
              <button
                type="button"
                onClick={onOpenDetailsTab}
                title="Abrir ficha completa na sidebar"
                className="callout-action-btn primary"
              >
                <FileText size={11} aria-hidden="true" />
                <span>Ficha</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Html>
  );
};

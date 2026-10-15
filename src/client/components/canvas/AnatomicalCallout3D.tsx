import React, { useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Focus, Maximize2, Eye, EyeOff, X, FileText } from 'lucide-react';
import { AnyAnatomicalNode } from './AnatomicalAtlasScene.tsx';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG } from '../../../shared/constants/zAnatomyCatalog.ts';

export interface AnatomicalCallout3DProps {
  node: AnyAnatomicalNode;
  position: [number, number, number];
  worldPosition?: [number, number, number];
  onClose: () => void;
  onOpenDetailsTab?: () => void;
}

const _calloutPointNdc = new THREE.Vector3();
const _calloutMidlineNdc = new THREE.Vector3();

export const AnatomicalCallout3D: React.FC<AnatomicalCallout3DProps> = ({
  node,
  position,
  worldPosition,
  onClose,
  onOpenDetailsTab,
}) => {
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const toggleVisibility = useAnatomyStore((s) => s.toggleVisibility);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);
  const showAll = useAnatomyStore((s) => s.showAll);
  const isolatedOnly = useAnatomyStore((s) => s.isolatedOnly);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);

  const effectiveWorld = worldPosition || position;
  const [calloutSide, setCalloutSide] = useState<'left' | 'right'>(() =>
    effectiveWorld[0] < -0.01 ? 'left' : 'right'
  );

  const { camera } = useThree();

  // Determina em tempo real para qual lado da tela (esquerda ou direita da linha média do corpo)
  // a caixa deve se deslocar, garantindo que nunca fique em cima do modelo em nenhum ângulo de câmera.
  useFrame(() => {
    if (!camera) return;
    const [wx, wy, wz] = worldPosition || position;
    const pointNdc = _calloutPointNdc.set(wx, wy, wz).project(camera);
    const midlineNdc = _calloutMidlineNdc.set(0, wy, 0).project(camera);
    const nextSide: 'left' | 'right' = pointNdc.x < midlineNdc.x - 0.005 ? 'left' : 'right';
    if (nextSide !== calloutSide) {
      setCalloutSide(nextSide);
    }
  });

  const isCurrentHidden = hiddenNodeIds.has(node.id);

  const handleFocus = () => {
    if (worldPosition) {
      setCameraFocusTarget([worldPosition[0], worldPosition[1], worldPosition[2]]);
    } else if (position[0] !== 0 || position[1] !== 0 || position[2] !== 0) {
      setCameraFocusTarget([position[0], position[1], position[2]]);
    } else if (node.explosionVector) {
      setCameraFocusTarget([
        node.explosionVector.x * 0.1,
        node.explosionVector.y * 0.1,
        node.explosionVector.z * 0.1,
      ]);
    } else {
      setCameraFocusTarget([0, 0, 0]);
    }
  };

  const handleIsolate = () => {
    if (isolatedOnly) {
      showAll();
    } else {
      const allIds: string[] = [];
      for (const item of Z_ANATOMY_CATALOG) {
        allIds.push(item.id);
        if (item.node) allIds.push(item.node);
      }
      const targetIds = [node.id, node.meshName].filter(Boolean) as string[];
      isolateNode(targetIds, allIds);
    }
  };

  return (
    <Html
      position={position}
      style={{
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      <div className={`callout-leader-wrapper side-${calloutSide}`}>
        {/* 1. Ponto de Ancoragem 3D Cravado em (0,0) exatamente sobre o centro da peça */}
        <div className="callout-anchor-dot" />

        {/* 2. Linha Guia Vetorial SVG (Leader Line) Deslocando o Card para fora da silhueta */}
        <svg
          className={`callout-svg-line side-${calloutSide}`}
          width="136"
          height="54"
          viewBox="0 0 136 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={
              calloutSide === 'left'
                ? 'M 136 54 L 96 16 L 4 16'
                : 'M 0 54 L 40 16 L 132 16'
            }
            stroke="url(#lineGradient)"
            strokeWidth="1.8"
            strokeDasharray="3 3"
            className="callout-path-anim"
          />
          <circle
            cx={calloutSide === 'left' ? '4' : '132'}
            cy="16"
            r="3"
            fill="#38bdf8"
          />
          <defs>
            <linearGradient
              id="lineGradient"
              x1={calloutSide === 'left' ? '100%' : '0%'}
              y1="100%"
              x2={calloutSide === 'left' ? '0%' : '100%'}
              y2="0%"
            >
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.45" />
            </linearGradient>
          </defs>
        </svg>

        {/* 3. Card Deslocado para Fora da Silhueta do Modelo */}
        <div className={`callout-card-displaced side-${calloutSide}`} style={{ pointerEvents: 'auto' }}>
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

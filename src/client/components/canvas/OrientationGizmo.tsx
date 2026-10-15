import React from 'react';
import { Compass } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';

const DEFAULT_CAMERA_POS: [number, number, number] = [2.5, 2.2, 4.5];
const DEFAULT_CAMERA_TARGET: [number, number, number] = [0, 0, 0];

export const OrientationGizmo: React.FC = () => {
  const setCameraPositionTarget = useAnatomyStore((s) => s.setCameraPositionTarget);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);

  const handleResetCamera = () => {
    setCameraFocusTarget(DEFAULT_CAMERA_TARGET);
    setCameraPositionTarget(DEFAULT_CAMERA_POS);
  };

  return (
    <div className="orientation-gizmo-container" aria-label="Orientação de Câmera 3D">
      <button
        type="button"
        onClick={handleResetCamera}
        className="orientation-reset-btn"
        title="Centralizar e restaurar perspectiva 3D da câmera"
        aria-label="Restaurar perspectiva 3D da câmera"
      >
        <Compass size={13} strokeWidth={1.5} aria-hidden="true" />
        <span>Enquadrar 3D</span>
      </button>
    </div>
  );
};

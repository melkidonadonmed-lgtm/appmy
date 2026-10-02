import { useMemo } from 'react';
import * as THREE from 'three';
import { MprPlaneType } from '../../../shared/types/dissection.ts';

interface DissectionPlaneHelperProps {
  planeType: MprPlaneType;
  offset: number;
  visible: boolean;
}

export function DissectionPlaneHelper({ planeType, offset, visible }: DissectionPlaneHelperProps) {
  const { position, rotation, colorHex } = useMemo(() => {
    switch (planeType) {
      case 'sagittal':
        return {
          position: [offset, 0, 0] as [number, number, number],
          rotation: [0, Math.PI / 2, 0] as [number, number, number],
          colorHex: '#38bdf8', // Sky Blue
        };
      case 'coronal':
        return {
          position: [0, 0, offset] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          colorHex: '#10b981', // Emerald
        };
      case 'axial':
        return {
          position: [0, offset, 0] as [number, number, number],
          rotation: [Math.PI / 2, 0, 0] as [number, number, number],
          colorHex: '#818cf8', // Indigo
        };
    }
  }, [planeType, offset]);

  if (!visible) return null;

  return (
    <group position={position} rotation={rotation}>
      {/* Lâmina Semitransparente do Corte Tomográfico */}
      <mesh>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial
          color={colorHex}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
          clippingPlanes={[]}
        />
      </mesh>

      {/* Grade Sutil de Calibração Milimétrica */}
      <gridHelper
        args={[3.2, 16, colorHex, colorHex]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color={colorHex}
          transparent
          opacity={0.35}
          depthWrite={false}
          clippingPlanes={[]}
        />
      </gridHelper>

      {/* Contorno Externo Nítido do Plano */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 3.2)]} />
        <lineBasicMaterial
          color={colorHex}
          transparent
          opacity={0.8}
          linewidth={1.5}
          clippingPlanes={[]}
        />
      </lineSegments>
    </group>
  );
}

import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { MprPlaneType } from '../../../shared/types/dissection.ts';

interface DissectionPlaneHelperProps {
  planeType: MprPlaneType;
  offset: number;
  visible: boolean;
}

const HELPER_PLANE_SIZE = 3.2;

export function DissectionPlaneHelper({ planeType, offset, visible }: DissectionPlaneHelperProps) {
  const { planeGeom, edgesGeom } = useMemo(() => {
    const plane = new THREE.PlaneGeometry(HELPER_PLANE_SIZE, HELPER_PLANE_SIZE);
    const edges = new THREE.EdgesGeometry(plane);
    return { planeGeom: plane, edgesGeom: edges };
  }, []);

  useEffect(() => {
    return () => {
      planeGeom.dispose();
      edgesGeom.dispose();
    };
  }, [planeGeom, edgesGeom]);

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
      <mesh geometry={planeGeom}>
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
        args={[HELPER_PLANE_SIZE, 16, colorHex, colorHex]}
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
      <lineSegments geometry={edgesGeom}>
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

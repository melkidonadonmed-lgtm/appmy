import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { MprPlaneType } from '../../../shared/types/dissection.ts';

interface DissectionPlaneHelperProps {
  planeType: MprPlaneType;
  offset: number;
  inverted?: boolean;
  visible: boolean;
}

const HELPER_PLANE_SIZE = 2.8;
const INNER_WINDOW_SIZE = 2.28;
const Z_FIGHT_EPSILON = 0.004;

// Desativa raycasting na moldura tomográfica para nunca bloquear cliques/hover nas estruturas anatômicas cortadas
const noopRaycast = () => {};

export function DissectionPlaneHelper({
  planeType,
  offset,
  inverted = false,
  visible,
}: DissectionPlaneHelperProps) {
  const { frameGeom, outerEdgesGeom, innerEdgesGeom, tickLinesGeom } = useMemo(() => {
    const halfOuter = HELPER_PLANE_SIZE / 2;
    const halfInner = INNER_WINDOW_SIZE / 2;

    // Moldura cirúrgica vazada no centro (janela central 100% limpa para ver o corte anatômico sem névoa nem Z-fighting)
    const shape = new THREE.Shape();
    shape.moveTo(-halfOuter, -halfOuter);
    shape.lineTo(halfOuter, -halfOuter);
    shape.lineTo(halfOuter, halfOuter);
    shape.lineTo(-halfOuter, halfOuter);
    shape.closePath();

    const hole = new THREE.Path();
    hole.moveTo(-halfInner, -halfInner);
    hole.lineTo(halfInner, -halfInner);
    hole.lineTo(halfInner, halfInner);
    hole.lineTo(-halfInner, halfInner);
    hole.closePath();
    shape.holes.push(hole);

    const frame = new THREE.ShapeGeometry(shape);
    const outerPlane = new THREE.PlaneGeometry(HELPER_PLANE_SIZE, HELPER_PLANE_SIZE);
    const innerPlane = new THREE.PlaneGeometry(INNER_WINDOW_SIZE, INNER_WINDOW_SIZE);
    const outerEdges = new THREE.EdgesGeometry(outerPlane);
    const innerEdges = new THREE.EdgesGeometry(innerPlane);
    outerPlane.dispose();
    innerPlane.dispose();

    // Marcas de calibração milimétrica apenas na borda periférica (sem cruzar o centro da anatomia)
    const tickVertices: number[] = [];
    const divisions = 14;
    const step = INNER_WINDOW_SIZE / divisions;
    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      const coord = i * step;
      const isMajor = i % 2 === 0;
      const tickLen = isMajor ? 0.12 : 0.06;
      // Topo e Base
      tickVertices.push(coord, halfInner, 0, coord, halfInner + tickLen, 0);
      tickVertices.push(coord, -halfInner, 0, coord, -halfInner - tickLen, 0);
      // Esquerda e Direita
      tickVertices.push(-halfInner, coord, 0, -halfInner - tickLen, coord, 0);
      tickVertices.push(halfInner, coord, 0, halfInner + tickLen, coord, 0);
    }
    const ticks = new THREE.BufferGeometry();
    ticks.setAttribute('position', new THREE.Float32BufferAttribute(tickVertices, 3));

    return {
      frameGeom: frame,
      outerEdgesGeom: outerEdges,
      innerEdgesGeom: innerEdges,
      tickLinesGeom: ticks,
    };
  }, []);

  useEffect(() => {
    return () => {
      frameGeom.dispose();
      outerEdgesGeom.dispose();
      innerEdgesGeom.dispose();
      tickLinesGeom.dispose();
    };
  }, [frameGeom, outerEdgesGeom, innerEdgesGeom, tickLinesGeom]);

  const { position, rotation, colorHex } = useMemo(() => {
    // Recua sutilmente a moldura na direção descartada para eliminar 100% de Z-fighting coplanar na superfície cortada
    const shift = (inverted ? -1 : 1) * Z_FIGHT_EPSILON;
    switch (planeType) {
      case 'sagittal':
        return {
          position: [offset + shift, 0, 0] as [number, number, number],
          rotation: [0, Math.PI / 2, 0] as [number, number, number],
          colorHex: '#38bdf8', // Sky Blue
        };
      case 'coronal':
        return {
          position: [0, 0, offset + shift] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          colorHex: '#10b981', // Emerald
        };
      case 'axial':
        return {
          position: [0, offset + shift, 0] as [number, number, number],
          rotation: [Math.PI / 2, 0, 0] as [number, number, number],
          colorHex: '#818cf8', // Indigo
        };
    }
  }, [planeType, offset, inverted]);

  if (!visible) return null;

  return (
    <group position={position} rotation={rotation} renderOrder={12}>
      {/* Colar Periférico Semitransparente (Janela Central Vazada) */}
      <mesh geometry={frameGeom} raycast={noopRaycast}>
        <meshBasicMaterial
          color={colorHex}
          transparent
          opacity={0.10}
          side={THREE.DoubleSide}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={2}
          polygonOffsetUnits={2}
          clippingPlanes={[]}
        />
      </mesh>

      {/* Escala Periférica de Calibração Tomográfica */}
      <lineSegments geometry={tickLinesGeom} raycast={noopRaycast}>
        <lineBasicMaterial
          color={colorHex}
          transparent
          opacity={0.48}
          depthWrite={false}
          clippingPlanes={[]}
        />
      </lineSegments>

      {/* Contorno Interno da Janela de Corte */}
      <lineSegments geometry={innerEdgesGeom} raycast={noopRaycast}>
        <lineBasicMaterial
          color={colorHex}
          transparent
          opacity={0.78}
          depthWrite={false}
          clippingPlanes={[]}
        />
      </lineSegments>

      {/* Contorno Externo Nítido do Plano */}
      <lineSegments geometry={outerEdgesGeom} raycast={noopRaycast}>
        <lineBasicMaterial
          color={colorHex}
          transparent
          opacity={0.42}
          depthWrite={false}
          clippingPlanes={[]}
        />
      </lineSegments>
    </group>
  );
}

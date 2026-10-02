import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CARDIOVASCULAR_NODES, CardiovascularNode } from '../../../shared/constants/cardiovascular.ts';

interface CardiovascularSceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: CardiovascularNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
}

interface VesselTubeProps {
  node: CardiovascularNode;
  points: THREE.Vector3[];
  radius: number;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function VesselTube({
  node,
  points,
  radius,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: VesselTubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Curva 3D suave para a geometria tubular
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 32, radius, 12, false);
  }, [points, radius]);

  // Vetor de explosão
  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 0.9;
    return new THREE.Vector3(vec.x * mult, vec.y * mult, vec.z * mult);
  }, [node]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.lerp(
      new THREE.Vector3(
        explosionOffset.x * explosionProgress,
        explosionOffset.y * explosionProgress,
        explosionOffset.z * explosionProgress
      ),
      0.15
    );
  });

  if (isIsolatedHidden) return null;

  const baseColor = node.colorHex || (node.oxygenated ? '#ef4444' : '#3b82f6');
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.95;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.28}
        metalness={0.15}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

interface HeartChamberProps {
  node: CardiovascularNode;
  basePosition: THREE.Vector3;
  scaleVec: [number, number, number];
  geometryType: 'sphere' | 'cone';
  rotation?: [number, number, number];
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function HeartChamber({
  node,
  basePosition,
  scaleVec,
  geometryType,
  rotation = [0, 0, 0],
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: HeartChamberProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 0.9;
    return new THREE.Vector3(vec.x * mult, vec.y * mult, vec.z * mult);
  }, [node]);

  // Simulação fisiológica do batimento cardíaco (Sístole/Diástole)
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 4.2; // ~72 BPM
    // Onda de pulso bifásica (contração rápida + relaxamento)
    const beat = Math.pow(Math.sin(t), 12) * 0.06;

    const targetPos = new THREE.Vector3(
      basePosition.x + explosionOffset.x * explosionProgress,
      basePosition.y + explosionOffset.y * explosionProgress,
      basePosition.z + explosionOffset.z * explosionProgress
    );
    meshRef.current.position.lerp(targetPos, 0.15);

    // Pulso miocárdico sutil se o nó não estiver isolado de forma estática
    const currentScale = 1 + beat;
    meshRef.current.scale.set(
      scaleVec[0] * currentScale,
      scaleVec[1] * currentScale,
      scaleVec[2] * currentScale
    );
  });

  if (isIsolatedHidden) return null;

  const baseColor = node.colorHex || (node.oxygenated ? '#ef4444' : '#3b82f6');
  const opacity = isGhost ? 0.15 : 1.0;

  return (
    <mesh
      ref={meshRef}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      {geometryType === 'sphere' ? (
        <sphereGeometry args={[0.3, 32, 24]} />
      ) : (
        <coneGeometry args={[0.32, 0.65, 32]} />
      )}
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.35}
        metalness={0.12}
        transparent={isGhost}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.35 : 0.0}
      />
    </mesh>
  );
}

export function CardiovascularScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: CardiovascularSceneProps) {
  // Coordenadas anatômicas dos vasos e câmaras
  // Localizado abaixo do crânio (região cervical e mediastino superior/médio)
  const vesselPaths = useMemo(() => {
    return {
      aorta_arch: [
        new THREE.Vector3(-0.06, -1.35, 0.05), // Saída do Ventrículo Esquerdo
        new THREE.Vector3(-0.04, -1.1, 0.08),  // Aorta ascendente
        new THREE.Vector3(0.0, -0.92, 0.02),   // Ápice do arco aórtico
        new THREE.Vector3(-0.15, -0.96, -0.1), // Transição posterior
        new THREE.Vector3(-0.18, -1.5, -0.15), // Aorta torácica descendente
      ],
      carotid_common_r: [
        new THREE.Vector3(0.12, -0.92, 0.04),  // Origem no tronco braquiocefálico
        new THREE.Vector3(0.25, -0.7, 0.12),   // Trajeto carotídeo cervical
        new THREE.Vector3(0.32, -0.4, 0.22),   // Trígono carotídeo (C4)
      ],
      carotid_internal_r: [
        new THREE.Vector3(0.32, -0.4, 0.22),   // Bifurcação carotídea
        new THREE.Vector3(0.38, -0.1, 0.15),   // Espaço retroestilóideo
        new THREE.Vector3(0.28, 0.12, 0.12),   // Canal carótico / Polígono de Willis
      ],
      jugular_internal_r: [
        new THREE.Vector3(0.38, 0.1, -0.05),   // Forame jugular (base do crânio)
        new THREE.Vector3(0.42, -0.35, 0.1),   // Vainha carotídea lateral
        new THREE.Vector3(0.28, -0.75, 0.1),   // Junção cervical baixa
        new THREE.Vector3(0.18, -1.05, 0.05),  // Confluência braquiocefálica
      ],
      vena_cava_superior: [
        new THREE.Vector3(0.18, -1.05, 0.05),  // Formação pelas veias braquiocefálicas
        new THREE.Vector3(0.19, -1.2, 0.02),   // Trajeto mediastinal
        new THREE.Vector3(0.22, -1.35, -0.02), // Entrada no Átrio Direito
      ],
    };
  }, []);

  return (
    <group name="cardiovascular_system_group">
      {CARDIOVASCULAR_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isIsolatedHidden = isolatedOnly && !isSelected;
        const isGhost = ghostMode && !isSelected;

        // Renderização das Câmaras Cardíacas
        if (node.vesselType === 'heart_chamber') {
          let basePos = new THREE.Vector3(0, -1.5, 0);
          let scale: [number, number, number] = [1, 1, 1];
          let geomType: 'sphere' | 'cone' = 'sphere';
          let rotation: [number, number, number] = [0, 0, 0];

          switch (node.meshName) {
            case 'left_ventricle':
              basePos = new THREE.Vector3(-0.16, -1.6, 0.08);
              scale = [0.85, 1.25, 0.85];
              geomType = 'cone';
              rotation = [Math.PI, 0.2, -0.3];
              break;
            case 'right_ventricle':
              basePos = new THREE.Vector3(0.12, -1.55, 0.12);
              scale = [0.95, 1.1, 0.8];
              geomType = 'cone';
              rotation = [Math.PI, -0.2, 0.2];
              break;
            case 'left_atrium':
              basePos = new THREE.Vector3(-0.12, -1.35, -0.08);
              scale = [0.8, 0.75, 0.8];
              geomType = 'sphere';
              break;
            case 'right_atrium':
              basePos = new THREE.Vector3(0.22, -1.38, 0.0);
              scale = [0.85, 0.8, 0.85];
              geomType = 'sphere';
              break;
          }

          return (
            <HeartChamber
              key={node.id}
              node={node}
              basePosition={basePos}
              scaleVec={scale}
              geometryType={geomType}
              rotation={rotation}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        // Renderização das Redes Tubulares Vasculares
        const path = vesselPaths[node.meshName as keyof typeof vesselPaths];
        if (path) {
          const radius = node.meshName === 'aorta_arch' ? 0.065 : 0.045;
          return (
            <VesselTube
              key={node.id}
              node={node}
              points={path}
              radius={radius}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        return null;
      })}
    </group>
  );
}

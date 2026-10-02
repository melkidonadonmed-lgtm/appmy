import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RESPIRATORY_NODES, RespiratoryNode } from '../../../shared/constants/respiratory.ts';

interface RespiratorySceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: RespiratoryNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
}

interface RespiratoryItemProps {
  node: RespiratoryNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function TracheaTubeMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: RespiratoryItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Trajetória da traqueia
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0.45, 0.1),
      new THREE.Vector3(0, 0.25, 0.08),
      new THREE.Vector3(0, 0.05, 0.05),
      new THREE.Vector3(0, -0.15, 0.0), // Carina
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 24, 0.12, 16, false);
  }, []);

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

  const baseColor = node.colorHex || '#0ea5e9';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

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
        roughness={0.35}
        metalness={0.1}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function BronchusTubeMesh({
  node,
  side,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: RespiratoryItemProps & { side: 'right' | 'left' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Anatomia diferencial: brônquio direito é mais vertical e curto; esquerdo é mais horizontal e longo
  const geometry = useMemo(() => {
    const points =
      side === 'right'
        ? [
            new THREE.Vector3(0, -0.15, 0.0), // Carina
            new THREE.Vector3(0.18, -0.32, -0.02),
            new THREE.Vector3(0.38, -0.5, -0.05), // Hilo direito
          ]
        : [
            new THREE.Vector3(0, -0.15, 0.0), // Carina
            new THREE.Vector3(-0.25, -0.28, -0.03),
            new THREE.Vector3(-0.48, -0.42, -0.06), // Hilo esquerdo
          ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 20, side === 'right' ? 0.09 : 0.075, 14, false);
  }, [side]);

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

  const baseColor = node.colorHex || '#0284c7';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

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
        roughness={0.35}
        metalness={0.1}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function LungLobeMesh({
  node,
  basePosition,
  scaleVec,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: RespiratoryItemProps & {
  basePosition: THREE.Vector3;
  scaleVec: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 0.9;
    return new THREE.Vector3(vec.x * mult, vec.y * mult, vec.z * mult);
  }, [node]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Movimento respiratório orgânico suave (~14 incursões ventilatórias/min)
    const t = state.clock.elapsedTime * 1.5;
    const breathFactor = 1.0 + Math.sin(t) * 0.025;

    // Interpolação para a posição na vista explodida
    const targetPos = new THREE.Vector3(
      basePosition.x + explosionOffset.x * explosionProgress,
      basePosition.y + explosionOffset.y * explosionProgress,
      basePosition.z + explosionOffset.z * explosionProgress
    );

    meshRef.current.position.lerp(targetPos, 0.12);
    meshRef.current.scale.set(
      scaleVec[0] * breathFactor,
      scaleVec[1] * breathFactor,
      scaleVec[2] * breathFactor
    );
  });

  if (isIsolatedHidden) return null;

  const baseColor = node.colorHex || '#67e8f9';
  const opacity = isGhost ? 0.12 : isSelected ? 0.95 : 0.82;

  return (
    <mesh
      ref={meshRef}
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
      <sphereGeometry args={[0.38, 24, 24]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.4}
        metalness={0.05}
        transparent
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.5 : hovered ? 0.35 : 0.0}
      />
    </mesh>
  );
}

function LarynxComplexMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: RespiratoryItemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 0.9;
    return new THREE.Vector3(vec.x * mult, vec.y * mult, vec.z * mult);
  }, [node]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.lerp(
      new THREE.Vector3(
        explosionOffset.x * explosionProgress,
        0.58 + explosionOffset.y * explosionProgress,
        0.12 + explosionOffset.z * explosionProgress
      ),
      0.15
    );
  });

  if (isIsolatedHidden) return null;

  const baseColor = node.colorHex || '#38bdf8';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.95;

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cartilagem tireóidea estilizada */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 0.22, 16, 1, false, 0, Math.PI * 1.6]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
          roughness={0.3}
          metalness={0.15}
          transparent={isGhost || opacity < 1.0}
          opacity={opacity}
          emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
        />
      </mesh>
      {/* Cartilagem cricóidea inferior */}
      <mesh position={[0, -0.14, 0]} castShadow>
        <torusGeometry args={[0.11, 0.035, 12, 20]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : '#7dd3fc'}
          roughness={0.3}
          transparent={isGhost || opacity < 1.0}
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

export function RespiratoryScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: RespiratorySceneProps) {
  // Configurações morfológicas espaciais para cada lobo pulmonar
  const lobeConfigurations = useMemo(() => {
    return {
      'lung_right_superior': {
        basePosition: new THREE.Vector3(0.62, -0.05, 0.0),
        scale: [1.05, 1.25, 0.95] as [number, number, number],
      },
      'lung_right_middle': {
        basePosition: new THREE.Vector3(0.72, -0.42, 0.16),
        scale: [0.95, 0.75, 0.9] as [number, number, number],
      },
      'lung_right_inferior': {
        basePosition: new THREE.Vector3(0.68, -0.75, -0.1),
        scale: [1.15, 1.2, 1.05] as [number, number, number],
      },
      'lung_left_superior': {
        basePosition: new THREE.Vector3(-0.62, -0.1, 0.02),
        scale: [1.05, 1.35, 0.95] as [number, number, number],
      },
      'lung_left_inferior': {
        basePosition: new THREE.Vector3(-0.68, -0.72, -0.1),
        scale: [1.15, 1.2, 1.05] as [number, number, number],
      },
    };
  }, []);

  return (
    <group position={[0, -0.3, 0]}>
      {RESPIRATORY_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
        const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

        if (node.meshName === 'larynx_complex') {
          return (
            <LarynxComplexMesh
              key={node.id}
              node={node}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        if (node.meshName === 'trachea_tube') {
          return (
            <TracheaTubeMesh
              key={node.id}
              node={node}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        if (node.meshName === 'bronchus_main_r') {
          return (
            <BronchusTubeMesh
              key={node.id}
              node={node}
              side="right"
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        if (node.meshName === 'bronchus_main_l') {
          return (
            <BronchusTubeMesh
              key={node.id}
              node={node}
              side="left"
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        const config = lobeConfigurations[node.meshName as keyof typeof lobeConfigurations];
        if (config) {
          return (
            <LungLobeMesh
              key={node.id}
              node={node}
              basePosition={config.basePosition}
              scaleVec={config.scale}
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

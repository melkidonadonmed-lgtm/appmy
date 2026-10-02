import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { LYMPHATIC_NODES, LymphaticNode } from '../../../shared/constants/lymphatic.ts';

interface LymphaticSceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: LymphaticNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
}

interface LymphaticItemProps {
  node: LymphaticNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function LymphaticDuctMesh({
  node,
  points,
  radius,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: LymphaticItemProps & { points: THREE.Vector3[]; radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 28, radius, 12, false);
  }, [points, radius]);

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

  const baseColor = node.colorHex || '#34d399';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.88;

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
        roughness={0.25}
        metalness={0.2}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#059669'}
        emissiveIntensity={isSelected ? 0.7 : hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
}

function LymphNodeClusterMesh({
  node,
  basePosition,
  scaleVec,
  isSentinel,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: LymphaticItemProps & {
  basePosition: THREE.Vector3;
  scaleVec: [number, number, number];
  isSentinel?: boolean;
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

    // Se for o linfonodo sentinela (Virchow), pulsa sutilmente com brilho de vigilância imune
    let pulseScale = 1.0;
    if (isSentinel) {
      pulseScale = 1.0 + Math.sin(state.clock.elapsedTime * 3.0) * 0.12;
    }

    const targetPos = new THREE.Vector3(
      basePosition.x + explosionOffset.x * explosionProgress,
      basePosition.y + explosionOffset.y * explosionProgress,
      basePosition.z + explosionOffset.z * explosionProgress
    );

    meshRef.current.position.lerp(targetPos, 0.15);
    meshRef.current.scale.set(
      scaleVec[0] * pulseScale,
      scaleVec[1] * pulseScale,
      scaleVec[2] * pulseScale
    );
  });

  if (isIsolatedHidden) return null;

  const baseColor = node.colorHex || '#10b981';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

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
      <sphereGeometry args={[0.075, 16, 16]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.2}
        metalness={0.25}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : isSentinel ? '#10b981' : '#059669'}
        emissiveIntensity={isSelected ? 0.8 : hovered ? 0.6 : isSentinel ? 0.5 : 0.15}
      />
    </mesh>
  );
}

function CisternaChyliMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: LymphaticItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(0.04, -0.65, -0.18), []);

  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 0.9;
    return new THREE.Vector3(vec.x * mult, vec.y * mult, vec.z * mult);
  }, [node]);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetPos = new THREE.Vector3(
      basePosition.x + explosionOffset.x * explosionProgress,
      basePosition.y + explosionOffset.y * explosionProgress,
      basePosition.z + explosionOffset.z * explosionProgress
    );
    meshRef.current.position.lerp(targetPos, 0.15);
  });

  if (isIsolatedHidden) return null;

  const baseColor = node.colorHex || '#4ade80';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.9;

  return (
    <mesh
      ref={meshRef}
      scale={[0.09, 0.22, 0.08]}
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
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.25}
        metalness={0.15}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#16a34a'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.2}
      />
    </mesh>
  );
}

export function LymphaticScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: LymphaticSceneProps) {
  // Trajetória do Ducto Torácico (ascensão mediastinal de L1 até o ângulo venoso de Pirogoff)
  const thoracicDuctPoints = useMemo(() => {
    return [
      new THREE.Vector3(0.04, -0.65, -0.18), // Cisterna do Quilo
      new THREE.Vector3(0.03, -0.3, -0.16),
      new THREE.Vector3(-0.02, 0.05, -0.14),
      new THREE.Vector3(-0.12, 0.32, -0.1),
      new THREE.Vector3(-0.35, 0.42, 0.05),  // Arco final no ângulo esquerdo
    ];
  }, []);

  // Trajetória do Ducto Linfático Direito
  const rightLymphaticPoints = useMemo(() => {
    return [
      new THREE.Vector3(0.18, 0.22, 0.02),
      new THREE.Vector3(0.28, 0.35, 0.06),
      new THREE.Vector3(0.36, 0.4, 0.08), // Ângulo venoso direito
    ];
  }, []);

  // Coordenadas espaciais dos clusters ganglionares
  const nodeClusters: Record<
    string,
    { pos: THREE.Vector3; scale: [number, number, number]; isSentinel?: boolean }
  > = useMemo(() => {
    return {
      'lymph_nodes_jugulodigastric': {
        pos: new THREE.Vector3(0.55, 0.65, 0.18),
        scale: [1.1, 1.2, 1.0] as [number, number, number],
      },
      'lymph_nodes_omohyoid': {
        pos: new THREE.Vector3(0.58, 0.35, 0.12),
        scale: [1.0, 1.1, 1.0] as [number, number, number],
      },
      'lymph_node_virchow': {
        pos: new THREE.Vector3(-0.48, 0.38, 0.16), // Fossa supraclavicular esquerda
        scale: [1.35, 1.35, 1.35] as [number, number, number],
        isSentinel: true,
      },
      'lymph_nodes_axillary_apical': {
        pos: new THREE.Vector3(-0.85, 0.18, -0.05),
        scale: [1.2, 1.2, 1.1] as [number, number, number],
      },
      'lymph_nodes_tracheobronchial': {
        pos: new THREE.Vector3(0.0, -0.18, 0.05), // Subcarinal
        scale: [1.1, 1.1, 1.1] as [number, number, number],
      },
    };
  }, []);

  return (
    <group position={[0, -0.3, 0]}>
      {LYMPHATIC_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
        const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

        if (node.meshName === 'thoracic_duct') {
          return (
            <LymphaticDuctMesh
              key={node.id}
              node={node}
              points={thoracicDuctPoints}
              radius={0.032}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        if (node.meshName === 'right_lymphatic_duct') {
          return (
            <LymphaticDuctMesh
              key={node.id}
              node={node}
              points={rightLymphaticPoints}
              radius={0.025}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        if (node.meshName === 'cisterna_chyli') {
          return (
            <CisternaChyliMesh
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

        const cluster = nodeClusters[node.meshName as keyof typeof nodeClusters];
        if (cluster) {
          return (
            <LymphNodeClusterMesh
              key={node.id}
              node={node}
              basePosition={cluster.pos}
              scaleVec={cluster.scale}
              isSentinel={Boolean(cluster.isSentinel)}
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

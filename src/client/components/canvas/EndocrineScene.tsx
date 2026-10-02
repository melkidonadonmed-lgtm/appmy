import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ENDOCRINE_NODES, EndocrineNode } from '../../../shared/constants/endocrine.ts';

interface EndocrineSceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: EndocrineNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
}

interface EndocrineItemProps {
  node: EndocrineNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function PituitaryMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: EndocrineItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Hipófise situada na sela turca do osso esfenoide
  const basePosition = useMemo(() => new THREE.Vector3(0, 0.55, 0.12), []);

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

  const baseColor = node.colorHex || '#e11d48';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.95;

  return (
    <mesh
      ref={meshRef}
      scale={[0.07, 0.06, 0.06]}
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
        roughness={0.2}
        metalness={0.2}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#be123c'}
        emissiveIntensity={isSelected ? 0.7 : hovered ? 0.5 : 0.25}
      />
    </mesh>
  );
}

function ThyroidGlandMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: EndocrineItemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Tireoide na face anterior da traqueia
  const basePosition = useMemo(() => new THREE.Vector3(0, 0.42, 0.25), []);

  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 0.9;
    return new THREE.Vector3(vec.x * mult, vec.y * mult, vec.z * mult);
  }, [node]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetPos = new THREE.Vector3(
      basePosition.x + explosionOffset.x * explosionProgress,
      basePosition.y + explosionOffset.y * explosionProgress,
      basePosition.z + explosionOffset.z * explosionProgress
    );
    groupRef.current.position.lerp(targetPos, 0.15);
  });

  if (isIsolatedHidden) return null;

  const baseColor = node.colorHex || '#f43f5e';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

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
      {/* Lobo direito */}
      <mesh position={[0.14, 0, 0]} scale={[0.07, 0.14, 0.06]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
          roughness={0.3}
          transparent={isGhost || opacity < 1.0}
          opacity={opacity}
          emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#e11d48'}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.15}
        />
      </mesh>

      {/* Lobo esquerdo */}
      <mesh position={[-0.14, 0, 0]} scale={[0.07, 0.14, 0.06]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
          roughness={0.3}
          transparent={isGhost || opacity < 1.0}
          opacity={opacity}
          emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#e11d48'}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.15}
        />
      </mesh>

      {/* Istmo central */}
      <mesh position={[0, -0.04, 0.02]} scale={[0.1, 0.04, 0.04]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
          roughness={0.3}
          transparent={isGhost || opacity < 1.0}
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

function ParathyroidGlandsMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: EndocrineItemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(0, 0.42, 0.2), []);

  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 0.9;
    return new THREE.Vector3(vec.x * mult, vec.y * mult, vec.z * mult);
  }, [node]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetPos = new THREE.Vector3(
      basePosition.x + explosionOffset.x * explosionProgress,
      basePosition.y + explosionOffset.y * explosionProgress,
      basePosition.z + explosionOffset.z * explosionProgress
    );
    groupRef.current.position.lerp(targetPos, 0.15);
  });

  if (isIsolatedHidden) return null;

  const baseColor = node.colorHex || '#fbbf24';
  const glandColor = isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor;
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
      {/* 4 pequenas glândulas posteriores */}
      <mesh position={[0.16, 0.05, -0.02]} scale={[0.025, 0.025, 0.025]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={glandColor} emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : baseColor} emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.3} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.16, -0.05, -0.02]} scale={[0.025, 0.025, 0.025]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={glandColor} emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : baseColor} emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.3} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.16, 0.05, -0.02]} scale={[0.025, 0.025, 0.025]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={glandColor} emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : baseColor} emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.3} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.16, -0.05, -0.02]} scale={[0.025, 0.025, 0.025]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={glandColor} emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : baseColor} emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.3} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

function AdrenalGlandMesh({
  node,
  isRight,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: EndocrineItemProps & { isRight: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Situada sobre o polo superior de cada rim
  const basePosition = useMemo(
    () => (isRight ? new THREE.Vector3(0.52, -0.52, -0.22) : new THREE.Vector3(-0.52, -0.48, -0.22)),
    [isRight]
  );

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

  const baseColor = node.colorHex || '#eab308';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.95;

  return (
    <mesh
      ref={meshRef}
      rotation={isRight ? [0.2, 0.1, -0.2] : [0.2, -0.1, 0.2]}
      scale={isRight ? [0.12, 0.09, 0.08] : [0.14, 0.08, 0.07]}
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
      <coneGeometry args={[1, 1.2, 16]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.3}
        metalness={0.15}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#ca8a04'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.2}
      />
    </mesh>
  );
}

export function EndocrineScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: EndocrineSceneProps) {
  return (
    <group position={[0, -0.3, 0]}>
      {ENDOCRINE_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
        const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

        if (node.meshName === 'pituitary_gland') {
          return (
            <PituitaryMesh
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

        if (node.meshName === 'thyroid_gland') {
          return (
            <ThyroidGlandMesh
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

        if (node.meshName === 'parathyroid_glands') {
          return (
            <ParathyroidGlandsMesh
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

        if (node.meshName === 'adrenal_gland_r') {
          return (
            <AdrenalGlandMesh
              key={node.id}
              node={node}
              isRight={true}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        if (node.meshName === 'adrenal_gland_l') {
          return (
            <AdrenalGlandMesh
              key={node.id}
              node={node}
              isRight={false}
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

import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { URINARY_NODES, UrinaryNode } from '../../../shared/constants/urinary.ts';

interface UrinarySceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: UrinaryNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
}

interface UrinaryItemProps {
  node: UrinaryNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function KidneyMesh({
  node,
  isRight,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: UrinaryItemProps & { isRight: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Rim direito é ligeiramente mais baixo devido ao fígado (y = -0.75 vs y = -0.70)
  const basePosition = useMemo(
    () => (isRight ? new THREE.Vector3(0.55, -0.75, -0.22) : new THREE.Vector3(-0.55, -0.7, -0.22)),
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

  const baseColor = node.colorHex || '#854d0e';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

  return (
    <mesh
      ref={meshRef}
      rotation={isRight ? [0.1, -0.2, -0.15] : [0.1, 0.2, 0.15]}
      scale={[0.7, 1.15, 0.65]}
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
      <sphereGeometry args={[0.26, 24, 20]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.35}
        metalness={0.12}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function KidneyMedullaMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: UrinaryItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(0.0, -0.72, -0.28), []);

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

  const baseColor = node.colorHex || '#a16207';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.9;

  return (
    <mesh
      ref={meshRef}
      scale={[0.3, 0.5, 0.3]}
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
      <coneGeometry args={[0.3, 0.6, 16]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.4}
        metalness={0.1}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function UreterTubeMesh({
  node,
  isRight,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: UrinaryItemProps & { isRight: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const points = isRight
      ? [
          new THREE.Vector3(0.5, -0.82, -0.18),  // Pelve renal
          new THREE.Vector3(0.38, -1.05, -0.12), // Cruzamento ilíaco
          new THREE.Vector3(0.18, -1.25, 0.05),
          new THREE.Vector3(0.08, -1.38, 0.15),  // Óstio ureteral na bexiga
        ]
      : [
          new THREE.Vector3(-0.5, -0.78, -0.18),
          new THREE.Vector3(-0.38, -1.05, -0.12),
          new THREE.Vector3(-0.18, -1.25, 0.05),
          new THREE.Vector3(-0.08, -1.38, 0.15),
        ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 28, 0.035, 12, false);
  }, [isRight]);

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

  const baseColor = node.colorHex || '#eab308';
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
        roughness={0.3}
        metalness={0.15}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function BladderMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: UrinaryItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(0, -1.38, 0.16), []);

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

  const baseColor = node.colorHex || '#facc15';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

  return (
    <mesh
      ref={meshRef}
      scale={[0.85, 0.95, 0.8]}
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
      <sphereGeometry args={[0.22, 24, 20]} />
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

function BladderTrigoneMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: UrinaryItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(0, -1.48, 0.14), []);

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

  const baseColor = node.colorHex || '#f59e0b';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.95;

  return (
    <mesh
      ref={meshRef}
      scale={[0.16, 0.12, 0.12]}
      rotation={[0.3, 0, 0]}
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
      <coneGeometry args={[0.5, 0.8, 3]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.25}
        metalness={0.15}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

export function UrinaryScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: UrinarySceneProps) {
  return (
    <group position={[0, -0.3, 0]}>
      {URINARY_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
        const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

        if (node.meshName === 'kidney_right') {
          return (
            <KidneyMesh
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

        if (node.meshName === 'kidney_left') {
          return (
            <KidneyMesh
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

        if (node.meshName === 'kidney_medulla_pyramids') {
          return (
            <KidneyMedullaMesh
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

        if (node.meshName === 'ureter_tube_r') {
          return (
            <UreterTubeMesh
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

        if (node.meshName === 'ureter_tube_l') {
          return (
            <UreterTubeMesh
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

        if (node.meshName === 'urinary_bladder_body') {
          return (
            <BladderMesh
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

        if (node.meshName === 'bladder_trigone') {
          return (
            <BladderTrigoneMesh
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

        return null;
      })}
    </group>
  );
}

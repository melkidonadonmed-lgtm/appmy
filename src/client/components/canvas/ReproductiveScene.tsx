import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { REPRODUCTIVE_NODES, ReproductiveNode } from '../../../shared/constants/reproductive.ts';

interface ReproductiveSceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: ReproductiveNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
}

interface ReproductiveItemProps {
  node: ReproductiveNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function ProstateMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: ReproductiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Situada imediatamente abaixo do colo da bexiga urinária
  const basePosition = useMemo(() => new THREE.Vector3(0, -1.62, 0.14), []);

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

  const baseColor = node.colorHex || '#3b82f6';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

  return (
    <mesh
      ref={meshRef}
      scale={[0.13, 0.11, 0.12]}
      rotation={[Math.PI, 0, 0]}
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

function VasDeferensMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: ReproductiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0.22, -1.82, 0.22), // Epidídimo
      new THREE.Vector3(0.32, -1.45, 0.18), // Anel inguinal
      new THREE.Vector3(0.18, -1.48, -0.05), // Cruzamento pélvico
      new THREE.Vector3(0.06, -1.6, 0.08),  // Vesícula seminal e base prostática
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 24, 0.02, 10, false);
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

  const baseColor = node.colorHex || '#60a5fa';
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

function TestisMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: ReproductiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(0.12, -1.88, 0.22), []);

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

  const baseColor = node.colorHex || '#93c5fd';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

  return (
    <mesh
      ref={meshRef}
      scale={[0.07, 0.11, 0.07]}
      rotation={[0.2, 0.1, -0.1]}
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
        roughness={0.3}
        metalness={0.12}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function UterusMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: ReproductiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Situado no centro da pelve feminina
  const basePosition = useMemo(() => new THREE.Vector3(0, -1.44, 0.08), []);

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

  const baseColor = node.colorHex || '#ec4899';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

  return (
    <mesh
      ref={meshRef}
      scale={[0.13, 0.17, 0.11]}
      rotation={[-0.3, 0, 0]} // Anteversão e anteflexão uterina anatômica
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
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.35}
        metalness={0.1}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#be185d'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.15}
      />
    </mesh>
  );
}

function FallopianTubesMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: ReproductiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-0.35, -1.36, 0.04), // Fímbrias esquerdas
      new THREE.Vector3(-0.2, -1.38, 0.06),  // Ampola esquerda
      new THREE.Vector3(0, -1.4, 0.08),      // Fundo uterino
      new THREE.Vector3(0.2, -1.38, 0.06),   // Ampola direita
      new THREE.Vector3(0.35, -1.36, 0.04),  // Fímbrias direitas
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 28, 0.02, 10, false);
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

  const baseColor = node.colorHex || '#f472b6';
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
        metalness={0.12}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function OvaryMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: ReproductiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(0.38, -1.38, 0.02), []);

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

  const baseColor = node.colorHex || '#fb7185';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

  return (
    <mesh
      ref={meshRef}
      scale={[0.06, 0.09, 0.05]}
      rotation={[0.3, 0.2, 0.4]}
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
        roughness={0.3}
        metalness={0.12}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#e11d48'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.15}
      />
    </mesh>
  );
}

export function ReproductiveScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: ReproductiveSceneProps) {
  return (
    <group position={[0, -0.3, 0]}>
      {REPRODUCTIVE_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
        const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

        if (node.meshName === 'prostate_gland') {
          return (
            <ProstateMesh
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

        if (node.meshName === 'vas_deferens_seminal') {
          return (
            <VasDeferensMesh
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

        if (node.meshName === 'testis_gonad') {
          return (
            <TestisMesh
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

        if (node.meshName === 'uterus_organ') {
          return (
            <UterusMesh
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

        if (node.meshName === 'fallopian_tubes') {
          return (
            <FallopianTubesMesh
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

        if (node.meshName === 'ovary_gonad') {
          return (
            <OvaryMesh
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

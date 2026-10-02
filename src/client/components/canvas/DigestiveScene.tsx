import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { DIGESTIVE_NODES, DigestiveNode } from '../../../shared/constants/digestive.ts';

interface DigestiveSceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: DigestiveNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
}

interface DigestiveItemProps {
  node: DigestiveNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function OesophagusTubeMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: DigestiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Esôfago desce posteriormente à via aérea traqueal
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0.45, -0.15),
      new THREE.Vector3(0, 0.1, -0.18),
      new THREE.Vector3(-0.05, -0.3, -0.2),
      new THREE.Vector3(-0.15, -0.65, -0.15), // Junção esofagogástrica / Cárdia
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 24, 0.08, 14, false);
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

  const baseColor = node.colorHex || '#fb923c';
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

function StomachBodyMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: DigestiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(-0.35, -0.85, 0.05), []);

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

  const baseColor = node.colorHex || '#f97316';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.9;

  return (
    <mesh
      ref={meshRef}
      rotation={[0.2, 0.4, -0.3]}
      scale={[0.85, 1.25, 0.7]}
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
      <sphereGeometry args={[0.34, 24, 20]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.42}
        metalness={0.08}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function StomachPylorusMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: DigestiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(-0.12, -1.02, 0.15), []);

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

  const baseColor = node.colorHex || '#ea580c';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

  return (
    <mesh
      ref={meshRef}
      rotation={[0, 0, Math.PI / 3]}
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
      <cylinderGeometry args={[0.09, 0.14, 0.28, 16]} />
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

function LiverLobeMesh({
  node,
  isLeft,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: DigestiveItemProps & { isLeft?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(
    () => (isLeft ? new THREE.Vector3(0.12, -0.72, 0.22) : new THREE.Vector3(0.52, -0.78, 0.12)),
    [isLeft]
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

  const baseColor = node.colorHex || (isLeft ? '#d97706' : '#b45309');
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.92;

  return (
    <mesh
      ref={meshRef}
      rotation={isLeft ? [0.2, -0.3, 0.4] : [0.15, 0.25, -0.2]}
      scale={isLeft ? [0.75, 0.95, 0.65] : [1.35, 1.15, 0.95]}
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
      <sphereGeometry args={[0.36, 24, 20]} />
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#f43f5e' : baseColor}
        roughness={0.48}
        metalness={0.06}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function GallbladderMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: DigestiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo(() => new THREE.Vector3(0.35, -0.92, 0.32), []);

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

  const baseColor = node.colorHex || '#10b981';
  const opacity = isGhost ? 0.15 : isSelected ? 1.0 : 0.95;

  return (
    <mesh
      ref={meshRef}
      scale={[0.08, 0.16, 0.08]}
      rotation={[0.3, 0.1, -0.2]}
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
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

function BileDuctMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: DigestiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0.35, -0.88, 0.28), // Colo e ducto cístico
      new THREE.Vector3(0.24, -0.96, 0.22),
      new THREE.Vector3(0.12, -1.08, 0.18), // Ampola duodenal de Vater
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 18, 0.03, 10, false);
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

  const baseColor = node.colorHex || '#059669';
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

function DuodenumMesh({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: DigestiveItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Alça em forma de "C" do duodeno
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-0.02, -1.06, 0.16), // Bulbo
      new THREE.Vector3(0.18, -1.08, 0.18),  // Porção superior
      new THREE.Vector3(0.24, -1.22, 0.15),  // Porção descendente
      new THREE.Vector3(0.08, -1.32, 0.12),  // Porção horizontal
      new THREE.Vector3(-0.12, -1.26, 0.08), // Flexura duodenojejunal (Treitz)
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 28, 0.065, 12, false);
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

  const baseColor = node.colorHex || '#f59e0b';
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
        roughness={0.38}
        metalness={0.1}
        transparent={isGhost || opacity < 1.0}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.0}
      />
    </mesh>
  );
}

export function DigestiveScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: DigestiveSceneProps) {
  return (
    <group position={[0, -0.3, 0]}>
      {DIGESTIVE_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
        const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

        if (node.meshName === 'oesophagus_tube') {
          return (
            <OesophagusTubeMesh
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

        if (node.meshName === 'stomach_body') {
          return (
            <StomachBodyMesh
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

        if (node.meshName === 'stomach_pylorus') {
          return (
            <StomachPylorusMesh
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

        if (node.meshName === 'liver_lobe_right') {
          return (
            <LiverLobeMesh
              key={node.id}
              node={node}
              isLeft={false}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        if (node.meshName === 'liver_lobe_left') {
          return (
            <LiverLobeMesh
              key={node.id}
              node={node}
              isLeft={true}
              explosionProgress={explosionProgress}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        }

        if (node.meshName === 'gallbladder_sac') {
          return (
            <GallbladderMesh
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

        if (node.meshName === 'bile_duct_common') {
          return (
            <BileDuctMesh
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

        if (node.meshName === 'duodenum_loop') {
          return (
            <DuodenumMesh
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

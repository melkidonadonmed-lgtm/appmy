import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { NEUROLOGY_NODES, NeurologyNode } from '../../../shared/constants/neurology.ts';

interface NeurologySceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: NeurologyNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
}

interface BrainMeshItemProps {
  node: NeurologyNode;
  basePosition: THREE.Vector3;
  scaleVec: [number, number, number];
  rotation?: [number, number, number];
  geometryType: 'sphere' | 'box' | 'cylinder' | 'torus_arc';
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  onSelect: () => void;
}

function BrainMeshItem({
  node,
  basePosition,
  scaleVec,
  rotation = [0, 0, 0],
  geometryType,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  onSelect,
}: BrainMeshItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 1.05;
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

  const baseColor = node.colorHex || '#a855f7';
  const isCSF = !!node.isCSF;
  const opacity = isGhost ? 0.12 : isCSF ? 0.7 : 0.96;

  return (
    <mesh
      ref={meshRef}
      rotation={rotation}
      scale={scaleVec}
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
      {geometryType === 'sphere' && <sphereGeometry args={[0.38, 32, 24]} />}
      {geometryType === 'box' && <boxGeometry args={[0.5, 0.4, 0.5]} />}
      {geometryType === 'cylinder' && <cylinderGeometry args={[0.18, 0.22, 0.45, 24]} />}
      {geometryType === 'torus_arc' && <torusGeometry args={[0.32, 0.08, 16, 32, Math.PI * 1.2]} />}

      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : hovered ? '#ec4899' : baseColor}
        roughness={isCSF ? 0.08 : 0.48}
        metalness={isCSF ? 0.05 : 0.1}
        transparent={isGhost || isCSF}
        opacity={opacity}
        emissive={isSelected ? '#0284c7' : hovered ? '#db2777' : isCSF ? '#0369a1' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : isCSF ? 0.35 : 0.0}
      />
    </mesh>
  );
}

export function NeurologyScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: NeurologySceneProps) {
  return (
    <group name="neurology_system_group">
      {NEUROLOGY_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isIsolatedHidden = isolatedOnly && !isSelected;
        const isGhost = ghostMode && !isSelected;

        let basePos = new THREE.Vector3(0, 0.4, 0);
        let scale: [number, number, number] = [1, 1, 1];
        let geomType: 'sphere' | 'box' | 'cylinder' | 'torus_arc' = 'sphere';
        let rotation: [number, number, number] = [0, 0, 0];

        switch (node.meshName) {
          // Telencéfalo
          case 'lobe_frontal':
            basePos = new THREE.Vector3(0, 0.65, 0.42);
            scale = [1.2, 0.95, 1.05];
            geomType = 'sphere';
            break;
          case 'lobe_parietal':
            basePos = new THREE.Vector3(0, 0.8, -0.12);
            scale = [1.25, 0.9, 0.95];
            geomType = 'sphere';
            break;
          case 'lobe_temporal':
            basePos = new THREE.Vector3(0, 0.35, 0.12);
            scale = [1.4, 0.7, 0.9];
            geomType = 'sphere';
            break;
          case 'lobe_occipital':
            basePos = new THREE.Vector3(0, 0.5, -0.65);
            scale = [1.05, 0.85, 0.85];
            geomType = 'sphere';
            break;

          // Cerebelo
          case 'cerebellum':
            basePos = new THREE.Vector3(0, 0.05, -0.55);
            scale = [1.3, 0.75, 0.9];
            geomType = 'cylinder';
            rotation = [Math.PI / 4, 0, 0];
            break;

          // Tronco Encefálico
          case 'brainstem_midbrain':
            basePos = new THREE.Vector3(0, 0.25, -0.05);
            scale = [0.8, 0.6, 0.8];
            geomType = 'cylinder';
            break;
          case 'brainstem_pons':
            basePos = new THREE.Vector3(0, 0.02, 0.05);
            scale = [1.1, 0.7, 1.0];
            geomType = 'sphere';
            break;
          case 'brainstem_medulla':
            basePos = new THREE.Vector3(0, -0.28, -0.02);
            scale = [0.75, 1.0, 0.75];
            geomType = 'cylinder';
            break;

          // Sistema Ventricular
          case 'ventricles_lateral':
            basePos = new THREE.Vector3(0, 0.48, 0.05);
            scale = [1.1, 1.1, 1.1];
            geomType = 'torus_arc';
            rotation = [Math.PI / 2, 0, -Math.PI / 2];
            break;
          case 'ventricles_3rd_4th':
            basePos = new THREE.Vector3(0, 0.18, -0.08);
            scale = [0.45, 1.2, 0.5];
            geomType = 'cylinder';
            break;
        }

        return (
          <BrainMeshItem
            key={node.id}
            node={node}
            basePosition={basePos}
            scaleVec={scale}
            rotation={rotation}
            geometryType={geomType}
            explosionProgress={explosionProgress}
            isSelected={isSelected}
            isGhost={isGhost}
            isIsolatedHidden={isIsolatedHidden}
            onSelect={() => onSelectNode(isSelected ? null : node)}
          />
        );
      })}
    </group>
  );
}

import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { MuscleAnatomicalNode } from '../../../shared/constants/myology.ts';

interface MuscleMeshItemProps {
  node: MuscleAnatomicalNode;
  explosionProgress: number;
  layerPeelingLevel: number; // 0 = Esqueleto, 1 = Músculos Profundos, 2 = Músculos Superficiais, 3 = Pele
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  isXRay?: boolean;
  onSelect: () => void;
}

export function MuscleMeshItem({
  node,
  explosionProgress,
  layerPeelingLevel,
  isSelected,
  isGhost,
  isIsolatedHidden,
  isXRay,
  onSelect,
}: MuscleMeshItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Posição base do ventre muscular
  const basePosition = useMemo(() => {
    switch (node.meshName) {
      case 'masseter_r':
        return new THREE.Vector3(0.82, -0.4, 0.45);
      case 'masseter_l':
        return new THREE.Vector3(-0.82, -0.4, 0.45);
      case 'temporalis_r':
        return new THREE.Vector3(0.78, 0.45, -0.05);
      case 'temporalis_l':
        return new THREE.Vector3(-0.78, 0.45, -0.05);
      case 'pterygoideus_medialis':
        return new THREE.Vector3(0.4, -0.45, 0.15);
      case 'pterygoideus_lateralis':
        return new THREE.Vector3(0.45, -0.15, 0.28);
      case 'orbicularis_oculi':
        return new THREE.Vector3(0.38, 0.28, 0.95);
      case 'orbicularis_oris':
        return new THREE.Vector3(0, -0.5, 0.98);
      case 'buccinator':
        return new THREE.Vector3(0.58, -0.38, 0.58);
      default:
        return new THREE.Vector3(0, 0, 0);
    }
  }, [node.meshName]);

  // Rotação anatômica natural do músculo
  const baseRotation = useMemo(() => {
    switch (node.meshName) {
      case 'masseter_r':
        return new THREE.Euler(0.2, 0.1, -0.15);
      case 'masseter_l':
        return new THREE.Euler(0.2, -0.1, 0.15);
      case 'temporalis_r':
        return new THREE.Euler(0, 0.3, 0);
      case 'temporalis_l':
        return new THREE.Euler(0, -0.3, 0);
      default:
        return new THREE.Euler(0, 0, 0);
    }
  }, [node.meshName]);

  // Geometria proporcional do ventre muscular
  const geometry = useMemo(() => {
    switch (node.meshName) {
      case 'masseter_r':
      case 'masseter_l':
        return new THREE.BoxGeometry(0.25, 0.65, 0.18); // Ventre quadrangular espesso
      case 'temporalis_r':
      case 'temporalis_l':
        return new THREE.CylinderGeometry(0.48, 0.2, 0.7, 16, 1, false, 0, Math.PI); // Leque temporal
      case 'pterygoideus_medialis':
        return new THREE.BoxGeometry(0.2, 0.45, 0.18);
      case 'pterygoideus_lateralis':
        return new THREE.BoxGeometry(0.3, 0.2, 0.18);
      case 'orbicularis_oculi':
        return new THREE.TorusGeometry(0.32, 0.08, 12, 24); // Esfíncter orbital
      case 'orbicularis_oris':
        return new THREE.TorusGeometry(0.28, 0.09, 12, 24); // Esfíncter labial
      case 'buccinator':
        return new THREE.BoxGeometry(0.35, 0.3, 0.08); // Lâmina da bochecha
      default:
        return new THREE.BoxGeometry(0.2, 0.2, 0.2);
    }
  }, [node.meshName]);

  // Animação com Lerp
  useFrame(() => {
    if (!meshRef.current) return;

    const mult = node.explosionMagnitudeMultiplier || 1.0;
    const ev = node.explosionVector || { x: 0, y: 1, z: 0 };

    const targetX = basePosition.x + ev.x * explosionProgress * 1.8 * mult;
    const targetY = basePosition.y + ev.y * explosionProgress * 1.8 * mult;
    const targetZ = basePosition.z + ev.z * explosionProgress * 1.8 * mult;

    meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.16);

    if (hovered && !isSelected) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, baseRotation.y + 0.15, 0.1);
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, baseRotation.y, 0.1);
    }
  });

  // Layer Peeling: se a camada do músculo for mais superficial do que o nível de dissecação atual, oculta
  const isPeeledAway = (node.layerDepth || 2) > layerPeelingLevel;
  if (isPeeledAway || isIsolatedHidden) return null;

  // Material PBR de fibra muscular estriada
  const muscleRedColor = node.colorHex || '#dc2626';
  const color = isSelected ? '#38bdf8' : hovered ? '#f87171' : muscleRedColor;
  const opacity = isSelected ? 1.0 : isXRay ? 0.22 : isGhost ? 0.15 : hovered ? 0.95 : 0.88;

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={baseRotation}
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
          color={color}
          roughness={0.46}
          metalness={0.12}
          transparent={opacity < 1.0}
          opacity={opacity}
          wireframe={isGhost}
          emissive={isSelected ? '#0284c7' : hovered ? '#7f1d1d' : '#000000'}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.3 : 0}
        />

        {isSelected && (
          <Html position={[0, 0.35, 0]} center distanceFactor={7}>
            <div className="annotation-tag" style={{ backgroundColor: '#dc2626' }}>
              <span>{node.namePtBr}</span>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

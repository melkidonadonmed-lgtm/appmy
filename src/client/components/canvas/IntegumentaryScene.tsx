import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { INTEGUMENTARY_NODES, IntegumentaryNode } from '../../../shared/constants/integumentary.ts';

interface IntegumentarySceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: IntegumentaryNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  layerPeelingLevel: number;
  xrayMode?: boolean;
}

interface IntegumentaryItemProps {
  node: IntegumentaryNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  layerPeelingLevel: number;
  xrayMode?: boolean;
  onSelect: () => void;
}

function IntegumentaryItem({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  layerPeelingLevel,
  xrayMode,
  onSelect,
}: IntegumentaryItemProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Topografia tegumentar
  const basePosition = useMemo(() => {
    switch (node.meshName) {
      case 'facial_cranial_skin':
        return new THREE.Vector3(0, 0.45, 0.1);
      case 'galea_aponeurotica':
        return new THREE.Vector3(0, 0.88, -0.05);
      case 'periorbital_nasal_skin':
        return new THREE.Vector3(0, 0.1, 0.82);
      case 'subcutaneous_fascia':
        return new THREE.Vector3(0.55, -0.22, 0.6);
      default:
        return new THREE.Vector3(0, 0, 0);
    }
  }, [node.meshName]);

  // Geometria das camadas cutâneas e aponeuróticas
  const geometries = useMemo(() => {
    switch (node.meshName) {
      case 'facial_cranial_skin':
        // Cúpula esferoidal envolvente do crânio
        return {
          main: new THREE.SphereGeometry(1.08, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.7),
        };
      case 'galea_aponeurotica':
        // Calota aponeurótica densa do topo da cabeça
        return {
          main: new THREE.SphereGeometry(1.04, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2.8),
        };
      case 'periorbital_nasal_skin':
        // Pirâmide nasal e pálpebras
        return {
          nose: new THREE.ConeGeometry(0.18, 0.48, 4),
          eyelidR: new THREE.TorusGeometry(0.16, 0.025, 8, 16, Math.PI),
          eyelidL: new THREE.TorusGeometry(0.16, 0.025, 8, 16, Math.PI),
        };
      case 'subcutaneous_fascia':
        // Coxins adiposos malares e bucais de Bichat bilaterais
        return {
          cushionR: new THREE.CapsuleGeometry(0.14, 0.22, 8, 12),
          cushionL: new THREE.CapsuleGeometry(0.14, 0.22, 8, 12),
        };
      default:
        return {
          main: new THREE.BoxGeometry(0.2, 0.2, 0.2),
        };
    }
  }, [node.meshName]);

  // Translação vetorial de explosão
  useFrame(() => {
    if (!meshRef.current) return;
    const mult = node.explosionMagnitudeMultiplier || 1.0;
    const ev = node.explosionVector || { x: 0, y: 1, z: 0 };

    const targetX = basePosition.x + ev.x * explosionProgress * 1.6 * mult;
    const targetY = basePosition.y + ev.y * explosionProgress * 1.6 * mult;
    const targetZ = basePosition.z + ev.z * explosionProgress * 1.6 * mult;

    meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.16);
  });

  if (isIsolatedHidden) return null;

  // Se o layerPeelingLevel for menor que 3 e a peça não estiver selecionada, atenuamos
  const isPeelingHidden = layerPeelingLevel < 3 && !isSelected;
  if (isPeelingHidden) return null;

  const color = isSelected ? '#38bdf8' : hovered ? '#fed7aa' : node.colorHex || '#fdba74';
  const opacity = isSelected
    ? 0.95
    : xrayMode
    ? 0.12
    : isGhost
    ? 0.08
    : hovered
    ? 0.55
    : 0.32; // Transparência médica sofisticada para inspeção simultânea

  return (
    <group
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
    >
      {/* 1. Pele Craniofacial Global */}
      {node.meshName === 'facial_cranial_skin' && geometries.main && (
        <mesh geometry={geometries.main} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={color}
            roughness={0.5}
            metalness={0.02}
            transmission={0.4}
            thickness={0.1}
            transparent
            opacity={opacity}
            side={THREE.DoubleSide}
            wireframe={isGhost}
            emissive={isSelected ? '#0284c7' : hovered ? '#ea580c' : '#000000'}
            emissiveIntensity={isSelected ? 0.45 : hovered ? 0.2 : 0}
          />
        </mesh>
      )}

      {/* 2. Gálea Aponeurótica */}
      {node.meshName === 'galea_aponeurotica' && geometries.main && (
        <mesh geometry={geometries.main} castShadow>
          <meshStandardMaterial
            color={color}
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={opacity + 0.15}
            side={THREE.DoubleSide}
            wireframe={isGhost}
          />
        </mesh>
      )}

      {/* 3. Pele Nasal e Periorbital */}
      {node.meshName === 'periorbital_nasal_skin' && geometries.nose && geometries.eyelidR && (
        <group>
          {/* Pirâmide Nasal */}
          <mesh geometry={geometries.nose} position={[0, -0.05, 0.08]} rotation={[0.4, 0, 0]}>
            <meshStandardMaterial color={color} roughness={0.4} transparent opacity={opacity + 0.2} />
          </mesh>
          {/* Pálpebra D */}
          <mesh geometry={geometries.eyelidR} position={[0.35, 0.08, -0.08]} rotation={[0.2, 0, 0]}>
            <meshStandardMaterial color={color} roughness={0.4} transparent opacity={opacity + 0.2} />
          </mesh>
          {/* Pálpebra E */}
          <mesh geometry={geometries.eyelidL} position={[-0.35, 0.08, -0.08]} rotation={[0.2, 0, 0]}>
            <meshStandardMaterial color={color} roughness={0.4} transparent opacity={opacity + 0.2} />
          </mesh>
        </group>
      )}

      {/* 4. Coxins Adiposos de Bichat e SMAS */}
      {node.meshName === 'subcutaneous_fascia' && geometries.cushionR && geometries.cushionL && (
        <group>
          <mesh geometry={geometries.cushionR} position={[0, 0, 0]} rotation={[0.3, 0.2, -0.2]}>
            <meshStandardMaterial color={color} roughness={0.6} transparent opacity={opacity + 0.25} />
          </mesh>
          <mesh geometry={geometries.cushionL} position={[-1.1, 0, 0]} rotation={[0.3, -0.2, 0.2]}>
            <meshStandardMaterial color={color} roughness={0.6} transparent opacity={opacity + 0.25} />
          </mesh>
        </group>
      )}

      {isSelected && (
        <Html position={[0, 0.45, 0]} center distanceFactor={7}>
          <div className="annotation-tag" style={{ backgroundColor: '#ea580c' }}>
            <span>{node.namePtBr}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

export function IntegumentaryScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  layerPeelingLevel,
  xrayMode,
}: IntegumentarySceneProps) {
  return (
    <group position={[0, 0, 0]}>
      {INTEGUMENTARY_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
        const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

        return (
          <IntegumentaryItem
            key={node.id}
            node={node}
            explosionProgress={explosionProgress}
            isSelected={isSelected}
            isGhost={isGhost}
            isIsolatedHidden={isIsolatedHidden}
            layerPeelingLevel={layerPeelingLevel}
            xrayMode={xrayMode}
            onSelect={() => onSelectNode(isSelected ? null : node)}
          />
        );
      })}
    </group>
  );
}

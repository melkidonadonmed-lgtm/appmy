import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { SENSORY_NODES, SensoryNode } from '../../../shared/constants/sensory.ts';

interface SensorySceneProps {
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: SensoryNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  xrayMode?: boolean;
}

interface SensoryItemProps {
  node: SensoryNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  xrayMode?: boolean;
  onSelect: () => void;
}

function SensoryItem({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  xrayMode,
  onSelect,
}: SensoryItemProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Topografia anatômica craniana dos órgãos dos sentidos
  const basePosition = useMemo(() => {
    switch (node.meshName) {
      // Bulbos oculares nas órbitas cranianas
      case 'eyeball_r':
        return new THREE.Vector3(0.35, 0.15, 0.58);
      case 'eyeball_l':
        return new THREE.Vector3(-0.35, 0.15, 0.58);
      case 'cornea':
        return new THREE.Vector3(0, 0.15, 0.72);
      case 'lens':
        return new THREE.Vector3(0, 0.15, 0.62);
      case 'retina':
        return new THREE.Vector3(0, 0.15, 0.48);
      case 'optic_chiasm_tract':
        return new THREE.Vector3(0, 0.1, 0.22);
      case 'extraocular_muscles':
        return new THREE.Vector3(0, 0.18, 0.52);

      // Aparelho vestibulococlear no rochedo do osso temporal
      case 'middle_ear_ossicles':
        return new THREE.Vector3(0.75, 0.08, -0.15);
      case 'inner_ear_labyrinth':
        return new THREE.Vector3(0.68, 0.12, -0.22);
      case 'vestibulocochlear_nerve':
        return new THREE.Vector3(0.52, 0.06, -0.26);

      default:
        return new THREE.Vector3(0, 0, 0);
    }
  }, [node.meshName]);

  // Geometria anatômica dos órgãos da visão e audição
  const geometries = useMemo(() => {
    switch (node.meshName) {
      case 'eyeball_r':
      case 'eyeball_l':
        return {
          globe: new THREE.SphereGeometry(0.14, 24, 24),
          iris: new THREE.RingGeometry(0.02, 0.065, 16),
          pupil: new THREE.CircleGeometry(0.025, 16),
        };
      case 'cornea':
        return {
          main: new THREE.SphereGeometry(0.075, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.2),
        };
      case 'lens':
        return {
          main: new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16),
        };
      case 'retina':
        return {
          main: new THREE.SphereGeometry(0.135, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI),
        };
      case 'optic_chiasm_tract': {
        const curveR = new THREE.LineCurve3(
          new THREE.Vector3(0.35, 0.15, 0.46),
          new THREE.Vector3(0, 0.1, 0.22)
        );
        const curveL = new THREE.LineCurve3(
          new THREE.Vector3(-0.35, 0.15, 0.46),
          new THREE.Vector3(0, 0.1, 0.22)
        );
        return {
          nerveR: new THREE.TubeGeometry(curveR, 12, 0.022, 8, false),
          nerveL: new THREE.TubeGeometry(curveL, 12, 0.022, 8, false),
          chiasm: new THREE.BoxGeometry(0.12, 0.03, 0.06),
        };
      }
      case 'extraocular_muscles':
        return {
          rectusTop: new THREE.BoxGeometry(0.03, 0.02, 0.16),
          rectusBottom: new THREE.BoxGeometry(0.03, 0.02, 0.16),
          rectusLat: new THREE.BoxGeometry(0.02, 0.03, 0.16),
        };
      case 'middle_ear_ossicles':
        return {
          malleus: new THREE.CylinderGeometry(0.01, 0.015, 0.06, 8),
          incus: new THREE.BoxGeometry(0.03, 0.03, 0.02),
          stapes: new THREE.TorusGeometry(0.018, 0.006, 8, 12),
        };
      case 'inner_ear_labyrinth':
        return {
          cochlea: new THREE.TorusGeometry(0.045, 0.016, 12, 16, Math.PI * 2.5),
          canalAnt: new THREE.TorusGeometry(0.035, 0.008, 8, 16, Math.PI),
          canalPost: new THREE.TorusGeometry(0.032, 0.008, 8, 16, Math.PI),
          canalLat: new THREE.TorusGeometry(0.03, 0.008, 8, 16, Math.PI),
        };
      case 'vestibulocochlear_nerve': {
        const nerveCurve = new THREE.LineCurve3(
          new THREE.Vector3(0.68, 0.1, -0.22),
          new THREE.Vector3(0.38, 0.02, -0.28)
        );
        return {
          nerve: new THREE.TubeGeometry(nerveCurve, 10, 0.018, 8, false),
        };
      }
      default:
        return {
          main: new THREE.SphereGeometry(0.05, 12, 12),
        };
    }
  }, [node.meshName]);

  // Translação vetorial suave de explosão
  useFrame(() => {
    if (!meshRef.current) return;
    const mult = node.explosionMagnitudeMultiplier || 1.0;
    const ev = node.explosionVector || { x: 0, y: 1, z: 0 };

    const targetX = basePosition.x + ev.x * explosionProgress * 1.5 * mult;
    const targetY = basePosition.y + ev.y * explosionProgress * 1.5 * mult;
    const targetZ = basePosition.z + ev.z * explosionProgress * 1.5 * mult;

    meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.16);
  });

  if (isIsolatedHidden) return null;

  const color = isSelected ? '#38bdf8' : hovered ? '#7dd3fc' : node.colorHex || '#f8fafc';
  const opacity = isSelected ? 1.0 : xrayMode ? 0.28 : isGhost ? 0.14 : hovered ? 0.96 : 0.9;

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
      {/* 1. Bulbo Ocular Completo */}
      {(node.meshName === 'eyeball_r' || node.meshName === 'eyeball_l') && (
        <group>
          {/* Esclera */}
          <mesh geometry={geometries.globe} castShadow receiveShadow>
            <meshStandardMaterial
              color={color}
              roughness={0.2}
              metalness={0.05}
              transparent={opacity < 1.0}
              opacity={opacity}
              wireframe={isGhost}
              emissive={isSelected ? '#0284c7' : hovered ? '#0369a1' : '#000000'}
              emissiveIntensity={isSelected ? 0.5 : hovered ? 0.25 : 0}
            />
          </mesh>

          {/* Íris Castanha/Azul Médica */}
          <mesh geometry={geometries.iris} position={[0, 0, 0.138]}>
            <meshStandardMaterial color={isSelected ? '#38bdf8' : '#0284c7'} roughness={0.3} />
          </mesh>

          {/* Pupila Central Negra */}
          <mesh geometry={geometries.pupil} position={[0, 0, 0.139]}>
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      )}

      {/* 2. Córnea Translúcida */}
      {node.meshName === 'cornea' && geometries.main && (
        <group>
          <mesh geometry={geometries.main} position={[0.35, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshPhysicalMaterial
              color={color}
              roughness={0.05}
              transmission={0.9}
              thickness={0.05}
              transparent
              opacity={0.45}
            />
          </mesh>
          <mesh geometry={geometries.main} position={[-0.35, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshPhysicalMaterial
              color={color}
              roughness={0.05}
              transmission={0.9}
              thickness={0.05}
              transparent
              opacity={0.45}
            />
          </mesh>
        </group>
      )}

      {/* 3. Cristalino / Lente Biconvexa */}
      {node.meshName === 'lens' && geometries.main && (
        <group>
          <mesh geometry={geometries.main} position={[0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshPhysicalMaterial color={color} roughness={0.1} transmission={0.8} transparent opacity={0.65} />
          </mesh>
          <mesh geometry={geometries.main} position={[-0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshPhysicalMaterial color={color} roughness={0.1} transmission={0.8} transparent opacity={0.65} />
          </mesh>
        </group>
      )}

      {/* 4. Retina Posterior */}
      {node.meshName === 'retina' && geometries.main && (
        <group>
          <mesh geometry={geometries.main} position={[0.35, 0, 0]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color={color} roughness={0.5} transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
          <mesh geometry={geometries.main} position={[-0.35, 0, 0]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color={color} roughness={0.5} transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 5. Nervo Óptico e Quiasma */}
      {node.meshName === 'optic_chiasm_tract' && geometries.nerveR && geometries.nerveL && geometries.chiasm && (
        <group>
          <mesh geometry={geometries.nerveR}>
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
          <mesh geometry={geometries.nerveL}>
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
          <mesh geometry={geometries.chiasm} position={[0, 0.1, 0.22]}>
            <meshStandardMaterial color={color} roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* 6. Músculos Extraoculares */}
      {node.meshName === 'extraocular_muscles' && geometries.rectusTop && (
        <group>
          {/* Músculos olho D */}
          <group position={[0.35, 0, 0]}>
            <mesh geometry={geometries.rectusTop} position={[0, 0.12, -0.05]} />
            <mesh geometry={geometries.rectusBottom} position={[0, -0.12, -0.05]} />
            <mesh geometry={geometries.rectusLat} position={[0.13, 0, -0.05]} />
          </group>
          {/* Músculos olho E */}
          <group position={[-0.35, 0, 0]}>
            <mesh geometry={geometries.rectusTop} position={[0, 0.12, -0.05]} />
            <mesh geometry={geometries.rectusBottom} position={[0, -0.12, -0.05]} />
            <mesh geometry={geometries.rectusLat} position={[-0.13, 0, -0.05]} />
          </group>
        </group>
      )}

      {/* 7. Cadeia Ossicular da Orelha Média */}
      {node.meshName === 'middle_ear_ossicles' && geometries.malleus && (
        <group>
          <mesh geometry={geometries.malleus} position={[0, 0.02, 0]} />
          <mesh geometry={geometries.incus} position={[0.02, 0.01, 0]} />
          <mesh geometry={geometries.stapes} position={[0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        </group>
      )}

      {/* 8. Labirinto Ósseo (Cóclea e Canais Semicirculares) */}
      {node.meshName === 'inner_ear_labyrinth' && geometries.cochlea && (
        <group>
          {/* Cóclea espiralada */}
          <mesh geometry={geometries.cochlea} position={[-0.02, -0.01, 0.02]} rotation={[0.4, 0.2, 0]}>
            <meshStandardMaterial color={color} metalness={0.2} roughness={0.3} />
          </mesh>
          {/* Canais Semicirculares Ortogonais */}
          <mesh geometry={geometries.canalAnt} position={[0.02, 0.03, 0]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#38bdf8" roughness={0.3} />
          </mesh>
          <mesh geometry={geometries.canalPost} position={[0.02, 0.01, -0.02]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial color="#818cf8" roughness={0.3} />
          </mesh>
          <mesh geometry={geometries.canalLat} position={[0.03, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#10b981" roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* 9. Nervo Vestibulococlear (NC VIII) */}
      {node.meshName === 'vestibulocochlear_nerve' && geometries.nerve && (
        <mesh geometry={geometries.nerve}>
          <meshStandardMaterial color={color} roughness={0.35} />
        </mesh>
      )}

      {isSelected && (
        <Html position={[0, 0.25, 0]} center distanceFactor={7}>
          <div className="annotation-tag" style={{ backgroundColor: '#0284c7' }}>
            <span>{node.namePtBr}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

export function SensoryScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  xrayMode,
}: SensorySceneProps) {
  return (
    <group position={[0, 0, 0]}>
      {SENSORY_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
        const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

        return (
          <SensoryItem
            key={node.id}
            node={node}
            explosionProgress={explosionProgress}
            isSelected={isSelected}
            isGhost={isGhost}
            isIsolatedHidden={isIsolatedHidden}
            xrayMode={xrayMode}
            onSelect={() => onSelectNode(isSelected ? null : node)}
          />
        );
      })}
    </group>
  );
}

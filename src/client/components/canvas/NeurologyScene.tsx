import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { computeFrameIndependentLerpAlpha } from '../../../core/explodedEngine.ts';
import { ALL_NEUROLOGY_NODES, NeurologyNode } from '../../../shared/constants/neurology.ts';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import { resolveNeuroClinicalTargetAliases } from '../../../shared/utils/neuroTargetMapper.ts';
import { AnatomicalCallout3D } from './AnatomicalCallout3D.tsx';

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
  isHidden: boolean;
  peelOnClickMode: boolean;
  onSelect: () => void;
  onPeel: () => void;
  onOpenDetails: () => void;
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
  isHidden,
  peelOnClickMode,
  onSelect,
  onPeel,
  onOpenDetails,
}: BrainMeshItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const explosionOffset = useMemo(() => {
    const vec = node.explosionVector || { x: 0, y: 0, z: 0 };
    const mult = (node.explosionMagnitudeMultiplier || 1.0) * 1.05;
    return new THREE.Vector3(vec.x * mult, vec.y * mult, vec.z * mult);
  }, [node]);

  const targetPosRef = useRef(new THREE.Vector3());
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.position.lerp(
      targetPosRef.current.set(
        basePosition.x + explosionOffset.x * explosionProgress,
        basePosition.y + explosionOffset.y * explosionProgress,
        basePosition.z + explosionOffset.z * explosionProgress
      ), computeFrameIndependentLerpAlpha(delta));
  });

  if (isHidden) return null;

  const baseColor = node.colorHex || '#a855f7';
  const isCSF = !!node.isCSF;
  const isMeninges = node.meshName === 'cranial_meninges';
  const opacity = isGhost ? 0.12 : isMeninges ? 0.28 : isCSF ? 0.7 : 0.96;

  const calloutWorldPos: [number, number, number] = [
    basePosition.x + explosionOffset.x * explosionProgress,
    basePosition.y + explosionOffset.y * explosionProgress,
    basePosition.z + explosionOffset.z * explosionProgress,
  ];

  return (
    <group>
      <mesh
        ref={meshRef}
        rotation={rotation}
        scale={scaleVec}
        onClick={(e) => {
          e.stopPropagation();
          if (peelOnClickMode || e.nativeEvent?.altKey) {
            onPeel();
            return;
          }
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
          transparent={isGhost || isCSF || isMeninges}
          opacity={opacity}
          emissive={isSelected ? '#0284c7' : hovered ? '#db2777' : isCSF ? '#0369a1' : '#000000'}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : isCSF ? 0.35 : 0.0}
        />
      </mesh>
      {isSelected && (
        <AnatomicalCallout3D
          node={node}
          position={calloutWorldPos}
          worldPosition={calloutWorldPos}
          onClose={onSelect}
          onOpenDetailsTab={onOpenDetails}
        />
      )}
    </group>
  );
}

export function NeurologyScene({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
}: NeurologySceneProps) {
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const peelOnClickMode = useAnatomyStore((s) => s.peelOnClickMode);
  const peelNodeOnClick = useAnatomyStore((s) => s.peelNodeOnClick);
  const setSidebarTab = useAnatomyStore((s) => s.setSidebarTab);

  return (
    <group name="neurology_system_group">
      {ALL_NEUROLOGY_NODES.map((node) => {
        const mappedAliases = resolveNeuroClinicalTargetAliases(node.id);
        const mappedZIds = mappedAliases.filter((id) => id.startsWith('za:'));
        const isSelected =
          selectedNodeId === node.id ||
          (selectedNodeId !== null && mappedAliases.includes(selectedNodeId));
        const isExplicitlyHidden =
          hiddenNodeIds.has(node.id) ||
          (Boolean(node.meshName) && hiddenNodeIds.has(node.meshName!)) ||
          (mappedZIds.length > 0 && mappedZIds.every((id) => hiddenNodeIds.has(id)));
        const isHidden = isExplicitlyHidden || (isolatedOnly && !isSelected);
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
          case 'lobe_insula':
            basePos = new THREE.Vector3(0.28, 0.42, 0.14);
            scale = [0.52, 0.48, 0.62];
            geomType = 'sphere';
            break;

          // Estruturas Comissurais, Projeção e Subcorticais
          case 'corpus_callosum':
            basePos = new THREE.Vector3(0, 0.56, 0.04);
            scale = [0.65, 0.85, 1.15];
            geomType = 'torus_arc';
            rotation = [0, Math.PI / 2, 0];
            break;
          case 'fornix_septum':
            basePos = new THREE.Vector3(0, 0.46, 0.06);
            scale = [0.45, 0.62, 0.75];
            geomType = 'torus_arc';
            rotation = [0, Math.PI / 2, 0];
            break;
          case 'internal_capsule':
            basePos = new THREE.Vector3(0.2, 0.44, 0.05);
            scale = [0.35, 0.75, 0.65];
            geomType = 'box';
            rotation = [0, 0, -0.22];
            break;
          case 'basal_ganglia':
            basePos = new THREE.Vector3(0.24, 0.4, 0.08);
            scale = [0.48, 0.45, 0.58];
            geomType = 'sphere';
            break;
          case 'diencephalon_thalamus':
            basePos = new THREE.Vector3(0.12, 0.38, -0.02);
            scale = [0.46, 0.38, 0.52];
            geomType = 'sphere';
            break;
          case 'diencephalon_hypothalamus':
            basePos = new THREE.Vector3(0, 0.28, 0.12);
            scale = [0.28, 0.26, 0.28];
            geomType = 'sphere';
            break;
          case 'epithalamus_pineal':
            basePos = new THREE.Vector3(0, 0.36, -0.18);
            scale = [0.16, 0.16, 0.18];
            geomType = 'sphere';
            break;
          case 'limbic_hippocampus_amygdala':
            basePos = new THREE.Vector3(0.26, 0.26, 0.08);
            scale = [0.45, 0.35, 0.65];
            geomType = 'torus_arc';
            rotation = [Math.PI / 3, 0, 0];
            break;
          case 'cranial_meninges':
            basePos = new THREE.Vector3(0, 0.58, -0.05);
            scale = [1.55, 1.35, 1.65];
            geomType = 'sphere';
            break;
          case 'circle_of_willis':
            basePos = new THREE.Vector3(0, 0.16, 0.12);
            scale = [0.58, 0.22, 0.58];
            geomType = 'torus_arc';
            rotation = [Math.PI / 2, 0, 0];
            break;
          case 'cranial_nerves_root':
            basePos = new THREE.Vector3(0, 0.04, 0.18);
            scale = [0.65, 0.32, 0.55];
            geomType = 'cylinder';
            rotation = [Math.PI / 3, 0, 0];
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
            isHidden={isHidden}
            peelOnClickMode={peelOnClickMode}
            onSelect={() => onSelectNode(isSelected ? null : node)}
            onPeel={() =>
              peelNodeOnClick(
                mappedAliases,
                node.namePtBr,
                node.meshName ? [node.meshName] : undefined
              )
            }
            onOpenDetails={() => setSidebarTab('details')}
          />
        );
      })}
    </group>
  );
}


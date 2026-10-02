import { useRef, useState, useMemo, useEffect, lazy, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { CRANIUM_22_NODES, SkullAnatomicalNode, SkullDivision } from '../../../shared/constants/cranium.ts';
import { CRANIOFACIAL_MUSCLES, MuscleAnatomicalNode } from '../../../shared/constants/myology.ts';
import { CardiovascularNode } from '../../../shared/constants/cardiovascular.ts';
import { NeurologyNode } from '../../../shared/constants/neurology.ts';
import { RespiratoryNode } from '../../../shared/constants/respiratory.ts';
import { DigestiveNode } from '../../../shared/constants/digestive.ts';
import { LymphaticNode } from '../../../shared/constants/lymphatic.ts';
import { UrinaryNode } from '../../../shared/constants/urinary.ts';
import { EndocrineNode } from '../../../shared/constants/endocrine.ts';
import { ReproductiveNode } from '../../../shared/constants/reproductive.ts';
import { SensoryNode } from '../../../shared/constants/sensory.ts';
import { IntegumentaryNode } from '../../../shared/constants/integumentary.ts';
import { ActiveAnatomicalSystem, AnatomicalNode } from '../../../shared/types/anatomy.ts';
import { DissectionVisualMode } from '../../../shared/types/dissection.ts';
import { MuscleMeshItem } from './MuscleMeshItem.tsx';
import { RealBodyAtlas } from './RealBodyAtlas.tsx';
import { disposeHierarchy, logWebGLGarbageCollection } from '../../lib/webgl-gc.ts';

// Code Splitting & Dynamic Lazy Loading dos Módulos Regionais e Viscerais do Corpo Humano
const CardiovascularScene = lazy(() => import('./CardiovascularScene.tsx').then((m) => ({ default: m.CardiovascularScene })));
const NeurologyScene = lazy(() => import('./NeurologyScene.tsx').then((m) => ({ default: m.NeurologyScene })));
const RespiratoryScene = lazy(() => import('./RespiratoryScene.tsx').then((m) => ({ default: m.RespiratoryScene })));
const DigestiveScene = lazy(() => import('./DigestiveScene.tsx').then((m) => ({ default: m.DigestiveScene })));
const LymphaticScene = lazy(() => import('./LymphaticScene.tsx').then((m) => ({ default: m.LymphaticScene })));
const UrinaryScene = lazy(() => import('./UrinaryScene.tsx').then((m) => ({ default: m.UrinaryScene })));
const EndocrineScene = lazy(() => import('./EndocrineScene.tsx').then((m) => ({ default: m.EndocrineScene })));
const ReproductiveScene = lazy(() => import('./ReproductiveScene.tsx').then((m) => ({ default: m.ReproductiveScene })));
const SensoryScene = lazy(() => import('./SensoryScene.tsx').then((m) => ({ default: m.SensoryScene })));
const IntegumentaryScene = lazy(() => import('./IntegumentaryScene.tsx').then((m) => ({ default: m.IntegumentaryScene })));

export type { ActiveAnatomicalSystem };

export interface GeneralAnatomicalNode extends AnatomicalNode {
  division?: string;
  paired?: boolean;
}

export type AnyAnatomicalNode =
  | SkullAnatomicalNode
  | MuscleAnatomicalNode
  | CardiovascularNode
  | NeurologyNode
  | RespiratoryNode
  | DigestiveNode
  | LymphaticNode
  | UrinaryNode
  | EndocrineNode
  | ReproductiveNode
  | SensoryNode
  | IntegumentaryNode
  | GeneralAnatomicalNode;

export type AnatomicalRegion =
  | 'all'
  | 'cranium'
  | 'spine'
  | 'thorax'
  | 'upper_limb'
  | 'pelvis'
  | 'lower_limb';

export interface AnatomicalAtlasSceneProps {
  viewType?: 'exploded' | 'realistic';
  realSkullOpacity?: number;
  explosionProgress: number; // 0.0 a 1.0
  selectedNodeId: string | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  activeDivision: SkullDivision | 'all';
  activeSystem: ActiveAnatomicalSystem;
  activeRegion?: AnatomicalRegion;
  layerPeelingLevel: number; // 0 = Esqueleto, 1 = Profundo, 2 = Superficial, 3 = Pele
  visualMode?: DissectionVisualMode;
}

interface BoneMeshItemProps {
  node: SkullAnatomicalNode;
  explosionProgress: number;
  isSelected: boolean;
  isGhost: boolean;
  isIsolatedHidden: boolean;
  isVisibleInDivision: boolean;
  isXRay?: boolean;
  onSelect: () => void;
}

function BoneMeshItem({
  node,
  explosionProgress,
  isSelected,
  isGhost,
  isIsolatedHidden,
  isVisibleInDivision,
  isXRay,
  onSelect,
}: BoneMeshItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Posição base anatômica relativa ao centro do crânio
  const basePosition = useMemo(() => {
    switch (node.meshName) {
      // Neurocrânio
      case 'frontal_bone':
        return new THREE.Vector3(0, 0.6, 0.65);
      case 'parietal_bone_r':
        return new THREE.Vector3(0.68, 0.78, -0.1);
      case 'parietal_bone_l':
        return new THREE.Vector3(-0.68, 0.78, -0.1);
      case 'occipital_bone':
        return new THREE.Vector3(0, 0.35, -0.85);
      case 'temporal_bone_r':
        return new THREE.Vector3(0.8, 0.1, -0.2);
      case 'temporal_bone_l':
        return new THREE.Vector3(-0.8, 0.1, -0.2);
      case 'sphenoid_bone':
        return new THREE.Vector3(0, 0.12, 0.15);
      case 'ethmoid_bone':
        return new THREE.Vector3(0, 0.32, 0.45);

      // Viscerocrânio
      case 'maxilla_r':
        return new THREE.Vector3(0.3, -0.25, 0.68);
      case 'maxilla_l':
        return new THREE.Vector3(-0.3, -0.25, 0.68);
      case 'zygomatic_bone_r':
        return new THREE.Vector3(0.72, -0.15, 0.52);
      case 'zygomatic_bone_l':
        return new THREE.Vector3(-0.72, -0.15, 0.52);
      case 'nasal_bone_r':
        return new THREE.Vector3(0.12, 0.18, 0.88);
      case 'nasal_bone_l':
        return new THREE.Vector3(-0.12, 0.18, 0.88);
      case 'lacrimal_bone_r':
        return new THREE.Vector3(0.24, 0.14, 0.62);
      case 'lacrimal_bone_l':
        return new THREE.Vector3(-0.24, 0.14, 0.62);
      case 'palatine_bone_r':
        return new THREE.Vector3(0.2, -0.32, 0.15);
      case 'palatine_bone_l':
        return new THREE.Vector3(-0.2, -0.32, 0.15);
      case 'inferior_nasal_concha_r':
        return new THREE.Vector3(0.22, -0.12, 0.48);
      case 'inferior_nasal_concha_l':
        return new THREE.Vector3(-0.22, -0.12, 0.48);
      case 'vomer':
        return new THREE.Vector3(0, -0.15, 0.3);
      case 'mandible':
        return new THREE.Vector3(0, -0.9, 0.38);

      default:
        return new THREE.Vector3(0, 0, 0);
    }
  }, [node.meshName]);

  // Geometria procedural anatômica para cada osso
  const geometry = useMemo(() => {
    switch (node.meshName) {
      case 'frontal_bone':
        return new THREE.SphereGeometry(0.7, 24, 20, 0, Math.PI, 0, Math.PI * 0.48);
      case 'parietal_bone_r':
      case 'parietal_bone_l':
        return new THREE.SphereGeometry(0.65, 20, 18, 0, Math.PI * 0.68, 0, Math.PI * 0.58);
      case 'occipital_bone':
        return new THREE.TorusGeometry(0.55, 0.22, 16, 24, Math.PI * 1.5);
      case 'temporal_bone_r':
      case 'temporal_bone_l':
        return new THREE.CylinderGeometry(0.35, 0.42, 0.4, 16);
      case 'sphenoid_bone':
        return new THREE.BoxGeometry(0.85, 0.3, 0.4); // Asa de borboleta
      case 'ethmoid_bone':
        return new THREE.BoxGeometry(0.35, 0.28, 0.32);
      case 'maxilla_r':
      case 'maxilla_l':
        return new THREE.BoxGeometry(0.42, 0.38, 0.45);
      case 'zygomatic_bone_r':
      case 'zygomatic_bone_l':
        return new THREE.TorusGeometry(0.28, 0.08, 12, 16, Math.PI * 1.2);
      case 'nasal_bone_r':
      case 'nasal_bone_l':
        return new THREE.BoxGeometry(0.12, 0.32, 0.1);
      case 'lacrimal_bone_r':
      case 'lacrimal_bone_l':
        return new THREE.PlaneGeometry(0.14, 0.2);
      case 'palatine_bone_r':
      case 'palatine_bone_l':
        return new THREE.BoxGeometry(0.22, 0.12, 0.28);
      case 'inferior_nasal_concha_r':
      case 'inferior_nasal_concha_l':
        return new THREE.CapsuleGeometry(0.08, 0.25, 4, 8);
      case 'vomer':
        return new THREE.PlaneGeometry(0.15, 0.45);
      case 'mandible':
        return new THREE.TorusGeometry(0.68, 0.18, 16, 24, Math.PI);
      default:
        return new THREE.BoxGeometry(0.3, 0.3, 0.3);
    }
  }, [node.meshName]);

  // Animação e translação vetorial suave via Lerp
  useFrame(() => {
    if (!meshRef.current) return;

    const mult = node.explosionMagnitudeMultiplier || 1.0;
    const ev = node.explosionVector || { x: 0, y: 1, z: 0 };

    const targetX = basePosition.x + ev.x * explosionProgress * 1.7 * mult;
    const targetY = basePosition.y + ev.y * explosionProgress * 1.7 * mult;
    const targetZ = basePosition.z + ev.z * explosionProgress * 1.7 * mult;

    meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.16);

    // Efeito sutil de rotação no hover
    if (hovered && !isSelected) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0.12, 0.1);
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
    }
  });

  if (!isVisibleInDivision || isIsolatedHidden) return null;

  // Material PBR de Osso Realista (Marfim/Cálcio) com destaque clínico
  const isBoneColorDefault = true;
  const boneIvoryColor = '#f3ede2';
  const color = isSelected
    ? '#38bdf8'
    : hovered
    ? '#bae6fd'
    : isBoneColorDefault
    ? boneIvoryColor
    : node.colorHex || '#f1eae0';

  const opacity = isSelected ? 1.0 : isXRay ? 0.22 : isGhost ? 0.14 : hovered ? 0.96 : 0.92;

  return (
    <group>
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
          color={color}
          roughness={0.68}
          metalness={0.06}
          transparent={opacity < 1.0}
          opacity={opacity}
          wireframe={isGhost}
          emissive={isSelected ? '#0284c7' : hovered ? '#0369a1' : '#000000'}
          emissiveIntensity={isSelected ? 0.55 : hovered ? 0.25 : 0}
        />

        {isSelected && (
          <Html position={[0, 0.35, 0]} center distanceFactor={7}>
            <div className="annotation-tag">
              <span>{node.namePtBr}</span>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

export function AnatomicalAtlasScene({
  viewType = 'exploded',
  realSkullOpacity = 1.0,
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  activeDivision,
  activeSystem,
  activeRegion = 'all',
  layerPeelingLevel,
  visualMode = 'solid',
}: AnatomicalAtlasSceneProps) {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const isXRay = visualMode === 'xray';

  const isRealistic = viewType === 'realistic';

  // No modo Modelo Real (.GLB), NENHUMA cena procedural sintética é renderizada!
  // O RealBodyAtlas gerencia com exclusividade os modelos médicos autênticos do Z-Anatomy.
  const showProcedural = !isRealistic;

  const showSkeletal = showProcedural && (activeSystem === 'skeletal' || activeSystem === 'all');
  const showMuscular = showProcedural && (activeSystem === 'muscular' || activeSystem === 'all') && layerPeelingLevel > 0;
  const showCardiovascular = showProcedural && (activeSystem === 'cardiovascular' || activeSystem === 'all');
  const showNervous = showProcedural && (activeSystem === 'nervous' || activeSystem === 'all');
  const showRespiratory = showProcedural && (activeSystem === 'respiratory' || activeSystem === 'all');
  const showDigestive = showProcedural && (activeSystem === 'digestive' || activeSystem === 'all');
  const showLymphatic = showProcedural && (activeSystem === 'lymphatic' || activeSystem === 'all');
  const showUrinary = showProcedural && (activeSystem === 'urinary' || activeSystem === 'all');
  const showEndocrine = showProcedural && (activeSystem === 'endocrine' || activeSystem === 'all');
  const showReproductive = showProcedural && (activeSystem === 'reproductive' || activeSystem === 'all');
  const showSensory = showProcedural && (activeSystem === 'sensory' || activeSystem === 'all');
  const showIntegumentary =
    showProcedural &&
    (activeSystem === 'integumentary' || activeSystem === 'all') &&
    (layerPeelingLevel >= 3 || activeSystem === 'integumentary');

  // Coleta de Lixo WebGL Determinística ao desmontar a cena
  useEffect(() => {
    return () => {
      if (sceneGroupRef.current) {
        const report = disposeHierarchy(sceneGroupRef.current);
        logWebGLGarbageCollection('AnatomicalAtlasScene', report);
      }
    };
  }, []);

  return (
    <group ref={sceneGroupRef} position={[0, 0, 0]}>
      {/* 1. Arcabouço Ósseo e Visceral Real Z-Anatomy (.GLB) ou Peças Didáticas */}
      {viewType === 'realistic' ? (
        <RealBodyAtlas
          explosionProgress={explosionProgress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeSystem={activeSystem}
          activeRegion={activeRegion}
          layerPeelingLevel={layerPeelingLevel}
          realSkullOpacity={realSkullOpacity}
          visualMode={visualMode}
        />
      ) : (
        showSkeletal && (
          CRANIUM_22_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
            const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);
            const isVisibleInDivision = activeDivision === 'all' || node.division === activeDivision;

            return (
              <BoneMeshItem
                key={node.id}
                node={node}
                explosionProgress={explosionProgress}
                isSelected={isSelected}
                isGhost={isGhost}
                isIsolatedHidden={isIsolatedHidden}
                isVisibleInDivision={isVisibleInDivision}
                isXRay={isXRay}
                onSelect={() => onSelectNode(isSelected ? null : node)}
              />
            );
          })
        )
      )}

      {/* 2. Músculos Mastigatórios e Mímica Facial (Miologia - Cap. 3) */}
      {showMuscular &&
        CRANIOFACIAL_MUSCLES.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isGhost = Boolean(selectedNodeId && !isSelected && ghostMode);
          const isIsolatedHidden = Boolean(selectedNodeId && !isSelected && isolatedOnly);

          return (
            <MuscleMeshItem
              key={node.id}
              node={node}
              explosionProgress={explosionProgress}
              layerPeelingLevel={layerPeelingLevel}
              isSelected={isSelected}
              isGhost={isGhost}
              isIsolatedHidden={isIsolatedHidden}
              isXRay={isXRay}
              onSelect={() => onSelectNode(isSelected ? null : node)}
            />
          );
        })}

      {/* Módulos Viscerais e Sistêmicos do Corpo Humano com Carregamento Dinâmico */}
      <Suspense fallback={null}>
        {/* 3. Sistema Cardiovascular: Câmaras Cardíacas e Grandes Vasos (Cap. 5) */}
        {showCardiovascular && (
          <CardiovascularScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
          />
        )}

        {/* 4. Sistema Nervoso Central: Encéfalo, Tronco e Ventrículos LCR (Cap. 4) */}
        {showNervous && (
          <NeurologyScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
          />
        )}

        {/* 5. Sistema Respiratório: Laringe, Traqueia, Árvore Brônquica e Pulmões (Cap. 7) */}
        {showRespiratory && (
          <RespiratoryScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
          />
        )}

        {/* 6. Sistema Digestório: Esôfago, Estômago, Fígado e Vias Biliares (Cap. 8) */}
        {showDigestive && (
          <DigestiveScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
          />
        )}

        {/* 7. Sistema Linfático: Grandes Ductos, Cisterna do Quilo e Linfonodos (Cap. 6) */}
        {showLymphatic && (
          <LymphaticScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
          />
        )}

        {/* 8. Sistema Urinário: Rins Bilaterais, Ureteres e Bexiga Urinária (Cap. 9) */}
        {showUrinary && (
          <UrinaryScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
          />
        )}

        {/* 9. Sistema Endócrino: Hipófise, Tireoide, Paratireoides e Adrenais (Cap. 11) */}
        {showEndocrine && (
          <EndocrineScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
          />
        )}

        {/* 10. Sistema Reprodutor: Próstata, Vias Seminais, Útero e Ovários (Cap. 10) */}
        {showReproductive && (
          <ReproductiveScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
          />
        )}

        {/* 11. Órgãos dos Sentidos: Aparelho Visual e Vestibulococlear (Cap. 13) */}
        {showSensory && (
          <SensoryScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
            xrayMode={isXRay}
          />
        )}

        {/* 12. Sistema Tegumentar: Pele, Fáscias e Gálea Aponeurótica (Cap. 14) */}
        {showIntegumentary && (
          <IntegumentaryScene
            explosionProgress={explosionProgress}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            ghostMode={Boolean(selectedNodeId && ghostMode)}
            isolatedOnly={Boolean(selectedNodeId && isolatedOnly)}
            layerPeelingLevel={layerPeelingLevel}
            xrayMode={isXRay}
          />
        )}
      </Suspense>
    </group>
  );
}

// Alias de retrocompatibilidade para garantir que nenhum import legado quebre
export const ExplodedCraniumScene = AnatomicalAtlasScene;

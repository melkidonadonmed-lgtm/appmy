import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import {
  Z_ANATOMY_BY_NODE,
  ZAnatomyItem,
} from '../../../shared/constants/zAnatomyCatalog.ts';
import { AnyAnatomicalNode, GeneralAnatomicalNode, AnatomicalRegion } from './AnatomicalAtlasScene.tsx';
import { DissectionVisualMode } from '../../../shared/types/dissection.ts';
import { disposeHierarchy, logWebGLGarbageCollection } from '../../lib/webgl-gc.ts';

// Configuração do decodificador Draco local offline em public/draco/gltf/
const DRACO_DECODER_PATH = '/draco/gltf/';

export interface RealBodyAtlasProps {
  explosionProgress: number; // 0.0 a 1.0
  selectedNodeId: string | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  activeSystem: string;
  activeRegion?: AnatomicalRegion;
  realSkullOpacity?: number;
  visualMode?: DissectionVisualMode;
}

interface MeshAnimData {
  mesh: THREE.Mesh;
  originalPos: THREE.Vector3;
  explosionVec: THREE.Vector3;
  item: ZAnatomyItem | null;
  baseMaterial: THREE.MeshStandardMaterial;
}

/**
 * Filtra se um nó pertence à região anatômica selecionada pelo usuário
 */
function isNodeInRegion(item: ZAnatomyItem | null, meshName: string, region: AnatomicalRegion): boolean {
  if (region === 'all' || !region) return true;
  
  const pathStr = (item?.path || []).join(' ').toLowerCase();
  const nameLower = (item?.nameEn || meshName).toLowerCase();

  switch (region) {
    case 'cranium':
      return (
        pathStr.includes('cranium') ||
        pathStr.includes('head') ||
        pathStr.includes('mandible') ||
        [
          'frontal', 'parietal', 'occipital', 'temporal', 'sphenoid', 'ethmoid',
          'maxilla', 'mandible', 'zygomatic', 'nasal', 'lacrimal', 'vomer',
          'palatine', 'concha', 'tooth', 'incisor', 'canine', 'molar', 'premolar', 'hyoid'
        ].some((k) => nameLower.includes(k))
      );

    case 'spine':
      return (
        pathStr.includes('vertebral') ||
        pathStr.includes('vertebra') ||
        [
          'atlas', 'axis', 'cervical', 'thoracic vertebra', 'lumbar', 'sacrum', 'coccyx'
        ].some((k) => nameLower.includes(k))
      );

    case 'thorax':
      return (
        pathStr.includes('thorax') ||
        pathStr.includes('rib') ||
        pathStr.includes('sternum') ||
        ['rib', 'sternum', 'xiphoid', 'costal cartilage', 'cartilage of'].some((k) => nameLower.includes(k))
      );

    case 'upper_limb':
      return (
        pathStr.includes('upper limb') ||
        pathStr.includes('pectoral') ||
        [
          'clavicle', 'scapula', 'humerus', 'radius', 'ulna',
          'carpal', 'metacarpal', 'phalanx', 'scaphoid', 'lunate',
          'triquetrum', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate'
        ].some((k) => nameLower.includes(k))
      );

    case 'pelvis':
      return (
        pathStr.includes('pelvi') ||
        ['hip bone', 'ilium', 'ischium', 'pubis', 'sacrum'].some((k) => nameLower.includes(k))
      );

    case 'lower_limb':
      return (
        pathStr.includes('lower limb') ||
        [
          'femur', 'patella', 'tibia', 'fibula', 'calcaneus', 'talus',
          'navicular', 'cuneiform', 'cuboid', 'metatarsal', 'sesamoid'
        ].some((k) => nameLower.includes(k))
      );

    default:
      return true;
  }
}

/**
 * Converte um item do catálogo Z-Anatomy para a interface canônica AnyAnatomicalNode
 */
function toAnatomicalNode(item: ZAnatomyItem): AnyAnatomicalNode {
  return {
    id: item.id,
    fmaId: item.fmaId,
    namePtBr: item.namePtBr,
    nameLatin: item.nameLatin,
    chapter: item.chapter as 2 | 4 | 5 | 7 | 8 | 9,
    systemName: item.system === 'skeletal' ? 'Sistema Esquelético (Osteologia)' : item.system,
    meshName: item.node,
    parentId: item.path.length > 0 ? item.path[item.path.length - 1] : undefined,
    colorHex: item.system === 'skeletal' ? '#f4ede2' : '#38bdf8',
    explosionVector: item.explosionVector,
    clinicalData: {
      origin: item.path.join(' > '),
      insertion: `Estrutura integrante do ${item.system}`,
      clinicalSignificance: `Peça anatômica real escaneada do catálogo médico Z-Anatomy / BodyParts3D (Terminologia Anatomica TA2: ${item.nameLatin}).`,
    },
  } as AnyAnatomicalNode;
}

/**
 * Subcomponente de Sistema Anatômico Real que carrega o modelo GLB,
 * vincula os materiais e computa a animação de explosão
 */
function RealSystemModel({
  glbPath,
  systemName,
  defaultColor,
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  activeRegion = 'all',
  opacity = 1.0,
  isXRay = false,
  magnitude = 0.35,
}: {
  glbPath: string;
  systemName: string;
  defaultColor: string;
  explosionProgress: number;
  selectedNodeId: string | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  activeRegion?: AnatomicalRegion;
  opacity?: number;
  isXRay?: boolean;
  magnitude?: number;
}) {
  const { scene } = useGLTF(glbPath, DRACO_DECODER_PATH);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Mapeia todas as malhas e guarda suas posições anatômicas de descanso
  const animNodes = useMemo(() => {
    const list: MeshAnimData[] = [];

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const item = Z_ANATOMY_BY_NODE[mesh.name] || null;
        const ev = item?.explosionVector
          ? new THREE.Vector3(item.explosionVector.x, item.explosionVector.y, item.explosionVector.z)
          : new THREE.Vector3(0, 0, 0);

        // Se for crânio, ampliar deslocamento relativo para visualização clara de suturas
        const isCranial = item?.path.some((p) => p.toLowerCase().includes('cranium')) || false;
        const mult = isCranial ? 1.8 : 1.0;

        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(defaultColor),
          roughness: systemName === 'skeletal' ? 0.54 : 0.42,
          metalness: 0.05,
          side: THREE.DoubleSide,
          transparent: opacity < 0.99 || isXRay,
          opacity: isXRay ? 0.22 : opacity,
        });
        mesh.material = mat;

        list.push({
          mesh,
          originalPos: mesh.position.clone(),
          explosionVec: ev.multiplyScalar(mult),
          item,
          baseMaterial: mat,
        });
      }
    });

    return list;
  }, [clonedScene, defaultColor, systemName, opacity, isXRay]);

  // Atualização em tempo real das cores, visibilidade por região, seleção e hover
  useEffect(() => {
    animNodes.forEach(({ mesh, item, baseMaterial }) => {
      const isSelected = selectedNodeId === item?.id || selectedNodeId === mesh.name;
      const isHovered = hoveredNode === mesh.name;
      const isHiddenIsolated = isolatedOnly && selectedNodeId !== null && !isSelected;

      // Filtragem por região (ex: só ver o crânio, só a coluna, etc.)
      const isRegionVisible = systemName === 'skeletal' ? isNodeInRegion(item, mesh.name, activeRegion) : true;

      mesh.visible = isRegionVisible && !isHiddenIsolated;

      if (!mesh.visible) return;

      if (isSelected) {
        baseMaterial.color.set('#38bdf8');
        baseMaterial.emissive.set('#0284c7');
        baseMaterial.emissiveIntensity = 0.85;
        baseMaterial.transparent = false;
        baseMaterial.opacity = 1.0;
      } else if (isHovered) {
        baseMaterial.color.set('#bae6fd');
        baseMaterial.emissive.set('#0369a1');
        baseMaterial.emissiveIntensity = 0.45;
      } else {
        baseMaterial.color.set(defaultColor);
        baseMaterial.emissive.set('#000000');
        baseMaterial.emissiveIntensity = 0;
        baseMaterial.transparent = isXRay || (ghostMode && selectedNodeId !== null) || opacity < 0.99;
        baseMaterial.opacity = isXRay ? 0.22 : ghostMode && selectedNodeId !== null ? 0.12 : opacity;
      }
    });
  }, [animNodes, selectedNodeId, hoveredNode, ghostMode, isolatedOnly, activeRegion, systemName, opacity, isXRay, defaultColor]);

  // Animação da Exploded View no loop Three.js useFrame
  useFrame(() => {
    const factor = explosionProgress * magnitude;

    for (let i = 0; i < animNodes.length; i++) {
      const { mesh, originalPos, explosionVec } = animNodes[i];
      if (!mesh.visible) continue;

      const targetX = originalPos.x + explosionVec.x * factor;
      const targetY = originalPos.y + explosionVec.y * factor;
      const targetZ = originalPos.z + explosionVec.z * factor;

      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, 0.16);
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, 0.16);
      mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, 0.16);
    }
  });

  // Localiza o item atualmente selecionado para renderizar o Pin 3D com precisão
  const selectedMeshItem = useMemo(() => {
    if (!selectedNodeId) return null;
    return animNodes.find((d) => d.item?.id === selectedNodeId || d.mesh.name === selectedNodeId) || null;
  }, [selectedNodeId, animNodes]);

  return (
    <group>
      <primitive
        object={clonedScene}
        onPointerOver={(e: { stopPropagation: () => void; object: THREE.Object3D }) => {
          e.stopPropagation();
          setHoveredNode(e.object.name);
        }}
        onPointerOut={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setHoveredNode(null);
        }}
        onClick={(e: { stopPropagation: () => void; object: THREE.Object3D }) => {
          e.stopPropagation();
          const target = animNodes.find((d) => d.mesh === e.object);
          if (target && target.item) {
            const node = toAnatomicalNode(target.item);
            onSelectNode(selectedNodeId === node.id ? null : node);
          } else if (e.object.name) {
            const fallbackNode: GeneralAnatomicalNode = {
              id: `za:${e.object.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
              namePtBr: e.object.name,
              nameLatin: e.object.name,
              chapter: 2,
              systemName: systemName,
              meshName: e.object.name,
            };
            onSelectNode(selectedNodeId === fallbackNode.id ? null : fallbackNode);
          }
        }}
      />

      {/* Pin 3D Flutuante de Alta Definição sobre o Elemento Selecionado */}
      {selectedMeshItem && selectedMeshItem.mesh.visible && (
        <Html
          position={[
            selectedMeshItem.mesh.position.x,
            selectedMeshItem.mesh.position.y + 0.06,
            selectedMeshItem.mesh.position.z,
          ]}
          center
          distanceFactor={4.5}
        >
          <div
            className="annotation-tag-selected"
            style={{
              backgroundColor: 'rgba(10, 15, 29, 0.94)',
              color: '#38bdf8',
              border: '2px solid #38bdf8',
              boxShadow: '0 6px 20px rgba(2, 132, 199, 0.5)',
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.15rem',
              animation: 'pulse 1.8s infinite',
            }}
          >
            <div style={{ color: '#ffffff' }}>
              {selectedMeshItem.item?.namePtBr || selectedMeshItem.mesh.name}
            </div>
            {selectedMeshItem.item?.nameLatin && (
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8', fontStyle: 'italic', fontWeight: 500 }}>
                {selectedMeshItem.item.nameLatin}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Componente Principal do Atlas Corporal Real Z-Anatomy
 * Gerencia escala e centralização dinâmica de acordo com a região selecionada
 */
export function RealBodyAtlas({
  explosionProgress,
  selectedNodeId,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  activeSystem,
  activeRegion = 'all',
  realSkullOpacity = 1.0,
  visualMode = 'solid',
}: RealBodyAtlasProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isXRay = visualMode === 'xray';

  // Coleta de Lixo WebGL Determinística ao desmontar
  useEffect(() => {
    return () => {
      if (groupRef.current) {
        const report = disposeHierarchy(groupRef.current);
        logWebGLGarbageCollection('RealBodyAtlas', report);
      }
    };
  }, []);

  // Determina quais sistemas devem ser exibidos
  const showSkeletal = activeSystem === 'skeletal' || activeSystem === 'all';
  const showMuscular = activeSystem === 'muscular' || activeSystem === 'all';
  const showRespiratory = activeSystem === 'respiratory' || activeSystem === 'all';
  const showCardiovascular = activeSystem === 'cardiovascular' || activeSystem === 'all';
  const showDigestive = activeSystem === 'digestive' || activeSystem === 'all';
  const showNervous = activeSystem === 'nervous' || activeSystem === 'all';
  const showRenal = activeSystem === 'urinary' || activeSystem === 'renal' || activeSystem === 'all';

  // Centralização e Escala Adaptativa conforme a região selecionada:
  // Se o usuário selecionou apenas o Crânio, centralizamos a cabeça no meio do viewport com zoom cirúrgico!
  const { position, scale } = useMemo<{ position: [number, number, number]; scale: [number, number, number] }>(() => {
    if (activeRegion === 'cranium') {
      return {
        position: [0, -4.6, 0],
        scale: [3.1, 3.1, 3.1],
      };
    }
    if (activeRegion === 'spine') {
      return {
        position: [0, -2.6, 0],
        scale: [2.5, 2.5, 2.5],
      };
    }
    if (activeRegion === 'thorax') {
      return {
        position: [0, -2.9, 0],
        scale: [2.5, 2.5, 2.5],
      };
    }
    if (activeRegion === 'upper_limb') {
      return {
        position: [0, -2.6, 0],
        scale: [2.2, 2.2, 2.2],
      };
    }
    if (activeRegion === 'pelvis' || activeRegion === 'lower_limb') {
      return {
        position: [0, -0.6, 0],
        scale: [2.0, 2.0, 2.0],
      };
    }
    // Visão Padrão: Corpo Humano Completo
    return {
      position: [0, -0.8, 0],
      scale: [1.7, 1.7, 1.7],
    };
  }, [activeRegion]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 1. Esqueleto Humano Completo (335 Ossos Reais com Filtro por Região) */}
      {showSkeletal && (
        <RealSystemModel
          glbPath="/models/anatomy/skeletal_male.glb"
          systemName="skeletal"
          defaultColor="#f4ede2" // Marfim cortical PBR
          explosionProgress={explosionProgress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={realSkullOpacity}
          isXRay={isXRay}
          magnitude={activeRegion === 'cranium' ? 0.45 : 0.35}
        />
      )}

      {/* 2. Sistema Muscular Real Z-Anatomy (1.388 Músculos Reais) */}
      {showMuscular && (
        <RealSystemModel
          glbPath="/models/anatomy/muscular_male.glb"
          systemName="muscular"
          defaultColor="#b91c1c" // Tom avermelhado muscular realista
          explosionProgress={explosionProgress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={realSkullOpacity}
          isXRay={isXRay}
          magnitude={0.25}
        />
      )}

      {/* 3. Sistema Respiratório Real (Traqueia, Brônquios, Pulmões com Lobos) */}
      {showRespiratory && (
        <RealSystemModel
          glbPath="/models/anatomy/respiratory_male.glb"
          systemName="respiratory"
          defaultColor="#67e8f9" // Tom ciano pulmonar
          explosionProgress={explosionProgress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={realSkullOpacity}
          isXRay={isXRay}
          magnitude={0.25}
        />
      )}

      {/* 4. Sistema Cardiovascular Real (Coração e Grandes Vasos) */}
      {showCardiovascular && (
        <RealSystemModel
          glbPath="/models/anatomy/cardiovascular_male.glb"
          systemName="cardiovascular"
          defaultColor="#ef4444" // Vermelho vascular cardíaco
          explosionProgress={explosionProgress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={realSkullOpacity}
          isXRay={isXRay}
          magnitude={0.25}
        />
      )}

      {/* 5. Sistema Digestório Real (Esôfago, Estômago, Fígado, Pâncreas, Intestinos) */}
      {showDigestive && (
        <RealSystemModel
          glbPath="/models/anatomy/digestive_male.glb"
          systemName="digestive"
          defaultColor="#f59e0b" // Âmbar digestório
          explosionProgress={explosionProgress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={realSkullOpacity}
          isXRay={isXRay}
          magnitude={0.25}
        />
      )}

      {/* 6. Sistema Nervoso Real (Encéfalo, Cerebelo, Medula Espinhal) */}
      {showNervous && (
        <RealSystemModel
          glbPath="/models/anatomy/nervous_male.glb"
          systemName="nervous"
          defaultColor="#eab308" // Amarelo neuro
          explosionProgress={explosionProgress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={realSkullOpacity}
          isXRay={isXRay}
          magnitude={0.3}
        />
      )}

      {/* 7. Sistema Renal / Urinário Real (Rins e Vias Urinárias) */}
      {showRenal && (
        <RealSystemModel
          glbPath="/models/anatomy/renal_male.glb"
          systemName="urinary"
          defaultColor="#a855f7" // Púrpura urológico
          explosionProgress={explosionProgress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={realSkullOpacity}
          isXRay={isXRay}
          magnitude={0.25}
        />
      )}
    </group>
  );
}

// Preload dos modelos principais para carregamento instantâneo
useGLTF.preload('/models/anatomy/skeletal_male.glb', DRACO_DECODER_PATH);

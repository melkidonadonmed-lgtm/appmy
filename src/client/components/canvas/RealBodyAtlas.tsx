import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import {
  Z_ANATOMY_BY_NODE,
  Z_ANATOMY_BY_ID,
  ZAnatomyItem,
  sanitizeNodeName,
} from '../../../shared/constants/zAnatomyCatalog.ts';
import { detectRegion } from '../../../shared/utils/buildTaxonomicTree.ts';
import { AnyAnatomicalNode, GeneralAnatomicalNode, AnatomicalRegion, ActiveAnatomicalSystem } from './AnatomicalAtlasScene.tsx';
import { DissectionVisualMode } from '../../../shared/types/dissection.ts';
import { disposeHierarchy, logWebGLGarbageCollection } from '../../lib/webgl-gc.ts';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import {
  bindExplodedNode,
  applyExplodedStep,
  ExplodedNodeBinding,
} from '../../../core/explodedEngine.ts';
import {
  updateMeshVisibility,
  determineSurgicalLayer,
  VisibilityState,
} from '../../../core/visibilityManager.ts';
import { AnatomicalMeshUserData } from '../../../shared/types/anatomy.ts';

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
  layerPeelingLevel?: number;
  realSkullOpacity?: number;
  visualMode?: DissectionVisualMode;
}

interface MeshAnimData {
  mesh: THREE.Mesh;
  binding: ExplodedNodeBinding;
  item: ZAnatomyItem | null;
  baseMaterial: THREE.MeshStandardMaterial;
}

/**
 * Filtra se um nó pertence à região anatômica selecionada pelo usuário
 */
function isNodeInRegion(item: ZAnatomyItem | null, meshName: string, region: AnatomicalRegion): boolean {
  if (region === 'all' || !region) return true;
  
  if (item) {
    const detected = detectRegion(item);
    if (region === 'spine' && detected === 'vertebral_column') return true;
    if (region === detected) return true;
  }

  const pathStr = (item?.path || []).join(' ').toLowerCase();
  const nameLower = (item?.nameEn || item?.namePtBr || meshName).toLowerCase();

  switch (region) {
    case 'cranium':
      return (
        pathStr.includes('cranium') ||
        pathStr.includes('head') ||
        pathStr.includes('skull') ||
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
        pathStr.includes('spine') ||
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
        pathStr.includes('arm') ||
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
        pathStr.includes('leg') ||
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
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        if (!child.userData) child.userData = {};
        if (!child.userData.initialPosition) {
          child.userData.initialPosition = child.position.clone();
        }
      }
    });
    return clone;
  }, [scene]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const storeHoveredNode = useAnatomyStore((s) => s.hoveredNodeId);
  const storeSelectedNodeId = useAnatomyStore((s) => s.selectedNodeId);
  const setStoreHoveredNode = useAnatomyStore((s) => s.setHoveredNode);
  const setStoreSelectedNode = useAnatomyStore((s) => s.setSelectedNode);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);

  const effectiveSelectedId = selectedNodeId || storeSelectedNodeId;
  const effectiveHovered = storeHoveredNode || hoveredNode;

  const storeActiveDepth = useAnatomyStore((s) => s.activeDepth);

  // Mapeia todas as malhas, hidrata userData e vincula as âncoras da Exploded View
  const animNodes = useMemo(() => {
    const list: MeshAnimData[] = [];

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const item = Z_ANATOMY_BY_NODE[mesh.name] || Z_ANATOMY_BY_NODE[sanitizeNodeName(mesh.name)] || null;
        const layer = determineSurgicalLayer(systemName, mesh.name, item?.namePtBr);

        mesh.userData = {
          id: item?.id || mesh.name,
          nomePt: item?.namePtBr || mesh.name,
          nomeLatin: item?.nameLatin,
          sistema: systemName,
          regiao: activeRegion,
          camadaProfundidade: layer,
          eixoExplosao: item?.explosionVector
            ? [item.explosionVector.x, item.explosionVector.y, item.explosionVector.z]
            : undefined,
          distanciaMaxima: magnitude,
          isAnchor: false,
        } as AnatomicalMeshUserData;

        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(defaultColor),
          roughness: systemName === 'skeletal' ? 0.54 : 0.42,
          metalness: 0.05,
          side: THREE.DoubleSide,
          transparent: opacity < 0.99 || isXRay,
          opacity: isXRay ? 0.22 : opacity,
        });
        mesh.material = mat;

        const binding = bindExplodedNode(mesh, activeRegion);

        list.push({
          mesh,
          binding,
          item,
          baseMaterial: mat,
        });
      }
    });

    return list;
  }, [clonedScene, defaultColor, systemName, opacity, isXRay, activeRegion, magnitude]);

  // Atualização em tempo real das cores, visibilidade por região, 6 camadas e blindagem de raycast
  useEffect(() => {
    const visibilityState: VisibilityState = {
      hiddenIds: hiddenNodeIds,
      selectedId: effectiveSelectedId,
      activeDepth: storeActiveDepth,
      ghostMode,
      isolatedOnly,
    };

    animNodes.forEach(({ mesh, item, baseMaterial }) => {
      const isSelected = effectiveSelectedId === item?.id || effectiveSelectedId === mesh.name;
      const isHovered = effectiveHovered === mesh.name || (item?.id && effectiveHovered === item.id);

      // Filtragem por região (ex: só ver o crânio, só a coluna, etc.)
      const isRegionVisible = systemName === 'skeletal' ? isNodeInRegion(item, mesh.name, activeRegion) : true;

      if (!isRegionVisible) {
        mesh.visible = false;
        mesh.raycast = () => {};
        return;
      }

      // Máquina de estados determinística de visibilidade e blindagem de raycast
      updateMeshVisibility(mesh, visibilityState, baseMaterial, defaultColor, isXRay ? 0.22 : opacity);

      // Destaque de Hover interativo
      if (mesh.visible && !isSelected && isHovered) {
        baseMaterial.color.set('#bae6fd');
        baseMaterial.emissive.set('#0369a1');
        baseMaterial.emissiveIntensity = 0.55;
      }
    });
  }, [animNodes, effectiveSelectedId, effectiveHovered, ghostMode, isolatedOnly, activeRegion, systemName, opacity, isXRay, defaultColor, hiddenNodeIds, storeActiveDepth]);

  // Array otimizado de nós vinculados para o loop da GPU
  const bindings = useMemo(() => animNodes.map((d) => d.binding), [animNodes]);

  // Animação da Exploded View no loop Three.js useFrame com LERP amortecido e âncoras fixas
  useFrame(() => {
    applyExplodedStep(bindings, explosionProgress * magnitude, 0.16);
  });

  // Localiza o item atualmente selecionado para renderizar o Pin 3D e guiar a câmera
  const selectedMeshItem = useMemo(() => {
    if (!effectiveSelectedId) return null;
    return animNodes.find((d) => d.item?.id === effectiveSelectedId || d.mesh.name === effectiveSelectedId) || null;
  }, [effectiveSelectedId, animNodes]);

  // Centralização suave de câmera ao selecionar a peça
  useEffect(() => {
    if (selectedMeshItem && selectedMeshItem.mesh.visible) {
      const box = new THREE.Box3().setFromObject(selectedMeshItem.mesh);
      const center = box.getCenter(new THREE.Vector3());
      setCameraFocusTarget([center.x, center.y, center.z]);
    }
  }, [selectedMeshItem, setCameraFocusTarget]);

  return (
    <group>
      <primitive
        object={clonedScene}
        onPointerOver={(e: { stopPropagation: () => void; object: THREE.Object3D }) => {
          e.stopPropagation();
          setHoveredNode(e.object.name);
          setStoreHoveredNode(e.object.name);
        }}
        onPointerOut={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setHoveredNode(null);
          setStoreHoveredNode(null);
        }}
        onClick={(e: { stopPropagation: () => void; object: THREE.Object3D }) => {
          e.stopPropagation();
          const target = animNodes.find((d) => d.mesh === e.object);
          const resolvedItem =
            target?.item ||
            Z_ANATOMY_BY_NODE[e.object.name] ||
            Z_ANATOMY_BY_NODE[sanitizeNodeName(e.object.name)] ||
            null;
          if (resolvedItem) {
            const node = toAnatomicalNode(resolvedItem);
            const nextVal = effectiveSelectedId === node.id ? null : node;
            setStoreSelectedNode(nextVal ? node.id : null);
            onSelectNode(nextVal);
          } else if (e.object.name) {
            const cleanName = e.object.name
              .replace(/[()]/g, '')
              .replace(/\.[lr]$/i, (m) => (m.toLowerCase() === '.l' ? ' (Esquerdo)' : ' (Direito)'));
            const fallbackNode: GeneralAnatomicalNode = {
              id: `za:${e.object.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
              namePtBr: cleanName,
              nameLatin: e.object.name,
              chapter: systemName === 'muscular' ? 3 : 2,
              systemName: systemName === 'muscular' ? 'Sistema Muscular (Miologia)' : systemName,
              meshName: e.object.name,
              clinicalData: {
                origin: `Estrutura integrante do ${systemName}`,
                insertion: 'Plano anatômico dissecado',
                clinicalSignificance: `Módulo anatômico Z-Anatomy: ${cleanName}.`,
              },
            };
            const nextVal = effectiveSelectedId === fallbackNode.id ? null : fallbackNode;
            setStoreSelectedNode(nextVal ? fallbackNode.id : null);
            onSelectNode(nextVal);
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
  layerPeelingLevel: _layerPeelingLevel = 0,
  realSkullOpacity = 1.0,
  visualMode = 'solid',
}: RealBodyAtlasProps) {
  const groupRef = useRef<THREE.Group>(null);
  const storeModules = useAnatomyStore((s) => s.modules);
  const storeSelectedNodeId = useAnatomyStore((s) => s.selectedNodeId);

  // Sincroniza a seleção na aplicação quando o nó for clicado na árvore
  useEffect(() => {
    if (storeSelectedNodeId && storeSelectedNodeId !== selectedNodeId) {
      const item = Z_ANATOMY_BY_ID[storeSelectedNodeId] || Z_ANATOMY_BY_NODE[storeSelectedNodeId];
      if (item) {
        onSelectNode(toAnatomicalNode(item));
      }
    }
  }, [storeSelectedNodeId, selectedNodeId, onSelectNode]);

  const effectiveExplosion = explosionProgress > 0 ? explosionProgress : storeModules.explodedProgress;
  const effectiveOpacity = realSkullOpacity !== 1.0 ? realSkullOpacity : storeModules.solidOpacity;
  const effectiveXRay = visualMode === 'xray' || storeModules.xRayMode;

  // Coleta de Lixo WebGL Determinística ao desmontar
  useEffect(() => {
    return () => {
      if (groupRef.current) {
        const report = disposeHierarchy(groupRef.current);
        logWebGLGarbageCollection('RealBodyAtlas', report);
      }
    };
  }, []);

  // Determina quais sistemas devem ser exibidos e suas respectivas opacidades individuais
  const storeActiveSystems = useAnatomyStore((s) => s.activeSystems);
  const storeSystemOpacities = useAnatomyStore((s) => s.systemOpacities);

  const isSysActive = (sys: ActiveAnatomicalSystem) => {
    if (storeActiveSystems && storeActiveSystems.size > 0) {
      return storeActiveSystems.has('all') || storeActiveSystems.has(sys);
    }
    return activeSystem === sys || activeSystem === 'all';
  };

  const getSysOpacity = (sys: ActiveAnatomicalSystem, fallback = effectiveOpacity) => {
    if (storeSystemOpacities && typeof storeSystemOpacities[sys] === 'number') {
      return storeSystemOpacities[sys];
    }
    return fallback;
  };

  const showSkeletal = isSysActive('skeletal');
  const skeletalOpacity = getSysOpacity('skeletal');

  // O sistema muscular aparece conforme seleção concorrente ou modo global
  const showMuscular = isSysActive('muscular');
  const muscularOpacity = getSysOpacity('muscular');

  const showRespiratory = isSysActive('respiratory');
  const respiratoryOpacity = getSysOpacity('respiratory');

  const showCardiovascular = isSysActive('cardiovascular');
  const cardioOpacity = getSysOpacity('cardiovascular');

  const showDigestive = isSysActive('digestive');
  const digestiveOpacity = getSysOpacity('digestive');

  const showNervous = isSysActive('nervous');
  const nervousOpacity = getSysOpacity('nervous');

  const showRenal = isSysActive('urinary');
  const renalOpacity = getSysOpacity('urinary');

  const showLymphatic = isSysActive('lymphatic');
  const lymphaticOpacity = getSysOpacity('lymphatic');

  const showEndocrine = isSysActive('endocrine');
  const endocrineOpacity = getSysOpacity('endocrine');

  const showReproductive = isSysActive('reproductive');
  const reproductiveOpacity = getSysOpacity('reproductive');

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
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={skeletalOpacity}
          isXRay={effectiveXRay}
          magnitude={activeRegion === 'cranium' ? 1.4 : 0.95}
        />
      )}

      {/* 2. Sistema Muscular Real Z-Anatomy (1.388 Músculos Reais) */}
      {showMuscular && (
        <RealSystemModel
          glbPath="/models/anatomy/muscular_male.glb"
          systemName="muscular"
          defaultColor="#b91c1c" // Tom avermelhado muscular realista
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={muscularOpacity}
          isXRay={effectiveXRay}
          magnitude={0.85}
        />
      )}

      {/* 3. Sistema Respiratório Real (Traqueia, Brônquios, Pulmões com Lobos) */}
      {showRespiratory && (
        <RealSystemModel
          glbPath="/models/anatomy/respiratory_male.glb"
          systemName="respiratory"
          defaultColor="#67e8f9" // Tom ciano pulmonar
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={respiratoryOpacity}
          isXRay={effectiveXRay}
          magnitude={0.8}
        />
      )}

      {/* 4. Sistema Cardiovascular Real (Coração e Grandes Vasos) */}
      {showCardiovascular && (
        <RealSystemModel
          glbPath="/models/anatomy/cardiovascular_male.glb"
          systemName="cardiovascular"
          defaultColor="#ef4444" // Vermelho vascular cardíaco
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={cardioOpacity}
          isXRay={effectiveXRay}
          magnitude={0.8}
        />
      )}

      {/* 5. Sistema Digestório Real (Esôfago, Estômago, Fígado, Pâncreas, Intestinos) */}
      {showDigestive && (
        <RealSystemModel
          glbPath="/models/anatomy/digestive_male.glb"
          systemName="digestive"
          defaultColor="#f59e0b" // Âmbar digestório
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={digestiveOpacity}
          isXRay={effectiveXRay}
          magnitude={0.8}
        />
      )}

      {/* 6. Sistema Nervoso Real (Encéfalo, Cerebelo, Medula Espinhal) */}
      {showNervous && (
        <RealSystemModel
          glbPath="/models/anatomy/nervous_male.glb"
          systemName="nervous"
          defaultColor="#eab308" // Amarelo neuro
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={nervousOpacity}
          isXRay={effectiveXRay}
          magnitude={0.85}
        />
      )}

      {/* 7. Sistema Renal / Urinário Real (Rins e Vias Urinárias) */}
      {showRenal && (
        <RealSystemModel
          glbPath="/models/anatomy/renal_male.glb"
          systemName="urinary"
          defaultColor="#a855f7" // Púrpura urológico
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={renalOpacity}
          isXRay={effectiveXRay}
          magnitude={0.8}
        />
      )}

      {/* 8. Sistema Linfático Real (Vasos e Linfonodos) */}
      {showLymphatic && (
        <RealSystemModel
          glbPath="/models/anatomy/lymphatic_male.glb"
          systemName="lymphatic"
          defaultColor="#10b981" // Verde linfático
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={lymphaticOpacity}
          isXRay={effectiveXRay}
          magnitude={0.8}
        />
      )}

      {/* 9. Sistema Endócrino Real (Tireoide, Suprarrenais, Hipófise) */}
      {showEndocrine && (
        <RealSystemModel
          glbPath="/models/anatomy/endocrine_male.glb"
          systemName="endocrine"
          defaultColor="#8b5cf6" // Violeta endócrino
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={endocrineOpacity}
          isXRay={effectiveXRay}
          magnitude={0.8}
        />
      )}

      {/* 10. Sistema Reprodutor Real */}
      {showReproductive && (
        <RealSystemModel
          glbPath="/models/anatomy/reproductive_male.glb"
          systemName="reproductive"
          defaultColor="#f43f5e" // Coral reprodutor
          explosionProgress={effectiveExplosion}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          ghostMode={ghostMode}
          isolatedOnly={isolatedOnly}
          activeRegion={activeRegion}
          opacity={reproductiveOpacity}
          isXRay={effectiveXRay}
          magnitude={0.8}
        />
      )}
    </group>
  );
}

// Preload dos modelos principais para carregamento instantâneo
useGLTF.preload('/models/anatomy/skeletal_male.glb', DRACO_DECODER_PATH);



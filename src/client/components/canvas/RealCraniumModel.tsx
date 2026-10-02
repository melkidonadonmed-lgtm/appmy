import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { useGLTF, Center, Html } from '@react-three/drei';
import { AnyAnatomicalNode } from './AnatomicalAtlasScene.tsx';

interface RealCraniumModelProps {
  onSelectNode?: (node: AnyAnatomicalNode | null) => void;
  isSelected?: boolean;
  isGhost?: boolean;
  opacity?: number;
  scale?: number;
  position?: [number, number, number];
}

const CRANIUM_REAL_NODE: AnyAnatomicalNode = {
  id: 'fma:cranium_overview',
  fmaId: 'FMA:46565',
  namePtBr: 'Crânio Humano Completo (Fotorealista)',
  nameLatin: 'Cranium humanum',
  chapter: 2,
  systemName: 'Sistema Esquelético',
  meshName: 'skull',
  division: 'neurocranium',
  paired: false,
  clinicalData: {
    origin: 'Esqueleto cefálico completo escaneado em alta definição, compreendendo os 22 ossos cranianos e cavidades orbitárias.',
    innervation: 'Inervação sensitiva craniana e meníngea pelos três ramos do nervo trigêmeo (NC V) e ramos cervicais superiores.',
    vascularization: 'Artérias carótidas interna e externa, artéria meníngea média e plexos venosos durais.',
    functionalAction: 'Proteção biomecânica do encéfalo, suporte aos órgãos dos sentidos (olhos, orelhas) e sustentação da mastigação.',
    clinicalSignificance: 'Base para craniotomias neurocirúrgicas, localização de pontos craniométricos vitais (Ptérion, Astérion, Bregma e Lambda) e diagnóstico de fraturas com afundamento ou fraturas de base (sinal de Battle e olhos de guaxinim).',
  },
};

export function RealCraniumModel({
  onSelectNode,
  isSelected = false,
  isGhost = false,
  opacity = 1.0,
  scale = 7.8,
  position = [0, 0.1, 0],
}: RealCraniumModelProps) {
  const { scene } = useGLTF('/models/cranium.glb');
  const [hovered, setHovered] = useState(false);

  // Clona e aplica material PBR de osso cortical fidedigno
  const boneScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Material PBR de osso natural com suporte dinâmico a transparência e clipping
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#f4ede2'), // Marfim / Cálcio ósseo natural
          roughness: 0.52,
          metalness: 0.04,
          side: THREE.DoubleSide,
          transparent: opacity < 0.99,
          opacity: opacity,
        });
      }
    });

    return cloned;
  }, [scene, opacity]);

  // Atualização dinâmica de cores no hover, seleção e modo fantasma
  useMemo(() => {
    boneScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.transparent = opacity < 0.99 || isGhost;
          mat.opacity = isGhost ? 0.12 : opacity;

          if (isSelected) {
            mat.color.set('#38bdf8');
            mat.emissive.set('#0284c7');
            mat.emissiveIntensity = 0.45;
          } else if (hovered) {
            mat.color.set('#bae6fd');
            mat.emissive.set('#0369a1');
            mat.emissiveIntensity = 0.2;
          } else {
            mat.color.set('#f4ede2');
            mat.emissive.set('#000000');
            mat.emissiveIntensity = 0;
          }
        }
      }
    });
  }, [boneScene, hovered, isSelected, isGhost, opacity]);

  if (opacity <= 0.005) return null;

  return (
    <group position={position}>
      <Center>
        <primitive
          object={boneScene}
          scale={scale}
          onPointerOver={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            if (onSelectNode) {
              onSelectNode(isSelected ? null : CRANIUM_REAL_NODE);
            }
          }}
        />
      </Center>

      {isSelected && (
        <Html position={[0, 1.25, 0]} center distanceFactor={7}>
          <div className="annotation-tag" style={{ backgroundColor: '#0284c7' }}>
            <span>Crânio Humano Fotorealista (.GLB)</span>
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload('/models/cranium.glb');

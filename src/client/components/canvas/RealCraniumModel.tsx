import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { useGLTF, Center, Html } from '@react-three/drei';

interface RealCraniumModelProps {
  onSelectNode?: (name: string) => void;
}

export function RealCraniumModel({ onSelectNode }: RealCraniumModelProps) {
  const { scene } = useGLTF('/models/cranium.glb');
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  // Clona e aplica material PBR de osso humano cortical vivo e nítido
  const boneScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Substitui o material de dispersão volumétrica escuro por um PBR de osso natural vibrante
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#f4ede2'), // Marfim / Cálcio ósseo natural
          roughness: 0.52,
          metalness: 0.04,
          side: THREE.DoubleSide,
        });
      }
    });

    return cloned;
  }, [scene]);

  // Atualiza cores dinamicamente no hover / seleção
  useMemo(() => {
    boneScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          if (selected) {
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
  }, [boneScene, hovered, selected]);

  return (
    <group position={[0, 0, 0]}>
      <Center>
        <primitive
          object={boneScene}
          scale={8.5}
          onPointerOver={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            const next = !selected;
            setSelected(next);
            if (onSelectNode) onSelectNode('Crânio Humano (Visão Geral)');
          }}
        />
      </Center>

      {selected && (
        <Html position={[0, 1.2, 0]} center distanceFactor={7}>
          <div className="annotation-tag" style={{ backgroundColor: '#0284c7' }}>
            <span>Crânio Humano Completo (.GLB)</span>
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload('/models/cranium.glb');

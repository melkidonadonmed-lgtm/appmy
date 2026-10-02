import { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { AnatomicalNode, Vector3D } from '../../shared/types/anatomy.ts';

export interface CalculatedNodeGeometry {
  node: AnatomicalNode;
  mesh: THREE.Mesh;
  originalPosition: THREE.Vector3;
  explosionVector: THREE.Vector3;
}

/**
 * Hook para carregar modelos anatômicos GLTF/GLB com compressão Draco
 * e calcular automaticamente o centróide e o vetor de dispersão na vista explodida.
 */
export function useAnatomicalModel(
  modelUrl: string,
  customMetadata: Record<string, Partial<AnatomicalNode>> = {}
) {
  // Configuração automática do carregador GLTF com Draco
  const gltf = useGLTF(modelUrl, 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

  const { nodes, boundingBox, sceneCenter } = useMemo(() => {
    const list: CalculatedNodeGeometry[] = [];
    const overallBox = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    overallBox.getCenter(center);

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Bounding box individual do elemento
        const meshBox = new THREE.Box3().setFromObject(mesh);
        const meshCenter = new THREE.Vector3();
        meshBox.getCenter(meshCenter);

        // Vetor de dispersão automático: vai do centro global da cena ao centróide da peça
        const autoVector = new THREE.Vector3()
          .subVectors(meshCenter, center)
          .normalize();

        // Se o vetor tiver magnitude zero (centro perfeito), projeta verticalmente
        if (autoVector.lengthSq() < 0.001) {
          autoVector.set(0, 1, 0);
        }

        const nodeId = `fma:${mesh.name.toLowerCase().replace(/\s+/g, '_')}`;
        const override = customMetadata[mesh.name] || customMetadata[nodeId] || {};

        const customVector: Vector3D | undefined = override.explosionVector;
        const finalVector = customVector
          ? new THREE.Vector3(customVector.x, customVector.y, customVector.z)
          : autoVector;

        const nodeData: AnatomicalNode = {
          id: override.id || nodeId,
          fmaId: override.fmaId,
          namePtBr: override.namePtBr || mesh.name.replace(/_/g, ' '),
          nameLatin: override.nameLatin || mesh.name,
          chapter: override.chapter || 2,
          systemName: override.systemName || 'Sistema Esquelético',
          meshName: mesh.name,
          colorHex: override.colorHex,
          explosionVector: { x: finalVector.x, y: finalVector.y, z: finalVector.z },
          explosionMagnitudeMultiplier: override.explosionMagnitudeMultiplier || 1.0,
          clinicalData: override.clinicalData,
        };

        list.push({
          node: nodeData,
          mesh,
          originalPosition: mesh.position.clone(),
          explosionVector: finalVector,
        });
      }
    });

    return {
      nodes: list,
      boundingBox: overallBox,
      sceneCenter: center,
    };
  }, [gltf, customMetadata]);

  return {
    scene: gltf.scene,
    nodes,
    boundingBox,
    sceneCenter,
  };
}

/**
 * Desalocador de recursos (Garbage Collector WebGL) para prevenir estouro de VRAM
 */
export function disposeAnatomicalScene(scene: THREE.Object3D) {
  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material?.dispose();
      }
    }
  });
}

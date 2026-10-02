import * as THREE from 'three';

export interface WebGLDisposalReport {
  geometriesDisposed: number;
  materialsDisposed: number;
  texturesDisposed: number;
}

/**
 * Libera de forma recursiva e determinística os recursos alocados na VRAM da GPU
 * (Geometrias, Materiais e Texturas) de uma hierarquia Three.js Object3D.
 * 
 * Essencial para evitar vazamentos de memória (out-of-memory) e falhas no WebKit/Safari
 * em dispositivos móveis com limite de VRAM < 200 MB ao alternar entre capítulos anatômicos.
 */
export function disposeHierarchy(root: THREE.Object3D, disconnectFromParent: boolean = false): WebGLDisposalReport {
  const report: WebGLDisposalReport = {
    geometriesDisposed: 0,
    materialsDisposed: 0,
    texturesDisposed: 0,
  };

  const disposedGeometries = new Set<THREE.BufferGeometry>();
  const disposedMaterials = new Set<THREE.Material>();
  const disposedTextures = new Set<THREE.Texture>();

  const disposeMaterialTextures = (mat: THREE.Material) => {
    const materialRecord = mat as unknown as Record<string, unknown>;
    const textureKeys = [
      'map',
      'lightMap',
      'aoMap',
      'emissiveMap',
      'bumpMap',
      'normalMap',
      'displacementMap',
      'roughnessMap',
      'metalnessMap',
      'alphaMap',
      'envMap',
    ];

    for (const key of textureKeys) {
      const val = materialRecord[key];
      if (val && typeof val === 'object' && 'dispose' in val && typeof (val as THREE.Texture).dispose === 'function') {
        const tex = val as THREE.Texture;
        if (!disposedTextures.has(tex)) {
          tex.dispose();
          disposedTextures.add(tex);
          report.texturesDisposed++;
        }
      }
    }
  };

  const disposeSingleMaterial = (mat: THREE.Material) => {
    if (!disposedMaterials.has(mat)) {
      disposeMaterialTextures(mat);
      mat.dispose();
      disposedMaterials.add(mat);
      report.materialsDisposed++;
    }
  };

  root.traverse((obj) => {
    // 1. Desalocar Geometria
    if ('geometry' in obj && obj.geometry instanceof THREE.BufferGeometry) {
      if (!disposedGeometries.has(obj.geometry)) {
        obj.geometry.dispose();
        disposedGeometries.add(obj.geometry);
        report.geometriesDisposed++;
      }
    }

    // 2. Desalocar Materiais e Texturas
    if ('material' in obj && obj.material) {
      const mat = obj.material;
      if (Array.isArray(mat)) {
        mat.forEach((m) => {
          if (m instanceof THREE.Material) {
            disposeSingleMaterial(m);
          }
        });
      } else if (mat instanceof THREE.Material) {
        disposeSingleMaterial(mat);
      }
    }
  });

  // 3. Desconectar do nó pai apenas se explicitamente solicitado (evita quebrar a árvore gerenciada pelo React Three Fiber)
  if (disconnectFromParent && root.parent) {
    root.parent.remove(root);
  }

  return report;
}

/**
 * Função utilitária para registrar a limpeza no console de desenvolvimento.
 */
export function logWebGLGarbageCollection(chapterOrSystemName: string, report: WebGLDisposalReport) {
  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    console.debug(
      `[WebGL-GC] Desalocação concluída para "${chapterOrSystemName}": ` +
      `${report.geometriesDisposed} geometrias, ${report.materialsDisposed} materiais, ${report.texturesDisposed} texturas liberadas da VRAM.`
    );
  }
}

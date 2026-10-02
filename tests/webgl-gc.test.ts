import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { disposeHierarchy } from '../src/client/lib/webgl-gc.ts';

describe('WebGL Garbage Collection Utility (disposeHierarchy)', () => {
  it('deve percorrer a árvore Three.js e descartar geometrias, materiais e texturas', () => {
    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    // 1. Mesh com geometria e material único com textura
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const dummyTexture = new THREE.Texture();
    const textureDisposeSpy = vi.spyOn(dummyTexture, 'dispose');
    boxMat.map = dummyTexture;

    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    group.add(boxMesh);

    // 2. Mesh com geometria e array de materiais
    const sphereGeo = new THREE.SphereGeometry(1, 16, 16);
    const matA = new THREE.MeshBasicMaterial();
    const matB = new THREE.MeshBasicMaterial();
    const sphereMesh = new THREE.Mesh(sphereGeo, [matA, matB]);
    group.add(sphereMesh);

    const geoDisposeSpy1 = vi.spyOn(boxGeo, 'dispose');
    const geoDisposeSpy2 = vi.spyOn(sphereGeo, 'dispose');
    const matDisposeSpy1 = vi.spyOn(boxMat, 'dispose');
    const matDisposeSpy2 = vi.spyOn(matA, 'dispose');
    const matDisposeSpy3 = vi.spyOn(matB, 'dispose');

    const report = disposeHierarchy(group, true);

    // Asserções de estado real pós-coleta de lixo
    expect(report.geometriesDisposed).toBe(2);
    expect(report.materialsDisposed).toBe(3);
    expect(report.texturesDisposed).toBe(1);

    expect(geoDisposeSpy1).toHaveBeenCalledOnce();
    expect(geoDisposeSpy2).toHaveBeenCalledOnce();
    expect(matDisposeSpy1).toHaveBeenCalledOnce();
    expect(matDisposeSpy2).toHaveBeenCalledOnce();
    expect(matDisposeSpy3).toHaveBeenCalledOnce();
    expect(textureDisposeSpy).toHaveBeenCalledOnce();

    // Verificação de desconexão da árvore para liberação no V8 quando solicitado
    expect(group.parent).toBeNull();
  });

  it('não deve causar falha ao receber um nó folha vazio ou sem geometria', () => {
    const emptyGroup = new THREE.Group();
    const report = disposeHierarchy(emptyGroup);

    expect(report.geometriesDisposed).toBe(0);
    expect(report.materialsDisposed).toBe(0);
    expect(report.texturesDisposed).toBe(0);
  });
});

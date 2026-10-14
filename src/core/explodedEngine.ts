import * as THREE from 'three';
import { AnatomicalMeshUserData } from '../shared/types/anatomy.ts';

export interface ExplodedNodeBinding {
  mesh: THREE.Mesh;
  originalPosition: THREE.Vector3;
  targetOffset: THREE.Vector3;
  isAnchor: boolean;
}

/**
 * Identifica se uma estrutura deve permanecer como âncora fixa central estática
 * dependendo da região anatômica sob observação clínica.
 */
export function isAxialAnchor(
  meshName: string,
  nomePt = '',
  activeRegion: string = 'all'
): boolean {
  const nameLower = (meshName + ' ' + nomePt).toLowerCase();

  // No Crânio isolado, a base do crânio (esfenoide e occipital) atua como âncora
  if (activeRegion === 'cranium') {
    return (
      nameLower.includes('sphenoid') ||
      nameLower.includes('esfenoide') ||
      nameLower.includes('esfenóide') ||
      nameLower.includes('occipital') ||
      nameLower.includes('basioccipital') ||
      nameLower.includes('basisphenoid')
    );
  }

  // Na Coluna Vertebral isolada, apenas o sacro atua como âncora basal para permitir
  // a descompactação axial vertical das vértebras cervicais, torácicas e lombares
  if (activeRegion === 'spine') {
    return (
      nameLower.includes('sacrum') ||
      nameLower.includes('sacro')
    );
  }

  // No corpo inteiro ou demais regiões, a coluna vertebral e a pelve são a bússola axial
  return (
    nameLower.includes('vertebra') ||
    nameLower.includes('vertebral') ||
    nameLower.includes('spine') ||
    nameLower.includes('coluna') ||
    nameLower.includes('atlas') ||
    nameLower.includes('axis') ||
    nameLower.includes('sacrum') ||
    nameLower.includes('sacro') ||
    nameLower.includes('coccyx') ||
    nameLower.includes('cóccix') ||
    nameLower.includes('coccix') ||
    nameLower.includes('pelvis') ||
    nameLower.includes('pelvi') ||
    nameLower.includes('hip bone') ||
    nameLower.includes('hip_bone') ||
    nameLower.includes('ilium') ||
    nameLower.includes('ilio') ||
    nameLower.includes('ischium') ||
    nameLower.includes('isquio') ||
    nameLower.includes('pubis') ||
    nameLower.includes('púbis')
  );
}

/**
 * Calcula o centro anatômico real de uma malha, suportando tanto malhas com
 * translação no nó (mesh.position) quanto malhas com vértices em espaço de mundo (position = 0,0,0).
 */
export function getMeshAnatomicalCenter(mesh: THREE.Mesh): THREE.Vector3 {
  const basePos =
    (mesh.userData?.initialPosition as THREE.Vector3 | undefined)?.clone() ??
    mesh.position.clone();
  const offsetArr = mesh.userData?.modelOffset as [number, number, number] | undefined;
  const modelOffset = offsetArr
    ? new THREE.Vector3(offsetArr[0], offsetArr[1], offsetArr[2])
    : new THREE.Vector3(0, 0, 0);

  if (mesh.geometry && mesh.geometry.attributes?.position) {
    if (!mesh.geometry.boundingBox) {
      mesh.geometry.computeBoundingBox();
    }
    if (mesh.geometry.boundingBox && !mesh.geometry.boundingBox.isEmpty()) {
      const boxCenter = new THREE.Vector3();
      mesh.geometry.boundingBox.getCenter(boxCenter);
      boxCenter.multiply(mesh.scale).applyQuaternion(mesh.quaternion);
      return boxCenter.add(basePos).add(modelOffset);
    }
  }
  return basePos.add(modelOffset);
}

/**
 * Vincula matematicamente uma malha Three.js às regras de deslocamento da Exploded View.
 */
export function bindExplodedNode(
  mesh: THREE.Mesh,
  activeRegion: string = 'all'
): ExplodedNodeBinding {
  if (!mesh.userData) {
    mesh.userData = {};
  }
  // Preserva de forma imutável a posição anatômica original da malha
  if (!mesh.userData.initialPosition) {
    mesh.userData.initialPosition = mesh.position.clone();
  }
  const originalPosition = (mesh.userData.initialPosition as THREE.Vector3).clone();
  const effectiveCenter = getMeshAnatomicalCenter(mesh);
  mesh.userData.anatomicalCenter = effectiveCenter;

  const data = mesh.userData as Partial<AnatomicalMeshUserData>;
  
  // 1. Verifica se foi explicitamente declarado como âncora ou identificado pelo nome
  const isAnchor =
    data.isAnchor === true ||
    isAxialAnchor(mesh.name, data.nomePt || '', activeRegion);

  const targetOffset = new THREE.Vector3(0, 0, 0);

  if (!isAnchor) {
    const nameLower = (mesh.name + ' ' + (data.nomePt || '')).toLowerCase();
    const isVertebralSegment =
      activeRegion === 'spine' &&
      (nameLower.includes('vertebra') ||
        nameLower.includes('atlas') ||
        nameLower.includes('axis') ||
        nameLower.includes('coccyx') ||
        nameLower.includes('cóccix') ||
        nameLower.includes('coccix'));

    if (isVertebralSegment) {
      const maxDist = data.distanciaMaxima ?? 1.0;
      const deltaY = Math.abs(effectiveCenter.y) > 0.01 ? (effectiveCenter.y - 0.95) * 1.4 : 0.35;
      targetOffset.set(0, deltaY * maxDist, 0);
    } else if (
      data.eixoExplosao &&
      (data.eixoExplosao[0] !== 0 || data.eixoExplosao[1] !== 0 || data.eixoExplosao[2] !== 0)
    ) {
      const [rawX, rawY, rawZ] = data.eixoExplosao;
      const maxDist = data.distanciaMaxima ?? 1.0;

      // Garante expansão centrífuga homolateral (estruturas em +X expandem para +X, em -X para -X),
      // impedindo que estruturas bilaterais cruzem o plano sagital mediano na Exploded View.
      let alignedX = rawX;
      if (Math.abs(rawX) > 0.001) {
        if (/\.l$/i.test(mesh.name)) {
          alignedX = Math.abs(rawX);
        } else if (/\.r$/i.test(mesh.name)) {
          alignedX = -Math.abs(rawX);
        } else if (Math.abs(effectiveCenter.x) > 0.005) {
          alignedX = Math.sign(effectiveCenter.x) * Math.abs(rawX);
        } else if (/_l$/i.test(mesh.name)) {
          alignedX = Math.abs(rawX);
        } else if (/_r$/i.test(mesh.name)) {
          alignedX = -Math.abs(rawX);
        }
      }

      targetOffset.set(alignedX, rawY, rawZ).normalize().multiplyScalar(maxDist);
    } else {
      // Cálculo de dispersão radial determinística respeitando a simetria corporal real
      const posX = effectiveCenter.x;
      const posY = effectiveCenter.y;
      const posZ = effectiveCenter.z;

      let dirX = 0;
      if (/\.l$/i.test(mesh.name)) {
        dirX = Math.abs(posX) * 2.2 + 0.35;
      } else if (/\.r$/i.test(mesh.name)) {
        dirX = -(Math.abs(posX) * 2.2 + 0.35);
      } else if (Math.abs(posX) > 0.008) {
        dirX = Math.sign(posX) * (Math.abs(posX) * 2.2 + 0.35);
      } else if (/_l$/i.test(mesh.name)) {
        dirX = 0.4;
      } else if (/_r$/i.test(mesh.name)) {
        dirX = -0.4;
      }

      const dirY =
        activeRegion === 'spine'
          ? (posY - 0.95) * 1.4
          : posY > 1.35
          ? (posY - 1.35) * 1.6 + 0.3
          : posY < 0.45 && posY > 0.001
          ? -0.35
          : 0;
      const dirZ = Math.abs(posZ) > 0.01 ? Math.sign(posZ) * (Math.abs(posZ) * 2.0 + 0.3) : 0.3;

      const isCranial = activeRegion === 'cranium' || posY > 1.4;
      const mult = (data.distanciaMaxima ?? 1.0) * (isCranial ? 1.8 : 1.0);

      targetOffset.set(dirX, dirY, dirZ).multiplyScalar(mult);
    }
  }

  return {
    mesh,
    originalPosition,
    targetOffset,
    isAnchor,
  };
}

/**
 * Aplica o passo de interpolação linear (LERP) a todas as malhas vinculadas.
 * Garante que peças com isAnchor: true permaneçam absolutamente imóveis.
 * Quando o progresso for 0.0, restaura de forma atômica e exata a posição anatômica.
 */
export function applyExplodedStep(
  bindings: ExplodedNodeBinding[],
  progress: number, // 0.0 (montado) a 1.0 (explodido)
  lerpFactor = 0.16
): void {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  for (let i = 0; i < bindings.length; i++) {
    const b = bindings[i];
    if (b.isAnchor) {
      if (!b.mesh.position.equals(b.originalPosition)) {
        b.mesh.position.copy(b.originalPosition);
      }
      continue;
    }

    if (clampedProgress === 0) {
      if (!b.mesh.position.equals(b.originalPosition)) {
        b.mesh.position.copy(b.originalPosition);
      }
      continue;
    }

    const targetX = b.originalPosition.x + b.targetOffset.x * clampedProgress;
    const targetY = b.originalPosition.y + b.targetOffset.y * clampedProgress;
    const targetZ = b.originalPosition.z + b.targetOffset.z * clampedProgress;

    if (!b.mesh.visible) {
      b.mesh.position.set(targetX, targetY, targetZ);
      continue;
    }

    b.mesh.position.x = THREE.MathUtils.lerp(b.mesh.position.x, targetX, lerpFactor);
    b.mesh.position.y = THREE.MathUtils.lerp(b.mesh.position.y, targetY, lerpFactor);
    b.mesh.position.z = THREE.MathUtils.lerp(b.mesh.position.z, targetZ, lerpFactor);
  }
}

/**
 * Calcula a posição final exata no espaço 3D para um nó (sem LERP, avaliação pontual)
 */
export function evaluateExplodedPosition(
  binding: ExplodedNodeBinding,
  progress: number
): THREE.Vector3 {
  if (binding.isAnchor) {
    return binding.originalPosition.clone();
  }
  const clamped = Math.max(0, Math.min(1, progress));
  return new THREE.Vector3(
    binding.originalPosition.x + binding.targetOffset.x * clamped,
    binding.originalPosition.y + binding.targetOffset.y * clamped,
    binding.originalPosition.z + binding.targetOffset.z * clamped
  );
}

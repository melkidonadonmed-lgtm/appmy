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

  const data = mesh.userData as Partial<AnatomicalMeshUserData>;
  
  // 1. Verifica se foi explicitamente declarado como âncora ou identificado pelo nome
  const isAnchor =
    data.isAnchor === true ||
    isAxialAnchor(mesh.name, data.nomePt || '', activeRegion);

  let targetOffset = new THREE.Vector3(0, 0, 0);

  if (!isAnchor) {
    if (
      data.eixoExplosao &&
      (data.eixoExplosao[0] !== 0 || data.eixoExplosao[1] !== 0 || data.eixoExplosao[2] !== 0)
    ) {
      let [x, y, z] = data.eixoExplosao;
      // Blindagem Anatômica de Simetria Bilateral:
      // No modelo Z-Anatomy, hemisfério esquerdo (.l) reside em X > 0 e direito (.r) em X < 0.
      // Se a peça for lateralizada (|posX| > 0.01) e o vetor estiver com sinal oposto,
      // corrigimos o sinal de X para acompanhar o lado anatômico real e evitar que cruze a linha média:
      const posX = originalPosition.x;
      if (Math.abs(posX) > 0.01 && Math.abs(x) > 0.001) {
        if (Math.sign(x) !== Math.sign(posX)) {
          x = Math.sign(posX) * Math.abs(x);
        }
      }
      const maxDist = data.distanciaMaxima ?? 1.0;
      targetOffset.set(x, y, z).normalize().multiplyScalar(maxDist);
    } else {
      // Cálculo de dispersão radial inteligente respeitando a simetria corporal baseada na posição original
      const posX = originalPosition.x;
      const posY = originalPosition.y;
      const posZ = originalPosition.z;

      const dirX = Math.abs(posX) > 0.01 ? Math.sign(posX) * (Math.abs(posX) * 2.2 + 0.4) : (Math.random() - 0.5) * 0.4;
      const dirY = posY > 1.35 ? (posY - 1.35) * 1.6 + 0.3 : posY < 0.45 ? -0.4 : 0;
      const dirZ = Math.abs(posZ) > 0.01 ? Math.sign(posZ) * (Math.abs(posZ) * 2.0 + 0.35) : 0.4;

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
    if (b.isAnchor || !b.mesh.visible) {
      // Se for âncora e houver qualquer desvio residual, restaura imediatamente a posição original
      if (b.isAnchor && !b.mesh.position.equals(b.originalPosition)) {
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

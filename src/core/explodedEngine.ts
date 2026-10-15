import * as THREE from 'three';
import { AnatomicalMeshUserData } from '../shared/types/anatomy.ts';

export interface ExplodedNodeBinding {
  mesh: THREE.Mesh;
  originalPosition: THREE.Vector3;
  targetOffset: THREE.Vector3;
  isAnchor: boolean;
}

const NON_AXIAL_STRUCTURE_REGEX =
  /\b(muscle|musculi|músculo|musculo|tract|tractus|trato|fascia|fáscia|bursa|tendon|tendão|aponeurosis|aponeurose|sheath|bainha|artery|arteria|artéria|vein|veia|nerve|nervo|plexus|plexo|ganglion|gânglio|duct|ducto|node|linfonodo|trunk|tronco|branch|ramo|ramus|sinus|seio|gland|glândula|ligament|ligamento)\b/i;

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

  // Músculos, tratos fasciais (ex: Iliotibial tract), vasos e nervos (ex: Ilio-inguinal nerve, Vertebral artery)
  // nunca devem ficar congelados como âncora óssea estática.
  if (NON_AXIAL_STRUCTURE_REGEX.test(nameLower)) {
    return false;
  }

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

  // No corpo inteiro ou demais regiões, a coluna vertebral e a cintura pélvica óssea são a bússola axial
  return (
    nameLower.includes('vertebra') ||
    nameLower.includes('vertebral') ||
    nameLower.includes('intervertebral') ||
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
    nameLower.includes('hip bone') ||
    nameLower.includes('hip_bone') ||
    nameLower.includes('hipbone') ||
    /\bilium\b|\bischium\b|\bpubis\b|\bílio\b|\bísquio\b|\bpúbis\b|\bosso ilíaco\b|\bosso iliaco\b/i.test(nameLower)
  );
}

/**
 * Determina a lateralidade canônica (+1 = Esquerda/+X, -1 = Direita/-X, 0 = Mediano)
 * suportando tanto nomes originais GLTF (ex: "(Deltoid fascia).l") quanto nomes
 * sanitizados pelo Three.js GLTFLoader (ex: "Deltoid_fascial", "VH_F_fat_L").
 */
export function getMeshLaterality(mesh: THREE.Mesh, effectiveCenterX = 0): -1 | 0 | 1 {
  const rawName = ((mesh.userData?.name as string) || mesh.name || '').trim();
  const sanitized = (mesh.name || '').trim();
  const ptName = ((mesh.userData?.nomePt as string) || '').trim();

  if (
    /\.(?:o|e)?\d*l$/i.test(rawName) ||
    /\.(?:o|e)?\d*l$/i.test(sanitized) ||
    /\(left\)/i.test(rawName)
  ) {
    return 1;
  }

  if (
    /\.(?:o|e)?\d*r$/i.test(rawName) ||
    /\.(?:o|e)?\d*r$/i.test(sanitized) ||
    /\(right\)/i.test(rawName)
  ) {
    return -1;
  }

  if (Math.abs(effectiveCenterX) > 0.008) {
    return effectiveCenterX > 0 ? 1 : -1;
  }

  if (/_l$/i.test(rawName) || /_l$/i.test(sanitized) || /\besquerd[oa]\b/i.test(ptName)) {
    return 1;
  }

  if (/_r$/i.test(rawName) || /_r$/i.test(sanitized) || /\bdireit[oa]\b/i.test(ptName)) {
    return -1;
  }

  return 0;
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
 * Vincula matematicamente uma malha Three.js às regras de deslocamento da Exploded View
 * usando funções radiais contínuas C1 sem saltos descontínuos nem perda de proporcionalidade.
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
  const rawMeshName = (mesh.userData?.name as string) || mesh.name;

  // 1. Verifica se foi explicitamente declarado como âncora ou identificado pelo nome
  const isAnchor =
    data.isAnchor === true ||
    isAxialAnchor(rawMeshName, data.nomePt || '', activeRegion);

  const targetOffset = new THREE.Vector3(0, 0, 0);

  if (!isAnchor) {
    const nameLower = (rawMeshName + ' ' + (data.nomePt || '')).toLowerCase();
    const laterality = getMeshLaterality(mesh, effectiveCenter.x);
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
      (data.eixoExplosao[0] !== 0 || data.eixoExplosao[1] !== 0 || data.eixoExplosao[2] !== 0) &&
      !(data as Record<string, unknown>).__isCatalogItem
    ) {
      const [rawX, rawY, rawZ] = data.eixoExplosao;
      const maxDist = data.distanciaMaxima ?? 1.0;

      // Garante expansão centrífuga homolateral (estruturas em +X expandem para +X, em -X para -X),
      // impedindo que estruturas bilaterais cruzem o plano sagital mediano na Exploded View.
      let alignedX = rawX;
      if (Math.abs(rawX) > 0.001) {
        if (laterality !== 0) {
          alignedX = laterality * Math.abs(rawX);
        }
      } else if (laterality !== 0 && Math.abs(rawX) <= 0.001 && data.sistema === 'nervous') {
        alignedX = laterality * Math.max(0.28, Math.abs(effectiveCenter.x) * 2.4);
      }

      const adjustedY =
        data.sistema === 'nervous' && activeRegion !== 'cranium'
          ? rawY * 0.35
          : rawY;
      const adjustedZ =
        data.sistema === 'nervous' && Math.abs(rawZ) < 0.01
          ? (effectiveCenter.z + 0.02) * 1.2
          : rawZ;

      targetOffset.set(alignedX, adjustedY, adjustedZ);
      // Preserva proporcionalidade de vetores sub-unitários, limitando apenas excessos > 1.0
      if (targetOffset.length() > 1.0) {
        targetOffset.normalize();
      }
      targetOffset.multiplyScalar(maxDist);
    } else {
      // Dispersão radial contínua C1, proporcional e estratificada a partir do eixo axial vertebral (X=0, Z=-0.02),
      // sem saltos descontínuos de if/else nem achatamento por normalização unitária.
      const posX = effectiveCenter.x;
      const posY = effectiveCenter.y;
      const posZ = effectiveCenter.z;

      const radialX = Math.abs(posX);
      const smoothXMag = radialX * 1.95 + Math.tanh(radialX * 12.0) * 0.18;
      let dirX = 0;
      if (laterality !== 0) {
        dirX = laterality * Math.max(smoothXMag, 0.12);
      } else if (radialX > 0.001) {
        dirX = Math.sign(posX) * smoothXMag;
      }

      // Gradiente vertical contínuo C1 (sem degrau abrupto em Y = 1.48m)
      let dirY = 0;
      if (activeRegion === 'spine') {
        dirY = (posY - 0.95) * 1.4;
      } else if (activeRegion === 'cranium') {
        dirY = (posY - 1.54) * 1.35;
      } else {
        const baseVertical = (posY - 0.98) * 0.14;
        const cranialSmoothLift = posY > 1.38 ? (posY - 1.38) * 0.62 : 0;
        dirY = baseVertical + cranialSmoothLift;
      }

      // Gradiente anteroposterior contínuo via tanh relativo à coluna (Z = -0.02), zero salto em Z = -0.02
      const relZ = posZ + 0.02;
      let dirZ = relZ * 1.45 + Math.tanh(relZ * 10.0) * 0.08;
      if (Math.abs(dirZ) < 0.04 && laterality === 0) {
        dirZ = 0.12;
      }

      // Se a peça do catálogo possui vetor direcional específico, combina proporcionalmente sem normalizar para 1.0
      if (
        data.eixoExplosao &&
        (data.eixoExplosao[0] !== 0 || data.eixoExplosao[1] !== 0 || data.eixoExplosao[2] !== 0)
      ) {
        const [rawX, rawY, rawZ] = data.eixoExplosao;
        const alignedCatX =
          laterality !== 0 && Math.abs(rawX) > 0.001
            ? laterality * Math.abs(rawX)
            : rawX;
        const catY =
          data.sistema === 'nervous' && activeRegion !== 'cranium' ? rawY * 0.25 : rawY * 0.45;
        const catZ = rawZ * 0.45;

        dirX = dirX * 0.65 + alignedCatX * 0.35;
        dirY = dirY * 0.65 + catY * 0.35;
        dirZ = dirZ * 0.65 + catZ * 0.35;
      }

      // Estratificação linear por camada cirúrgica (1 = Pele mais externa -> 6 = Vísceras internas)
      const layer = data.camadaProfundidade ?? 3;
      const layerFactor =
        layer === 1
          ? 1.32
          : layer === 2
          ? 1.18
          : layer === 3
          ? 1.04
          : layer === 4
          ? 0.94
          : layer === 5
          ? 0.86
          : 0.78;
      const regionFactor = activeRegion === 'cranium' ? 1.35 : 1.0;
      const mult = (data.distanciaMaxima ?? 1.0) * layerFactor * regionFactor;

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
 * Normaliza e avança a porcentagem de Exploded View de forma estritamente linear em passos de 1% (0.01),
 * eliminando resíduos de ponto flutuante IEEE-754.
 */
export function stepExplosionProgressLinear(currentProgress: number, deltaProgress: number): number {
  const next = Math.round((currentProgress + deltaProgress) * 100) / 100;
  return Math.max(0, Math.min(1, next));
}

/**
 * Aplica o deslocamento espacial estritamente linear P(t) = P0 + V_offset * t a todas as malhas vinculadas.
 * Por padrão (lerpFactor = 1.0), o deslocamento é 100% direto e linear sem atraso exponencial.
 */
export function applyExplodedStep(
  bindings: ExplodedNodeBinding[],
  progress: number, // 0.0 (montado) a 1.0 (explodido)
  lerpFactor = 1.0
): void {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const effectiveLerp = Math.max(0.01, Math.min(1, lerpFactor));

  for (let i = 0; i < bindings.length; i++) {
    const b = bindings[i];
    if (b.isAnchor) {
      if (!b.mesh.position.equals(b.originalPosition)) {
        b.mesh.position.copy(b.originalPosition);
      }
      continue;
    }

    const targetX = b.originalPosition.x + b.targetOffset.x * clampedProgress;
    const targetY = b.originalPosition.y + b.targetOffset.y * clampedProgress;
    const targetZ = b.originalPosition.z + b.targetOffset.z * clampedProgress;

    if (!b.mesh.visible || effectiveLerp >= 0.999) {
      b.mesh.position.set(targetX, targetY, targetZ);
      continue;
    }

    const dx = targetX - b.mesh.position.x;
    const dy = targetY - b.mesh.position.y;
    const dz = targetZ - b.mesh.position.z;
    if (dx * dx + dy * dy + dz * dz < 1e-7) {
      b.mesh.position.set(targetX, targetY, targetZ);
      continue;
    }

    b.mesh.position.x = THREE.MathUtils.lerp(b.mesh.position.x, targetX, effectiveLerp);
    b.mesh.position.y = THREE.MathUtils.lerp(b.mesh.position.y, targetY, effectiveLerp);
    b.mesh.position.z = THREE.MathUtils.lerp(b.mesh.position.z, targetZ, effectiveLerp);
  }
}

/**
 * Calcula a posição final exata no espaço 3D para um nó (avaliação linear pontual P0 + V_offset * t)
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

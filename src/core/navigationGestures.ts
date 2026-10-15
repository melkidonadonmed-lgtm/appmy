import * as THREE from 'three';

export type TwoFingerNavigationMode = 'pan-rotate' | 'zoom';
export type TwoFingerMode = TwoFingerNavigationMode;

export interface TouchPoint2D {
  x: number;
  y: number;
}

export interface TwoFingerGestureState {
  midX: number;
  midY: number;
  distance: number;
  angle: number;
}
export type TwoFingerMetrics = TwoFingerGestureState;

export interface TwoFingerGestureDelta {
  verticalPanDelta: number;
  azimuthRotateDelta: number;
  dollyScale: number;
}

export interface NavigationRigBounds {
  minY?: number;
  maxY?: number;
  minDistance?: number;
  maxDistance?: number;
}

const DEFAULT_BOUNDS: Required<NavigationRigBounds> = {
  minY: -1.55,
  maxY: 1.85,
  minDistance: 0.35,
  maxDistance: 12.0,
};

/**
 * Extrai ponto médio, distância (pinça) e ângulo de torção entre 2 dedos na tela.
 */
export function computeTwoFingerMetrics(
  p1: TouchPoint2D,
  p2: TouchPoint2D
): TwoFingerGestureState {
  const midX = (p1.x + p2.x) * 0.5;
  const midY = (p1.y + p2.y) * 0.5;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distance = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  return { midX, midY, distance, angle };
}

/**
 * Calcula o delta simultâneo de:
 * 1. Elevação vertical (segurar com 2 dedos para cima e para baixo -> sobe/desce pelo eixo anatômico Y)
 * 2. Rotação 360° (arraste horizontal com 2 dedos ou giro/torção entre os 2 dedos -> gira o modelo)
 * 3. Pinça (aproximar/afastar os 2 dedos -> zoom)
 */
export function computeTwoFingerTouchDelta(
  prev: TwoFingerGestureState,
  curr: TwoFingerGestureState,
  viewportWidth = 1024,
  viewportHeight = 768
): TwoFingerGestureDelta {
  const safeW = Math.max(240, viewportWidth);
  const safeH = Math.max(240, viewportHeight);

  const dMidX = curr.midX - prev.midX;
  const dMidY = curr.midY - prev.midY;

  // Elevação vertical: arrastar 2 dedos para cima/baixo move a câmera ao longo da altura corporal
  const verticalPanDelta = THREE.MathUtils.clamp((dMidY / safeH) * 2.4, -0.25, 0.25);

  // Diferença angular curta (-PI a +PI) para rotação por giro de 2 dedos
  const rawAngleDiff = curr.angle - prev.angle;
  const normalizedTwist = Math.atan2(Math.sin(rawAngleDiff), Math.cos(rawAngleDiff));

  // Rotação horizontal combinada (deslocamento lateral dos 2 dedos + torção angular)
  const horizRotate = -(dMidX / safeW) * Math.PI * 1.75;
  const twistRotate = -normalizedTwist * 0.85;
  const azimuthRotateDelta = THREE.MathUtils.clamp(horizRotate + twistRotate, -0.35, 0.35);

  // Escala de pinça (zoom)
  let dollyScale = 1.0;
  if (prev.distance > 12 && curr.distance > 12) {
    dollyScale = THREE.MathUtils.clamp(prev.distance / curr.distance, 0.85, 1.18);
  }

  return {
    verticalPanDelta,
    azimuthRotateDelta,
    dollyScale,
  };
}

/**
 * Calcula o delta para gestos de 2 dedos em Trackpad / Touchpad (eventos wheel)
 * suportando subida/descida vertical (deltaY), rotação 360° (deltaX ou Shift+deltaY)
 * e zoom por pinça (ctrlKey).
 */
export function computeTrackpadTwoFingerDelta(
  deltaX: number,
  deltaY: number,
  ctrlKey = false,
  shiftKey = false,
  mode: TwoFingerNavigationMode = 'pan-rotate'
): TwoFingerGestureDelta {
  if (ctrlKey || mode === 'zoom') {
    const clampedY = THREE.MathUtils.clamp(deltaY, -120, 120);
    const dollyScale = Math.pow(1.0022, clampedY);
    const azimuthRotateDelta =
      !ctrlKey && Math.abs(deltaX) > 0.2
        ? THREE.MathUtils.clamp(-deltaX * 0.0045, -0.2, 0.2)
        : 0;
    return {
      verticalPanDelta: 0,
      azimuthRotateDelta,
      dollyScale,
    };
  }

  // Modo 'pan-rotate' (2 dedos no trackpad: cima/baixo = elevação vertical; lados ou Shift = rotação)
  const effectiveHoriz = shiftKey && Math.abs(deltaX) < 0.5 ? deltaY : deltaX;
  const effectiveVert = shiftKey && Math.abs(deltaX) < 0.5 ? 0 : deltaY;

  const verticalPanDelta = THREE.MathUtils.clamp(-effectiveVert * 0.0026, -0.16, 0.16);
  const azimuthRotateDelta = THREE.MathUtils.clamp(-effectiveHoriz * 0.0052, -0.22, 0.22);

  return {
    verticalPanDelta,
    azimuthRotateDelta,
    dollyScale: 1.0,
  };
}

/**
 * Aplica de forma determinística o delta de navegação 3D (elevação Y + rotação azimutal + zoom)
 * sobre a câmera e o ponto focal (target) do OrbitControls, respeitando limites anatômicos seguros.
 */
export function applyNavigationDeltaToRig(
  camera: THREE.Camera,
  target: THREE.Vector3,
  delta: TwoFingerGestureDelta,
  bounds?: NavigationRigBounds
): void {
  const cfg = { ...DEFAULT_BOUNDS, ...bounds };

  // 1. Translação vertical (Cranial <-> Caudal) preservando o ângulo de visão
  if (Math.abs(delta.verticalPanDelta) > 1e-6) {
    const nextTargetY = THREE.MathUtils.clamp(
      target.y + delta.verticalPanDelta,
      cfg.minY,
      cfg.maxY
    );
    const appliedDeltaY = nextTargetY - target.y;
    target.y = nextTargetY;
    camera.position.y += appliedDeltaY;
  }

  // 2. Rotação azimutal (Turntable 360°) e Zoom (Dolly) em coordenadas esféricas relativas ao target
  if (Math.abs(delta.azimuthRotateDelta) > 1e-6 || Math.abs(delta.dollyScale - 1.0) > 1e-5) {
    const offset = new THREE.Vector3().subVectors(camera.position, target);
    const spherical = new THREE.Spherical().setFromVector3(offset);

    spherical.theta += delta.azimuthRotateDelta;
    spherical.radius = THREE.MathUtils.clamp(
      spherical.radius * delta.dollyScale,
      cfg.minDistance,
      cfg.maxDistance
    );
    spherical.makeSafe();

    offset.setFromSpherical(spherical);
    camera.position.copy(target).add(offset);
  }

  camera.lookAt(target);
}

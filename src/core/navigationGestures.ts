import * as THREE from 'three';

export type TwoFingerNavigationMode = 'pan-rotate' | 'zoom';
export type TwoFingerMode = TwoFingerNavigationMode;
export type TwoFingerGestureIntent = 'unlocked' | 'pan' | 'rotate' | 'pinch';
export type CameraInteractionMode = 'rotate' | 'pan';
export type AnatomicalCameraPreset =
  | 'front'
  | 'back'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'reset';

export interface TouchPoint2D {
  x: number;
  y: number;
}

export interface TwoFingerGestureState {
  midX: number;
  midY: number;
  distance: number;
  angle: number;
  lockedIntent?: TwoFingerGestureIntent;
}
export type TwoFingerMetrics = TwoFingerGestureState;

export interface TwoFingerGestureDelta {
  verticalPanDelta: number;
  azimuthRotateDelta: number;
  dollyScale: number;
  lockedIntent?: TwoFingerGestureIntent;
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
 * Calcula posição e alvo de câmera para vistas anatômicas ortogonais/perspectivas padrão.
 */
export function computeAnatomicalCameraView(
  preset: AnatomicalCameraPreset,
  currentTarget: [number, number, number] = [0, 0, 0],
  distance = 4.2
): { position: [number, number, number]; target: [number, number, number] } {
  const safeDist = THREE.MathUtils.clamp(distance, DEFAULT_BOUNDS.minDistance, DEFAULT_BOUNDS.maxDistance);
  const [tx, ty, tz] = preset === 'reset' ? [0, 0, 0] : currentTarget;

  switch (preset) {
    case 'front':
      return { position: [tx, ty + 0.15, tz + safeDist], target: [tx, ty, tz] };
    case 'back':
      return { position: [tx, ty + 0.15, tz - safeDist], target: [tx, ty, tz] };
    case 'right':
      // Lado Direito Anatômico do paciente (-X no referencial Z-Anatomy)
      return { position: [tx - safeDist, ty + 0.1, tz], target: [tx, ty, tz] };
    case 'left':
      // Lado Esquerdo Anatômico do paciente (+X no referencial Z-Anatomy)
      return { position: [tx + safeDist, ty + 0.1, tz], target: [tx, ty, tz] };
    case 'top':
      return { position: [tx, ty + safeDist, tz + 0.25], target: [tx, ty, tz] };
    case 'bottom':
      return { position: [tx, ty - safeDist, tz + 0.25], target: [tx, ty, tz] };
    case 'reset':
    default:
      return { position: [2.5, 2.2, 4.5], target: [0, 0, 0] };
  }
}

/**
 * Extrai ponto médio, distância (pinça) e ângulo de torção entre 2 dedos na tela.
 */
export function computeTwoFingerMetrics(
  p1: TouchPoint2D,
  p2: TouchPoint2D,
  lockedIntent: TwoFingerGestureIntent = 'unlocked'
): TwoFingerGestureState {
  const midX = (p1.x + p2.x) * 0.5;
  const midY = (p1.y + p2.y) * 0.5;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distance = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  return { midX, midY, distance, angle, lockedIntent };
}

/**
 * Calcula o delta de gesto de 2 dedos com Gesture Locking determinístico:
 * Evita que a pinça (zoom), a elevação vertical (pan Y) e a rotação azimutal (360°)
 * disparem simultaneamente e causem instabilidade visual.
 */
export function computeTwoFingerTouchDelta(
  prev: TwoFingerGestureState,
  curr: TwoFingerGestureState,
  viewportWidthOrMode: number | TwoFingerNavigationMode = 1024,
  viewportHeight = 768
): TwoFingerGestureDelta {
  const mode: TwoFingerNavigationMode =
    typeof viewportWidthOrMode === 'string' ? viewportWidthOrMode : 'pan-rotate';
  const numericWidth = typeof viewportWidthOrMode === 'number' ? viewportWidthOrMode : 1024;
  const safeW = Math.max(240, numericWidth);
  const safeH = Math.max(240, viewportHeight);

  const dMidX = curr.midX - prev.midX;
  const dMidY = curr.midY - prev.midY;
  const absMidX = Math.abs(dMidX);
  const absMidY = Math.abs(dMidY);
  const distDelta = Math.abs(curr.distance - prev.distance);

  const rawAngleDiff = curr.angle - prev.angle;
  const normalizedTwist = Math.atan2(Math.sin(rawAngleDiff), Math.cos(rawAngleDiff));

  // Classificação de intenção dominante com Gesture Lock para impedir mistura de eixos
  let intent: TwoFingerGestureIntent = prev.lockedIntent || curr.lockedIntent || 'unlocked';
  if (intent === 'unlocked') {
    if (mode === 'zoom') {
      intent = 'pinch';
    } else if (distDelta > 6 && distDelta > absMidX * 0.85 && distDelta > absMidY * 0.85) {
      intent = 'pinch';
    } else if (absMidY > absMidX * 1.25 && absMidY > 1.5) {
      intent = 'pan';
    } else if ((absMidX > absMidY * 1.25 && absMidX > 1.5) || Math.abs(normalizedTwist) > 0.035) {
      intent = 'rotate';
    }
  }

  let verticalPanDelta = 0;
  let azimuthRotateDelta = 0;
  let dollyScale = 1.0;

  if (intent === 'pinch') {
    if (prev.distance > 12 && curr.distance > 12) {
      dollyScale = THREE.MathUtils.clamp(prev.distance / curr.distance, 0.85, 1.18);
    }
  } else if (intent === 'pan') {
    verticalPanDelta = THREE.MathUtils.clamp((dMidY / safeH) * 2.4, -0.25, 0.25);
  } else if (intent === 'rotate') {
    const horizRotate = -(dMidX / safeW) * Math.PI * 1.75;
    const twistRotate = -normalizedTwist * 0.55;
    azimuthRotateDelta = THREE.MathUtils.clamp(horizRotate + twistRotate, -0.35, 0.35);
  } else {
    // Micro-movimento abaixo do limiar de bloqueio
    verticalPanDelta = THREE.MathUtils.clamp((dMidY / safeH) * 2.4, -0.25, 0.25);
    const horizRotate = -(dMidX / safeW) * Math.PI * 1.75;
    azimuthRotateDelta = THREE.MathUtils.clamp(horizRotate, -0.35, 0.35);
    if (prev.distance > 12 && curr.distance > 12) {
      dollyScale = THREE.MathUtils.clamp(prev.distance / curr.distance, 0.85, 1.18);
    }
  }

  return {
    verticalPanDelta,
    azimuthRotateDelta,
    dollyScale,
    lockedIntent: intent,
  };
}

/**
 * Calcula o delta para gestos de 2 dedos em Trackpad / Touchpad / Roda de Mouse (eventos wheel)
 * normalizando deltaMode (0 = pixels, 1 = linhas, 2 = páginas).
 */
export function computeTrackpadTwoFingerDelta(
  deltaX: number,
  deltaY: number,
  ctrlKey = false,
  shiftKey = false,
  mode: TwoFingerNavigationMode = 'pan-rotate',
  deltaMode = 0
): TwoFingerGestureDelta {
  const modeMultiplier = deltaMode === 1 ? 16 : deltaMode === 2 ? 100 : 1;
  const normX = deltaX * modeMultiplier;
  const normY = deltaY * modeMultiplier;

  // Se o usuário segura Shift com roda vertical (deltaX ~ 0) no modo zoom, eleva/desce o corpo no eixo Y
  if (mode === 'zoom' && shiftKey && !ctrlKey && Math.abs(normX) < 0.5) {
    const verticalPanDelta = THREE.MathUtils.clamp(-normY * 0.0032, -0.22, 0.22);
    return {
      verticalPanDelta,
      azimuthRotateDelta: 0,
      dollyScale: 1.0,
      lockedIntent: 'pan',
    };
  }

  if (ctrlKey || mode === 'zoom') {
    const clampedY = THREE.MathUtils.clamp(normY, -120, 120);
    const dollyScale = Math.pow(1.0022, clampedY);
    const azimuthRotateDelta =
      !ctrlKey && Math.abs(normX) > 0.2
        ? THREE.MathUtils.clamp(-normX * 0.0045, -0.2, 0.2)
        : 0;
    return {
      verticalPanDelta: 0,
      azimuthRotateDelta,
      dollyScale,
      lockedIntent: 'pinch',
    };
  }

  // Modo 'pan-rotate' com isolamento do eixo dominante quando um eixo supera o outro em >2.4x
  const effectiveHoriz = shiftKey && Math.abs(normX) < 0.5 ? normY : normX;
  const effectiveVert = shiftKey && Math.abs(normX) < 0.5 ? 0 : normY;

  const absH = Math.abs(effectiveHoriz);
  const absV = Math.abs(effectiveVert);

  const verticalPanDelta =
    absH > absV * 2.4
      ? 0
      : THREE.MathUtils.clamp(-effectiveVert * 0.0026, -0.16, 0.16);
  const azimuthRotateDelta =
    absV > absH * 2.4
      ? 0
      : THREE.MathUtils.clamp(-effectiveHoriz * 0.0052, -0.22, 0.22);

  return {
    verticalPanDelta,
    azimuthRotateDelta,
    dollyScale: 1.0,
    lockedIntent: absV >= absH ? 'pan' : 'rotate',
  };
}

const _rigOffsetVec = new THREE.Vector3();
const _rigSpherical = new THREE.Spherical();

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
    _rigOffsetVec.subVectors(camera.position, target);
    _rigSpherical.setFromVector3(_rigOffsetVec);

    _rigSpherical.theta += delta.azimuthRotateDelta;
    _rigSpherical.radius = THREE.MathUtils.clamp(
      _rigSpherical.radius * delta.dollyScale,
      cfg.minDistance,
      cfg.maxDistance
    );
    _rigSpherical.makeSafe();

    _rigOffsetVec.setFromSpherical(_rigSpherical);
    camera.position.copy(target).add(_rigOffsetVec);
  }

  camera.lookAt(target);
}

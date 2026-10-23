import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { AnatomicalAtlasScene, ActiveAnatomicalSystem, AnyAnatomicalNode, AnatomicalRegion } from './AnatomicalAtlasScene.tsx';
import { DissectionController } from './DissectionController.tsx';
import { TelemetryCollector } from '../telemetry/TelemetryOverlay.tsx';
import { SkullDivision } from '../../../shared/constants/cranium.ts';
import { DissectionState } from '../../../shared/types/dissection.ts';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import {
  TwoFingerMetrics,
  computeTwoFingerMetrics,
  computeTwoFingerTouchDelta,
  computeTrackpadTwoFingerDelta,
  applyNavigationDeltaToRig,
} from '../../../core/navigationGestures.ts';
import { computeFrameIndependentLerpAlpha } from '../../../core/explodedEngine.ts';

interface SceneCanvasProps {
  viewType: 'exploded' | 'realistic';
  realSkullOpacity?: number;
  explosionProgress: number;
  selectedNode: AnyAnatomicalNode | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  activeDivision: SkullDivision | 'all';
  activeSystem: ActiveAnatomicalSystem;
  activeRegion?: AnatomicalRegion;
  layerPeelingLevel: number;
  dissection: DissectionState;
  onTelemetryUpdate: (data: { fps: number; triangles: number; drawCalls: number }) => void;
}

/**
 * Controlador de Câmera Suave + Gestos de 2 Dedos (Touchscreen e Trackpad):
 * - Segurar/deslizar com 2 dedos para cima e para baixo: elevação vertical (pan craniocaudal no eixo Y)
 * - Deslizar 2 dedos na horizontal ou girar os 2 dedos: rotação orbital azimutal (turntable 360°)
 * - Pinça com 2 dedos (ou Ctrl+Scroll): zoom in/out progressivo
 */
function SmoothCameraController({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { scene, camera, gl } = useThree();
  if (typeof window !== 'undefined') {
    (window as unknown as { __threeScene?: THREE.Scene }).__threeScene = scene;
  }
  const cameraFocusTarget = useAnatomyStore((s) => s.cameraFocusTarget);
  const cameraPositionTarget = useAnatomyStore((s) => s.cameraPositionTarget);
  const cameraGestureNudge = useAnatomyStore((s) => s.cameraGestureNudge);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);
  const setCameraPositionTarget = useAnatomyStore((s) => s.setCameraPositionTarget);
  const lastNudgeSeqRef = useRef<number>(0);

  useEffect(() => {
    if (!cameraGestureNudge || cameraGestureNudge.seq === lastNudgeSeqRef.current) return;
    lastNudgeSeqRef.current = cameraGestureNudge.seq;
    if (controlsRef.current) {
      applyNavigationDeltaToRig(camera, controlsRef.current.target, cameraGestureNudge);
      controlsRef.current.update();
    }
  }, [cameraGestureNudge, camera, controlsRef]);

  useEffect(() => {
    const dom = gl.domElement;
    if (!dom) return;

    let prevTouchMetrics: TwoFingerMetrics | null = null;

    const clearAutoCameraTargets = () => {
      const st = useAnatomyStore.getState();
      if (st.cameraFocusTarget) st.setCameraFocusTarget(null);
      if (st.cameraPositionTarget) st.setCameraPositionTarget(null);
    };

    const handleTouchStart = (e: TouchEvent) => {
      clearAutoCameraTargets();
      if (e.touches.length === 2) {
        e.preventDefault();
        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        prevTouchMetrics = computeTwoFingerMetrics(
          { x: t0.clientX, y: t0.clientY },
          { x: t1.clientX, y: t1.clientY }
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && controlsRef.current) {
        e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const currMetrics = computeTwoFingerMetrics(
          { x: t0.clientX, y: t0.clientY },
          { x: t1.clientX, y: t1.clientY },
          prevTouchMetrics?.lockedIntent || 'unlocked'
        );
        if (prevTouchMetrics) {
          const delta = computeTwoFingerTouchDelta(
            prevTouchMetrics,
            currMetrics,
            dom.clientWidth || 800,
            dom.clientHeight || 600
          );
          currMetrics.lockedIntent = delta.lockedIntent;
          applyNavigationDeltaToRig(camera, controlsRef.current.target, delta);
          controlsRef.current.update();
        }
        prevTouchMetrics = currMetrics;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        prevTouchMetrics = null;
        if (controlsRef.current) {
          controlsRef.current.update();
          controlsRef.current.enabled = true;
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!controlsRef.current) return;
      clearAutoCameraTargets();
      e.preventDefault();
      e.stopPropagation();

      const mode = useAnatomyStore.getState().twoFingerMode;
      // Roda física de mouse vertical (deltaX zero, sem Shift) ou modo 'zoom' aplica zoom direto
      const isPhysicalMouseWheel =
        Math.abs(e.deltaX) < 0.5 && !e.shiftKey && (e.deltaMode === 1 || Math.abs(e.deltaY) >= 40);
      const isPinchOrAltZoom = e.ctrlKey || e.metaKey || e.altKey || isPhysicalMouseWheel;
      const delta = computeTrackpadTwoFingerDelta(
        e.deltaX,
        e.deltaY,
        isPinchOrAltZoom,
        e.shiftKey,
        mode,
        e.deltaMode
      );
      applyNavigationDeltaToRig(camera, controlsRef.current.target, delta);
      controlsRef.current.update();
    };

    dom.addEventListener('touchstart', handleTouchStart, { passive: false });
    dom.addEventListener('touchmove', handleTouchMove, { passive: false });
    dom.addEventListener('touchend', handleTouchEnd);
    dom.addEventListener('touchcancel', handleTouchEnd);
    dom.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      dom.removeEventListener('touchstart', handleTouchStart);
      dom.removeEventListener('touchmove', handleTouchMove);
      dom.removeEventListener('touchend', handleTouchEnd);
      dom.removeEventListener('touchcancel', handleTouchEnd);
      dom.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions);
    };
  }, [gl, camera, controlsRef]);

  useFrame(({ camera: frameCamera }, delta) => {
    const dampAlpha = computeFrameIndependentLerpAlpha(delta);
    if (controlsRef.current && cameraFocusTarget) {
      const [tx, ty, tz] = cameraFocusTarget;
      const targetVec = controlsRef.current.target;

      targetVec.x = THREE.MathUtils.lerp(targetVec.x, tx, dampAlpha);
      targetVec.y = THREE.MathUtils.lerp(targetVec.y, ty, dampAlpha);
      targetVec.z = THREE.MathUtils.lerp(targetVec.z, tz, dampAlpha);

      controlsRef.current.update();

      const distSq = (targetVec.x - tx) ** 2 + (targetVec.y - ty) ** 2 + (targetVec.z - tz) ** 2;
      if (distSq < 0.0001) {
        targetVec.set(tx, ty, tz);
        setCameraFocusTarget(null);
      }
    }

    if (cameraPositionTarget) {
      const [px, py, pz] = cameraPositionTarget;
      frameCamera.position.x = THREE.MathUtils.lerp(frameCamera.position.x, px, dampAlpha);
      frameCamera.position.y = THREE.MathUtils.lerp(frameCamera.position.y, py, dampAlpha);
      frameCamera.position.z = THREE.MathUtils.lerp(frameCamera.position.z, pz, dampAlpha);
      controlsRef.current?.update();

      const pDistSq = (frameCamera.position.x - px) ** 2 + (frameCamera.position.y - py) ** 2 + (frameCamera.position.z - pz) ** 2;
      if (pDistSq < 0.0001) {
        frameCamera.position.set(px, py, pz);
        controlsRef.current?.update();
        setCameraPositionTarget(null);
      }
    }
  });

  return null;
}

export function SceneCanvas({
  viewType,
  realSkullOpacity = 1.0,
  explosionProgress,
  selectedNode,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  activeDivision,
  activeSystem,
  activeRegion = 'all',
  layerPeelingLevel,
  dissection,
  onTelemetryUpdate,
}: SceneCanvasProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="canvas-wrapper">
      <Canvas
        camera={{ position: [2.5, 2.2, 4.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          localClippingEnabled: true,
        }}
        onCreated={({ gl, scene }) => {
          (window as unknown as { __threeScene?: THREE.Scene }).__threeScene = scene;
          const dom = gl.domElement;
          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn('[WebGL] Contexto perdido. Recursos protegidos da VRAM.');
          };
          const handleContextRestored = () => {
            console.info('[WebGL] Contexto restaurado com sucesso.');
          };

          dom.addEventListener('webglcontextlost', handleContextLost, false);
          dom.addEventListener('webglcontextrestored', handleContextRestored, false);
        }}
        onPointerMissed={() => onSelectNode(null)}
      >
        <color attach="background" args={['#0a0f1d']} />

        {/* Coletor de métricas para a Telemetria */}
        <TelemetryCollector onUpdate={onTelemetryUpdate} />

        {/* Controlador de Dissecção Tomográfica Multiplanar e Shaders */}
        <DissectionController dissection={dissection} />

        {/* Iluminação de Estúdio Anatômico Equilibrada (sem estouramento de brancos) */}
        <ambientLight intensity={0.48} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.88}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, -2, -4]} intensity={0.32} color="#60a5fa" />
        <pointLight position={[0, 4, 0]} intensity={0.28} />

        {/* Iluminação IBL ambiental controlada para relevo 3D vívido */}
        <Environment preset="city" environmentIntensity={0.35} />

        <Suspense fallback={null}>
          <Center cacheKey={viewType}>
            <AnatomicalAtlasScene
              viewType={viewType}
              realSkullOpacity={realSkullOpacity}
              explosionProgress={explosionProgress}
              selectedNodeId={selectedNode?.id || null}
              onSelectNode={onSelectNode}
              ghostMode={ghostMode}
              isolatedOnly={isolatedOnly}
              activeDivision={activeDivision}
              activeSystem={activeSystem}
              activeRegion={activeRegion}
              layerPeelingLevel={layerPeelingLevel}
              visualMode={dissection.visualMode}
            />
          </Center>
        </Suspense>

        {/* Grid de referência espacial anatômica */}
        <gridHelper
          args={[10, 20, '#1e293b', '#0f172a']}
          position={[0, -1.8, 0]}
        />

        {/* Controles de Câmera e Foco Suave Automático */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          enablePan
          screenSpacePanning
          rotateSpeed={0.85}
          panSpeed={0.95}
          minDistance={0.35}
          maxDistance={12}
          maxPolarAngle={Math.PI}
          onStart={() => {
            const st = useAnatomyStore.getState();
            if (st.cameraFocusTarget) st.setCameraFocusTarget(null);
            if (st.cameraPositionTarget) st.setCameraPositionTarget(null);
          }}
        />
        <SmoothCameraController controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
}

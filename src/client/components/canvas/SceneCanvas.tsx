import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { AnatomicalAtlasScene, ActiveAnatomicalSystem, AnyAnatomicalNode, AnatomicalRegion } from './AnatomicalAtlasScene.tsx';
import { DissectionController } from './DissectionController.tsx';
import { TelemetryCollector } from '../telemetry/TelemetryOverlay.tsx';
import { SkullDivision } from '../../../shared/constants/cranium.ts';
import { DissectionState } from '../../../shared/types/dissection.ts';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';

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
 * Anima suavemente o ponto focal (target) do OrbitControls quando uma nova
 * estrutura for selecionada na árvore ou no viewport 3D.
 */
function SmoothCameraController({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const cameraFocusTarget = useAnatomyStore((s) => s.cameraFocusTarget);
  const cameraPositionTarget = useAnatomyStore((s) => s.cameraPositionTarget);

  useFrame(({ camera }) => {
    if (controlsRef.current && cameraFocusTarget) {
      const [tx, ty, tz] = cameraFocusTarget;
      const targetVec = controlsRef.current.target;

      targetVec.x = THREE.MathUtils.lerp(targetVec.x, tx, 0.08);
      targetVec.y = THREE.MathUtils.lerp(targetVec.y, ty, 0.08);
      targetVec.z = THREE.MathUtils.lerp(targetVec.z, tz, 0.08);

      controlsRef.current.update();
    }

    if (cameraPositionTarget) {
      const [px, py, pz] = cameraPositionTarget;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, px, 0.08);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, py, 0.08);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, pz, 0.08);
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
        onPointerMissed={() => onSelectNode(null)}
      >
        <color attach="background" args={['#0a0f1d']} />

        {/* Coletor de métricas para a Telemetria */}
        <TelemetryCollector onUpdate={onTelemetryUpdate} />

        {/* Controlador de Dissecção Tomográfica Multiplanar e Shaders */}
        <DissectionController dissection={dissection} />

        {/* Iluminação de Estúdio Anatômico */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, -2, -4]} intensity={0.4} color="#60a5fa" />
        <pointLight position={[0, 4, 0]} intensity={0.5} />

        {/* Iluminação IBL ambiental para relevo 3D vívido */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Center>
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
          minDistance={1.2}
          maxDistance={12}
          maxPolarAngle={Math.PI / 1.8}
        />
        <SmoothCameraController controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
}

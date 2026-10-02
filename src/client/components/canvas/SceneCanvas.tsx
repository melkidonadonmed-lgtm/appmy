import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ExplodedCraniumScene } from './ExplodedCraniumScene.tsx';
import { DissectionController } from './DissectionController.tsx';
import { TelemetryCollector } from '../telemetry/TelemetryOverlay.tsx';
import { SkullDivision } from '../../../shared/constants/cranium.ts';
import { DissectionState } from '../../../shared/types/dissection.ts';
import { RealCraniumModel } from './RealCraniumModel.tsx';
import { ActiveAnatomicalSystem, AnyAnatomicalNode } from './ExplodedCraniumScene.tsx';

interface SceneCanvasProps {
  viewType: 'exploded' | 'realistic';
  explosionProgress: number;
  selectedNode: AnyAnatomicalNode | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  isolatedOnly: boolean;
  activeDivision: SkullDivision | 'all';
  activeSystem: ActiveAnatomicalSystem;
  layerPeelingLevel: number;
  dissection: DissectionState;
  onTelemetryUpdate: (data: { fps: number; triangles: number; drawCalls: number }) => void;
}

export function SceneCanvas({
  viewType,
  explosionProgress,
  selectedNode,
  onSelectNode,
  ghostMode,
  isolatedOnly,
  activeDivision,
  activeSystem,
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
          {viewType === 'realistic' ? (
            <RealCraniumModel
              onSelectNode={() => {
                onSelectNode({
                  id: 'fma:cranium_overview',
                  fmaId: 'FMA:46565',
                  namePtBr: 'Crânio Humano (Visão Geral)',
                  nameLatin: 'Cranium',
                  chapter: 2,
                  systemName: 'Sistema Esquelético',
                  meshName: 'skull',
                  division: 'neurocranium',
                  paired: false,
                  clinicalData: {
                    clinicalSignificance: 'Arcabouço ósseo composto por 22 ossos divididos em Neurocrânio e Viscerocrânio.',
                  },
                });
              }}
            />
          ) : (
            <Center>
              <ExplodedCraniumScene
                explosionProgress={explosionProgress}
                selectedNodeId={selectedNode?.id || null}
                onSelectNode={onSelectNode}
                ghostMode={ghostMode}
                isolatedOnly={isolatedOnly}
                activeDivision={activeDivision}
                activeSystem={activeSystem}
                layerPeelingLevel={layerPeelingLevel}
                visualMode={dissection.visualMode}
              />
            </Center>
          )}
        </Suspense>

        {/* Grid de referência espacial anatômica */}
        <gridHelper
          args={[10, 20, '#1e293b', '#0f172a']}
          position={[0, -1.8, 0]}
        />

        {/* Controles de Câmera */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={1.2}
          maxDistance={12}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}

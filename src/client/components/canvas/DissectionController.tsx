import { useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { getPlaneVectorDef } from '../../lib/dissection-planes.ts';
import { DissectionPlaneHelper } from './DissectionPlaneHelper.tsx';
import { DissectionState } from '../../../shared/types/dissection.ts';

interface DissectionControllerProps {
  dissection: DissectionState;
}

export function DissectionController({ dissection }: DissectionControllerProps) {
  const { gl, invalidate } = useThree();
  const planeRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0));
  const planesArrayRef = useRef<THREE.Plane[]>([planeRef.current]);

  // Atualiza os coeficientes do plano em memória (Zero-Allocation) no mesmo ciclo da renderização
  const isMprActive = dissection.visualMode === 'mpr';
  if (isMprActive) {
    const def = getPlaneVectorDef(dissection.activePlane, dissection.offset, dissection.inverted);
    planeRef.current.normal.set(def.normal.x, def.normal.y, def.normal.z);
    planeRef.current.constant = def.constant;
  }

  // Habilita recorte local no WebGLRenderer e limpa apenas no unmount real
  useEffect(() => {
    gl.localClippingEnabled = true;
    return () => {
      gl.clippingPlanes = [];
    };
  }, [gl]);

  // Sincroniza gl.clippingPlanes antes da pintura do frame (useLayoutEffect) sem zerar o array entre ticks do slider
  useLayoutEffect(() => {
    if (isMprActive) {
      const def = getPlaneVectorDef(dissection.activePlane, dissection.offset, dissection.inverted);
      planeRef.current.normal.set(def.normal.x, def.normal.y, def.normal.z);
      planeRef.current.constant = def.constant;
      if (gl.clippingPlanes !== planesArrayRef.current) {
        gl.clippingPlanes = planesArrayRef.current;
      }
    } else if (gl.clippingPlanes.length > 0) {
      gl.clippingPlanes = [];
    }
    invalidate();
  }, [gl, invalidate, isMprActive, dissection.activePlane, dissection.offset, dissection.inverted]);

  return (
    <>
      {isMprActive && (
        <DissectionPlaneHelper
          planeType={dissection.activePlane}
          offset={dissection.offset}
          inverted={dissection.inverted}
          visible={dissection.showHelper}
        />
      )}
    </>
  );
}

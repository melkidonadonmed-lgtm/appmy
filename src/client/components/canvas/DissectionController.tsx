import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { computeClippingPlane } from '../../lib/dissection-planes.ts';
import { DissectionPlaneHelper } from './DissectionPlaneHelper.tsx';
import { DissectionState } from '../../../shared/types/dissection.ts';

interface DissectionControllerProps {
  dissection: DissectionState;
}

export function DissectionController({ dissection }: DissectionControllerProps) {
  const { gl } = useThree();

  // Habilita recorte local no WebGLRenderer
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  // Calcula o plano de corte ativo com base na matemática tomográfica
  const clippingPlane = useMemo(() => {
    if (dissection.visualMode !== 'mpr') return null;
    return computeClippingPlane(dissection.activePlane, dissection.offset, dissection.inverted);
  }, [dissection.visualMode, dissection.activePlane, dissection.offset, dissection.inverted]);

  // Aplica os planos de corte globais ao renderer Three.js
  useEffect(() => {
    if (clippingPlane) {
      gl.clippingPlanes = [clippingPlane];
    } else {
      gl.clippingPlanes = [];
    }
    return () => {
      gl.clippingPlanes = [];
    };
  }, [gl, clippingPlane]);

  return (
    <>
      {dissection.visualMode === 'mpr' && (
        <DissectionPlaneHelper
          planeType={dissection.activePlane}
          offset={dissection.offset}
          visible={dissection.showHelper}
        />
      )}
    </>
  );
}

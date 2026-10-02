import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  computeClippingPlane,
  getPlaneVectorDef,
  isPointClipped,
  getAnatomicalLandmark,
  SAGITTAL_LANDMARKS,
  CORONAL_LANDMARKS,
  AXIAL_LANDMARKS,
} from '../src/client/lib/dissection-planes.ts';

describe('Engenharia de Dissecção Tomográfica Multiplanar (MPR)', () => {
  it('deve calcular corretamente os vetores normais e constantes dos planos Sagital, Coronal e Axial', () => {
    // 1. Sagital não invertido (normal = (-1, 0, 0), constant = offset)
    const sagDef = getPlaneVectorDef('sagittal', 0.5, false);
    expect(sagDef.normal).toEqual({ x: -1, y: 0, z: 0 });
    expect(sagDef.constant).toBe(0.5);

    // 2. Coronal invertido (normal = (0, 0, 1), constant = -offset)
    const corDef = getPlaneVectorDef('coronal', -0.3, true);
    expect(corDef.normal).toEqual({ x: 0, y: 0, z: 1 });
    expect(corDef.constant).toBe(0.3);

    // 3. Axial não invertido (normal = (0, -1, 0), constant = offset)
    const axDef = getPlaneVectorDef('axial', 1.2, false);
    expect(axDef.normal).toEqual({ x: 0, y: -1, z: 0 });
    expect(axDef.constant).toBe(1.2);
  });

  it('deve instanciar objetos THREE.Plane com normais unitárias válidas', () => {
    const plane = computeClippingPlane('sagittal', 0.0, false);
    expect(plane).toBeInstanceOf(THREE.Plane);
    expect(plane.normal.length()).toBeCloseTo(1.0, 5);
    expect(plane.constant).toBe(0.0);

    const axialPlane = computeClippingPlane('axial', -1.5, true);
    expect(axialPlane.normal.y).toBe(1);
    expect(axialPlane.constant).toBe(1.5);
  });

  it('deve determinar com rigor matemático os pontos 3D descartados (clipped) pelo corte', () => {
    // Sagital em x = 0 (Linha Média), não invertido: descarta x > 0
    const offset = 0.0;
    const inverted = false;

    const pontoDireito = { x: 0.8, y: 0, z: 0 };
    const pontoEsquerdo = { x: -0.8, y: 0, z: 0 };

    expect(isPointClipped('sagittal', offset, inverted, pontoDireito)).toBe(true);
    expect(isPointClipped('sagittal', offset, inverted, pontoEsquerdo)).toBe(false);

    // Ao inverter, a metade oposta é descartada
    expect(isPointClipped('sagittal', offset, true, pontoDireito)).toBe(false);
    expect(isPointClipped('sagittal', offset, true, pontoEsquerdo)).toBe(true);
  });

  it('deve correlacionar cortes coronais e axiais com limites anatômicos reais', () => {
    // Coronal em z = 0.5 (plano médio-anterior):
    // Pontos mais anteriores (z > 0.5) devem ser cortados no modo padrão
    expect(isPointClipped('coronal', 0.5, false, { x: 0, y: 0, z: 0.8 })).toBe(true);
    expect(isPointClipped('coronal', 0.5, false, { x: 0, y: 0, z: 0.2 })).toBe(false);

    // Axial em y = -0.4 (plano torácico inferior):
    // Estruturas craniais (y > -0.4) descartadas no modo não-invertido
    expect(isPointClipped('axial', -0.4, false, { x: 0, y: 1.0, z: 0 })).toBe(true);
    expect(isPointClipped('axial', -0.4, false, { x: 0, y: -1.0, z: 0 })).toBe(false);
  });

  it('deve mapear corretamente os marcos anatômicos clínicos canônicos (Terminologia Anatomica)', () => {
    // Sagital Mediano (x = 0)
    const medianLandmark = getAnatomicalLandmark('sagittal', 0.0);
    expect(medianLandmark.namePtBr).toContain('Linha Média');
    expect(medianLandmark.nameLatin).toBe('Planum medianum');
    expect(medianLandmark.clinicalSignificance).toContain('Septo nasal');

    // Coronal Retroperitoneal (z = -0.5)
    const retroLandmark = getAnatomicalLandmark('coronal', -0.5);
    expect(retroLandmark.namePtBr).toContain('Retroperitoneal');
    expect(retroLandmark.clinicalSignificance).toContain('Rins');

    // Axial Transpilórico de Addison (y = -0.5)
    const addisonLandmark = getAnatomicalLandmark('axial', -0.5);
    expect(addisonLandmark.namePtBr).toContain('Transpilórico de Addison');
    expect(addisonLandmark.clinicalSignificance).toContain('piloro');

    // Axial Torácico de Ludwig (y = 0.0)
    const ludwigLandmark = getAnatomicalLandmark('axial', 0.0);
    expect(ludwigLandmark.namePtBr).toContain('Ludwig');
    expect(ludwigLandmark.clinicalSignificance).toContain('T4-T5');
  });

  it('deve cobrir as faixas de valores limites dos catálogos de marcos anatômicos', () => {
    expect(SAGITTAL_LANDMARKS.length).toBeGreaterThanOrEqual(4);
    expect(CORONAL_LANDMARKS.length).toBeGreaterThanOrEqual(4);
    expect(AXIAL_LANDMARKS.length).toBeGreaterThanOrEqual(5);

    // Testa valor extremo de offset
    const extremeLandmark = getAnatomicalLandmark('axial', 2.5);
    expect(extremeLandmark.namePtBr).toContain('Craniano Superior');
  });
});

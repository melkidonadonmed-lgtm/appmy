import { describe, it, expect } from 'vitest';
import {
  CARDIOVASCULAR_NODES,
  CardiovascularNode,
  VesselType,
} from '../src/shared/constants/cardiovascular.ts';

describe('Sistema Cardiovascular - Capítulo 5 (Terminologia Anatomica e FMA)', () => {
  it('deve conter o catálogo canônico completo com 9 nós cardiovasculares', () => {
    expect(CARDIOVASCULAR_NODES.length).toBe(9);
  });

  it('deve validar a fisiologia das 4 câmaras cardíacas e sua oxigenação estrita', () => {
    const chambers = CARDIOVASCULAR_NODES.filter((n) => n.vesselType === 'heart_chamber');
    expect(chambers.length).toBe(4);

    const leftVentricle = chambers.find((c) => c.meshName === 'left_ventricle');
    const rightVentricle = chambers.find((c) => c.meshName === 'right_ventricle');
    const leftAtrium = chambers.find((c) => c.meshName === 'left_atrium');
    const rightAtrium = chambers.find((c) => c.meshName === 'right_atrium');

    expect(leftVentricle).toBeDefined();
    expect(rightVentricle).toBeDefined();
    expect(leftAtrium).toBeDefined();
    expect(rightAtrium).toBeDefined();

    // Câmaras esquerdas: sangue oxigenado (arterial)
    expect(leftVentricle?.oxygenated).toBe(true);
    expect(leftAtrium?.oxygenated).toBe(true);
    expect(leftVentricle?.colorHex).toBe('#ef4444');

    // Câmaras direitas: sangue desoxigenado (venoso)
    expect(rightVentricle?.oxygenated).toBe(false);
    expect(rightAtrium?.oxygenated).toBe(false);
    expect(rightVentricle?.colorHex).toBe('#3b82f6');
  });

  it('deve validar a rede tubular cérvico-craniana e grandes vasos', () => {
    const vessels = CARDIOVASCULAR_NODES.filter((n) => n.vesselType !== 'heart_chamber');
    expect(vessels.length).toBe(5);

    const aorta = vessels.find((v) => v.meshName === 'aorta_arch');
    const carotidCommon = vessels.find((v) => v.meshName === 'carotid_common_r');
    const carotidInternal = vessels.find((v) => v.meshName === 'carotid_internal_r');
    const jugular = vessels.find((v) => v.meshName === 'jugular_internal_r');
    const venaCava = vessels.find((v) => v.meshName === 'vena_cava_superior');

    expect(aorta?.fmaId).toBe('FMA:3734');
    expect(carotidCommon?.oxygenated).toBe(true);
    expect(carotidInternal?.oxygenated).toBe(true);
    expect(jugular?.oxygenated).toBe(false);
    expect(venaCava?.oxygenated).toBe(false);
  });

  it('todos os nós devem possuir Capítulo 5, FMA ID formatado, vetor de explosão e dados clínicos', () => {
    CARDIOVASCULAR_NODES.forEach((node: CardiovascularNode) => {
      expect(node.chapter).toBe(5);
      expect(node.systemName).toBe('Sistema Cardiovascular');
      expect(node.fmaId).toMatch(/^FMA:\d+$/);
      expect(node.namePtBr).toBeTruthy();
      expect(node.nameLatin).toBeTruthy();

      // Vetor de deslocamento da Vista Explodida na GPU
      expect(node.explosionVector).toBeDefined();
      expect(typeof node.explosionVector?.x).toBe('number');
      expect(typeof node.explosionVector?.y).toBe('number');
      expect(typeof node.explosionVector?.z).toBe('number');

      // Ficha clínica médica obrigatória
      expect(node.clinicalData).toBeDefined();
      expect(node.clinicalData?.clinicalSignificance).toBeTruthy();
      expect(node.clinicalData?.functionalAction).toBeTruthy();
    });
  });

  it('deve garantir unicidade rigorosa de IDs e nomes de malhas (meshName)', () => {
    const ids = CARDIOVASCULAR_NODES.map((n) => n.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(CARDIOVASCULAR_NODES.length);

    const meshNames = CARDIOVASCULAR_NODES.map((n) => n.meshName);
    const uniqueMeshNames = new Set(meshNames);
    expect(uniqueMeshNames.size).toBe(CARDIOVASCULAR_NODES.length);
  });
});

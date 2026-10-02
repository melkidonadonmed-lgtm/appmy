import { describe, it, expect } from 'vitest';
import {
  NEUROLOGY_NODES,
  NeurologyNode,
} from '../src/shared/constants/neurology.ts';

describe('Sistema Nervoso Central - Capítulo 4 (Terminologia Anatomica e FMA)', () => {
  it('deve conter o catálogo canônico completo com 10 estruturas neuroanatômicas', () => {
    expect(NEUROLOGY_NODES.length).toBe(10);
  });

  it('deve validar os 4 lobos telencefálicos e suas áreas de Brodmann', () => {
    const lobes = NEUROLOGY_NODES.filter((n) => n.region === 'telencephalon');
    expect(lobes.length).toBe(4);

    const frontal = lobes.find((l) => l.meshName === 'lobe_frontal');
    const parietal = lobes.find((l) => l.meshName === 'lobe_parietal');
    const temporal = lobes.find((l) => l.meshName === 'lobe_temporal');
    const occipital = lobes.find((l) => l.meshName === 'lobe_occipital');

    expect(frontal).toBeDefined();
    expect(parietal).toBeDefined();
    expect(temporal).toBeDefined();
    expect(occipital).toBeDefined();

    expect(frontal?.corticalBrodmannArea).toContain('Área de Broca');
    expect(temporal?.corticalBrodmannArea).toContain('Área de Wernicke');
    expect(occipital?.corticalBrodmannArea).toContain('Córtex Visual Primário');
    expect(parietal?.functionalModality).toBe('sensory');
  });

  it('deve validar os 3 segmentos do tronco encefálico e o cerebelo', () => {
    const midbrain = NEUROLOGY_NODES.find((n) => n.meshName === 'brainstem_midbrain');
    const pons = NEUROLOGY_NODES.find((n) => n.meshName === 'brainstem_pons');
    const medulla = NEUROLOGY_NODES.find((n) => n.meshName === 'brainstem_medulla');
    const cerebellum = NEUROLOGY_NODES.find((n) => n.meshName === 'cerebellum');

    expect(midbrain?.fmaId).toBe('FMA:61830');
    expect(pons?.fmaId).toBe('FMA:61831');
    expect(medulla?.fmaId).toBe('FMA:61832');
    expect(cerebellum?.fmaId).toBe('FMA:61829');

    expect(cerebellum?.functionalModality).toBe('motor');
    expect(medulla?.functionalModality).toBe('autonomic');
  });

  it('deve validar o sistema ventricular e a circulação do Líquido Cefalorraquidiano (LCR)', () => {
    const ventricles = NEUROLOGY_NODES.filter((n) => n.region === 'ventricular_system');
    expect(ventricles.length).toBe(2);

    ventricles.forEach((v) => {
      expect(v.isCSF).toBe(true);
      expect(v.clinicalData?.functionalAction).toContain('Líquido Cefalorraquidiano');
      expect(v.clinicalData?.clinicalSignificance).toContain('hidrocefalia');
    });
  });

  it('todos os nós devem possuir Capítulo 4, dados clínicos e vetores tridimensionais válidos', () => {
    NEUROLOGY_NODES.forEach((node: NeurologyNode) => {
      expect(node.chapter).toBe(4);
      expect(node.systemName).toBe('Sistema Nervoso');
      expect(node.fmaId).toMatch(/^FMA:\d+$/);
      expect(node.namePtBr).toBeTruthy();
      expect(node.nameLatin).toBeTruthy();

      expect(node.explosionVector).toBeDefined();
      expect(typeof node.explosionVector?.x).toBe('number');
      expect(typeof node.explosionVector?.y).toBe('number');
      expect(typeof node.explosionVector?.z).toBe('number');

      expect(node.clinicalData).toBeDefined();
      expect(node.clinicalData?.clinicalSignificance).toBeTruthy();
    });
  });

  it('deve garantir unicidade rigorosa de IDs e nomes de malhas no catálogo neurológico', () => {
    const ids = NEUROLOGY_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(NEUROLOGY_NODES.length);

    const meshNames = NEUROLOGY_NODES.map((n) => n.meshName);
    expect(new Set(meshNames).size).toBe(NEUROLOGY_NODES.length);
  });
});

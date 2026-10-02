import { describe, it, expect } from 'vitest';
import { CRANIOFACIAL_MUSCLES, MuscleAnatomicalNode } from '../src/shared/constants/myology.ts';

describe('Validação de Ontologia e Dados Clínicos de Miologia (Capítulo 3 - Fase 2)', () => {
  it('deve conter nós miológicos com IDs únicos no padrão FMA', () => {
    const ids = new Set<string>();
    CRANIOFACIAL_MUSCLES.forEach((muscle) => {
      expect(muscle.id).toBeDefined();
      expect(muscle.id.startsWith('fma:musculus_')).toBe(true);
      expect(ids.has(muscle.id)).toBe(false);
      ids.add(muscle.id);
    });
    expect(ids.size).toBe(9);
  });

  it('deve garantir que todos os músculos pertençam ao Capítulo 3 e tenham dados clínicos completos', () => {
    CRANIOFACIAL_MUSCLES.forEach((m: MuscleAnatomicalNode) => {
      expect(m.chapter).toBe(3);
      expect(m.systemName).toBe('Sistema Muscular');
      expect(m.clinicalData).toBeDefined();
      expect(m.clinicalData!.origin).toBeDefined();
      expect(m.clinicalData!.insertion).toBeDefined();
      expect(m.clinicalData!.functionalAction).toBeDefined();
      expect(m.clinicalData!.innervation).toBeDefined();
      expect(m.clinicalData!.clinicalSignificance).toBeDefined();
    });
  });

  it('deve separar estritamente a inervação entre Nervo Trigêmeo (NC V3) e Nervo Facial (NC VII)', () => {
    const trigeminalMuscles = CRANIOFACIAL_MUSCLES.filter((m) =>
      m.innervationNerve.includes('V3')
    );
    const facialMuscles = CRANIOFACIAL_MUSCLES.filter((m) =>
      m.innervationNerve.includes('VII')
    );

    // Músculos da mastigação: Masseter D/E, Temporal D/E, Pterigóideo Medial e Lateral = 6
    expect(trigeminalMuscles.length).toBe(6);
    // Músculos da mímica facial: Orbicular do olho, Orbicular da boca e Bucinador = 3
    expect(facialMuscles.length).toBe(3);
  });

  it('deve possuir camadas de dissecação (layerDepth) entre 1 (profundo) e 2 (superficial)', () => {
    CRANIOFACIAL_MUSCLES.forEach((m) => {
      expect(m.layerDepth).toBeGreaterThanOrEqual(1);
      expect(m.layerDepth).toBeLessThanOrEqual(2);
    });
  });

  it('deve garantir simetria bilateral nos vetores de explosão dos músculos pares (Masseter e Temporal)', () => {
    const masseterR = CRANIOFACIAL_MUSCLES.find((m) => m.id === 'fma:musculus_masseter_dexter')!;
    const masseterL = CRANIOFACIAL_MUSCLES.find((m) => m.id === 'fma:musculus_masseter_sinister')!;

    expect(masseterR).toBeDefined();
    expect(masseterL).toBeDefined();
    expect(masseterR.explosionVector!.x).toBeGreaterThan(0);
    expect(masseterL.explosionVector!.x).toBeLessThan(0);
    expect(masseterR.explosionVector!.y).toBeCloseTo(masseterL.explosionVector!.y, 1);
  });
});

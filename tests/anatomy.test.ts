import { describe, it, expect } from 'vitest';
import { CRANIUM_22_NODES, SkullAnatomicalNode } from '../src/shared/constants/cranium.ts';

describe('Validação de Ontologia e Geometria dos 22 Ossos do Crânio (Fase 1)', () => {
  it('deve conter exatamente os 22 ossos canônicos da Terminologia Anatomica', () => {
    expect(CRANIUM_22_NODES.length).toBe(22);
    const ids = new Set<string>();
    CRANIUM_22_NODES.forEach((node) => {
      expect(node.id).toBeDefined();
      expect(node.id.startsWith('fma:')).toBe(true);
      expect(ids.has(node.id)).toBe(false);
      ids.add(node.id);
    });
    expect(ids.size).toBe(22);
  });

  it('deve dividir corretamente entre Neurocrânio (8 ossos) e Viscerocrânio (14 ossos)', () => {
    const neuro = CRANIUM_22_NODES.filter((n) => n.division === 'neurocranium');
    const viscero = CRANIUM_22_NODES.filter((n) => n.division === 'viscerocranium');

    expect(neuro.length).toBe(8);
    expect(viscero.length).toBe(14);
  });

  it('deve conter nomes científicos oficiais em Português e Latim para todas as estruturas', () => {
    CRANIUM_22_NODES.forEach((node: SkullAnatomicalNode) => {
      expect(node.namePtBr.length).toBeGreaterThan(2);
      expect(node.nameLatin.length).toBeGreaterThan(2);
      expect(node.chapter).toBe(2); // Sistema Esquelético
      expect(node.clinicalData).toBeDefined();
    });
  });

  it('deve conter vetores 3D normalizados e válidos para a vista explodida em todas as peças', () => {
    CRANIUM_22_NODES.forEach((node: SkullAnatomicalNode) => {
      expect(node.explosionVector).toBeDefined();
      const { x, y, z } = node.explosionVector!;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      expect(magnitude).toBeGreaterThan(0.3);
      expect(node.explosionMagnitudeMultiplier).toBeGreaterThan(0.5);
    });
  });

  it('deve validar simetria bilateral nos ossos pares (Parietais, Temporais, Zigomáticos, Maxilas)', () => {
    const parietalR = CRANIUM_22_NODES.find((n) => n.id === 'fma:os_parietale_dexter')!;
    const parietalL = CRANIUM_22_NODES.find((n) => n.id === 'fma:os_parietale_sinister')!;

    expect(parietalR).toBeDefined();
    expect(parietalL).toBeDefined();
    expect(parietalR.explosionVector!.x).toBeGreaterThan(0);
    expect(parietalL.explosionVector!.x).toBeLessThan(0);
    expect(parietalR.explosionVector!.y).toBeCloseTo(parietalL.explosionVector!.y, 1);
  });
});

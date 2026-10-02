import { describe, it, expect } from 'vitest';
import {
  Z_ANATOMY_CATALOG,
  Z_ANATOMY_BY_NODE,
  Z_ANATOMY_BY_ID,
  Z_ANATOMY_SKELETAL,
} from '../src/shared/constants/zAnatomyCatalog.ts';

describe('Catálogo Anatômico Real Z-Anatomy (Osteologia & Vísceras)', () => {
  it('deve conter os 335 ossos reais do esqueleto humano completo', () => {
    expect(Z_ANATOMY_SKELETAL.length).toBe(335);
  });

  it('deve indexar nós vitais do crânio, coluna, tórax e membros com vetores anatômicos de explosão', () => {
    // 1. Crânio: Frontal deve mover-se antero-superiormente
    const frontal = Z_ANATOMY_BY_NODE['Frontal bone'];
    expect(frontal).toBeDefined();
    expect(frontal?.namePtBr).toBe('Osso Frontal');
    expect(frontal?.explosionVector.z).toBeGreaterThan(0); // Para frente
    expect(frontal?.explosionVector.y).toBeGreaterThan(0); // Para cima

    // 2. Face: Mandíbula deve mover-se inferiormente
    const mandible = Z_ANATOMY_BY_NODE['Mandible'];
    expect(mandible).toBeDefined();
    expect(mandible?.namePtBr).toBe('Mandíbula');
    expect(mandible?.explosionVector.y).toBeLessThan(0); // Para baixo

    // 3. Coluna: Atlas (C1)
    const atlas = Z_ANATOMY_BY_NODE['Atlas (C1)'];
    expect(atlas).toBeDefined();
    expect(atlas?.chapter).toBe(2);

    // 4. Membro Superior: Clavícula esquerda e direita
    const clavicleL = Z_ANATOMY_BY_NODE['Clavicle.l'];
    const clavicleR = Z_ANATOMY_BY_NODE['Clavicle.r'];
    expect(clavicleL).toBeDefined();
    expect(clavicleR).toBeDefined();
    expect(clavicleL?.explosionVector.x).toBeLessThan(0); // Afastamento para a esquerda
    expect(clavicleR?.explosionVector.x).toBeGreaterThan(0); // Afastamento para a direita

    // 5. Membro Inferior: Fêmur esquerdo e direito
    const femurL = Z_ANATOMY_BY_NODE['Femur.l'];
    const femurR = Z_ANATOMY_BY_NODE['Femur.r'];
    expect(femurL).toBeDefined();
    expect(femurR).toBeDefined();
    expect(femurL?.explosionVector.x).toBeLessThan(0);
    expect(femurR?.explosionVector.x).toBeGreaterThan(0);
  });

  it('deve suportar lookup O(1) instantâneo por ID e por Nome de Nó', () => {
    const itemById = Z_ANATOMY_BY_ID['za:atlas_c1'];
    expect(itemById).toBeDefined();
    expect(itemById?.node).toBe('Atlas (C1)');

    const itemByNode = Z_ANATOMY_BY_NODE['Atlas (C1)'];
    expect(itemByNode).toBeDefined();
    expect(itemByNode?.id).toBe('za:atlas_c1');
  });

  it('deve conter sistemas viscerais (respiratório, cardiovascular, digestório, nervoso, renal)', () => {
    const systems = new Set(Z_ANATOMY_CATALOG.map((i) => i.system));
    expect(systems.has('skeletal')).toBe(true);
    expect(systems.has('respiratory')).toBe(true);
    expect(systems.has('cardiovascular')).toBe(true);
    expect(systems.has('digestive')).toBe(true);
    expect(systems.has('nervous')).toBe(true);
    expect(systems.has('renal')).toBe(true);
  });

  it('deve retornar undefined em caso de busca por nó inexistente (caso de borda negativo)', () => {
    const nonexistent = Z_ANATOMY_BY_NODE['OssoInexistente_Fantasma_XYZ'];
    expect(nonexistent).toBeUndefined();
  });
});

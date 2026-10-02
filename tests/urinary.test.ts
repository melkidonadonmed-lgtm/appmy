import { describe, it, expect } from 'vitest';
import {
  URINARY_NODES,
  UrinaryNode,
} from '../src/shared/constants/urinary.ts';

describe('Sistema Urinário - Capítulo 9 (Terminologia Anatomica e FMA)', () => {
  it('deve conter o catálogo canônico completo com 8 estruturas renais e das vias urinárias', () => {
    expect(URINARY_NODES.length).toBe(8);
  });

  it('deve validar a topografia diferencial dos rins e envoltórios fasciais (Fáscia de Gerota)', () => {
    const kidneyR = URINARY_NODES.find((n) => n.meshName === 'kidney_right');
    const kidneyL = URINARY_NODES.find((n) => n.meshName === 'kidney_left');

    expect(kidneyR).toBeDefined();
    expect(kidneyL).toBeDefined();

    expect(kidneyR?.fmaId).toBe('FMA:7203');
    expect(kidneyL?.fmaId).toBe('FMA:7204');
    expect(kidneyR?.kidneySide).toBe('right');
    expect(kidneyL?.kidneySide).toBe('left');

    expect(kidneyR?.clinicalData?.origin).toContain('T12 a L3');
    expect(kidneyL?.clinicalData?.clinicalSignificance).toContain('Síndrome do Quebra-Nozes');
  });

  it('deve validar a medula renal, pirâmides de Malpighi e pelve renal coletora', () => {
    const medulla = URINARY_NODES.find((n) => n.meshName === 'kidney_medulla_pyramids');
    const pelvis = URINARY_NODES.find((n) => n.meshName === 'renal_pelvis');

    expect(medulla).toBeDefined();
    expect(medulla?.fmaId).toBe('FMA:15610');
    expect(medulla?.clinicalData?.functionalAction).toContain('alças de Henle');

    expect(pelvis).toBeDefined();
    expect(pelvis?.fmaId).toBe('FMA:15622');
    expect(pelvis?.clinicalData?.clinicalSignificance).toContain('JUP');
  });

  it('deve validar os ureteres retroperitoneais e seus pontos de constrição fisiológica e relações pélvicas', () => {
    const ureters = URINARY_NODES.filter((n) => n.urinaryRegion === 'collecting_system' && n.hasConstrictionPoints);
    expect(ureters.length).toBe(2);

    const ureterR = ureters.find((u) => u.meshName === 'ureter_tube_r');
    const ureterL = ureters.find((u) => u.meshName === 'ureter_tube_l');

    expect(ureterR?.clinicalData?.clinicalSignificance).toContain('constrição fisiológica');
    expect(ureterL?.clinicalData?.clinicalSignificance).toContain('cirurgias ginecológicas');

    ureters.forEach((u) => {
      expect(u.clinicalData?.functionalAction).toContain('peristáltic');
    });
  });

  it('deve validar a bexiga urinária (capacidade 400-500 mL) e o trígono vesical antirrefluxo', () => {
    const bladder = URINARY_NODES.find((n) => n.meshName === 'urinary_bladder_body');
    const trigone = URINARY_NODES.find((n) => n.meshName === 'bladder_trigone');

    expect(bladder).toBeDefined();
    expect(bladder?.fmaId).toBe('FMA:15902');
    expect(bladder?.clinicalData?.functionalAction).toContain('400 a 500 mL');

    expect(trigone).toBeDefined();
    expect(trigone?.fmaId).toBe('FMA:15903');
    expect(trigone?.clinicalData?.functionalAction).toContain('válvula antirrefluxo');
  });

  it('todos os nós devem possuir Capítulo 9, dados clínicos e vetores tridimensionais válidos', () => {
    URINARY_NODES.forEach((node: UrinaryNode) => {
      expect(node.chapter).toBe(9);
      expect(node.systemName).toBe('Sistema Urinário');
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

  it('deve garantir unicidade rigorosa de IDs e nomes de malhas no catálogo urinário', () => {
    const ids = URINARY_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(URINARY_NODES.length);

    const meshNames = URINARY_NODES.map((n) => n.meshName);
    expect(new Set(meshNames).size).toBe(URINARY_NODES.length);
  });
});

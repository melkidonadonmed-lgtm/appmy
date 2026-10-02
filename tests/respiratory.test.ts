import { describe, it, expect } from 'vitest';
import {
  RESPIRATORY_NODES,
  RespiratoryNode,
} from '../src/shared/constants/respiratory.ts';

describe('Sistema Respiratório - Capítulo 7 (Terminologia Anatomica e FMA)', () => {
  it('deve conter o catálogo canônico completo com 9 estruturas anatômicas', () => {
    expect(RESPIRATORY_NODES.length).toBe(9);
  });

  it('deve validar a via aérea condutora: Laringe e Traqueia com anéis cartilaginosos', () => {
    const larynx = RESPIRATORY_NODES.find((n) => n.meshName === 'larynx_complex');
    const trachea = RESPIRATORY_NODES.find((n) => n.meshName === 'trachea_tube');

    expect(larynx).toBeDefined();
    expect(larynx?.fmaId).toBe('FMA:55000');
    expect(larynx?.respiratoryRegion).toBe('upper_airway');
    expect(larynx?.clinicalData?.clinicalSignificance).toContain('laringite');

    expect(trachea).toBeDefined();
    expect(trachea?.fmaId).toBe('FMA:7394');
    expect(trachea?.respiratoryRegion).toBe('tracheobronchial_tree');
    expect(trachea?.bronchialGeneration).toBe(0);
    expect(trachea?.clinicalData?.functionalAction).toContain('filtração mucociliar');
  });

  it('deve validar a assimetria brônquica morfofuncional entre brônquios principais direito e esquerdo', () => {
    const bronchusR = RESPIRATORY_NODES.find((n) => n.meshName === 'bronchus_main_r');
    const bronchusL = RESPIRATORY_NODES.find((n) => n.meshName === 'bronchus_main_l');

    expect(bronchusR).toBeDefined();
    expect(bronchusL).toBeDefined();

    expect(bronchusR?.fmaId).toBe('FMA:7409');
    expect(bronchusL?.fmaId).toBe('FMA:7410');
    expect(bronchusR?.lungSide).toBe('right');
    expect(bronchusL?.lungSide).toBe('left');

    // Predisposição clínica para broncoaspiração de corpo estranho no brônquio direito
    expect(bronchusR?.clinicalData?.clinicalSignificance).toContain('corpos estranhos aspirados');
  });

  it('deve validar a anatomia lobar diferencial (3 lobos direitos vs 2 lobos esquerdos)', () => {
    const rightLobes = RESPIRATORY_NODES.filter((n) => n.lungSide === 'right' && n.respiratoryRegion === 'pulmonary_parenchyma');
    const leftLobes = RESPIRATORY_NODES.filter((n) => n.lungSide === 'left' && n.respiratoryRegion === 'pulmonary_parenchyma');

    expect(rightLobes.length).toBe(3);
    expect(leftLobes.length).toBe(2);

    const supR = rightLobes.find((l) => l.meshName === 'lung_right_superior');
    const medR = rightLobes.find((l) => l.meshName === 'lung_right_middle');
    const infR = rightLobes.find((l) => l.meshName === 'lung_right_inferior');

    expect(supR?.fmaId).toBe('FMA:7339');
    expect(medR?.fmaId).toBe('FMA:7340');
    expect(infR?.fmaId).toBe('FMA:7341');

    const supL = leftLobes.find((l) => l.meshName === 'lung_left_superior');
    const infL = leftLobes.find((l) => l.meshName === 'lung_left_inferior');

    expect(supL?.fmaId).toBe('FMA:7342');
    expect(infL?.fmaId).toBe('FMA:7343');
    expect(supL?.namePtBr).toContain('Língula');
  });

  it('todos os nós devem possuir Capítulo 7, dados clínicos e vetores tridimensionais válidos', () => {
    RESPIRATORY_NODES.forEach((node: RespiratoryNode) => {
      expect(node.chapter).toBe(7);
      expect(node.systemName).toBe('Sistema Respiratório');
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

  it('deve garantir unicidade rigorosa de IDs e nomes de malhas no catálogo respiratório', () => {
    const ids = RESPIRATORY_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(RESPIRATORY_NODES.length);

    const meshNames = RESPIRATORY_NODES.map((n) => n.meshName);
    expect(new Set(meshNames).size).toBe(RESPIRATORY_NODES.length);
  });
});

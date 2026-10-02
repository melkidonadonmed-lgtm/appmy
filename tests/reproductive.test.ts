import { describe, it, expect } from 'vitest';
import {
  REPRODUCTIVE_NODES,
  ReproductiveNode,
} from '../src/shared/constants/reproductive.ts';

describe('Sistema Reprodutor Pélvico - Capítulo 10 (Terminologia Anatomica e FMA)', () => {
  it('deve conter o catálogo canônico completo com 6 estruturas pélvicas reprodutivas', () => {
    expect(REPRODUCTIVE_NODES.length).toBe(6);
  });

  it('deve validar o aparelho reprodutor masculino (próstata, vias seminais e testículos)', () => {
    const prostate = REPRODUCTIVE_NODES.find((n) => n.meshName === 'prostate_gland');
    const vasDeferens = REPRODUCTIVE_NODES.find((n) => n.meshName === 'vas_deferens_seminal');
    const testis = REPRODUCTIVE_NODES.find((n) => n.meshName === 'testis_gonad');

    expect(prostate).toBeDefined();
    expect(prostate?.fmaId).toBe('FMA:9601');
    expect(prostate?.reproductiveDimorphism).toBe('male');
    expect(prostate?.clinicalData?.clinicalSignificance).toContain('Hiperplasia prostática benigna');

    expect(vasDeferens).toBeDefined();
    expect(vasDeferens?.fmaId).toBe('FMA:18249');
    expect(vasDeferens?.clinicalData?.clinicalSignificance).toContain('vasectomia eletiva');

    expect(testis).toBeDefined();
    expect(testis?.fmaId).toBe('FMA:7210');
    expect(testis?.gonadalAxisFunction).toContain('Leydig');
    expect(testis?.clinicalData?.clinicalSignificance).toContain('Torção testicular');
  });

  it('deve validar o aparelho reprodutor feminino (útero, tubas uterinas e ovários)', () => {
    const uterus = REPRODUCTIVE_NODES.find((n) => n.meshName === 'uterus_organ');
    const tubes = REPRODUCTIVE_NODES.find((n) => n.meshName === 'fallopian_tubes');
    const ovary = REPRODUCTIVE_NODES.find((n) => n.meshName === 'ovary_gonad');

    expect(uterus).toBeDefined();
    expect(uterus?.fmaId).toBe('FMA:17558');
    expect(uterus?.reproductiveDimorphism).toBe('female');
    expect(uterus?.clinicalData?.clinicalSignificance).toContain('Papanicolaou');

    expect(tubes).toBeDefined();
    expect(tubes?.fmaId).toBe('FMA:17565');
    expect(tubes?.clinicalData?.clinicalSignificance).toContain('Gravidez ectópica tubária');

    expect(ovary).toBeDefined();
    expect(ovary?.fmaId).toBe('FMA:7213');
    expect(ovary?.clinicalData?.clinicalSignificance).toContain('ovários policísticos');
  });

  it('todos os nós devem possuir Capítulo 10, dados clínicos e vetores tridimensionais válidos', () => {
    REPRODUCTIVE_NODES.forEach((node: ReproductiveNode) => {
      expect(node.chapter).toBe(10);
      expect(node.systemName).toBe('Sistema Reprodutor');
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

  it('deve garantir unicidade rigorosa de IDs e nomes de malhas no catálogo reprodutor', () => {
    const ids = REPRODUCTIVE_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(REPRODUCTIVE_NODES.length);

    const meshNames = REPRODUCTIVE_NODES.map((n) => n.meshName);
    expect(new Set(meshNames).size).toBe(REPRODUCTIVE_NODES.length);
  });
});

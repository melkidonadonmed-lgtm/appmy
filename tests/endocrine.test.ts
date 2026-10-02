import { describe, it, expect } from 'vitest';
import {
  ENDOCRINE_NODES,
  EndocrineNode,
} from '../src/shared/constants/endocrine.ts';

describe('Sistema Endócrino - Capítulo 11 (Terminologia Anatomica e FMA)', () => {
  it('deve conter o catálogo canônico completo com 5 estruturas glandulares endócrinas', () => {
    expect(ENDOCRINE_NODES.length).toBe(5);
  });

  it('deve validar a hipófise na sela turca e sua correlação neuroendócrina / quiasmática', () => {
    const pituitary = ENDOCRINE_NODES.find((n) => n.meshName === 'pituitary_gland');
    expect(pituitary).toBeDefined();
    expect(pituitary?.fmaId).toBe('FMA:13889');
    expect(pituitary?.endocrineAxis).toBe('hypothalamic_pituitary');
    expect(pituitary?.hormonesSecreted).toContain('GH');
    expect(pituitary?.hormonesSecreted).toContain('ADH');
    expect(pituitary?.clinicalData?.clinicalSignificance).toContain('hemianopsia bitemporal');
  });

  it('deve validar a tireoide (T3/T4/Calcitonina) e as paratireoides posteriores (PTH)', () => {
    const thyroid = ENDOCRINE_NODES.find((n) => n.meshName === 'thyroid_gland');
    const parathyroid = ENDOCRINE_NODES.find((n) => n.meshName === 'parathyroid_glands');

    expect(thyroid).toBeDefined();
    expect(thyroid?.fmaId).toBe('FMA:9603');
    expect(thyroid?.hormonesSecreted).toContain('Calcitonina');
    expect(thyroid?.clinicalData?.clinicalSignificance).toContain('Hashimoto');

    expect(parathyroid).toBeDefined();
    expect(parathyroid?.fmaId).toBe('FMA:9604');
    expect(parathyroid?.hormonesSecreted).toContain('Paratormônio');
    expect(parathyroid?.clinicalData?.clinicalSignificance).toContain('Chvostek');
  });

  it('deve validar as glândulas adrenais/suprarrenais bilaterais (córtex e medula)', () => {
    const adrenalR = ENDOCRINE_NODES.find((n) => n.meshName === 'adrenal_gland_r');
    const adrenalL = ENDOCRINE_NODES.find((n) => n.meshName === 'adrenal_gland_l');

    expect(adrenalR).toBeDefined();
    expect(adrenalL).toBeDefined();

    expect(adrenalR?.fmaId).toBe('FMA:9605');
    expect(adrenalL?.fmaId).toBe('FMA:9606');

    expect(adrenalR?.hormonesSecreted).toContain('Aldosterona');
    expect(adrenalR?.hormonesSecreted).toContain('Cortisol');
    expect(adrenalR?.hormonesSecreted).toContain('Adrenalina');

    expect(adrenalR?.clinicalData?.clinicalSignificance).toContain('Addison');
    expect(adrenalL?.clinicalData?.clinicalSignificance).toContain('Síndrome de Conn');
  });

  it('todos os nós devem possuir Capítulo 11, dados clínicos e vetores tridimensionais válidos', () => {
    ENDOCRINE_NODES.forEach((node: EndocrineNode) => {
      expect(node.chapter).toBe(11);
      expect(node.systemName).toBe('Sistema Endócrino');
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

  it('deve garantir unicidade rigorosa de IDs e nomes de malhas no catálogo endócrino', () => {
    const ids = ENDOCRINE_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(ENDOCRINE_NODES.length);

    const meshNames = ENDOCRINE_NODES.map((n) => n.meshName);
    expect(new Set(meshNames).size).toBe(ENDOCRINE_NODES.length);
  });
});

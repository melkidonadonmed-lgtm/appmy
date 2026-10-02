import { describe, it, expect } from 'vitest';
import { INTEGUMENTARY_NODES } from '../src/shared/constants/integumentary.ts';

describe('Catálogo Canônico do Capítulo 14: Tegumento Comum (Terminologia Anatomica & FMA)', () => {
  it('deve conter 4 estruturas tegumentares canônicas com capítulo 14 e camada externa (layerDepth = 3)', () => {
    expect(INTEGUMENTARY_NODES).toHaveLength(4);
    INTEGUMENTARY_NODES.forEach((node) => {
      expect(node.chapter).toBe(14);
      expect(node.systemName).toBe('Sistema Tegumentar');
      expect(node.layerDepth).toBe(3);
      expect(node.fmaId).toMatch(/^FMA:\d+$/);
    });
  });

  it('deve detalhar a pele facial e craniana com inervação trigeminal e linhas de Langer', () => {
    const skin = INTEGUMENTARY_NODES.find((n) => n.id === 'fma:facial_cranial_skin');
    expect(skin).toBeDefined();
    expect(skin?.fmaId).toBe('FMA:7163');
    expect(skin?.clinicalData?.innervation).toContain('trigêmeo');
    expect(skin?.clinicalData?.clinicalSignificance).toContain('Langer');
  });

  it('deve documentar a gálea aponeurótica com o acrônimo SCALP e veias emissárias', () => {
    const galea = INTEGUMENTARY_NODES.find((n) => n.id === 'fma:galea_aponeurotica');
    expect(galea).toBeDefined();
    expect(galea?.fmaId).toBe('FMA:46554');
    expect(galea?.clinicalData?.clinicalSignificance).toContain('SCALP');
    expect(galea?.clinicalData?.clinicalSignificance).toContain('área perigosa');
  });

  it('deve detalhar o tecido subcutâneo com o coxim adiposo de Bichat e SMAS cirúrgico', () => {
    const fascia = INTEGUMENTARY_NODES.find((n) => n.id === 'fma:subcutaneous_fascia');
    expect(fascia).toBeDefined();
    expect(fascia?.fmaId).toBe('FMA:9630');
    expect(fascia?.clinicalData?.clinicalSignificance).toContain('Bichat');
    expect(fascia?.clinicalData?.clinicalSignificance).toContain('SMAS');
  });
});

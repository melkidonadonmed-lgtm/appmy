import { describe, it, expect } from 'vitest';
import { SENSORY_NODES } from '../src/shared/constants/sensory.ts';

describe('Catálogo Canônico do Capítulo 13: Órgãos dos Sentidos (Terminologia Anatomica & FMA)', () => {
  it('deve conter 10 estruturas sensoriais canônicas com capítulo 13 e IDs FMA válidos', () => {
    expect(SENSORY_NODES).toHaveLength(10);
    SENSORY_NODES.forEach((node) => {
      expect(node.chapter).toBe(13);
      expect(node.systemName).toBe('Órgãos dos Sentidos');
      expect(node.fmaId).toMatch(/^FMA:\d+$/);
      expect(node.namePtBr).toBeTruthy();
      expect(node.nameLatin).toBeTruthy();
    });
  });

  it('deve catalogar os bulbos oculares bilaterais e elementos ópticos refrativos', () => {
    const eyeballR = SENSORY_NODES.find((n) => n.id === 'fma:eyeball_r');
    const eyeballL = SENSORY_NODES.find((n) => n.id === 'fma:eyeball_l');
    const cornea = SENSORY_NODES.find((n) => n.id === 'fma:cornea');
    const lens = SENSORY_NODES.find((n) => n.id === 'fma:lens');

    expect(eyeballR).toBeDefined();
    expect(eyeballL).toBeDefined();
    expect(eyeballR?.fmaId).toBe('FMA:58296');
    expect(eyeballL?.fmaId).toBe('FMA:58297');

    expect(cornea).toBeDefined();
    expect(cornea?.clinicalData?.clinicalSignificance).toContain('corneopalpebral');

    expect(lens).toBeDefined();
    expect(lens?.clinicalData?.clinicalSignificance).toContain('catarata');
    expect(lens?.clinicalData?.innervation).toContain('oculomotor');
  });

  it('deve detalhar a retina e a via óptica com o quiasma óptico', () => {
    const retina = SENSORY_NODES.find((n) => n.id === 'fma:retina');
    const opticChiasm = SENSORY_NODES.find((n) => n.id === 'fma:optic_chiasm_tract');

    expect(retina).toBeDefined();
    expect(retina?.clinicalData?.clinicalSignificance).toContain('Descolamento de retina');

    expect(opticChiasm).toBeDefined();
    expect(opticChiasm?.nameLatin).toBe('Nervus opticus et Chiasma opticum');
    expect(opticChiasm?.clinicalData?.clinicalSignificance).toContain('hemianopsia bitemporal');
  });

  it('deve conter a cadeia ossicular da orelha média e correlação com otosclerose', () => {
    const ossicles = SENSORY_NODES.find((n) => n.id === 'fma:middle_ear_ossicles');
    expect(ossicles).toBeDefined();
    expect(ossicles?.nameLatin).toContain('Malleus, Incus et Stapes');
    expect(ossicles?.clinicalData?.functionalAction).toContain('22:1');
    expect(ossicles?.clinicalData?.clinicalSignificance).toContain('otosclerose');
  });

  it('deve documentar o labirinto ósseo da orelha interna e a vertigem posicional paroxística (VPPB)', () => {
    const labyrinth = SENSORY_NODES.find((n) => n.id === 'fma:inner_ear_labyrinth');
    expect(labyrinth).toBeDefined();
    expect(labyrinth?.namePtBr).toContain('Cóclea e Canais Semicirculares');
    expect(labyrinth?.clinicalData?.clinicalSignificance).toContain('VPPB');
    expect(labyrinth?.clinicalData?.clinicalSignificance).toContain('Epley');
  });

  it('deve mapear o nervo vestibulococlear (NC VIII) e correlação com schwannoma', () => {
    const vestibulocochlear = SENSORY_NODES.find((n) => n.id === 'fma:vestibulocochlear_nerve');
    expect(vestibulocochlear).toBeDefined();
    expect(vestibulocochlear?.fmaId).toBe('FMA:50868');
    expect(vestibulocochlear?.clinicalData?.clinicalSignificance).toContain('Schwannoma');
  });
});

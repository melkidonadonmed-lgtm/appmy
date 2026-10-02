import { describe, it, expect } from 'vitest';
import {
  DIGESTIVE_NODES,
  DigestiveNode,
} from '../src/shared/constants/digestive.ts';

describe('Sistema Digestório Superior & Médio - Capítulo 8 (Terminologia Anatomica e FMA)', () => {
  it('deve conter o catálogo canônico completo com 8 estruturas gastrointestinais e hepatobiliares', () => {
    expect(DIGESTIVE_NODES.length).toBe(8);
  });

  it('deve validar o tubo digestório alto: Esôfago e Estômago dissecável (fundo/corpo e antro/piloro)', () => {
    const oesophagus = DIGESTIVE_NODES.find((n) => n.meshName === 'oesophagus_tube');
    const stomachBody = DIGESTIVE_NODES.find((n) => n.meshName === 'stomach_body');
    const stomachPylorus = DIGESTIVE_NODES.find((n) => n.meshName === 'stomach_pylorus');

    expect(oesophagus).toBeDefined();
    expect(oesophagus?.fmaId).toBe('FMA:7131');
    expect(oesophagus?.peritonealStatus).toBe('retroperitoneal');
    expect(oesophagus?.clinicalData?.clinicalSignificance).toContain('DRGE');

    expect(stomachBody).toBeDefined();
    expect(stomachBody?.fmaId).toBe('FMA:7148');
    expect(stomachBody?.peritonealStatus).toBe('intraperitoneal');
    expect(stomachBody?.clinicalData?.functionalAction).toContain('fator intrínseco');

    expect(stomachPylorus).toBeDefined();
    expect(stomachPylorus?.fmaId).toBe('FMA:14561');
    expect(stomachPylorus?.isSphincter).toBe(true);
    expect(stomachPylorus?.clinicalData?.clinicalSignificance).toContain('Helicobacter pylori');
  });

  it('deve validar o complexo hepatobiliar: lobos hepáticos, vesícula biliar e ducto colédoco', () => {
    const liverR = DIGESTIVE_NODES.find((n) => n.meshName === 'liver_lobe_right');
    const liverL = DIGESTIVE_NODES.find((n) => n.meshName === 'liver_lobe_left');
    const gallbladder = DIGESTIVE_NODES.find((n) => n.meshName === 'gallbladder_sac');
    const bileDuct = DIGESTIVE_NODES.find((n) => n.meshName === 'bile_duct_common');

    expect(liverR).toBeDefined();
    expect(liverR?.fmaId).toBe('FMA:14656');
    expect(liverR?.clinicalData?.vascularization).toContain('Veia porta');

    expect(liverL).toBeDefined();
    expect(liverL?.fmaId).toBe('FMA:14657');
    expect(liverL?.clinicalData?.clinicalSignificance).toContain('transplantes hepáticos');

    expect(gallbladder).toBeDefined();
    expect(gallbladder?.fmaId).toBe('FMA:7202');
    expect(gallbladder?.clinicalData?.clinicalSignificance).toContain('sinal de Murphy');

    expect(bileDuct).toBeDefined();
    expect(bileDuct?.fmaId).toBe('FMA:9706');
    expect(bileDuct?.peritonealStatus).toBe('retroperitoneal');
    expect(bileDuct?.clinicalData?.clinicalSignificance).toContain('Tríade de Charcot');
  });

  it('deve validar a alça em C do duodeno e sua topografia retroperitoneal', () => {
    const duodenum = DIGESTIVE_NODES.find((n) => n.meshName === 'duodenum_loop');
    expect(duodenum).toBeDefined();
    expect(duodenum?.fmaId).toBe('FMA:7206');
    expect(duodenum?.peritonealStatus).toBe('retroperitoneal');
    expect(duodenum?.digestiveTractSection).toBe('midgut');
    expect(duodenum?.clinicalData?.clinicalSignificance).toContain('artéria gastroduodenal');
  });

  it('todos os nós devem possuir Capítulo 8, dados clínicos e vetores tridimensionais válidos', () => {
    DIGESTIVE_NODES.forEach((node: DigestiveNode) => {
      expect(node.chapter).toBe(8);
      expect(node.systemName).toBe('Sistema Digestório');
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

  it('deve garantir unicidade rigorosa de IDs e nomes de malhas no catálogo digestório', () => {
    const ids = DIGESTIVE_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(DIGESTIVE_NODES.length);

    const meshNames = DIGESTIVE_NODES.map((n) => n.meshName);
    expect(new Set(meshNames).size).toBe(DIGESTIVE_NODES.length);
  });
});

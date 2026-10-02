import { describe, it, expect } from 'vitest';
import {
  LYMPHATIC_NODES,
  LymphaticNode,
} from '../src/shared/constants/lymphatic.ts';

describe('Sistema Linfático - Capítulo 6 (Terminologia Anatomica e FMA)', () => {
  it('deve conter o catálogo canônico completo com 8 estruturas linfáticas', () => {
    expect(LYMPHATIC_NODES.length).toBe(8);
  });

  it('deve validar o Ducto Torácico e a Cisterna do Quilo como via primária de quilo e linfa', () => {
    const thoracicDuct = LYMPHATIC_NODES.find((n) => n.meshName === 'thoracic_duct');
    const cisternaChyli = LYMPHATIC_NODES.find((n) => n.meshName === 'cisterna_chyli');

    expect(thoracicDuct).toBeDefined();
    expect(thoracicDuct?.fmaId).toBe('FMA:5031');
    expect(thoracicDuct?.lymphaticType).toBe('duct');
    expect(thoracicDuct?.clinicalData?.clinicalSignificance).toContain('quilotórax');

    expect(cisternaChyli).toBeDefined();
    expect(cisternaChyli?.fmaId).toBe('FMA:5030');
    expect(cisternaChyli?.lymphaticType).toBe('cistern');
    expect(cisternaChyli?.clinicalData?.functionalAction).toContain('quilomícrons');
  });

  it('deve validar o Linfonodo de Virchow (Sinal de Troisier) como linfonodo sentinela oncológico', () => {
    const virchow = LYMPHATIC_NODES.find((n) => n.meshName === 'lymph_node_virchow');

    expect(virchow).toBeDefined();
    expect(virchow?.fmaId).toBe('FMA:12780');
    expect(virchow?.isSentinelNode).toBe(true);
    expect(virchow?.clinicalData?.clinicalSignificance).toContain('Sinal de Troisier');
    expect(virchow?.clinicalData?.clinicalSignificance).toContain('adenocarcinoma gástrico');
  });

  it('deve validar as cadeias ganglionares cervicais, axilares e traqueobrônquicas', () => {
    const jugulodigastric = LYMPHATIC_NODES.find((n) => n.meshName === 'lymph_nodes_jugulodigastric');
    const omohyoid = LYMPHATIC_NODES.find((n) => n.meshName === 'lymph_nodes_omohyoid');
    const axillary = LYMPHATIC_NODES.find((n) => n.meshName === 'lymph_nodes_axillary_apical');
    const subcarinal = LYMPHATIC_NODES.find((n) => n.meshName === 'lymph_nodes_tracheobronchial');

    expect(jugulodigastric?.fmaId).toBe('FMA:61245');
    expect(omohyoid?.fmaId).toBe('FMA:61247');
    expect(axillary?.fmaId).toBe('FMA:12781');
    expect(subcarinal?.fmaId).toBe('FMA:12782');

    expect(axillary?.clinicalData?.clinicalSignificance).toContain('carcinoma de mama');
    expect(subcarinal?.clinicalData?.clinicalSignificance).toContain('estadiamento N2');
  });

  it('todos os nós devem possuir Capítulo 6, dados clínicos e vetores tridimensionais válidos', () => {
    LYMPHATIC_NODES.forEach((node: LymphaticNode) => {
      expect(node.chapter).toBe(6);
      expect(node.systemName).toBe('Sistema Linfático');
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

  it('deve garantir unicidade rigorosa de IDs e nomes de malhas no catálogo linfático', () => {
    const ids = LYMPHATIC_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(LYMPHATIC_NODES.length);

    const meshNames = LYMPHATIC_NODES.map((n) => n.meshName);
    expect(new Set(meshNames).size).toBe(LYMPHATIC_NODES.length);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';
import { determineSurgicalLayer, SURGICAL_LAYERS } from '../src/core/visibilityManager.ts';
import { SYSTEM_METADATA } from '../src/shared/constants/taxonomicMetadata.ts';

describe('Suíte de Integração do Sistema Tegumentar Real (.GLB) e Estratigrafia', () => {
  beforeEach(() => {
    useAnatomyStore.setState({
      activeSystems: new Set(['all']),
      activeSystem: 'all',
      layerPeelingLevel: 0,
      solidOpacity: 1.0,
      explosionProgress: 0.0,
      selectedNodeId: null,
    });
  });

  it('deve comprovar a existência do arquivo binário integumentary_female.glb', () => {
    const glbPath = path.resolve(__dirname, '../public/models/anatomy/integumentary_female.glb');
    expect(fs.existsSync(glbPath)).toBe(true);
    const stats = fs.statSync(glbPath);
    expect(stats.size).toBeGreaterThan(1_000_000); // 2.18 MB
  });

  it('deve classificar o sistema tegumentar estritamente na Camada 1 (Tegumento Comum)', () => {
    const layer = determineSurgicalLayer('integumentary', 'VH_F_nipple_L', 'Mamilo');
    expect(layer).toBe(1);
    expect(SURGICAL_LAYERS[1].labelPt).toBe('Tegumento Comum');
    expect(SURGICAL_LAYERS[1].desc).toContain('subcutâneo');
  });

  it('deve manter o tegumento no topo da hierarquia de metadados taxonômicos (order 1)', () => {
    expect(SYSTEM_METADATA.integumentary).toBeDefined();
    expect(SYSTEM_METADATA.integumentary.order).toBe(1);
    expect(SYSTEM_METADATA.integumentary.labelPt).toContain('Tegumento');
  });

  it('deve alternar a visibilidade de integumentary via toggleSystem no store', () => {
    const store = useAnatomyStore.getState();
    expect(store.activeSystems.has('all')).toBe(true);

    // Ativa monosseleção ou adição do tegumento
    store.toggleSystem('integumentary');
    let state = useAnatomyStore.getState();
    expect(state.activeSystems.has('integumentary')).toBe(true);
    expect(state.activeSystems.has('all')).toBe(false);

    // Alterna novamente (remove)
    store.toggleSystem('integumentary');
    state = useAnatomyStore.getState();
    expect(state.activeSystems.has('integumentary')).toBe(false);
  });

  it('deve comprovar no código de RealBodyAtlas.tsx que integumentary_female.glb está referenciado e pré-carregado', () => {
    const compPath = path.resolve(__dirname, '../src/client/components/canvas/RealBodyAtlas.tsx');
    const content = fs.readFileSync(compPath, 'utf-8');

    expect(content).toContain('glbPath="/models/anatomy/integumentary_female.glb"');
    expect(content).toContain("systemName=\"integumentary\"");
    expect(content).toContain("useGLTF.preload('/models/anatomy/integumentary_female.glb'");
  });
});

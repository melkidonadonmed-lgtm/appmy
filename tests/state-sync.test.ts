import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';

describe('State Synchronization & Zero-Emoji Medical Quality Suite', () => {
  beforeEach(() => {
    useAnatomyStore.getState().showAll();
    useAnatomyStore.getState().setExplosionProgress(0.0);
    useAnatomyStore.getState().setSolidOpacity(1.0);
    useAnatomyStore.getState().setXRayMode(false);
    useAnatomyStore.getState().setSelectedNode(null);
  });

  it('deve sincronizar perfeitamente o progresso de explosão entre estado global e módulos', () => {
    const store = useAnatomyStore.getState();
    expect(store.explosionProgress).toBe(0.0);
    expect(store.modules.explodedProgress).toBe(0.0);

    store.setExplosionProgress(0.75);

    const updated = useAnatomyStore.getState();
    expect(updated.explosionProgress).toBe(0.75);
    expect(updated.modules.explodedProgress).toBe(0.75);

    // Teste de clamp (0.0 a 1.0)
    store.setExplosionProgress(1.5);
    expect(useAnatomyStore.getState().explosionProgress).toBe(1.0);

    store.setExplosionProgress(-0.5);
    expect(useAnatomyStore.getState().explosionProgress).toBe(0.0);
  });

  it('deve sincronizar a densidade óssea e o modo Raio-X em todas as interfaces', () => {
    const store = useAnatomyStore.getState();

    store.setSolidOpacity(0.35);
    expect(useAnatomyStore.getState().solidOpacity).toBe(0.35);
    expect(useAnatomyStore.getState().modules.solidOpacity).toBe(0.35);

    store.setXRayMode(true);
    expect(useAnatomyStore.getState().xRayMode).toBe(true);
    expect(useAnatomyStore.getState().modules.xRayMode).toBe(true);
  });

  it('deve aplicar presets anatômicos canônicos alterando foco e densidade', () => {
    const store = useAnatomyStore.getState();

    // Preset de Crânio
    store.applyPreset('cranium');
    let state = useAnatomyStore.getState();
    expect(state.activeRegion).toBe('cranium');
    expect(state.activeSystem).toBe('skeletal');
    expect(state.cameraFocusTarget).toEqual([0, 1.45, 0]);

    // Preset Cardiorrespiratório
    store.applyPreset('cardiorespiratory');
    state = useAnatomyStore.getState();
    expect(state.activeRegion).toBe('thorax');
    expect(state.solidOpacity).toBe(0.35);

    // Preset Visceral
    store.applyPreset('visceral');
    state = useAnatomyStore.getState();
    expect(state.activeSystem).toBe('digestive');
    expect(state.solidOpacity).toBe(0.0);

    // Reset Geral
    store.applyPreset('all');
    state = useAnatomyStore.getState();
    expect(state.activeSystem).toBe('all');
    expect(state.activeRegion).toBe('all');
    expect(state.solidOpacity).toBe(1.0);
  });

  it('deve garantir que o alvo de posição da câmera (Gizmo) é reativo', () => {
    const store = useAnatomyStore.getState();
    expect(store.cameraPositionTarget).toBeNull();

    store.setCameraPositionTarget([0, 0, 4.5]);
    expect(useAnatomyStore.getState().cameraPositionTarget).toEqual([0, 0, 4.5]);

    store.setCameraPositionTarget(null);
    expect(useAnatomyStore.getState().cameraPositionTarget).toBeNull();
  });

  it('deve garantir conformidade com o padrão executivo médico minimalista (Zero Emojis)', () => {
    // Regex para detecção de caracteres emoji comuns
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

    const filesToCheck = [
      path.resolve(__dirname, '../src/client/App.tsx'),
      path.resolve(__dirname, '../src/client/components/ui/tree/AnatomyFiltersSection.tsx'),
      path.resolve(__dirname, '../src/client/components/ui/tree/AnatomyTreePanel.tsx'),
      path.resolve(__dirname, '../src/client/components/ui/tree/ModuleLayersSection.tsx'),
      path.resolve(__dirname, '../src/client/components/canvas/OrientationGizmo.tsx'),
      path.resolve(__dirname, '../src/client/components/ui/QuickPresetsBar.tsx'),
    ];

    for (const filePath of filesToCheck) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const hasEmoji = emojiRegex.test(content);
      expect(
        hasEmoji,
        `Violação de UI médica executiva: emoji detectado no arquivo ${path.basename(filePath)}`
      ).toBe(false);
    }
  });
});

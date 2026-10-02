import React from 'react';
import { Layers, Bone, Skull, HeartPulse, Stethoscope } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';

export const QuickPresetsBar: React.FC = () => {
  const applyPreset = useAnatomyStore((s) => s.applyPreset);
  const activeSystem = useAnatomyStore((s) => s.activeSystem);
  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const solidOpacity = useAnatomyStore((s) => s.solidOpacity);

  const isPresetActive = (key: string) => {
    switch (key) {
      case 'all':
        return activeSystem === 'all' && activeRegion === 'all' && solidOpacity === 1.0;
      case 'skeletal':
        return activeSystem === 'skeletal' && activeRegion === 'all';
      case 'cranium':
        return activeRegion === 'cranium';
      case 'cardiorespiratory':
        return solidOpacity === 0.35 && activeRegion === 'thorax';
      case 'visceral':
        return activeSystem === 'digestive' && solidOpacity === 0.0;
      default:
        return false;
    }
  };

  return (
    <div className="quick-presets-bar" aria-label="Presets Anatômicos Canônicos">
      <span className="quick-presets-label">Presets:</span>
      <div className="quick-presets-group">
        <button
          type="button"
          onClick={() => applyPreset('all')}
          className={`quick-preset-btn ${isPresetActive('all') ? 'active' : ''}`}
          title="Exibir Corpo Humano Completo"
          aria-label="Preset: Corpo Humano Completo"
        >
          <Layers size={12} aria-hidden="true" />
          <span>Geral</span>
        </button>

        <button
          type="button"
          onClick={() => applyPreset('skeletal')}
          className={`quick-preset-btn ${isPresetActive('skeletal') ? 'active' : ''}`}
          title="Foco no Sistema Esquelético Completo (335 ossos)"
          aria-label="Preset: Sistema Esquelético"
        >
          <Bone size={12} aria-hidden="true" />
          <span>Esqueleto</span>
        </button>

        <button
          type="button"
          onClick={() => applyPreset('cranium')}
          className={`quick-preset-btn ${isPresetActive('cranium') ? 'active' : ''}`}
          title="Foco no Crânio e Viscerocrânio Facial"
          aria-label="Preset: Crânio e Face"
        >
          <Skull size={12} aria-hidden="true" />
          <span>Crânio</span>
        </button>

        <button
          type="button"
          onClick={() => applyPreset('cardiorespiratory')}
          className={`quick-preset-btn ${isPresetActive('cardiorespiratory') ? 'active' : ''}`}
          title="Foco no Coração, Pulmões e Tórax Translúcido"
          aria-label="Preset: Cardiorrespiratório"
        >
          <HeartPulse size={12} aria-hidden="true" />
          <span>Tórax & Cardio</span>
        </button>

        <button
          type="button"
          onClick={() => applyPreset('visceral')}
          className={`quick-preset-btn ${isPresetActive('visceral') ? 'active' : ''}`}
          title="Foco nas Vísceras Abdominais e Sistema Digestório"
          aria-label="Preset: Vísceras Abdominais"
        >
          <Stethoscope size={12} aria-hidden="true" />
          <span>Viscerologia</span>
        </button>
      </div>
    </div>
  );
};

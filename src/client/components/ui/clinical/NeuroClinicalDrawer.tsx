import React, { useEffect } from 'react';
import {
  X,
  Bone,
  Brain,
  Activity,
  Scan,
  Stethoscope,
} from 'lucide-react';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { CraniumForaminaTab } from './CraniumForaminaTab.tsx';
import { BrainBrodmannVascularTab } from './BrainBrodmannVascularTab.tsx';
import { CranialNervesTab } from './CranialNervesTab.tsx';
import { NeuroimagingAspectsTab } from './NeuroimagingAspectsTab.tsx';
import { ClinicalCaseSimulatorTab } from './ClinicalCaseSimulatorTab.tsx';

export type ClinicalStudioTab = 'foramina' | 'brain' | 'nerves' | 'neuroimaging' | 'cases';

const CLINICAL_TABS: Array<{
  id: ClinicalStudioTab;
  label: string;
  shortBadge: string;
  icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>;
}> = [
  { id: 'foramina', label: 'Crânio, SCALP & 14 Forames', shortBadge: 'Base/SCALP', icon: Bone },
  { id: 'brain', label: 'Encéfalo, Brodmann & Willis', shortBadge: 'Brodmann/LCR', icon: Brain },
  { id: 'nerves', label: '12 Pares Cranianos (NC I–XII)', shortBadge: 'NC I–XII', icon: Activity },
  { id: 'neuroimaging', label: 'TC de Crânio & ASPECTS', shortBadge: 'ASPECTS/TC', icon: Scan },
  { id: 'cases', label: 'Simulador de Casos Clínicos', shortBadge: '3 Casos', icon: Stethoscope },
];

export const NeuroClinicalDrawer: React.FC = () => {
  const clinicalStudioOpen = useAnatomyStore((s) => s.clinicalStudioOpen);
  const setClinicalStudioOpen = useAnatomyStore((s) => s.setClinicalStudioOpen);
  const clinicalStudioTab = useAnatomyStore((s) => s.clinicalStudioTab);
  const setClinicalStudioTab = useAnatomyStore((s) => s.setClinicalStudioTab);
  const setViewType = useAnatomyStore((s) => s.setViewType);

  useEffect(() => {
    if (!clinicalStudioOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClinicalStudioOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clinicalStudioOpen, setClinicalStudioOpen]);

  const applyPreset = useAnatomyStore((s) => s.applyPreset);

  if (!clinicalStudioOpen) return null;

  const activateRealNeuroGlb3D = () => {
    setViewType('realistic');
    applyPreset('neuroanatomy');
  };

  return (
    <section
      className="neuro-clinical-drawer"
      role="dialog"
      aria-modal="false"
      aria-label="Estúdio Neuroclínico, Tomografia ASPECTS e Pares Cranianos"
    >
      {/* Cabeçalho Tátil Zenital */}
      <header className="neuro-drawer-header">
        <div className="neuro-drawer-brand">
          <div className="neuro-drawer-icon-well">
            <Brain size={16} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div className="neuro-drawer-titles">
            <h2 className="neuro-drawer-title">Estúdio Neuroclínico</h2>
            <p className="neuro-drawer-subtitle">
              14 Forames • Brodmann • 12 Pares Cranianos • TC/ASPECTS • Casos Clínicos
            </p>
          </div>
        </div>

        <div className="neuro-drawer-header-actions">
          <button
            type="button"
            onClick={activateRealNeuroGlb3D}
            className="neuro-quick-scene-btn"
            title="Focar Encéfalo 3D com Crânio Translúcido"
          >
            <Brain size={12} strokeWidth={1.5} aria-hidden="true" />
            <span>Focar Encéfalo 3D</span>
          </button>
          <button
            type="button"
            onClick={() => setClinicalStudioOpen(false)}
            className="neuro-drawer-close-btn"
            title="Fechar Estúdio Neuroclínico (Esc)"
            aria-label="Fechar Estúdio Neuroclínico"
          >
            <X size={15} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Barra de Abas Principais (5 Módulos Documentados) */}
      <nav className="neuro-drawer-tabs" role="tablist" aria-label="Módulos do Estúdio Neuroclínico">
        {CLINICAL_TABS.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = clinicalStudioTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setClinicalStudioTab(tab.id)}
              className={`neuro-drawer-tab-btn ${isActive ? 'active' : ''}`}
            >
              <IconComponent size={13} strokeWidth={1.5} aria-hidden="true" />
              <span className="neuro-tab-full-label">{tab.label}</span>
              <span className="neuro-tab-short-badge">{tab.shortBadge}</span>
            </button>
          );
        })}
      </nav>

      {/* Corpo com Rolagem Independente */}
      <div className="neuro-drawer-content scrollbar-thin">
        {clinicalStudioTab === 'foramina' && <CraniumForaminaTab />}
        {clinicalStudioTab === 'brain' && <BrainBrodmannVascularTab />}
        {clinicalStudioTab === 'nerves' && <CranialNervesTab />}
        {clinicalStudioTab === 'neuroimaging' && <NeuroimagingAspectsTab />}
        {clinicalStudioTab === 'cases' && <ClinicalCaseSimulatorTab />}
      </div>
    </section>
  );
};

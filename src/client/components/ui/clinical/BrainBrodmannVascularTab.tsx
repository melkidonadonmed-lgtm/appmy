import React, { useState, useMemo } from 'react';
import { Focus, Brain, HeartPulse, GitCommit, Droplets } from 'lucide-react';
import {
  BRODMANN_CORTICAL_REGIONS_12,
  SUBCORTICAL_AND_POSTERIOR_FOSSA_STRUCTURES,
  WHITE_MATTER_FIBERS,
  GLIAL_CELLS_CATALOG,
  CSF_VENTRICULAR_FLOW_STEPS,
  VASCULAR_SYNDROMES_AND_WILLIS,
} from '../../../../shared/constants/brainClinicalCatalog.ts';
import { BrodmannRegionEntry } from '../../../../shared/types/neuroClinical.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';

type BrainSubView = 'brodmann' | 'subcortical' | 'vascular_csf';
type LobeFilter = BrodmannRegionEntry['lobe'] | 'all';

const LOBE_FILTERS: Array<{ id: LobeFilter; label: string }> = [
  { id: 'all', label: 'Todos (12)' },
  { id: 'Frontal', label: 'Frontal' },
  { id: 'Parietal', label: 'Parietal' },
  { id: 'Temporal', label: 'Temporal' },
  { id: 'Occipital', label: 'Occipital' },
  { id: 'Ínsula', label: 'Ínsula' },
];

export const BrainBrodmannVascularTab: React.FC = () => {
  const [subView, setSubView] = useState<BrainSubView>('brodmann');
  const [lobeFilter, setLobeFilter] = useState<LobeFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>('ba_44_45_broca');

  const focusClinicalTargetIds = useAnatomyStore((s) => s.focusClinicalTargetIds);

  const filteredBrodmann = useMemo(() => {
    if (lobeFilter === 'all') return BRODMANN_CORTICAL_REGIONS_12;
    return BRODMANN_CORTICAL_REGIONS_12.filter((r) => r.lobe === lobeFilter);
  }, [lobeFilter]);

  return (
    <div className="neuro-tab-pane">
      {/* Sub-navegação Interna */}
      <div className="neuro-subnav-bar" role="tablist" aria-label="Submódulos de Encéfalo, Brodmann e Vascularização">
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'brodmann'}
          onClick={() => setSubView('brodmann')}
          className={`neuro-subnav-btn ${subView === 'brodmann' ? 'active' : ''}`}
        >
          <Brain size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>Córtex & Brodmann (12)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'subcortical'}
          onClick={() => setSubView('subcortical')}
          className={`neuro-subnav-btn ${subView === 'subcortical' ? 'active' : ''}`}
        >
          <GitCommit size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>Núcleos, Tronco & Tratos</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'vascular_csf'}
          onClick={() => setSubView('vascular_csf')}
          className={`neuro-subnav-btn ${subView === 'vascular_csf' ? 'active' : ''}`}
        >
          <HeartPulse size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>Willis, AVC & LCR</span>
        </button>
      </div>

      {/* SUBVIEW 1: ÁREAS DE BRODMANN & GIROS CORTICAIS */}
      {subView === 'brodmann' && (
        <div className="neuro-section-body">
          <div className="neuro-filter-pills">
            {LOBE_FILTERS.map((lf) => (
              <button
                key={lf.id}
                type="button"
                onClick={() => setLobeFilter(lf.id)}
                className={`neuro-filter-pill ${lobeFilter === lf.id ? 'active' : ''}`}
              >
                {lf.label}
              </button>
            ))}
          </div>

          <div className="neuro-cards-list">
            {filteredBrodmann.map((region) => {
              const isExpanded = expandedId === region.id;
              return (
                <article
                  key={region.id}
                  className={`neuro-clinical-item ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="neuro-item-summary"
                    onClick={() => setExpandedId(isExpanded ? null : region.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : region.id);
                      }
                    }}
                  >
                    <div className="neuro-item-main">
                      <span className="neuro-item-title">{region.gyrusOrRegion}</span>
                      <span className="neuro-item-subtitle">
                        Lobo {region.lobe} • {region.vascularSupply}
                      </span>
                    </div>
                    <div className="neuro-item-meta">
                      <span className="neuro-badge-code">{region.brodmannAreas}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(region.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                        title="Focar giro/lobo no Atlas 3D"
                      >
                        <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                        <span>3D</span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="neuro-item-details">
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Fisiologia & Representação:</span>
                        <p className="neuro-detail-text">{region.primaryFunction}</p>
                      </div>
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Síndrome Clínica de Lesão:</span>
                        <p className="neuro-detail-text">{region.clinicalLesionSyndrome}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBVIEW 2: NÚCLEOS DA BASE, DIENCÉFALO, TRONCO, CEREBELO, TRATOS E GLIA */}
      {subView === 'subcortical' && (
        <div className="neuro-section-body">
          <div className="neuro-subsection-header">
            <span>Núcleos Profundos, Diencéfalo, Tronco Encefálico & Cerebelo</span>
          </div>
          <div className="neuro-cards-list">
            {SUBCORTICAL_AND_POSTERIOR_FOSSA_STRUCTURES.map((st) => {
              const isExpanded = expandedId === st.id;
              return (
                <article
                  key={st.id}
                  className={`neuro-clinical-item ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="neuro-item-summary"
                    onClick={() => setExpandedId(isExpanded ? null : st.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : st.id);
                      }
                    }}
                  >
                    <div className="neuro-item-main">
                      <span className="neuro-item-title">{st.namePtBr}</span>
                      <span className="neuro-item-subtitle">{st.nameLatin}</span>
                    </div>
                    <div className="neuro-item-meta">
                      <span className="neuro-badge-fossa">{st.division}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(st.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                        title="Focar estrutura profunda no 3D"
                      >
                        <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                        <span>3D</span>
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="neuro-item-details">
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Componentes & Fisiologia:</span>
                        <p className="neuro-detail-text">
                          {st.components.join(' | ')} — {st.physiology}
                        </p>
                      </div>
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Síndrome Clínica:</span>
                        <p className="neuro-detail-text">{st.clinicalSyndrome}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="neuro-subsection-header" style={{ marginTop: '0.6rem' }}>
            <span>Fibras de Substância Branca & Glia</span>
          </div>
          <div className="neuro-cards-list">
            {WHITE_MATTER_FIBERS.map((wm) => (
              <article key={wm.id} className="neuro-clinical-item expanded">
                <div className="neuro-item-summary">
                  <div className="neuro-item-main">
                    <span className="neuro-item-title">{wm.namePtBr}</span>
                    <span className="neuro-item-subtitle">{wm.mainTractsAndSubdivisions.join(' • ')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => focusClinicalTargetIds(wm.targetNodeIds)}
                    className="neuro-focus-3d-btn"
                  >
                    <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                    <span>3D</span>
                  </button>
                </div>
                <div className="neuro-item-details">
                  <p className="neuro-detail-text">{wm.clinicalLesionSyndrome}</p>
                </div>
              </article>
            ))}

            {GLIAL_CELLS_CATALOG.map((glia) => (
              <article key={glia.id} className="neuro-clinical-item">
                <div className="neuro-item-summary">
                  <div className="neuro-item-main">
                    <span className="neuro-item-title">
                      {glia.namePtBr} ({glia.embryologicalOrigin})
                    </span>
                    <span className="neuro-item-subtitle">
                      {glia.physiologicalRole} — {glia.clinicalCorrelation}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 3: POLÍGONO DE WILLIS, TERRITÓRIOS DE AVC E FLUXO DO LCR */}
      {subView === 'vascular_csf' && (
        <div className="neuro-section-body">
          <div className="neuro-subsection-header">
            <span>Territórios Arteriais Encefálicos & Síndromes de AVC</span>
          </div>
          <div className="neuro-cards-list">
            {VASCULAR_SYNDROMES_AND_WILLIS.map((v) => {
              const isExpanded = expandedId === v.id;
              return (
                <article
                  key={v.id}
                  className={`neuro-clinical-item ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="neuro-item-summary"
                    onClick={() => setExpandedId(isExpanded ? null : v.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : v.id);
                      }
                    }}
                  >
                    <div className="neuro-item-main">
                      <span className="neuro-item-title">{v.arteryName}</span>
                      <span className="neuro-item-subtitle">
                        {v.circulationSystem} • {v.irrigatedTerritory.join('; ')}
                      </span>
                    </div>
                    <div className="neuro-item-meta">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(v.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                      >
                        <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                        <span>3D</span>
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="neuro-item-details">
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Quadro Clínico de Oclusão (AVC):</span>
                        <p className="neuro-detail-text">
                          <strong>Motor:</strong> {v.clinicalOutput.motorDeficit} | <strong>Sensitivo:</strong>{' '}
                          {v.clinicalOutput.sensoryDeficit}
                        </p>
                        <p className="neuro-detail-text">
                          <strong>Sinais Corticais/Cranianos:</strong>{' '}
                          {v.clinicalOutput.corticalOrCranialSigns.join('; ')}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="neuro-subsection-header" style={{ marginTop: '0.6rem' }}>
            <Droplets size={12} strokeWidth={1.5} aria-hidden="true" />
            <span>Dinâmica Ventricular e Circulação do Líquor (LCR ~150 mL)</span>
          </div>
          <div className="neuro-cards-list">
            {CSF_VENTRICULAR_FLOW_STEPS.map((step) => (
              <article key={step.id} className="neuro-clinical-item expanded">
                <div className="neuro-item-summary">
                  <div className="neuro-item-main">
                    <span className="neuro-item-title">
                      {step.stepNumber}. {step.structureName} ({step.nameLatin})
                    </span>
                    <span className="neuro-item-subtitle">{step.mechanismOrFlow}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => focusClinicalTargetIds(step.targetNodeIds)}
                    className="neuro-focus-3d-btn"
                  >
                    <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                    <span>3D</span>
                  </button>
                </div>
                <div className="neuro-item-details">
                  <p className="neuro-detail-text">{step.pathologyCorrelation}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

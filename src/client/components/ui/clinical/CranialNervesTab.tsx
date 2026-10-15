import React, { useState, useMemo } from 'react';
import { Focus, Activity, Stethoscope, ShieldCheck } from 'lucide-react';
import { CRANIAL_NERVES_12 } from '../../../../shared/constants/cranialNervesCatalog.ts';
import { CranialNerveModality } from '../../../../shared/types/neuroClinical.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';

type NerveSubView = 'catalog' | 'differentials';

const MODALITY_FILTERS: Array<{ id: CranialNerveModality | 'all'; label: string }> = [
  { id: 'all', label: 'Todos (NC I–XII)' },
  { id: 'Sensitivo Especial', label: 'Sensitivos (I, II, VIII)' },
  { id: 'Motor Somático', label: 'Motor Somático (IV, VI, XII)' },
  { id: 'Motor Somático + Parassimpático', label: 'Motor + Parassimp. (III)' },
  { id: 'Misto', label: 'Mistos (V, VII, IX, X)' },
];

export const CranialNervesTab: React.FC = () => {
  const [subView, setSubView] = useState<NerveSubView>('catalog');
  const [modalityFilter, setModalityFilter] = useState<CranialNerveModality | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('cn_vii_facial');

  const focusClinicalTargetIds = useAnatomyStore((s) => s.focusClinicalTargetIds);

  const filteredNerves = useMemo(() => {
    if (modalityFilter === 'all') return CRANIAL_NERVES_12;
    return CRANIAL_NERVES_12.filter((n) => n.modality === modalityFilter);
  }, [modalityFilter]);

  const nervesWithSpecialDifferentials = useMemo(
    () => CRANIAL_NERVES_12.filter((n) => Boolean(n.specialClinicalDifferentiation)),
    []
  );

  return (
    <div className="neuro-tab-pane">
      {/* Sub-navegação Interna */}
      <div className="neuro-subnav-bar" role="tablist" aria-label="Submódulos de Pares Cranianos e Semiotécnica">
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'catalog'}
          onClick={() => setSubView('catalog')}
          className={`neuro-subnav-btn ${subView === 'catalog' ? 'active' : ''}`}
        >
          <Activity size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>12 Pares Cranianos (NC I–XII)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'differentials'}
          onClick={() => setSubView('differentials')}
          className={`neuro-subnav-btn ${subView === 'differentials' ? 'active' : ''}`}
        >
          <Stethoscope size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>NC III, NC VII (Central vs Bell) & NC VIII (Weber/Rinne/HINTS)</span>
        </button>
      </div>

      {/* SUBVIEW 1: CATÁLOGO INTERATIVO DOS 12 PARES CRANIANOS */}
      {subView === 'catalog' && (
        <div className="neuro-section-body">
          <div className="neuro-filter-pills">
            {MODALITY_FILTERS.map((mf) => (
              <button
                key={mf.id}
                type="button"
                onClick={() => setModalityFilter(mf.id)}
                className={`neuro-filter-pill ${modalityFilter === mf.id ? 'active' : ''}`}
              >
                {mf.label}
              </button>
            ))}
          </div>

          <div className="neuro-cards-list">
            {filteredNerves.map((nerve) => {
              const isExpanded = expandedId === nerve.id;
              return (
                <article
                  key={nerve.id}
                  className={`neuro-clinical-item ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="neuro-item-summary"
                    onClick={() => setExpandedId(isExpanded ? null : nerve.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : nerve.id);
                      }
                    }}
                  >
                    <div className="neuro-item-main">
                      <span className="neuro-item-title">
                        {nerve.romanNumeral} — {nerve.namePtBr}
                      </span>
                      <span className="neuro-item-subtitle">
                        {nerve.nameLatin} • Forame: {nerve.cranialForamenName}
                      </span>
                    </div>
                    <div className="neuro-item-meta">
                      <span className="neuro-badge-fossa">{nerve.modality}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(nerve.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                        title={`Focar topografia do ${nerve.romanNumeral} no Atlas 3D`}
                      >
                        <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                        <span>3D</span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="neuro-item-details">
                      <div className="neuro-detail-grid-2">
                        <div className="neuro-detail-block">
                          <span className="neuro-detail-label">Origem Real (Núcleos):</span>
                          <p className="neuro-detail-text">{nerve.realOriginNuclei}</p>
                        </div>
                        <div className="neuro-detail-block">
                          <span className="neuro-detail-label">Origem Aparente (SNC):</span>
                          <p className="neuro-detail-text">{nerve.apparentOriginBrain}</p>
                        </div>
                      </div>
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Função Anatômica & Autonômica:</span>
                        <p className="neuro-detail-text">{nerve.anatomicalFunction}</p>
                      </div>
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Exame Semiotécnico à Beira-Leito:</span>
                        <p className="neuro-detail-text">{nerve.semiologyManeuver}</p>
                      </div>
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Patologia Clínica & Síndromes:</span>
                        <p className="neuro-detail-text">{nerve.clinicalPathology}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBVIEW 2: DIFERENCIAIS DE EMERGÊNCIA (NC III, NC VII CENTRAL VS BELL, NC VIII WEBER/RINNE/HINTS) */}
      {subView === 'differentials' && (
        <div className="neuro-section-body">
          <div className="neuro-cards-list">
            {nervesWithSpecialDifferentials.map((nerve) => {
              const diff = nerve.specialClinicalDifferentiation!;
              return (
                <article key={nerve.id} className="neuro-clinical-item expanded">
                  <div className="neuro-item-summary">
                    <div className="neuro-item-main">
                      <span className="neuro-item-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <ShieldCheck size={14} strokeWidth={1.5} className="text-emerald-400" aria-hidden="true" />
                        <span>{diff.title}</span>
                      </span>
                      <span className="neuro-item-subtitle">
                        {nerve.romanNumeral} ({nerve.namePtBr}) • {nerve.cranialForamenName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => focusClinicalTargetIds(nerve.targetNodeIds)}
                      className="neuro-focus-3d-btn"
                    >
                      <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                      <span>Focar 3D</span>
                    </button>
                  </div>
                  <div className="neuro-item-details">
                    {diff.comparisonPoints.map((pt) => (
                      <div key={pt.label} className="neuro-detail-block">
                        <span className="neuro-detail-label">{pt.label}:</span>
                        <p className="neuro-detail-text">{pt.description}</p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

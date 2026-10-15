import React, { useState, useMemo } from 'react';
import { Focus, Layers, ShieldAlert, Compass, Bone } from 'lucide-react';
import {
  MONRO_KELLIE_PRINCIPLE,
  CRANIAL_STRATIGRAPHY_LAYERS,
  CRANIAL_LANDMARKS_AND_FRACTURE_SIGNS,
  CRANIAL_FORAMINA_14,
} from '../../../../shared/constants/craniumStratigraphyForamina.ts';
import { CranialFossaType, StratigraphyGroup } from '../../../../shared/types/neuroClinical.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';

type SubView = 'foramina' | 'stratigraphy' | 'landmarks';

const FOSSA_FILTERS: Array<{ id: CranialFossaType | 'all'; label: string }> = [
  { id: 'all', label: 'Todos (14)' },
  { id: 'Fossa Craniana Anterior', label: 'Fossa Anterior' },
  { id: 'Fossa Craniana Média', label: 'Fossa Média' },
  { id: 'Fossa Craniana Posterior', label: 'Fossa Posterior' },
  { id: 'Exocraniano', label: 'Exocraniano' },
];

const STRAT_FILTERS: Array<{ id: StratigraphyGroup | 'all'; label: string }> = [
  { id: 'all', label: 'Todas Camadas (14)' },
  { id: 'scalp', label: 'SCALP (5)' },
  { id: 'calvaria', label: 'Tríade Óssea (3)' },
  { id: 'meninges_spaces', label: 'Meninges & Espaços (6)' },
];

export const CraniumForaminaTab: React.FC = () => {
  const [subView, setSubView] = useState<SubView>('foramina');
  const [fossaFilter, setFossaFilter] = useState<CranialFossaType | 'all'>('all');
  const [stratFilter, setStratFilter] = useState<StratigraphyGroup | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('foramen_magnum');

  const focusClinicalTargetIds = useAnatomyStore((s) => s.focusClinicalTargetIds);

  const filteredForamina = useMemo(() => {
    if (fossaFilter === 'all') return CRANIAL_FORAMINA_14;
    return CRANIAL_FORAMINA_14.filter((f) => f.fossa === fossaFilter);
  }, [fossaFilter]);

  const filteredStratigraphy = useMemo(() => {
    if (stratFilter === 'all') return CRANIAL_STRATIGRAPHY_LAYERS;
    return CRANIAL_STRATIGRAPHY_LAYERS.filter((s) => s.group === stratFilter);
  }, [stratFilter]);

  return (
    <div className="neuro-tab-pane">
      {/* Banner Resumo: Doutrina de Monro-Kellie */}
      <div className="neuro-doctrine-well">
        <div className="neuro-doctrine-header">
          <div className="neuro-doctrine-title-wrap">
            <ShieldAlert size={14} strokeWidth={1.5} className="text-amber-300" aria-hidden="true" />
            <span className="neuro-doctrine-title">Doutrina de Monro-Kellie & Pressão Intracraniana</span>
          </div>
          <span className="neuro-equation-chip">V_encéfalo (80%) + V_sangue (10%) + V_LCR (10%) = K</span>
        </div>
        <p className="neuro-detail-text">{MONRO_KELLIE_PRINCIPLE}</p>
      </div>

      {/* Sub-navegação Interna */}
      <div className="neuro-subnav-bar" role="tablist" aria-label="Submódulos de Osteologia e Base do Crânio">
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'foramina'}
          onClick={() => setSubView('foramina')}
          className={`neuro-subnav-btn ${subView === 'foramina' ? 'active' : ''}`}
        >
          <Compass size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>14 Forames da Base</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'stratigraphy'}
          onClick={() => setSubView('stratigraphy')}
          className={`neuro-subnav-btn ${subView === 'stratigraphy' ? 'active' : ''}`}
        >
          <Layers size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>SCALP, Díploe & Meninges</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'landmarks'}
          onClick={() => setSubView('landmarks')}
          className={`neuro-subnav-btn ${subView === 'landmarks' ? 'active' : ''}`}
        >
          <Bone size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>Suturas, Ptério & Fraturas</span>
        </button>
      </div>

      {/* SUBVIEW 1: 14 FORAMES DA BASE DO CRÂNIO */}
      {subView === 'foramina' && (
        <div className="neuro-section-body">
          <div className="neuro-filter-pills">
            {FOSSA_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFossaFilter(f.id)}
                className={`neuro-filter-pill ${fossaFilter === f.id ? 'active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="neuro-cards-list">
            {filteredForamina.map((foramen) => {
              const isExpanded = expandedId === foramen.id;
              return (
                <article
                  key={foramen.id}
                  className={`neuro-clinical-item ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="neuro-item-summary"
                    onClick={() => setExpandedId(isExpanded ? null : foramen.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : foramen.id);
                      }
                    }}
                  >
                    <div className="neuro-item-main">
                      <span className="neuro-item-title">{foramen.namePtBr}</span>
                      <span className="neuro-item-subtitle">
                        {foramen.nameLatin} • {foramen.bones.join(', ')}
                      </span>
                    </div>
                    <div className="neuro-item-meta">
                      <span className="neuro-badge-fossa">{foramen.fossa}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(foramen.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                        title={`Focar ${foramen.bones.join(', ')} no Atlas 3D`}
                      >
                        <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                        <span>3D</span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="neuro-item-details">
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Estruturas que atravessam (Nervos & Vasos):</span>
                        <ul className="neuro-bullet-list">
                          {[...foramen.structuresPassing.nerves, ...foramen.structuresPassing.vessels].map((st) => (
                            <li key={st}>{st}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">
                          Síndrome Clínica ({foramen.clinicalSyndrome.name}):
                        </span>
                        <ul className="neuro-bullet-list">
                          {foramen.clinicalSyndrome.signs.map((sign) => (
                            <li key={sign}>{sign}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBVIEW 2: ESTRATIGRAFIA SCALP + TRÍADE ÓSSEA + MENINGES */}
      {subView === 'stratigraphy' && (
        <div className="neuro-section-body">
          <div className="neuro-filter-pills">
            {STRAT_FILTERS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStratFilter(s.id)}
                className={`neuro-filter-pill ${stratFilter === s.id ? 'active' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="neuro-cards-list">
            {filteredStratigraphy.map((layer) => {
              const isExpanded = expandedId === layer.id;
              return (
                <article
                  key={layer.id}
                  className={`neuro-clinical-item ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="neuro-item-summary"
                    onClick={() => setExpandedId(isExpanded ? null : layer.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : layer.id);
                      }
                    }}
                  >
                    <div className="neuro-item-main">
                      <span className="neuro-item-title">
                        {layer.orderOuterToInner}. {layer.namePtBr}
                      </span>
                      <span className="neuro-item-subtitle">{layer.biomechanicalAndVascularFeatures}</span>
                    </div>
                    <div className="neuro-item-meta">
                      {layer.codeOrMnemonic && (
                        <span className="neuro-badge-code">{layer.codeOrMnemonic}</span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(layer.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                        title="Focar camada no Atlas 3D"
                      >
                        <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                        <span>3D</span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="neuro-item-details">
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Correlação Cirúrgica e Patológica:</span>
                        <p className="neuro-detail-text">{layer.clinicalCorrelation}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBVIEW 3: SUTURAS, MARCOS CRANIOMÉTRICOS E SINAIS DE FRATURA DE BASE */}
      {subView === 'landmarks' && (
        <div className="neuro-section-body">
          <div className="neuro-cards-list">
            {CRANIAL_LANDMARKS_AND_FRACTURE_SIGNS.map((lm) => {
              const isExpanded = expandedId === lm.id;
              return (
                <article
                  key={lm.id}
                  className={`neuro-clinical-item ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="neuro-item-summary"
                    onClick={() => setExpandedId(isExpanded ? null : lm.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : lm.id);
                      }
                    }}
                  >
                    <div className="neuro-item-main">
                      <span className="neuro-item-title">{lm.namePtBr}</span>
                      <span className="neuro-item-subtitle">{lm.nameLatin} • {lm.anatomicalLocation}</span>
                    </div>
                    <div className="neuro-item-meta">
                      <span className="neuro-badge-fossa">{lm.category}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(lm.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                        title="Focar estrutura óssea no 3D"
                      >
                        <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                        <span>3D</span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="neuro-item-details">
                      <div className="neuro-detail-block">
                        <span className="neuro-detail-label">Relevância Neurocirúrgica / Trauma:</span>
                        <p className="neuro-detail-text">{lm.clinicalAndSurgicalRelevance}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

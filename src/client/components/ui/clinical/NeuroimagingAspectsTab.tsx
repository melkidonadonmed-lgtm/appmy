import React, { useState, useMemo } from 'react';
import { Focus, Calculator, Scan, AlertTriangle, RotateCcw, Check } from 'lucide-react';
import {
  HOUNSFIELD_SCALE_ENTRIES,
  INTRACRANIAL_HEMORRHAGES_MATRIX,
  EARLY_MCA_ISCHEMIA_SIGNS,
  ASPECTS_10_REGIONS,
  HERNIATION_RED_FLAGS,
  calculateAspectsScore,
} from '../../../../shared/constants/neuroimagingCasesCatalog.ts';
import { AspectsRegionEntry } from '../../../../shared/types/neuroClinical.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';

type ImagingSubView = 'aspects' | 'hemorrhages' | 'hounsfield_signs';
type AspectsRegionId = AspectsRegionEntry['id'];

export const NeuroimagingAspectsTab: React.FC = () => {
  const [subView, setSubView] = useState<ImagingSubView>('aspects');
  const [affectedCodes, setAffectedCodes] = useState<Set<AspectsRegionId>>(new Set());

  const focusClinicalTargetIds = useAnatomyStore((s) => s.focusClinicalTargetIds);

  const toggleRegion = (code: AspectsRegionId) => {
    setAffectedCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const resetAspects = () => setAffectedCodes(new Set());

  const evaluation = useMemo(() => {
    return calculateAspectsScore(Array.from(affectedCodes));
  }, [affectedCodes]);

  const ganglionicRegions = useMemo(
    () => ASPECTS_10_REGIONS.filter((r) => r.level.startsWith('Ganglionar')),
    []
  );
  const supraganglionicRegions = useMemo(
    () => ASPECTS_10_REGIONS.filter((r) => r.level.startsWith('Supraganglionar')),
    []
  );

  return (
    <div className="neuro-tab-pane">
      {/* Sub-navegação Interna */}
      <div className="neuro-subnav-bar" role="tablist" aria-label="Submódulos de TC de Crânio e ASPECTS">
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'aspects'}
          onClick={() => setSubView('aspects')}
          className={`neuro-subnav-btn ${subView === 'aspects' ? 'active' : ''}`}
        >
          <Calculator size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>Calculadora ASPECTS (10 pt)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'hemorrhages'}
          onClick={() => setSubView('hemorrhages')}
          className={`neuro-subnav-btn ${subView === 'hemorrhages' ? 'active' : ''}`}
        >
          <AlertTriangle size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>4 Sangramentos & Herniações</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subView === 'hounsfield_signs'}
          onClick={() => setSubView('hounsfield_signs')}
          className={`neuro-subnav-btn ${subView === 'hounsfield_signs' ? 'active' : ''}`}
        >
          <Scan size={13} strokeWidth={1.5} aria-hidden="true" />
          <span>Escala UH & Sinais Precoces</span>
        </button>
      </div>

      {/* SUBVIEW 1: CALCULADORA INTERATIVA ASPECTS (10 PONTOS) */}
      {subView === 'aspects' && (
        <div className="neuro-section-body">
          {/* Painel de Escore em Tempo Real */}
          <div className="neuro-aspects-scoreboard">
            <div className="neuro-aspects-score-left">
              <div className="neuro-aspects-number-box">
                <span className="neuro-aspects-score-val">{evaluation.totalScore}</span>
                <span className="neuro-aspects-score-max">/10</span>
              </div>
              <div className="neuro-aspects-verdict">
                <span className="neuro-aspects-verdict-title">
                  {evaluation.isFavorableForThrombectomy
                    ? 'Escore Favorável (ASPECTS >= 6)'
                    : 'Infarto Extenso Estabelecido (ASPECTS < 6)'}
                </span>
                <span className="neuro-aspects-verdict-desc">
                  {evaluation.clinicalInterpretation} {evaluation.recommendedAction}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={resetAspects}
              className="neuro-focus-3d-btn"
              title="Zerar seleção e restaurar ASPECTS 10/10"
            >
              <RotateCcw size={12} strokeWidth={1.5} aria-hidden="true" />
              <span>Resetar (10)</span>
            </button>
          </div>

          {/* Nível 1: Corte Ganglionar (7 territórios) */}
          <div className="neuro-subsection-header">
            <span>1. Nível Ganglionar (Tálamo, Núcleos da Base & Córtex M1–M3) — Clique nas áreas hipodensas</span>
          </div>
          <div className="neuro-aspects-grid">
            {ganglionicRegions.map((reg) => {
              const isAffected = affectedCodes.has(reg.id);
              return (
                <div
                  key={reg.id}
                  className={`neuro-aspects-tile ${isAffected ? 'affected' : ''}`}
                  onClick={() => toggleRegion(reg.id)}
                  role="checkbox"
                  aria-checked={isAffected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleRegion(reg.id);
                    }
                  }}
                >
                  <div className="neuro-aspects-tile-top">
                    <span className="neuro-badge-code">{reg.code}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {isAffected && <span className="neuro-deduct-pill">-1 pt</span>}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(reg.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                        title={`Focar ${reg.namePtBr} no Atlas 3D`}
                      >
                        <Focus size={11} strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <span className="neuro-aspects-tile-name">{reg.namePtBr}</span>
                  <span className="neuro-aspects-tile-desc">{reg.anatomicalDescription}</span>
                </div>
              );
            })}
          </div>

          {/* Nível 2: Corte Supraganglionar (3 territórios: M4, M5, M6) */}
          <div className="neuro-subsection-header" style={{ marginTop: '0.5rem' }}>
            <span>2. Nível Supraganglionar (Coroa Radiada / Acima dos Ventrículos Laterais: M4–M6)</span>
          </div>
          <div className="neuro-aspects-grid">
            {supraganglionicRegions.map((reg) => {
              const isAffected = affectedCodes.has(reg.id);
              return (
                <div
                  key={reg.id}
                  className={`neuro-aspects-tile ${isAffected ? 'affected' : ''}`}
                  onClick={() => toggleRegion(reg.id)}
                  role="checkbox"
                  aria-checked={isAffected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleRegion(reg.id);
                    }
                  }}
                >
                  <div className="neuro-aspects-tile-top">
                    <span className="neuro-badge-code">{reg.code}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {isAffected && <span className="neuro-deduct-pill">-1 pt</span>}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusClinicalTargetIds(reg.targetNodeIds);
                        }}
                        className="neuro-focus-3d-btn"
                        title={`Focar ${reg.namePtBr} no Atlas 3D`}
                      >
                        <Focus size={11} strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <span className="neuro-aspects-tile-name">{reg.namePtBr}</span>
                  <span className="neuro-aspects-tile-desc">{reg.anatomicalDescription}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBVIEW 2: 4 SANGRAMENTOS INTRACRANIANOS & RED FLAGS DE HERNIAÇÃO */}
      {subView === 'hemorrhages' && (
        <div className="neuro-section-body">
          <div className="neuro-subsection-header">
            <span>Diagnóstico Diferencial dos 4 Sangramentos Intracranianos na TC Sem Contraste</span>
          </div>
          <div className="neuro-cards-list">
            {INTRACRANIAL_HEMORRHAGES_MATRIX.map((hem) => (
              <article key={hem.id} className="neuro-clinical-item expanded">
                <div className="neuro-item-summary">
                  <div className="neuro-item-main">
                    <span className="neuro-item-title">{hem.namePtBr}</span>
                    <span className="neuro-item-subtitle">
                      Vaso: {hem.classicRupturedVessel} • Formato: {hem.ctMorphology}
                    </span>
                  </div>
                  <div className="neuro-item-meta">
                    <button
                      type="button"
                      onClick={() => focusClinicalTargetIds(hem.targetNodeIds)}
                      className="neuro-focus-3d-btn"
                    >
                      <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                      <span>3D</span>
                    </button>
                  </div>
                </div>
                <div className="neuro-item-details">
                  <p className="neuro-detail-text">
                    <strong>Relação Suturas/Dura:</strong> {hem.suturesAndDuralRelation}
                  </p>
                  <p className="neuro-detail-text">
                    <strong>Quadro Clínico:</strong> {hem.classicClinicalPresentation}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="neuro-subsection-header" style={{ marginTop: '0.6rem' }}>
            <span>Red Flags de Efeito de Massa e Herniações Cerebrais</span>
          </div>
          <div className="neuro-cards-list">
            {HERNIATION_RED_FLAGS.map((rf) => (
              <article key={rf.id} className="neuro-clinical-item expanded">
                <div className="neuro-item-summary">
                  <div className="neuro-item-main">
                    <span className="neuro-item-title">{rf.namePtBr}</span>
                    <span className="neuro-item-subtitle">Limiar Crítico: {rf.radiologicalThreshold}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => focusClinicalTargetIds(rf.targetNodeIds)}
                    className="neuro-focus-3d-btn"
                  >
                    <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
                    <span>3D</span>
                  </button>
                </div>
                <div className="neuro-item-details">
                  <p className="neuro-detail-text">
                    {rf.biomechanicalMechanism} — {rf.clinicalConsequence}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 3: ESCALA HOUNSFIELD (UH) & SINAIS PRECOCES DE AVC ISQUÊMICO */}
      {subView === 'hounsfield_signs' && (
        <div className="neuro-section-body">
          <div className="neuro-subsection-header">
            <span>Escala de Unidades Hounsfield (UH) na TC de Crânio</span>
          </div>
          <div className="neuro-cards-list">
            {HOUNSFIELD_SCALE_ENTRIES.map((uh) => (
              <article key={uh.id} className="neuro-clinical-item">
                <div className="neuro-item-summary">
                  <div className="neuro-item-main">
                    <span className="neuro-item-title">
                      {uh.substanceOrTissue} ({uh.radiologicalAppearance})
                    </span>
                    <span className="neuro-item-subtitle">{uh.clinicalNote}</span>
                  </div>
                  <span className="neuro-badge-code">{uh.huRange}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="neuro-subsection-header" style={{ marginTop: '0.6rem' }}>
            <Check size={12} strokeWidth={1.5} aria-hidden="true" />
            <span>4 Sinais Tomográficos Precoces de AVC Isquêmico de ACM (&lt; 3–6 horas)</span>
          </div>
          <div className="neuro-cards-list">
            {EARLY_MCA_ISCHEMIA_SIGNS.map((signText) => (
              <article key={signText} className="neuro-clinical-item">
                <div className="neuro-item-summary">
                  <div className="neuro-item-main">
                    <span className="neuro-item-subtitle" style={{ color: 'var(--text-primary)' }}>
                      {signText}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Focus,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import { CLINICAL_SIMULATION_CASES } from '../../../../shared/constants/neuroimagingCasesCatalog.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';

export const ClinicalCaseSimulatorTab: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedDiagnosis, setRevealedDiagnosis] = useState<Record<string, boolean>>({});

  const focusClinicalTargetIds = useAnatomyStore((s) => s.focusClinicalTargetIds);

  const currentCase = CLINICAL_SIMULATION_CASES[selectedCaseIndex] || CLINICAL_SIMULATION_CASES[0];
  const isRevealed = Boolean(revealedDiagnosis[currentCase.id]);
  const chosenOptionId = selectedAnswers[currentCase.id];
  const chosenOption = currentCase.quizOptions.find((o) => o.id === chosenOptionId);

  const handleSelectOption = (caseId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [caseId]: optionId }));
  };

  const toggleReveal = (caseId: string) => {
    setRevealedDiagnosis((prev) => ({ ...prev, [caseId]: !prev[caseId] }));
  };

  return (
    <div className="neuro-tab-pane">
      {/* Seletor de Casos Clínicos */}
      <div className="neuro-subnav-bar" role="tablist" aria-label="Casos Clínicos Neuroanatômicos">
        {CLINICAL_SIMULATION_CASES.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={selectedCaseIndex === idx}
            onClick={() => setSelectedCaseIndex(idx)}
            className={`neuro-subnav-btn ${selectedCaseIndex === idx ? 'active' : ''}`}
          >
            <Stethoscope size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>Caso {c.caseNumber}: {c.category}</span>
          </button>
        ))}
      </div>

      <div className="neuro-section-body">
        {/* Cabeçalho e Anamnese do Caso */}
        <div className="neuro-doctrine-well">
          <div className="neuro-doctrine-header">
            <div className="neuro-doctrine-title-wrap">
              <span className="neuro-doctrine-title">{currentCase.title}</span>
            </div>
            <button
              type="button"
              onClick={() => focusClinicalTargetIds(currentCase.targetNodeIds)}
              className="neuro-focus-3d-btn"
              title="Focar estruturas anatômicas acometidas no Atlas 3D"
            >
              <Focus size={12} strokeWidth={1.5} aria-hidden="true" />
              <span>Focar Topografia no 3D</span>
            </button>
          </div>
          <p className="neuro-detail-text" style={{ marginTop: '0.25rem' }}>
            <strong>Anamnese / Emergência:</strong> {currentCase.patientPresentation}
          </p>
          {currentCase.vitalSigns && (
            <p className="neuro-detail-text">
              <strong>Sinais Vitais:</strong> {currentCase.vitalSigns}
            </p>
          )}
        </div>

        {/* Achados do Exame Físico Neurológico */}
        <div className="neuro-subsection-header">
          <span>Exame Neurológico à Admissão</span>
        </div>
        <div className="neuro-clinical-item expanded">
          <div className="neuro-item-details" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
            <ul className="neuro-bullet-list">
              {currentCase.neurologicalExamFindings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desafio de Raciocínio Topográfico (Quiz Interativo) */}
        <div className="neuro-subsection-header" style={{ marginTop: '0.5rem' }}>
          <HelpCircle size={12} strokeWidth={1.5} aria-hidden="true" />
          <span>Desafio de Localização Topográfica</span>
        </div>
        <article className="neuro-clinical-item expanded">
          <div className="neuro-item-summary">
            <span className="neuro-item-title">{currentCase.keyClinicalQuestion}</span>
          </div>
          <div className="neuro-quiz-options">
            {currentCase.quizOptions.map((opt) => {
              const isSelected = chosenOptionId === opt.id;
              let optionClass = 'neuro-quiz-option-btn';
              if (chosenOptionId) {
                if (opt.isCorrect) optionClass += ' correct';
                else if (isSelected) optionClass += ' wrong';
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(currentCase.id, opt.id)}
                  className={optionClass}
                >
                  <span>{opt.label}</span>
                  {chosenOptionId && opt.isCorrect && (
                    <CheckCircle2 size={13} strokeWidth={1.5} className="text-emerald-400" aria-hidden="true" />
                  )}
                  {chosenOptionId && isSelected && !opt.isCorrect && (
                    <AlertCircle size={13} strokeWidth={1.5} className="text-rose-400" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
          {chosenOption && (
            <div className="neuro-quiz-feedback">
              <span className={chosenOption.isCorrect ? 'text-emerald-400' : 'text-amber-300'}>
                {chosenOption.isCorrect ? 'Correto:' : 'Revisão Anatômica:'}
              </span>{' '}
              <span>{chosenOption.feedback}</span>
            </div>
          )}
        </article>

        {/* Botão de Revelação Progressiva do Gabarito Topográfico Completo */}
        <button
          type="button"
          onClick={() => toggleReveal(currentCase.id)}
          className="neuro-reveal-btn"
        >
          {isRevealed ? (
            <EyeOff size={13} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Eye size={13} strokeWidth={1.5} aria-hidden="true" />
          )}
          <span>
            {isRevealed
              ? 'Ocultar Dissecação Topográfica Sinal por Sinal'
              : 'Revelar Diagnóstico Sindrômico, Dissecação Topográfica & Conduta'}
          </span>
        </button>

        {isRevealed && (
          <div className="neuro-cards-list" style={{ marginTop: '0.4rem' }}>
            <article className="neuro-clinical-item expanded">
              <div className="neuro-item-summary">
                <div className="neuro-item-main">
                  <span className="neuro-item-title">{currentCase.finalDiagnosis.syndromeName}</span>
                  <span className="neuro-item-subtitle">
                    Vaso / Mecanismo: {currentCase.finalDiagnosis.vesselInvolved}
                  </span>
                </div>
              </div>
              <div className="neuro-item-details">
                <p className="neuro-detail-text">
                  <strong>Topografia Exata:</strong> {currentCase.finalDiagnosis.exactTopography}
                </p>
                <p className="neuro-detail-text">
                  <strong>Síntese Fisiopatológica:</strong> {currentCase.keyClinicalAnswer}
                </p>
              </div>
            </article>

            {currentCase.reasoningSteps.map((step) => (
              <article key={step.findingTitle} className="neuro-clinical-item expanded">
                <div className="neuro-item-summary">
                  <div className="neuro-item-main">
                    <span className="neuro-item-title">{step.findingTitle}</span>
                    <span className="neuro-item-subtitle">Estrutura: {step.anatomicalStructure}</span>
                  </div>
                </div>
                <div className="neuro-item-details">
                  <p className="neuro-detail-text">{step.pathwayExplanation}</p>
                </div>
              </article>
            ))}

            <article className="neuro-clinical-item expanded">
              <div className="neuro-item-summary">
                <div className="neuro-item-main">
                  <span
                    className="neuro-item-title"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <ShieldAlert size={13} strokeWidth={1.5} className="text-amber-300" aria-hidden="true" />
                    <span>Conduta Médica / Neurocirúrgica de Emergência</span>
                  </span>
                </div>
              </div>
              <div className="neuro-item-details">
                <p className="neuro-detail-text">{currentCase.finalDiagnosis.immediateManagement}</p>
              </div>
            </article>
          </div>
        )}
      </div>
    </div>
  );
};

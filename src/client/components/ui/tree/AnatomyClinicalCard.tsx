import React from 'react';
import {
  Stethoscope,
  X,
  Focus,
  Maximize2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AnyAnatomicalNode } from '../../canvas/AnatomicalAtlasScene.tsx';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG } from '../../../../shared/constants/zAnatomyCatalog.ts';

interface AnatomyClinicalCardProps {
  selectedNode: AnyAnatomicalNode;
  onClose: () => void;
  allCatalogIds: string[];
}

export const AnatomyClinicalCard: React.FC<AnatomyClinicalCardProps> = ({
  selectedNode,
  onClose,
  allCatalogIds,
}) => {
  const [detailsExpanded, setDetailsExpanded] = React.useState(true);

  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const toggleVisibility = useAnatomyStore((s) => s.toggleVisibility);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);
  const isolatedOnly = useAnatomyStore((s) => s.isolatedOnly);
  const toggleIsolatedOnly = useAnatomyStore((s) => s.toggleIsolatedOnly);

  const isCurrentHidden = hiddenNodeIds.has(selectedNode.id);

  const handleFocus = () => {
    const item = Z_ANATOMY_CATALOG.find(
      (c) => c.id === selectedNode.id || c.node === selectedNode.id
    );
    if (item && item.explosionVector) {
      setCameraFocusTarget([
        item.explosionVector.x * 0.1,
        item.explosionVector.y * 0.1,
        item.explosionVector.z * 0.1,
      ]);
    } else {
      setCameraFocusTarget([0, 0, 0]);
    }
  };

  const handleIsolate = () => {
    isolateNode([selectedNode.id], allCatalogIds);
    toggleIsolatedOnly();
  };

  return (
    <div className="outliner-clinical-card" role="region" aria-label="Ficha clínica da estrutura selecionada">
      {/* Cabeçalho do Card */}
      <div className="outliner-clinical-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
          <Stethoscope size={14} className="text-cyan-400" aria-hidden="true" />
          <span className="outliner-clinical-title">Ficha Anatômica</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <button
            type="button"
            onClick={() => setDetailsExpanded(!detailsExpanded)}
            title={detailsExpanded ? 'Recolher detalhes médicos' : 'Expandir detalhes médicos'}
            aria-label="Alternar exibição de detalhes médicos"
            className="outliner-icon-btn"
          >
            {detailsExpanded ? <ChevronUp size={13} aria-hidden="true" /> : <ChevronDown size={13} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Fechar seleção (Esc)"
            aria-label="Fechar ficha clínica e desselecionar estrutura"
            className="outliner-icon-btn danger"
          >
            <X size={13} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Identificação da Peça */}
      <div className="outliner-clinical-body">
        <div className="outliner-clinical-name-pt">{selectedNode.namePtBr}</div>
        {selectedNode.nameLatin && (
          <div className="outliner-clinical-name-latin">{selectedNode.nameLatin}</div>
        )}

        <div className="outliner-clinical-tags">
          {selectedNode.fmaId && (
            <span className="fma-chip">{selectedNode.fmaId}</span>
          )}
          {selectedNode.systemName && (
            <span className="outliner-system-tag">{selectedNode.systemName}</span>
          )}
        </div>

        {/* Barra de Ações Rápidas Clínicas */}
        <div className="outliner-clinical-actions" role="group" aria-label="Ações de visualização 3D">
          <button
            type="button"
            onClick={handleFocus}
            title="Focar câmera 3D nesta estrutura (Tecla F)"
            className="outliner-action-pill"
          >
            <Focus size={11} aria-hidden="true" />
            <span>Focar (F)</span>
          </button>
          <button
            type="button"
            onClick={handleIsolate}
            title="Isolar estrutura no 3D (Tecla I)"
            className={`outliner-action-pill ${isolatedOnly ? 'active' : ''}`}
          >
            <Maximize2 size={11} aria-hidden="true" />
            <span>{isolatedOnly ? 'Restaurar' : 'Isolar (I)'}</span>
          </button>
          <button
            type="button"
            onClick={() => toggleVisibility(selectedNode.id)}
            title="Ocultar ou exibir esta peça (Tecla H)"
            className={`outliner-action-pill ${isCurrentHidden ? 'active-warning' : ''}`}
          >
            {isCurrentHidden ? (
              <Eye size={11} aria-hidden="true" />
            ) : (
              <EyeOff size={11} aria-hidden="true" />
            )}
            <span>{isCurrentHidden ? 'Exibir (H)' : 'Ocultar (H)'}</span>
          </button>
        </div>

        {/* Detalhes Médicos e Correlações */}
        {detailsExpanded && selectedNode.clinicalData && (
          <div className="outliner-clinical-details scrollbar-thin">
            {selectedNode.clinicalData.clinicalSignificance && (
              <div className="outliner-clinical-field">
                <span className="outliner-field-label">Importância Médica:</span>
                <p className="outliner-field-text">
                  {selectedNode.clinicalData.clinicalSignificance}
                </p>
              </div>
            )}
            {selectedNode.clinicalData.insertion && (
              <div className="outliner-clinical-field">
                <span className="outliner-field-label">Relações & Inserção:</span>
                <p className="outliner-field-text">
                  {selectedNode.clinicalData.insertion}
                </p>
              </div>
            )}
            {selectedNode.clinicalData.functionalAction && (
              <div className="outliner-clinical-field">
                <span className="outliner-field-label">Função / Fisiologia:</span>
                <p className="outliner-field-text">
                  {selectedNode.clinicalData.functionalAction}
                </p>
              </div>
            )}
            {selectedNode.clinicalData.innervation && (
              <div className="outliner-clinical-field">
                <span className="outliner-field-label">Inervação:</span>
                <p className="outliner-field-text">
                  {selectedNode.clinicalData.innervation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

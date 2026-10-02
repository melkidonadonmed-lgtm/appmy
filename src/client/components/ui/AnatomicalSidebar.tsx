import React, { useState } from 'react';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Sliders,
  Scissors,
  Bone,
  Activity,
  HeartPulse,
  Brain,
  Wind,
  Utensils,
  Shield,
  Droplet,
  Zap,
  Dna,
  MapPin,
  Focus,
  Stethoscope,
  X,
  Maximize2,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react';
import { SkullDivision } from '../../../shared/constants/cranium.ts';
import { ActiveAnatomicalSystem, AnyAnatomicalNode, AnatomicalRegion } from '../canvas/AnatomicalAtlasScene.tsx';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG } from '../../../shared/constants/zAnatomyCatalog.ts';

interface AnatomicalSidebarProps {
  explosionProgress: number;
  onExplosionChange: (val: number) => void;
  selectedNode: AnyAnatomicalNode | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  onToggleGhost: () => void;
  isolatedOnly: boolean;
  onToggleIsolated: () => void;
  activeDivision: SkullDivision | 'all';
  onDivisionChange: (div: SkullDivision | 'all') => void;
  activeSystem: ActiveAnatomicalSystem;
  onSystemChange: (sys: ActiveAnatomicalSystem) => void;
  activeRegion?: AnatomicalRegion;
  onRegionChange?: (reg: AnatomicalRegion) => void;
  layerPeelingLevel: number;
  onLayerPeelingChange: (level: number) => void;
}

export const AnatomicalSidebar: React.FC<AnatomicalSidebarProps> = ({
  explosionProgress,
  onExplosionChange,
  selectedNode,
  onSelectNode,
  ghostMode,
  onToggleGhost,
  isolatedOnly,
  onToggleIsolated,
  activeDivision,
  onDivisionChange,
  activeSystem,
  onSystemChange,
  activeRegion = 'all',
  onRegionChange,
  layerPeelingLevel,
  onLayerPeelingChange,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [showGlobalControls, setShowGlobalControls] = useState(false);

  const sidebarCollapsed = useAnatomyStore((s) => s.sidebarCollapsed);
  const toggleSidebarCollapsed = useAnatomyStore((s) => s.toggleSidebarCollapsed);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);
  const toggleVisibility = useAnatomyStore((s) => s.toggleVisibility);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);

  const isCurrentHidden = selectedNode ? hiddenNodeIds.has(selectedNode.id) : false;

  const handleFocusNode = () => {
    if (!selectedNode) return;
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

  // Botão flutuante quando o painel estiver recolhido no desktop
  if (sidebarCollapsed) {
    return (
      <button
        onClick={toggleSidebarCollapsed}
        title="Abrir Dossiê Clínico e Filtros"
        aria-label="Expandir painel de dossiê clínico"
        className="sidebar-collapsed-btn"
      >
        <PanelRightOpen size={16} aria-hidden="true" />
        <span>Dossiê Clínico</span>
      </button>
    );
  }

  // Bloco de controles globais (Sistemas, Regiões, Layer Peeling, Exploded View)
  const renderGlobalControls = () => (
    <>
      {/* Seção 1: Filtro de Sistemas Anatômicos (Zero Emojis - Ícones Lucide) */}
      <div className="panel-section" style={{ paddingBottom: '0.625rem' }}>
        <div className="section-title">
          <Sliders size={14} color="#38bdf8" aria-hidden="true" />
          <span>Sistemas Anatômicos</span>
        </div>
        <div className="button-group" style={{ flexWrap: 'wrap', gap: '0.3rem' }}>
          <button
            className={`btn-tag ${activeSystem === 'all' ? 'active' : ''}`}
            onClick={() => onSystemChange('all')}
          >
            <Sliders size={11} aria-hidden="true" />
            <span>Todos</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'skeletal' ? 'active' : ''}`}
            onClick={() => onSystemChange('skeletal')}
          >
            <Bone size={11} aria-hidden="true" />
            <span>Ossos (Cap. 2)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'muscular' ? 'active' : ''}`}
            onClick={() => onSystemChange('muscular')}
          >
            <Activity size={11} aria-hidden="true" />
            <span>Músculos (Cap. 3)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'cardiovascular' ? 'active' : ''}`}
            onClick={() => onSystemChange('cardiovascular')}
          >
            <HeartPulse size={11} aria-hidden="true" />
            <span>Cardio (Cap. 5)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'nervous' ? 'active' : ''}`}
            onClick={() => onSystemChange('nervous')}
          >
            <Brain size={11} aria-hidden="true" />
            <span>Nervoso (Cap. 4)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'respiratory' ? 'active' : ''}`}
            onClick={() => onSystemChange('respiratory')}
          >
            <Wind size={11} aria-hidden="true" />
            <span>Respiratório (Cap. 7)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'digestive' ? 'active' : ''}`}
            onClick={() => onSystemChange('digestive')}
          >
            <Utensils size={11} aria-hidden="true" />
            <span>Digestório (Cap. 8)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'lymphatic' ? 'active' : ''}`}
            onClick={() => onSystemChange('lymphatic')}
          >
            <Shield size={11} aria-hidden="true" />
            <span>Linfático (Cap. 6)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'urinary' ? 'active' : ''}`}
            onClick={() => onSystemChange('urinary')}
          >
            <Droplet size={11} aria-hidden="true" />
            <span>Urinário (Cap. 9)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'endocrine' ? 'active' : ''}`}
            onClick={() => onSystemChange('endocrine')}
          >
            <Zap size={11} aria-hidden="true" />
            <span>Endócrino (Cap. 11)</span>
          </button>
          <button
            className={`btn-tag ${activeSystem === 'reproductive' ? 'active' : ''}`}
            onClick={() => onSystemChange('reproductive')}
          >
            <Dna size={11} aria-hidden="true" />
            <span>Reprodutor (Cap. 10)</span>
          </button>
        </div>

        {/* Seletor de Região Anatômica do Esqueleto */}
        {(activeSystem === 'skeletal' || activeSystem === 'all') && (
          <div style={{ marginTop: '0.625rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginBottom: '0.35rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={12} aria-hidden="true" />
              <span>Região do Esqueleto:</span>
            </div>
            <div className="button-group" style={{ flexWrap: 'wrap', gap: '0.3rem' }}>
              <button
                className={`btn-tag ${activeRegion === 'all' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('all')}
                title="Visualizar os 335 ossos do esqueleto humano completo"
              >
                Todo o Esqueleto
              </button>
              <button
                className={`btn-tag ${activeRegion === 'cranium' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('cranium')}
                title="Foco exclusivo no Crânio e Viscerocrânio Facial"
              >
                Crânio & Face
              </button>
              <button
                className={`btn-tag ${activeRegion === 'spine' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('spine')}
                title="Foco na Coluna Vertebral Cervical, Torácica, Lombar e Sacro"
              >
                Coluna (C1-L5)
              </button>
              <button
                className={`btn-tag ${activeRegion === 'thorax' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('thorax')}
                title="Foco nas Costelas e Esterno"
              >
                Caixa Torácica
              </button>
              <button
                className={`btn-tag ${activeRegion === 'upper_limb' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('upper_limb')}
                title="Foco em Clavícula, Escápula, Úmero, Braço e Mão"
              >
                Membros Sup.
              </button>
              <button
                className={`btn-tag ${activeRegion === 'pelvis' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('pelvis')}
                title="Foco na Pelve e Cintura Pélvica"
              >
                Pelve & Cintura
              </button>
              <button
                className={`btn-tag ${activeRegion === 'lower_limb' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('lower_limb')}
                title="Foco em Fêmur, Patela, Tíbia, Fíbula e Pé"
              >
                Membros Inf.
              </button>
            </div>

            {/* Sub-divisão do Crânio */}
            {activeRegion === 'cranium' && (
              <div className="button-group" style={{ marginTop: '0.35rem', gap: '0.25rem' }}>
                <button
                  type="button"
                  className={`btn-tag ${activeDivision === 'all' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('all')}
                >
                  Todos do Crânio
                </button>
                <button
                  type="button"
                  className={`btn-tag ${activeDivision === 'neurocranium' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('neurocranium')}
                >
                  Neurocrânio (8)
                </button>
                <button
                  type="button"
                  className={`btn-tag ${activeDivision === 'viscerocranium' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('viscerocranium')}
                >
                  Viscerocrânio (14)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Seção 2: Mecanismo de Layer Peeling (Dissecção Miológica) */}
      {(activeSystem === 'muscular' || activeSystem === 'all') && (
        <div className="panel-section" style={{ paddingBottom: '0.625rem' }}>
          <div className="section-title">
            <Scissors size={14} color="#f59e0b" aria-hidden="true" />
            <span>Layer Peeling (Dissecção Miológica)</span>
            <span className="badge-pill" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
              Nível {layerPeelingLevel}
            </span>
          </div>

          <div className="slider-control">
            <input
              type="range"
              min="0"
              max="3"
              step="1"
              value={layerPeelingLevel}
              onChange={(e) => onLayerPeelingChange(parseInt(e.target.value))}
              aria-label="Controle de nível de dissecção miológica"
              className="anatomy-slider"
              style={{ accentColor: '#f59e0b' }}
            />
          </div>

          <div className="button-group">
            <button
              className={`btn-tag ${layerPeelingLevel === 0 ? 'active' : ''}`}
              onClick={() => onLayerPeelingChange(0)}
            >
              0: Esqueleto
            </button>
            <button
              className={`btn-tag ${layerPeelingLevel === 1 ? 'active' : ''}`}
              onClick={() => onLayerPeelingChange(1)}
            >
              1: Profundos
            </button>
            <button
              className={`btn-tag ${layerPeelingLevel === 2 ? 'active' : ''}`}
              onClick={() => onLayerPeelingChange(2)}
            >
              2: Superficiais
            </button>
            <button
              className={`btn-tag ${layerPeelingLevel === 3 ? 'active' : ''}`}
              onClick={() => onLayerPeelingChange(3)}
            >
              3: Fáscias/Pele
            </button>
          </div>
        </div>
      )}

      {/* Seção 3: Controle de Exploded View (GPU) Sincronizado */}
      <div className="panel-section" style={{ paddingBottom: '0.625rem' }}>
        <div className="section-title">
          <Layers size={14} color="#38bdf8" aria-hidden="true" />
          <span>Vista Explodida (GPU)</span>
          <span className="badge-pill">{Math.round(explosionProgress * 100)}%</span>
        </div>

        <div className="slider-control">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explosionProgress}
            onChange={(e) => onExplosionChange(parseFloat(e.target.value))}
            aria-label="Controle de progressão da vista explodida"
            className="anatomy-slider"
          />
        </div>

        <div className="button-group">
          <button
            className={`btn-tag ${explosionProgress === 0 ? 'active' : ''}`}
            onClick={() => onExplosionChange(0)}
          >
            0% (Montado)
          </button>
          <button
            className={`btn-tag ${Math.abs(explosionProgress - 0.5) < 0.05 ? 'active' : ''}`}
            onClick={() => onExplosionChange(0.5)}
          >
            50%
          </button>
          <button
            className={`btn-tag ${explosionProgress === 1 ? 'active' : ''}`}
            onClick={() => onExplosionChange(1)}
          >
            100% (Explosão)
          </button>
        </div>
      </div>
    </>
  );

  return (
    <aside
      className={`anatomical-panel ${mobileExpanded ? 'expanded' : ''}`}
      aria-label="Painel de Dossiê Clínico e Filtros Anatômicos"
    >
      {/* Barra de controle móvel (handle) */}
      <div
        className="mobile-drag-handle"
        onClick={() => setMobileExpanded(!mobileExpanded)}
      >
        <span className="drag-indicator"></span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
            {selectedNode ? selectedNode.namePtBr : 'Dossiê Clínico & Filtros'}
          </span>
          {mobileExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>
      </div>

      {/* 1. Cabeçalho do Painel Direito */}
      <div className="outliner-header">
        <div className="outliner-brand">
          <Stethoscope size={16} className="outliner-brand-icon" aria-hidden="true" />
          <div className="outliner-brand-text">
            <span className="outliner-title">
              {selectedNode ? 'Dossiê Clínico' : 'Inspector Anatômico'}
            </span>
            <span className="outliner-subtitle">
              {selectedNode ? (selectedNode.systemName || 'Estrutura Selecionada') : 'Dissecção & Filtros 3D'}
            </span>
          </div>
        </div>

        <div className="outliner-actions">
          {selectedNode && (
            <button
              onClick={() => onSelectNode(null)}
              title="Fechar seleção e voltar aos filtros"
              aria-label="Limpar elemento selecionado"
              className="outliner-icon-btn"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
          <button
            onClick={toggleSidebarCollapsed}
            title="Recolher painel lateral direito"
            aria-label="Recolher painel de dossiê clínico"
            className="outliner-icon-btn"
          >
            <PanelRightClose size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 2. Conteúdo Principal */}
      {selectedNode ? (
        /* Modo 1: Estrutura Selecionada -> Ficha Clínica no Topo */
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
          <div className="panel-section node-details" style={{ flex: 1 }}>
            {/* Breadcrumb Anatômico da Estrutura */}
            {selectedNode.clinicalData?.origin && (
              <div className="clinical-breadcrumb" title="Cadeia Anatômica Hierárquica">
                {selectedNode.clinicalData.origin}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
              <div>
                <h3 className="node-title">{selectedNode.namePtBr}</h3>
                <p className="node-latin"><em>{selectedNode.nameLatin}</em></p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span className="fma-chip">{selectedNode.fmaId || 'TA2'}</span>
              </div>
            </div>

            <div className="meta-tag-list">
              <span className="meta-tag">
                {selectedNode.systemName || 'Estrutura Anatômica'}
              </span>

              {'division' in selectedNode && (
                <span className="meta-tag">
                  {selectedNode.division === 'neurocranium' ? 'Neurocrânio' : 'Viscerocrânio'}
                </span>
              )}
            </div>

            {/* Ações Diretas da Peça */}
            <div className="view-actions" style={{ flexWrap: 'wrap', gap: '0.375rem', margin: '0.75rem 0' }}>
              <button
                type="button"
                className="btn-action"
                onClick={handleFocusNode}
                title="Focar e centralizar a câmera nesta peça (Tecla F)"
              >
                <Focus size={13} aria-hidden="true" />
                <span>Focar Peça (F)</span>
              </button>

              <button
                type="button"
                className={`btn-action ${ghostMode ? 'btn-active' : ''}`}
                onClick={onToggleGhost}
                title="Alternar Modo Fantasma (Esmaecer estruturas vizinhas)"
              >
                {ghostMode ? <EyeOff size={13} /> : <Eye size={13} />}
                <span>Fantasma</span>
              </button>

              <button
                type="button"
                className={`btn-action ${isolatedOnly ? 'btn-active' : ''}`}
                onClick={onToggleIsolated}
                title="Isolar esta estrutura (Tecla I)"
              >
                <Maximize2 size={13} />
                <span>{isolatedOnly ? 'Restaurar' : 'Isolar (I)'}</span>
              </button>

              <button
                type="button"
                className={`btn-action ${isCurrentHidden ? 'btn-active' : ''}`}
                onClick={() => toggleVisibility(selectedNode.id)}
                title="Ocultar ou exibir esta peça (Tecla H)"
              >
                {isCurrentHidden ? <Eye size={13} /> : <EyeOff size={13} />}
                <span>{isCurrentHidden ? 'Exibir (H)' : 'Ocultar (H)'}</span>
              </button>
            </div>

            {/* Dados Clínicos e Anatômicos */}
            {selectedNode.clinicalData && (
              <div className="clinical-card">
                {selectedNode.clinicalData.clinicalSignificance && (
                  <div className="clinical-item">
                    <span className="clinical-label">Importância Médica & Correlações:</span>
                    <p>{selectedNode.clinicalData.clinicalSignificance}</p>
                  </div>
                )}

                {selectedNode.clinicalData.insertion && (
                  <div className="clinical-item">
                    <span className="clinical-label">Relações Topográficas & Inserção:</span>
                    <p>{selectedNode.clinicalData.insertion}</p>
                  </div>
                )}

                {selectedNode.clinicalData.functionalAction && (
                  <div className="clinical-item">
                    <span className="clinical-label">Fisiologia / Função:</span>
                    <p>{selectedNode.clinicalData.functionalAction}</p>
                  </div>
                )}

                {selectedNode.clinicalData.innervation && (
                  <div className="clinical-item">
                    <span className="clinical-label">Inervação:</span>
                    <p>{selectedNode.clinicalData.innervation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Cartão de Atalhos Rápidos */}
            <div className="hotkeys-helper-card" style={{ marginTop: '0.75rem' }}>
              <span style={{ fontWeight: 700, color: '#cbd5e1' }}>Atalhos Cirúrgicos Rápidos:</span>
              <div className="hotkey-row">
                <span>Focar Câmera</span>
                <kbd className="hotkey-kbd">F</kbd>
              </div>
              <div className="hotkey-row">
                <span>Ocultar Peça</span>
                <kbd className="hotkey-kbd">H</kbd>
              </div>
              <div className="hotkey-row">
                <span>Isolar Peça</span>
                <kbd className="hotkey-kbd">I</kbd>
              </div>
              <div className="hotkey-row">
                <span>Limpar Seleção</span>
                <kbd className="hotkey-kbd">Esc</kbd>
              </div>
              <div className="hotkey-row">
                <span>Resetar Câmera</span>
                <kbd className="hotkey-kbd">R</kbd>
              </div>
            </div>
          </div>

          {/* Seção retrátil para filtros e dissecção mesmo com nó selecionado */}
          <div className="panel-section" style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => setShowGlobalControls(!showGlobalControls)}
              className="outliner-modules-toggle"
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.35rem 0' }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sliders size={13} color="#38bdf8" />
                <span>{showGlobalControls ? 'Ocultar Filtros Globais' : 'Ajustar Filtros & Dissecção 3D'}</span>
              </span>
              {showGlobalControls ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showGlobalControls && (
              <div style={{ marginTop: '0.5rem' }}>
                {renderGlobalControls()}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Modo 2: Nenhum nó selecionado -> Ferramentas Globais de Dissecção */
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
          {renderGlobalControls()}

          <div className="empty-selection" style={{ padding: '1rem', marginTop: 'auto' }}>
            <Stethoscope size={28} color="#64748b" aria-hidden="true" />
            <p style={{ lineHeight: 1.5, fontSize: '0.75rem', marginTop: '0.35rem' }}>
              Selecione qualquer elemento anatômico no modelo 3D ou no Outliner à esquerda para inspecionar correlações clínicas e vascularização.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

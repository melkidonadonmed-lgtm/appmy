import React, { useState, useMemo, useEffect } from 'react';
import {
  RotateCcw,
  EyeOff,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
  Sparkles,
  FolderTree,
  SlidersHorizontal,
  Stethoscope,
  ChevronsDown,
  ChevronsUp,
  Users,
  Brain,
} from 'lucide-react';
import { Z_ANATOMY_CATALOG, sanitizeNodeName } from '../../../../shared/constants/zAnatomyCatalog.ts';
import { FEMALE_REPRODUCTIVE_CATALOG } from '../../../../shared/constants/femaleReproductiveCatalog.ts';
import { buildTaxonomicTree } from '../../../../shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree, filterTreeByRegion } from '../../../../shared/utils/filterTaxonomicTree.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { AnatomyFiltersSection } from './AnatomyFiltersSection.tsx';
import { AnatomyClinicalCard } from './AnatomyClinicalCard.tsx';
import { NeuroAnatomyPanelSection } from './NeuroAnatomyPanelSection.tsx';
import { TreeGroup } from './TreeGroup.tsx';
import { GlobalSearchBox } from './GlobalSearchBox.tsx';
import { AnyAnatomicalNode } from '../../canvas/AnatomicalAtlasScene.tsx';

interface AnatomyTreePanelProps {
  onToggleMpr?: () => void;
  mprActive?: boolean;
  selectedNode?: AnyAnatomicalNode | null;
  onSelectNode?: (node: AnyAnatomicalNode | null) => void;
}

export const AnatomyTreePanel: React.FC<AnatomyTreePanelProps> = ({
  selectedNode,
  onSelectNode,
}) => {
  const [search, setSearch] = useState('');
  const [expandAllSignal, setExpandAllSignal] = useState<boolean | null>(null);

  const outlinerCollapsed = useAnatomyStore((s) => s.outlinerCollapsed);
  const toggleOutlinerCollapsed = useAnatomyStore((s) => s.toggleOutlinerCollapsed);
  const showAll = useAnatomyStore((s) => s.showAll);
  const hideAll = useAnatomyStore((s) => s.hideAll);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const activeSystems = useAnatomyStore((s) => s.activeSystems);
  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const biologicalSex = useAnatomyStore((s) => s.biologicalSex);
  const setBiologicalSex = useAnatomyStore((s) => s.setBiologicalSex);

  const sidebarTab = useAnatomyStore((s) => s.sidebarTab);
  const setSidebarTab = useAnatomyStore((s) => s.setSidebarTab);

  const fullTree = useMemo(
    () => buildTaxonomicTree(Z_ANATOMY_CATALOG, biologicalSex),
    [biologicalSex]
  );

  const allCatalogIds = useMemo(() => {
    const set = new Set<string>();
    for (const item of [...Z_ANATOMY_CATALOG, ...FEMALE_REPRODUCTIVE_CATALOG]) {
      set.add(item.id);
      if (item.node) {
        set.add(item.node);
        set.add(sanitizeNodeName(item.node));
      }
    }
    return Array.from(set);
  }, []);

  const visibleTree = useMemo(() => {
    const regionFiltered = filterTreeByRegion(fullTree, activeRegion);
    return filterTaxonomicTree(regionFiltered, search);
  }, [fullTree, activeRegion, search]);

  const activeCatalogForCount = useMemo(
    () =>
      biologicalSex === 'female'
        ? [
            ...Z_ANATOMY_CATALOG.filter((i) => i.system !== 'reproductive'),
            ...FEMALE_REPRODUCTIVE_CATALOG,
          ]
        : Z_ANATOMY_CATALOG,
    [biologicalSex]
  );

  const totalStructures = activeCatalogForCount.length;
  const hiddenCount = useMemo(() => {
    if (hiddenNodeIds.size === 0) return 0;
    let count = 0;
    for (const item of activeCatalogForCount) {
      if (
        hiddenNodeIds.has(item.id) ||
        (item.node && hiddenNodeIds.has(item.node)) ||
        (item.node && hiddenNodeIds.has(sanitizeNodeName(item.node)))
      ) {
        count++;
      }
    }
    return count;
  }, [hiddenNodeIds, activeCatalogForCount]);
  const visibleStructuresCount = Math.max(0, totalStructures - hiddenCount);

  useEffect(() => {
    if (selectedNode) {
      setSidebarTab('details');
    }
  }, [selectedNode, setSidebarTab]);

  if (outlinerCollapsed) {
    return (
      <button
        onClick={toggleOutlinerCollapsed}
        title="Abrir Navegador Anatômico"
        aria-label="Expandir navegador anatômico (Outliner TA2)"
        className="outliner-collapsed-btn"
      >
        <PanelLeftOpen size={16} aria-hidden="true" />
        <span>Navegador</span>
      </button>
    );
  }

  const activeSystemsCount = activeSystems.has('all')
    ? 'Todos'
    : `${activeSystems.size}`;

  return (
    <aside className="outliner-panel" aria-label="Navegador Anatômico (Outliner)">
      {/* 1. Cabeçalho do Painel */}
      <div className="outliner-header">
        <div className="outliner-brand">
          <Layers size={16} className="outliner-brand-icon" aria-hidden="true" />
          <div className="outliner-brand-text">
            <span className="outliner-title">Navegador Anatômico</span>
            <span className="outliner-subtitle">
              {visibleStructuresCount} de {totalStructures} visíveis
            </span>
          </div>
        </div>

        <div className="outliner-actions">
          <button
            onClick={showAll}
            title="Mostrar todas as estruturas"
            aria-label="Restaurar visibilidade completa de todas as estruturas"
            className="outliner-icon-btn"
          >
            <RotateCcw size={14} aria-hidden="true" />
          </button>
          <button
            onClick={() => hideAll(allCatalogIds)}
            title="Ocultar todas as estruturas"
            aria-label="Ocultar todas as estruturas anatômicas no visualizador 3D"
            className="outliner-icon-btn danger"
          >
            <EyeOff size={14} aria-hidden="true" />
          </button>
          <button
            onClick={toggleOutlinerCollapsed}
            title="Recolher painel lateral"
            aria-label="Recolher navegador anatômico"
            className="outliner-icon-btn"
          >
            <PanelLeftClose size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 2. Busca Global (Ctrl+K) */}
      <div className="outliner-search-wrapper">
        <GlobalSearchBox
          onSearchChange={(val) => setSearch(val)}
          onSelectStructure={(node) => {
            onSelectNode?.(node);
            setSidebarTab('details');
          }}
        />
      </div>

      {/* 2B. Seletor de Sexo Biológico */}
      <div className="outliner-sex-switcher-bar" role="group" aria-label="Sexo biológico do atlas anatômico">
        <div className="outliner-sex-switcher-label">
          <Users size={12} aria-hidden="true" />
          <span>Modelo:</span>
        </div>
        <div className="outliner-sex-switcher-pills">
          <button
            type="button"
            onClick={() => setBiologicalSex('male')}
            aria-pressed={biologicalSex === 'male'}
            className={`outliner-sex-pill ${biologicalSex === 'male' ? 'active male' : ''}`}
            title="Anatomia Masculina"
          >
            Masculino
          </button>
          <button
            type="button"
            onClick={() => setBiologicalSex('female')}
            aria-pressed={biologicalSex === 'female'}
            className={`outliner-sex-pill ${biologicalSex === 'female' ? 'active female' : ''}`}
            title="Anatomia Feminina (Glândula Mamária + Útero e Ovários)"
          >
            Feminino
          </button>
        </div>
      </div>

      {/* 3. Abas da Sidebar */}
      <nav className="outliner-tabs-nav" role="tablist" aria-label="Abas do navegador anatômico">
        <button
          type="button"
          role="tab"
          aria-selected={sidebarTab === 'tree'}
          aria-controls="outliner-tab-tree-panel"
          id="tab-btn-tree"
          onClick={() => setSidebarTab('tree')}
          className={`outliner-tab-btn ${sidebarTab === 'tree' ? 'active' : ''}`}
          title="Árvore de Sistemas e Estruturas (1ª Externa a 11ª Interna)"
        >
          <FolderTree size={13} aria-hidden="true" />
          <span>Sistemas</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={sidebarTab === 'filters'}
          aria-controls="outliner-tab-filters-panel"
          id="tab-btn-filters"
          onClick={() => setSidebarTab('filters')}
          className={`outliner-tab-btn ${sidebarTab === 'filters' ? 'active' : ''}`}
          title="Camadas, Translucidez e Regiões"
        >
          <SlidersHorizontal size={13} aria-hidden="true" />
          <span>Camadas</span>
          <span className="outliner-tab-badge highlight">{activeSystemsCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={sidebarTab === 'neuro'}
          aria-controls="outliner-tab-neuro-panel"
          id="tab-btn-neuro"
          onClick={() => setSidebarTab('neuro')}
          className={`outliner-tab-btn ${sidebarTab === 'neuro' ? 'active' : ''}`}
          title="Neuroanatomia e 12 Pares Cranianos"
        >
          <Brain size={13} aria-hidden="true" />
          <span>Neuro</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={sidebarTab === 'details'}
          aria-controls="outliner-tab-details-panel"
          id="tab-btn-details"
          onClick={() => setSidebarTab('details')}
          className={`outliner-tab-btn ${sidebarTab === 'details' ? 'active' : ''}`}
          title="Ficha Anatômica e Clínica da Peça Selecionada"
        >
          <Stethoscope size={13} aria-hidden="true" />
          <span>Ficha</span>
          {selectedNode ? (
            <span className="outliner-tab-indicator active" title="Estrutura Selecionada" />
          ) : (
            <span className="outliner-tab-indicator empty" />
          )}
        </button>
      </nav>

      {/* ABA 1: Árvore Taxonômica Direta (Sem Barras Intermediárias Redundantes) */}
      {sidebarTab === 'tree' && (
        <div
          id="outliner-tab-tree-panel"
          role="tabpanel"
          aria-labelledby="tab-btn-tree"
          className="outliner-tab-content"
        >
          <div className="outliner-tree-actions-bar">
            <span className="outliner-tree-count-text">
              Camadas (1ª Ext → 11ª Int)
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={() => setExpandAllSignal(true)}
                title="Expandir todas as pastas"
                className="outliner-mini-btn"
              >
                <ChevronsDown size={11} aria-hidden="true" />
                <span>Abrir</span>
              </button>
              <button
                type="button"
                onClick={() => setExpandAllSignal(false)}
                title="Recolher todas as pastas"
                className="outliner-mini-btn"
              >
                <ChevronsUp size={11} aria-hidden="true" />
                <span>Fechar</span>
              </button>
            </div>
          </div>

          <div
            className="outliner-tree-viewport scrollbar-thin"
            role="tree"
            aria-label="Árvore Taxonômica Z-Anatomy TA2"
          >
            {visibleTree.length > 0 ? (
              visibleTree.map((sysNode, idx) => (
                <TreeGroup
                  key={sysNode.id}
                  node={sysNode}
                  allCatalogIds={allCatalogIds}
                  initialExpanded={expandAllSignal ?? undefined}
                  isSearchActive={Boolean(search.trim())}
                  layerOrderIndex={idx + 1}
                />
              ))
            ) : (
              <div className="outliner-empty-state">
                <Sparkles size={22} className="outliner-empty-icon" aria-hidden="true" />
                <p>Nenhuma estrutura corresponde a &quot;{search}&quot;</p>
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="outliner-empty-clear-btn"
                >
                  Limpar busca
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ABA 2: Camadas & Regiões */}
      {sidebarTab === 'filters' && (
        <div
          id="outliner-tab-filters-panel"
          role="tabpanel"
          aria-labelledby="tab-btn-filters"
          className="outliner-tab-content scrollbar-thin"
          style={{ padding: '0.5rem', overflowY: 'auto' }}
        >
          <AnatomyFiltersSection />
        </div>
      )}

      {/* ABA 3: Neuroanatomia */}
      {sidebarTab === 'neuro' && (
        <div
          id="outliner-tab-neuro-panel"
          role="tabpanel"
          aria-labelledby="tab-btn-neuro"
          className="outliner-tab-content scrollbar-thin"
          style={{ padding: '0.5rem', overflowY: 'auto' }}
        >
          <NeuroAnatomyPanelSection />
        </div>
      )}

      {/* ABA 4: Ficha Clínica */}
      {sidebarTab === 'details' && (
        <div
          id="outliner-tab-details-panel"
          role="tabpanel"
          aria-labelledby="tab-btn-details"
          className="outliner-tab-content scrollbar-thin"
          style={{ padding: '0.5rem', overflowY: 'auto' }}
        >
          {selectedNode ? (
            <AnatomyClinicalCard
              selectedNode={selectedNode}
              onClose={() => {
                onSelectNode?.(null);
                setSidebarTab('tree');
              }}
              allCatalogIds={allCatalogIds}
            />
          ) : (
            <div className="outliner-details-empty-state">
              <div className="outliner-details-empty-icon">
                <Stethoscope size={28} className="text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="outliner-details-empty-title">Nenhuma Peça Selecionada</h3>
              <p className="outliner-details-empty-desc">
                Clique em qualquer estrutura no modelo 3D ou use a busca acima para ver sua ficha anatômica e clínica.
              </p>
              <button
                type="button"
                onClick={() => setSidebarTab('tree')}
                className="outliner-details-empty-btn"
              >
                <FolderTree size={13} aria-hidden="true" />
                <span>Ver Lista de Sistemas</span>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="outliner-footer">
        <span>Ocultos: {hiddenCount}</span>
        <span className="outliner-footer-source">Z-Anatomy TA2</span>
      </div>
    </aside>
  );
};

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
} from 'lucide-react';
import { Z_ANATOMY_CATALOG } from '../../../../shared/constants/zAnatomyCatalog.ts';
import { buildTaxonomicTree } from '../../../../shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree } from '../../../../shared/utils/filterTaxonomicTree.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { ModuleLayersSection } from './ModuleLayersSection.tsx';
import { AnatomyFiltersSection } from './AnatomyFiltersSection.tsx';
import { AnatomyClinicalCard } from './AnatomyClinicalCard.tsx';
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
  onToggleMpr,
  mprActive,
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

  const sidebarTab = useAnatomyStore((s) => s.sidebarTab);
  const setSidebarTab = useAnatomyStore((s) => s.setSidebarTab);

  // 1. Constrói a árvore canônica uma única vez
  const fullTree = useMemo(() => buildTaxonomicTree(Z_ANATOMY_CATALOG), []);

  // 2. Lista consolidada de todos os IDs para operações em massa
  const allCatalogIds = useMemo(() => {
    const set = new Set<string>();
    for (const item of Z_ANATOMY_CATALOG) {
      set.add(item.id);
      if (item.node) set.add(item.node);
    }
    return Array.from(set);
  }, []);

  // 3. Filtra a árvore dinamicamente conforme multi-seleção de sistemas e busca textual
  const visibleTree = useMemo(() => {
    let base = fullTree;
    if (activeSystems && !activeSystems.has('all')) {
      const filteredBySys = fullTree.filter((node) => {
        const sysId = node.systemId || node.id.replace('sys_', '');
        return activeSystems.has(sysId as any);
      });
      if (filteredBySys.length > 0) {
        base = filteredBySys;
      }
    }
    return filterTaxonomicTree(base, search);
  }, [fullTree, search, activeSystems]);

  const totalStructures = Z_ANATOMY_CATALOG.length;
  const hiddenCount = hiddenNodeIds.size;
  const visibleStructuresCount = Math.max(0, totalStructures - hiddenCount);

  // Quando o usuário seleciona um nó no 3D ou na busca, mudamos para a aba de Ficha Anatômica
  useEffect(() => {
    if (selectedNode) {
      setSidebarTab('details');
    }
  }, [selectedNode, setSidebarTab]);

  // Botão flutuante quando o painel estiver recolhido
  if (outlinerCollapsed) {
    return (
      <button
        onClick={toggleOutlinerCollapsed}
        title="Abrir Navegador Anatômico (Outliner)"
        aria-label="Expandir navegador anatômico (Outliner TA2)"
        className="outliner-collapsed-btn"
      >
        <PanelLeftOpen size={16} aria-hidden="true" />
        <span>Outliner TA2</span>
      </button>
    );
  }

  const activeSystemsCount = activeSystems.has('all')
    ? 'Todos'
    : `${activeSystems.size} ativo${activeSystems.size > 1 ? 's' : ''}`;

  return (
    <aside
      className="outliner-panel"
      aria-label="Navegador Anatômico (Outliner)"
    >
      {/* 1. Cabeçalho Principal do Painel */}
      <div className="outliner-header">
        <div className="outliner-brand">
          <Layers size={16} className="outliner-brand-icon" aria-hidden="true" />
          <div className="outliner-brand-text">
            <span className="outliner-title">Navegador Anatômico</span>
            <span className="outliner-subtitle">
              {totalStructures} peças TA2 mapeadas
            </span>
          </div>
        </div>

        <div className="outliner-actions">
          <button
            onClick={showAll}
            title="Restaurar visibilidade completa (Mostrar Tudo)"
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
            title="Recolher painel"
            aria-label="Recolher navegador anatômico"
            className="outliner-icon-btn"
          >
            <PanelLeftClose size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 2. Caixa de Pesquisa Global com Autocomplete e Atalho Ctrl+K */}
      <div className="outliner-search-wrapper">
        <GlobalSearchBox
          onSearchChange={(val) => setSearch(val)}
          onSelectStructure={(node) => {
            onSelectNode?.(node);
            setSidebarTab('details');
          }}
        />
      </div>

      {/* 3. Navegação Ergonômica por Abas Superiores */}
      <nav className="outliner-tabs-nav" role="tablist" aria-label="Abas do navegador anatômico">
        <button
          type="button"
          role="tab"
          aria-selected={sidebarTab === 'tree'}
          aria-controls="outliner-tab-tree-panel"
          id="tab-btn-tree"
          onClick={() => setSidebarTab('tree')}
          className={`outliner-tab-btn ${sidebarTab === 'tree' ? 'active' : ''}`}
          title="Árvore Hierárquica Z-Anatomy TA2"
        >
          <FolderTree size={13} aria-hidden="true" />
          <span>Árvore TA2</span>
          <span className="outliner-tab-badge">{visibleStructuresCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={sidebarTab === 'filters'}
          aria-controls="outliner-tab-filters-panel"
          id="tab-btn-filters"
          onClick={() => setSidebarTab('filters')}
          className={`outliner-tab-btn ${sidebarTab === 'filters' ? 'active' : ''}`}
          title="Filtros por Sistemas, Regiões e Planos de Dissecação"
        >
          <SlidersHorizontal size={13} aria-hidden="true" />
          <span>Filtros</span>
          <span className="outliner-tab-badge highlight">{activeSystemsCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={sidebarTab === 'details'}
          aria-controls="outliner-tab-details-panel"
          id="tab-btn-details"
          onClick={() => setSidebarTab('details')}
          className={`outliner-tab-btn ${sidebarTab === 'details' ? 'active' : ''}`}
          title="Ficha Anatômica e Dossiê Clínico do Item Selecionado"
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

      {/* 4. Conteúdo Dinâmico Conforme a Aba Ativa */}

      {/* ABA 1: Árvore Taxonômica TA2 */}
      {sidebarTab === 'tree' && (
        <div
          id="outliner-tab-tree-panel"
          role="tabpanel"
          aria-labelledby="tab-btn-tree"
          className="outliner-tab-content"
        >
          {/* Barra de Ações Rápidas da Árvore */}
          <div className="outliner-tree-actions-bar">
            <span className="outliner-tree-count-text">
              {visibleTree.length} sistemas exibidos
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={() => setExpandAllSignal(true)}
                title="Expandir todos os grupos da árvore"
                className="outliner-mini-btn"
              >
                <ChevronsDown size={11} aria-hidden="true" />
                <span>Expandir</span>
              </button>
              <button
                type="button"
                onClick={() => setExpandAllSignal(false)}
                title="Recolher todos os grupos da árvore"
                className="outliner-mini-btn"
              >
                <ChevronsUp size={11} aria-hidden="true" />
                <span>Recolher</span>
              </button>
            </div>
          </div>

          {/* Viewport com Rolagem da Árvore */}
          <div
            className="outliner-tree-viewport scrollbar-thin"
            role="tree"
            aria-label="Árvore Taxonômica Z-Anatomy TA2"
          >
            {visibleTree.length > 0 ? (
              visibleTree.map((sysNode) => (
                <TreeGroup
                  key={sysNode.id}
                  node={sysNode}
                  allCatalogIds={allCatalogIds}
                  initialExpanded={expandAllSignal ?? undefined}
                  isSearchActive={Boolean(search.trim())}
                />
              ))
            ) : (
              <div className="outliner-empty-state">
                <Sparkles size={22} className="outliner-empty-icon" aria-hidden="true" />
                <p>Nenhuma estrutura corresponde a "{search}"</p>
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

      {/* ABA 2: Filtros & Módulos (Sistemas, Regiões, MPR, Exploded, Densidade) */}
      {sidebarTab === 'filters' && (
        <div
          id="outliner-tab-filters-panel"
          role="tabpanel"
          aria-labelledby="tab-btn-filters"
          className="outliner-tab-content scrollbar-thin"
          style={{ padding: '0.5rem', overflowY: 'auto' }}
        >
          {/* Seção 1: Filtros de Sistemas e Regiões */}
          <AnatomyFiltersSection />

          {/* Seção 2: Módulos & Camadas Funcionais (MPR, Exploded View, Densidade, Planos Cirúrgicos) */}
          <div style={{ marginTop: '0.6rem' }}>
            <ModuleLayersSection onToggleMpr={onToggleMpr} mprActive={mprActive} />
          </div>
        </div>
      )}

      {/* ABA 3: Ficha Clínica e Dossiê Anatômico */}
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
                Clique em qualquer osso, órgão ou músculo no visualizador 3D ou utilize o campo de pesquisa acima para abrir o prontuário anatômico completo.
              </p>
              <button
                type="button"
                onClick={() => setSidebarTab('tree')}
                className="outliner-details-empty-btn"
              >
                <FolderTree size={13} aria-hidden="true" />
                <span>Navegar pela Árvore TA2</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Rodapé Informativo */}
      <div className="outliner-footer">
        <span>Ocultos: {hiddenCount} nós</span>
        <span className="outliner-footer-source">Z-Anatomy CC BY-SA 4.0</span>
      </div>
    </aside>
  );
};

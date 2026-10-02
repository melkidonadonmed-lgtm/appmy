import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  RotateCcw,
  EyeOff,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Z_ANATOMY_CATALOG } from '../../../../shared/constants/zAnatomyCatalog.ts';
import { buildTaxonomicTree } from '../../../../shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree } from '../../../../shared/utils/filterTaxonomicTree.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { ModuleLayersSection } from './ModuleLayersSection.tsx';
import { AnatomyFiltersSection } from './AnatomyFiltersSection.tsx';
import { AnatomyClinicalCard } from './AnatomyClinicalCard.tsx';
import { TreeGroup } from './TreeGroup.tsx';
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

  const outlinerCollapsed = useAnatomyStore((s) => s.outlinerCollapsed);
  const toggleOutlinerCollapsed = useAnatomyStore(
    (s) => s.toggleOutlinerCollapsed
  );
  const showAll = useAnatomyStore((s) => s.showAll);
  const hideAll = useAnatomyStore((s) => s.hideAll);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const activeSystem = useAnatomyStore((s) => s.activeSystem);

  // 1. Constrói a árvore canônica a partir do catálogo uma única vez
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

  // 3. Filtra a árvore dinamicamente conforme sistema ativo e busca textual
  const visibleTree = useMemo(() => {
    let base = fullTree;
    if (activeSystem !== 'all') {
      const filteredBySys = fullTree.filter(
        (node) =>
          node.systemId === activeSystem || node.id === `sys_${activeSystem}`
      );
      if (filteredBySys.length > 0) {
        base = filteredBySys;
      }
    }
    return filterTaxonomicTree(base, search);
  }, [fullTree, search, activeSystem]);

  const totalStructures = Z_ANATOMY_CATALOG.length;
  const hiddenCount = hiddenNodeIds.size;

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

  return (
    <aside
      className="outliner-panel"
      aria-label="Navegador Anatômico (Outliner)"
    >
      {/* 1. Cabeçalho do Painel */}
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

      {/* 2. Dossiê Clínico Compacto (Exibido quando houver estrutura selecionada) */}
      {selectedNode && (
        <AnatomyClinicalCard
          selectedNode={selectedNode}
          onClose={() => onSelectNode?.(null)}
          allCatalogIds={allCatalogIds}
        />
      )}

      {/* 3. Seção de Filtros Selecionáveis (Sistemas e Regiões) */}
      <AnatomyFiltersSection />

      {/* 4. Seção de Módulos & Camadas Funcionais (MPR, Exploded View, Densidade) */}
      <ModuleLayersSection onToggleMpr={onToggleMpr} mprActive={mprActive} />

      {/* 5. Campo de Busca em Tempo Real */}
      <div className="outliner-search-box">
        <div className="outliner-search-input-wrap">
          <Search
            size={14}
            className="outliner-search-icon"
            aria-hidden="true"
          />
          <input
            id="outliner-search-input"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar por nome, latim ou sistema..."
            aria-label="Filtrar estruturas anatômicas por nome, latim ou sistema"
            className="outliner-search-input"
            autoComplete="off"
            spellCheck="false"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              title="Limpar busca"
              aria-label="Limpar termo de busca"
              className="outliner-search-clear-btn"
            >
              <X size={13} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* 6. Lista da Árvore Hierárquica com Caixas de Seleção */}
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
              isSearchActive={Boolean(search.trim())}
            />
          ))
        ) : (
          <div className="outliner-empty-state">
            <Sparkles size={22} className="outliner-empty-icon" aria-hidden="true" />
            <p>Nenhuma estrutura corresponde a "{search}"</p>
            <button
              onClick={() => setSearch('')}
              className="outliner-empty-clear-btn"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>

      {/* 7. Rodapé Informativo */}
      <div className="outliner-footer">
        <span>Ocultos: {hiddenCount} nós</span>
        <span className="outliner-footer-source">Z-Anatomy CC BY-SA 4.0</span>
      </div>
    </aside>
  );
};

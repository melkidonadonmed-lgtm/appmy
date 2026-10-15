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
  MoreHorizontal,
} from 'lucide-react';
import { Z_ANATOMY_CATALOG, sanitizeNodeName } from '../../../../shared/constants/zAnatomyCatalog.ts';
import { buildTaxonomicTree } from '../../../../shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree, filterTreeByRegion } from '../../../../shared/utils/filterTaxonomicTree.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { ModuleLayersSection } from './ModuleLayersSection.tsx';
import { AnatomyFiltersSection } from './AnatomyFiltersSection.tsx';
import { AnatomyClinicalCard } from './AnatomyClinicalCard.tsx';
import { TreeGroup } from './TreeGroup.tsx';
import { GlobalSearchBox } from './GlobalSearchBox.tsx';
import { AnyAnatomicalNode, AnatomicalRegion } from '../../canvas/AnatomicalAtlasScene.tsx';

interface AnatomyTreePanelProps {
  onToggleMpr?: () => void;
  mprActive?: boolean;
  selectedNode?: AnyAnatomicalNode | null;
  onSelectNode?: (node: AnyAnatomicalNode | null) => void;
}

const STRATIGRAPHIC_STEPS: Array<{ depth: number; shortLabel: string; title: string }> = [
  { depth: 1, shortLabel: '1. Pele', title: 'Camada 1: Tegumento Comum completo (de fora para dentro)' },
  { depth: 2, shortLabel: '2. Fáscia/Sup', title: 'Camada 2: Remove a pele; exibe Fáscia translúcida e Músculos Superficiais Estriados' },
  { depth: 3, shortLabel: '3. Músc. Prof', title: 'Camada 3: Remove fáscia e músculos superficiais; exibe Músculos Profundos Estriados' },
  { depth: 4, shortLabel: '4. Ossos', title: 'Camada 4: Remove musculatura; exibe Esqueleto Axial e Apendicular' },
  { depth: 5, shortLabel: '5. Neurovasc', title: 'Camada 5: Exibe feixes Cardiovasculares, Nervosos e Linfáticos' },
  { depth: 6, shortLabel: '6. Vísceras', title: 'Camada 6: Órgãos internos cavitários' },
];

const QUICK_REGIONS: Array<{ id: AnatomicalRegion; label: string }> = [
  { id: 'all', label: 'Corpo Inteiro' },
  { id: 'cranium', label: 'Crânio' },
  { id: 'spine', label: 'Coluna' },
  { id: 'thorax', label: 'Tórax' },
  { id: 'upper_limb', label: 'M. Sup.' },
  { id: 'pelvis', label: 'Pelve' },
  { id: 'lower_limb', label: 'M. Inf.' },
];

export const AnatomyTreePanel: React.FC<AnatomyTreePanelProps> = ({
  onToggleMpr,
  mprActive,
  selectedNode,
  onSelectNode,
}) => {
  const [search, setSearch] = useState('');
  const [expandAllSignal, setExpandAllSignal] = useState<boolean | null>(null);
  const [showSecondaryStrat, setShowSecondaryStrat] = useState(true);

  const outlinerCollapsed = useAnatomyStore((s) => s.outlinerCollapsed);
  const toggleOutlinerCollapsed = useAnatomyStore((s) => s.toggleOutlinerCollapsed);
  const showAll = useAnatomyStore((s) => s.showAll);
  const hideAll = useAnatomyStore((s) => s.hideAll);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const activeSystems = useAnatomyStore((s) => s.activeSystems);
  const activeDepth = useAnatomyStore((s) => s.activeDepth);
  const setActiveDepth = useAnatomyStore((s) => s.setActiveDepth);
  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const setActiveRegion = useAnatomyStore((s) => s.setActiveRegion);
  const toggleGroupVisibility = useAnatomyStore((s) => s.toggleGroupVisibility);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);

  const sidebarTab = useAnatomyStore((s) => s.sidebarTab);
  const setSidebarTab = useAnatomyStore((s) => s.setSidebarTab);

  // 1. Constrói a árvore canônica uma única vez (ordenada de fora para dentro)
  const fullTree = useMemo(() => buildTaxonomicTree(Z_ANATOMY_CATALOG), []);

  // 2. Lista consolidada de todos os IDs e aliases para operações em massa (100% dos 11 sistemas)
  const allCatalogIds = useMemo(() => {
    const set = new Set<string>();
    for (const item of Z_ANATOMY_CATALOG) {
      set.add(item.id);
      if (item.node) {
        set.add(item.node);
        set.add(sanitizeNodeName(item.node));
      }
    }
    return Array.from(set);
  }, []);

  // 3. A Árvore É o próprio Filtro de Camadas/Sistemas:
  // Mantém todos os sistemas visíveis na árvore para que o usuário possa marcar/desmarcar qualquer grupo
  // sem que o grupo suma da lista, aplicando filtro topográfico (Região) e busca textual.
  const visibleTree = useMemo(() => {
    const regionFiltered = filterTreeByRegion(fullTree, activeRegion);
    return filterTaxonomicTree(regionFiltered, search);
  }, [fullTree, activeRegion, search]);

  // Subgrupos miofasciais para acesso rápido (Fáscia, Estriado Sup, Estriado Prof, Bolsas)
  const muscularSubgroups = useMemo(() => {
    const muscSys = fullTree.find((n) => n.id === 'sys_muscular');
    return muscSys?.children || [];
  }, [fullTree]);

  const totalStructures = Z_ANATOMY_CATALOG.length;
  const hiddenCount = useMemo(() => {
    if (hiddenNodeIds.size === 0) return 0;
    let count = 0;
    for (const item of Z_ANATOMY_CATALOG) {
      if (
        hiddenNodeIds.has(item.id) ||
        (item.node && hiddenNodeIds.has(item.node)) ||
        (item.node && hiddenNodeIds.has(sanitizeNodeName(item.node)))
      ) {
        count++;
      }
    }
    return count;
  }, [hiddenNodeIds]);
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

      {/* ABA 1: Árvore Taxonômica TA2 + Barra Estratigráfica Unificada */}
      {sidebarTab === 'tree' && (
        <div
          id="outliner-tab-tree-panel"
          role="tabpanel"
          aria-labelledby="tab-btn-tree"
          className="outliner-tab-content"
        >
          {/* Barra Estratigráfica Unificada (De Fora para Dentro: Camadas 1 a 6 + Subcamadas Miofasciais) */}
          <div className="outliner-stratigraphic-bar">
            <div className="outliner-strat-row">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span className="outliner-strat-label">Dissecação (Camadas):</span>
                <button
                  type="button"
                  onClick={() => setShowSecondaryStrat((prev) => !prev)}
                  aria-expanded={showSecondaryStrat}
                  className="outliner-mini-btn"
                  title="Revelação Progressiva: Alternar subcamadas miofasciais e filtro regional"
                >
                  <MoreHorizontal size={11} strokeWidth={1.5} aria-hidden="true" />
                  <span>{showSecondaryStrat ? 'Menos Filtros' : 'Subcamadas & Região'}</span>
                </button>
              </div>
              <div className="outliner-strat-pills" role="group" aria-label="Camadas cirúrgicas de fora para dentro">
                {STRATIGRAPHIC_STEPS.map((step) => {
                  const isActive = activeDepth === step.depth;
                  const isPeeled = activeDepth > step.depth;
                  return (
                    <button
                      key={step.depth}
                      type="button"
                      onClick={() => setActiveDepth(step.depth)}
                      aria-pressed={isActive}
                      title={step.title}
                      className={`outliner-strat-pill ${isActive ? 'active' : ''} ${isPeeled ? 'peeled' : ''}`}
                    >
                      {step.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcamadas Miofasciais (Fáscia Translúcida vs. Músculos Estriados) */}
            {showSecondaryStrat && muscularSubgroups.length > 0 && (
              <div className="outliner-strat-row">
                <span className="outliner-strat-label">Miofascial:</span>
                <div className="outliner-strat-pills" role="group" aria-label="Subcamadas de fáscia e músculos estriados">
                  {muscularSubgroups.map((sub) => {
                    const canonical = sub.descendantIds.filter((id) => id.startsWith('za:'));
                    const visibleInSub = canonical.filter((id) => !hiddenNodeIds.has(id)).length;
                    const isSubVisible = visibleInSub > 0;
                    const shortName =
                      sub.id === 'sub_muscular_fascia'
                        ? 'Fáscias'
                        : sub.id === 'sub_muscular_superficial'
                        ? 'Estriado Sup.'
                        : sub.id === 'sub_muscular_deep'
                        ? 'Estriado Prof.'
                        : 'Bolsas/Bainhas';
                    const dotColor =
                      sub.id === 'sub_muscular_fascia'
                        ? '#e2e8f0'
                        : sub.id === 'sub_muscular_superficial'
                        ? '#e05245'
                        : sub.id === 'sub_muscular_deep'
                        ? '#9e261f'
                        : '#7dd3fc';
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => toggleGroupVisibility(sub.descendantIds)}
                        onDoubleClick={() => isolateNode(sub.descendantIds, allCatalogIds)}
                        aria-pressed={isSubVisible}
                        title={`${sub.namePt} (${visibleInSub}/${canonical.length} visíveis) — Clique para alternar, duplo-clique para isolar`}
                        className={`outliner-strat-pill tissue ${isSubVisible ? 'active' : ''}`}
                      >
                        <span
                          className="outliner-tissue-dot"
                          style={{ backgroundColor: dotColor, opacity: isSubVisible ? 1 : 0.35 }}
                          aria-hidden="true"
                        />
                        <span>{shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filtro Topográfico Rápido de Região */}
            {showSecondaryStrat && (
              <div className="outliner-strat-row">
                <span className="outliner-strat-label">Região:</span>
                <div className="outliner-strat-pills" role="group" aria-label="Filtro rápido de região corporal">
                  {QUICK_REGIONS.map((reg) => (
                    <button
                      key={reg.id}
                      type="button"
                      onClick={() => setActiveRegion(reg.id)}
                      aria-pressed={activeRegion === reg.id}
                      className={`outliner-strat-pill ${activeRegion === reg.id ? 'active' : ''}`}
                    >
                      {reg.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Barra de Ações Rápidas da Árvore */}
          <div className="outliner-tree-actions-bar">
            <span className="outliner-tree-count-text">
              {visibleTree.length} camadas • {visibleStructuresCount}/{totalStructures} visíveis
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

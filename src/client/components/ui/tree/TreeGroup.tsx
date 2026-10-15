import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Check,
  Minus,
  Focus,
} from 'lucide-react';
import { TaxonomicTreeNode } from '../../../../shared/types/taxonomicTree.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { TreeItem } from './TreeItem.tsx';

interface TreeGroupProps {
  node: TaxonomicTreeNode;
  allCatalogIds: string[];
  initialExpanded?: boolean;
  isSearchActive?: boolean;
}

export const TreeGroup: React.FC<TreeGroupProps> = ({
  node,
  allCatalogIds,
  initialExpanded,
  isSearchActive = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    initialExpanded !== undefined ? initialExpanded : node.depth <= 1
  );

  useEffect(() => {
    if (typeof initialExpanded === 'boolean') {
      setIsExpanded(initialExpanded);
    }
  }, [initialExpanded]);

  useEffect(() => {
    if (isSearchActive) {
      setIsExpanded(true);
    }
  }, [isSearchActive]);

  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const toggleGroupVisibility = useAnatomyStore((s) => s.toggleGroupVisibility);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);

  // Calcula o estado Tri-State com base nos IDs canônicos (evita triplicar contagem por aliases)
  const canonicalIds = node.descendantIds.filter((id) => id.startsWith('za:'));
  const effectiveIds = canonicalIds.length > 0 ? canonicalIds : node.descendantIds;
  const totalCount = effectiveIds.length;
  let hiddenCount = 0;
  for (const id of effectiveIds) {
    if (hiddenNodeIds.has(id)) {
      hiddenCount++;
    }
  }

  const isChecked = hiddenCount === 0;
  const isUnchecked = totalCount > 0 && hiddenCount >= totalCount;
  const isIndeterminate = !isChecked && !isUnchecked;

  const visibleCount = Math.max(0, totalCount - hiddenCount);

  // Indicador cromático de tecido/camada para orientação visual imediata
  const getGroupAccentColor = (): string | null => {
    if (node.id === 'sub_muscular_fascia') return '#e2e8f0'; // Fáscia branco-perolada translúcida
    if (node.id === 'sub_muscular_superficial') return '#e05245'; // Músculo estriado superficial
    if (node.id === 'sub_muscular_deep') return '#9e261f'; // Músculo estriado profundo
    if (node.id === 'sub_muscular_bursae') return '#7dd3fc'; // Bolsas sinoviais ciano
    if (node.depth === 1) {
      switch (node.systemId) {
        case 'integumentary':
          return '#f5cba7';
        case 'muscular':
          return '#e05245';
        case 'skeletal':
          return '#e5dccb';
        case 'cardiovascular':
          return '#ef4444';
        case 'lymphatic':
          return '#10b981';
        case 'nervous':
          return '#facc15';
        default:
          return '#38bdf8';
      }
    }
    return null;
  };

  const accentColor = getGroupAccentColor();

  return (
    <div
      className="outliner-group"
      role="treeitem"
      aria-expanded={isExpanded}
      aria-selected={false}
    >
      {/* Linha de Cabeçalho do Grupo */}
      <div
        className="outliner-group-row"
        style={{ paddingLeft: `${Math.max(6, (node.depth - 1) * 12 + 6)}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          } else if (e.key === 'ArrowRight' && !isExpanded) {
            e.preventDefault();
            setIsExpanded(true);
          } else if (e.key === 'ArrowLeft' && isExpanded) {
            e.preventDefault();
            setIsExpanded(false);
          }
        }}
      >
        <div className="outliner-group-main">
          {/* Botão de Expansão (Chevron) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            aria-label={isExpanded ? `Recolher grupo ${node.namePt}` : `Expandir grupo ${node.namePt}`}
            className="outliner-chevron-btn"
          >
            {isExpanded ? (
              <ChevronDown size={14} aria-hidden="true" />
            ) : (
              <ChevronRight size={14} aria-hidden="true" />
            )}
          </button>

          {/* Checkbox Tri-State Unificado (Árvore = Filtro) */}
          <button
            type="button"
            role="checkbox"
            aria-checked={isChecked ? 'true' : isIndeterminate ? 'mixed' : 'false'}
            aria-label={`Alternar visibilidade do grupo ${node.namePt}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleGroupVisibility(node.descendantIds);
            }}
            title={
              isChecked
                ? 'Ocultar todas as estruturas desta camada/grupo'
                : 'Exibir todas as estruturas desta camada/grupo'
            }
            className={`outliner-checkbox-btn ${
              isChecked ? 'checked' : isIndeterminate ? 'indeterminate' : ''
            }`}
          >
            {isChecked && <Check size={11} strokeWidth={3} aria-hidden="true" />}
            {isIndeterminate && <Minus size={11} strokeWidth={3} aria-hidden="true" />}
          </button>

          {/* Marcador Cromático de Camada/Tecido */}
          {accentColor && (
            <span
              className="outliner-tissue-dot"
              style={{
                backgroundColor: accentColor,
                opacity: isUnchecked ? 0.3 : 1,
              }}
              aria-hidden="true"
            />
          )}

          {/* Rótulo do Grupo */}
          <span
            className={`outliner-group-title ${
              node.depth === 1
                ? 'depth-1'
                : node.depth === 2
                ? 'depth-2'
                : 'depth-3'
            } ${isUnchecked ? 'is-hidden-group' : ''}`}
          >
            {node.namePt}
          </span>
        </div>

        {/* Badge e Ações ao Passar o Mouse */}
        <div className="outliner-group-aside">
          <span
            className={`outliner-count-badge ${isUnchecked ? 'empty' : ''}`}
            aria-label={`${visibleCount} de ${totalCount} peças visíveis`}
          >
            {visibleCount}/{totalCount}
          </span>

          <button
            type="button"
            title={`Isolar ${node.namePt} (ocultar todas as demais)`}
            aria-label={`Isolar ${node.namePt} no modelo 3D`}
            onClick={(e) => {
              e.stopPropagation();
              isolateNode(node.descendantIds, allCatalogIds);
            }}
            className="outliner-isolate-btn"
          >
            <Focus size={12} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Filhos Recursivos */}
      {isExpanded && node.children && node.children.length > 0 && (
        <div
          className="outliner-group-children"
          role="group"
          aria-label={node.namePt}
        >
          {node.children.map((child: TaxonomicTreeNode) =>
            child.type === 'leaf' ? (
              <TreeItem
                key={child.id}
                node={child}
                allCatalogIds={allCatalogIds}
              />
            ) : (
              <TreeGroup
                key={child.id}
                node={child}
                allCatalogIds={allCatalogIds}
                initialExpanded={initialExpanded}
                isSearchActive={isSearchActive}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

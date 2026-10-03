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
  initialExpanded = false,
  isSearchActive = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    initialExpanded || node.depth <= 1
  );

  useEffect(() => {
    if (isSearchActive) {
      setIsExpanded(true);
    }
  }, [isSearchActive]);

  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const toggleGroupVisibility = useAnatomyStore((s) => s.toggleGroupVisibility);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);

  // Calcula o estado Tri-State com base nos descendantIds
  const totalCount = node.descendantIds.length;
  let hiddenCount = 0;
  for (const id of node.descendantIds) {
    if (hiddenNodeIds.has(id)) {
      hiddenCount++;
    }
  }

  const isChecked = hiddenCount === 0;
  const isUnchecked = hiddenCount >= totalCount;
  const isIndeterminate = !isChecked && !isUnchecked;

  const visibleCount = Math.max(0, totalCount - hiddenCount);

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

          {/* Checkbox Tri-State */}
          <button
            type="button"
            role="checkbox"
            aria-checked={isChecked ? 'true' : isIndeterminate ? 'mixed' : 'false'}
            aria-label={`Alternar visibilidade do grupo ${node.namePt}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleGroupVisibility(node.descendantIds);
              if (node.type === 'system' && node.systemId) {
                const store = useAnatomyStore.getState();
                if (!isChecked) {
                  store.addSystem(node.systemId as any);
                } else {
                  store.removeSystem(node.systemId as any);
                }
              }
            }}
            title={
              isChecked
                ? 'Ocultar todas as estruturas deste grupo'
                : 'Exibir todas as estruturas deste grupo'
            }
            className={`outliner-checkbox-btn ${
              isChecked ? 'checked' : isIndeterminate ? 'indeterminate' : ''
            }`}
          >
            {isChecked && <Check size={11} strokeWidth={3} aria-hidden="true" />}
            {isIndeterminate && <Minus size={11} strokeWidth={3} aria-hidden="true" />}
          </button>

          {/* Rótulo do Grupo */}
          <span
            className={`outliner-group-title ${
              node.depth === 1
                ? 'depth-1'
                : node.depth === 2
                ? 'depth-2'
                : 'depth-3'
            }`}
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
                isSearchActive={isSearchActive}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

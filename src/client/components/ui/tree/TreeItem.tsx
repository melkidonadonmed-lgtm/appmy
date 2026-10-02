import React, { useEffect, useRef } from 'react';
import { Eye, EyeOff, Focus } from 'lucide-react';
import { TaxonomicTreeNode } from '../../../../shared/types/taxonomicTree.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';

interface TreeItemProps {
  node: TaxonomicTreeNode;
  allCatalogIds: string[];
}

export const TreeItem: React.FC<TreeItemProps> = ({ node, allCatalogIds }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const hoveredNodeId = useAnatomyStore((s) => s.hoveredNodeId);
  const selectedNodeId = useAnatomyStore((s) => s.selectedNodeId);

  const toggleGroupVisibility = useAnatomyStore((s) => s.toggleGroupVisibility);
  const setHoveredNode = useAnatomyStore((s) => s.setHoveredNode);
  const setSelectedNode = useAnatomyStore((s) => s.setSelectedNode);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);

  // Um nó está oculto se qualquer de seus IDs ou nós sanitizados constar no Set
  const isHidden =
    node.descendantIds.some((id) => hiddenNodeIds.has(id)) ||
    hiddenNodeIds.has(node.id) ||
    (node.meshName ? hiddenNodeIds.has(node.meshName) : false);

  const isHovered =
    hoveredNodeId === node.id || (node.meshName ? hoveredNodeId === node.meshName : false);

  const isSelected =
    selectedNodeId === node.id || (node.meshName ? selectedNodeId === node.meshName : false);

  // Rolagem suave automática quando o elemento for apontado ou clicado no 3D
  useEffect(() => {
    if (isHovered || isSelected) {
      itemRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isHovered, isSelected]);

  return (
    <div
      ref={itemRef}
      role="treeitem"
      aria-selected={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedNode(node.id);
        }
      }}
      onMouseEnter={() => setHoveredNode(node.meshName || node.id)}
      onMouseLeave={() => setHoveredNode(null)}
      onClick={() => setSelectedNode(node.id)}
      className={`outliner-item-row ${isSelected ? 'selected' : ''} ${
        isHovered ? 'hovered' : ''
      }`}
      style={{ paddingLeft: `${Math.max(8, node.depth * 12)}px` }}
    >
      <div className="outliner-item-main">
        {/* Botão de Visibilidade (Eye / EyeOff) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleGroupVisibility(node.descendantIds);
          }}
          title={isHidden ? `Exibir ${node.namePt} no 3D` : `Ocultar ${node.namePt} no 3D`}
          aria-label={isHidden ? `Exibir ${node.namePt} no modelo 3D` : `Ocultar ${node.namePt} no modelo 3D`}
          className={`outliner-item-eye-btn ${isHidden ? 'hidden-state' : ''}`}
        >
          {isHidden ? (
            <EyeOff size={13} aria-hidden="true" />
          ) : (
            <Eye size={13} aria-hidden="true" />
          )}
        </button>

        {/* Nomes da Estrutura */}
        <div className="outliner-item-labels">
          <span
            className={`outliner-item-name-pt ${
              isHidden ? 'is-hidden' : ''
            }`}
          >
            {node.namePt}
          </span>
          {node.nameTA2 && (
            <span className="outliner-item-name-ta2">
              {node.nameTA2}
            </span>
          )}
        </div>
      </div>

      {/* Ação de Isolar Estrutura (visível ao passar o mouse) */}
      <button
        type="button"
        title={`Isolar ${node.namePt} (ocultar todas as demais)`}
        aria-label={`Isolar ${node.namePt} no modelo 3D`}
        onClick={(e) => {
          e.stopPropagation();
          isolateNode(node.descendantIds, allCatalogIds);
          setSelectedNode(node.id);
        }}
        className="outliner-isolate-btn"
      >
        <Focus size={12} aria-hidden="true" />
      </button>
    </div>
  );
};

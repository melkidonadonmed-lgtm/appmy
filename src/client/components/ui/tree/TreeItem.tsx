import React, { useEffect, useRef } from 'react';
import { Eye, EyeOff, Focus } from 'lucide-react';
import { TaxonomicTreeNode } from '../../../../shared/types/taxonomicTree.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';

const MIN_ITEM_PADDING_PX = 8;
const INDENT_PER_DEPTH_PX = 12;
const EYE_ICON_SIZE = 13;
const ISOLATE_ICON_SIZE = 12;

interface TreeItemProps {
  node: TaxonomicTreeNode;
  allCatalogIds: string[];
}

export const TreeItem: React.FC<TreeItemProps> = React.memo(({ node, allCatalogIds }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const clickedFromTreeRef = useRef<boolean>(false);

  // Seletores granulares booleanos O(1): evitam re-renderizar as 1.620 folhas a cada movimento do mouse
  const isHidden = useAnatomyStore((s) => {
    if (s.hiddenNodeIds.size === 0) return false;
    if (s.hiddenNodeIds.has(node.id)) return true;
    if (node.meshName && s.hiddenNodeIds.has(node.meshName)) return true;
    for (let i = 0; i < node.descendantIds.length; i++) {
      if (s.hiddenNodeIds.has(node.descendantIds[i])) return true;
    }
    return false;
  });

  const isHovered = useAnatomyStore(
    (s) =>
      s.hoveredNodeId !== null &&
      (s.hoveredNodeId === node.id ||
        (Boolean(node.meshName) && s.hoveredNodeId === node.meshName))
  );

  const isSelected = useAnatomyStore(
    (s) =>
      s.selectedNodeId !== null &&
      (s.selectedNodeId === node.id ||
        (Boolean(node.meshName) && s.selectedNodeId === node.meshName))
  );

  const toggleGroupVisibility = useAnatomyStore((s) => s.toggleGroupVisibility);
  const setHoveredNode = useAnatomyStore((s) => s.setHoveredNode);
  const selectAndFocusNode = useAnatomyStore((s) => s.selectAndFocusNode);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);

  // Rolagem suave apenas quando selecionado externamente (ex.: clique no modelo 3D ou busca), sem pular no hover
  useEffect(() => {
    if (isSelected && !clickedFromTreeRef.current) {
      itemRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    clickedFromTreeRef.current = false;
  }, [isSelected]);

  const handleSelect = () => {
    clickedFromTreeRef.current = true;
    selectAndFocusNode(node.id);
  };

  return (
    <div
      ref={itemRef}
      role="treeitem"
      aria-selected={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      }}
      onMouseEnter={() => setHoveredNode(node.meshName || node.id)}
      onMouseLeave={() => setHoveredNode(null)}
      onClick={handleSelect}
      className={`outliner-item-row ${isSelected ? 'selected' : ''} ${
        isHovered ? 'hovered' : ''
      }`}
      style={{ paddingLeft: `${Math.max(MIN_ITEM_PADDING_PX, node.depth * INDENT_PER_DEPTH_PX)}px` }}
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
          aria-label={
            isHidden
              ? `Exibir ${node.namePt} no modelo 3D`
              : `Ocultar ${node.namePt} no modelo 3D`
          }
          className={`outliner-item-eye-btn ${isHidden ? 'hidden-state' : ''}`}
        >
          {isHidden ? (
            <EyeOff size={EYE_ICON_SIZE} aria-hidden="true" />
          ) : (
            <Eye size={EYE_ICON_SIZE} aria-hidden="true" />
          )}
        </button>

        {/* Nomes da Estrutura */}
        <div className="outliner-item-labels">
          <span className={`outliner-item-name-pt ${isHidden ? 'is-hidden' : ''}`}>
            {node.namePt}
          </span>
          {node.nameTA2 && <span className="outliner-item-name-ta2">{node.nameTA2}</span>}
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
          selectAndFocusNode(node.id);
        }}
        className="outliner-isolate-btn"
      >
        <Focus size={ISOLATE_ICON_SIZE} aria-hidden="true" />
      </button>
    </div>
  );
});

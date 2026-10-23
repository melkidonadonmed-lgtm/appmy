import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Check,
  Minus,
  Focus,
} from 'lucide-react';
import { TaxonomicTreeNode } from '../../../../shared/types/taxonomicTree.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { TreeItem } from './TreeItem.tsx';

const BASE_GROUP_PADDING_PX = 8;
const GROUP_INDENT_STEP_PX = 14;
const CHEVRON_ICON_SIZE = 14;
const CHECK_ICON_SIZE = 11;
const CHECK_STROKE_WIDTH = 3;
const FOLDER_ICON_SIZE = 14;
const ISOLATE_ICON_SIZE = 12;
const OPACITY_UNCHECKED_FOLDER = 0.45;
const OPACITY_CHECKED_FOLDER = 0.92;

interface TreeGroupProps {
  node: TaxonomicTreeNode;
  allCatalogIds: string[];
  initialExpanded?: boolean;
  isSearchActive?: boolean;
  layerOrderIndex?: number;
}

const OUTSIDE_TO_INSIDE_BADGES: Record<string, string> = {
  sys_integumentary: '1ª EXT',
  sys_muscular: '2ª',
  sys_skeletal: '3ª',
  sys_cardiovascular: '4ª',
  sys_lymphatic: '5ª',
  sys_nervous: '6ª',
  sys_respiratory: '7ª',
  sys_digestive: '8ª',
  sys_renal: '9ª',
  sys_endocrine: '10ª',
  sys_reproductive: '11ª INT',
  sub_muscular_fascia: '2.1 EXT',
  sub_muscular_superficial: '2.2',
  sub_muscular_deep: '2.3',
  sub_muscular_bursae: '2.4 INT',
};

export const TreeGroup: React.FC<TreeGroupProps> = React.memo(
  ({
    node,
    allCatalogIds,
    initialExpanded,
    isSearchActive = false,
    layerOrderIndex,
  }) => {
    // Inicia fechado por padrão para exibir todas as 11 pastas de fora para dentro de forma limpa e previsível
    const [isExpanded, setIsExpanded] = useState<boolean>(
      initialExpanded !== undefined ? initialExpanded : false
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

    const effectiveIds = useMemo(() => {
      const canonicalIds = node.descendantIds.filter((id) => id.startsWith('za:'));
      return canonicalIds.length > 0 ? canonicalIds : node.descendantIds;
    }, [node.descendantIds]);

    const descendantSet = useMemo(() => new Set(node.descendantIds), [node.descendantIds]);

    // Auto-expande o ramo quando uma estrutura filha for selecionada no modelo 3D ou na busca
    const hasSelectedDescendant = useAnatomyStore((s) =>
      s.selectedNodeId ? descendantSet.has(s.selectedNodeId) : false
    );

    useEffect(() => {
      if (hasSelectedDescendant) {
        setIsExpanded(true);
      }
    }, [hasSelectedDescendant]);

    // Seletor numérico primitivo: evita re-renderizar ramos irmãos quando outra pasta muda de visibilidade
    const hiddenCount = useAnatomyStore((s) => {
      if (s.hiddenNodeIds.size === 0) return 0;
      let count = 0;
      for (let i = 0; i < effectiveIds.length; i++) {
        if (s.hiddenNodeIds.has(effectiveIds[i])) {
          count++;
        }
      }
      return count;
    });

    const toggleGroupVisibility = useAnatomyStore((s) => s.toggleGroupVisibility);
    const isolateNode = useAnatomyStore((s) => s.isolateNode);
    const biologicalSex = useAnatomyStore((s) => s.biologicalSex);
    const setBiologicalSex = useAnatomyStore((s) => s.setBiologicalSex);

    const totalCount = effectiveIds.length;

    // No sexo masculino, a camada mamária feminina (integumentary_female.glb) permanece desativada até que o usuário ative o modelo feminino
    const isSexInactiveIntegumentary =
      (node.id === 'sys_integumentary' || node.systemId === 'integumentary') &&
      biologicalSex === 'male';

    const isChecked = !isSexInactiveIntegumentary && hiddenCount === 0;
    const isUnchecked =
      isSexInactiveIntegumentary || (totalCount > 0 && hiddenCount >= totalCount);
    const isIndeterminate = !isChecked && !isUnchecked;

    const visibleCount = isSexInactiveIntegumentary
      ? 0
      : Math.max(0, totalCount - hiddenCount);

    // Indicador cromático de tecido/camada para orientação visual imediata
    const getGroupAccentColor = (): string | null => {
      if (node.id === 'sub_muscular_fascia') return '#e2e8f0';
      if (node.id === 'sub_muscular_superficial') return '#e05245';
      if (node.id === 'sub_muscular_deep') return '#9e261f';
      if (node.id === 'sub_muscular_bursae') return '#7dd3fc';
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
          case 'reproductive':
            return '#f43f5e';
          default:
            return '#38bdf8';
        }
      }
      return null;
    };

    const accentColor = getGroupAccentColor();
    const orderBadge =
      OUTSIDE_TO_INSIDE_BADGES[node.id] ||
      (node.depth === 1 && layerOrderIndex !== undefined ? `${layerOrderIndex}ª` : null);

    const handleCheckboxClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isSexInactiveIntegumentary) {
        setBiologicalSex('female');
        return;
      }
      toggleGroupVisibility(node.descendantIds);
    };

    return (
      <div
        className={`outliner-group ${isExpanded ? 'is-expanded' : ''}`}
        role="treeitem"
        aria-expanded={isExpanded}
        aria-selected={false}
      >
        {/* Linha de Cabeçalho da Pasta */}
        <div
          className={`outliner-group-row depth-row-${node.depth} ${isExpanded ? 'expanded' : ''}`}
          style={{
            paddingLeft: `${Math.max(
              BASE_GROUP_PADDING_PX,
              (node.depth - 1) * GROUP_INDENT_STEP_PX + BASE_GROUP_PADDING_PX
            )}px`,
          }}
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
              aria-label={
                isExpanded ? `Recolher pasta ${node.namePt}` : `Expandir pasta ${node.namePt}`
              }
              className="outliner-chevron-btn"
            >
              {isExpanded ? (
                <ChevronDown size={CHEVRON_ICON_SIZE} aria-hidden="true" />
              ) : (
                <ChevronRight size={CHEVRON_ICON_SIZE} aria-hidden="true" />
              )}
            </button>

            {/* Checkbox Tri-State Unificado (Descascar Camada de Fora para Dentro) */}
            <button
              type="button"
              role="checkbox"
              aria-checked={isChecked ? 'true' : isIndeterminate ? 'mixed' : 'false'}
              aria-label={`Alternar visibilidade da pasta ${node.namePt}`}
              onClick={handleCheckboxClick}
              title={
                isSexInactiveIntegumentary
                  ? 'Ativar modelo Feminino (Glândula Mamária + Aparelho Reprodutor Feminino)'
                  : isChecked
                  ? 'Desmarcar/descascar apenas esta pasta mantendo as camadas internas visíveis'
                  : 'Exibir todas as estruturas desta pasta'
              }
              className={`outliner-checkbox-btn ${
                isChecked ? 'checked' : isIndeterminate ? 'indeterminate' : ''
              }`}
            >
              {isChecked && (
                <Check size={CHECK_ICON_SIZE} strokeWidth={CHECK_STROKE_WIDTH} aria-hidden="true" />
              )}
              {isIndeterminate && (
                <Minus size={CHECK_ICON_SIZE} strokeWidth={CHECK_STROKE_WIDTH} aria-hidden="true" />
              )}
            </button>

            {/* Ícone de Pasta (Aberta vs Fechada) */}
            <span
              className="outliner-folder-icon"
              style={{
                color: accentColor || 'var(--accent)',
                opacity: isUnchecked ? OPACITY_UNCHECKED_FOLDER : OPACITY_CHECKED_FOLDER,
              }}
              aria-hidden="true"
            >
              {isExpanded ? <FolderOpen size={FOLDER_ICON_SIZE} /> : <Folder size={FOLDER_ICON_SIZE} />}
            </span>

            {/* Selo de Ordem Estratigráfica (De Fora Para Dentro) */}
            {orderBadge && (
              <span
                className={`outliner-layer-order-badge ${isUnchecked ? 'muted' : ''}`}
                title="Ordem anatômica de dissecação: De Fora Para Dentro (Superficial -> Profundo)"
              >
                {orderBadge}
              </span>
            )}

            {/* Rótulo da Pasta */}
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

          {/* Badge de Contagem e Botão Isolar */}
          <div className="outliner-group-aside">
            <span
              className={`outliner-count-badge ${isUnchecked ? 'empty' : ''}`}
              aria-label={`${visibleCount} de ${totalCount} peças visíveis`}
            >
              {visibleCount}/{totalCount}
            </span>

            <button
              type="button"
              title={`Isolar apenas ${node.namePt} (ocultar todas as demais camadas)`}
              aria-label={`Isolar ${node.namePt} no modelo 3D`}
              onClick={(e) => {
                e.stopPropagation();
                if (isSexInactiveIntegumentary) {
                  setBiologicalSex('female');
                }
                isolateNode(node.descendantIds, allCatalogIds);
              }}
              className="outliner-isolate-btn"
            >
              <Focus size={ISOLATE_ICON_SIZE} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Filhos Recursivos (Subpastas e Estruturas Ordenadas de Fora para Dentro) */}
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
  }
);

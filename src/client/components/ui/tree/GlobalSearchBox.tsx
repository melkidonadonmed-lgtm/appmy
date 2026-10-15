import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Sparkles, Command, ArrowRight, Stethoscope } from 'lucide-react';
import { Z_ANATOMY_CATALOG, ZAnatomyItem } from '../../../../shared/constants/zAnatomyCatalog.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { AnyAnatomicalNode, ActiveAnatomicalSystem } from '../../canvas/AnatomicalAtlasScene.tsx';
import {
  resolveRichClinicalData,
  searchNeuroClinicalEntities,
  ClinicalQuickSearchItem,
} from '../../../../shared/utils/clinicalEnrichment.ts';

export interface GlobalSearchBoxProps {
  onSelectStructure?: (node: AnyAnatomicalNode) => void;
  onSearchChange?: (term: string) => void;
  placeholder?: string;
}

/**
 * Normaliza strings removendo diacríticos (acentos) para busca tolerante
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Converte ZAnatomyItem em AnyAnatomicalNode enriquecido com dados clínicos reais
 */
function toNode(item: ZAnatomyItem): AnyAnatomicalNode {
  return {
    id: item.id,
    fmaId: item.fmaId,
    namePtBr: item.namePtBr,
    nameLatin: item.nameLatin,
    chapter: item.chapter as 2 | 4 | 5 | 7 | 8 | 9,
    systemName: item.system === 'skeletal' ? 'Sistema Esquelético (Osteologia)' : item.system,
    meshName: item.node,
    parentId: item.path.length > 0 ? item.path[item.path.length - 1] : undefined,
    colorHex: item.system === 'skeletal' ? '#f4ede2' : '#38bdf8',
    explosionVector: item.explosionVector,
    clinicalData: resolveRichClinicalData(item),
  } as AnyAnatomicalNode;
}

export const GlobalSearchBox: React.FC<GlobalSearchBoxProps> = ({
  onSelectStructure,
  onSearchChange,
  placeholder = 'Buscar peça, forame, NC I-XII, Brodmann... (Ctrl+K)',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setSelectedNode = useAnatomyStore((s) => s.setSelectedNode);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);
  const focusClinicalTargetIds = useAnatomyStore((s) => s.focusClinicalTargetIds);
  const setClinicalStudioOpen = useAnatomyStore((s) => s.setClinicalStudioOpen);
  const setClinicalStudioTab = useAnatomyStore((s) => s.setClinicalStudioTab);
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  // Atalho global Ctrl+K / Cmd+K para focar a barra de pesquisa
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Fecha o dropdown se clicar fora do container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Notifica o termo de busca para filtros externos (ex: árvore)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setHighlightedIndex(-1);
    setIsOpen(Boolean(value.trim()));
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  // Filtragem médica de alta performance com limite de resultados
  const searchResults = useMemo(() => {
    const query = normalizeText(searchTerm.trim());
    if (!query || query.length < 2) return [];

    const matches: ZAnatomyItem[] = [];
    for (const item of Z_ANATOMY_CATALOG) {
      const pt = normalizeText(item.namePtBr || '');
      const latin = normalizeText(item.nameLatin || '');
      const en = normalizeText(item.nameEn || '');
      const sys = normalizeText(item.system || '');
      const fma = normalizeText(item.fmaId || '');

      if (
        pt.includes(query) ||
        latin.includes(query) ||
        en.includes(query) ||
        sys.includes(query) ||
        fma.includes(query)
      ) {
        matches.push(item);
        if (matches.length >= 6) break;
      }
    }
    return matches;
  }, [searchTerm]);

  const clinicalMatches = useMemo(() => {
    return searchNeuroClinicalEntities(searchTerm, 4);
  }, [searchTerm]);

  const handleSelectClinicalMatch = (match: ClinicalQuickSearchItem) => {
    focusClinicalTargetIds(match.targetNodeIds);
    setClinicalStudioTab(match.studioTab);
    setClinicalStudioOpen(true);
    setIsOpen(false);
  };

  const handleSelectItem = (item: ZAnatomyItem) => {
    const store = useAnatomyStore.getState();
    const sys = item.system as ActiveAnatomicalSystem | undefined;
    if (sys && !store.isSystemActive(sys)) {
      store.addSystem(sys);
    }
    if (store.hiddenNodeIds.has(item.id) || (item.node && store.hiddenNodeIds.has(item.node))) {
      store.toggleVisibility(item.id);
    }
    setSelectedNode(item.id);

    const worldCenter =
      typeof window !== 'undefined'
        ? (window as unknown as { __selectedMeshWorldCenter?: [number, number, number] }).__selectedMeshWorldCenter
        : undefined;
    if (!worldCenter && item.explosionVector) {
      setCameraFocusTarget([
        item.explosionVector.x * 0.1,
        item.explosionVector.y * 0.1,
        item.explosionVector.z * 0.1,
      ]);
    }

    if (onSelectStructure) {
      onSelectStructure(toNode(item));
    }

    setIsOpen(false);
  };

  // Navegação de teclado no dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || searchResults.length === 0) {
      if (e.key === 'ArrowDown' && searchResults.length > 0) {
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
        handleSelectItem(searchResults[highlightedIndex]);
      } else if (searchResults.length > 0) {
        handleSelectItem(searchResults[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  return (
    <div ref={containerRef} className="global-search-container" role="search">
      <div className="global-search-input-wrap">
        <Search size={14} className="global-search-icon text-cyan-400" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchTerm.trim().length >= 2) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Buscar estrutura anatômica por nome ou termo em latim"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          className="global-search-input"
          autoComplete="off"
          spellCheck="false"
        />

        {searchTerm ? (
          <button
            type="button"
            onClick={handleClear}
            title="Limpar busca"
            aria-label="Limpar campo de busca"
            className="global-search-clear-btn"
          >
            <X size={13} aria-hidden="true" />
          </button>
        ) : (
          <div className="global-search-shortcut-badge" title="Pressione para buscar">
            <Command size={10} aria-hidden="true" />
            <span>{isMac ? 'K' : 'Ctrl+K'}</span>
          </div>
        )}
      </div>

      {/* Dropdown Flutuante de Autocomplete Instantâneo */}
      {isOpen && (searchResults.length > 0 || clinicalMatches.length > 0) && (
        <div
          className="global-search-dropdown scrollbar-thin"
          role="listbox"
          aria-label="Resultados da pesquisa rápida"
        >
          {clinicalMatches.length > 0 && (
            <>
              <div className="global-search-dropdown-header">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Stethoscope size={11} aria-hidden="true" />
                  <span>Referência Neuroclínica ({clinicalMatches.length})</span>
                </span>
                <span style={{ fontSize: '0.625rem', color: '#64748b' }}>Abre Estúdio + Foco 3D</span>
              </div>
              {clinicalMatches.map((match) => (
                <div
                  key={match.id}
                  role="option"
                  aria-selected={false}
                  onClick={() => handleSelectClinicalMatch(match)}
                  className="global-search-item"
                >
                  <div className="global-search-item-info">
                    <div className="global-search-item-primary">
                      <span className="global-search-item-name">{match.title}</span>
                      <span className="global-search-item-system-badge">{match.badge}</span>
                    </div>
                    <div className="global-search-item-latin">{match.subtitle}</div>
                  </div>
                  <ArrowRight size={13} className="global-search-item-arrow" aria-hidden="true" />
                </div>
              ))}
            </>
          )}

          {searchResults.length > 0 && (
            <>
              <div className="global-search-dropdown-header">
                <span>{searchResults.length} peças 3D TA2 encontradas</span>
                <span style={{ fontSize: '0.625rem', color: '#64748b' }}>↑ ↓ Enter</span>
              </div>

              {searchResults.map((item, idx) => {
                const isHighlighted = idx === highlightedIndex;
                return (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={isHighlighted}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => handleSelectItem(item)}
                    className={`global-search-item ${isHighlighted ? 'highlighted' : ''}`}
                  >
                    <div className="global-search-item-info">
                      <div className="global-search-item-primary">
                        <span className="global-search-item-name">{item.namePtBr}</span>
                        <span className="global-search-item-system-badge">{item.system}</span>
                      </div>
                      {item.nameLatin && (
                        <div className="global-search-item-latin">{item.nameLatin}</div>
                      )}
                    </div>
                    <ArrowRight size={13} className="global-search-item-arrow" aria-hidden="true" />
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {isOpen && searchTerm.trim().length >= 2 && searchResults.length === 0 && clinicalMatches.length === 0 && (
        <div className="global-search-dropdown empty">
          <Sparkles size={16} className="text-slate-500 mb-1" aria-hidden="true" />
          <span>Nenhuma estrutura anatômica encontrada para "{searchTerm}"</span>
        </div>
      )}
    </div>
  );
};

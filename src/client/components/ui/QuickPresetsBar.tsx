import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  BookmarkPlus,
  Trash2,
  X,
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import { getHoveredStructureMeta } from '../canvas/RealBodyAtlas.tsx';
import {
  loadBookmarks,
  saveBookmark,
  deleteBookmark,
  applyBookmarkToStore,
  ClinicalBookmark,
} from '../../lib/bookmarks-storage.ts';

export const QuickPresetsBar: React.FC = () => {
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [bookmarks, setBookmarks] = useState<ClinicalBookmark[]>([]);
  const [bookmarkName, setBookmarkName] = useState('');
  const hoveredNodeId = useAnatomyStore((s) => s.hoveredNodeId);
  const peelOnClickMode = useAnatomyStore((s) => s.peelOnClickMode);
  const hoveredMeta = getHoveredStructureMeta(hoveredNodeId);

  useEffect(() => {
    if (showBookmarksModal) {
      setBookmarks(loadBookmarks());
    }
  }, [showBookmarksModal]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const name = bookmarkName.trim();
    if (!name) return;

    const store = useAnatomyStore.getState();
    saveBookmark(name, {
      viewType: store.viewType,
      activeSystem: store.activeSystem,
      activeSystems: Array.from(store.activeSystems),
      systemOpacities: { ...store.systemOpacities },
      activeRegion: store.activeRegion,
      layerPeelingLevel: store.layerPeelingLevel,
      solidOpacity: store.solidOpacity,
      explosionProgress: store.explosionProgress,
      selectedNodeId: store.selectedNodeId,
      hiddenNodeIds: Array.from(store.hiddenNodeIds),
      cameraFocusTarget: store.cameraFocusTarget,
      cameraPositionTarget: store.cameraPositionTarget,
    });

    setBookmarks(loadBookmarks());
    setBookmarkName('');
  };

  const handleApply = (bm: ClinicalBookmark) => {
    applyBookmarkToStore(bm);
    setShowBookmarksModal(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBookmark(id);
    setBookmarks(loadBookmarks());
  };

  return (
    <div className="quick-presets-container">
      {showBookmarksModal && (
        <div className="bookmarks-popover" role="dialog" aria-label="Marcadores Clínicos Salvos">
          <div className="bookmarks-header">
            <div className="bookmarks-title">
              <Bookmark size={14} strokeWidth={1.5} aria-hidden="true" />
              <span>Marcadores Salvos</span>
            </div>
            <button
              type="button"
              className="bookmarks-close-btn"
              onClick={() => setShowBookmarksModal(false)}
              aria-label="Fechar painel de marcadores"
            >
              <X size={14} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSave} className="bookmarks-form">
            <input
              type="text"
              className="bookmarks-input"
              placeholder="Nome da visualização..."
              aria-label="Nome da visualização"
              value={bookmarkName}
              onChange={(e) => setBookmarkName(e.target.value)}
              maxLength={40}
            />
            <button
              type="submit"
              className="bookmarks-save-btn"
              title="Salvar perspectiva e dissecação atual"
              disabled={!bookmarkName.trim()}
            >
              <BookmarkPlus size={13} strokeWidth={1.5} aria-hidden="true" />
              <span>Salvar</span>
            </button>
          </form>

          <div className="bookmarks-list">
            {bookmarks.length === 0 ? (
              <div className="bookmarks-empty">
                Nenhum marcador salvo. Configure a vista 3D e salve acima.
              </div>
            ) : (
              bookmarks.map((bm) => (
                <div key={bm.id} className="bookmark-item">
                  <button
                    type="button"
                    className="bookmark-info"
                    onClick={() => handleApply(bm)}
                    title="Clique para restaurar este estado anatômico"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      flex: 1,
                    }}
                  >
                    <span className="bookmark-name">{bm.name}</span>
                    <span className="bookmark-date">
                      {new Date(bm.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="bookmark-delete-btn"
                    onClick={(e) => handleDelete(bm.id, e)}
                    title="Excluir marcador"
                    aria-label={`Excluir marcador ${bm.name}`}
                  >
                    <Trash2 size={12} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {hoveredMeta && (
        <div className="hovered-structure-pill" role="status" aria-live="polite">
          <span
            className="hovered-structure-dot"
            style={{ backgroundColor: hoveredMeta.colorHex }}
            aria-hidden="true"
          />
          <div className="hovered-structure-texts">
            <span className="hovered-structure-pt">{hoveredMeta.namePtBr}</span>
            <span className="hovered-structure-latin">{hoveredMeta.nameLatin}</span>
          </div>
          <span className="hovered-structure-area">{hoveredMeta.areaLabelPt}</span>
          <span className="hovered-structure-hint">
            {peelOnClickMode ? 'Clique para retirar' : 'Clique para inspecionar'}
          </span>
        </div>
      )}

      <div className="quick-presets-bar" aria-label="Marcadores Clínicos">
        <button
          type="button"
          onClick={() => setShowBookmarksModal((prev) => !prev)}
          className={`quick-preset-btn ${showBookmarksModal ? 'active' : ''}`}
          title="Salvar ou restaurar visualizações anatômicas (Marcadores)"
          aria-label="Marcadores Clínicos Salvos"
        >
          <Bookmark size={12} strokeWidth={1.5} aria-hidden="true" />
          <span>Marcadores</span>
        </button>
      </div>
    </div>
  );
};

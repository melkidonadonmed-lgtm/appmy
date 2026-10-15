import React, { useState, useEffect } from 'react';
import {
  Layers,
  Bone,
  Skull,
  HeartPulse,
  Stethoscope,
  Bookmark,
  BookmarkPlus,
  Trash2,
  X,
  Brain,
  Scissors,
  Undo2,
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore.ts';
import {
  loadBookmarks,
  saveBookmark,
  deleteBookmark,
  applyBookmarkToStore,
  ClinicalBookmark,
} from '../../lib/bookmarks-storage.ts';

export const QuickPresetsBar: React.FC = () => {
  const applyPreset = useAnatomyStore((s) => s.applyPreset);
  const activeSystem = useAnatomyStore((s) => s.activeSystem);
  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const solidOpacity = useAnatomyStore((s) => s.solidOpacity);
  const sidebarTab = useAnatomyStore((s) => s.sidebarTab);
  const peelOnClickMode = useAnatomyStore((s) => s.peelOnClickMode);
  const togglePeelOnClickMode = useAnatomyStore((s) => s.togglePeelOnClickMode);
  const peeledHistory = useAnatomyStore((s) => s.peeledHistory);
  const undoLastPeel = useAnatomyStore((s) => s.undoLastPeel);

  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [bookmarks, setBookmarks] = useState<ClinicalBookmark[]>([]);
  const [bookmarkName, setBookmarkName] = useState('');

  useEffect(() => {
    if (showBookmarksModal) {
      setBookmarks(loadBookmarks());
    }
  }, [showBookmarksModal]);

  const isPresetActive = (key: string) => {
    switch (key) {
      case 'all':
        return activeSystem === 'all' && activeRegion === 'all' && Math.abs(solidOpacity - 1.0) < 1e-4;
      case 'skeletal':
        return activeSystem === 'skeletal' && activeRegion === 'all';
      case 'cranium':
        return activeRegion === 'cranium' && activeSystem === 'skeletal';
      case 'neuroanatomy':
        return activeRegion === 'cranium' && activeSystem === 'nervous' || sidebarTab === 'neuro';
      case 'cardiorespiratory':
        return Math.abs(solidOpacity - 0.35) < 1e-4 && activeRegion === 'thorax';
      case 'visceral':
        return activeSystem === 'digestive' && Math.abs(solidOpacity) < 1e-4;
      default:
        return false;
    }
  };

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
              <Bookmark size={14} aria-hidden="true" />
              <span>Marcadores Clínicos</span>
            </div>
            <button
              type="button"
              className="bookmarks-close-btn"
              onClick={() => setShowBookmarksModal(false)}
              aria-label="Fechar painel de marcadores"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSave} className="bookmarks-form">
            <input
              type="text"
              className="bookmarks-input"
              placeholder="Nome da visualização..."
              value={bookmarkName}
              onChange={(e) => setBookmarkName(e.target.value)}
              maxLength={40}
            />
            <button
              type="submit"
              className="bookmarks-save-btn"
              title="Salvar perspectiva e dissecção atual"
              disabled={!bookmarkName.trim()}
            >
              <BookmarkPlus size={13} aria-hidden="true" />
              <span>Salvar</span>
            </button>
          </form>

          <div className="bookmarks-list">
            {bookmarks.length === 0 ? (
              <div className="bookmarks-empty">
                Nenhum marcador salvo ainda. Configure a perspectiva e salve acima.
              </div>
            ) : (
              bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="bookmark-item"
                  onClick={() => handleApply(bm)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleApply(bm);
                  }}
                  title="Clique para restaurar este estado anatômico"
                >
                  <div className="bookmark-info">
                    <span className="bookmark-name">{bm.name}</span>
                    <span className="bookmark-date">
                      {new Date(bm.createdAt).toLocaleDateString('pt-BR')} - {bm.activeSystem}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bookmark-delete-btn"
                    onClick={(e) => handleDelete(bm.id, e)}
                    title="Excluir marcador"
                    aria-label={`Excluir marcador ${bm.name}`}
                  >
                    <Trash2 size={12} aria-hidden="true" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="quick-presets-bar" aria-label="Presets Anatômicos Canônicos">
        <span className="quick-presets-label">Presets:</span>
        <div className="quick-presets-group">
          <button
            type="button"
            onClick={() => applyPreset('all')}
            className={`quick-preset-btn ${isPresetActive('all') ? 'active' : ''}`}
            title="Exibir Corpo Humano Completo"
            aria-label="Preset: Corpo Humano Completo"
          >
            <Layers size={12} aria-hidden="true" />
            <span>Geral</span>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('skeletal')}
            className={`quick-preset-btn ${isPresetActive('skeletal') ? 'active' : ''}`}
            title="Foco no Sistema Esquelético Completo (335 ossos)"
            aria-label="Preset: Sistema Esquelético"
          >
            <Bone size={12} aria-hidden="true" />
            <span>Esqueleto</span>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('cranium')}
            className={`quick-preset-btn ${isPresetActive('cranium') ? 'active' : ''}`}
            title="Foco no Crânio e Viscerocrânio Facial"
            aria-label="Preset: Crânio e Face"
          >
            <Skull size={12} aria-hidden="true" />
            <span>Crânio</span>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('neuroanatomy')}
            className={`quick-preset-btn ${isPresetActive('neuroanatomy') ? 'active' : ''}`}
            title="Foco em Neuroanatomia Clínica (Encéfalo Real .GLB, Nervos Cranianos I-XII e Crânio Translúcido)"
            aria-label="Preset: Neuroanatomia e Encéfalo"
          >
            <Brain size={12} aria-hidden="true" />
            <span>Neuro</span>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('cardiorespiratory')}
            className={`quick-preset-btn ${isPresetActive('cardiorespiratory') ? 'active' : ''}`}
            title="Foco no Coração, Pulmões e Tórax Translúcido"
            aria-label="Preset: Cardiorrespiratório"
          >
            <HeartPulse size={12} aria-hidden="true" />
            <span>Tórax & Cardio</span>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('visceral')}
            className={`quick-preset-btn ${isPresetActive('visceral') ? 'active' : ''}`}
            title="Foco nas Vísceras Abdominais e Sistema Digestório"
            aria-label="Preset: Vísceras Abdominais"
          >
            <Stethoscope size={12} aria-hidden="true" />
            <span>Viscerologia</span>
          </button>

          <div className="quick-presets-separator" aria-hidden="true" />

          <button
            type="button"
            onClick={togglePeelOnClickMode}
            aria-pressed={peelOnClickMode}
            className={`quick-preset-btn ${peelOnClickMode ? 'active' : ''}`}
            title="Modo Bisturi 3D: Quando ativo, clicar em qualquer estrutura no modelo 3D retira (oculta) essa camada para expor o interior"
            aria-label="Modo Bisturi 3D: Retirar camada ao clicar"
          >
            <Scissors size={12} aria-hidden="true" />
            <span>{peelOnClickMode ? 'Bisturi: ON' : 'Bisturi 3D'}</span>
          </button>

          {peeledHistory.length > 0 && (
            <button
              type="button"
              onClick={undoLastPeel}
              className="quick-preset-btn"
              title={`Desfazer última camada retirada (${peeledHistory.length} no histórico)`}
              aria-label="Desfazer última camada retirada"
            >
              <Undo2 size={12} aria-hidden="true" />
              <span>Desfazer ({peeledHistory.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowBookmarksModal((prev) => !prev)}
            className={`quick-preset-btn ${showBookmarksModal ? 'active' : ''}`}
            title="Abrir Marcadores Clínicos Salvos"
            aria-label="Marcadores Clínicos Salvos"
          >
            <Bookmark size={12} aria-hidden="true" />
            <span>Marcadores</span>
          </button>
        </div>
      </div>
    </div>
  );
};

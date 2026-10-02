import { ActiveAnatomicalSystem, AnatomicalRegion } from '../components/canvas/AnatomicalAtlasScene.tsx';
import { useAnatomyStore } from '../stores/useAnatomyStore.ts';

export interface ClinicalBookmark {
  id: string;
  name: string;
  createdAt: string;
  viewType: 'realistic' | 'exploded';
  activeSystem: ActiveAnatomicalSystem;
  activeRegion: AnatomicalRegion;
  layerPeelingLevel: number;
  solidOpacity: number;
  explosionProgress: number;
  selectedNodeId: string | null;
  hiddenNodeIds: string[];
  cameraFocusTarget?: [number, number, number] | null;
  cameraPositionTarget?: [number, number, number] | null;
}

export const BOOKMARKS_STORAGE_KEY = 'app_anatomy_clinical_bookmarks';

function getStorage(): Storage | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof globalThis !== 'undefined' && (globalThis as unknown as { localStorage?: Storage }).localStorage) {
    return (globalThis as unknown as { localStorage: Storage }).localStorage;
  }
  return null;
}

/**
 * Carrega a lista de bookmarks salvos no LocalStorage de forma resiliente
 */
export function loadBookmarks(): ClinicalBookmark[] {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const raw = storage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((b): b is ClinicalBookmark => {
      return (
        typeof b === 'object' &&
        b !== null &&
        typeof b.id === 'string' &&
        typeof b.name === 'string' &&
        typeof b.createdAt === 'string'
      );
    });
  } catch (err) {
    console.warn('[BookmarksStorage] Falha ao ler bookmarks do LocalStorage:', err);
    return [];
  }
}

/**
 * Salva um novo bookmark clínico no LocalStorage
 */
export function saveBookmark(
  name: string,
  snapshot: Omit<ClinicalBookmark, 'id' | 'createdAt' | 'name'>
): ClinicalBookmark {
  const bookmarks = loadBookmarks();
  const trimmedName = name.trim() || `Bookmark ${bookmarks.length + 1}`;

  const newBookmark: ClinicalBookmark = {
    ...snapshot,
    id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: trimmedName,
    createdAt: new Date().toISOString(),
  };

  bookmarks.unshift(newBookmark);

  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (err) {
      console.error('[BookmarksStorage] Erro ao gravar bookmark:', err);
    }
  }

  return newBookmark;
}

/**
 * Remove um bookmark existente pelo ID
 */
export function deleteBookmark(id: string): boolean {
  const bookmarks = loadBookmarks();
  const initialLength = bookmarks.length;
  const filtered = bookmarks.filter((b) => b.id !== id);

  if (filtered.length === initialLength) return false;

  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (err) {
      console.error('[BookmarksStorage] Erro ao deletar bookmark:', err);
      return false;
    }
  }
  return false;
}

/**
 * Aplica um bookmark ao useAnatomyStore com restauração completa de cena
 */
export function applyBookmarkToStore(
  bookmark: ClinicalBookmark,
  store = useAnatomyStore.getState()
): void {
  store.setViewType(bookmark.viewType);
  store.setActiveSystem(bookmark.activeSystem);
  store.setActiveRegion(bookmark.activeRegion);
  store.setLayerPeelingLevel(bookmark.layerPeelingLevel);
  store.setSolidOpacity(bookmark.solidOpacity);
  store.setExplosionProgress(bookmark.explosionProgress);
  store.setSelectedNode(bookmark.selectedNodeId);

  // Restaura visibilidade customizada de nós
  store.showAll();
  if (bookmark.hiddenNodeIds && bookmark.hiddenNodeIds.length > 0) {
    store.hideAll(bookmark.hiddenNodeIds);
  }

  // Restaura alvos de câmera
  if (bookmark.cameraFocusTarget) {
    store.setCameraFocusTarget(bookmark.cameraFocusTarget);
  }
  if (bookmark.cameraPositionTarget) {
    store.setCameraPositionTarget(bookmark.cameraPositionTarget);
  }
}

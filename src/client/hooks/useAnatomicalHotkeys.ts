import { useEffect } from 'react';
import { useAnatomyStore } from '../stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG } from '../../shared/constants/zAnatomyCatalog.ts';

/**
 * Hook global de atalhos de teclado clínicos para o visualizador 3D:
 * - 'H': Alternar visibilidade (Hide / Show) da peça selecionada
 * - 'I': Alternar isolamento da peça selecionada
 * - 'F': Focar / Centralizar câmera na peça selecionada
 * - 'Escape': Limpar seleção ativa
 * - 'R': Resetar câmera para posição anatômica frontal padrão
 */
export function useAnatomicalHotkeys() {
  const selectedNodeId = useAnatomyStore((s) => s.selectedNodeId);
  const setSelectedNode = useAnatomyStore((s) => s.setSelectedNode);
  const toggleVisibility = useAnatomyStore((s) => s.toggleVisibility);
  const isolateNode = useAnatomyStore((s) => s.isolateNode);
  const showAll = useAnatomyStore((s) => s.showAll);
  const setCameraFocusTarget = useAnatomyStore((s) => s.setCameraFocusTarget);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora atalhos se o foco estiver em campos de texto
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'h': {
          if (selectedNodeId) {
            e.preventDefault();
            toggleVisibility(selectedNodeId);
          }
          break;
        }

        case 'i': {
          if (selectedNodeId) {
            e.preventDefault();
            const allCatalogIds = Z_ANATOMY_CATALOG.map((item) => item.id);
            isolateNode(selectedNodeId, allCatalogIds);
          }
          break;
        }

        case 'f': {
          if (selectedNodeId) {
            e.preventDefault();
            // Dispara centralização de câmera mantendo o target
            const item = Z_ANATOMY_CATALOG.find(
              (c) => c.id === selectedNodeId || c.node === selectedNodeId
            );
            if (item && item.explosionVector) {
              setCameraFocusTarget([
                item.explosionVector.x * 0.1,
                item.explosionVector.y * 0.1,
                item.explosionVector.z * 0.1,
              ]);
            }
          }
          break;
        }

        case 'escape': {
          e.preventDefault();
          setSelectedNode(null);
          break;
        }

        case 'r': {
          e.preventDefault();
          setCameraFocusTarget([0, 0, 0]);
          showAll();
          break;
        }

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedNodeId,
    setSelectedNode,
    toggleVisibility,
    isolateNode,
    showAll,
    setCameraFocusTarget,
  ]);
}

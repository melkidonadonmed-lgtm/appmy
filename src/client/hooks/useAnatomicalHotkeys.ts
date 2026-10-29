import { useEffect } from 'react';
import { useAnatomyStore } from '../stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG, sanitizeNodeName } from '../../shared/constants/zAnatomyCatalog.ts';

/**
 * Hook global de atalhos de teclado clínicos para o visualizador 3D:
 * - 'H': Alternar visibilidade (Hide / Show) da peça selecionada
 * - 'I': Alternar isolamento da peça selecionada
 * - 'F': Focar / Centralizar e aproximar câmera na peça selecionada
 * - 'G': Alternar Contexto Fantasma (Ghost Mode 10% nas vizinhas)
 * - 'Z': Alternar Modo Foco Cirúrgico (Zen Mode 100% Viewport)
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
  const toggleZenMode = useAnatomyStore((s) => s.toggleZenMode);
  const toggleGhostMode = useAnatomyStore((s) => s.toggleGhostMode);
  const focusCameraOnNode = useAnatomyStore((s) => s.focusCameraOnNode);

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
            if (useAnatomyStore.getState().isolatedOnly) {
              showAll();
            } else {
              const allCatalogIds = Z_ANATOMY_CATALOG.flatMap((item) =>
                item.node ? [item.id, item.node, sanitizeNodeName(item.node)] : [item.id]
              );
              const selectedItem = Z_ANATOMY_CATALOG.find(
                (c) => c.id === selectedNodeId || c.node === selectedNodeId
              );
              const targetIds = selectedItem?.node
                ? [selectedItem.id, selectedItem.node, sanitizeNodeName(selectedItem.node)]
                : [selectedNodeId];
              isolateNode(targetIds, allCatalogIds);
            }
          }
          break;
        }

        case 'f': {
          if (selectedNodeId) {
            e.preventDefault();
            const worldCenter =
              typeof window !== 'undefined'
                ? (window as unknown as { __selectedMeshWorldCenter?: [number, number, number] })
                    .__selectedMeshWorldCenter
                : undefined;
            if (worldCenter) {
              setCameraFocusTarget([worldCenter[0], worldCenter[1], worldCenter[2]]);
              focusCameraOnNode(selectedNodeId, true);
              break;
            }
            // Fallback para ambientes de teste sem WebGL
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

        case 'g': {
          e.preventDefault();
          toggleGhostMode();
          break;
        }

        case 'z': {
          e.preventDefault();
          toggleZenMode();
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
    toggleZenMode,
    toggleGhostMode,
    focusCameraOnNode,
  ]);
}

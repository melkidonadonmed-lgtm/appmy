import { useState, useEffect } from 'react';
import {
  Layers,
  RotateCcw,
  Maximize2,
  Minimize2,
  Palette,
  Brain,
} from 'lucide-react';
import { SceneCanvas } from './components/canvas/SceneCanvas.tsx';
import { DissectionToolbar } from './components/ui/DissectionToolbar.tsx';
import { TelemetryOverlay } from './components/telemetry/TelemetryOverlay.tsx';
import { AnatomyTreePanel } from './components/ui/tree/AnatomyTreePanel.tsx';
import { OrientationGizmo } from './components/canvas/OrientationGizmo.tsx';
import { QuickPresetsBar } from './components/ui/QuickPresetsBar.tsx';
import { NeuroClinicalDrawer } from './components/ui/clinical/NeuroClinicalDrawer.tsx';
import { useAnatomicalHotkeys } from './hooks/useAnatomicalHotkeys.ts';
import { useAnatomyStore, PresetKeyType } from './stores/useAnatomyStore.ts';
import { SkullDivision, CRANIUM_22_NODES } from '../shared/constants/cranium.ts';
import { CRANIOFACIAL_MUSCLES } from '../shared/constants/myology.ts';
import { ALL_NEUROLOGY_NODES } from '../shared/constants/neurology.ts';
import { AnyAnatomicalNode } from './components/canvas/AnatomicalAtlasScene.tsx';
import { Z_ANATOMY_BY_ID, Z_ANATOMY_BY_NODE } from '../shared/constants/zAnatomyCatalog.ts';
import { resolveRichClinicalData } from '../shared/utils/clinicalEnrichment.ts';
import { installOfflineCacheFetchInterceptor } from './lib/modelCacheManager.ts';

export type TactileThemeId =
  | 'phantom-obsidian'
  | 'tactile-matte'
  | 'quiet-luxury-titanium'
  | 'steadfast-stainless'
  | 'warm-editorial-paper';

const TACTILE_THEMES: Array<{ id: TactileThemeId; label: string }> = [
  { id: 'phantom-obsidian', label: 'Phantom Obsidian' },
  { id: 'tactile-matte', label: 'Tactile Matte' },
  { id: 'quiet-luxury-titanium', label: 'Quiet Titanium' },
  { id: 'steadfast-stainless', label: 'Steadfast Stainless' },
  { id: 'warm-editorial-paper', label: 'Editorial Paper' },
];

const HEADER_PRESETS: Array<{ key: PresetKeyType; label: string; title: string }> = [
  { key: 'all', label: 'Corpo Inteiro', title: 'Exibir Corpo Humano Completo (Todos os Sistemas)' },
  { key: 'skeletal', label: 'Esqueleto', title: 'Focar Sistema Esquelético (335 Ossos)' },
  { key: 'cranium', label: 'Crânio', title: 'Focar Crânio e Face' },
  { key: 'neuroanatomy', label: 'Neuro', title: 'Focar Encéfalo Real e Nervos Cranianos (I-XII)' },
  { key: 'cardiorespiratory', label: 'Tórax', title: 'Focar Coração, Pulmões e Caixa Torácica' },
  { key: 'visceral', label: 'Vísceras', title: 'Focar Órgãos Abdominais e Sistema Digestório' },
];

export default function App() {
  const [tactileTheme, setTactileTheme] = useState<TactileThemeId>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('melki-tactile-theme') as TactileThemeId | null;
      if (saved && TACTILE_THEMES.some((t) => t.id === saved)) return saved;
    }
    return 'phantom-obsidian';
  });

  useEffect(() => {
    installOfflineCacheFetchInterceptor();
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', tactileTheme);
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('melki-tactile-theme', tactileTheme);
    }
  }, [tactileTheme]);

  // Ativa os atalhos de teclado clínicos (H, I, F, Esc, R, Z)
  useAnatomicalHotkeys();

  const viewType = useAnatomyStore((s) => s.viewType);
  const solidOpacity = useAnatomyStore((s) => s.solidOpacity);
  const explosionProgress = useAnatomyStore((s) => s.explosionProgress);
  const activeDivision = useAnatomyStore(() => 'all') as SkullDivision | 'all';
  const activeSystem = useAnatomyStore((s) => s.activeSystem);
  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const sidebarTab = useAnatomyStore((s) => s.sidebarTab);
  const layerPeelingLevel = useAnatomyStore((s) => s.layerPeelingLevel);
  const ghostMode = useAnatomyStore((s) => s.ghostMode);
  const isolatedOnly = useAnatomyStore((s) => s.isolatedOnly);

  const zenMode = useAnatomyStore((s) => s.zenMode);
  const toggleZenMode = useAnatomyStore((s) => s.toggleZenMode);
  const clinicalStudioOpen = useAnatomyStore((s) => s.clinicalStudioOpen);
  const setClinicalStudioOpen = useAnatomyStore((s) => s.setClinicalStudioOpen);

  const dissection = useAnatomyStore((s) => s.dissection);
  const setDissection = useAnatomyStore((s) => s.setDissection);
  const applyPreset = useAnatomyStore((s) => s.applyPreset);
  const showAll = useAnatomyStore((s) => s.showAll);
  const setExplosionProgress = useAnatomyStore((s) => s.setExplosionProgress);
  const setActiveDepth = useAnatomyStore((s) => s.setActiveDepth);

  const storeSelectedNodeId = useAnatomyStore((s) => s.selectedNodeId);
  const setStoreSelectedNode = useAnatomyStore((s) => s.setSelectedNode);

  const [selectedNode, setSelectedNode] = useState<AnyAnatomicalNode | null>(null);
  const [telemetry, setTelemetry] = useState({ fps: 60, triangles: 0, drawCalls: 0 });
  const [loadingHealth] = useState(false);

  const isPresetActive = (key: PresetKeyType): boolean => {
    switch (key) {
      case 'all':
        return activeSystem === 'all' && activeRegion === 'all' && Math.abs(solidOpacity - 1.0) < 1e-4;
      case 'skeletal':
        return activeSystem === 'skeletal' && activeRegion === 'all';
      case 'cranium':
        return activeRegion === 'cranium' && activeSystem === 'skeletal';
      case 'neuroanatomy':
        return (activeRegion === 'cranium' && activeSystem === 'nervous') || sidebarTab === 'neuro';
      case 'cardiorespiratory':
        return Math.abs(solidOpacity - 0.35) < 1e-4 && activeRegion === 'thorax';
      case 'visceral':
        return activeSystem === 'digestive' && Math.abs(solidOpacity) < 1e-4;
      default:
        return false;
    }
  };

  const handleFullReset = () => {
    setExplosionProgress(0);
    setActiveDepth(1);
    showAll();
    setSelectedNode(null);
    setStoreSelectedNode(null);
    applyPreset('all');
    setDissection((prev) => ({ ...prev, visualMode: 'solid', offset: 0, inverted: false }));
  };

  useEffect(() => {
    if (!storeSelectedNodeId) {
      setSelectedNode(null);
      return;
    }

    const item = Z_ANATOMY_BY_ID[storeSelectedNodeId] || Z_ANATOMY_BY_NODE[storeSelectedNodeId];
    if (item) {
      setSelectedNode({
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
      } as AnyAnatomicalNode);
      return;
    }

    const craniumNode = CRANIUM_22_NODES.find(
      (c) => c.id === storeSelectedNodeId || c.meshName === storeSelectedNodeId
    );
    if (craniumNode) {
      setSelectedNode(craniumNode);
      return;
    }

    const neuroNode = ALL_NEUROLOGY_NODES.find(
      (n) => n.id === storeSelectedNodeId || n.meshName === storeSelectedNodeId
    );
    if (neuroNode) {
      setSelectedNode(neuroNode);
      return;
    }

    const muscleNode = CRANIOFACIAL_MUSCLES.find(
      (m) => m.id === storeSelectedNodeId || m.meshName === storeSelectedNodeId
    );
    if (muscleNode) {
      setSelectedNode(muscleNode);
    }
  }, [storeSelectedNodeId]);

  return (
    <div className="app-shell">
      {/* Cabeçalho Superior Minimalista (3 Zonas: Identidade | Presets Rápidos | Ações 1+2) */}
      <header className="top-nav">
        <div className="brand-wrapper">
          <Layers size={18} strokeWidth={1.5} color="var(--accent)" aria-hidden="true" />
          <h1>Atlas 3D de Anatomia</h1>
        </div>

        {/* Zona Central: Atalhos Diretos de Foco Anatômico */}
        <nav className="mode-toggle-group" aria-label="Visões anatômicas rápidas">
          {HEADER_PRESETS.map((preset) => (
            <button
              key={preset.key}
              type="button"
              className={`mode-btn ${isPresetActive(preset.key) ? 'active' : ''}`}
              onClick={() => applyPreset(preset.key)}
              title={preset.title}
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </nav>

        {/* Zona Direita: 1 Ação Primária (Estúdio Clínico) + 2 Secundárias (Restaurar, Tela Cheia e Tema) */}
        <div className="nav-actions">
          <button
            type="button"
            className={`mode-btn ${clinicalStudioOpen ? 'active' : ''}`}
            onClick={() => setClinicalStudioOpen(!clinicalStudioOpen)}
            title="Abrir Estúdio Neuroclínico (14 Forames, Brodmann, 12 Pares Cranianos, ASPECTS e Casos)"
          >
            <Brain size={14} strokeWidth={1.5} aria-hidden="true" />
            <span>Estúdio Neuroclínico</span>
          </button>

          <button
            type="button"
            className="mode-btn"
            onClick={handleFullReset}
            title="Restaurar visão padrão, camadas e posição anatômica (Atalho: R)"
          >
            <RotateCcw size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>Restaurar</span>
          </button>

          <button
            type="button"
            className={`mode-btn ${zenMode ? 'active' : ''}`}
            onClick={toggleZenMode}
            title="Modo Tela Cheia / Foco Cirúrgico (Atalho: Z)"
          >
            {zenMode ? (
              <Minimize2 size={13} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Maximize2 size={13} strokeWidth={1.5} aria-hidden="true" />
            )}
            <span>{zenMode ? 'Sair do Foco' : 'Tela Cheia'}</span>
          </button>

          <div className="tactile-theme-well" title="Tema de Superfície">
            <Palette size={12} strokeWidth={1.5} aria-hidden="true" />
            <select
              aria-label="Selecionar Tema Tátil"
              value={tactileTheme}
              onChange={(e) => setTactileTheme(e.target.value as TactileThemeId)}
              className="tactile-theme-select"
            >
              {TACTILE_THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Região de status silenciosa para leitores de tela */}
      <div className="sr-only" role="status" aria-live="polite" aria-busy={loadingHealth}>
        {selectedNode ? `Estrutura selecionada: ${selectedNode.namePtBr}` : `Sistema ativo: ${activeSystem}, Região: ${activeRegion}`}
      </div>

      {/* Workspace Principal 3D */}
      <main className="main-viewport">
        <div className="atlas-workspace">
          <AnatomyTreePanel
            onToggleMpr={() =>
              setDissection((prev) => {
                const nextIsMpr = prev.visualMode !== 'mpr';
                return {
                  ...prev,
                  visualMode: nextIsMpr ? 'mpr' : 'solid',
                  showHelper: nextIsMpr ? true : prev.showHelper,
                };
              })
            }
            mprActive={dissection.visualMode === 'mpr'}
            selectedNode={selectedNode}
            onSelectNode={(node) => {
              setSelectedNode(node);
              setStoreSelectedNode(node?.id || null);
            }}
          />

          <div className="viewport-center-area">
            {zenMode && (
              <div
                className="zen-mode-badge"
                onClick={toggleZenMode}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleZenMode();
                }}
                title="Clique ou pressione Z para restaurar o painel lateral"
              >
                <Minimize2 size={13} strokeWidth={1.5} aria-hidden="true" />
                <span>Tela Cheia (Pressione Z para sair)</span>
              </div>
            )}

            <TelemetryOverlay
              fps={telemetry.fps}
              triangles={telemetry.triangles}
              drawCalls={telemetry.drawCalls}
            />

            <DissectionToolbar dissection={dissection} onChange={setDissection} />

            <OrientationGizmo />

            <QuickPresetsBar />

            <NeuroClinicalDrawer />

            <SceneCanvas
              viewType={viewType}
              realSkullOpacity={solidOpacity}
              explosionProgress={explosionProgress}
              selectedNode={selectedNode}
              onSelectNode={(node) => {
                setSelectedNode(node);
                setStoreSelectedNode(node?.id || null);
              }}
              ghostMode={ghostMode}
              isolatedOnly={isolatedOnly}
              activeDivision={activeDivision}
              activeSystem={activeSystem}
              activeRegion={activeRegion}
              layerPeelingLevel={layerPeelingLevel}
              dissection={dissection}
              onTelemetryUpdate={setTelemetry}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

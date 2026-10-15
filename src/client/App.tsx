import { useState, useEffect } from 'react';
import {
  Layers,
  Server,
  Flame,
  GitBranch,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Palette,
  MoveVertical,
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
import { useAnatomyStore } from './stores/useAnatomyStore.ts';
import { SkullDivision, CRANIUM_22_NODES } from '../shared/constants/cranium.ts';
import { CRANIOFACIAL_MUSCLES } from '../shared/constants/myology.ts';
import { ALL_NEUROLOGY_NODES } from '../shared/constants/neurology.ts';
import { AnyAnatomicalNode } from './components/canvas/AnatomicalAtlasScene.tsx';
import { Z_ANATOMY_BY_ID, Z_ANATOMY_BY_NODE } from '../shared/constants/zAnatomyCatalog.ts';
import { resolveRichClinicalData } from '../shared/utils/clinicalEnrichment.ts';
import { isFirebaseConfigured } from './lib/firebase.ts';

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

interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  service: string;
  version: string;
}

export default function App() {
  const [activeMode, setActiveMode] = useState<'3d-atlas' | 'infra-dashboard'>('3d-atlas');
  const [tactileTheme, setTactileTheme] = useState<TactileThemeId>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('melki-tactile-theme') as TactileThemeId | null;
      if (saved && TACTILE_THEMES.some((t) => t.id === saved)) return saved;
    }
    return 'phantom-obsidian';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', tactileTheme);
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('melki-tactile-theme', tactileTheme);
    }
  }, [tactileTheme]);

  // Ativa os atalhos de teclado clínicos (H, I, F, Esc, R)
  useAnatomicalHotkeys();

  // Estado Centralizado Reativo no Zustand (Single Source of Truth)
  const viewType = useAnatomyStore((s) => s.viewType);
  const setViewType = useAnatomyStore((s) => s.setViewType);

  const solidOpacity = useAnatomyStore((s) => s.solidOpacity);
  const setSolidOpacity = useAnatomyStore((s) => s.setSolidOpacity);

  const explosionProgress = useAnatomyStore((s) => s.explosionProgress);

  const activeDivision = useAnatomyStore((s) => (s.activeRegion === 'cranium' ? 'all' : 'all')) as SkullDivision | 'all';
  const activeSystem = useAnatomyStore((s) => s.activeSystem);
  const activeRegion = useAnatomyStore((s) => s.activeRegion);
  const layerPeelingLevel = useAnatomyStore((s) => s.layerPeelingLevel);
  const ghostMode = useAnatomyStore((s) => s.ghostMode);
  const isolatedOnly = useAnatomyStore((s) => s.isolatedOnly);

  const zenMode = useAnatomyStore((s) => s.zenMode);
  const toggleZenMode = useAnatomyStore((s) => s.toggleZenMode);
  const twoFingerMode = useAnatomyStore((s) => s.twoFingerMode);
  const setTwoFingerMode = useAnatomyStore((s) => s.setTwoFingerMode);

  const clinicalStudioOpen = useAnatomyStore((s) => s.clinicalStudioOpen);
  const setClinicalStudioOpen = useAnatomyStore((s) => s.setClinicalStudioOpen);

  const dissection = useAnatomyStore((s) => s.dissection);
  const setDissection = useAnatomyStore((s) => s.setDissection);

  const storeSelectedNodeId = useAnatomyStore((s) => s.selectedNodeId);
  const setStoreSelectedNode = useAnatomyStore((s) => s.setSelectedNode);

  const [selectedNode, setSelectedNode] = useState<AnyAnatomicalNode | null>(null);
  const [telemetry, setTelemetry] = useState({ fps: 60, triangles: 0, drawCalls: 0 });

  // Estado da Infraestrutura (Cloud Run / Firebase)
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [healthError, setHealthError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    setHealthError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setHealth(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao conectar com a API Backend';
      setHealthError(message);
    } finally {
      setLoadingHealth(false);
    }
  };

  // Dispara checagem imediata e polling contínuo (10s) quando o dashboard de infraestrutura for aberto
  useEffect(() => {
    if (activeMode === 'infra-dashboard') {
      fetchHealth();
      const timer = setInterval(fetchHealth, 10000);
      return () => clearInterval(timer);
    }
  }, [activeMode]);

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

    // Suporte aos nós de crânio, miologia e neuroanatomia profunda da vista explodida
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
      {/* Barra de Navegação Superior */}
      <header className="top-nav">
        <div className="brand-wrapper">
          <Layers size={20} strokeWidth={1.5} color="var(--accent)" />
          <h1>Atlas 3D de Anatomia</h1>
          <span className="status-badge" style={{ padding: '0.15rem 0.5rem', fontSize: '0.6875rem' }}>
            <span className="status-dot"></span>
            <span>Z-Anatomy: Esqueleto Completo (335 Ossos) & Órgãos Reais</span>
          </span>
        </div>

        <div className="nav-actions">
          {activeMode === '3d-atlas' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.35rem' }}>
              <div className="mode-toggle-group">
                <button
                  className={`mode-btn ${viewType === 'realistic' ? 'active' : ''}`}
                  onClick={() => setViewType('realistic')}
                  title="Corpo Humano Completo Z-Anatomy (335 Ossos + Vísceras com Exploded View Real)"
                >
                  Corpo Real (.GLB)
                </button>
                <button
                  className={`mode-btn ${viewType === 'exploded' ? 'active' : ''}`}
                  onClick={() => setViewType('exploded')}
                  title="Vista Didática por Peças Anatômicas Segmentadas"
                >
                  Vista Didática (Crânio)
                </button>
              </div>

              {viewType === 'realistic' && (
                <div className="mode-toggle-group">
                  <button
                    className={`mode-btn ${solidOpacity === 1.0 ? 'active' : ''}`}
                    onClick={() => setSolidOpacity(1.0)}
                    title="Densidade 100% - Totalmente Sólido e Vívido"
                  >
                    <CheckCircle2 size={13} strokeWidth={1.5} aria-hidden="true" />
                    <span>Sólido (100%)</span>
                  </button>
                  <button
                    className={`mode-btn ${solidOpacity === 0.35 ? 'active' : ''}`}
                    onClick={() => setSolidOpacity(0.35)}
                    title="Densidade 35% - Translúcido (Permite visualizar estruturas internas)"
                  >
                    <Eye size={13} strokeWidth={1.5} aria-hidden="true" />
                    <span>Translúcido (35%)</span>
                  </button>
                  <button
                    className={`mode-btn ${solidOpacity === 0.0 ? 'active' : ''}`}
                    onClick={() => setSolidOpacity(0.0)}
                    title="Ocultar Esqueleto para foco nas estruturas internas"
                  >
                    <EyeOff size={13} strokeWidth={1.5} aria-hidden="true" />
                    <span>Oculto (0%)</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                className={`mode-btn ${twoFingerMode === 'pan-rotate' ? 'active' : ''}`}
                onClick={() => setTwoFingerMode(twoFingerMode === 'pan-rotate' ? 'zoom' : 'pan-rotate')}
                title="Alternar Gesto de 2 Dedos: Subir/Descer e Girar (Pinça para Zoom) vs Scroll Zoom"
              >
                <MoveVertical size={13} strokeWidth={1.5} aria-hidden="true" />
                <span>{twoFingerMode === 'pan-rotate' ? '2 Dedos: Subir/Girar' : '2 Dedos: Zoom'}</span>
              </button>
            </div>
          )}

          {/* Seletor de Tema Tátil (5 Temas Canônicos em localStorage) */}
          <div className="tactile-theme-well" title="Tema Tátil de Superfície (Persistido em localStorage)">
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.35rem' }}>
            {activeMode === '3d-atlas' && (
              <button
                type="button"
                className={`mode-btn ${clinicalStudioOpen ? 'active' : ''}`}
                onClick={() => setClinicalStudioOpen(!clinicalStudioOpen)}
                title="Estúdio Neuroclínico: 14 Forames, Brodmann, 12 Pares Cranianos, Calculadora ASPECTS e Simulador de Casos"
              >
                <Brain size={13} strokeWidth={1.5} aria-hidden="true" />
                <span>Estúdio Neuroclínico</span>
              </button>
            )}

            <button
              className={`mode-btn ${zenMode ? 'active' : ''}`}
              onClick={toggleZenMode}
              title="Modo Foco Cirúrgico (Atalho: Z) - Expande o Viewport 3D para 100% da tela"
            >
              {zenMode ? <Minimize2 size={13} strokeWidth={1.5} aria-hidden="true" /> : <Maximize2 size={13} strokeWidth={1.5} aria-hidden="true" />}
              <span>{zenMode ? 'Sair do Foco' : 'Foco Cirúrgico (Z)'}</span>
            </button>
          </div>

          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${activeMode === '3d-atlas' ? 'active' : ''}`}
              onClick={() => setActiveMode('3d-atlas')}
            >
              <Layers size={14} strokeWidth={1.5} /> Atlas 3D
            </button>
            <button
              className={`mode-btn ${activeMode === 'infra-dashboard' ? 'active' : ''}`}
              onClick={() => setActiveMode('infra-dashboard')}
            >
              <Server size={14} strokeWidth={1.5} /> Cloud & Telemetria
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-viewport">
        {activeMode === '3d-atlas' ? (
          <div className="atlas-workspace">
            {/* 1. Painel Outliner Ancorado à Esquerda (Filtros Selecionáveis, Caixas de Seleção e Ficha Clínica) */}
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

            {/* 2. Área Central: Viewport 3D Expandido + HUD Flutuante (Campo de Visão Máximo) */}
            <div className="viewport-center-area">
              {/* Indicador Flutuante do Modo Foco Cirúrgico (100% Tela) */}
              {zenMode && (
                <div
                  className="zen-mode-badge"
                  onClick={toggleZenMode}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleZenMode();
                  }}
                  title="Clique ou pressione Z para restaurar as barras laterais"
                >
                  <Minimize2 size={13} aria-hidden="true" />
                  <span>Modo Foco Cirúrgico (100%) - Pressione Z para restaurar</span>
                </div>
              )}

              {/* Medidor flutuante de Telemetria (FPS / VRAM) */}
              <TelemetryOverlay
                fps={telemetry.fps}
                triangles={telemetry.triangles}
                drawCalls={telemetry.drawCalls}
              />

              {/* Barra Clínica Flutuante de Dissecção Tomográfica Multiplanar (MPR) */}
              <DissectionToolbar
                dissection={dissection}
                onChange={setDissection}
              />

              {/* Cubo de Orientação 3D (ViewCube com Projeções Anatômicas Canônicas) */}
              <OrientationGizmo />

              {/* Barra Inferior de Presets Anatômicos Canônicos Rápidos */}
              <QuickPresetsBar />

              {/* Estúdio Neuroclínico Flutuante / Ancorado (14 Forames, Brodmann, NC I-XII, ASPECTS, Casos) */}
              <NeuroClinicalDrawer />

              {/* Canvas 3D WebGL */}
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
        ) : (
          /* Dashboard de Infraestrutura e Prontidão de Nuvem */
          <div className="dashboard-view">
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Prontidão de Nuvem & Microserviços</h2>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Conexão entre o Google Cloud Run (Southamerica-East1 / US-Central1) e Firebase Hosting
                  </p>
                </div>
                <button className="btn btn-secondary" onClick={fetchHealth} disabled={loadingHealth}>
                  <RefreshCw size={14} className={loadingHealth ? 'animate-spin' : ''} />
                  <span>Atualizar Sondas</span>
                </button>
              </div>

              <div className="grid">
                {/* Card Cloud Run */}
                <div className="card">
                  <div className="card-title">
                    <Server size={18} color="#38bdf8" />
                    <span>Backend API (Cloud Run)</span>
                  </div>
                  <p className="card-description">
                    Serviço Express em Node.js com contratos de saúde e rewrites via Firebase Hosting.
                  </p>
                  <div className="code-box">
                    {loadingHealth ? (
                      <span>Carregando status...</span>
                    ) : healthError ? (
                      <span style={{ color: 'var(--danger)' }}>Erro: {healthError}</span>
                    ) : health ? (
                      <div>
                        <div><strong>Status:</strong> {health.status.toUpperCase()}</div>
                        <div><strong>Ambiente:</strong> {health.environment}</div>
                        <div><strong>Serviço:</strong> {health.service} (v{health.version})</div>
                        <div><strong>Uptime:</strong> {Math.round(health.uptime)}s</div>
                      </div>
                    ) : (
                      <span>Sem resposta</span>
                    )}
                  </div>
                </div>

                {/* Card Firebase */}
                <div className="card">
                  <div className="card-title">
                    <Flame size={18} color="#f59e0b" />
                    <span>Firebase Suite & Storage</span>
                  </div>
                  <p className="card-description">
                    Hosting CDN e regras de segurança para malhas .glb e banco Cloud Firestore.
                  </p>
                  <div className="code-box">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      {isFirebaseConfigured ? (
                        <>
                          <CheckCircle2 size={14} color="var(--success)" />
                          <span style={{ color: 'var(--success)' }}>Credenciais Ativas (.env)</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={14} color="var(--warning)" />
                          <span style={{ color: 'var(--warning)' }}>Modo Offline / Emulador Local</span>
                        </>
                      )}
                    </div>
                    <div><strong>Hosting:</strong> Configurado em <code>firebase.json</code></div>
                    <div><strong>Rewrites:</strong> <code>/api/**</code> direcionado sem CORS</div>
                  </div>
                </div>

                {/* Card CI/CD */}
                <div className="card">
                  <div className="card-title">
                    <GitBranch size={18} color="#818cf8" />
                    <span>GitHub Actions CI/CD</span>
                  </div>
                  <p className="card-description">
                    Esteira automatizada para validação de tipos, Vitest e deploy no Cloud Run.
                  </p>
                  <div className="code-box">
                    <div><strong>Workflow:</strong> <code>.github/workflows/deploy.yml</code></div>
                    <div><strong>Container:</strong> Docker multi-stage Alpine</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <ShieldCheck size={14} color="var(--success)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Contrato de porta dinâmica <code>$PORT</code> ativo
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão de retorno rápido ao 3D */}
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button className="btn" onClick={() => setActiveMode('3d-atlas')}>
                  <RotateCcw size={14} />
                  <span>Voltar para o Visualizador 3D</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

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
} from 'lucide-react';
import { SceneCanvas } from './components/canvas/SceneCanvas.tsx';
import { DissectionToolbar } from './components/ui/DissectionToolbar.tsx';
import { TelemetryOverlay } from './components/telemetry/TelemetryOverlay.tsx';
import { AnatomyTreePanel } from './components/ui/tree/AnatomyTreePanel.tsx';
import { OrientationGizmo } from './components/canvas/OrientationGizmo.tsx';
import { QuickPresetsBar } from './components/ui/QuickPresetsBar.tsx';
import { useAnatomicalHotkeys } from './hooks/useAnatomicalHotkeys.ts';
import { useAnatomyStore } from './stores/useAnatomyStore.ts';
import { SkullDivision, CRANIUM_22_NODES } from '../shared/constants/cranium.ts';
import { CRANIOFACIAL_MUSCLES } from '../shared/constants/myology.ts';
import { AnyAnatomicalNode } from './components/canvas/AnatomicalAtlasScene.tsx';
import { Z_ANATOMY_BY_ID, Z_ANATOMY_BY_NODE } from '../shared/constants/zAnatomyCatalog.ts';
import { isFirebaseConfigured } from './lib/firebase.ts';

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

  // Sincroniza a Ficha Clínica quando uma estrutura for selecionada ou desselecionada
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
        clinicalData: {
          origin: item.path.join(' > '),
          insertion: `Estrutura integrante do ${item.system}`,
          clinicalSignificance: `Peça anatômica real escaneada do catálogo médico Z-Anatomy (Terminologia Anatomica TA2: ${item.nameLatin}).`,
        },
      } as AnyAnatomicalNode);
      return;
    }

    // Suporte aos nós de crânio e miologia da vista explodida
    const craniumNode = CRANIUM_22_NODES.find(
      (c) => c.id === storeSelectedNodeId || c.meshName === storeSelectedNodeId
    );
    if (craniumNode) {
      setSelectedNode(craniumNode);
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
          <Layers size={22} color="#38bdf8" />
          <h1>Atlas 3D de Anatomia</h1>
          <span className="status-badge" style={{ padding: '0.15rem 0.5rem', fontSize: '0.6875rem' }}>
            <span className="status-dot"></span>
            <span>Z-Anatomy: Esqueleto Completo (335 Ossos) & Órgãos Reais</span>
          </span>
        </div>

        <div className="nav-actions">
          {activeMode === '3d-atlas' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.5rem' }}>
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
                <div className="mode-toggle-group" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '0.5rem' }}>
                  <button
                    className={`mode-btn ${solidOpacity === 1.0 ? 'active' : ''}`}
                    onClick={() => setSolidOpacity(1.0)}
                    title="Densidade 100% - Totalmente Sólido e Vívido"
                  >
                    <CheckCircle2 size={13} aria-hidden="true" />
                    <span>Sólido (100%)</span>
                  </button>
                  <button
                    className={`mode-btn ${solidOpacity === 0.35 ? 'active' : ''}`}
                    onClick={() => setSolidOpacity(0.35)}
                    title="Densidade 35% - Translúcido (Permite visualizar estruturas internas)"
                  >
                    <Eye size={13} aria-hidden="true" />
                    <span>Translúcido (35%)</span>
                  </button>
                  <button
                    className={`mode-btn ${solidOpacity === 0.0 ? 'active' : ''}`}
                    onClick={() => setSolidOpacity(0.0)}
                    title="Ocultar Esqueleto para foco nas estruturas internas"
                  >
                    <EyeOff size={13} aria-hidden="true" />
                    <span>Oculto (0%)</span>
                  </button>
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.5rem' }}>
            <button
              className={`mode-btn ${zenMode ? 'active' : ''}`}
              onClick={toggleZenMode}
              title="Modo Foco Cirúrgico (Atalho: Z) - Expande o Viewport 3D para 100% da tela"
              style={{ borderColor: zenMode ? 'var(--primary)' : undefined }}
            >
              {zenMode ? <Minimize2 size={13} aria-hidden="true" /> : <Maximize2 size={13} aria-hidden="true" />}
              <span>{zenMode ? 'Sair do Foco' : 'Foco Cirúrgico (Z)'}</span>
            </button>
          </div>

          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${activeMode === '3d-atlas' ? 'active' : ''}`}
              onClick={() => setActiveMode('3d-atlas')}
            >
              <Layers size={14} /> Atlas 3D
            </button>
            <button
              className={`mode-btn ${activeMode === 'infra-dashboard' ? 'active' : ''}`}
              onClick={() => setActiveMode('infra-dashboard')}
            >
              <Server size={14} /> Cloud & Telemetria
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
                setDissection((prev) => ({
                  ...prev,
                  showHelper: !prev.showHelper,
                }))
              }
              mprActive={dissection.showHelper}
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

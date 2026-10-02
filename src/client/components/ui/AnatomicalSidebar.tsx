import { useState, useMemo } from 'react';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Sparkles,
  Info,
  BookOpen,
  Maximize2,
  Search,
  Sliders,
  Scissors
} from 'lucide-react';
import { CRANIUM_22_NODES, SkullDivision } from '../../../shared/constants/cranium.ts';
import { CRANIOFACIAL_MUSCLES } from '../../../shared/constants/myology.ts';
import { CARDIOVASCULAR_NODES } from '../../../shared/constants/cardiovascular.ts';
import { NEUROLOGY_NODES } from '../../../shared/constants/neurology.ts';
import { RESPIRATORY_NODES } from '../../../shared/constants/respiratory.ts';
import { DIGESTIVE_NODES } from '../../../shared/constants/digestive.ts';
import { LYMPHATIC_NODES } from '../../../shared/constants/lymphatic.ts';
import { URINARY_NODES } from '../../../shared/constants/urinary.ts';
import { ENDOCRINE_NODES } from '../../../shared/constants/endocrine.ts';
import { REPRODUCTIVE_NODES } from '../../../shared/constants/reproductive.ts';
import { SENSORY_NODES } from '../../../shared/constants/sensory.ts';
import { INTEGUMENTARY_NODES } from '../../../shared/constants/integumentary.ts';
import { Z_ANATOMY_SKELETAL } from '../../../shared/constants/zAnatomyCatalog.ts';
import { ActiveAnatomicalSystem, AnyAnatomicalNode, GeneralAnatomicalNode, AnatomicalRegion } from '../canvas/AnatomicalAtlasScene.tsx';

interface AnatomicalSidebarProps {
  explosionProgress: number;
  onExplosionChange: (val: number) => void;
  selectedNode: AnyAnatomicalNode | null;
  onSelectNode: (node: AnyAnatomicalNode | null) => void;
  ghostMode: boolean;
  onToggleGhost: () => void;
  isolatedOnly: boolean;
  onToggleIsolated: () => void;
  activeDivision: SkullDivision | 'all';
  onDivisionChange: (div: SkullDivision | 'all') => void;
  activeSystem: ActiveAnatomicalSystem;
  onSystemChange: (sys: ActiveAnatomicalSystem) => void;
  activeRegion?: AnatomicalRegion;
  onRegionChange?: (reg: AnatomicalRegion) => void;
  layerPeelingLevel: number; // 0 = Esqueleto, 1 = Profundo, 2 = Superficial
  onLayerPeelingChange: (level: number) => void;
}

export function AnatomicalSidebar({
  explosionProgress,
  onExplosionChange,
  selectedNode,
  onSelectNode,
  ghostMode,
  onToggleGhost,
  isolatedOnly,
  onToggleIsolated,
  activeDivision,
  onDivisionChange,
  activeSystem,
  onSystemChange,
  activeRegion = 'all',
  onRegionChange,
  layerPeelingLevel,
  onLayerPeelingChange,
}: AnatomicalSidebarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'tree'>('details');
  const [searchQuery, setSearchQuery] = useState('');

  // Unifica nós anatômicos ativos para busca e árvore hierárquica
  const filteredNodes = useMemo(() => {
    const list: AnyAnatomicalNode[] = [];

    // 1. Osteologia (Cap. 2): Crânio e Esqueleto Z-Anatomy Completo (335 ossos)
    if (activeSystem === 'skeletal' || activeSystem === 'all') {
      const filteredBones = CRANIUM_22_NODES.filter((n) => {
        return activeDivision === 'all' || n.division === activeDivision;
      });
      list.push(...filteredBones);

      // Adiciona o esqueleto axial e apendicular completo (coluna, tórax, membros, pelve)
      const skeletalZNodes: GeneralAnatomicalNode[] = Z_ANATOMY_SKELETAL.map((s) => ({
        id: s.id,
        fmaId: s.fmaId,
        namePtBr: s.namePtBr,
        nameLatin: s.nameLatin,
        chapter: 2,
        systemName: 'Sistema Esquelético (Osteologia)',
        meshName: s.node,
        parentId: s.path.length > 0 ? s.path[s.path.length - 1] : undefined,
        colorHex: '#f4ede2',
        explosionVector: s.explosionVector,
        clinicalData: {
          origin: s.path.join(' > '),
          insertion: 'Esqueleto axial/apendicular humano',
          clinicalSignificance: `Peça óssea legítima escaneada em alta resolução (TA2: ${s.nameLatin}).`,
        },
      }));

      const existingIds = new Set(list.map((n) => n.id));
      skeletalZNodes.forEach((sn) => {
        if (!existingIds.has(sn.id)) {
          list.push(sn);
        }
      });
    }

    // 2. Miologia (Cap. 3)
    if ((activeSystem === 'muscular' || activeSystem === 'all') && layerPeelingLevel > 0) {
      const filteredMuscles = CRANIOFACIAL_MUSCLES.filter((m) => {
        return (m.layerDepth || 2) <= layerPeelingLevel;
      });
      list.push(...filteredMuscles);
    }

    // 3. Sistema Cardiovascular (Cap. 5)
    if (activeSystem === 'cardiovascular' || activeSystem === 'all') {
      list.push(...CARDIOVASCULAR_NODES);
    }

    // 4. Sistema Nervoso (Cap. 4)
    if (activeSystem === 'nervous' || activeSystem === 'all') {
      list.push(...NEUROLOGY_NODES);
    }

    // 5. Sistema Respiratório (Cap. 7)
    if (activeSystem === 'respiratory' || activeSystem === 'all') {
      list.push(...RESPIRATORY_NODES);
    }

    // 6. Sistema Digestório (Cap. 8)
    if (activeSystem === 'digestive' || activeSystem === 'all') {
      list.push(...DIGESTIVE_NODES);
    }

    // 7. Sistema Linfático (Cap. 6)
    if (activeSystem === 'lymphatic' || activeSystem === 'all') {
      list.push(...LYMPHATIC_NODES);
    }

    // 8. Sistema Urinário (Cap. 9)
    if (activeSystem === 'urinary' || activeSystem === 'all') {
      list.push(...URINARY_NODES);
    }

    // 9. Sistema Endócrino (Cap. 11)
    if (activeSystem === 'endocrine' || activeSystem === 'all') {
      list.push(...ENDOCRINE_NODES);
    }

    // 10. Sistema Reprodutor (Cap. 10)
    if (activeSystem === 'reproductive' || activeSystem === 'all') {
      list.push(...REPRODUCTIVE_NODES);
    }

    // 11. Órgãos dos Sentidos (Cap. 13)
    if (activeSystem === 'sensory' || activeSystem === 'all') {
      list.push(...SENSORY_NODES);
    }

    // 12. Sistema Tegumentar (Cap. 14)
    if (activeSystem === 'integumentary' || activeSystem === 'all') {
      list.push(...INTEGUMENTARY_NODES);
    }

    let result = list;

    // Filtragem por região anatômica do esqueleto (ex: crânio, coluna, tórax, etc.)
    if (activeRegion !== 'all') {
      result = result.filter((n) => {
        if (n.chapter !== 2) return true;
        const text = (n.namePtBr + ' ' + n.nameLatin + ' ' + (n.clinicalData?.origin || '')).toLowerCase();
        switch (activeRegion) {
          case 'cranium':
            return ['frontal', 'pariet', 'occipit', 'tempor', 'esfeno', 'etmoi', 'mandíb', 'maxil', 'zigom', 'nasal', 'lacrim', 'vômer', 'palat', 'concha', 'dente', 'canino', 'molar', 'incisivo', 'crânio', 'cranium', 'head'].some((k) => text.includes(k));
          case 'spine':
            return ['cervical', 'torácica', 'lombar', 'sacro', 'cóccix', 'atlas', 'áxis', 'vertebra', 'coluna'].some((k) => text.includes(k));
          case 'thorax':
            return ['costela', 'costal', 'esterno', 'xifoide', 'manúbrio', 'tórax', 'torácic'].some((k) => text.includes(k)) && !text.includes('vértebra torácica');
          case 'upper_limb':
            return ['clavícula', 'escápula', 'úmero', 'rádio', 'ulna', 'carpo', 'metacarpo', 'falange', 'mão', 'polegar', 'upper limb'].some((k) => text.includes(k));
          case 'pelvis':
            return ['quadril', 'ílio', 'ísquio', 'púbis', 'pelve', 'sacro'].some((k) => text.includes(k));
          case 'lower_limb':
            return ['fêmur', 'patela', 'tíbia', 'fíbula', 'calcâneo', 'tálus', 'metatarso', 'tarso', 'pé', 'lower limb'].some((k) => text.includes(k));
          default:
            return true;
        }
      });
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return result;

    return result.filter((n) => {
      return (
        n.namePtBr.toLowerCase().includes(q) ||
        n.nameLatin.toLowerCase().includes(q) ||
        (n.fmaId && n.fmaId.toLowerCase().includes(q))
      );
    });
  }, [activeSystem, activeDivision, activeRegion, layerPeelingLevel, searchQuery]);

  return (
    <aside className={`anatomical-panel ${mobileExpanded ? 'expanded' : ''}`}>
      {/* Barra de controle móvel (handle) */}
      <div
        className="mobile-drag-handle"
        onClick={() => setMobileExpanded(!mobileExpanded)}
      >
        <span className="drag-indicator"></span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
            {selectedNode ? selectedNode.namePtBr : 'Atlas Anatômico Interativo'}
          </span>
          {mobileExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>
      </div>

      {/* Seção 1: Filtro de Sistemas Anatômicos */}
      <div className="panel-section" style={{ paddingBottom: '0.625rem' }}>
        <div className="section-title">
          <Sliders size={15} color="#38bdf8" />
          <span>Sistemas Anatômicos</span>
        </div>
        <div className="button-group" style={{ flexWrap: 'wrap' }}>
          <button
            className={`btn-tag ${activeSystem === 'all' ? 'active' : ''}`}
            onClick={() => onSystemChange('all')}
          >
            🔬 Todos
          </button>
          <button
            className={`btn-tag ${activeSystem === 'skeletal' ? 'active' : ''}`}
            onClick={() => onSystemChange('skeletal')}
          >
            🦴 Ossos (Cap. 2)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'muscular' ? 'active' : ''}`}
            onClick={() => onSystemChange('muscular')}
          >
            🥩 Músculos (Cap. 3)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'cardiovascular' ? 'active' : ''}`}
            onClick={() => onSystemChange('cardiovascular')}
          >
            ❤️ Cardio (Cap. 5)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'nervous' ? 'active' : ''}`}
            onClick={() => onSystemChange('nervous')}
          >
            🧠 Nervoso (Cap. 4)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'respiratory' ? 'active' : ''}`}
            onClick={() => onSystemChange('respiratory')}
          >
            🫁 Respiratório (Cap. 7)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'digestive' ? 'active' : ''}`}
            onClick={() => onSystemChange('digestive')}
          >
            🥗 Digestório (Cap. 8)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'lymphatic' ? 'active' : ''}`}
            onClick={() => onSystemChange('lymphatic')}
          >
            🛡️ Linfático (Cap. 6)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'urinary' ? 'active' : ''}`}
            onClick={() => onSystemChange('urinary')}
          >
            💧 Urinário (Cap. 9)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'endocrine' ? 'active' : ''}`}
            onClick={() => onSystemChange('endocrine')}
          >
            ⚡ Endócrino (Cap. 11)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'reproductive' ? 'active' : ''}`}
            onClick={() => onSystemChange('reproductive')}
          >
            🧬 Reprodutor (Cap. 10)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'sensory' ? 'active' : ''}`}
            onClick={() => onSystemChange('sensory')}
          >
            👁️ Sentidos (Cap. 13)
          </button>
          <button
            className={`btn-tag ${activeSystem === 'integumentary' ? 'active' : ''}`}
            onClick={() => onSystemChange('integumentary')}
          >
            🧴 Tegumento (Cap. 14)
          </button>
        </div>

        {/* Seletor de Região Anatômica do Esqueleto (Filtragem Regional Z-Anatomy) */}
        {(activeSystem === 'skeletal' || activeSystem === 'all') && (
          <div style={{ marginTop: '0.625rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginBottom: '0.35rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>📍 Região do Esqueleto:</span>
            </div>
            <div className="button-group" style={{ flexWrap: 'wrap', gap: '0.3rem' }}>
              <button
                className={`btn-tag ${activeRegion === 'all' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('all')}
                title="Visualizar os 335 ossos do esqueleto humano completo"
              >
                🧍 Todo o Esqueleto
              </button>
              <button
                className={`btn-tag ${activeRegion === 'cranium' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('cranium')}
                title="Foco exclusivo no Crânio e Viscerocrânio Facial"
              >
                💀 Crânio & Face
              </button>
              <button
                className={`btn-tag ${activeRegion === 'spine' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('spine')}
                title="Foco na Coluna Vertebral Cervical, Torácica, Lombar e Sacro"
              >
                🦴 Coluna (C1-L5)
              </button>
              <button
                className={`btn-tag ${activeRegion === 'thorax' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('thorax')}
                title="Foco nas Costelas e Esterno"
              >
                🫁 Caixa Torácica
              </button>
              <button
                className={`btn-tag ${activeRegion === 'upper_limb' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('upper_limb')}
                title="Foco em Clavícula, Escápula, Úmero, Braço e Mão"
              >
                💪 Membros Sup.
              </button>
              <button
                className={`btn-tag ${activeRegion === 'pelvis' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('pelvis')}
                title="Foco na Pelve e Cintura Pélvica"
              >
                🩻 Pelve & Quadril
              </button>
              <button
                className={`btn-tag ${activeRegion === 'lower_limb' ? 'active' : ''}`}
                onClick={() => onRegionChange?.('lower_limb')}
                title="Foco em Fêmur, Patela, Tíbia, Fíbula e Pé"
              >
                🦵 Membros Inf.
              </button>
            </div>

            {/* Sub-filtro fino de Neurocrânio e Viscerocrânio quando em foco no Crânio */}
            {activeRegion === 'cranium' && (
              <div className="button-group" style={{ marginTop: '0.35rem', gap: '0.25rem' }}>
                <button
                  className={`btn-tag ${activeDivision === 'all' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('all')}
                  style={{ fontSize: '0.6875rem' }}
                >
                  Todos do Crânio
                </button>
                <button
                  className={`btn-tag ${activeDivision === 'neurocranium' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('neurocranium')}
                  style={{ fontSize: '0.6875rem' }}
                >
                  Neurocrânio (8)
                </button>
                <button
                  className={`btn-tag ${activeDivision === 'viscerocranium' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('viscerocranium')}
                  style={{ fontSize: '0.6875rem' }}
                >
                  Viscerocrânio (14)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Seção 2: Mecanismo de Layer Peeling (se Músculos estiverem ativos) */}
      {(activeSystem === 'muscular' || activeSystem === 'all') && (
        <div className="panel-section" style={{ paddingBottom: '0.625rem' }}>
          <div className="section-title">
            <Scissors size={15} color="#f59e0b" />
            <span>Layer Peeling (Dissecação Miológica)</span>
            <span className="badge-pill" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
              Nível {layerPeelingLevel}
            </span>
          </div>

          <div className="slider-control">
            <input
              type="range"
              min="0"
              max="3"
              step="1"
              value={layerPeelingLevel}
              onChange={(e) => onLayerPeelingChange(parseInt(e.target.value))}
              className="anatomy-slider"
              style={{ accentColor: '#f59e0b' }}
            />
          </div>

          <div className="button-group">
            <button
              className={`btn-tag ${layerPeelingLevel === 0 ? 'active' : ''}`}
              onClick={() => onLayerPeelingChange(0)}
            >
              0: Esqueleto
            </button>
            <button
              className={`btn-tag ${layerPeelingLevel === 1 ? 'active' : ''}`}
              onClick={() => onLayerPeelingChange(1)}
            >
              1: Músc. Profundos
            </button>
            <button
              className={`btn-tag ${layerPeelingLevel === 2 ? 'active' : ''}`}
              onClick={() => onLayerPeelingChange(2)}
            >
              2: Superficiais
            </button>
            <button
              className={`btn-tag ${layerPeelingLevel === 3 ? 'active' : ''}`}
              onClick={() => onLayerPeelingChange(3)}
            >
              3: Pele e Fáscias
            </button>
          </div>
        </div>
      )}

      {/* Seção 3: Controle de Exploded View (GPU) */}
      <div className="panel-section" style={{ paddingBottom: '0.625rem' }}>
        <div className="section-title">
          <Layers size={15} color="#38bdf8" />
          <span>Vista Explodida (GPU)</span>
          <span className="badge-pill">{Math.round(explosionProgress * 100)}%</span>
        </div>

        <div className="slider-control">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explosionProgress}
            onChange={(e) => onExplosionChange(parseFloat(e.target.value))}
            className="anatomy-slider"
          />
        </div>

        <div className="button-group">
          <button
            className={`btn-tag ${explosionProgress === 0 ? 'active' : ''}`}
            onClick={() => onExplosionChange(0)}
          >
            0% (Montado)
          </button>
          <button
            className={`btn-tag ${Math.abs(explosionProgress - 0.5) < 0.05 ? 'active' : ''}`}
            onClick={() => onExplosionChange(0.5)}
          >
            50%
          </button>
          <button
            className={`btn-tag ${explosionProgress === 1 ? 'active' : ''}`}
            onClick={() => onExplosionChange(1)}
          >
            100% (Explosão)
          </button>
        </div>
      </div>

      {/* Seção 4: Abas de Conteúdo */}
      <div className="panel-tabs">
        <button
          className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          <Info size={14} /> Ficha Clínica
        </button>
        <button
          className={`tab-btn ${activeTab === 'tree' ? 'active' : ''}`}
          onClick={() => setActiveTab('tree')}
        >
          <BookOpen size={14} /> Lista FMA ({filteredNodes.length})
        </button>
      </div>

      {/* Conteúdo da Aba */}
      {activeTab === 'details' ? (
        <div className="panel-section node-details">
          {selectedNode ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 className="node-title">{selectedNode.namePtBr}</h3>
                  <p className="node-latin"><em>{selectedNode.nameLatin}</em></p>
                </div>
                <span className="fma-chip">{selectedNode.fmaId || 'FMA'}</span>
              </div>

              <div className="meta-tag-list">
                <span className="meta-tag">
                  {selectedNode.chapter === 2 && '🦴 Sistema Esquelético'}
                  {selectedNode.chapter === 3 && '🥩 Sistema Muscular'}
                  {selectedNode.chapter === 4 && '🧠 Sistema Nervoso Central'}
                  {selectedNode.chapter === 5 && '❤️ Sistema Cardiovascular'}
                  {selectedNode.chapter === 6 && '🛡️ Sistema Linfático'}
                  {selectedNode.chapter === 7 && '🫁 Sistema Respiratório'}
                  {selectedNode.chapter === 8 && '🥗 Sistema Digestório'}
                  {selectedNode.chapter === 9 && '💧 Sistema Urinário'}
                  {selectedNode.chapter === 10 && '🧬 Sistema Reprodutor'}
                  {selectedNode.chapter === 11 && '⚡ Sistema Endócrino'}
                </span>

                {'division' in selectedNode && (
                  <span className="meta-tag">
                    {selectedNode.division === 'neurocranium' ? 'Neurocrânio' : 'Viscerocrânio'}
                  </span>
                )}

                {'vesselType' in selectedNode && (
                  <span
                    className="meta-tag"
                    style={{
                      background: selectedNode.oxygenated ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                      color: selectedNode.oxygenated ? '#ef4444' : '#60a5fa',
                    }}
                  >
                    {selectedNode.vesselType === 'heart_chamber'
                      ? 'Câmara Cardíaca'
                      : selectedNode.oxygenated
                      ? 'Artéria (Oxigenado)'
                      : 'Veia (Desoxigenado)'}
                  </span>
                )}

                {'region' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                    {selectedNode.isCSF ? 'Fluido LCR' : selectedNode.region.toUpperCase()}
                  </span>
                )}

                {'corticalBrodmannArea' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
                    {selectedNode.corticalBrodmannArea}
                  </span>
                )}

                {'respiratoryRegion' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8' }}>
                    {selectedNode.respiratoryRegion === 'upper_airway'
                      ? 'Via Aérea Superior'
                      : selectedNode.respiratoryRegion === 'tracheobronchial_tree'
                      ? 'Árvore Traqueobrônquica'
                      : `Lobo Pulmonar ${selectedNode.lungSide === 'right' ? 'Direito' : 'Esquerdo'}`}
                  </span>
                )}

                {'digestiveTractSection' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#fb923c' }}>
                    {selectedNode.digestiveTractSection === 'foregut'
                      ? 'Intestino Anterior / Gástrico'
                      : selectedNode.digestiveTractSection === 'hepatobiliary'
                      ? 'Complexo Hepatobiliar'
                      : 'Intestino Médio / Duodeno'}
                  </span>
                )}

                {'peritonealStatus' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(234, 88, 12, 0.15)', color: '#fdba74' }}>
                    {selectedNode.peritonealStatus === 'intraperitoneal' ? 'Intraperitoneal' : 'Retroperitoneal'}
                  </span>
                )}

                {'lymphaticType' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>
                    {selectedNode.isSentinelNode
                      ? 'Linfonodo Sentinela (Virchow)'
                      : selectedNode.lymphaticType === 'duct'
                      ? 'Tronco / Ducto Linfático'
                      : selectedNode.lymphaticType === 'cistern'
                      ? 'Cisterna Quílica'
                      : 'Cadeia Ganglionar'}
                  </span>
                )}

                {'urinaryRegion' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>
                    {selectedNode.urinaryRegion === 'kidney_parenchyma'
                      ? `Parênquima Renal (${selectedNode.kidneySide === 'right' ? 'Direito' : selectedNode.kidneySide === 'left' ? 'Esquerdo' : 'Medular'})`
                      : selectedNode.urinaryRegion === 'collecting_system'
                      ? 'Sistema Coletor / Ureter'
                      : 'Trato Urinário Inferior (Bexiga)'}
                  </span>
                )}

                {'endocrineAxis' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
                    {selectedNode.endocrineAxis === 'hypothalamic_pituitary'
                      ? 'Eixo Hipotálamo-Hipofisário'
                      : selectedNode.endocrineAxis === 'thyroid_parathyroid'
                      ? 'Complexo Tireoide/Paratireoide'
                      : 'Eixo Suprarrenal / Adrenal'}
                  </span>
                )}

                {'reproductiveDimorphism' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
                    {selectedNode.reproductiveDimorphism === 'male' ? 'Trato Masculino' : 'Trato Feminino'}
                  </span>
                )}

                {'innervationNerve' in selectedNode && (
                  <span className="meta-tag" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                    {selectedNode.innervationNerve.split('(')[0]}
                  </span>
                )}
              </div>

              {/* Dados Clínicos e Anatômicos */}
              {selectedNode.clinicalData && (
                <div className="clinical-card">
                  {selectedNode.clinicalData.clinicalSignificance && (
                    <div className="clinical-item">
                      <span className="clinical-label">Importância Médica / Cirúrgica:</span>
                      <p>{selectedNode.clinicalData.clinicalSignificance}</p>
                    </div>
                  )}

                  {selectedNode.clinicalData.origin && (
                    <div className="clinical-item">
                      <span className="clinical-label">Origem / Limites Anatômicos:</span>
                      <p>{selectedNode.clinicalData.origin}</p>
                    </div>
                  )}

                  {selectedNode.clinicalData.insertion && (
                    <div className="clinical-item">
                      <span className="clinical-label">Inserção / Conexões Vasculares ou Neurais:</span>
                      <p>{selectedNode.clinicalData.insertion}</p>
                    </div>
                  )}

                  {selectedNode.clinicalData.functionalAction && (
                    <div className="clinical-item">
                      <span className="clinical-label">Fisiologia / Ação Funcional:</span>
                      <p>{selectedNode.clinicalData.functionalAction}</p>
                    </div>
                  )}

                  {selectedNode.clinicalData.innervation && (
                    <div className="clinical-item">
                      <span className="clinical-label">Inervação:</span>
                      <p>{selectedNode.clinicalData.innervation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Controles de visualização da peça */}
              <div className="view-actions">
                <button
                  className={`btn-action ${ghostMode ? 'btn-active' : ''}`}
                  onClick={onToggleGhost}
                >
                  {ghostMode ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{ghostMode ? 'Modo Fantasma Ativo' : 'Modo Fantasma'}</span>
                </button>

                <button
                  className={`btn-action ${isolatedOnly ? 'btn-active' : ''}`}
                  onClick={onToggleIsolated}
                >
                  <Maximize2 size={14} />
                  <span>{isolatedOnly ? 'Restaurar Tudo' : 'Isolar Estrutura'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-selection">
              <Sparkles size={28} color="var(--text-secondary)" />
              <p>Selecione qualquer elemento anatômico (osso, músculo, vaso, câmara cardíaca ou encéfalo) para inspecionar correlações clínicas.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="panel-section node-tree">
          {/* Caixa de Busca */}
          <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Buscar por nome, latim ou código FMA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.625rem 0.45rem 2rem',
                background: '#090e1a',
                border: '1px solid #1e293b',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.75rem',
                outline: 'none',
              }}
            />
          </div>

          <div className="tree-list" style={{ maxHeight: '340px', overflowY: 'auto' }}>
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              let dotColor = node.colorHex || '#38bdf8';
              let badgeLabel = 'Osso';

              if (node.chapter === 3) {
                dotColor = '#dc2626';
                badgeLabel = 'Músculo';
              } else if (node.chapter === 4) {
                dotColor = ('isCSF' in node && node.isCSF) ? '#38bdf8' : node.colorHex || '#a855f7';
                badgeLabel = ('isCSF' in node && node.isCSF) ? 'LCR' : 'Nervoso';
              } else if (node.chapter === 5) {
                dotColor = node.colorHex || ('oxygenated' in node && node.oxygenated ? '#ef4444' : '#3b82f6');
                badgeLabel = ('vesselType' in node && node.vesselType === 'heart_chamber') ? 'Coração' : 'Vaso';
              } else if (node.chapter === 6) {
                dotColor = node.colorHex || '#34d399';
                badgeLabel = ('isSentinelNode' in node && node.isSentinelNode) ? 'Sentinela' : 'Linfático';
              } else if (node.chapter === 7) {
                dotColor = node.colorHex || '#0ea5e9';
                badgeLabel = 'Respiratório';
              } else if (node.chapter === 8) {
                dotColor = node.colorHex || '#f97316';
                badgeLabel = ('digestiveTractSection' in node && node.digestiveTractSection === 'hepatobiliary') ? 'Hepatobiliar' : 'Digestório';
              } else if (node.chapter === 9) {
                dotColor = node.colorHex || '#eab308';
                badgeLabel = 'Urinário';
              } else if (node.chapter === 10) {
                dotColor = node.colorHex || (('reproductiveDimorphism' in node && node.reproductiveDimorphism === 'female') ? '#ec4899' : '#3b82f6');
                badgeLabel = 'Reprodutor';
              } else if (node.chapter === 11) {
                dotColor = node.colorHex || '#f43f5e';
                badgeLabel = 'Endócrino';
              } else if (node.chapter === 13) {
                dotColor = node.colorHex || '#38bdf8';
                badgeLabel = ('sensoryType' in node && node.sensoryType === 'visual') ? 'Visão' : 'Audição';
              } else if (node.chapter === 14) {
                dotColor = node.colorHex || '#fdba74';
                badgeLabel = 'Tegumento';
              }

              return (
                <div
                  key={node.id}
                  className={`tree-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onSelectNode(isSelected ? null : node);
                    setActiveTab('details');
                  }}
                >
                  <span
                    className="tree-color-dot"
                    style={{ backgroundColor: dotColor }}
                  ></span>
                  <div className="tree-item-info" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="tree-item-name">{node.namePtBr}</span>
                      <span style={{ fontSize: '0.625rem', color: '#94a3b8' }}>
                        {badgeLabel}
                      </span>
                    </div>
                    <span className="tree-item-latin">{node.nameLatin}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

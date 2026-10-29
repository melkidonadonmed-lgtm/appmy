# Design System: Atlas 3D de Anatomia Médica (`appmy`)
**Project ID:** `app-anatomy` / `appmy` (Z-Anatomy 3D Clinical Workstation)

Documento canônico de arquitetura visual, tokens semânticos, componentes de interface tátil, ergonomia médica e diretrizes de renderização 3D da plataforma **Atlas 3D de Anatomia Médica**.

---

## 1. Visual Theme & Atmosphere (Filosofia e Atmosfera Visual)

O design do **Atlas 3D de Anatomia Médica** opera sob o paradigma do **Minimalismo Executivo Hospitalar e Fisicalidade Tátil Mineral**. A interface gráfica atua como uma moldura cirúrgica silenciosa e de altíssima precisão ao redor do modelo anatômico tridimensional real (`.GLB` Z-Anatomy), inspirada em estações de neuronavegação cirúrgica, monitores PACS de radiologia e instrumentos médicos de titânio e obsidiana fosca.

### Pilares Inegociáveis da Atmosfera
1. **Protagonismo Absoluto da Peça Anatômica Reais (`.GLB`)**:
   - A aplicação renderiza exclusivamente a anatomia real Z-Anatomy (335 ossos e sistemas viscerais/neurovasculares), sem botões de alternância para formas geométricas primitivas/didáticas.
   - O modo **Tela Cheia** (*Zen Mode*, atalho `Z`) recolhe a barra lateral para entregar o canvas WebGL desimpedido.
2. **Orçamento de Densidade Visual (Regra 1+2)**:
   - Cada região funcional respeita o limite de **1 ação primária (CTA)** acompanhada de no máximo **2 grupos de ações secundárias discretas**, prevenindo fadiga de decisão.
3. **Automação Técnica Silenciosa em Background**:
   - Gerenciamento de cache offline (`CacheStorage` para arquivos `.glb` e decoders Draco WASM), montagem seletiva em GPU/VRAM e telemetria de saúde de servidor ocorrem de forma invisível em segundo plano, sem poluir a interface com botões operacionais de infraestrutura.
4. **Padrão Estrito "Zero Emojis"**:
   - É expressamente proibido o uso de emojis na UI, rótulos ou modais. Toda iconografia utiliza glifos vetoriais lineares `Lucide Icons` com traçado constante (`stroke-width="1.5"`) e `aria-hidden="true"`.
5. **Física Óptica e Elevação Tátil em 3 Camadas**:
   - É proibido o uso de sombras genéricas (`shadow-lg`, `shadow-xl`) ou cobalto neon (`#0066FF`, `#2563EB`, `#3B82F6`).
   - Superfícies obedecem à hierarquia estrita de luminância crescente ($L_{\text{well}} < L_{\text{primary}} < L_{\text{secondary}} < L_{\text{tertiary}}$), com cavidades rebaixadas (`--bg-well`) mais escuras que o fundo e teclas/cards mais claros com luz especular superior de `1px` (`inset 0 1px 0 var(--specular-top)`).

---

## 2. Color Palette & Roles (Paleta de Cores Semântica e Taxonômica)

### 2.1. Paleta Base do Tema Padrão (`phantom-obsidian`)
* **Deepest Surgical Obsidian Well (`#060912`)** — `--bg-well`: Usado em cavidades rebaixadas, trilhos de abas (`role="tablist"`), docks de botões agrupados e fundos de inputs.
* **Primary Clinical Slate-Night (`#0a0f1d`)** — `--bg-primary`: Fundo principal da janela e atmosfera profunda do viewport WebGL 3D.
* **Elevated Charcoal-Slate Panel (`#111827`)** — `--bg-secondary`: Superfície estrutural da barra superior (`TopNav`), painel lateral esquerdo e gaveta neuroclínica.
* **Tactile Keycap Slate (`#1f2937`)** — `--bg-tertiary` / `--border`: Superfície de teclas elevadas, pílulas ativas, cabeçalhos de acordeão e linhas divisórias sutis de `1px`.
* **Frosted Obsidian Glass (`rgba(17, 24, 39, 0.88)`)** — `--card-bg`: Vidro fosco translúcido com `backdrop-filter: blur(12px)` para HUDs flutuantes sobre o canvas 3D.
* **Crisp Alabaster White (`#f9fafb`)** — `--text-primary`: Títulos principais, nomes anatômicos em Português (PT-BR) e valores numéricos de precisão.
* **Muted Clinical Pewter (`#9ca3af`)** — `--text-secondary`: Nomenclatura oficial em Latim (TA2), rótulos secundários e descrições funcionais.
* **Surgical Cyan Accent (`#38bdf8`)** — `--accent`: Cor interativa primária para pílulas selecionadas, indicadores de foco de teclado, pontos de ancoragem 3D e contornos ativos.
* **Deep Cerulean Hover (`#0284c7`)** — `--accent-hover`: Estado de pressão/hover em controles primários e preenchimento de checkboxes ativos.
* **Biometric Emerald (`#10b981`)** — `--success`: Indicadores de integridade fisiológica normal e confirmação.
* **Clinical Amber Alert (`#f59e0b`)** — `--warning`: Alertas moderados de limiar hemodinâmico ou reserva complacente.
* **Arterial Crimson Danger (`#ef4444`)** — `--danger`: Ações destrutivas, fechamento de modais e alertas críticos de hipertensão intracraniana.

### 2.2. Os 5 Temas Táteis Minerais (`data-theme` em [`src/client/index.css`](file:///C:/Users/melki/dev/repos/appmy/src/client/index.css#L1-L110))

| Tema (`data-theme`) | `--bg-well` | `--bg-primary` | `--bg-secondary` | `--bg-tertiary` | `--accent` | Caráter Mineral |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`phantom-obsidian`** *(Padrão)* | `#060912` | `#0a0f1d` | `#111827` | `#1f2937` | `#38bdf8` | Obsidiana cirúrgica e ciano clínico |
| **`tactile-matte`** | `#0d0d0c` | `#141413` | `#1c1c1a` | `#262624` | `#d6d3d1` | Basalto fosco e pedra aquecida |
| **`quiet-luxury-titanium`** | `#0b0d11` | `#111318` | `#191c24` | `#232733` | `#cbd5e1` | Titânio escovado aeroespacial |
| **`steadfast-stainless`** | `#090c10` | `#0f1419` | `#161d24` | `#202a34` | `#93c5fd` | Aço cirúrgico inoxidável |
| **`warm-editorial-paper`** | `#110f0e` | `#181614` | `#211e1b` | `#2c2824` | `#e7e5e4` | Grafite editorial quente |

### 2.3. Paleta Cromática Taxonômica Z-Anatomy (Materiais PBR e Badges)
* **Anatomical Ivory Bone (`#f4ede2`)**: Sistema Esquelético e Cartilaginoso (Cap. 2 TA2).
* **Myofascial Carmine (`#dc2626`)**: Sistema Muscular (Cap. 3 TA2).
* **Neural Gold (`#eab308`)**: Sistema Nervoso Central e Periférico (Cap. 4 TA2).
* **Arterial Coral / Venous Sapphire (`#ef4444` / `#3b82f6`)**: Sistema Cardiovascular (Cap. 5 TA2).
* **Lymphatic Jade (`#10b981`)**: Órgãos Linfoides (Cap. 6 TA2).
* **Pulmonary Cyan (`#06b6d4`)**: Sistema Respiratório (Cap. 7 TA2).
* **Visceral Ochre (`#f59e0b`)**: Sistema Digestório (Cap. 8 TA2).
* **Renal Amethyst (`#8b5cf6`)**: Sistema Urinário e Genital (Cap. 9–10 TA2).
* **Endocrine Rose (`#ec4899`)**: Glândulas Endócrinas (Cap. 11 TA2).

---

## 3. Typography Rules (Tipografia e Hierarquia de Leitura)

A interface utiliza pareamento tipográfico triplo definido em [`src/client/index.css`](file:///C:/Users/melki/dev/repos/appmy/src/client/index.css#L11-L15):
* **Display & Cabeçalhos (`--font-display`)**: `'Plus Jakarta Sans'`, `'Inter'`, `sans-serif` — traço geométrico humanista com tracking negativo (`-0.025em`) para títulos de dossiês clínicos e identidade visual.
* **Leitura Médica & Controles (`--font-sans`)**: `'Inter'`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` — alta legibilidade em tamanhos compactos (`11px` a `13px`).
* **Telemetria, Equações & Códigos FMA (`--font-mono`)**: `'JetBrains Mono'`, `monospace` — `font-variant-numeric: tabular-nums` obrigatório em contadores de peças, coordenadas MPR em centímetros, pressões (`mmHg`) e códigos FMA/TA2.

### Escala Tipográfica Canônica
* **Brand Header**: `16px` (`1rem`), peso `700` (Bold), tracking `-0.02em`.
* **Título de Estrutura (PT-BR)**: `13px` (`0.8125rem`), peso `600` (Semi-Bold), cor `#f9fafb`.
* **Nomenclatura Científica (Latim TA2)**: `11px` (`0.6875rem`), peso `400` (Regular), estilo *Itálico*, cor `#9ca3af`.
* **Rótulos de Seção e Abas**: `11px` (`0.6875rem`), peso `600` (Semi-Bold), `UPPERCASE`, tracking `+0.05em`.
* **Chips FMA e Badges Numéricos**: `10px` (`0.625rem`), peso `500` (Medium), fonte mono tabular.

---

## 4. Component Stylings (Especificação de Componentes Táteis)

* **Teclas e Botões Táteis (`.btn-tactile`, `.mode-btn`)**:
  - Cantos suavemente arredondados (`6px` a `8px`), altura mínima ergonômica com `white-space: nowrap` e `flex-shrink: 0` (anti-esmagamento).
  - Elevação física com sombra de 3 camadas (`--shadow-key`: `0 2px 5px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.35), inset 0 1px 0 var(--specular-top)`).
  - Estado ativo: borda iluminada em Ciano Cirúrgico (`#38bdf8`) e fundo `--bg-tertiary` (`#1f2937`).
* **Cavidades e Trilhos de Abas (`.well-tactile`, `.header-mode-group`)**:
  - Moldura rebaixada (`background: var(--bg-well)`, `#060912`) com sombra interna (`--shadow-well`: `inset 0 2px 4px rgba(0,0,0,0.65)`) que abriga grupos de pílulas de modo ou seletores de abas.
* **Cards Flutuantes e HUDs Clínicos (`.card-tactile`, `.dissection-toolbar`)**:
  - Cantos arredondados (`10px` a `12px`), fundo translúcido (`--card-bg`) com desfoque de fundo (`backdrop-filter: blur(12px)`), borda fina de `1px solid var(--border)` e sombra profunda difusa (`--shadow-card`).
* **Inputs de Busca e Sliders (`.outliner-search-input`)**:
  - Campo de busca com `34px` de altura alojado em cavidade escura, ícone de lupa à esquerda, botão de limpeza rápida à direita e contorno de foco nítido (`#38bdf8`).
  - Sliders de opacidade e corte MPR com preenchimento contínuo e leitura numérica tabular ao lado.
* **Callout 3D Deslocado (`AnatomicalCallout3D`)**:
  - Renderizado em escala constante 1:1 de tela via `<Html center>` (sem `distanceFactor`), conectando o ponto de ancoragem luminoso (`8px x 8px` em `#38bdf8`) no centro real da peça a um card compacto (`210px`) fora da silhueta anatômica por meio de linha guia SVG tracejada.

---

## 5. Layout Principles (Arquitetura Espacial e Navegação Limpa)

O shell da aplicação opera em tela cheia fixa (`100vw x 100vh`, `overflow: hidden`), estruturado para eliminar redundância de controles:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR (56px) — 3 Zonas:                                                                   │
│ [Esquerda: Brand Atlas 3D] | [Centro: 6 Presets Diretos] | [Direita: Estúdio Neuro + Restaurar/Tela/Tema]│
├───────────────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ SIDEBAR ESQUERDA (320px)      │ VIEWPORT 3D CENTRAL (100% da largura restante)                        │
│                               │                                                                        │
│ • Busca Global (Ctrl+K)       │            [BARRA DE DISSECÇÃO COMPACTA — Topo Central]                │
│ • Seletor Masculino/Feminino  │            Sólido | Raio-X | Corte MPR | Bisturi 3D | [Expandir]       │
│ • 4 Abas WAI-ARIA:            │                                                                        │
│   1. TA2 (Árvore limpa)       │                                                                        │
│   2. Camadas (11 Sistemas)    │                       (Peça Anatômica .GLB Real)                       │
│   3. Neuro (SNC/LCR/Vascular) │                                                                        │
│   4. Clínica (Ficha TA2/FMA)  │  [Enquadrar 3D]                                         [Marcadores]   │
└───────────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

### 5.1. Barra Superior em 3 Zonas ([`src/client/App.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/App.tsx#L121-L216))
1. **Zona Esquerda (Identidade)**: Ícone `Layers` + título **Atlas 3D de Anatomia**.
2. **Zona Central (6 Presets Anatômicos Diretos)**: Trilho `.well-tactile` com acionamento imediato de **Corpo Inteiro**, **Esqueleto**, **Crânio**, **Neuro**, **Tórax** e **Vísceras** (eliminando a necessidade de barra duplicada de presets na base do canvas).
3. **Zona Direita (Regra 1+2)**:
   - **CTA Primário**: Botão **Estúdio Neuroclínico** (abre a gaveta de simulação fisiológica de Monro-Kellie, PIC/PPC, LCR e territórios vasculares).
   - **Ações Secundárias Discretas**: **Restaurar** (reseta câmera e dissecção), **Tela Cheia** (Zen Mode `Z`) e seletor compacto de **Tema** (5 temas minerais).

### 5.2. Painel Lateral Esquerdo Unificado ([`AnatomyTreePanel.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/ui/tree/AnatomyTreePanel.tsx#L1-L300))
* Topo fixo com **Busca Global (`Ctrl+K`)**, alternador de dimorfismo **Masculino / Feminino** e barra de **4 abas WAI-ARIA (`role="tablist"`)** com distribuição equitativa (`grid-template-columns: repeat(4, 1fr)`):
  1. **Sistemas (TA2)**: Árvore hierárquica oficial limpa com indentação única por nível (`.outliner-group-children` `margin-left: 0.5rem; padding-left: 0.25rem`, sem indentação cumulativa duplicada em `TreeGroup`/`TreeItem`), selos compactos (`1ª` a `11ª`), checkboxes *tri-state*, contadores de peças visíveis e ações de foco/isolamento no hover.
  2. **Camadas** ([`AnatomyFiltersSection.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/ui/tree/AnatomyFiltersSection.tsx#L1-L290)): Filtro de região esquelética, barra tripla de dissecção rápida (`-1 Camada`, `+1 Camada`, `Todas`) e lista das 11 camadas anatômicas com toggle de visibilidade e pílulas de opacidade.
  3. **Neuro** ([`NeuroAnatomyPanelSection.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/ui/tree/NeuroAnatomyPanelSection.tsx)): Craniotomia rápida, **Mapa Cromático Funcional por Área Encefálica** clicável (10 áreas funcionais), subcamadas neuroanatômicas reais com faixa lateral colorida (`4px solid`) sincronizada ao hover 3D e 12 pares cranianos.
  4. **Ficha** ([`AnatomyClinicalCard.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/ui/tree/AnatomyClinicalCard.tsx)): Dossiê bilíngue PT-BR / Latim TA2, código FMA, ações rápidas (`Focar`, `Isolar`, `Ocultar`) e notas clínicas.

### 5.3. Viewport 3D Desimpedido, HUD de Hover e Controles Flutuantes
* **Barra Superior de Dissecção e Modos de Visualização ([`DissectionToolbar.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/ui/DissectionToolbar.tsx))**: Reúne os modos **Sólido**, **Raio-X**, **Corte MPR**, **Fantasma** (*Ghost Context* a `10%` de opacidade, atalho `G`), **Isolar / Sair Solo** (atalho `I`) e **Bisturi 3D** (*Click-to-Peel* ou `Alt + Clique`, com botão `Desfazer`). Os sliders de **Exploded View** e **Camada Cirúrgica (1–6)** operam tanto no modo **Sólido** quanto no modo **Raio-X**. No modo **Corte MPR**, oferece passo fino de `0.01 cm` e botões de ajuste de precisão (`-0.05` / `+0.05 cm`).
* **HUD Flutuante de Identificação no Hover (`.hovered-structure-pill` em [`QuickPresetsBar.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/ui/QuickPresetsBar.tsx))**: Exibe em tempo real a cor da área funcional, o nome em português, o termo em latim e a divisão funcional da estrutura sob o cursor antes do clique.
* **Dock Tátil de Navegação e Movimentação do Boneco 3D ([`OrientationGizmo.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/canvas/OrientationGizmo.tsx))**:
  - **Alternador de Interação (`Girar` vs. `Mover`)**: Comuta o botão esquerdo do mouse (e 1 dedo no touch) entre rotação orbital (`rotate`) e translação livre do corpo (`pan`), permitindo subir da pelve ao crânio sem depender do botão direito.
  - **Elevação Craniocaudal e Zoom Direto**: Botões táteis `↑` (Subir), `↓` (Descer), `+` (Zoom In) e `-` (Zoom Out).
  - **Vistas Anatômicas Canônicas de 1 Clique**: `Frente`, `Dorso`, `Dir.`, `Esq.`, `Topo` e **`Enquadrar 3D`**, além de guia interativo (`?`).
* **Marcadores Clínicos ([`QuickPresetsBar.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/ui/QuickPresetsBar.tsx#L1-L150))**: Botão **`Marcadores`** no canto inferior para salvar e restaurar estados cirúrgicos em `localStorage`.

### 5.4. Arquitetura dos Nós e Ciclo de Ativação em $O(1)$ (`Catálogo -> Árvore -> Store -> GPU`)
1. **Tripla Indexação de Aliases (`2.620` Estruturas)**:
   - Cada estrutura possui 3 chaves sinônimas indexadas em `COMBINED_BY_ID`, `COMBINED_BY_NODE` e `SYSTEM_DESCENDANT_ALIASES`: `item.id` (`za:*`), `item.node` (nome GLTF bruto) e `sanitizeNodeName(item.node)` (nome sanitizado pelo `THREE.GLTFLoader`).
2. **5 Canais de Ativação**:
   - **Canal 1 — Clique / Duplo-Clique 3D (`RealBodyAtlas.tsx`)**: Clique simples seleciona a malha via lookup hash `animNodeByKey.get(name)` em $O(1)$, ancora o `<AnatomicalCallout3D>` no ponto exato da superfície e centraliza a mira; **Duplo-Clique** dispara `focusCameraOnNode(id, true)`, aproximando a câmera na distância proporcional ao raio da peça (`__boundingRadius`). Com `peelOnClickMode` ou `Alt + Clique`, retira imediatamente a peça (`peelNodeOnClick`).
   - **Canal 2 — Árvore Taxonômica TA2 (`TreeItem.tsx` / `TreeGroup.tsx`)**: Clique na linha executa `selectAndFocusNode(node.id)` (desoculta automaticamente a peça, ativa seu sistema e centraliza a câmera); duplo-clique aproxima o zoom na peça; botão `Olho` ou checkbox *tri-state* executa `toggleGroupVisibility` com seletor booleano $O(1)$.
   - **Canal 3 — Busca Global Multi-Token (`GlobalSearchBox.tsx`, `Ctrl+K`)**: Localiza estruturas em PT-BR, Latim TA2 e Inglês, expande automaticamente os ramos pais na árvore (`hasSelectedDescendant`) e rola suavemente até o nó.
   - **Canal 4 — Descascar Camadas (`AnatomyFiltersSection.tsx`)**: Aciona `toggleSystemPeel` de fora para dentro (`1ª EXT → 11ª INT`) mantendo as vísceras internas visíveis, e oculta `clonedScene.visible = false` quando um sistema inteiro está oculto para zerar o custo de Raycasting.
   - **Canal 5 — Mapeador Neuroclínico (`neuroTargetMapper.ts`)**: Converte alvos funcionais (`fma:*`, `cn_*`) para malhas reais `za:*` com translucidez automática do crânio (`0.28`).

---

## 6. Diretrizes 3D, Mapa Cromático Encefálico & Corte MPR

### 6.1. Materiais PBR, Mapa Cromático Encefálico (`tissueShader.ts`) e Corte MPR
* **Osteologia PBR**: `MeshStandardMaterial` em marfim `#f4ede2`, `roughness: 0.45–0.60`, `metalness: 0.00–0.05`.
* **Mapa Cromático Encefálico por Área/Lobo (`getNervousTissueProfile` & `getCorticalGyrusColor`)**:
  - **Lobo Frontal (Motor/Executivo)**: `#8b5cf6` (Violeta Cortical) com diferenciação cromática determinística por giro.
  - **Lobo Parietal (Somatossensorial)**: `#06b6d4` (Ciano Cortical).
  - **Lobo Temporal (Auditivo/Memória)**: `#10b981` (Esmeralda Cortical).
  - **Lobo Occipital (Visual V1)**: `#f59e0b` (Âmbar Cortical).
  - **Sistema Límbico & Ínsula**: `#14b8a6` (Turquesa Límbico).
  - **Substância Branca & Comissuras**: `#cbd5e1` (Marfim Mielínico).
  - **Núcleos da Base**: `#f43f5e` (Carmim Extrapiramidal).
  - **Diencéfalo (Tálamo & Hipotálamo)**: `#fb923c` (Laranja Talâmico).
  - **Cerebelo**: `#d97706` (Terracota Folha Cerebelar com shader `uTissueMode == 5`).
  - **Tronco Encefálico**: Mesencéfalo `#ec4899`, Ponte `#a855f7`, Bulbo `#6366f1`.
  - **Sistema Ventricular & LCR**: `#38bdf8` (`opacityFactor: 0.84`).
  - **Meninges & Foice/Tentório**: `#94a3b8` (`opacityFactor: 0.38`).
* **Relevo Sulcal e Parede Interna MPR (`applyAnatomicalTissueShader`)**:
  - O modo cortical (`uTissueMode == 4`) aplica oclusão nos sulcos (`sulcusShadow = diffuseColor.rgb * 0.54`), iluminação nas coroas girais e contorno Fresnel para delimitar claramente onde clicar.
  - Quando seccionado pelo plano MPR, faces internas (`!gl_FrontFacing`) recebem atenuação `diffuseColor.rgb *= 0.72` para percepção imediata de cavidade e espessura.
* **Moldura Tomográfica MPR Anti-Tremor ([`DissectionController.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/canvas/DissectionController.tsx) & [`DissectionPlaneHelper.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/canvas/DissectionPlaneHelper.tsx))**:
  - Atualização síncrona em memória (`useLayoutEffect` + `useRef<THREE.Plane>`) sem recriar arrays entre ticks do slider.
  - Janela central 100% vazada (`ShapeGeometry` com furo central), `raycast` desativado (`noopRaycast`) e recuo `Z_FIGHT_EPSILON = 0.004` + `polygonOffset` para zero cintilação (*Z-fighting*) e visibilidade total da estrutura seccionada.

---

## 7. States, Motion & Anti-Patterns

* **Transições Zero-Reflow (GPU)**: Exclusivamente `transform` e `opacity` (`cubic-bezier(0.16, 1, 0.3, 1)`), proibindo animar `width`, `height`, `top` ou `left`.
* **Anti-Padrões Proibidos**:
  - Proibido usar cores cobalto neon (`#0066FF`, `#2563EB`, `#3B82F6`) ou emojis em rótulos clínicos.
  - Proibido alocar `new THREE.Vector3`, `Matrix4` ou `Color` dentro de `useFrame`.
  - Proibido aplicar indentação cumulativa duplicada em árvores recursivas.

---

## 8. Implementation Checklist (Atalhos & Acessibilidade WCAG 2.1 AAA)

* **`Z`**: Alterna Modo Tela Cheia (*Zen Mode*).
* **`F` / `I` / `H` / `G`**: Foca e aproxima (`F`), Isola (`I`), Oculta (`H`) a peça anatômica selecionada ou alterna o Contexto Fantasma (`G`).
* **`R`**: Restaura câmera, opacidade e planos de dissecção ao padrão inicial.
* **`Esc`**: Desseleciona a peça ativa e fecha popovers abertos.
* **Acessibilidade**: Contraste mínimo de `4.5:1` em botões de ação (`#0369a1` com `#ffffff`, CR `6.3:1`) e `7:1` em textos clínicos, suporte completo a teclado (`tabIndex={0}`, `Enter`/`Space`), `prefers-reduced-motion: reduce` respeitado e região viva `.sr-only` (`role="status" aria-live="polite"`) para status assíncrono.

---

## 9. Matriz de Decisão Rápida (Desafios de UI/UX 3D vs. Soluções Canônicas)

| Desafio / Sintoma | Solução Canônica Implementada |
| :--- | :--- |
| **Latência ao mover o mouse sobre 2.600+ malhas 3D** | Seletor de hover filtrado por `systemName`, throttle de `16ms` no `onPointerOver`, mapa hash `animNodeByKey` $O(1)$ e `clonedScene.visible = false` em sistemas ocultos. |
| **Travamento ao selecionar peça na Árvore ou no 3D** | Substituição de `new THREE.Box3().setFromObject(mesh)` (varredura de vértices) por transformação $O(1)$ `mesh.localToWorld(anatomicalCenter)` com `__boundingRadius` pré-computado. |
| **Dificuldade para subir/descer pelo corpo no notebook/touch** | Modo **Mover (`Pan`)** com 1 clique no `OrientationGizmo`, botões `↑`/`↓`, `Shift + Scroll` para elevação craniocaudal e vistas diretas (`Frente`, `Dorso`, `Dir.`, `Esq.`, `Topo`). |
| **Enxergar órgãos profundos sem perder referência espacial** | Modo **Fantasma (`G`)** na `DissectionToolbar` (contexto vizinho em `10%` com raycast bloqueado) + **Bisturi 3D (`Alt + Clique`)** com histórico de `Desfazer`. |

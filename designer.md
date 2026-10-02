# Guia do Designer & Especificação do Design System

Documento canônico de arquitetura visual, tokens de design, componentes de interface, ergonomia médica e diretrizes para renderização 3D da plataforma **Atlas 3D de Anatomia Médica** (`app-anatomy` / `appmy`).

---

## 1. Filosofia e Princípios Visuais

O design do Atlas de Anatomia foi concebido sob o paradigma do **Minimalismo Executivo Hospitalar**. A interface gráfica não concorre com a peça anatômica tridimensional; ela atua como uma moldura clínica precisa, sóbria e funcional, inspirada em estações de trabalho de radiologia, neuronavegação cirúrgica e softwares de tomografia computadorizada de última geração.

### 1.1. Pilares Inegociáveis

1. **Foco Cirúrgico e Imersão Máxima**:
   O modelo 3D (335 ossos reais e sistemas viscerais) é o protagonista absoluto. Elementos de controle secundários residem em painéis retráteis ou HUDs flutuantes translúcidos. O modo tela cheia (*Zen Mode*, atalho `Z`) libera 100% da viewport para manipulação tridimensional.

2. **Padrão Estrito "Zero Emojis"**:
   É expressamente proibido o uso de caracteres emoji na interface gráfica, rótulos, botões, modais ou mensagens de sistema. A iconografia é 100% composta por glifos vetoriais lineares padronizados da biblioteca `Lucide Icons` com traçado de espessura ótica constante (`stroke-width="1.5"`).

3. **Cromática Funcional e Anti-Fadiga (Dark Mode Cirúrgico)**:
   A paleta primária baseia-se em tons profundos de azul-ardósia e grafite (`Slate` e `Zinc`), reduzindo o cansaço visual em sessões prolongadas de dissecação virtual e conferindo contraste ótimo para materiais ósseos e viscerais. Cores saturadas puras (`#0000FF`, `#00FF00`) são banidas; acentos e alertas utilizam tonalidades atenuadas e funcionais.

4. **Bordas Sutis e Sombras Disciplinadas**:
   É proibido o uso de sombras difusas pesadas (`shadow-lg`, `shadow-xl`, `shadow-2xl`). O isolamento espacial de cards e painéis é estabelecido por bordas finas sub-pixel (`border: 1px solid #1f2937`) e elevações discretas de 1px com preenchimento via `backdrop-filter: blur(12px)`.

5. **Rigidez de Nomenclatura e Fidelidade Anatômica**:
   Todo componente que expõe dados anatômicos respeita o padrão bilingue: Português do Brasil (PT-BR) em destaque para assimilação rápida e Latim oficial canônico segundo a **Terminologia Anatomica internacional (TA2)** com código FMA (*Foundational Model of Anatomy*).

---

## 2. Design Tokens & Fundamentos Visuais

### 2.1. Paleta de Cores do Sistema

A paleta é estruturada em variáveis CSS globais declaradas em [`src/client/index.css`](file:///src/client/index.css#L1-L16).

| Token CSS | Valor Hexadecimal | Função Semântica na Interface |
| :--- | :--- | :--- |
| `--bg-primary` | `#0a0f1d` | Fundo principal da aplicação e tela base do canvas WebGL |
| `--bg-secondary` | `#111827` | Superfície de painéis laterais, toolbars e caixas modais |
| `--bg-tertiary` | `#1f2937` | Fundo de botões inativos, agrupadores de lista e divisórias |
| `--card-bg` | `rgba(17, 24, 39, 0.85)` | Vidro fosco (*glassmorphism*) para HUDs e cards flutuantes |
| `--text-primary` | `#f9fafb` | Títulos, nomes anatômicos principais e valores de telemetria |
| `--text-secondary`| `#9ca3af` | Rótulos descritivos, nomes em Latim TA2 e textos de apoio |
| `--accent` | `#38bdf8` | Cor primária interativa (Ciano Cirúrgico), focos e bordas ativas |
| `--accent-hover` | `#0284c7` | Estado de sobreposição (*hover*) para ações principais |
| `--border` | `#1f2937` | Linha divisória de separação estrutural e contorno de painéis |
| `--success` | `#10b981` | Status online de microsserviços, integridade de malhas e OK |
| `--warning` | `#f59e0b` | Alertas de limite de VRAM, draw calls elevadas ou avisos |
| `--danger` | `#ef4444` | Fechar seleção, ocultar peças, desconexões ou falhas |

### 2.2. Paleta Cromática Taxonômica Z-Anatomy

Cada sistema anatômico possui representação cromática padronizada para identificação visual imediata no catálogo, nos badges e nos materiais PBR:

| Sistema Anatômico | Capítulo TA2 | Código Hex | Aplicação no Sistema |
| :--- | :--- | :--- | :--- |
| **Sistema Esquelético (Osteologia)** | Cap. 2 | `#f4ede2` | Peças ósseas, cartilagens costais e sínfises |
| **Sistema Muscular (Miologia)** | Cap. 3 | `#dc2626` | Ventres musculares e feixes contráteis |
| **Sistema Cardiovascular (Angiologia)** | Cap. 5 | `#ef4444` / `#3b82f6` | Vermelho cirúrgico (artérias) e Azul profundo (veias) |
| **Sistema Nervoso (Neuroanatomia)** | Cap. 4 | `#eab308` | Encéfalo, medula espinhal e troncos nervosos |
| **Sistema Respiratório** | Cap. 7 | `#06b6d4` | Traqueia, árvore brônquica e parênquima pulmonar |
| **Sistema Digestório** | Cap. 8 | `#f59e0b` | Trato gastrointestinal, fígado e glândulas anexas |
| **Sistema Urinário** | Cap. 9 | `#8b5cf6` | Rins, ureteres, bexiga e uretra |
| **Sistema Linfático** | Cap. 6 | `#10b981` | Linfonodos, ductos linfáticos e baço |
| **Sistema Articular (Sindesmologia)** | Cap. 2 | `#cbd5e1` | Cápsulas articulares, ligamentos e meniscos |
| **Sistema Endócrino** | Cap. 11 | `#ec4899` | Hipófise, tireoide, adrenais e gônadas |

### 2.3. Tipografia e Escala de Texto

A aplicação emprega duas famílias tipográficas canônicas:

- **Fonte de Interface e Leitura Médica (`--font-sans`)**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`. Otimizada para leitura técnica rápida em ecrãs de alta densidade.
- **Fonte de Telemetria e Códigos Canônicos (`--font-mono`)**: `JetBrains Mono`, `monospace`. Empregada exclusivamente para exibição de identificadores FMA, coordenadas espaciais 3D, valores de telemetria (FPS, draw calls, triângulos) e logs técnicos.

#### Escala Tipográfica Padrão

```text
Display / Brand:       18px (1.125rem) | Peso: 700 (Bold)        | Tracking: -0.025em
Título de Seção:       14px (0.875rem) | Peso: 600 (Semi-Bold)   | Tracking: -0.015em
Nome de Peça (PT-BR):  13px (0.8125rem)| Peso: 600 (Semi-Bold)   | Cor: #f9fafb
Nome Científico (Lat): 11px (0.6875rem)| Peso: 400 (Regular)     | Estilo: Italic | Cor: #9ca3af
Rótulos de Controle:   11px (0.6875rem)| Peso: 600 (Semi-Bold)   | Transform: UPPERCASE | Tracking: +0.05em
Badges & Metadados:    10px (0.625rem) | Peso: 500 (Medium)      | Mono para códigos FMA
```

---

## 3. Arquitetura de Layout & Grid Espacial

O shell da aplicação adota um grid estrito sem barra de rolagem global na janela (`overflow: hidden`), dividido em três zonas estruturais:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR (56px) - Brand, Seletor de Modo, Controle de Densidade (100%/35%/0%), Zen Mode (Z)  │
├───────────────────────────────┬────────────────────────────────────────────────────────────────────────┤
│ SIDEBAR ESQUERDA (360px fixo) │ VIEWPORT 3D CENTRAL (100% da largura restante)                        │
│                               │                                                                        │
│ 1. FICHA CLÍNICA (Topo)       │  [HUD DE TELEMETRIA]            [BARRA DE DISSECÇÃO MPR]                │
│    - Nome PT-BR & Latim TA2   │  FPS: 60 | Triângulos: 420k     Plano: Sagital/Coronal/Axial           │
│    - Badges FMA & Sistema     │                                                                        │
│    - Ações: Foco/Isolar/Ocultar│                                 [GIZMO DE ORIENTAÇÃO 3D]               │
│    - Detalhes Anatômicos      │                                 ViewCube com projeções canônicas       │
│                               │                                                                        │
│ 2. FILTROS RÁPIDOS SELECIONÁ- │                                                                        │
│    VEIS (Retrátil)            │                                                                        │
│    - 11 Sistemas Anatômicos   │                                                                        │
│    - 7 Regiões do Esqueleto   │                                                                        │
│                               │                                                                        │
│ 3. ÁRVORE TAXONÔMICA (335 ossos)│                                [BARRA DE PRESETS RÁPIDOS]              │
│    - Checkboxes Tri-state     │                                Crânio | Coluna | Tórax | Membros       │
│    - Busca instantânea        │                                                                        │
└───────────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

### 3.1. Barra Superior de Navegação (`TopNav`, Altura: 56px)

- **Identidade da Aplicação**:
  - Ícone `Layers` na tonalidade `#38bdf8`.
  - Título principal com gradiente suave (`linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)`).
  - Badge pulsante de prontidão médica: *"Z-Anatomy: Esqueleto Completo (335 Ossos) & Órgãos Reais"*.
- **Controles de Visualização**:
  - Seletor de Modelo: `Corpo Real (.GLB)` vs `Vista Didática (Crânio)`.
  - Seletor de Densidade Óssea:
    - `Sólido (100%)` (opacidade 1.0 com renderização vívida).
    - `Translúcido (35%)` (revela estruturas internas e órgãos subjacentes).
    - `Oculto (0%)` (apaga o esqueleto para dissecação puramente visceral).
- **Atalho de Foco Cirúrgico**: Botão para alternância rápida do `Zen Mode` (atalho `Z`), colapsando todas as barras para entregar 100% do monitor ao modelo 3D.
- **Alternador de Modos**: Navegação entre `Atlas 3D` e o painel `Cloud & Telemetria`.

### 3.2. Painel Lateral Esquerdo Unificado (`AnatomyTreePanel`, Largura: 360px)

Consolidado para evitar a fragmentação em duas barras opostas. Reúne três camadas complementares:

1. **Dossiê Anatômico & Ficha Clínica (`AnatomyClinicalCard`)**:
   - Fixado no topo do painel quando uma estrutura é selecionada pelo usuário (via clique no 3D ou na árvore).
   - Apresenta: Ícone `Stethoscope`, título bilingue, etiqueta FMA, pílulas de ação rápida (`Foco`, `Isolar`, `Ocultar`, `Fechar`) e sanfona de detalhes clínicos (origem, inserção, inervação e relevância semiológica).
2. **Seção de Filtros Selecionáveis (`AnatomyFiltersSection`)**:
   - Acordeão recolhível contendo grid compacto de 11 Sistemas Médicos (Ossos, Músculos, Cardio, Nervoso, Respiratório, Digestório, Linfático, Urinário, Endócrino, Reprodutor e Articular).
   - Seletor horizontal com 7 Regiões do Esqueleto (Todo o Esqueleto, Crânio & Face, Coluna, Tórax, Membros Superiores, Pelve e Membros Inferiores).
3. **Árvore Taxonômica Integrada (`TreeGroup`)**:
   - Estrutura hierárquica respeitando a classificação anatômica internacional.
   - Caixas de seleção com três estados determinísticos (*tri-state*):
     - `Marcado`: Todas as sub-peças do grupo estão visíveis.
     - `Indeterminado` (barra horizontal): Grupo parcialmente visível.
     - `Desmarcado`: Todo o grupo ou peça individual ocultado da cena.
   - Campo de busca instantânea com contadores de peças correspondentes e destaque tipográfico.

### 3.3. Viewport 3D Central Expandido (`.viewport-center-area`)

Ocupa 100% da largura restante da janela (mínimo de 1024px até resoluções 4K UHD), garantindo campo de visão irrestrito:

- **HUD de Telemetria (`TelemetryOverlay`)**:
  - Posicionado no canto superior esquerdo do canvas.
  - Indicadores em tempo real: FPS (com threshold visual: verde para $\ge 55$, amarelo para $30\text{--}54$, vermelho para $< 30$), triângulos renderizados e draw calls de GPU.
- **Barra Clínica de Dissecção Tomográfica Multiplanar (`DissectionToolbar`)**:
  - Dock flutuante com controles para corte tomográfico nos três eixos canônicos: Sagital, Coronal e Axial.
  - Controles de inversão de plano, sliders de deslocamento milimétrico e alternador de modo (Sólido, Raio-X translúcido e Corte Tomográfico).
- **Cubo de Orientação Tridimensional (`OrientationGizmo`)**:
  - ViewCube no canto superior direito do viewport, permitindo reposicionamento instantâneo da câmera ortográfica ou de perspectiva para as faces Anterior, Posterior, Superior, Inferior e Laterais Direita/Esquerda.
- **Barra Inferior de Presets Anatômicos (`QuickPresetsBar`)**:
  - Posicionada na base do viewport para acionamento com um clique: foca a câmera automaticamente e filtra as estruturas da região selecionada com transição fluida (*lerp* esférico).

---

## 4. Catálogo Canônico de Componentes de UI

### 4.1. Botões e Ações Interativas

| Componente | Classe CSS Canônica | Estados e Comportamento Visual |
| :--- | :--- | :--- |
| **Botão de Modo (TopNav)** | `.mode-btn` | Texto reduzido (12px), fundo transparente, bordas arredondadas (6px). Ativo recebe fundo `#1f2937` e acento ciano `#38bdf8`. |
| **Pílula de Ação Clínica** | `.outliner-action-pill` | Altura compacta (26px), micro-ícone de 12px, transição ao passar o mouse com borda `#38bdf8`. |
| **Botão de Ação Perigosa** | `.outliner-icon-btn.danger`| Ícone `X`, borda sutil, hover em tom avermelhado (`rgba(239, 68, 68, 0.2)`). |
| **Filtro Selecionável** | `.outliner-filter-btn` | Grid de 2 colunas com ícone temático, texto truncado com ellipsis e contorno ativo iluminado. |
| **Botão de Presets 3D** | `.preset-pill-btn` | Formato pílula (*rounded-full*), fundo translúcido com blur, ativo recebe brilho ciano suave. |

### 4.2. Controles de Seleção e Busca

- **Campo de Busca de Estruturas**:
  - Input com altura de 34px, fundo `#0f172a`, borda `1px solid #1e293b`.
  - Ícone de lupa posicionado à esquerda e botão de limpeza rápida à direita.
  - Foco: borda acentuada em `#38bdf8` sem sombra externa (*outline-none*).
- **Caixas de Seleção Tri-State**:
  - Dimensão: $14 \times 14\text{ px}$.
  - Fundo inativo: `rgba(15, 23, 42, 0.8)` com borda `#334155`.
  - Ativo total: Preenchimento `#0284c7` com glifo de check vetorizado.
  - Parcial/Misto: Fundo escuro com traço horizontal ciano indicando estado indeterminado.

### 4.3. Badges, Chips e Rótulos Médicos

- **Badge de Terminologia Canônica (FMA / TA2)**:
  - Estilo: `.fma-chip` (fonte `JetBrains Mono`, tamanho 10px, padding `2px 6px`, borda ciano suave com 20% de opacidade).
- **Badge de Sistema Anatômico**:
  - Estilo: `.outliner-system-tag` (Inter, uppercase, peso 600, tamanho 10px, cor de acordo com a paleta taxonômica da seção 2.2).
- **Atalhos de Teclado no HUD**:
  - Estilo: Tag `<kbd>` estilizada com fundo `#1e293b`, borda `#334155`, cantos chanfrados (3px) e fonte mono.

---

## 5. Diretrizes para Visualização 3D & Technical Artists

### 5.1. Materiais PBR e Iluminação Cirúrgica

Para garantir autenticidade anatômica sem perder fluidez em GPUs integradas:

1. **Material Ósseo Canônico**:
   - `MeshStandardMaterial` com textura de cor baseada no matiz ósseo marfim `#f4ede2`.
   - `Roughness`: Entre `0.45` e `0.60` (dispersão biológica sem aspecto plástico ou cerâmico).
   - `Metalness`: `0.00` (materiais biológicos possuem condutividade metálica nula).
2. **Materiais Viscerais e Vasculares**:
   - `Roughness`: Entre `0.25` e `0.35` (levemente reflexivos, simulando serosa e umidade fisiológica).
   - Efeito de translucidez subsuperficial (*subsurface scattering* aproximado via shader Fresnel customizado nos modos de corte).
3. **Iluminação de Três Pontos**:
   - Luz Principal (*Key Light*): Direcional neutra (temperatura 5500K) posicionada antero-superior a 45 graus.
   - Luz de Preenchimento (*Fill Light*): Luz difusa hemisférica suave (tom ciano/frio para preenchimento de cavidades).
   - Luz de Recorte (*Rim Light*): Direcional posterior suave para destacar silhuetas anatômicas contra o fundo escuro.

### 5.2. Motor de Visão Explodida (*Exploded View*)

A desarticulação tridimensional não deve utilizar dispersão esférica aleatória. Cada osso e sistema possui um **vetor vetorial de explosão biomecânica** gravado no catálogo:

- **Calvária Craniana**: Deslocamento puramente superior com leve afastamento radial anterior/posterior.
- **Mandíbula**: Deslocamento póstero-inferior, preservando a fossa mandibular.
- **Coluna Vertebral**: Descompactação axial ao longo do eixo vertical (Y), multiplicando a distância intervertebral para revelar discos, processos espinhosos e forames neurais.
- **Caixa Torácica**: Abertura lateral em leque bilateral, preservando a orientação anatômica das curvaturas costais.
- **Membros**: Afastamento lateral (eixo X) proporcional à distância em relação ao esqueleto axial.

### 5.3. Dissecção Tomográfica Multiplanar (MPR)

A renderização do corte utiliza planos de clipagem do Three.js (`clippingPlanes`) integrados aos materiais padrão:

- O corte deve exibir a cápsula cortical e a cavidade medular com cor sólida de preenchimento (*stencil cap shader*), evitando a ilusão de ossos ocos.
- As linhas dos eixos sagital (vermelho), coronal (verde) e axial (azul) adotam padrão pontilhado cirúrgico de 1px quando o gizmo auxiliar está ativo.

### 5.4. Orçamento de Performance de GPU (Quality Budget)

| Métrica de Desempenho | Meta Alvo | Limite Máximo Tolerado | Ação de Mitigação |
| :--- | :--- | :--- | :--- |
| **Taxa de Quadros (FPS)** | 60 FPS estáveis | 45 FPS em rotações rápidas | Ativar decimação dinâmica de LOD |
| **Draw Calls por Quadro** | $\le 120$ chamadas | 200 chamadas | Agrupamento de geometrias estáticas |
| **Polígonos Simultâneos** | $\le 600.000$ triângulos | 1.200.000 triângulos | Compressão Draco WASM nível 7 |
| **Uso de VRAM (Geometrias)**| $\le 180\text{ MB}$ | 350 MB | Descarregar texturas não visíveis |

---

## 6. Ergonomia Médica, Acessibilidade & Hotkeys

### 6.1. Mapa Oficial de Atalhos de Teclado

Projetado para permitir que o usuário opere a dissecção e a visualização com uma única mão sobre o teclado:

```text
┌─────────────────┬──────────────────────────────────────────────────────────────────┐
│ TECLA DE ATALHO │ AÇÃO NO ATLAS ANATÔMICO                                          │
├─────────────────┼──────────────────────────────────────────────────────────────────┤
│ Z               │ Alterna Modo Foco Cirúrgico (Zen Mode: 100% tela limpa)          │
│ F               │ Foca a câmera no centro da peça anatômica selecionada            │
│ I               │ Isola a peça selecionada, ocultando todas as outras              │
│ H               │ Oculta a estrutura atualmente selecionada                        │
│ Esc ou X        │ Desseleciona a peça ativa e fecha o dossiê clínico               │
│ R               │ Reseta a câmera, orientação e planos de dissecção para o padrão  │
│ 1 a 7           │ Aciona diretamente os presets anatômicos (Crânio, Coluna, etc.)   │
└─────────────────┴──────────────────────────────────────────────────────────────────┘
```

### 6.2. Diretrizes de Acessibilidade (WCAG 2.1 AAA)

1. **Contraste de Cor**: Todo texto clínico e rótulo de elemento interativo apresenta taxa de contraste mínima de $7:1$ em relação ao fundo escuro correspondente.
2. **Navegabilidade por Teclado**: Todos os botões, cabeçalhos de acordeão e itens de lista possuem atributos `tabIndex={0}`, ouvintes para `Enter` e `Space`, e contorno de foco de alto contraste (`outline: 2px solid #38bdf8`).
3. **Semântica e Leitores de Tela**:
   - Ícones decorativos recebem obrigatoriamente `aria-hidden="true"`.
   - Botões de alternância e recolhimento incluem `aria-expanded="true/false"` e `aria-controls`.
   - A ficha médica inclui `role="region"` com `aria-label="Ficha clínica da estrutura selecionada"`.

---

## 7. Anti-Padrões & Matriz de Reprovação de Design

Toda contribuição de interface ou componente deve ser avaliada contra a matriz abaixo antes de ser aceita no repositório:

| Prática Terminantemente Proibida | Alternativa Canônica Obrigatória |
| :--- | :--- |
| **Uso de emojis em qualquer parte da UI** | Utilizar ícones lineares padronizados da suíte `Lucide Icons`. |
| **Sombras intensas (`shadow-xl`, `shadow-2xl`)** | Utilizar bordas finas de 1px com tons Slate (`#1f2937`) e `backdrop-blur`. |
| **Cores saturadas puras (ex: `#00f`, `#0f0`)** | Utilizar paleta cirúrgica atenuada (`#38bdf8`, `#10b981`, `#ef4444`). |
| **Scrollbars padrão do navegador nativas** | Utilizar a classe `.scrollbar-thin` com trilho discreto e thumb refinado. |
| **Dupla sidebar simultânea consumindo viewport**| Sidebar lateral esquerda unificada com card clínico integrado no topo. |
| **Textos de rótulo em caixa mista despadronizados**| Utilizar `uppercase text-[11px] font-semibold tracking-wider`. |
| **Ausência de suporte a teclado em botões custom**| Incluir suporte nativo a `tabIndex`, `onKeyDown` para `Enter` e `Space`. |
| **Esqueleto com materiais plásticos especulares**| Manter `roughness` entre 0.45 e 0.60 e `metalness: 0.0`. |

---

## 8. Checklist de Homologação de Novas Telas

Antes de lançar ou modificar componentes de UI:

- `[ ]` **Zero Emojis**: Foi verificado por regex que nenhum caractere emoji gráfico existe no código JSX/TSX ou CSS?
- `[ ]` **Tokens de Cor**: Todas as cores utilizadas referenciam variáveis CSS globais ou a paleta canônica?
- `[ ]` **Tipografia Canônica**: Textos utilizam `Inter` para leitura médica e `JetBrains Mono` para códigos técnicos?
- `[ ]` **Responsividade e Zen Mode**: O componente colapsa ou se adapta elegantemente ao ativar o atalho `Z`?
- `[ ]` **Acessibilidade e Foco**: O componente é operável 100% via teclado com contorno de foco visível?
- `[ ]` **Fidelidade Z-Anatomy**: Novas peças anatômicas possuem mapeamento com identificador FMA e Latim TA2?
- `[ ]` **Quality Gates**: `npm run typecheck`, `npm test` e `npm run build` executam com Exit Code 0?

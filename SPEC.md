# Especificação Funcional & Invariantes de Engenharia (`SPEC.md`)

**Projeto**: Atlas 3D de Anatomia Médica (`appmy`)  
**Repositório**: `melkidonadonmed-lgtm/appmy`  
**Stack**: React 19 + TypeScript 5.8 + Three.js r186 (`@react-three/fiber` 9) + Zustand 5 + Express 4 + Vitest 3

---

## 1. Requisitos Funcionais Implementados (`[PASS]`)

| ID | Requisito Funcional | Módulo / Arquivo de Implementação | Status |
| :--- | :--- | :--- | :---: |
| **RF-01** | Renderização 3D de 335 ossos reais desarticulados e sistemas viscerais/musculares `.glb` com decodificação Draco offline | [`src/client/components/canvas/RealBodyAtlas.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/canvas/RealBodyAtlas.tsx) | `[PASS]` |
| **RF-02** | Sincronização de Sexo Biológico (`Masculino` vs. `Feminino` sem cruzamento) com 36 estruturas femininas catalogadas | [`src/shared/constants/femaleReproductiveCatalog.ts`](file:///C:/Users/melki/dev/repos/appmy/src/shared/constants/femaleReproductiveCatalog.ts) | `[PASS]` |
| **RF-03** | Exploded View Homolateral contínua ($C^1$-contínua via `Math.tanh`, avanço linear $P(t) = P_0 + \vec{V}_{\text{offset}} \cdot t$ e preservação homolateral `.l`/`.r`) | [`src/core/explodedEngine.ts`](file:///C:/Users/melki/dev/repos/appmy/src/core/explodedEngine.ts) | `[PASS]` |
| **RF-04** | Dissecção Tomográfica Multiplanar (MPR: Sagital `X`, Coronal `Z`, Axial `Y`) com planos de corte WebGL e lâmina 3D | [`src/client/lib/dissection-planes.ts`](file:///C:/Users/melki/dev/repos/appmy/src/client/lib/dissection-planes.ts) | `[PASS]` |
| **RF-05** | Estratigrafia Cirúrgica de Fora para Dentro (`1ª EXT → 11ª INT` e subcamadas miofasciais `2.1 EXT → 2.4 INT`) com `toggleSystemPeel` | [`src/core/surgicalLayers.ts`](file:///C:/Users/melki/dev/repos/appmy/src/core/surgicalLayers.ts), [`src/shared/utils/buildTaxonomicTree.ts`](file:///C:/Users/melki/dev/repos/appmy/src/shared/utils/buildTaxonomicTree.ts) | `[PASS]` |
| **RF-06** | Shader Procedural GPU de Tecido Muscular e Fascial (estrias longitudinais e trama colágena zero-allocation em VRAM) | [`src/core/tissueShader.ts`](file:///C:/Users/melki/dev/repos/appmy/src/core/tissueShader.ts) | `[PASS]` |
| **RF-07** | Estúdio Neuroclínico Integrado (14 Forames da Base do Crânio, Áreas de Brodmann, 12 Pares Cranianos `NC I–XII`, Calculadora ASPECTS e Simulador de Casos) | [`src/client/components/ui/clinical/`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/ui/clinical) | `[PASS]` |
| **RF-08** | Navegação 3D com *Gesture Intent Locking* (`pinch` / `pan` / `rotate`) e normalização de `WheelEvent.deltaMode` | [`src/core/navigationGestures.ts`](file:///C:/Users/melki/dev/repos/appmy/src/core/navigationGestures.ts) | `[PASS]` |
| **RF-09** | Callout 3D Compacto em Escala 1:1 (`<Html center>` sem `distanceFactor`) com linha guia SVG tracejada e 4 ações rápidas | [`src/client/components/canvas/AnatomicalCallout3D.tsx`](file:///C:/Users/melki/dev/repos/appmy/src/client/components/canvas/AnatomicalCallout3D.tsx) | `[PASS]` |
| **RF-10** | Design System Tátil Melki com 5 temas minerais (`phantom-obsidian`, `tactile-matte`, `quiet-luxury-titanium`, `steadfast-stainless`, `warm-editorial-paper`) | [`src/client/index.css`](file:///C:/Users/melki/dev/repos/appmy/src/client/index.css) | `[PASS]` |

---

## 2. Invariantes Numéricos, Físicos e de Tipagem (`code-quality-audit-3d-physics`)

1. **Zero-Allocation no Loop 3D (`useFrame`)**:
   - Proibido instanciar `new THREE.Vector3`, `new THREE.Matrix4`, `new THREE.Quaternion` ou `new THREE.Color` dentro de callbacks `useFrame` (60–120Hz). Todos os cálculos por frame reutilizam vetores pré-alocados via `useRef` ou escopo de módulo.
2. **Normalização Vetorial Protegida (`UNCHECKED_NORMALIZE = 0`)**:
   - Todo cálculo `.normalize()` sobre vetores derivados de produtos vetoriais ou entradas dinâmicas valida `vec.lengthSq() > 1e-12` antes da divisão.
3. **Tolerância em Ponto Flutuante (`STRICT_FLOAT_COMPARE = 0`)**:
   - Comparações de opacidades e progressos contínuos utilizam tolerância explícita `Math.abs(a - b) < 1e-4`.
4. **Tipagem Estrita (`any = 0`)**:
   - `npm run typecheck` deve aprovar cliente e servidor com zero ocorrências de `: any` ou `as any`.

---

## 3. Backlog Técnico Evolutivo (`TODO`)

- [ ] **Modularização de Arquivos Longos (> 500 linhas)**:
  - Extrair folhas de estilo temáticas de `src/client/index.css` em módulos CSS (`themes.css`, `outliner.css`, `clinical-studio.css`).
  - Subdividir `RealBodyAtlas.tsx` e `useAnatomyStore.ts` em slices coesos sem quebrar contratos de estado.

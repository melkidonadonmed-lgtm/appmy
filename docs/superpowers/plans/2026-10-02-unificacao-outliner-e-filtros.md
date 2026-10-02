# Plano de Implementação: Unificação na Sidebar Esquerda e Expansão do Campo de Visão 3D

> **Para operadores e agentes:** REQUISITO: Este plano deve ser executado passo a passo com TDD e validação determinística via terminal (`npm test` e `npm run typecheck`).

**Objetivo:** Eliminar a interferência visual entre as duas barras laterais removendo a sidebar direita, consolidando no painel da esquerda (`AnatomyTreePanel`) as caixas de seleção taxonômicas (checkboxes tri-state), os filtros selecionáveis (sistemas e regiões) e o dossiê clínico compacto, liberando mais de 360px horizontais para o campo de visão 3D.

**Arquitetura:**
- **Remoção da Sidebar Direita**: Desacoplar `<AnatomicalSidebar />` da renderização principal de [App.tsx](file:///c:/Users/melki/dev/app-anatomy/src/client/App.tsx), permitindo que a área central do 3D (`.viewport-center-area`) ocupe 100% da largura restante da tela à direita do outliner.
- **Enriquecimento do Painel Esquerdo**: Integrar no [AnatomyTreePanel.tsx](file:///c:/Users/melki/dev/app-anatomy/src/client/components/ui/tree/AnatomyTreePanel.tsx):
  1. Seletor de filtros por **Sistemas Anatômicos** (chips interativos: *Todos, Ossos, Músculos, Cardio, Nervoso, Respiratório, Digestório, Linfático, Urinário, Endócrino, Reprodutor*).
  2. Seletor de filtros por **Regiões Anatômicas** (*Todo o Esqueleto, Crânio & Face, Coluna, Caixa Torácica, Membros Sup., Pelve, Membros Inf.*).
  3. **Caixas de seleção (Checkboxes Tri-State)** já existentes para ocultar/exibir grupos e estruturas individuais com precisão cirúrgica.
  4. **Dossiê Clínico Compacto**: card colapsável exibido no topo da árvore quando uma peça for selecionada no 3D ou no outliner (nome PT-BR, nome Latim TA2, FMA ID, ações F/I/H/Esc e notas clínicas).
- **Preservação de Desacoplamento e Performance**: Toda mutação continuará sendo orquestrada de forma atômica pelo store [useAnatomyStore.ts](file:///c:/Users/melki/dev/app-anatomy/src/client/stores/useAnatomyStore.ts).

**Tech Stack:** React 19, TypeScript 5.8, Three.js / R3F, Zustand, Tailwind/CSS customizado, Lucide Icons, Vitest.

---

## Restrições Globais e Diretrizes

- **Zero Emojis**: Todo elemento visual deve utilizar estritamente ícones canônicos do Lucide (`Bone`, `Activity`, `HeartPulse`, `Brain`, `Wind`, `Utensils`, `Shield`, `Droplet`, `Zap`, `Dna`, `MapPin`, etc.).
- **Blindagem de Layout**: Seguir a Lei da Linha em Branco (*Blank Line Law*), espaçamentos de respiro e tipografia médica executiva.
- **Anti-Teatro e Qualidade Determinística**: Nenhuma modificação será dada por concluída sem a comprovação factual de execução no terminal com `ExitCode 0` (`npm test`, `npm run typecheck`, `npm run build`).

---

## Revisão e Foco de Validação

1. **Expansão Real do Viewport**: Comprovar que o canvas 3D ocupa toda a largura restante sem barras cinzas ou vazios à direita.
2. **Sincronização Bidirecional dos Filtros**: Clicar em um chip de sistema (ex: "Cardio") deve atualizar `activeSystem` no store, ativar o modelo correspondente no 3D e manter a árvore sincronizada.
3. **Persistência das Caixas de Seleção**: Garantir que as caixas de seleção tri-state continuem funcionando com cálculo de nós descendentes e estados `checked`, `unchecked` e `indeterminate`.
4. **Ficha Clínica sob Demanda**: Selecionar um osso (ex: Osso Frontal) deve exibir a ficha anatômica na barra esquerda sem quebrar o scroll da árvore, permitindo fechar com botão `X` ou tecla `Esc`.
5. **Ergonomia do Modo Foco (Zen Mode - Z)**: O atalho `Z` deve continuar colapsando a barra esquerda para entregar 100% de tela cheia sem quebrar.

---

## Proposta de Alterações

### Componente 1: [AnatomyTreePanel.tsx](file:///c:/Users/melki/dev/app-anatomy/src/client/components/ui/tree/AnatomyTreePanel.tsx)

#### [MODIFY] AnatomyTreePanel.tsx
- Integrar a seção retrátil de **Filtros Selecionáveis** (Sistemas Anatômicos e Regiões) diretamente acima de `ModuleLayersSection`.
- Adicionar o bloco de **Dossiê Clínico Compacto** que se torna visível quando `selectedNode` está presente, contendo:
  - Botão de fechar seleção (`X`).
  - Identificação bilingue (PT-BR + Latim TA2) e FMA ID.
  - Ações rápidas de dissecção: Focar Câmera (`F`), Isolar Peça (`I`), Ocultar Peça (`H`).
  - Resumo de relevância clínica e inserção.
- Conectar diretamente ao `useAnatomyStore` para consumir e alternar `activeSystem`, `activeRegion`, `selectedNodeId`.

---

### Componente 2: [App.tsx](file:///c:/Users/melki/dev/app-anatomy/src/client/App.tsx)

#### [MODIFY] App.tsx
- Remover a importação e o elemento JSX de `<AnatomicalSidebar />`.
- Passar `selectedNode` e `onSelectNode` para `<AnatomyTreePanel />` para que a ficha clínica viva na barra unificada da esquerda.
- O container `.viewport-center-area` passa a estender-se sem restrição até a borda direita da viewport.

---

### Componente 3: [index.css](file:///c:/Users/melki/dev/app-anatomy/src/client/index.css)

#### [MODIFY] index.css
- Adicionar estilização elegante para os chips de filtros de sistemas e regiões (`.outliner-filter-chips`, `.filter-chip`, `.filter-chip.active`).
- Estilizar o card clínico integrado no outliner (`.outliner-clinical-card`) para que se harmonize perfeitamente com a paleta médica *slate-900 / cyan-400*.
- Assegurar que `.atlas-workspace` e `.viewport-center-area` usem 100% da largura sem resíduos da sidebar direita.

---

### Componente 4: Testes de Validação e Isolamento

#### [MODIFY] [tests/pre-delivery-validation.test.ts](file:///c:/Users/melki/dev/app-anatomy/tests/pre-delivery-validation.test.ts)
- Atualizar a verificação da suíte para atestar que o layout opera com uma única sidebar unificada à esquerda, garantindo campo de visão livre à direita e conformidade com zero emojis.
- Validar que a ativação dos filtros de sistema e região na barra esquerda altera o store de forma determinística.

---

## Plano de Verificação Passo a Passo

### 1. Testes Automatizados
```powershell
npm test; if ($LASTEXITCODE -ne 0) { throw "Falha na suíte Vitest" }
npm run typecheck; if ($LASTEXITCODE -ne 0) { throw "Falha na validação de tipos TypeScript" }
npm run build; if ($LASTEXITCODE -ne 0) { throw "Falha no build de produção" }
```

### 2. Validação Manual e Visual
- **Campo de Visão**: Observar o canvas 3D ocupando todo o espaço central e direito da janela.
- **Caixas de Seleção**: Testar o desmarque de grupos inteiros (ex: "Crânio & Face") na árvore esquerda e confirmar que somem do 3D imediatamente.
- **Filtros Selecionáveis**: Clicar nos botões de sistema (*Ossos, Músculos, Cardio, Nervoso*) e de região (*Crânio, Coluna, Tórax*) e validar a transição no modelo 3D.
- **Dossiê Clínico**: Clicar em qualquer osso no modelo 3D; o card deve abrir na barra esquerda com ações de focar, isolar e ocultar.
- **Modo Zen**: Pressionar `Z` no teclado; a barra esquerda recolhe suavemente liberando 100% do monitor; pressionar `Z` novamente para restaurar.

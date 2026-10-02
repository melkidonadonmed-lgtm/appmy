# Arquitetura e Fluxo do Atlas Anatômico 3D Z-Anatomy

arquivo : arquitetura_atlas_z_anatomy_v1.md  
nome: Atlas Anatômico 3D Z-Anatomy - Fluxo de Filtragem Regional e Árvore Arquitetural  
função : Eliminação de artefatos procedurais, isolamento por regiões anatômicas e navegação hierárquica por peças reais  
versão: 1.1.0  
data: 2026-10-02  

============================================================
Pedido original :
"só consigo adicionar 5 mas ta bem bugado, nao da pra ver o que esta selencionando, nao da pra filtrar :ex: equeleto quero só ver o cranho ou alguma /organizador-fluxo-arvore-arquivos"
============================================================

fluxo de organização:
1. [Entrada e Triagem]: O usuário escolhe o Sistema Anatômico e a Região Óssea desejada (ex: Crânio, Coluna, Tórax ou Membros).
2. [Processamento e Isolamento]: O motor 3D oculta instantaneamente os outros 300 ossos, centraliza a câmera na região escolhida com zoom cirúrgico e elimina qualquer duplicata procedural sintética.
3. [Interatividade e Feedback]: O clique em qualquer osso ou órgão acende o brilho emissivo em azul cirúrgico, fixa o Pin 3D com o nome oficial (TA2/Português) e exibe os dados clínicos na Ficha da Sidebar.

saída estruturada :

### 1. Histórico de Implementação / Alterações
- v1.0.0 (2026-10-02): Desacoplamento do antigo crânio procedural isolado e download dos modelos médicos Z-Anatomy (335 ossos reais e sistemas viscerais).
- v1.1.0 (2026-10-02): 
  - Erradicação total do vazamento visual de cenas procedurais (esferas e tubos gigantes no chão).
  - Criação do seletor de Regiões Anatômicas do Esqueleto (Crânio, Coluna C1-L5, Tórax, Membros Superiores, Pelve e Membros Inferiores).
  - Centralização e escala dinâmica adaptativa (o Crânio fica centralizado no meio da tela na altura dos olhos quando selecionado).
  - Integração do modelo muscular real (`muscular_male.glb`, 1.388 músculos), eliminando a tela preta ao selecionar Músculos.
  - Pin 3D de alta definição em dark-glass com texto legível e pulso de foco para indicar com nitidez o que está selecionado.

### 2. Diagrama de Fluxo Visual (Mermaid)

```mermaid
flowchart TD
    A["Início: Atlas 3D (Corpo Real .GLB)"] --> B{"Qual Sistema Selecionado?"}
    
    B -->|Sistema Esquelético| C["Exibir Seletor de Região"]
    B -->|Vísceras (Cardio, Resp, Digest, etc.)| D["Carregar Modelo Médico Real no Mediastino"]
    B -->|Músculos| M["Carregar Modelo Muscular Real (1.388 músculos)"]
    
    C --> E{"Qual Região Escolhida?"}
    E -->|Crânio & Face| F["Isolar 40 Ossos Craniofaciais + Zoom Cefálico Centralizado"]
    E -->|Coluna Vertebral| G["Isolar Vértebras C1-L5 e Sacro + Alinhamento Axial"]
    E -->|Caixa Torácica| H["Isolar Costelas 1-12 e Esterno"]
    E -->|Membros Sup / Inf| I["Isolar Cinturas e Esqueleto Apendicular"]
    E -->|Todo o Esqueleto| J["Exibir os 335 Ossos Articulados em 2 metros"]
    
    F --> K["Exploded View: Slider 0% a 100%"]
    G --> K
    H --> K
    I --> K
    J --> K
    D --> K
    M --> K
    
    K --> L["Clique / Hover no Elemento 3D"]
    L --> N["Destacar Peça em Azul Cirúrgico + Pin 3D Legível + Abrir Ficha Clínica"]
```

### 3. Estrutura e Árvore de Arquivos

```text
app-anatomy/
├── public/
│   ├── draco/gltf/                      # Decodificador Draco WASM offline de alto desempenho
│   └── models/
│       └── anatomy/                     # Malhas médicas autênticas Z-Anatomy / BodyParts3D
│           ├── skeletal_male.glb        # 335 ossos reais desarticulados
│           ├── muscular_male.glb        # 1.388 músculos reais (sem telas pretas)
│           ├── respiratory_male.glb     # Traqueia e pulmões nos sítios torácicos
│           ├── cardiovascular_male.glb  # Coração e rede vascular no mediastino
│           ├── digestive_male.glb       # Trato gastrointestinal e glândulas anexas
│           ├── nervous_male.glb         # Encéfalo e medula espinhal
│           ├── renal_male.glb           # Rins e vias urinárias
│           └── manifest.json            # Catálogo oficial Z-Anatomy com 3.478 estruturas
├── src/
│   ├── client/
│   │   ├── App.tsx                      # Orquestrador do Atlas e gerenciador de activeRegion
│   │   └── components/
│   │       ├── canvas/
│   │       │   ├── RealBodyAtlas.tsx    # Motor 3D do corpo real: filtros regionais e animação
│   │       │   ├── AnatomicalAtlasScene.tsx # Isolador estrito contra artefatos procedurais
│   │       │   └── SceneCanvas.tsx      # Viewport WebGL Three.js, iluminação e câmera
│   │       └── ui/
│   │           ├── AnatomicalSidebar.tsx# Sidebar com botões de região e Ficha Clínica
│   │           └── DissectionToolbar.tsx# Barra de Tomografia Multiplanar (MPR)
│   └── shared/
│       └── constants/
│           ├── zAnatomyCatalog.ts       # 1.584 itens com nomes em PT-BR, TA2 em latim e lookups O(1)
│           └── cranium.ts               # Constantes canônicas do neurocrânio e viscerocrânio
└── tests/
    └── z-anatomy.test.ts                # Suíte de testes unitários de integridade e vetores
```

### 4. Modo de Execução Recomendado (Passo a Passo Prático)
- **Etapa 1**: Abrir o aplicativo no navegador em `http://localhost:3000/`.
- **Etapa 2**: No painel lateral direito, clicar em `💀 Crânio & Face` para que o corpo inteiro suma e a cabeça real fique em evidência centralizada.
- **Etapa 3**: Deslizar a barra de `Vista Explodida (GPU)` para ver os ossos da calvária e face se desarticularem ordenadamente.
- **Etapa 4**: Clicar no Osso Frontal, Mandíbula ou Parietal para inspecionar o Pin flutuante e a correlação clínica.
- **Etapa 5**: Alternar para `🦴 Coluna (C1-L5)` ou `🫁 Caixa Torácica` para inspecionar outras regiões isoladas.

### 5. Sugestões Opcionais (Sem alterar escopo original)
- **Sugestão 1**: Adicionar animação de foco de câmera suave (`camera.lookAt` interpolado) ao clicar duas vezes em um osso isolado.
- **Sugestão 2**: Permitir corte tomográfico MPR simultâneo fatiando tanto os ossos quanto as vísceras com planos axiais, sagitais e coronais.

### 6. Opção de Exportação (Arquivo Único / PDF)
> 💡 *Para evitar quebras de diagramas Mermaid, formatação de tabelas ou caracteres especiais ao copiar e colar:*
- **Arquivo Único Markdown (.md)**: Salvo em `.context/arquitetura_atlas_z_anatomy_v1.md`.
- **Documento PDF Formatado (.pdf)**: Disponível para compilação diagramada quando solicitado pelo usuário.

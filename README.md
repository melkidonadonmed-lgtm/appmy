# 🧬 Atlas 3D de Anatomia Médica (Z-Anatomy & BodyParts3D)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Vitest-88%20passed-brightgreen.svg)](https://vitest.dev/)
[![Google Cloud Run](https://img.shields.io/badge/Google%20Cloud-Run-4285f4.svg)](https://cloud.google.com/run)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

Plataforma médica e educacional em 3D de alta fidelidade para estudo e dissecação virtual do **corpo humano completo**, baseada nas malhas escaneadas em alta resolução do projeto aberto **Z-Anatomy** e **BodyParts3D / DBCLS**, com **Exploded View** (visão explodida desarticulando peças reais no espaço 3D), **Dissecção Tomográfica Multiplanar (MPR)** e navegação taxonômica pela **Terminologia Anatomica internacional (TA2)**.

---

## 🌟 Funcionalidades Principais

### 1. Esqueleto Humano Completo (335 Ossos Reais Desarticulados)
- **Crânio e Viscerocrânio**: 40 ossos individuais (Frontal, Parietais D/E, Occipital, Temporais, Esfenoide, Etmoide, Mandíbula, Maxilas, Zigomáticos, Nasais, Lacrimais, Palatinos e Vômer).
- **Coluna Vertebral**: C1 (Atlas) a C7 (Proeminente), T1 a T12, L1 a L5, Osso Sacro e Cóccix.
- **Caixa Torácica**: Esterno completo (Manúbrio, Corpo e Processo Xifoide), Costelas 1 a 12 bilaterais e cartilagens costais.
- **Cíngulo e Membros Superiores**: Clavículas, Escápulas, Úmeros, Rádios, Ulnas, Ossos do Carpo, Metacarpos e Falanges.
- **Cíngulo Pélvico e Membros Inferiores**: Ílios, Ísquios, Púbis, Fêmures, Patelas, Tíbias, Fíbulas, Tarsos, Metatarsos e Falanges.

### 2. Filtragem e Isolamento por Regiões Anatômicas
- 💀 **Crânio & Face**: Isola os 40 ossos cranianos e centraliza o crânio no meio do viewport com zoom cirúrgico na altura dos olhos.
- 🦴 **Coluna Vertebral**: Foco nas vértebras cervicais, torácicas, lombares e sacro com descompactação axial.
- 🫁 **Caixa Torácica**: Foco nas costelas e esterno com abertura em leque.
- 💪 **Membros Superiores**: Ombro, braço, antebraço e mão.
- 🩻 **Pelve & Quadril**: Cintura pélvica e sacro.
- 🦵 **Membros Inferiores**: Fêmur, joelho, perna e pé.
- 🧍 **Todo o Esqueleto**: Arcabouço corporal completo de 2 metros articulado.

### 3. Exploded View Tridimensional em GPU (60 FPS)
- Desarticulação vetorial precisa no espaço 3D via Three.js `useFrame` com interpolação `MathUtils.lerp`.
- A calvária abre radialmente para cima e para fora, a mandíbula desce, a coluna vertebral expande o espaçamento intervertebral (revelando facetas e forames), a caixa torácica abre em leque e os membros se afastam lateralmente.

### 4. Sistemas Viscerais e Musculares Reais Co-localizados
- **Sistema Muscular** (`muscular_male.glb`): 1.388 músculos legítimos sobrepostos ao esqueleto.
- **Sistema Respiratório** (`respiratory_male.glb`): Traqueia, brônquios e pulmões com lobos no tórax.
- **Sistema Cardiovascular** (`cardiovascular_male.glb`): Coração e árvore arterial/venosa no mediastino.
- **Sistema Digestório** (`digestive_male.glb`): Esôfago, estômago, fígado, pâncreas e intestinos.
- **Sistema Nervoso** (`nervous_male.glb`): Encéfalo com hemisférios, cerebelo e medula espinhal.
- **Sistema Urinário** (`renal_male.glb`): Rins bilaterais e vias urinárias no retroperitônio.

### 5. Dissecção Tomográfica Multiplanar (MPR)
- Ferramenta cirúrgica flutuante para fatiar o corpo humano em tempo real nos três planos ortogonais fundamentais:
  - **Sagital** (Plano Mediano D/E)
  - **Coronal** (Plano Frontal Anterior/Posterior)
  - **Axial** (Plano Transversal Superior/Inferior)
- Modos visuais: **Sólido PBR**, **Raio-X (X-Ray translúcido)** e **Corte Tomográfico**.

### 6. Catálogo Taxonômico Canônico e Pins 3D
- 1.584 itens mapeados em [`zAnatomyCatalog.ts`](file:///src/shared/constants/zAnatomyCatalog.ts) com lookups $O(1)$.
- Etiquetas 3D flutuantes com Terminologia Anatomica oficial (TA2 em latim) e nomes em Português do Brasil.
- Ficha Clínica na barra lateral com origem, inserção e importância cirúrgica/semiológica.

---

## 🏗️ Arquitetura do Sistema

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          APLICAÇÃO FULLSTACK                           │
├────────────────────────────────────────────────────────────────────────┤
│  FRONTEND (React 19 + Three.js + React Three Fiber + Drei)            │
│  ├── Canvas 3D (WebGLRenderer + Draco Loader Local Offline)            │
│  ├── RealBodyAtlas.tsx (335 ossos, vísceras, músculos e exploded view) │
│  ├── DissectionToolbar.tsx (Controle MPR multiplanar)                  │
│  ├── AnatomicalSidebar.tsx (Filtros regionais e Ficha Clínica)         │
│  └── TelemetryOverlay.tsx (Monitor em tempo real de FPS e draw calls)  │
├────────────────────────────────────────────────────────────────────────┤
│  BACKEND (Node.js + Express + TypeScript)                              │
│  ├── Healthcheck Sondas (/api/health e /healthz)                       │
│  ├── Rewrites e Proxy via Firebase Hosting CDN                         │
│  └── Container Docker Multi-stage para Google Cloud Run                │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Diretórios

```text
app-anatomy/
├── public/
│   ├── draco/gltf/                      # Decodificador Draco WASM offline de alto desempenho
│   └── models/
│       └── anatomy/                     # Malhas médicas autênticas Z-Anatomy / BodyParts3D
│           ├── skeletal_male.glb        # 335 ossos reais desarticulados
│           ├── muscular_male.glb        # 1.388 músculos reais
│           ├── respiratory_male.glb     # Traqueia e pulmões
│           ├── cardiovascular_male.glb  # Coração e rede vascular
│           ├── digestive_male.glb       # Trato gastrointestinal e glândulas
│           ├── nervous_male.glb         # Encéfalo e medula espinhal
│           ├── renal_male.glb           # Rins e vias urinárias
│           ├── articular_male.glb       # Ligamentos e cápsulas articulares
│           └── manifest.json            # Catálogo oficial com 3.478 estruturas
├── src/
│   ├── client/
│   │   ├── components/
│   │   │   ├── canvas/
│   │   │   │   ├── RealBodyAtlas.tsx    # Motor 3D do corpo real: filtros e exploded view
│   │   │   │   ├── AnatomicalAtlasScene.tsx # Isolador de cena estrito contra procedurais
│   │   │   │   ├── SceneCanvas.tsx      # Viewport WebGL Three.js, iluminação e câmera
│   │   │   │   └── DissectionController.tsx # Shaders e planos de corte tomográfico MPR
│   │   │   └── ui/
│   │   │       ├── AnatomicalSidebar.tsx# Sidebar com seleção de regiões e Ficha Clínica
│   │   │       └── DissectionToolbar.tsx# Barra clínica de dissecção MPR
│   │   ├── App.tsx                      # Orquestrador global e estados reativos
│   │   └── index.css                    # Design system médico com tema escuro e responsivo
│   ├── server/                          # Backend Express e sondas de saúde
│   └── shared/
│       ├── constants/
│       │   ├── zAnatomyCatalog.ts       # 1.584 itens com nomes em PT-BR, TA2 e lookups O(1)
│       │   └── cranium.ts               # Constantes canônicas cranianas
│       └── types/
│           ├── anatomy.ts               # Contratos tipados de nós e sistemas anatômicos
│           └── dissection.ts            # Tipos de dissecção MPR e planos de corte
├── scripts/
│   └── build_z_anatomy_catalog.py       # Pipeline gerador do catálogo tipado TypeScript
└── tests/
    ├── z-anatomy.test.ts                # Testes de integridade taxonômica e vetores de explosão
    └── *.test.ts                        # 16 suítes com 88 testes unitários no Vitest
```

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- Node.js 20+ (recomendado Node.js 22)
- PowerShell 7 (`pwsh`) no Windows ou Bash no Linux/macOS

### 2. Instalação de Dependências
```powershell
npm install
```

### 3. Modo de Desenvolvimento (Hot-Reload)
Inicia o backend Express na porta `8080` e o frontend Vite na porta `3000`:
```powershell
npm run dev
```

Acesse no navegador:
- **Atlas 3D Interativo**: `http://localhost:3000`
- **Healthcheck da API**: `http://localhost:8080/api/health`

### 4. Execução de Testes e Checagem Estrita de Tipos
```powershell
# Checagem rigorosa de tipos TypeScript (Cliente + Servidor)
npm run typecheck

# Execução da suíte completa de testes unitários (88 testes em 16 suítes)
npm test
```

### 5. Compilação de Produção
```powershell
npm run build
npm start
```

---

## ☁️ Deploy no Google Cloud Run

O projeto possui container Docker multi-stage otimizado para a porta dinâmica `$PORT` do Cloud Run.

### Deploy Direto via gcloud CLI
```powershell
gcloud run deploy appmy `
    --source . `
    --project agent-md-506215 `
    --region us-central1 `
    --platform managed `
    --allow-unauthenticated `
    --port 8080
```

---

## 📄 Licença e Créditos

- **Código da Aplicação**: MIT License.
- **Malhas Anatômicas 3D**: Derivadas do projeto [Z-Anatomy](https://www.z-anatomy.com/) sob licença **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**, originadas do [BodyParts3D](http://lifesciencedb.jp/bp3d/) / DBCLS (CC BY-SA 2.1 JP). Consulte os arquivos `public/models/anatomy/LICENSE` e `NOTICE`.
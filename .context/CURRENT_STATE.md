# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Fase 7 Concluída (Órgãos dos Sentidos & Tegumento Comum - Capítulos 13 e 14) -> Rumo ao Fechamento do Atlas Clínico Integral

---

## 1. Decisões Arquiteturais Consolidadas (Fases 1 a 7)

- **Catálogo de Órgãos dos Sentidos (Capítulo 13 - Terminologia Anatomica e FMA)**:
  - Aparelho Visual: Bulbos Oculares D/E (`FMA:58296`, `FMA:58297`), Córnea (`FMA:58238`), Cristalino biconvexo (`FMA:58241`), Retina interna (`FMA:58243`), Nervos Ópticos e Quiasma Óptico (`FMA:50862`) e Músculos Extraoculares da Órbita (`FMA:49035`).
  - Aparelho Vestibulococlear: Cadeia Ossicular da Orelha Média (`FMA:52748` - martelo, bigorna e estribo com relação à otosclerose), Labirinto Ósseo da Orelha Interna (`FMA:60907` - cóclea espiralada e canais semicirculares ortogonais para tonotopia e VPPB) e Nervo Vestibulococlear NC VIII (`FMA:50868`).
- **Catálogo do Tegumento Comum (Capítulo 14 - Terminologia Anatomica e FMA)**:
  - Epiderme e Derme Crânio-Facial (`FMA:7163` - inervação trigeminal V1, V2, V3 e linhas de Langer), Gálea Aponeurótica (`FMA:46554` - acrônimo cirúrgico SCALP e área perigosa da cabeça), Pele Nasal e Periorbital (`FMA:70544`) e Tecido Subcutâneo com coxins de Bichat e SMAS (`FMA:9630`).
  - Integração com o controle de dissecção por `layerPeelingLevel` (Nível 0: Esqueleto, Nível 1: Músc. Profundos, Nível 2: Músc. Superficiais, Nível 3: Pele e Fáscias).
- **Crânio Real (.GLB) Unificado com Estruturas Anatômicas In Situ**:
  - Integração topográfica do modelo escaneado fotorealista de alta densidade (`cranium.glb` com ~188k polígonos) com as 108 estruturas dos 13 sistemas anatômicos (órgãos dos sentidos nas órbitas, encéfalo na fossa craniana, vasos carotídeos, vias aéreas e músculos).
  - Três modos de densidade óssea na interface: `🦴 Sólido (100%)`, `✨ Translúcido (35%)` e `👁️ Oculto (0%)`.
  - Dissecção Tomográfica Multiplanar (MPR) em tempo real: o plano de secção (sagital, coronal e axial) corta simultaneamente o crânio escaneado real e as estruturas viscerais/sensoriais internas via GPU clipping.
  - Taxa de quadros estável em 60 FPS com 441k polígonos e VRAM < 200 MB no Chrome DevTools.
  - 83 testes unitários aprovados em 15 suítes no Vitest com exit code 0.

---

## 2. Servidores em Execução Ativa

- **Frontend (Vite)**: `http://localhost:3000/` (HMR ativo na porta 3000)
- **Backend (Express)**: `http://localhost:8080/` (endpoints `/api/health` e `/api/cranium-bones`)

---

## 3. Próximo Ponto de Entrada (Fase 8: Módulos de Ensino Clínico & Casos Radiológicos)

- **Fase 8: Casos Clínicos Interativos, Quiz Anatômico & Correlação Radiológica**:
  - Desafios clínicos com perguntas e identificação direta no modelo 3D (real ou explodido).
  - Correlação com imagens tomográficas / RM reais ao lado da lâmina MPR 3D.
  - Exportação de fichas e relatórios clínicos de dissecção para PDF médico profissional.


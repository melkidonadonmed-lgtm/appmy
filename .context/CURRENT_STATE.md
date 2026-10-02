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
- **Total de Estruturas e Telemetria WebGL**:
  - Total de **108 estruturas anatômicas canônicas** unificadas sob ontologia FMA e Terminologia Anatomica internacional.
  - Suporte completo aos 13 sistemas anatômicos canônicos.
  - Taxa de quadros fixa a 60 FPS com VRAM < 200 MB no Chrome DevTools.
  - 83 testes unitários aprovados em 15 suítes no Vitest com exit code 0 em ~800ms.
  - Modularização dinâmica com 10 chunks assíncronos no Vite com `React.lazy` e `<Suspense>`.

---

## 2. Servidores em Execução Ativa

- **Frontend (Vite)**: `http://localhost:3000/` (HMR ativo na porta 3000)
- **Backend (Express)**: `http://localhost:8080/` (endpoints `/api/health` e `/api/cranium-bones`)

---

## 3. Próximo Ponto de Entrada (Fase 8: Modos de Ensino Clínico & Casos Radiológicos)

- **Fase 8: Quiz Interativo de Identificação Anatômica & Simulações Clínico-Cirúrgicas**:
  - Modo Quiz / Avaliação Médica: estruturação de casos clínicos com identificação em tempo real no grafo 3D.
  - Exportação de dados e relatórios de dissecção para PDF médico profissional.
- **Commit Git**: Criar commit atômico consolidando a Fase 7.

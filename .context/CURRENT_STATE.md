# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Fase 6 Concluída (Dissecção Tomográfica Multiplanar MPR, Shaders Cirúrgicos & Code-Splitting)

---

## 1. Decisões Arquiteturais Consolidadas (Fases 1 a 6)

- **Ferramenta de Dissecção Tomográfica Multiplanar (MPR - Multi-Planar Reconstruction)**:
  - Planos ortogonais anatômicos suportados: Sagital (Eixo X), Coronal (Eixo Z) e Axial/Transversal (Eixo Y).
  - Suporte a `localClippingEnabled` e `clippingPlanes` globais no WebGLRenderer do Three.js, permitindo o descarte limpo de fragmentos (*fragment discard*) de todas as 94 estruturas simultaneamente sem overhead de CPU.
  - Controle dinâmico de profundidade de corte (-2.2 cm a +2.2 cm) com calibração milimétrica.
  - Inversão paramétrica do vetor normal para corte da hemissecção oposta.
  - Lâmina visual 3D (*DissectionPlaneHelper*) com contorno e grade milimétrica sutil no espaço de coordenadas do corte.
  - Mapeamento em tempo real para marcos anatômicos canônicos da Terminologia Anatomica (ex: Plano Sagital Mediano, Plano Coronal Biauricular/Retroperitoneal, Plano Axial de Ludwig T4-T5, Plano Transpilórico de Addison L1).
- **Modos de Renderização Cirúrgica**:
  - Modo Sólido: PBR canônico com opacidade anatômica completa.
  - Modo Raio-X / Translucência Cirúrgica: Atenuação controlada da opacidade (0.22) dos tecidos ósseos e musculares para inspeção profunda de trajetos vasculonervosos e retroperitônio.
  - Modo Corte MPR: Ativação dos planos de corte e guia de dissecção virtual.
- **Code-Splitting Dinâmico e Otimização WebGL**:
  - Modularização assíncrona via `React.lazy` e `<Suspense>` para os 8 módulos de cenas viscerais (`CardiovascularScene`, `NeurologyScene`, `RespiratoryScene`, `DigestiveScene`, `LymphaticScene`, `UrinaryScene`, `EndocrineScene`, `ReproductiveScene`), gerando chunks de vendor separados e eliminando o custo de parsing inicial.
  - 73 testes unitários aprovados no Vitest em ~730ms com 100% de cobertura determinística nas equações de plano, descarte de pontos 3D e marcos clínicos.
  - Taxa de quadros mantida cravada em 60 FPS com VRAM < 200 MB no Chrome DevTools.

---

## 2. Servidores em Execução Ativa

- **Frontend (Vite)**: `http://localhost:3000/` (HMR ativo na porta 3000)
- **Backend (Express)**: `http://localhost:8080/` (endpoints `/api/health` e `/api/cranium-bones`)

---

## 3. Próximo Ponto de Entrada (Fase 7)

- **Fase 7: Órgãos dos Sentidos & Tegumento Comum (Capítulos 13 e 14 da Terminologia Anatomica)**:
  - Aparelho Visual (Cap. 13): Bulbo ocular, córnea, cristalino, retina, nervo óptico (NC II) e músculos extraoculares.
  - Aparelho Vestibulococlear (Cap. 13): Orelha externa, orelha média (martelo, bigorna, estribo) e orelha interna (cóclea e canais semicirculares).
  - Tegumento Comum (Cap. 14): Epiderme, derme e fáscias de revestimento.
- **Commit Git**: Registrar as entregas das Fases 4, 5 e 6 no repositório remoto.

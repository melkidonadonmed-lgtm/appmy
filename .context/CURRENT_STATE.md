# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Filtragem Regional de Esqueleto Concluída (Crânio, Coluna, Tórax, Membros, Pelve) e Erradicação de Fantasmas Procedurais

---

## 1. Decisões Arquiteturais Consolidadas

- **Erradicação Total dos Fantasmas Procedurais**:
  - Ajustada a condição booleana de montagem em `AnatomicalAtlasScene.tsx`: quando `viewType === 'realistic'`, todas as cenas sintéticas legadas (`CardiovascularScene`, `RespiratoryScene`, `DigestiveScene`, `NeurologyScene`) são 100% omitidas, eliminando as esferas e tubos gigantes que vazavam no chão nas capturas do usuário.
- **Filtragem por Regiões Anatômicas do Esqueleto (`activeRegion`)**:
  - Implementado seletor regional no motor 3D (`RealBodyAtlas.tsx`) e na barra lateral (`AnatomicalSidebar.tsx`):
    - `cranium`: Isola os 40 ossos craniofaciais e centraliza o crânio no meio do viewport com zoom cirúrgico na altura dos olhos.
    - `spine`: Isola as vértebras cervicais, torácicas, lombares e sacro.
    - `thorax`: Isola as costelas e esterno.
    - `upper_limb`: Isola cintura escapular e membros superiores.
    - `pelvis`: Isola os ossos do quadril e sacro.
    - `lower_limb`: Isola fêmur, tíbia, fíbula e pés.
    - `all`: Exibe o esqueleto humano completo de 335 ossos.
- **Suporte ao Sistema Muscular Real Z-Anatomy**:
  - Integrado `public/models/anatomy/muscular_male.glb` (1.388 músculos reais) no `RealBodyAtlas.tsx`, eliminando a tela preta ao selecionar Músculos.
- **Destaque Visual Aprimorado e Pin 3D**:
  - As peças selecionadas ganham brilho emissivo ciano e Pin 3D flutuante de alto contraste com nome em Português e Terminologia Anatomica oficial (TA2 em latim).
- **Documentação de Arquitetura Salva**:
  - Gerado `.context/arquitetura_atlas_z_anatomy_v1.md` seguindo a skill canônica `organizador-fluxo-arvore-arquivos`.
- **Quality Gate Validado**:
  - 88 testes unitários aprovados em 16 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` compilado com sucesso em 5.58s (`ExitCode 0`).
  - `workspace_index.json` reindexado com 113 arquivos mapeados.

---

## 2. Servidores em Execução Ativa

- **Frontend (Vite)**: `http://localhost:3000/` (Porta 3000 ativa e operando, status 200)
- **Backend (Express)**: `http://localhost:8080/` (Healthcheck `/api/health`, status 200)

---

## 3. Próximo Ponto de Entrada

- **Interpolação de Câmera (Smooth OrbitControls Target)**:
  - Animar o foco de câmera para centralizar suavemente no osso clicado.

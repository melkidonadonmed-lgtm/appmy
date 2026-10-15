# Contexto Arquitetural & Estado Operacional (`CONTEXT.md`)

Este arquivo consolida o ponto de entrada canônico de contexto na raiz do repositório `appmy` e referencia a Hierarquia de Persistência de 4 Níveis:

- **Nível 2 (Estado Atual do Projeto)**: [`.context/CURRENT_STATE.md`](file:///C:/Users/melki/dev/repos/appmy/.context/CURRENT_STATE.md)
- **Nível 3 (Log Delta de Sessão)**: [`.context/SESSION_LOG.md`](file:///C:/Users/melki/dev/repos/appmy/.context/SESSION_LOG.md)
- **Arquitetura Z-Anatomy v1**: [`.context/arquitetura_atlas_z_anatomy_v1.md`](file:///C:/Users/melki/dev/repos/appmy/.context/arquitetura_atlas_z_anatomy_v1.md)
- **Design System Tátil & 5 Temas Minerais**: [`DESIGN.md`](file:///C:/Users/melki/dev/repos/appmy/DESIGN.md)
- **Especificação Funcional & Invariantes 3D**: [`SPEC.md`](file:///C:/Users/melki/dev/repos/appmy/SPEC.md)
- **Relatório de Análise e Refatoração Tátil Frontend**: [`.context/RELATORIO_ANALISE_FRONTEND.md`](file:///C:/Users/melki/dev/repos/appmy/.context/RELATORIO_ANALISE_FRONTEND.md)

---

## Resumo Executivo do Estado Atual

1. **Domínio**: Atlas 3D educacional do corpo humano baseado no catálogo Z-Anatomy / BodyParts3D (CC BY-SA 4.0) com 335 ossos reais desarticulados, sistemas viscerais/musculares `.glb`, sincronização de sexo biológico (`male` / `female`), Exploded View Homolateral contínua, Dissecção Tomográfica Multiplanar (MPR) e Estúdio Neuroclínico Integrado.
2. **Qualidade de Código, Física 3D e Testes**:
   - **AST 3D Physics Audit (`code-quality-audit-3d-physics`)**: `100.0/100` (`0 ALLOC_IN_LOOP`, `0 UNCHECKED_NORMALIZE`, `0 STRICT_FLOAT_COMPARE`, `0 HARDCODED_MAGIC_NUMBER`, `0 any`).
   - **Auditoria de Sistema (`auditoria-projetos-sistema`)**: `100.0/100` (Raiz higienizada, zero arquivos duplicados ou código órfão, contratos UI `Topologia 3+1` validados).
   - **Test Quality Audit (`test-quality-auditor`)**: `100.0/100` (Nível 4 — **234 testes passando em 32 suítes Vitest**).
   - **Build & Typecheck**: `npm run typecheck` (`ExitCode 0`) e `npm run build` (`ExitCode 0`).

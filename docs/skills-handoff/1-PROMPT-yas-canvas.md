# yas-canvas: adicionar /founder-canvas e distribuição para qualquer IA

Repositório: github.com/yvesas/yas-canvas. Siga as convenções do próprio repo (CLAUDE.md, CONTRIBUTING.md, specs/codebase/WRITING-SKILLS.md, ADRs em docs/adr). Abra uma spec em `specs/features/00XX-founder-canvas/` (spec, design, tasks) antes de codar, e me mostre a spec para aprovar.

Material de origem: a pasta `material-founder-canvas/` (SKILL.md + references) ao lado deste arquivo. É o conteúdo aprovado; a tarefa é **adaptar ao formato do pack**, não reescrever o método.

## Parte A — Nova skill `/founder-canvas`

**Objetivo:** conduzir um fundador de produto early stage até uma base clara: momento do produto, porquê do founder, problema e dores, público (usuário, cliente, pagador, decisor), Jobs to be Done, proposta de valor e pitch, Lean Canvas, experiência (momento aha e wow), product-led growth, North Star e experimentos.

Requisitos:

1. **Independente.** Roda sozinha, do começo ao fim, sem depender de nenhuma outra skill do pack. **Não cita outras skills** (nem /pm-review, nem /ceo-review, nem /cto-canvas) no texto. As fases de problema (2), público (3) e métricas (9) são próprias dela, mesmo que se pareçam com partes de outras revisões.
2. **Formato do pack:** frontmatter com `name: founder-canvas`, `shared: [preamble, session-protocol]` (só o que ela realmente usa), `parts:` com as 10 fases (ids curtos em inglês, como nas outras: ex. `context-and-stage`, `founder-why`, `problem-and-pains`, `audience-and-roles`, `jobs-and-alternatives`, `value-proposition`, `lean-canvas`, `aha-and-wow`, `growth-model`, `north-star-and-experiments`), `description`, `allowed-tools`, `triggers` (ex.: "proposta de valor", "lean canvas", "público-alvo", "pitch", "momento aha", "product-led growth", "me ajuda a pensar meu produto").
3. **Portão de estágio primeiro**, no mesmo padrão do /cto-canvas: ideia · protótipo sem clientes · primeiros clientes · primeira receita. O estágio muda a profundidade de cada fase.
4. **Ritmo do pack:** uma pergunta por vez, até aparecer nome próprio, número ou caso real. Aceitar respostas longas e ditadas por áudio (transcrição com erros: interpretar pelo contexto e confirmar nomes próprios).
5. **Frases do produto na voz do fundador:** proposta de valor, conceito de alto nível e pitch são propostos em 2–3 versões e ajustados até o fundador validar.
6. **Fato × hipótese:** tudo que não foi comprovado com cliente é marcado como hipótese, com a forma de testar. Nunca inventar números, nomes de clientes ou resultados.
7. **Saída:** cada parte grava um arquivo em `specs/canvas/founder-canvas/` (formato de parte do ADR 0004) usando os modelos de `material-founder-canvas/references/modelos.md`. No fechamento, um resumo de uma página.
8. **References próprias** em `skills/founder-canvas/references/` (perguntas, conceitos, modelos), adaptadas do material.
9. **Roteador `/canvas`:** passa a reconhecer pedidos de produto/proposta de valor e mandar para `/founder-canvas`. (O roteador pode conhecer todas as skills; a independência vale para o founder-canvas.)
10. **Testes:** pelo menos 4 cenários em `test/fixtures/`, no padrão da bancada (prompt, rubrica, expect):
    - fundador que só fala da solução e não descreve o problema;
    - público amplo demais ("pequenas empresas");
    - PLG escolhido por moda, com aha que exige reunião;
    - fundador que dá números sem fonte (a skill deve marcar como hipótese e perguntar a origem).

## Parte B — Usar em qualquer IA, não só no Claude

As skills usam recursos do Claude Code (`allowed-tools`, `AskUserQuestion`, cópia de `shared/` pelo instalador). Criar uma etapa de build que gera, para **cada skill**, dois artefatos em `dist/`:

1. **`dist/<skill>/` e `dist/<skill>.zip` — pasta de skill completa**, no formato Agent Skills (SKILL.md + references), **com os arquivos de `shared/` já dentro**. Serve para: app do Claude (enviar o zip), Claude Code, e ferramentas que leem SKILL.md/AGENTS.md (Codex, Cursor e outras — verificar a documentação atual de cada uma e registrar no README o que foi confirmado).
2. **`dist/<skill>.md` — arquivo único, versão portátil.** Junta SKILL.md + shared + references num só markdown, sem frontmatter específico do Claude, com um cabeçalho curto de uso. Instruções dependentes de ferramenta viram texto neutro (ex.: "use AskUserQuestion" → "pergunte e espere a resposta"; "grave em specs/canvas/" → "ao fim de cada parte, entregue o documento da parte em markdown para o usuário salvar"). Serve para colar como instruções de projeto/GPT personalizado/Gem no ChatGPT, Gemini e similares.

Requisitos do build:
- Comando `npm run build` (ou `bin/build`), determinístico, que roda a validação existente (`npm run check`) antes.
- Teste que garante: nenhum `dist/<skill>.md` contém nomes de ferramentas do Claude Code nem caminhos de `shared/` sem conteúdo.
- `dist/` fora do git; os artefatos vão para **GitHub Releases** (ver Parte C).

## Parte C — Versões e releases

- Corrigir o `package.json`: a descrição cita "canvas de Tech Lead", que ainda não existe.
- Adotar versionamento semântico, `CHANGELOG.md` e tag por versão. Primeira release com o founder-canvas: `v0.2.0`.
- GitHub Action que, ao criar uma tag `v*`, roda check + build e anexa à release: um zip por skill, um `.md` portátil por skill e um zip do pack completo.
- README: nova seção **"Como usar"** com três caminhos:
  1. **App do Claude:** baixar o zip da skill e enviar nas configurações de skills.
  2. **Claude Code:** `bin/install` (como hoje).
  3. **Outra IA (ChatGPT, Gemini, Cursor, Codex…):** baixar o `.md` portátil e colar como instruções do projeto, ou usar a pasta da skill onde a ferramenta suporta SKILL.md/AGENTS.md.
- README: adicionar `/founder-canvas` à tabela e um bloco **"Quando usar cada uma"**, na ordem do amadurecimento do produto: founder-canvas (ideia/protótipo) → pm-review → ceo-review → cto-canvas → eng/security/ux-review; `/canvas` em qualquer ponto.

## Conferir no fim
- `npm test` passa, incluindo os novos cenários.
- `bin/install --check` mostra o founder-canvas com os shared certos.
- Uma release de teste (tag `v0.2.0-rc.1`) gera os anexos esperados.

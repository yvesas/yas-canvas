# yas-canvas

Skills de **método** para liderança técnica: roles que revisam um plano no papel
de quem lidera (engenharia, CEO, produto, UX, design) e os canvas que estruturam
um fundador técnico ou um tech lead.

Elas **propõem**. Quem **enforça** — hook, permissão, regra de commit — é o
baseline de convenções que vive dentro de cada repositório. Duas coisas
diferentes: regra viaja com o código, método viaja com a pessoa.

## Instalar

```bash
bin/install            # em ~/.claude/skills (o padrão)
bin/install --check    # ver o que mudaria
bin/install --project ../algum-repo
```

Abra uma sessão nova do Claude Code depois de instalar.

## O que existe hoje

| Skill | O que faz |
|---|---|
| `/canvas` | roteador: manda o pedido para a role certa |
| `/eng-review` | revisão de engenharia de um plano, design doc ou diff |

No roadmap, nesta ordem: `ceo-review`, `pm-review`, `ux-review`,
`design-review`, `cto-canvas`, `techlead-canvas`. Ver
`specs/project/ROADMAP.md`.

## Desenvolver

```bash
npm run check            # validação estática das skills (Node puro, <1s)
npm test                 # a validação + a suíte (evals pulam sem YAS_EVAL=1)
YAS_EVAL=1 npm run eval  # evals: sessão real pontuada por modelo juiz
```

A validação estática é o gate barato: frontmatter, nome de pasta, preâmbulo
lido e não colado, roteador apontando só para skill que existe, teto de linhas,
fixture de eval bem formada. O que ela não alcança — se a skill conduz bem a
conversa — é trabalho de eval.

`bun test` **não** roda esta suíte: ele ignora `node:test` e sai verde sem ter
rodado nada. Ver `specs/codebase/TESTING.md`.

O produto é markdown. O único código aqui é a bancada de teste.

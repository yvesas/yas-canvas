# Contribuir

O produto é markdown: uma skill é um arquivo, e o único código aqui é a bancada
que prova que ela funciona. Quem só quer **usar** as skills não precisa deste
arquivo — o caminho é [docs/getting-started.md](docs/getting-started.md).

## A bancada

```bash
npm run check                          # validação estática, Node puro, <1s
npm test                               # a validação + os testes de nó
YAS_EVAL=1 YAS_EVAL_ONLY=<fixture> npm run eval   # um comportamento, minutos
YAS_EVAL=1 npm run eval:changed        # o que o diff alcança
YAS_EVAL=1 npm run eval                # a suíte inteira, ~40 min
```

**`bun test` não roda esta suíte.** Ele ignora `node:test`, sai verde sem ter
rodado nada, e é o erro mais caro que dá para cometer aqui — ver
[`specs/codebase/TESTING.md`](specs/codebase/TESTING.md).

**A validação estática é o gate barato**: frontmatter, nome de pasta batendo com
o nome da skill, compartilhado lido e não colado, roteador apontando só para
skill que existe, teto de linhas, fixture bem formada, e a guarda que impede o
pack de citar ferramenta que só existe no repositório do autor. O que ela não
alcança — se a skill conduz bem a conversa — é trabalho de eval.

**Os evals são sessões reais pontuadas por um modelo juiz**, em duas camadas:
critérios determinísticos (o que a sessão gravou, que ferramentas chamou) e
critérios de julgamento. Por isso custam minutos, e por isso **a suíte completa
não roda a cada mudança**: mede-se linha a linha, e a dívida de medição fica
registrada em [`specs/project/VERIFICATION.md`](specs/project/VERIFICATION.md) —
não na cabeça de ninguém.

## Ao mexer numa skill

**Leia [`specs/codebase/WRITING-SKILLS.md`](specs/codebase/WRITING-SKILLS.md)
antes.** Ele tem as regras e o que cada uma custou para ser descoberta,
inclusive os três casos em que uma regra nova atropelou outra que já estava
certa. O resumo:

- **Comece pelo portão.** A primeira chamada de ferramenta é a pergunta de
  escopo, marcada como parada dura.
- **Leia o compartilhado, nunca cole.** O `check` falha nos dois casos: skill
  sem o arquivo e skill com trecho colado dele.
- **Uma parte por vez, com teto de oito.** O teto é o que força a escolha.
- **Alternativas são obrigatórias** — mínima viável e ideal, com esforço e
  risco.
- **A sessão termina em arquivo**, com citação literal e **uma** tarefa.
- **Teto de 400 linhas.** Skill que ninguém lê inteira não é seguida inteira.
- **Rode uma sessão de verdade antes de escrever a rubrica.** Rubrica escrita
  sobre o comportamento imaginado mede a sua imaginação.

**Conserta-se o texto, não a fixture.** Quando a fixture *é* mesmo o problema,
isso vai escrito no commit — é a exceção que corrói a regra.

## Estrutura

| Caminho | O que é |
|---|---|
| `skills/<nome>/SKILL.md` | uma skill; a pasta dá o nome, e o frontmatter tem que bater |
| `shared/` | preâmbulo, protocolo de sessão, protocolo de revisão, handoff |
| `scripts/check.mjs` | o gate barato; as frases-âncora de cada compartilhado moram aqui |
| `test/` | evals e fixtures |
| `bin/install` | copia as skills para o usuário, ou para um projeto com `--project` |
| `docs/adr/` | as decisões estruturais, uma por arquivo |
| `specs/` | o plano: visão, roadmap, estado, features |

Cada skill **declara** no frontmatter o que precisa (`shared: [preamble,
review-protocol]`) e o instalador copia só isso.

## Idioma

**Prosa em português** — o diferencial do pack é ser brasileiro (LGPD, jurídico,
o jeito de perguntar). **Nome de arquivo, de pasta e de skill em inglês.**

## Pull requests

- Branch a partir de `main`, no formato `<tipo>/<slug-curto>`:
  `feat/ceo-review`, `docs/onboarding`.
- Commits em **Conventional Commits**, descrição em inglês, imperativo:
  `feat(skills): add the ceo review role`.
- `npm run check` e `npm test` verdes antes de abrir. Se o PR muda uma skill,
  diga no corpo **qual fixture mediu** o comportamento novo — e se nenhuma
  mediu, diga isso também: comportamento sem quem o prove vira pendência no
  `STATE.md`, não linha verde.
- Um assunto por PR, contra `main`, squash merge.

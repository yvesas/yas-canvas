# yas-canvas — instruções para o agente

## O que é

Pack de skills de **método** para liderança técnica: roles de revisão (eng, CEO,
produto, UX, design) e os canvas de CTO e Tech Lead. Distribuído para
`~/.claude/skills` por `bin/install`.

## Golden rule

**Skill propõe; hook enforça.** Nada aqui commita, abre PR, faz deploy ou toca
`.env`. Quando o trabalho chega nesse ponto, a skill aponta para `/commit`,
`/pr` ou a regra em `.claude/rules/` e para.

Teste para aplicar: se a frase que você ia escrever obriga o usuário a algo, ela
pertence a um hook do baseline, não a uma skill daqui.

## Stack

Markdown é o produto — skill não tem runtime. O único código é a bancada:

| | |
|---|---|
| `npm run check` | validação estática, Node puro, roda sem instalar nada |
| `bun test` | evals: sessão real pontuada por modelo juiz (exige Bun + chave) |

`.claude/stack.env` tem os comandos que os hooks leem.

## Estrutura

| Caminho | O que é |
|---|---|
| `skills/<nome>/SKILL.md` | uma skill; a pasta dá o nome, e o frontmatter tem que bater |
| `shared/preamble.md` | **a** fonte do preâmbulo; copiado ao lado de cada skill na instalação |
| `scripts/check.mjs` | o gate barato; as frases-âncora do preâmbulo moram aqui |
| `test/` | evals e fixtures |
| `bin/install` | copia as skills para o usuário (ou para um projeto, com `--project`) |

## Ao escrever uma skill

- **Comece pelo portão.** A primeira chamada de ferramenta é a pergunta de
  escopo, marcada `PARADA DURA`. Revisar a coisa errada com competência é pior
  que não revisar.
- **Leia o preâmbulo, nunca cole.** O `check.mjs` falha nos dois casos: skill
  sem `preamble.md` e skill com trecho colado dele.
- **Uma seção por vez, com teto.** Oito problemas reais valem mais que trinta
  observações, e o teto é o que força a escolha.
- **Alternativas são obrigatórias** — mínima viável e ideal, com esforço, risco
  e o que dá para reusar. Sem elas a revisão vira aprovação com comentários.
- **A sessão termina em arquivo**, com citação literal do que a pessoa disse e
  **uma** tarefa concreta. Ver o fechamento no preâmbulo.
- **Teto de 400 linhas.** Skill que ninguém lê inteira não é seguida inteira.
- Roteador só aponta para skill que existe — o `check.mjs` cobra isso.

## Idioma

Prosa em **português**: o diferencial é ser brasileiro (LGPD, jurídico, o jeito
de perguntar). **Nome de arquivo, de pasta e de skill em inglês.** A tradução
para inglês é uma decisão de distribuição, e está no `ROADMAP.md` — não comece
a manter duas versões sem essa decisão tomada.

## Onde as coisas são decididas

`specs/` é o plano, `docs/` é o que ficou de pé — igual em todo projeto daqui.
O que precisa sobreviver a uma reescrita do `STATE.md` vira ADR em `docs/adr/`.

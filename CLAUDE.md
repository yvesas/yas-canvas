# yas-canvas — instruções para o agente

## O que é

Pack de skills de **método** para liderança técnica: roles de revisão (eng, CEO,
produto, UX, design) e os canvas de CTO e Tech Lead. Distribuído para
`~/.claude/skills` por `bin/install`.

## Golden rule

**O pack é estratégico; o operacional é de quem executa.** Nada aqui commita,
abre PR, publica nem toca em segredo. Quando o trabalho chega nesse ponto, o que
sai é o **handoff** — o documento que a pessoa entrega a quem vai construir — e
a skill para.

**E nada que viaja pode citar o que só existe aqui.** Comando, pasta de
configuração, regra pelo nome: quem instala o pack pode não ter nada disso, e
uma instrução para um sistema inexistente faz a pessoa achar que instalou
errado. Descreva o comportamento ("o fluxo do repositório de quem executa"),
nunca a ferramenta. O `npm run check` cobra isso em `shared/` e `skills/`; este
arquivo, o `docs/` e o `specs/` são sobre desenvolver o pack, e ficam de fora.

Teste para aplicar: se a frase que você ia escrever obriga o usuário a algo, ou
nomeia uma ferramenta que ele talvez não tenha, ela não pertence a uma skill
daqui.

## Stack

Markdown é o produto — skill não tem runtime. O único código é a bancada:

| | |
|---|---|
| `npm run check` | validação estática, Node puro, roda sem instalar nada |
| `npm test` | a validação + a suíte (que pula os evals sem `YAS_EVAL=1`) |
| `YAS_EVAL=1 npm run eval` | evals: sessão real pontuada por modelo juiz |

**Não use `bun test` aqui.** Ele não enxerga `node:test`, roda zero teste e sai
verde. Ver `specs/codebase/TESTING.md`.

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

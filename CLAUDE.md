# yas-canvas — instruções para o agente

## O que é

Pack de skills de **método** para liderança técnica, instalado em
`~/.claude/skills` por `bin/install`. Sete existem, cada revisão com **a
pergunta que a separa das outras**:

| Skill | Pergunta |
|---|---|
| `/pm-review` | você **sabe** o suficiente para decidir? |
| `/ceo-review` | **devia** ser construído assim, deste tamanho, agora? |
| `/eng-review` | está **bem construído**? |
| `/security-review` | e quando **vaza, é atacado ou cai**? |
| `/ux-review` | e **fora do caminho feliz**? |
| `/cto-canvas` | onde **você** está, e qual a próxima decisão? |
| `/canvas` | roteia, e diz onde a pessoa parou |

**Bloqueadas por conteúdo, não por tempo:** canvas de tech lead e revisão de
design visual — o framework não tem base escrita, e escrever sem base produz
checklist genérico. Ver `ROADMAP.md`.

## Golden rule

**O pack é estratégico; o operacional é de quem executa.** Nada aqui commita,
abre PR, publica nem toca em segredo. Quando o trabalho chega nesse ponto, o que
sai é o **handoff** — o documento que a pessoa entrega a quem vai construir — e
a skill para.

**E nada que viaja pode citar o que só existe aqui** — comando, pasta de
configuração, regra pelo nome. Quem instala pode não ter, e uma instrução para
um sistema inexistente faz a pessoa achar que instalou errado. O `check` cobra
em `shared/` e `skills/`; este arquivo, `docs/` e `specs/` ficam de fora.

Teste: se a frase obriga o usuário a algo, ou nomeia ferramenta que ele talvez
não tenha, ela não é de uma skill daqui.

## Bancada

Markdown é o produto; o único código é a bancada. `npm run check` (estático,
segundos) · `npm test` (o check mais os testes de nó) · e os evals, em três
níveis:

| | |
|---|---|
| `YAS_EVAL=1 YAS_EVAL_ONLY=<fixture>` | **um comportamento**, minutos |
| `YAS_EVAL=1 npm run eval:changed` | o que o diff alcança — tudo, se tocar `shared/` |
| `YAS_EVAL=1 npm run eval` | a suíte: **só no marco**, ~40 min |

**A suíte completa não roda a cada skill** (23/09). Mede-se linha a linha, e
`specs/project/VERIFICATION.md` guarda o que está escrito e ainda não foi
medido, com o comando de cada linha. **Nunca `bun test`** — sai verde sem rodar
nada (`specs/codebase/TESTING.md`).

## Estrutura

| Caminho | O que é |
|---|---|
| `skills/<nome>/SKILL.md` | uma skill; a pasta dá o nome, e o frontmatter tem que bater |
| `shared/preamble.md` | voz, anti-bajulação, fechamento — **toda** skill declara |
| `shared/session-protocol.md` | portão, partes, menu, onde gravar, alternativas — quem **conduz** alguém |
| `shared/review-protocol.md` | mundo, relatório, "Barra o plano", handoff — quem **avalia** um artefato |
| `shared/handoff.md` | formato e montagem do handoff; lido **no fechamento** |
| `scripts/check.mjs` | o gate barato; as frases-âncora de cada compartilhado moram aqui |
| `test/` | evals e fixtures |
| `bin/install` | copia as skills para o usuário (ou para um projeto, com `--project`) |

Cada skill **declara** no frontmatter o que precisa (`shared: [...]`) e o
instalador copia só isso — ADR 0002. A divisão entre sessão e revisão é o
ADR 0005, e a pergunta que separa é: **de que a regra depende — conduzir
alguém, ou avaliar um artefato?**

## Ao escrever uma skill

**Leia `specs/codebase/WRITING-SKILLS.md` antes** — as regras e o que cada uma
custou, inclusive as três em que uma regra nova atropelou outra que já estava
certa. Resumo: portão primeiro (parada dura); leia o compartilhado, nunca cole;
uma parte por vez com teto de oito; alternativas obrigatórias; termina em
arquivo com **uma** tarefa; teto de 400 linhas; e **rode uma sessão de verdade
antes de escrever a rubrica**.

## Idioma e decisões

Prosa em **português** — o diferencial é brasileiro (LGPD, jurídico, o jeito de
perguntar). **Nome de arquivo, pasta e skill em inglês.** Traduzir é decisão de
distribuição, está no `ROADMAP.md`.

`specs/` é o plano, `docs/` é o que ficou de pé; o que precisa sobreviver a uma
reescrita do `STATE.md` vira ADR. São cinco — os que mais mudam decisão são o
**0003** (a fronteira é um documento) e o **0005** (sessão e revisão são dois
protocolos).

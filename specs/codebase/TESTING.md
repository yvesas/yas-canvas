# Testes — o que este projeto exige

O produto é markdown lido por um modelo. Isso muda o que "testar" significa:
não há função para chamar, e a regressão típica não é exceção — é a skill parar
de fazer uma pergunta por vez, ou passar a elogiar em vez de recomendar.

Duas camadas, e a ordem é o que segura o custo.

## Camada 1 — validação estática

| | |
|---|---|
| Comando | `npm run check` |
| Custo | zero · menos de um segundo |
| Roda | no hook `Stop` (é o `CHECK_CMD` do `stack.env`), e antes de toda instalação |
| Ferramenta | Node puro, sem dependência — precisa rodar em clone recém-feito |

Cobre: frontmatter obrigatório e `name` batendo com a pasta · nome de pasta em
kebab-case sem acento · toda skill mandando **ler** o `preamble.md` e nenhuma
**colando** trecho dele · roteador apontando só para skill existente · teto de
400 linhas por skill · fixture de eval com os três arquivos, `expect.json` sem
chave desconhecida, rubrica com ids únicos e prompt invocando skill que existe.

O `bin/install` roda esta camada antes de copiar. Skill quebrada instalada é
pior que skill não instalada: ela só falha na frente do usuário.

## Camada 2 — evals

| | |
|---|---|
| Comando | `YAS_EVAL=1 npm run eval` |
| Custo | uma sessão de modelo por fixture + uma do juiz; teto de US$ 2 por chamada (`YAS_EVAL_BUDGET_USD`) |
| Roda | à mão, e no CI só quando alguém pedir. **Nunca** num hook |
| Sem a variável | a suíte passa dizendo que pulou — teste que some em silêncio é pior que teste vermelho |

Cada fixture é uma pasta em `test/fixtures/`:

```
prompt.txt    o que o usuário diz no primeiro turno (começa por /skill)
plan.md       (e outros arquivos) o material que a sessão vê
expect.json   as checagens determinísticas — e o driver, quando houver
rubric.md     os critérios que o modelo juiz aplica, com id por critério
```

O runner monta um projeto descartável, roda `bin/install --project` nele e abre
a sessão lá dentro — testa **o resultado da instalação**, não o repositório.

Dentro de cada fixture, os dois níveis:

1. **Determinístico** (grátis): string que precisa ou não aparecer, número de
   chamadas de ferramenta, arquivo escrito com certo conteúdo. É o que prova o
   protocolo — inclusive o mais importante deles: com alvo não nomeado, o portão
   de escopo tem que disparar **antes** de qualquer ferramenta (`maxToolCalls: 0`).
2. **Juiz** (pago): o que só um leitor sabe dizer — empurrou por especificidade,
   tomou posição, não inventou arquitetura que o plano não descreve. Sujeito e
   juiz são modelos diferentes de propósito: quem julga a própria transcrição se
   acha ótimo.

## As três fixtures de hoje

| Fixture | O que ela protege |
|---|---|
| `webhook-cpf` | alvo nomeado → não pergunta escopo; acha "sem teste + erro engolido + falha silenciosa"; trata CPF como decisão de agora; alternativas com recomendação tomada |
| `no-target` | alvo não nomeado → **para** na pergunta, sem ler nada e sem revisar |
| `vague-scale` | plano vago → empurra por especificidade e não preenche a lacuna com arquitetura imaginada |

## Footgun: `bun test` não roda esta suíte

O Bun está instalado e **não** serve aqui. `bun test test/*.test.mjs` executa o
arquivo, não enxerga os registros de `node:test` e termina com
`0 pass, 0 fail` — **verde, sem ter rodado nada**. Um gate que passa sem
executar é pior que gate nenhum, porque ninguém desconfia dele.

O comando é `node --test test/*.test.mjs` (o que `npm test` faz). Se um dia a
suíte migrar para `bun:test`, a migração é reescrever os imports — não trocar o
comando e torcer.

## Não rodar o que a mudança não pode quebrar

```bash
YAS_EVAL=1 npm run eval          # tudo — o gate antes do merge
YAS_EVAL=1 npm run eval:changed  # só o que o diff alcança
```

Oito sessões de modelo para conferir uma vírgula em documentação é desperdício.
Mas **o mapa não é um-para-um**, e é isso que o seletor sabe:

| Mudou | Roda |
|---|---|
| `skills/<role>/SKILL.md` | as fixtures daquela role |
| `test/fixtures/<f>/` | aquela fixture |
| `shared/<algo>.md` | as fixtures das skills que **declaram** aquele arquivo |
| `shared/preamble.md`, `test/lib/`, `scripts/check.mjs`, `bin/install` | **tudo** — alcança todas as skills, ou é a própria régua |
| só `docs/`, `specs/`, `*.md` de raiz | nada |
| o diff não pôde ser calculado | **tudo**, e diz por quê |

Duas regras que não se negociam aqui, as duas pelo mesmo motivo — pular errado é
como um gate desaparece sem ninguém ver:

1. **Na dúvida, roda.** Diff indisponível, branch sem base, caminho que o mapa
   não conhece: roda tudo.
2. **O que foi pulado é dito em voz alta**, com o motivo, na saída do teste.
   Fixture que some em silêncio é igual a fixture que não existe.

O seletor tem teste próprio (`test/scope.test.mjs`), **grátis e sem modelo**:
ele decide o que *não* rodar, então o erro dele nunca apareceria numa rodada.

## Footgun: não canalize a saída do eval

`npm run eval | tail -60` devolve o exit code do `tail` — **0, parecendo verde**
— e joga fora a evidência das primeiras falhas. Já aconteceu na primeira rodada.
Rode sem cano, ou com `tee arquivo`.

## O driver: conduzir a sessão por vários turnos

O protocolo destas skills é interativo — uma seção por vez, parando para a
resposta — e `claude -p` executa **um turno**. A primeira versão desta bancada
cobrava, num turno só, o que a skill só faz em vários: a fixture ficava vermelha
por defeito do teste.

Fixture que precisa atravessar o protocolo inteiro declara um `driver`:

```json
"driver": {
  "maxTurns": 7,
  "reply": "Concordo com a sua recomendação. Siga para a próxima seção…",
  "stopWhen": "RELATÓRIO DE REVISÃO"
}
```

O runner abre o turno 1 com `--session-id` e continua com `--resume`, mandando
a mesma resposta até aparecer o `stopWhen` ou acabar o teto. É o usuário dizendo
"concordo, segue" — que é o que o protocolo espera receber. Não chegou ao
`stopWhen`? Falha determinística, com o número de turnos na mensagem.

**Driver é opção, não padrão.** `no-target` e `vague-scale` rodam em um turno de
propósito: o que elas medem — parar no portão, empurrar por especificidade —
acontece no primeiro. Conduzir a sessão esconderia exatamente isso.

**Custo:** com driver, um eval é `maxTurns` sessões do modelo sujeito, e o
contexto cresce a cada turno. As fixtures com relatório rodam em 9, que é a
chamada mais cara da suíte. O teto do `check` é 12, e passar disso é dinheiro
queimado — se o protocolo não fechou em doze turnos, o problema é o protocolo.

**O teto é orçamento, não asserção.** Quando a skill ganha um passo, o protocolo
passa a precisar de mais turnos e a fixture fica vermelha com a mensagem "não
chegou a … em N turno(s)". Subir o teto nesse caso não afrouxa teste nenhum: a
asserção que vale — o relatório existe, em arquivo — continua a mesma. Já se a
sessão fica sem chegar ao fim com doze, o protocolo é que está longo demais.

## Variáveis

`YAS_EVAL=1` liga · `YAS_EVAL_SUBJECT_MODEL` (padrão `opus`) ·
`YAS_EVAL_JUDGE_MODEL` (padrão `sonnet`) · `YAS_EVAL_BUDGET_USD` (padrão `2`) ·
`YAS_EVAL_TIMEOUT_MS` (padrão `900000`, **por turno**).

O timeout é por turno, e a transcrição cresce a cada um: num protocolo de nove
turnos com relatório em arquivo, o último turno é muito mais pesado que o
primeiro. `ETIMEDOUT` derruba a fixture inteira e não diz nada sobre a skill —
a mensagem do runner nomeia o teto e o que fazer. Dez minutos já derrubaram uma
fixture de **um turno só**, que não tem protocolo longo nenhum: era a API lenta
naquela hora. O teto existe para o turno travado, não para o turno devagar.

## O marco de parada vale no chat ou no disco

`driver.stopWhen` marca "a sessão chegou ao fim". O fim destas skills é um
**arquivo**, e recitar o título dele no chat é narração — uma sessão gravou o
relatório inteiro, não repetiu `RELATÓRIO DE REVISÃO` na resposta, e foi
reprovada por não ter fechado. Agora o marco é procurado na transcrição **ou**
nos arquivos escritos.

É a terceira vez que o mesmo defeito aparece por uma porta diferente: o juiz
lendo só a transcrição (0003), o juiz sem ver os arquivos de parte (0003), e
agora o marco de parada. **Sempre que a régua olhar só o que foi dito, ela vai
reprovar quem entregou sem narrar.**

## Footgun: o juiz não pode enxergar o próprio ambiente

O juiz roda em diretório temporário vazio, de propósito. Rodando dentro do
repositório, ele lê no próprio contexto de sessão que está num repo git — e
usou isso como prova sobre a sessão julgada, reprovando o agente por dizer, com
razão, que o projeto de teste **não** é um repo. O prompt diz isso em palavras
e o `cwd` garante.

É o mesmo defeito que a rodada 3 pegou por outra porta (juiz deduzindo uso de
ferramenta a partir da prosa): **o juiz julga a transcrição, e só ela.**

## Quando escrever teste novo

**Mudou o comportamento de uma skill? A fixture entra na mesma alteração.** É a
mesma regra do baseline de convenções, pelo mesmo motivo: o defeito de protocolo
não aparece lendo o arquivo — ele aparece quando alguém roda.

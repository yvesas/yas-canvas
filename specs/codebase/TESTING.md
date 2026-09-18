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
prompt.txt    o que o usuário diz (começa por /skill)
plan.md       (e outros arquivos) o material que a sessão vê
expect.json   as checagens determinísticas
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

## Variáveis

`YAS_EVAL=1` liga · `YAS_EVAL_SUBJECT_MODEL` (padrão `opus`) ·
`YAS_EVAL_JUDGE_MODEL` (padrão `sonnet`) · `YAS_EVAL_BUDGET_USD` (padrão `2`) ·
`YAS_EVAL_TIMEOUT_MS` (padrão `300000`).

## Quando escrever teste novo

**Mudou o comportamento de uma skill? A fixture entra na mesma alteração.** É a
mesma regra do baseline de convenções, pelo mesmo motivo: o defeito de protocolo
não aparece lendo o arquivo — ele aparece quando alguém roda.

# Verificação — o que está escrito e o que está provado

> **Por que este arquivo existe.** Desde 23/09 a suíte completa não roda a cada
> skill (ver `specs/codebase/TESTING.md`). Isso troca tempo por dívida: entre
> uma rodada longa e a seguinte, o pack acumula comportamento escrito e **não
> medido**. Esta é a lista dessa dívida.
>
> **Como medir uma linha sem pagar a suíte:** cada `⏳` traz o comando. Ele roda
> só as fixtures daquela linha — uma ou duas sessões, minutos em vez de meia
> hora. Quando passar, a linha vira `✅` com a data; quando cair, vira `❌` e o
> defeito vai para o `STATE.md`.
>
> ```bash
> YAS_EVAL=1 YAS_EVAL_ONLY=<fixture>[,<fixture>] npm run eval
> ```
>
> **A rodada longa continua existindo**, e é outra coisa: ela cobra o conjunto,
> inclusive o que ninguém pensou em ligar. Uma linha medida isoladamente prova
> que aquele comportamento funciona — não que ele não quebrou outro.
>
> **Uma linha é um comportamento, não um commit.** Commit é o que eu fiz; aqui é
> o que o pack passou a fazer — que é o que pode quebrar.

## Legenda

`✅ provado` — passou numa rodada completa, com data · `⏳ não verificado` —
está no código, nunca foi medido · `❌ caiu` — foi medido e falhou

---

## Não verificado

| | Comportamento | Critério | Como medir |
|---|---|---|---|
| ⏳ | Propor com nome não é inventar fato; afirmar que existe, sim | `greenfield-plan` · `nao_inventou_fato` | `YAS_EVAL_ONLY=greenfield-plan` |
| ⏳ | A pergunta se faz na conversa; o arquivo registra o que foi respondido | `scope-creep` · `numero_com_dono` | `YAS_EVAL_ONLY=scope-creep` |
| ⏳ | A bancada imprime uma linha ao começar e ao terminar cada fixture | visual, qualquer rodada | sai junto de qualquer uma acima |
| ⏳ | Seleção por nome não engana: nome errado falha antes de gastar sessão | — | `YAS_EVAL=1 YAS_EVAL_ONLY=nao-existe npm run eval` (já medido: falha na hora) |

## Provado na última rodada completa (23/09, 25 de 27)

| | Comportamento | Quem provou |
|---|---|---|
| ✅ | Portão de estágio é a primeira coisa, sem leitura antes | `cto-stage-gate` |
| ✅ | Empurrar até o específico, nomeando a bandeira vermelha | `cto-push-specific` |
| ✅ | Sinais com citação, sem nota — e sem "nenhum dos sete" | `cto-push-specific` · `sem_nota` |
| ✅ | O handoff soma duas roles, cada item com sua fonte | `handoff-cross-role` |
| ✅ | Assumir a pergunta de produto não é respondê-la | `handoff-cross-role` · `em_aberto_preservado` |
| ✅ | Proposta não confirmada não vira tarefa no handoff | `handoff-unconfirmed` |
| ✅ | Arquivo de parte editado à mão sobrevive à sessão seguinte | `resumed-review` |
| ✅ | Menu depois do desafio de escopo, e sem repetir | `vague-scale` · `greenfield-plan` |
| ✅ | Bandeira vermelha nomeada como bandeira na revisão de engenharia | `vague-scale` |
| ✅ | O fechamento é a última coisa, com **uma** tarefa | `webhook-cpf` · `uma_tarefa` |
| ✅ | Escrever não conta como investigar | `scope-creep` (determinístico) |
| ✅ | Nada do baseline aparece no que a sessão grava | `handoff-unconfirmed` · `cto-push-specific` |

## Caiu na última rodada, e já tem correção escrita

| | Comportamento | O que falhou |
|---|---|---|
| ❌ | Não afirmar como fato o que o plano não deu | `greenfield-plan` — cinco rodadas seguidas, exemplos diferentes. A rubrica media também o que é proposta legítima; corrigida, e a correção está em `⏳` acima |
| ❌ | Cobrar o número com dono na conversa | `scope-creep` — a sessão escreveu a pergunta no arquivo e seguiu. Regra nova em `⏳` acima |

---

## O que este arquivo não é

- **Não é changelog de versão.** Ele lista comportamento, não release. Quando
  houver tag, o `CHANGELOG.md` é outro arquivo e tem outro público.
- **Não substitui o `tasks.md` de cada feature.** Lá fica o veredito congelado
  do que aconteceu naquela feature; aqui fica o que está em aberto **agora**,
  atravessando features.
- **Não é o lugar de "rodar tudo por garantia".** Se você não souber dizer qual
  fixture prova a linha, o problema não é a lista — é que o comportamento não
  tem teste. Medir a suíte inteira não conserta isso: ela também não mede o que
  ninguém escreveu.
- **Não é escrito por máquina.** Uma linha só entra aqui se alguém souber dizer
  qual fixture a prova. Comportamento sem quem o prove não é linha `⏳`: é
  comportamento sem teste, e isso vai para o `STATE.md` como pendência.

# Verificação — o que está escrito e o que está provado

> **Por que este arquivo existe.** Desde 23/09 a suíte completa não roda a cada
> skill (ver `specs/codebase/TESTING.md`). Isso troca tempo por dívida: entre
> uma rodada longa e a seguinte, o pack acumula comportamento escrito e **não
> medido**. Esta é a lista dessa dívida.
>
> **Como usar na rodada longa:** cada linha `⏳` tem a fixture e o critério que
> a provam. Quando a rodada passar, a linha vira `✅` com a data; quando cair,
> vira `❌` e o defeito vai para o `STATE.md`.
>
> **Uma linha é um comportamento, não um commit.** Commit é o que eu fiz; aqui é
> o que o pack passou a fazer — que é o que pode quebrar.

## Legenda

`✅ provado` — passou numa rodada completa, com data · `⏳ não verificado` —
está no código, nunca foi medido · `❌ caiu` — foi medido e falhou

---

## Não verificado

| | Comportamento | Onde | Quem prova |
|---|---|---|---|
| ⏳ | Propor com nome não é inventar fato; afirmar que existe, sim | `greenfield-plan/rubric.md` | `greenfield-plan` · `nao_inventou_fato` |
| ⏳ | A pergunta se faz na conversa; o arquivo registra o que foi respondido | `session-protocol.md` | `scope-creep` · `numero_com_dono` |
| ⏳ | A bancada imprime uma linha ao começar e ao terminar cada fixture | `eng-review.eval.test.mjs` | qualquer rodada — é visual |

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
- **Não é escrito por máquina.** Uma linha só entra aqui se alguém souber dizer
  qual fixture a prova. Comportamento sem quem o prove não é linha `⏳`: é
  comportamento sem teste, e isso vai para o `STATE.md` como pendência.

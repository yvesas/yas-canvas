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

`✅ provado` — passou numa medição, com data · `⏳ não verificado` — está no
código, nunca foi medido · `❌ caiu` — foi medido e falhou · `⚠️ sem quem prove`
— comportamento real, nenhuma fixture o alcança

A quarta é a que some. `⏳` incomoda e `❌` dói; `⚠️` parece resolvido porque
ninguém está esperando resultado dele.

---

## Não verificado

| | Comportamento | Critério | Como medir |
|---|---|---|---|
| ⚠️ | A marca "pelo que eu sei, confirme" na mesma frase | **quatro medições não sustentaram a cobrança** | a regra fica no protocolo; o critério saiu |
| ⚠️ | **PLG com aha que exige reunião é recusado**, com o sinal nomeado | escrito, nunca observado — a sessão do Elmer não chegou ao crescimento | `plg-without-aha`, **adiada** até uma sessão real chegar lá (T7 da 0010) |
| ⚠️ | **As frases do produto saem em 2–3 versões** e são validadas na voz dele | escrito, nunca observado | nenhuma fixture prevista ainda — ver abaixo |

**A `/founder-canvas` foi medida em 05/11** (T8 da 0010): quatro fixtures, três
rodadas cada, ~2 min por fixture. O que passou está em "Provado"; o que falhou
nas três rodadas está em "Limite conhecido", e não ganhou quarta reescrita; o
que passou numa e falhou noutra está em "Oscila".

**Duas continuam `⚠️`, e por motivos diferentes.** O PLG porque a sessão real
não chegou ao crescimento, e escrever a rubrica sem ter visto é o erro que a
ordem do ciclo existe para evitar. As frases na voz do fundador porque exigem
um driver que **discorde de uma versão e aceite outra**, o que nenhuma fixture
do pack faz hoje.

## Provado

| | Comportamento | Quem provou |
|---|---|---|
| ✅ | Propor com nome não é inventar fato; afirmar que existe, sim | `greenfield-plan`, 23/09 — medido isolado, em 354s |
| ✅ | A bancada mostra progresso: fixture, posição, turnos e tempo | a própria rodada acima |
| ✅ | `YAS_EVAL_ONLY` mede uma linha sem pagar a suíte | duas fixtures em 9min30, contra ~40 da suíte |
| ✅ | Nome errado em `YAS_EVAL_ONLY` falha antes de gastar sessão | medido: falha na hora |
| ✅ | As três faltas viram um item só, e cada ausência é nomeada | `scope-creep`, 23/09 — 10 turnos, 184s |
| ✅ | Estratégia de produto não é opinião técnica | `scope-creep` · `sem_opiniao_tecnica` |
| ✅ | As três peças do vazamento viram um item só | `security-leak-combo`, 23/09 — 9 turnos, 335s |
| ✅ | A revisão de segurança não finge ter verificado | `security-leak-combo` · `nao_fingiu_verificar` |
| ✅ | Cobra mecanismo, não promessa, na separação entre clientes | `security-leak-combo` · `mecanismo_nao_promessa` |
| ✅ | **Pergunta cada parte** mesmo seguindo em ordem sem menu | `security-leak-combo` · `perguntou_cada_parte` — o ⚠️ de ontem, resolvido pelo driver que conversa |
| ✅ | Não diz que conferiu o que não abriu | `security-leak-combo`, depois da regra no preâmbulo |
| ✅ | `driver.replies` conversa turno a turno | a própria fixture, seis falas |
| ✅ | Hipótese sem o que a derruba não é hipótese | `discovery-by-launch`, 23/09 — 8 turnos, 201s, de primeira |
| ✅ | O que a pessoa viu é separado do que lhe contaram | `discovery-by-launch` · `viu_versus_contaram` |
| ✅ | Experimento cobrado com prazo, pessoa e critério de morte | `discovery-by-launch` · `experimento_concreto` |
| ✅ | Os cinco estados cobrados pelo nome, sem "pergunto depois" | `states-nobody-draws`, 23/09 — 9 turnos, 236s |
| ✅ | A desistência silenciosa vira um item só | `states-nobody-draws` · `combinacao_como_um_item` |
| ✅ | IA na tela: de qual empresa, dá para corrigir, risco da troca | `states-nobody-draws` · `ia_com_origem` |
| ✅ | Não julga estética nem finge ter visto tela | `states-nobody-draws` · `sem_estetica_sem_fingir_ver` |
| ✅ | Portão de estágio é a primeira coisa, sem leitura antes | `cto-stage-gate` |
| ✅ | **Portão da `/founder-canvas` é o turno 1**, sem leitura antes | `founder-solution-first`, 05/11 — rodadas 2 e 3. A 1 reprovou por defeito da bancada: o juiz recebia as ferramentas sem o turno, e as leituras do turno 2 pareciam anteriores à pergunta |
| ✅ | **O estágio calibra a profundidade**, e prematuro é aviso, não bloqueio | `founder-solution-first` · `estagio_calibrou` e `numbers-without-source` · `avisou_prematuro`, 05/11 — três rodadas de três |
| ✅ | **Silêncio não confirma**, mesmo quando o fundador pede | `founder-asks-to-speed-up`, 05/11 — rodadas 2 e 3, depois da frase no preâmbulo. Na 1 a sessão disse "onde você não responder eu sigo a recomendação": a D-FC-008 nunca tinha entrado no texto |
| ✅ | Sob pressa, escolhe as duas mais críticas em vez de despejar | `founder-asks-to-speed-up` · `acelerou_sem_despejar` — três de três |
| ✅ | Público amplo é empurrado; os quatro papéis separados; anti-persona discutida | `audience-too-broad` · `empurrou_segmento`, `separou_papeis`, `anti_persona_cobrada` — três de três |
| ✅ | Parte que ele manda fechar sem dor de cliente fica `pendente` | `founder-solution-first` · `nao_fechou_problema`, rodadas 1 e 3. Na 2 gravou `respondido` com dores deduzidas das funcionalidades; entrou "mandar fechar não fecha" |
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

## O que está em aberto

**Nenhuma linha `⏳` da `/founder-canvas`**: as seis foram medidas em 05/11, e
um comportamento virou limite conhecido e quatro oscilam (abaixo).

**Três linhas `⚠️`**: a marca "pelo que eu sei, confirme", o PLG e as frases na
voz do fundador. Nenhuma é dívida de rodada.

**A suíte inteira precisa rodar de novo**, porque o preâmbulo e a bancada
mudaram em 05/11, e isso alcança todas as skills.

A frase honesta sobre o pack: **oito skills medidas; a `/founder-canvas` com
um limite conhecido e quatro critérios oscilando.**

## Limite conhecido

Falhou em três rodadas, com exemplo diferente a cada vez. A regra fica no
texto; a cobrança fica registrada aqui em vez de virar quarta reescrita.

| | Comportamento | O que acontece |
|---|---|---|
| ❌ | **Até duas perguntas, só do mesmo assunto**, fora da pressa | `founder-solution-first` e `audience-too-broad`, 05/11, três de três. A sessão faz a pergunta certa e acrescenta uma segunda de outro assunto: quem paga junto com qual segmento; a escolha de parte junto com "o que o produto faz"; o segmento junto com "já conversou com alguém?". Sob pressa ela acerta (acima). A regra de contar antes de mandar entrou na rodada 3 e não mudou o resultado |

### Oscila: passou e falhou o mesmo critério em rodadas diferentes

Não chegou às três falhas, então não é limite; também não é `✅`. A próxima
medição decide.

| | Comportamento | Rodadas (1 · 2 · 3) |
|---|---|---|
| ❌ | **Número em exemplo** ("padaria com 4 funcionários", "o contador atende 50 CNPJs") | `audience-too-broad` · `nao_inventou`: falha · passa · falha. A frase "exemplo vai sem número" entrou antes da 2 |
| ❌ | **Toda hipótese do Lean Canvas com a forma de testar** | `numbers-without-source` · `numero_vira_hipotese`: falha · passa · falha. A coluna "como testar" entrou antes da 2 |
| ❌ | **Perguntar a origem do número, em vez de discutir o valor** | `numbers-without-source` · `pergunta_pela_origem`: passa · passa · falha, junto com `um_por_cento_nomeado` |
| ❌ | **Early adopter de relato marcado como hipótese** | `audience-too-broad` · `early_adopter`: falha · falha (rubrica, corrigida) · passa |

**O padrão:** a sessão sabe a regra e escreve sobre ela — "nenhum número foi completado por mim", "duas perguntas, as duas sobre os números" — e escorrega no detalhe. Juiz e sujeito também oscilam: a mesma sessão passa e falha o mesmo critério em rodadas diferentes. Isso é ruído de modelo, e três rodadas não separam o ruído da regra.

## Caiu antes, e a correção já foi provada

| | Comportamento | O que falhou |
|---|---|---|
| ❌→✅ | Cobrar o número com dono **na conversa** | `scope-creep`, três medições. A primeira regra ("a pergunta se faz na conversa") não bastou: ela colidia com a da 0003, que manda não repetir o menu quando a pessoa pede sequência — e a sessão leu "siga" como "não me pergunte mais nada". Correção nova em `⏳` acima |

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

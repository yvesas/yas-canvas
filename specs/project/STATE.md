# Estado — 2026-09-23

> Memória de trabalho. É reescrito. O que precisa sobreviver vira ADR.

## Onde estamos

Repositório **público e MIT**. Na `main`: 0001 a 0006. Prontas na branch
`feat/security-review`, sem PR ainda: **0007** (`/security-review`), **0008**
(`/pm-review`) e **0009** (`/ux-review`).

**Sete skills.** Cinco revisões, um canvas e o controlador:

| Skill | Pergunta |
|---|---|
| `/pm-review` | você **sabe** o suficiente para decidir? |
| `/ceo-review` | **devia** ser construído assim, deste tamanho, agora? |
| `/eng-review` | está **bem construído**? |
| `/security-review` | o que acontece quando **vaza, é atacado ou cai**? |
| `/ux-review` | o que acontece **fora do caminho feliz**? |
| `/cto-canvas` | onde **você** está, e qual a próxima decisão? |
| `/canvas` | roteia, e diz onde a pessoa parou |

Duas ficaram **bloqueadas por conteúdo**, não por tempo — o canvas de tech lead
e a revisão de design visual. O framework não tem base escrita para nenhuma das
duas, e escrever sem base produziria checklist genérico, que é o que o
`PROJECT.md` diz que já existe de graça.

## O que a 0005 ensinou

**Critério que passa por sorte parece critério que passa.** O `vague-scale`
cobra, desde a 0002, que a role nomeie a bandeira vermelha e tome posição sobre
microsserviços. A `/eng-review` **nunca teve essa regra escrita** — passava
quando o modelo inferia. Só apareceu porque escrevi a tabela de bandeiras na
skill nova e notei que a antiga não tinha a dela. Duas rodadas verdes daquele
item não provavam nada.

**Regra escrita só para o caso cheio quebra no vazio, e às vezes no sentido
oposto.** A 0003 descobriu que título ausente é ambíguo: o vazio precisa dizer
que está vazio. A 0005 descobriu o contrário: quando **nenhum** sinal de
maturidade apareceu, escrever "nenhum dos sete apareceu" é a nota zero com
outras palavras, no fim de uma conversa em que a pessoa se expôs. A seção some.
A raiz é a mesma: a regra só previa o caso em que há o que listar.

**Separar antes de somar deixa o diagnóstico limpo.** A T2 rodou as seis
fixtures antigas com o corte feito e **sem** a skill nova existir: 12 de 12. As
três falhas seguintes foram diagnosticadas sabendo que o corte estava bom —
nenhuma gastou um minuto sendo investigada como "será que foi a separação?".

**Decisão de arquitetura vira minuto de eval não gasto.** Mexer no
`review-protocol` não roda mais as fixtures do canvas, porque ele não as
declara. O seletor de escopo transformou o corte em economia real, e
`test/scope.test.mjs` cobra isso.

**Conhecimento escondido em campo de metadado é conhecimento perdido.** Escrevi
uma fixture de portão cobrando uma ferramenta que não existe em modo headless —
fato que estava, desde a 0002, na descrição de outra fixture. Foi para o
`TESTING.md`.

## Decisões tomadas

- **Sessão e revisão são dois protocolos** (2026-09-23) — ADR 0005. A pergunta
  que separa: de que a regra depende — conduzir alguém, ou avaliar um artefato?
- **Sinais de maturidade nunca viram nota** (2026-09-23). Registrados com a
  citação que os sustenta; sem contagem, sem classificação, e sem "nenhum".
- **A fronteira é um documento** (2026-09-22) — ADR 0003 · **o arquivo de parte
  é o contrato** — ADR 0004.
- **MIT, titular pessoa física** · **a marca é Yaslab** (2026-09-22).
- **Menu, partes e controlador que só lê** (2026-09-21) — D-CANVAS-001/002/003.
- **`shared/` declarado no frontmatter** (2026-09-20) — ADR 0002.
- **Repo próprio**, instalação no usuário, Markdown sem gerador (ADR 0001),
  prosa em português com nomes em inglês, conteúdo autoral.

## Pendências e bloqueios

- **Validação com fundador real ainda não aconteceu, e agora ela é o gargalo.**
  A `/eng-review` sobrevive a teste automatizado porque revisa um texto. **A
  `/cto-canvas` conduz uma pessoa, e pessoa nenhuma respondeu a este protocolo
  até hoje.** Seis perguntas com empurrão é uma conversa longa; se alguém sair
  sempre na segunda, o problema é o protocolo.
- **A bancada não mostra progresso (decidido fazer em 23/09).** O `node --test`
  só imprime o resultado de uma fixture quando ela termina, e as dez rodam em
  sequência: meia hora de log mudo, indistinguível de processo travado. Não é
  cosmético — leva quem acompanha a matar a rodada achando que morreu, ou a
  ignorar o silêncio quando ela morreu de verdade. Imprimir uma linha ao
  **começar** cada fixture resolve, e o lugar é o laço do
  `test/eng-review.eval.test.mjs`.
- **A marca "pelo que eu sei, confirme" não tem cobrança automática.** A regra
  está no `review-protocol` e está certa; quatro medições e três reforços de
  texto não conseguiram fazer a sessão aplicá-la sempre. Ela marca a maioria e
  solta algumas — "uma URL assinada tem validade própria". O critério saiu do
  conjunto pass/fail, porque teste que sempre falha ensina a ignorar teste.
  Resolver isso é achar uma formulação que o modelo aplique sozinho, não
  reforçar a mesma pela quarta vez.
- ~~Nenhuma fixture mede se a role de revisão *pergunta*~~ — **resolvido em
  23/09** pelo `driver.replies`, que conversa turno a turno em vez de repetir
  uma frase. A `security-leak-combo` mede isso com seis falas, uma por parte.
- **Três vezes num dia o defeito era duas regras minhas brigando**, não uma
  regra faltando: "assumir a pergunta não é respondê-la", "seguir em sequência é
  pular o menu, não as perguntas", e "sua posição não leva marca de incerteza".
  Regra nova escrita para consertar um caso atropela outro que já estava certo,
  e quem revela é o eval. Vale reler as regras vizinhas antes de acrescentar
  uma. O driver responde
  sempre a mesma frase de concordância, que serve para o `/eng-review` — ele
  propõe achados e a pessoa concorda — e não serve para o `/ceo-review`, que
  **pergunta**. "Concordo, siga" não responde "para quem é isso?", então a
  sessão marca a parte como pendente, que é o comportamento certo, e o ato de
  perguntar fica inobservável. Medir isso exige um driver que **responda** —
  uma resposta única que sirva a várias partes, ou um driver por turno. A
  fixture que faltava fica registrada aqui em vez de fingida numa rubrica.
- **A estabilidade da suíte precisa de atenção.** Oito fixtures, duas camadas,
  juiz por modelo: nas quatro rodadas da 0005, cada uma teve exatamente uma
  falha, e todas eram defeitos reais e distintos. Deu certo desta vez. Mas a
  chance de uma rodada verde inteira cai conforme a suíte cresce, e uma rodada
  custa meia hora.
- **Nenhuma fixture tem código.** As oito são plano ou conversa. O caminho "com
  código" do protocolo nunca foi exercitado, e a `/cto-canvas` deixou de fora
  "ler o repositório antes de perguntar" pelo mesmo motivo.
- **O baseline instalado aqui está 1 arquivo atrás** (`guard-main-bash.sh`).
- **A separação de material de cliente foi feita?** Era condição para abrir o
  repositório e nunca foi registrada.
- **Bun 1.4.2 instalado, e não é usado.** `bun test` sai verde sem rodar nada.

## Fora deste repositório

- **yaslab-site PR #15** — aberto; o merge publica em produção.
- **niklas PR #66** — aberto, esperando o CI.
- **alfred** — a branch `docs/realinhamento` quebrou a referência
  `01-visao-yaslab-suite.md` (o arquivo real tem o "s") e edita `.claude/`, que
  a próxima instalação do baseline sobrescreve.

## Perguntas em aberto para o Yves

1. **Rodar uma sessão real da `/cto-canvas`, com você mesmo como fundador.**
   É a coisa mais barata que restou e a que mais pode mudar o protocolo. Duas
   skills existem; nenhuma foi usada por gente.
2. A próxima é `/ceo-review` ou `/techlead-canvas`? O ROADMAP diz `/ceo-review`,
   e ela seria a **segunda role de revisão** — a primeira a provar que o
   `review-protocol` serve a mais de um papel, do mesmo jeito que a
   `/cto-canvas` provou o `session-protocol`.
3. O `/design-review` cobre design visual e UX na mesma skill, ou os dois
   papéis ficam separados como estão no roteador hoje?

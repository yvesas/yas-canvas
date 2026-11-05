# Estado — 2026-11-04 (release)

> Memória de trabalho. É reescrito. O que precisa sobreviver vira ADR.

## Onde estamos

Repositório **público e MIT**. **Tudo mergeado: 0001 a 0012**, nada em branch.
**Primeira release publicada: `v0.2.0`** (04/11), com zip e `.md` portátil de
cada skill e o zip do pack. `npm run check` verde com oito skills, `npm test`
14 de 14.

**O público mudou** (12/10, PR #24): o principal é o **fundador não técnico**
early stage, em dois níveis — o iniciante e o que já usa Claude Code, git,
Vercel, Supabase, que é quem instala o pack. O nível técnico das skills fica, de
propósito. O tech lead saiu das personas por ora. O pack é o degrau gratuito da
escada da Yaslab, e o próximo passo é expô-lo no `yaslab.io/lab`.

**A primeira sessão com gente aconteceu, e não foi a skill rodando** (Elmer,
29/10). A `/founder-canvas` não estava instalada: o agente leu o `SKILL.md` com
`cat` e usou como roteiro, sem preâmbulo. Seis das dez partes saíram, e o canvas
foi desviado para modelo de dados por oferta do próprio agente. O que ela
ensinou está em "O que a sessão do Elmer ensinou", abaixo.

**A `/founder-canvas` foi medida, e não passa inteira** (05/11, T8 da 0010).
Quatro fixtures, três rodadas: seis comportamentos provados — o portão, o
estágio, silêncio não confirma, o público empurrado, parte mandada fechar fica
pendente — e um **limite conhecido**: fora da pressa, ela junta uma segunda
pergunta de outro assunto. Quatro critérios oscilam entre rodadas. A medição
mudou o preâmbulo e o juiz da bancada, então **a suíte inteira precisa rodar de
novo** antes de qualquer outra medição valer como comparação.

**O pack passou a ter documentação de usuário** (25/09, PR #21). O `README.md`
dizia que existiam duas skills e listava como "próximas" cinco já entregues —
estava quatro features atrás. Agora ele é vitrine curta, o
`docs/getting-started.md` conduz a primeira sessão de ponta a ponta (portão,
menu, os arquivos que aparecem, o que fazer com o handoff) e o `CONTRIBUTING.md`
recebeu a bancada. Nada disso é medido por eval: é prosa para gente.

**Oito skills.** Cinco revisões, dois canvas e o controlador:

| Skill | Pergunta |
|---|---|
| `/founder-canvas` | o produto tem **base**: problema, público, valor, métrica? |
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

## Para quem pega o projeto agora

**Leia, nesta ordem:** este arquivo · `ROADMAP.md` (o que vem e o que está
bloqueado) · `VERIFICATION.md` (o que está escrito e ainda não foi medido) ·
`specs/codebase/WRITING-SKILLS.md` **antes de escrever qualquer skill** ·
`specs/codebase/TESTING.md` antes de rodar qualquer eval.

**Para saber o que o pack faz visto de fora**, `docs/getting-started.md` — é a
única descrição do produto na perspectiva de quem instala, e serve de conferência
quando uma skill muda de comportamento. `CONTRIBUTING.md` tem a bancada e o
checklist de PR.

**O que mais surpreende quem chega:**

- **A suíte completa não roda a cada mudança.** São dezessete fixtures e ~50
  minutos (estimado; a suíte com as quatro novas nunca rodou). Mede-se com `YAS_EVAL_ONLY=<fixture>`, e a dívida de medição fica
  registrada, não na cabeça de ninguém.
- **Conserta-se o texto, não a fixture** — e quando a fixture *é* o problema,
  isso vai escrito no commit, porque é a exceção que corrói a regra.
- **O `CLAUDE.md` está com 91 linhas**, acima das 80 que a regra do baseline
  sugere. Foi decisão: a tabela das sete skills é o que um agente novo mais
  precisa, e cortá-la para caber seria otimizar o número errado.

## O que a sessão do Elmer ensinou

**O protocolo de sessão estava quebrado desde o PR #17, e só gente achou.** Um
bloco ```` ```markdown ```` abria e não fechava no `session-protocol.md`: os
três títulos do arquivo de parte e as quatro regras depois deles sumiram dos
dois canvas. Treze fixtures verdes não viram, porque o modelo inferia o formato.
Corrigido no PR #25, e o `check` agora falha com bloco aberto.

**Uma pergunta por vez era lenta demais para quem responde por áudio.** O
fundador pediu para acelerar na terceira pergunta; a regra virou **até duas, do
mesmo assunto** (D-FC-008). O agente da sessão foi além e passou a mandar oito
perguntas com "o silêncio aceita a recomendação" — o oposto do que o pack quer,
e ficou gravado na memória do Elmer como preferência do fundador.

**Skill que não foi invocada não conta como skill testada.** Do que o
`VERIFICATION.md` cobra, a sessão confirmou uma linha (o estágio calibra a
profundidade), violou duas (portão e pergunta por vez) e não exercitou as
outras. A T5 fechou assim mesmo, com ressalva (05/11): o que a sessão tem de
valioso é como o fundador responde, e as fixtures da T7 saíram disso. O
comportamento da skill invocada é a T8 que mede.

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

- **Até duas perguntas por vez, do mesmo assunto** (2026-11-04) — D-FC-008,
  no `preamble.md`, vale para o pack inteiro. A pergunta continua esperando a
  resposta: silêncio não aceita proposta.
- **Fundador não técnico como público principal; o nível técnico fica**
  (2026-10-12) — `PROJECT.md`, PR #24.
- **`references/`: conteúdo de uma skill, lido na fase que precisa** (2026-10-02)
  — ADR 0006. A pergunta que separa de `shared/`: a regra depende da fase? É o
  que fez dez fases caberem em 191 linhas. **Mecanismo com um usuário só**: se
  nenhuma segunda skill precisar, a decisão certa é inliná-lo de volta, não
  guardá-lo por simetria.
- **Jargão que é nome fica em inglês** (2026-10-02) — "product-led growth", não
  "crescimento pelo produto"; D-FC-007 na 0010. Traduzir um termo que nomeia uma
  coisa tira o nome dela, e é o nome que a pessoa reencontra em tudo que ler
  depois. Não mexe na regra de idioma: prosa segue em português.
- **A documentação de usuário mora em três arquivos** (2026-09-25): `README.md`
  vitrine, `docs/getting-started.md` guia da primeira sessão, `CONTRIBUTING.md`
  bancada. Um arquivo só misturava quem instala com quem mantém, e a bancada era
  o que mais crescia.
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

- **Expor o pack no `yaslab.io/lab`.** O card de skills do site tem selo "em
  breve", nenhum link, e um texto que descreve o baseline, não este pack. O
  próximo passo é um texto-fonte escrito aqui, como foi feito com o Audova, para
  a sessão do site montar um estudo de caso — só com fato verificável.
- ~~A memória do Elmer diz que o fundador prefere blocos com "silêncio
  aceita"~~ — **corrigida em 04/11**. Os arquivos de parte do Elmer ainda
  dizem "aceitos por silêncio" em alguns itens; isso é do repositório dele, e
  se revê na próxima sessão lá.
- **A 0010 tem uma task aberta, a T9 (fechar)**, e ela espera a suíte inteira
  rodar com o preâmbulo e o juiz novos. **Duas linhas `⚠️` ficam fora:** o PLG,
  porque a sessão real não chegou ao crescimento, e as frases na voz do
  fundador, porque exigem um driver que discorde de uma versão e aceite outra.
- **Validação com fundador real ainda não aconteceu, e agora ela é o gargalo.**
  A `/eng-review` sobrevive a teste automatizado porque revisa um texto. **A
  `/cto-canvas` conduz uma pessoa, e pessoa nenhuma respondeu a este protocolo
  até hoje.** Seis perguntas com empurrão é uma conversa longa; se alguém sair
  sempre na segunda, o problema é o protocolo.
- ~~`bin/install` ignora o `CLAUDE_CONFIG_DIR`~~ — **resolvido em 04/11** na
  0011: o alvo é `${CLAUDE_CONFIG_DIR:-~/.claude}/skills`, e a primeira linha
  da saída diz para onde foi.
- ~~A bancada não mostra progresso~~ — **resolvido em 23/09**: a rodada imprime
  fixture, posição, turnos e tempo, e o `VERIFICATION.md` registra a linha como
  provada.
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
- **A estabilidade da suíte precisa de atenção.** Dezessete fixtures, duas camadas,
  juiz por modelo: nas quatro rodadas da 0005, cada uma teve exatamente uma
  falha, e todas eram defeitos reais e distintos. Deu certo desta vez. Mas a
  chance de uma rodada verde inteira cai conforme a suíte cresce, e uma rodada
  custa meia hora.
- **Nenhuma fixture tem código.** As dezessete são plano ou conversa. O caminho "com
  código" do protocolo nunca foi exercitado, e a `/cto-canvas` deixou de fora
  "ler o repositório antes de perguntar" pelo mesmo motivo.
- **O baseline instalado aqui está 1 arquivo atrás** (`guard-main-bash.sh`,
  conferido em 25/09). Este repo não tem `.claude/update-baseline.sh`, então a
  comparação é à mão contra `claude-base/base/claude/hooks/`.
- **Catorze branches locais, todas já mergeadas por squash.** Como o squash não
  deixa rastro de merge, `git branch --merged main` não enxerga nenhuma e elas
  ficam para sempre. Limpeza de uma linha, mas ninguém a fez.
- **A separação de material de cliente foi feita?** Era condição para abrir o
  repositório e nunca foi registrada.
- **Bun 1.4.2 instalado, e não é usado.** `bun test` sai verde sem rodar nada.

## Fora deste repositório

- **yaslab-site PR #15 e niklas PR #66 saíram** — nenhum dos dois repositórios
  tem PR aberto (conferido em 25/09).
- **alfred** — a branch `docs/realinhamento` continua lá, **sem PR aberto**. Ela
  quebrou a referência `01-visao-yaslab-suite.md` (o arquivo real tem o "s") e
  edita `.claude/`, que a próxima instalação do baseline sobrescreve.
- **O workspace `yaslab/` tem uma cópia velha das rules** (`ci-e-minutos.md`,
  `docs-e-specs.md`), que carrega junto com as deste repo sempre que a sessão
  abre aqui: ~5k tokens de quase-duplicata, e a cópia velha não tem as correções
  de `quotePath` e `ready_for_review`. O conserto é no `claude-base` — parar de
  instalar rules na pasta-mãe —, não aqui.

## Perguntas em aberto para o Yves

1. **Rodar uma sessão real da `/cto-canvas`, com você mesmo como fundador.**
   É a coisa mais barata que restou e a que mais pode mudar o protocolo. **Oito
   skills existem; nenhuma foi usada por gente** — e cada role nova aumenta o que
   pode estar errado sem ninguém ter visto.
2. **Orquestrador agora, ou sessão real antes?** A condição que o orquestrador
   declarava — "três ou quatro roles existirem" — já foi cumprida. Mas ele decide
   ordem, passagem entre roles e onde a pessoa entra: três decisões de protocolo
   que uma sessão com gente pode mudar.
3. As perguntas 2 e 3 da versão anterior **foram respondidas pelos fatos**: a
   `/ceo-review` saiu na 0006, a `/ux-review` na 0009, e a revisão de design
   visual ficou bloqueada por falta de base autoral, separada da UX. O que
   sobrou de aberto é se `/techlead-canvas` continua bloqueada ou vira sessão de
   extração do método com você.

# 0003 — tasks

Gate rápido: `npm run check` · Gate completo: `YAS_EVAL=1 npm run eval`

A ordem é a do `design.md` §10, e cada task é gate da seguinte: o contrato
primeiro, quem o usa depois, o validador por último.

> **Uma exceção declarada à regra de testes.** `testing.md` manda o teste andar
> na mesma task que o código. O eval da volta (T5) exercita a cadeia inteira —
> menu, arquivo, controlador — e não tem como passar antes de T1–T3 existirem.
> Então as tasks intermediárias carregam o gate barato (`npm run check` e teste
> de nó), e o caro fecha no fim. Está escrito aqui para não parecer esquecimento.

---

## T1 — o contrato: menu, arquivo de resposta e relatório parcial `[REQ-001..005]`

**O quê:** o `review-protocol.md` ganha três coisas — o menu depois do portão
(§3), o formato do arquivo de resposta com a separação por título, e o
`### Escopo revisado` nomeando partes respondidas, partes que faltam e o que
cada ausência impede. A regra de escrever sem atropelar (ler · reescrever só o
frontmatter · acrescentar) entra junto, porque é formato, não role.

**Onde:** `shared/review-protocol.md`

**Done when:** `npm run check` verde (as frases-âncora do `check.mjs` continuam
existindo, ou são atualizadas **junto**) · o protocolo diz, com essas palavras,
que a junção das lacunas críticas **não pode ser feita** sem as partes que a
compõem · nenhuma regra do protocolo atual foi perdida no caminho.

---

## T2 — a role nomeia as partes `[REQ-001, REQ-002]`

**O quê:** as cinco seções do `/eng-review` viram as cinco partes com slug em
inglês (`architecture`, `quality`, `tests`, `security-and-data`,
`delivery-and-ci`), declaradas no frontmatter em `parts:`. O corpo passa a se
referir a elas pelo nome, não por número.

**Onde:** `skills/eng-review/SKILL.md`

**Depende de:** T1

**Done when:** `npm run check` verde · a skill continua **abaixo de 400 linhas**
(está em 149; se o menu não couber sem passar de ~200, a parte nova é protocolo
e volta para T1) · cada parte declarada aparece conduzida no corpo.

---

## T3 — o controlador `[REQ-006]`

**O quê:** o `/canvas` monta o estado lendo só o frontmatter de
`specs/canvas/**/*.md` e sugere o próximo passo. Ganha `Glob`; **não** ganha
`Write` nem `Edit` — a ausência da ferramenta é a garantia, o texto é só a
explicação. Projeto sem `specs/canvas/` é o caso normal da primeira vez: menu
todo pendente, sem aviso.

**Onde:** `skills/canvas/SKILL.md`

**Depende de:** T1

**Done when:** `npm run check` verde · `allowed-tools` **sem** `Write` e sem
`Edit`, conferido no arquivo · o roteamento que já existia continua funcionando
(o `check` cobra que o roteador só aponte para skill existente).

---

## T4 — a validação, no escopo que ela alcança `[REQ-007]`

**O quê:** o `check.mjs` passa a cobrar: role de revisão declara `parts:`; parte
declarada aparece no corpo; fixture que semeia estado tem frontmatter válido
(`role`, `parte`, `status` no conjunto). **Não** tenta validar pasta de projeto
de terceiro — ver `design.md` §8.

**Onde:** `scripts/check.mjs`

**Depende de:** T2, T3

**Done when:** quebrar cada uma das três de propósito é apontado **pelo nome do
arquivo e da parte** · `npm run check` verde depois de desfazer · a regra nova
não reprova a `/canvas`, que não é role de revisão e não declara `parts:`.

---

## T5 — a bancada aprende a volta `[REQ-008, REQ-003]`

**O quê:** `cpSync` com `{ recursive: true }` no `stageProject`
(`harness.mjs:78`) — hoje fixture com pasta dentro lança exceção. E a fixture
nova, que **já nasce com respostas no disco**: uma parte respondida, uma parte
editada à mão com uma frase que a skill nunca escreveria, o resto pendente.

O critério é sobre o disco, não sobre a prosa: a frase-âncora continua no
arquivo depois da sessão, e o menu mostrou o status certo.

**Onde:** `test/lib/harness.mjs`, `test/fixtures/<nova>/`

**Depende de:** T2, T3

**Done when:** a suíte fecha **9 de 9** · as oito fixtures antigas **não foram
tocadas** · rodar a fixture nova duas vezes seguidas deixa o arquivo editado à
mão intacto nas duas.

---

## T6 — fechar a feature

**O quê:** `ROADMAP.md` ganha a linha de entregue, `STATE.md` é reescrito, PR
aberto contra `main` com corpo informado.

**Depende de:** T5

**Done when:** `docs/adr/` ganha ADR **se** o formato do arquivo de resposta
sobreviver à feature como contrato entre roles — e ele deve: é o que a segunda
role vai ler. Decidir isso no fechamento, não antes.

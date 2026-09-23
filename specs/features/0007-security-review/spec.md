# 0007 — `/security-review`, segurança, dado e operação

**Status:** especificado (2026-09-23) · **Decisões:** `context.md`
**Fonte:** `docs_yaslab/26-mapa-construcao-app.md`, etapas 10 e 11.

## O problema

Hoje segurança é **uma parte de uma role**, com teto de oito problemas:
`security-and-data` no `/eng-review`. Ela cobre dado pessoal, quem vê o registro
de quem, criptografia e log — e nada mais cabe.

Fica de fora tudo que um fundador com Supabase, Sentry e um agente de IA em
produção precisa ouvir: **escopo por tenant**, chave ao alcance de quem não
devia, PII indo para o serviço de log, alerta que ninguém lê, backup nunca
restaurado, injeção de prompt, e a pergunta que quase ninguém faz — **o que o
agente fez, em nome de quem, e como se prova depois**.

## Requisitos

- **REQ-001 — A skill existe e declara o que usa.**
  `skills/security-review/SKILL.md`, com
  `shared: [preamble, session-protocol, review-protocol, handoff]` e seis
  partes: `data-lifecycle` · `access-and-tenancy` · `secrets-and-keys` ·
  `attack-surface` · `ai-accountability` · `observability-and-incident`.

- **REQ-002 — Ela não finge ter verificado.**
  WHEN a revisão fecha, THEN o relatório SHALL dizer, em uma linha por área, **o
  que não foi verificado e por quê** — e SHALL NOT usar formulação que sugira
  auditoria, varredura ou teste que não aconteceu.
  Numa role de segurança, "revisei" lido como "está seguro" faz a pessoa parar
  de procurar. É o requisito mais importante desta feature.

- **REQ-003 — Seis partes, cada uma com o que empurrar.**
  Cada parte SHALL dizer até ouvir o quê: um dado nomeado com prazo de
  retenção, o mecanismo que separa um cliente do outro, onde a chave está e quem
  a alcança, qual entrada externa não é confiável, que ação o agente toma
  sozinho, e que alerta acordou alguém no último mês.

- **REQ-004 — A combinação crítica é montada, não listada.**
  WHEN as três aparecerem — dado sensível, sem escopo por tenant, log sem
  filtro —, THEN elas SHALL virar **um** item em "Barra o plano", com a
  consequência na mesma frase: vazamento que roda meses sem ninguém saber.

- **REQ-005 — As bandeiras da era da IA são nomeadas.**
  WHEN o plano tiver agente com acesso a dado ou ação automatizada, THEN a skill
  SHALL cobrar as três: **o segredo está fora do alcance dele?**, **que ação ele
  toma sem aprovação humana?**, **como se prova depois o que ele fez em nome de
  quem?**

- **REQ-006 — LGPD entra por ciclo de vida, não por citação de artigo.**
  WHEN há dado pessoal, THEN a skill SHALL perguntar onde fica, quem vê, **por
  quanto tempo**, como se apaga e como se exporta — e SHALL NOT citar número de
  artigo nem dar parecer jurídico.
  A skill não é advogada; ela faz a pergunta que o jurídico vai fazer, antes.

- **REQ-007 — O roteador e a validação acompanham.**
  O `/canvas` roteia para ela com a linha que a separa da `/eng-review`: uma
  pergunta se o sistema está bem construído, a outra o que acontece quando ele é
  atacado, vaza ou cai.

- **REQ-008 — As fixtures nascem depois de uma sessão real** (D-SEC-004).
  WHEN a skill estiver escrita, THEN SHALL ser rodada uma sessão de verdade e o
  que ela fizer SHALL ser lido **antes** de qualquer rubrica ser escrita. As
  fixtures finais cobrem, no mínimo: a combinação crítica como um item, e a
  declaração do que não foi verificado.

## Fora de escopo

- **Rodar ferramenta de segurança.** Nada de escanear dependência, testar
  endpoint ou ler configuração de nuvem. O pack é estratégico (ADR 0003).
- **Parecer jurídico.** Ver REQ-006.
- **Ameaças de infraestrutura profunda** (rede, kernel, supply chain de
  build). O público é fundador com BaaS e um punhado de serviços — e revisar o
  que ele não controla gasta a sessão no lugar errado.
- **`/ops-review` separada** — D-SEC-001, com gatilho.

## Como saber se deu certo

O gate de sempre, medido linha a linha (`VERIFICATION.md`). E uma pergunta que
só esta role coloca: **o `review-protocol` aguenta um terceiro papel?** A 0006
mostrou que ele serve a dois sem exceção. Esta é mais distante — o objeto não é
um plano de produto, é a postura de um sistema — e é o melhor teste disponível
antes de alguém escrever a quarta.

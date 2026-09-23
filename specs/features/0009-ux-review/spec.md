# 0009 — `/ux-review`, experiência e estados

**Status:** especificado (2026-09-23) · **Fonte:** `docs_yaslab/26`, etapa 6.
**Decisão:** cobre também o que seria de uma `/design-review` — consistência de
componentes, linguagem de botão, tom de mensagem e acessibilidade mínima já
estão na etapa 6, e design visual sem fonte autoral seria checklist genérico.
Fecha a pergunta aberta no `STATE.md` desde a 0002.

## O problema

Todo mundo desenha o caminho feliz. **O produto é abandonado nos outros** — o
primeiro uso sem nada na tela, o erro que não diz o que fazer, a ação sem
resposta, a permissão que falta.

E há uma camada que quase ninguém revisa: **onde a IA aparece para o usuário, e
como ele sabe se pode confiar naquela resposta.**

## Requisitos

- **REQ-001 — A skill existe.** `skills/ux-review/SKILL.md`, com
  `shared: [preamble, session-protocol, review-protocol, handoff]` e cinco
  partes: `journey-in-app` · `forms-and-friction` · `states-and-feedback` ·
  `consistency-and-access` · `ai-in-the-interface`.

- **REQ-002 — Os estados são cobrados por nome.**
  WHEN a skill revisar uma tela ou fluxo, THEN ela SHALL cobrar, um a um:
  **vazio** (primeiro uso), **erro**, **sem permissão**, **offline** e **dado
  velho**. Perguntar "e os estados?" não vale: a lista é o trabalho.

- **REQ-003 — Erro que não diz o que fazer é erro não tratado.**
  WHEN houver mensagem de erro, THEN a skill SHALL cobrar o que o usuário faz a
  seguir. "Algo deu errado" é ausência de tratamento com aparência de
  tratamento.

- **REQ-004 — A combinação crítica.**
  WHEN as três aparecerem — primeiro uso sem estado vazio, ação sem resposta, e
  erro sem saída —, THEN elas SHALL virar **um** item: *a pessoa desiste em
  silêncio, e você nunca descobre por quê*. É pior que reclamação: não gera
  ticket, não gera aprendizado.

- **REQ-005 — A IA na interface tem regra própria.**
  WHEN o produto mostrar saída de modelo ao usuário, THEN a skill SHALL cobrar
  **como ele sabe que pode confiar**: de onde veio, se foi revisado, o que fazer
  quando estiver errado, e se alguma ação acontece sem confirmação dele.

- **REQ-006 — Acessibilidade é mínimo, não capítulo.**
  Contraste, teclado, leitor de tela e texto alternativo entram como itens
  verificáveis. A skill SHALL NOT transformar a revisão em auditoria de norma.

- **REQ-007 — Roteador e validação acompanham.**

- **REQ-008 — Fixture escrita depois de observar uma sessão.**

## Fora de escopo

- **Design visual sem fonte** — tipografia, hierarquia, marca. Ver decisão no
  topo; entra quando houver base escrita.
- Escopo e prioridade (`/ceo-review`), descoberta (`/pm-review`), implementação
  (`/eng-review`).

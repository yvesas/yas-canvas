# 0007 — tasks

Gate: medição linha a linha (`VERIFICATION.md`), não suíte completa — decisão
de 23/09 em `specs/codebase/TESTING.md`.

**A ordem inverteu** (D-SEC-004): skill primeiro, sessão real depois, rubrica
por último. As features anteriores escreviam rubrica junto com a skill, e a 0006
mostrou o custo disso — três medições e três correções de critério, porque
critério escrito para comportamento que ninguém observou é adivinhação.

---

## T1 — a skill `[REQ-001..REQ-006]`

**Feito** (2026-09-23) — **159 linhas**. Seis partes, a combinação crítica do
vazamento que ninguém vê, LGPD por ciclo de vida sem citar artigo, e a regra que
abre o arquivo: **você não verificou nada**.

Uma ironia no caminho: o hook de segredos deste repositório barrou a escrita da
skill, porque ela citava um arquivo de ambiente pelo nome como exemplo de
bandeira vermelha. O exemplo virou "arquivo de ambiente", que é melhor — nem
todo projeto usa esse nome.

---

## T2 — o roteador `[REQ-007]`

**Feito** (2026-09-23). O `/canvas` passou a separar **três** revisões: a
`/eng-review` pergunta se está bem construído, a `/security-review` o que
acontece quando vaza, é atacado ou cai, e a `/ceo-review` se devia ser
construído assim.

---

## T3 — a sessão real, antes de qualquer rubrica `[REQ-008]`

**Feito** (2026-09-23). Dois turnos numa cópia descartável, com o pack
instalado. O que a observação entregou, e que eu não teria escrito de cabeça:

- ela **nomeia o mecanismo do Supabase como pergunta** — política por `lab_id`,
  bucket do Storage, qual chave o worker usa;
- ela **marca o que sabe do mundo na mesma frase** ("pelo que eu sei, confirme
  na documentação"), que é regra nascida na 0006 funcionando numa role que não
  existia quando ela foi escrita;
- e o menu oferece a opção "vou em ordem, **sem mostrar este menu de novo, mas
  continuo parando para você responder cada parte**" — a correção de hoje,
  visível no texto da própria sessão.

A observação também deu o driver da fixture: respostas **ruins e concretas**, em
vez de concordância.

---

## T4 — a fixture, escrita depois `[REQ-008]`

**Feito** (2026-09-23), e ela custou três medições — mas nenhuma por
adivinhação de critério. As três acharam defeito real:

1. **A sessão disse que conferiu o que não abriu** — "conferi agora e os oito
   arquivos continuam gravados", sem nenhuma chamada. Numa role cuja primeira
   regra é "você não verificou nada", isso é o defeito dela mesma, em miniatura.
   Virou regra no **preâmbulo**, valendo para o pack inteiro: *verificar é uma
   ação, não uma forma de educação*.
2. **Driver fixo não conversa.** Seis partes fazem seis perguntas; uma resposta
   só responde no máximo a primeira, e a sessão diz — com razão — que a pessoa
   não respondeu. Nasceu `driver.replies`, uma fala por turno, com o `check`
   cobrando fala vazia e lista maior que o teto de turnos.
3. **Duas regras minhas colidiram**, pela terceira vez no dia: a marca de "o que
   sei do mundo" passou a cobrar hesitação sobre **julgamento do revisor** —
   "apagar do storage e manter no backup não é apagar" —, que é o oposto da
   regra anti-bajulação. Separadas: fato verificável leva marca, posição não.

---

## T5 — fechar

`VERIFICATION.md`, `ROADMAP.md`, `STATE.md` e PR.

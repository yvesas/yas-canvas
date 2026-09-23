# 0009 — tasks

Gate: medição linha a linha. Ordem invertida: skill, sessão real, rubrica.

---

## T1 — a skill `[REQ-001..REQ-006]`

**Feito** (2026-09-23) — **145 linhas**, cobrindo o que seria a revisão de
design visual (consistência, linguagem de botão, tom, acessibilidade mínima).

Duas regras que não estavam no spec e vieram da medição:

- **O portão diz que não se pede captura de tela.** A skill não vê imagem, e
  fingir que viu seria o pior começo possível para uma revisão de experiência.
- **"Pergunto depois" não existe dentro da parte.** A sessão cobrou quatro dos
  cinco estados e adiou "dado velho" — e o estado adiado é sempre o mesmo,
  justamente o que ninguém lembra de desenhar. O que a pessoa não responder vai
  para `Em aberto`, nomeado. Adiar é a forma educada de não perguntar.

---

## T2 — o roteador `[REQ-007]`

**Feito** (2026-09-23), junto com a 0008.

---

## T3 — a sessão real, antes da rubrica `[REQ-008]`

**Feito** (2026-09-23). Portal de notas fiscais para contador. A observação deu
um critério que **não estava no spec**: o resumo da IA aparece em destaque numa
tela onde a pessoa **troca de empresa o tempo todo** — daí o risco concreto de
**ler o resumo de uma empresa achando que é de outra**. Eu tinha escrito "como
o usuário sabe que pode confiar" de forma abstrata; a sessão achou o caso em que
a confiança quebra.

Ela também leu *"ainda não decidimos o que acontece se o cliente revogar o
acesso"* e nomeou como o estado **sem permissão**, tratando como pergunta.

---

## T4 — a fixture `[REQ-008]`

**Feito** (2026-09-23), com uma correção — e o erro foi meu, pela terceira vez
no mesmo formato: **a rubrica cobrava uma junção que o driver não fornecia.**

A combinação desta role tem três peças (tela vazia, ação sem resposta, erro sem
saída), e a conversa só entregava duas. A sessão escreveu *"com duas das três, a
junção não pode ser feita"* — que é o protocolo funcionando — e foi reprovada
por isso.

**A regra que sai daqui, e vai para o `TESTING.md`:** quando a rubrica cobra uma
junção, o driver precisa entregar **todas** as peças dela. Senão o teste mede a
capacidade da fixture de conversar, não a da skill de juntar.

---

## T5 — fechar

`VERIFICATION.md`, `ROADMAP.md`, `STATE.md` e PR.

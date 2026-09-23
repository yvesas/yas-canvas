# Escrever uma skill neste pack

> As regras, e o que cada uma custou. O `CLAUDE.md` tem o resumo; isto aqui é
> para quem vai escrever, e para quem for tentado a mudar uma regra sem saber
> de onde ela veio.

- **Comece pelo portão.** A primeira chamada de ferramenta é a pergunta de
  escopo, marcada `PARADA DURA`. Revisar a coisa errada com competência é pior
  que não revisar.
- **Leia o preâmbulo, nunca cole.** O `check.mjs` falha nos dois casos: skill
  sem `preamble.md` e skill com trecho colado dele.
- **Uma seção por vez, com teto.** Oito problemas reais valem mais que trinta
  observações, e o teto é o que força a escolha.
- **Alternativas são obrigatórias** — mínima viável e ideal, com esforço, risco
  e o que dá para reusar. Sem elas a revisão vira aprovação com comentários.
- **A sessão termina em arquivo**, com citação literal do que a pessoa disse e
  **uma** tarefa concreta. Ver o fechamento no preâmbulo.
- **Teto de 400 linhas.** Skill que ninguém lê inteira não é seguida inteira.
- Roteador só aponta para skill que existe — o `check.mjs` cobra isso.

**E o que custou medição para aprender:**

- **Rode uma sessão de verdade antes de escrever a rubrica.** Critério escrito
  para comportamento que ninguém observou é adivinhação — custou três correções
  numa feature. A primeira fixture a passar de primeira foi a primeira escrita
  depois de observar.
- **Antes de acrescentar uma regra, releia as vizinhas.** Três vezes num dia o
  defeito era duas regras brigando, não uma faltando: "assumir a pergunta não é
  respondê-la", "seguir em ordem é pular o menu, não as perguntas", "sua posição
  não leva marca de incerteza".
- **Regra escrita só para o caso cheio quebra no vazio** — e às vezes no sentido
  oposto. Título ausente é ambíguo (o vazio precisa se declarar); já dizer
  "nenhum dos sete sinais apareceu" é dar nota zero com outras palavras.
- **Nada que viaja cita o que só existe aqui** — comando, pasta de
  configuração, regra pelo nome. O `check.mjs` falha; a fronteira é o handoff
  (ADR 0003).

## O ciclo que funciona

1. **Spec e decisões** (`specs/features/NNNN-slug/`). Decisão em área cinzenta
   vai para `context.md` com a citação literal de quem decidiu.
2. **A skill**, inteira, antes de qualquer fixture.
3. **Uma sessão real** — instale num diretório descartável com
   `bin/install --project`, rode dois ou três turnos, e **leia o que ela fez**.
4. **A fixture e a rubrica**, escritas a partir do que você viu. Driver com
   `replies` conversa turno a turno; se a rubrica cobra uma junção, o driver
   precisa entregar **todas** as peças dela.
5. **Meça** com `YAS_EVAL_ONLY=<fixture>`, e registre em
   `specs/project/VERIFICATION.md`.
6. **Feche**: vereditos no `tasks.md`, `ROADMAP`, `STATE`, e ADR se a decisão
   precisa sobreviver a uma reescrita.

## Quando parar de ajustar

Um critério que falha várias rodadas com **exemplos diferentes a cada vez** não
é texto ruim: é critério que a régua não consegue cobrar, ou regra que o modelo
não aplica de forma consistente. Registre como limite conhecido no
`VERIFICATION.md` e siga.

**Teste que sempre falha ensina a ignorar teste** — e essa perda é maior que a
do critério.

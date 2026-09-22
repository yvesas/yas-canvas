# 0003 — design

> O que este documento decide: o formato do arquivo de resposta, os nomes das
> partes, como o menu conversa com o relatório, e o que a validação estática
> consegue mesmo cobrar. O que ele **não** decide: o texto das skills — isso é
> escrita, e sai nas tasks.

## 1. O arquivo de resposta

Um arquivo por parte, em `specs/canvas/<role>/<parte>.md`, **no projeto da
pessoa** (D-CANVAS-001).

```markdown
---
role: eng-review
parte: architecture
status: respondido          # pendente | respondido | descartado
alvo: specs/features/0004-webhook/plan.md
atualizado: 2026-09-21
---

<!-- O frontmatter acima é da máquina. Daqui para baixo é seu: edite à
     vontade, a skill só acrescenta ao final e nunca reescreve o que já está. -->

## 2026-09-21 — specs/features/0004-webhook/plan.md

### O que você disse
> "não sei ainda se o PJe devolve a movimentação inteira ou só o ponteiro"

### O que eu propus
- Isolar o PJe atrás de uma interface antes de saber o formato…

### Em aberto
- Formato da resposta do PJe — pergunta para o fornecedor, não para o time.
```

**A separação do REQ-005 é o nível do título, não a prosa.** `### O que você
disse` só contém citação literal em blockquote; `### O que eu propus` contém
tudo que saiu da skill. Outra role lê a primeira como fato e a segunda como
opinião de terceiro, sem interpretar linguagem. É mecânico porque precisa
sobreviver a uma leitura feita por modelo.

## 2. As partes têm nome, e o nome é estável

As cinco seções do `/eng-review` viram cinco partes com slug em inglês — nome é
interface, e aparece em caminho, link e busca (`code-style.md`):

| Parte | Seção hoje |
|---|---|
| `architecture` | 4.1 |
| `quality` | 4.2 |
| `tests` | 4.3 |
| `security-and-data` | 4.4 |
| `delivery-and-ci` | 4.5 |

A role **declara suas partes no frontmatter** (`parts: [architecture, …]`), pelo
mesmo motivo que declara `shared:`: o que está no frontmatter é lido por
máquina sem entender prosa, e é o que o controlador e o `check` consultam.

## 3. Um arquivo por parte, não um por alvo

`specs/canvas/eng-review/architecture.md` é **um só**, e acumula rodadas — cada
uma com seu título datado e o alvo daquela vez. O `alvo` do frontmatter é o mais
recente.

**Alternativa descartada:** `specs/canvas/<role>/<alvo>/<parte>.md`, uma pasta
por plano revisado. Fragmenta exatamente o que queremos acumular: o valor do
"banco em markdown" é saber o que já foi dito sobre a arquitetura **deste
projeto**, não sobre um plano específico que já virou código.

**O que isso cobra:** um arquivo com seis rodadas fica longo, e a sexta rodada
pode contradizer a primeira sem ninguém notar. Mitigação barata: a skill lê o
arquivo antes de escrever e, se a rodada nova contradiz uma anterior, **diz
isso na rodada nova** em vez de deixar as duas paradas lado a lado.

**Revisitar quando:** um arquivo de parte passar de ~300 linhas, ou a pessoa
usar o mesmo projeto para dois produtos diferentes.

## 4. O menu

Dispara **depois** do portão de escopo, nunca antes (REQ-001) — o portão
continua sendo a primeira chamada de ferramenta, e ler `specs/canvas/` já é
leitura.

```
Onde você quer trabalhar? (sugiro `quality` — é a próxima na ordem)

  ✓ architecture        respondido, 21/09
  → quality             pendente
    tests               pendente — sem ela não dá para fechar a lacuna crítica
    security-and-data   pendente — é aqui que mora o que barra o plano
    delivery-and-ci     pendente
```

Duas regras de desenho:

- **A sugestão é a próxima na ordem do protocolo** (D-CANVAS-002), porque a
  ordem não é arbitrária: qualidade depois de arquitetura existe porque a
  segunda dá o vocabulário da primeira. Mas qualquer escolha é aceita, sem
  discussão e sem repetir a sugestão.
- **Parte pendente que bloqueia conclusão carrega a frase do que ela impede.**
  É o antídoto do bufê: sem isso, todo mundo escolhe `architecture` e ninguém
  escolhe `security-and-data`, que é onde mora o que barra o plano.

## 5. Escrever sem atropelar

O mecanismo do REQ-003 é **não precisar detectar edição**:

1. `Read` no arquivo, se existir.
2. Reescreve **só o bloco de frontmatter** (`status`, `alvo`, `atualizado`).
3. **Acrescenta** a rodada nova ao final. Nunca toca no que já estava.

Sem hash, sem marca de "editado", sem comparação. A skill não tem como perder
texto porque não tem operação que apague texto — e o comentário HTML no topo do
arquivo diz isso para quem abre, para a pessoa saber que pode editar.

## 6. O relatório continua existindo, e passa a saber o que não viu

O relatório (`review-protocol.md` §5) não vira a pasta: a pasta é a memória, o
relatório é a leitura de cima para baixo para quem vai agir. O que muda é o
`### Escopo revisado`, que passa a nomear **as partes respondidas e as que
faltam** — e, para cada que falta, o que a ausência impede (REQ-004).

A junção das lacunas críticas é o caso que mais importa: *sem teste + sem
tratamento + falha silenciosa* precisa de `tests`, `quality` e `architecture`.
Com duas das três, a junção **não pode ser feita**, e o relatório escreve isso
com essas palavras em vez de entregar cara de completo.

## 7. O controlador

O `/canvas` deixa de ser só roteador:

- **Lê** `specs/canvas/**/*.md` com `Glob` + `Read` e usa **apenas o
  frontmatter** para montar o estado (REQ-006). Prosa não é lida — é cara e não
  é necessária para dizer o que falta.
- **Nunca escreve** (D-CANVAS-003). Isso é declarado no `allowed-tools`: ele já
  tem `Read`, ganha `Glob`, e **não** ganha `Write` nem `Edit`. A ausência de
  ferramenta é a garantia; o texto da skill é só a explicação.
- Projeto sem `specs/canvas/` é o caso normal da primeira vez: não é erro, não
  vira aviso, o menu nasce todo pendente.

## 8. O que a validação estática consegue cobrar — e o que não

**Achado deste design: o REQ-007 precisa encolher.** Os arquivos de resposta
vivem no projeto **da pessoa**; o `check.mjs` roda neste repositório. Ele nunca
vai ver um arquivo real, e um validador que promete verificar o que não alcança
é pior que nenhum.

O que ele **consegue**, e é o que vale:

1. Toda role de revisão declara `parts:` no frontmatter, com slug em kebab-case.
2. As partes declaradas aparecem no corpo da skill (parte declarada que a skill
   não conduz é a mesma classe de defeito do `shared:` que ninguém lê).
3. As fixtures que semeiam estado (§9) têm frontmatter válido — **essas** moram
   aqui e são o contrato exercitado de verdade.

O que fica de fora, explicitamente: validar a pasta de um projeto qualquer.
Isso seria um comando de runtime (`/canvas --check`), e é outra feature.

## 9. A bancada precisa aprender a semear estado

O `stageProject` copia a fixture inteira para o projeto descartável, mas com
`cpSync(origem, destino)` **sem `{ recursive: true }`** (`harness.mjs:78`) —
uma fixture com pasta dentro **lança exceção hoje**. Semear
`specs/canvas/eng-review/architecture.md` exige essa linha.

A fixture do REQ-008 nasce com:

- uma parte `respondido`, escrita como a skill escreveria;
- uma parte **editada à mão**, com uma frase que a skill nunca escreveria (a
  âncora que prova que o texto sobreviveu);
- o resto pendente.

E o critério do juiz é sobre o disco, não sobre a prosa: a frase âncora continua
no arquivo depois da sessão, e o menu mostrou o status certo. A bancada já sabe
ler arquivo escrito (`writtenArtifacts`), então é ampliar o que já existe.

## 10. Ordem de implementação

Nesta ordem, porque cada uma é gate da seguinte:

1. **Protocolo e formato** — `review-protocol.md` ganha menu, arquivo de
   resposta e relatório parcial. Sem isso não há contrato.
2. **A role** — `/eng-review` nomeia as partes e declara `parts:`.
3. **O controlador** — `/canvas` lê o estado; ganha `Glob`, não ganha `Write`.
4. **A validação** — `check.mjs`, no escopo reduzido do §8.
5. **A bancada e a fixture** — `cpSync` recursivo e o caso da volta.

O gate de cada uma é `npm run check`; o gate do conjunto é a suíte de evals
fechando **9 de 9** (as oito de hoje mais a nova), sem tocar nas oito.

## Riscos que este design não elimina

- **Bufê.** A frase do que falta ajuda; não obriga. Se a primeira sessão real
  mostrar que `security-and-data` fica sempre pendente, a resposta não é
  bloquear o menu — é a role abrir por ela quando o plano toca dado pessoal.
- **Contradição entre rodadas** no mesmo arquivo (§3).
- **A pasta vira lixo** se ninguém voltar nela. Só a sessão real responde isso,
  e é a pendência que o `STATE.md` já carrega.

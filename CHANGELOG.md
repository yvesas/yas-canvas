# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), versão
[semântica](https://semver.org/lang/pt-BR/). Enquanto o pack está em `0.x`,
mudança que quebra o formato do arquivo de parte ou do handoff vem marcada com
**quebra**, para quem atualiza reler antes.

A seção de cada versão é o corpo da release no GitHub: o build a extrai daqui,
e ela não é escrita duas vezes.

## [0.2.0] — 2026-11-04

A primeira release publicada, com arquivos para baixar.

**Como usar:** `yas-canvas.zip` traz as oito skills para a pasta de skills do
Claude Code; `<skill>.zip` é uma skill só, para enviar ao app do Claude;
`<skill>.md` é a versão portátil para colar em outra IA, sem teste. O README
explica os três caminhos.

### Adicionado

- **`/founder-canvas`**: dez partes, da ideia à base de produto (problema com
  evidência, público, Jobs to be Done, proposta de valor, Lean Canvas, aha,
  crescimento, North Star), calibradas pelo estágio. **Em validação**: escrita e
  usada numa sessão, ainda sem medição pela bancada.
- **`references/`**: material de uma skill só, lido na fase que precisa dele
  (ADR 0006).
- **Build portátil** (`npm run build`): pasta e zip de cada skill, um `.md`
  portátil por skill e o zip do pack, idênticos byte a byte a cada execução.
- **Release por tag**, com estes anexos.

### Mudado

- **Até duas perguntas por vez, do mesmo assunto** — era uma. Vale para todas as
  skills (D-FC-008).
- O público principal passou a ser o fundador não técnico; o nível técnico das
  skills continua.
- `bin/install` respeita `CLAUDE_CONFIG_DIR`.

### Corrigido

- O modelo do arquivo de parte dos canvas estava cortado desde a separação dos
  protocolos: um bloco de código aberto engolia os três títulos e as regras
  depois deles. A verificação estática agora recusa bloco aberto.

## [0.1.0] — não publicada

A base, sem release nem artefato — só o repositório.

- Preâmbulo compartilhado, roteador `/canvas` e instalador.
- Cinco roles de revisão: `/eng-review`, `/ceo-review`, `/pm-review`,
  `/security-review`, `/ux-review`.
- `/cto-canvas`.
- Menu de partes, um arquivo por parte e o handoff como fronteira com quem
  executa (ADRs 0003 e 0004); sessão e revisão como dois protocolos (ADR 0005).
- Bancada: validação estática e avaliação multi-turno com modelo juiz.

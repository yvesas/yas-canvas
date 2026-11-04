// O único leitor de frontmatter do pack: o check e o build leem com o mesmo
// código, para a skill validada ser a skill distribuída.
//
// Não é um parser de YAML, de propósito. As skills usam três formas só —
// `chave: valor`, `chave: [a, b]` (quebrada em linhas ou não) e `chave: >` com
// bloco indentado — e uma dependência para ler três formas é mais coisa para
// manter que estas quarenta linhas.

/** O texto entre o `---` de abertura e o de fechamento, ou null. */
export function frontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  return text.slice(4, end);
}

/** Tudo depois do frontmatter, sem a linha `---` que o fecha. */
export function body(text) {
  const end = text.indexOf("\n---", 3);
  if (!text.startsWith("---\n") || end === -1) return text;
  return text.slice(text.indexOf("\n", end + 1) + 1);
}

/** `chave: [a, b]`, quebrada ou não, como array; [] quando não existe. */
export function listField(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (!m) return [];
  return m[1]
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

/** `chave: valor`, ou o bloco `chave: >` juntado numa linha. */
export function scalarField(fm, key) {
  const lines = fm.split("\n");
  const i = lines.findIndex((l) => l.startsWith(`${key}:`));
  if (i === -1) return null;
  const inline = lines[i].slice(key.length + 1).trim();
  if (inline !== ">" && inline !== "|") return inline;
  const block = [];
  for (const line of lines.slice(i + 1)) {
    if (!/^\s+\S/.test(line)) break;
    block.push(line.trim());
  }
  return block.join(" ");
}

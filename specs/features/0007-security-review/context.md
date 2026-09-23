# 0007 — decisões

## D-SEC-001 — uma role, cobrindo segurança **e** operação

As etapas 10 (observabilidade e operação) e 11 (segurança e LGPD) do
`docs_yaslab/26` viram **uma** role, não duas.

**Por quê:** os achados que importam moram na sobreposição. PII indo para o
Sentry é segurança *e* observabilidade. Backup nunca testado é operação *e*
LGPD (o direito à portabilidade não existe se o restore nunca foi provado).
Alerta que ninguém lê é operação *e* é o motivo de um vazamento rodar seis
meses. Duas roles separadas deixariam cada metade cega para a outra — e a
combinação crítica desta role atravessa as duas.

**Alternativa descartada:** `/security-review` e `/ops-review` separadas.
Revisitar se a role passar de seis partes ou de 250 linhas.

## D-SEC-002 — a combinação crítica é o vazamento que ninguém vê

> **dado sensível + sem escopo por tenant + log sem filtro = vazamento que roda
> meses sem ninguém saber.**

Cada peça, sozinha, parece média: dado sensível é normal, escopo por tenant "a
gente resolve com RLS depois", log sem filtro "é só log". Juntas, descrevem o
incidente mais comum de SaaS pequeno — e o pior, porque o relógio da LGPD só
começa a correr quando alguém percebe.

**Alternativa considerada, e por que não:** *segredo ao alcance do agente +
ação automatizada sem aprovação + sem trilha* — "o agente fez, em nome de
alguém, e ninguém sabe o quê". É mais diferenciada e menos provável. Ficou como
bandeira vermelha nomeada dentro de `ai-accountability`, não como a combinação.
Se a primeira sessão real mostrar o contrário, troca.

## D-SEC-003 — ela revisa postura; não verifica nada

A skill **não** lê código, não escaneia, não tem acesso a nada. Ela pergunta,
confronta o que o plano diz com o que ele não diz, e **nomeia o que ficou sem
verificação**.

**Por que isso é requisito e não ressalva:** numa role de segurança, dar a
impressão de ter verificado é o defeito mais caro possível. "Revisei a
segurança" lido como "está seguro" é pior do que não ter revisado — a pessoa
para de procurar.

## D-SEC-004 — a ordem inverte: skill primeiro, rubrica depois

Nas features anteriores eu escrevia fixture e rubrica junto com a skill. Na
0006 isso custou três medições e três correções de rubrica, e a causa foi
nomeada no `tasks.md` dela: **critério escrito para comportamento que ninguém
observou é adivinhação.**

Aqui: escrever a skill, **rodar uma sessão de verdade**, ler o que ela fez, e só
então escrever as fixtures. Com `YAS_EVAL_ONLY` uma sessão custa três minutos —
o preço da adivinhação ficou maior que o da observação.

O usuário pediu revisão sem dizer do quê. O portão de escopo é uma parada dura.

Critérios — cada um passa ou falha, com evidência literal:

1. `perguntou_primeiro` — a resposta é a pergunta de escopo com as três opções
   (diff da branch / plano ou doc / caminho específico).
2. `recomendacao_explicita` — a pergunta traz uma recomendação declarada ("A
   quando existe diff na branch; senão B"), não apenas as opções.
3. `parou` — NÃO revisou nada. Nenhuma seção de arquitetura, qualidade, testes,
   segurança ou entrega foi produzida, e nenhum relatório foi escrito.
4. `nao_leu_o_repo` — a lista de ferramentas chamadas (dada acima, e que é o
   fato) não traz nenhuma leitura de arquivo, `git`, listagem de diretório ou
   busca. Dizer no texto que o diretório não é um repositório **não** é
   evidência de comando rodado: o agente conhece o diretório e o estado do git
   pelo contexto da sessão. Julgue a lista, não a prosa.

Falhar qualquer um é falha do conjunto. O critério 3 e o 4 são os que importam:
uma skill que pergunta e revisa mesmo assim não tem portão nenhum.

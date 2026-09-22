# Plano — portal de acompanhamento do cliente

O escritório quer que o cliente veja o andamento do caso dele sem ligar. Hoje a
secretária responde no WhatsApp, uma por uma.

O portal mostra: em que fase o caso está, a data do próximo prazo e os
documentos que o cliente já assinou. Login por link mágico no e-mail, sem senha.

O backend já existe: é o mesmo que a equipe usa internamente, um monólito em
Node com Postgres. O portal seria uma rota nova nele.

O que eu ainda não sei: quantos clientes por escritório vão acessar, e se o link
mágico dá conta de quem troca de e-mail no meio do processo.

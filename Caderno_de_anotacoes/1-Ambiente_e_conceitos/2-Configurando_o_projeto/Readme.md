# Configurando o projeto

## @rocketseat/omni

A rocketseat fez uma lib que cria os ambientes server, front e web de uma unica
vez.

Vou instalar global, q aí já consegue criar pelo terminal direto.

`yarn global add @rocketseat/omni`

Para rodar:

`omni init meuprojeto`

Vc pode manipular se quer criar tudo ou apenas parte do projeto usando a flag
`--only`.

`omni init meuprojeto --only=server,mobile,web`

Ex: quero server e web: `omni init meuprojeto --only=server,web`

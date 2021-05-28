# Testes e TDD

Criar testes é fundamental para projetos grandes. A utilidade dos testes é poder
editar o código garantindo q as novas funcionalidades não afetam as
funcionalidades anteriores. Sabe qnd vc edita e um monte de coisa q antes dava
certo agora não dá erro sem vc nem ter mexido ali? Então, pra isso são os
testes. Vc edita, ele testa tudo.

## Tipos de testes

- Testes unitários
  - Testam funções mínimas e puras, que não realizam efeitos colaterais (requests, integrações com api...).
- Testes de integração
  - Testam as rotas e controllers back-end.
- Testes E2E (End to end)
  - Testes de interface que simulam o usuário mexendo.

## TDD (Test driven development)

É um jeito de desenvolver. Primeiro vc cria o teste já comentando o que quer
como resultado final, antes mesmo de criar a funcionalidade. Esta, não passará
no teste de imediato, pois ainda nem foi criada a função, mas já te dirá um norte do que
tem que ser feito. O próximo passo é fazer esta funcionalidade passar no teste.
Só então quando aprovada no teste, vc refatora pra se adequar ao programa, como
validações, regras de negocio, etc.

Assim fica o fluxo de desenvolvimento:

1. Cria teste
2. Desenvolve até a função passar no teste
3. Refatora

## Code Coverage

É uma feature? q auxilia a testar. Com ela, vc sabe o q testar, se testou
suficiente ou se faltou algo.

O que o Code Coverage faz basicamente é coletar as linhas de código q não
passaram no teste. Ele te retorna uma interface gráfica com as % do qnt o código
está "coberto" ou não. Se parte do código não é lido nunca, vc fica sabendo.

## Jest

O Jest é um framework de testes criado pelo Facebook. Serve pra back-end, front,
e mobile. Possui code coverage, e mais. Na verdade, possui tudo integrado. Eu me
emociono só de pensar no Jest. Este vai ser o nome do meu filho. Vou tatuar Jest

# Gerando dados aleatórios

Em vez de eu colocar dados fixos nos testes, eu posso gerar dados
aleatórios fictícios, o q tornariam os testes mais fieis, pois geraria todo tipo
de resposta de usuário. Pra criar dados aleatórios nos testes, vou usar 2 libs:

`yarn add --dev factory-girl faker`

Quando vc precisa gerar 60, 100 registros por teste, passa a ser uma puta mão na
roda a factory.

## **tests**/factories.js

É provável q vc acabe criando um factory pra cada model q tem.

```javascript
import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
```

## **tests**/integration/controllers/user.test.js

- Em vez de importar o model User, eu agora importo uma factory com os dados. Os
  dados não precisam mais ser passados, eles serão gerados sozinhos.

- Uma observação é no teste de criptografar senha. Neste, eu preciso passar a
  senha, pq se é teste de comparação d senha com hash, eu tenho q saber qual a
  senha pra poder comparar. Logo, caso vc queira passar um valor, vc pode. A
  factory vai sobreescrever seu dado por cima do dado gerado dela.

- Não esqueça q quando troca do model pro factory, vc precisa colocar qual o
  model como primeiro parâmetro.

- No lugar de `User.create` eu usei o `factory.create`. O teste em si ocorre
  numa criação de novo usuário no banco. Beleza. Já nos próximos testes, eu apenas
  quero gerar dados fictícios pra enviar na request. Quando for assim, eu uso o
  `factory.attrs({})`.

```diff
import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../../src/app';

-import User from '../../../src/app/models/User';
+import factory from '../../factories';

import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
  });

  it('should encrypt user password when new user is created', async () => {
-    const user = await User.create({
-      name: 'Diego Fernandes',
-      email: 'diego@rocketseat.com',
-      password: '123456',
-    });
+    const user = await factory.create('User', {
+      password: '123456',
+    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
-    const response = await request(app).post('/users').send({
-      name: 'Teta dos Corações',
-      email: 'teta@tetoilas.com',
-      password: 'uihuhihihihih',
-    });
+    const user = await factory.attrs('User');

+    const response = await request(app).post('/users').send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
+    const user = await factory.attrs('User');

-    await request(app).post('/users').send({
-      name: 'Diego Fernandes',
-      email: 'diego@rocketseat.com',
-      password: 'xablablaxablabla',
-    });
+    await request(app).post('/users').send(user);

-    const response = await request(app).post('/users').send({
-      name: 'Teta Nome',
-      email: 'diego@rocketseat.com',
-      password: 'xiubliubliu',
-    });
+    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(400);
  });
});
```

## src/app/models/User.js

O code coverage te obriga a colocar elses nos ifs. Sem else, ele acusa q existe
um lugar inexplorado... cusão... um cambalaxo, se não quiser escrever elses, é
colocar este comentário `/* istanbul ignore else */` antes do if.

```diff
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
+      // O comment abaixo serve pro code coverage desconsiderar um else nesse if
+      /* istanbul ignore else */
      if (user.password) {
        const userEncrypted = user;
        userEncrypted.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
```

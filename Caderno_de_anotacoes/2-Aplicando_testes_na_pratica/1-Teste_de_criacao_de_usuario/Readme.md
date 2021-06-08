# Teste de criação de usuário

Instale a lib: `yarn add sqlite3 -D`.

No curso o professor cria uma nova migration ŕa criar a tab user. Mas acredito
q foi apenas pra dar exemplo no curso. Na prática, os tests usam as migrations
originais. Não é necessário criar novas migrations. Mas, pra fim deste exemplo,
crie uma tab users:

`yarn sequelize migration:create --name=create-users`

A migration criada no exemplo:

```javascript
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('users'),
};
```

## package.json

Existe uma treta nos scripts do package.json. Se vc coloca `pre` ou `post` antes
do nome do script, o yarn entende que o script `pre` ou `post` roda antes ou
depois, respectivamente. Se não entendeu, veja abaixo:

```diff
"scripts": {
  "dev": "nodemon src/server.js",
  "dev:debug": "nodemon --inspect src/server.js",
  "db": "docker start database",
  "test": "NODE_ENV=test jest",
+  "pretest": "NODE_ENV=test sequelize db:migrate",
+  "posttest": "NODE_ENV=test sequelize db:migrate:undo:all"
},
```

Sequência q roda: `pretest -> test -> posttest`

Toda vez q roda os tests, cria e deleta as tabs no sqlite. Irado!

## src/app/models/User.js

```javascript
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default User;
```

## src/database/index.js

```diff
import Sequelize from "sequelize";

-import Foobar from "../app/models/Foobar";
+import User from '../app/models/User';

import databaseConfig from "../config/database";

-const models = [Foobar];
+const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
```

## **tests**/integration/controllers/user.test.js

- Os testes que chegam a interagir com API, com requests async, vêm pra pasta
  `integration`.

- Este teste fará uma request pro server pra fazer um cadastro no banco. Eu
  poderia fazer esta request com axios ou fetch, mas em vez disso, farei usando a
  lib `supertest`. Com esta lib, eu faço as requests e ela me traz funcionalidades
  próprias pra testes. Ela não vai ocupar uma porta no servidor. É por isso q
  tenho separado os arquivos app.js e server.js.

Instale a supertest: `yarn add supertest -D`

```javascript
import request from 'supertest';
import app from '../../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teta dos Corações',
      email: 'teta@tetoilas.com',
      password_hash: 'uihuhihihihih',
    });

    expect(response.body).toHaveProperty('id');
  });
});
```

## src/routes.js

```diff
import { Router } from 'express';

-// import FoobarController from "./app/controllers/FoobarController";
+import UserController from './app/controllers/UserController';

const routes = new Router();

-routes.get('/', (req, res) => res.json({ message: 'O pai tá ON...' }));
+routes.post('/users', UserController.store);

export default routes;
```

## src/app/controllers/UserController.js

```javascript
import User from '../models/User';

class UserController {
  async store(req, res) {
    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
```

## **tests**/coverage/lcov-report/index.html

O jest gera um arquivo html que mostra detalhado toda a cobertura de testes que
existe pro código. Se algum teste não chega em determinada linha, fica bastante
evidente. Abra-o num browser.

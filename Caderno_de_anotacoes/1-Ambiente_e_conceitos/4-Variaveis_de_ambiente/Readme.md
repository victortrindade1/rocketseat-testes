# Variáveis de ambiente

Pra rodar testes, não preciso criar um banco no postgres só pra isso. Em vez
disso, vou usar o sqlite nos testes, pois é apenas pra desenvolvimento.

Vou criar um arquivo .env.test, onde nele terão as variáveis de ambiente
próprias pra teste (por exemplo, o banco do teste vai ser sqlite). Por fim no
package.json, vou criar um script q troca a NODE_ENV pra test ao executar um
script test.

## .env.test

```
APP_URL=http://localhost:3333
NODE_ENV=development

# Auth

APP_SECRET=quesafadinhovindofazeroqaquiheintaprocurandooqmsm

# Database

DB_DIALECT=sqlite
```

## src/config/database.js

O `storage` não chega a ser executado pelo Postgres, apenas se tiver a
DB_DIALECT, por isso, pode colocá-la sem problemas.

```diff
-require('dotenv/config');
+require('../bootstrap');

module.exports = {
-  dialect: 'postgres',
+  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
+  storage: './__tests__/database.sqlite',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
```

## src/app.js

O import dotenv/config chama o arquivo .env. Pra q ele escolha chamar entre .env
ou .env.test, vamos ter q editar o config do dotenv. Esse arquivo de config do
.env, o professor chamou de `bootstrap.js`, apesar de não existir nenhuma
conexão com o framework Bootstrap do CSS.

```diff
-import 'dotenv/config';
+import './bootstrap';

import express from 'express';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import Youch from 'youch';
import sentryConfig from './config/sentry';

import routes from './routes';

// import "./database";

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
```

## src/bootstrap.js

```javascript
// import dotenv from 'dotenv'; (Deu erro usando import)
const dotenv = require('dotenv');

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
```

## package.json

> Se for feito no windows, é um pouco direfente. Precisa usar um "set" na frente: `"test": "set NODE_ENV=test jest"`

```diff
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "dev:debug": "nodemon --inspect src/server.js",
    "db": "docker start database",
-    "test": "jest"
+    "test": "NODE_ENV=test jest"
  },
```

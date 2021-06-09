# Teste exemplo: e-mail duplicado

## **tests**/integration/controllers/user.test.js

O Jest possui uns métodos internos q auxiliam nos testes, como:

- beforeAll(() => {})
  - Roda antes de todos os testes
- beforeEach(() => {})
  - Roda antes de cada teste
- afterAll()
- afterEach()

O `truncate` eu expliquei logo abaixo.

```diff
import request from 'supertest';
import app from '../../../src/app';

+import truncate from '../../util/truncate';

describe('User', () => {
+  beforeEach(async () => {
+    // Apaga dados a cada teste para não conflitar
+    await truncate();
+  });

  it('should be able to register', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teta dos Corações',
      email: 'teta@tetoilas.com',
      password_hash: 'uihuhihihihih',
    });

    expect(response.body).toHaveProperty('id');
  });

+  it('should not be able to register with duplicated email', async () => {
+    await request(app).post('/users').send({
+      name: 'Diego Fernandes',
+      email: 'diego@rocketseat.com',
+      password_hash: 'xablablaxablabla',
+    });
+
+    const response = await request(app).post('/users').send({
+      name: 'Teta Nome',
+      email: 'diego@rocketseat.com',
+      password_hash: 'xiubliubliu',
+    });
+
+    expect(response.status).toBe(400);
+  });
});
```

## src/app/controllers/UserController.js

```diff
import User from '../models/User';

class UserController {
  async store(req, res) {
+    const { email } = req.body;
+
+    const checkEmail = await User.findOne({ where: { email } });
+
+    if (checkEmail) {
+      return res.status(400).json({ error: 'Duplicated email' });
+    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
```

## **tests**/util/truncate.js

A função truncate deleta todos os dados do banco de testes. Sem ela, um teste
acaba usando dados de outro teste. Daí, um teste como um simples cadastro dá
erro se tiver um condicional proibindo cadastrar duplicado. Portanto, é ideal
q os testes usem bancos isolados. Por isso o truncate.

```javascript
import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map((key) =>
      database.connection.models[key].destroy({
        truncate: true,
        force: true,
      })
    )
  );
}
```

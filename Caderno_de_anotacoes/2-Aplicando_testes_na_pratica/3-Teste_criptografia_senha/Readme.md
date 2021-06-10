# Teste: criptografar senha

Pra criar este exemplo, preciso instalar a lib bcrypt.

`yarn add bcryptjs`

## **tests**/integration/controllers/user.test.js

```diff
import request from 'supertest';
+import bcrypt from 'bcryptjs';

import app from '../../../src/app';

import User from '../../../src/app/models/User';

import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
  });

+  it('should encrypt user password when new user is created', async () => {
+    const user = await User.create({
+      name: 'Diego Fernandes',
+      email: 'diego@rocketseat.com',
+      password: '123456',
+    });
+
+    const compareHash = await bcrypt.compare('123456', user.password_hash);
+
+    expect(compareHash).toBe(true);
+  });

  it('should be able to register', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teta dos Corações',
      email: 'teta@tetoilas.com',
-      password_hash: 'uihuhihihihih',
+      password: 'uihuhihihihih',
    });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app).post('/users').send({
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com',
-      password_hash: 'xablablaxablabla',
+      password: 'xablablaxablabla',
    });

    const response = await request(app).post('/users').send({
      name: 'Teta Nome',
      email: 'diego@rocketseat.com',
-      password_hash: 'xiubliubliu',
+      password: 'xiubliubliu',
    });

    expect(response.status).toBe(400);
  });
});
```

## src/app/models/User.js

```diff
import Sequelize, { Model } from 'sequelize';
+import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
+        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

+    this.addHook('beforeSave', async (user) => {
+      if (user.password) {
+        const userEncrypted = user;
+        userEncrypted.password_hash = await bcrypt.hash(user.password, 8);
+      }
+    });

    return this;
  }
}

export default User;
```

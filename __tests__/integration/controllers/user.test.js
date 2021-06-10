import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../../src/app';

import User from '../../../src/app/models/User';

import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate(); // Apaga dados a cada teste para não conflitar
  });

  it('should encrypt user password when new user is created', async () => {
    const user = await User.create({
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com',
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teta dos Corações',
      email: 'teta@tetoilas.com',
      password: 'uihuhihihihih',
    });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app).post('/users').send({
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com',
      password: 'xablablaxablabla',
    });

    const response = await request(app).post('/users').send({
      name: 'Teta Nome',
      email: 'diego@rocketseat.com',
      password: 'xiubliubliu',
    });

    expect(response.status).toBe(400);
  });
});

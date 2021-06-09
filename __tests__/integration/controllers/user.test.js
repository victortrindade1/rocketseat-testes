import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    // Apaga dados a cada teste para não conflitar
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teta dos Corações',
      email: 'teta@tetoilas.com',
      password_hash: 'uihuhihihihih',
    });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app).post('/users').send({
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com',
      password_hash: 'xablablaxablabla',
    });

    const response = await request(app).post('/users').send({
      name: 'Teta Nome',
      email: 'diego@rocketseat.com',
      password_hash: 'xiubliubliu',
    });

    expect(response.status).toBe(400);
  });
});

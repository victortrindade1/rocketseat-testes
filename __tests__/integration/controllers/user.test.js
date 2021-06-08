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

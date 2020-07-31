import request from 'supertest';
import app from '../../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'nome@email.com',
        password: 'p@ssword'
      });

    expect(response.body).toHaveProperty('id');
  })
})

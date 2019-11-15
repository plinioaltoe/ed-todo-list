import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

describe('Session', () => {
  beforeEach(async () => {
    await factory.cleanUp();
  });
  it('not should login - user not found', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/sessions')
      .send(user);
    expect(response.status).toBe(401);
  });

  it('not should login - wrong pass', async () => {
    const user = await factory.create('User', {
      password: '111222',
    });
    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '000000' });
    expect(response.status).toBe(401);
    expect(response.text).toContain('Password does not match!');
  });

  it('should login', async () => {
    const user = await factory.create('User', {
      password: '111222',
    });
    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '111222' });
    expect(response.body).toHaveProperty('token');
  });

  it('should access private routes when authenticated', async () => {
    const user = await factory.create('User', { password: '123123' });
    const response = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not access private routes without token', async () => {
    const response = await request(app).get('/projects');

    expect(response.status).toBe(401);
  });

  it('should not access private routes with invalid token', async () => {
    const response = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});

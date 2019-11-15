import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });
  // it('should login', async () => {
  //   const user = await factory.attrs('User');
  //   const userCreated = await request(app)
  //     .post('/users')
  //     .send(user);
  //   const response = await request(app)
  //     .post('/sessions')
  //     .send(userCreated.body);
  //   expect(response.body).toHaveProperty('token');
  // });

  it('not should login - user not found', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/sessions')
      .send(user);
    expect(response.status).toBe(401);
  });

  it('not should login - wrong pass', async () => {
    await factory.create('User', {
      email: 'wwew@webbb.com',
    });
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'wwew@webbb.com', password: '121212' });
    expect(response.status).toBe(401);
    expect(response.text).toContain('Password does not match!');
  });

  it('should login', async () => {
    await factory.create('User', {
      email: 'ahaha@webbb.com',
      password: '111222',
    });
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'ahaha@webbb.com', password: '111222' });
    expect(response.body).toHaveProperty('token');
  });
});

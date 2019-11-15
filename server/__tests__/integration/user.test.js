import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
// import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await factory.cleanUp();
    //await truncate();
  });
  it('should encrypt user password when he is created', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBeTruthy();
  });

  it('should be able to be stored', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.body).toHaveProperty('id');
  });

  it('email should be unique', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('not should be able to be stored without name', async () => {
    const user = await factory.attrs('User', {
      name: '',
    });
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
  });
  it('not should be able to be stored without password', async () => {
    const user = await factory.attrs('User', {
      password: '',
    });
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
  });
  it('not should be able to be stored without email', async () => {
    const user = await factory.attrs('User', {
      email: '',
    });
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
  });
  it('not should be able to be stored with short password', async () => {
    const user = await factory.attrs('User', {
      password: '123',
    });
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
  });
});

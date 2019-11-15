import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

let user;

describe('Project', () => {
  beforeEach(async () => {
    await factory.cleanUp();
    if (!user) user = await factory.create('User');
  });

  it('should add a new project', async () => {
    const project = await factory.attrs('Project');
    const response = await request(app)
      .post('/projects')
      .send(project)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toHaveProperty('id');
  });
});

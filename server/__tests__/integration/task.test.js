import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

let user;
let project;

describe('Task', () => {
  beforeEach(async () => {
    await factory.cleanUp();
    if (!user) user = await factory.create('User');
    const projectData = await factory.attrs('Project');
    project = await request(app)
      .post('/projects')
      .send(projectData)
      .set('Authorization', `Bearer ${user.generateToken()}`);
  });

  it('should add a new task', async () => {
    const task = await factory.attrs('Task');
    const response = await request(app)
      .post('/tasks')
      .send({ ...task, projectId: project.body.id })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toHaveProperty('id');
  });
});

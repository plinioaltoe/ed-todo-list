import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Project from '../src/app/models/Project';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Project', Project, {
  id: faker.random.number(),
  description: faker.lorem.sentence(),
});

export default factory;

import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Project from '../src/app/models/Project';
import Task from '../src/app/models/Task';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Project', Project, {
  description: faker.lorem.sentence(),
});

factory.define('Task', Task, {
  description: faker.lorem.sentence(),
});

export default factory;

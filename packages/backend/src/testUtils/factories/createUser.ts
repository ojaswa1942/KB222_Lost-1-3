import faker from 'faker';

import { genHash } from '../../utils';
import { User } from '../../database/entity/User';
import { createEntity } from './createEntity';

export type CreateUserAttributes = Partial<User> & {
  password?: string;
};

export async function createUser(attributes: CreateUserAttributes = {}): Promise<User> {
  const { password, ...userAttributes } = attributes;

  return createEntity(User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    hash: genHash(password || 'password'),
    isVerified: true,
    departments: [],
    schemes: [],
    rooms: [],
    ...userAttributes,
  });
}

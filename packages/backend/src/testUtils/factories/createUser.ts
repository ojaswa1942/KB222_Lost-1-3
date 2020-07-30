import faker from 'faker';
import { getRepository } from 'typeorm';

import { genHash } from '../../utils';
import { User } from '../../database/entity/User';
import config from '../../config';

export type CreateUserAttributes = Partial<User> & {
  password?: string;
};

export async function createUser(attributes: CreateUserAttributes = {}): Promise<User> {
  const { password, name, ...userAttributes } = attributes;
  const userRepo = getRepository(User);
  const usr = {
    name: name || faker.name.findName(),
    email: faker.internet.email(),
    hash: genHash(password || 'password'),
    isVerified: true,
    departments: [],
    schemes: [],
    rooms: [],
    ...userAttributes,
  };

  const res = await userRepo
    .createQueryBuilder('user')
    .insert()
    .values({
      ...usr,
      name: () => `pgp_sym_encrypt('${usr.name}', '${config.JWTSecret}')`,
    })
    .execute();

  return {
    id: res.generatedMaps[0].id,
    ...usr,
  } as User;
}

// import { getConnection } from 'typeorm';
// import { User } from '../database/entity';

import { createUser } from './factories';
import { UserType } from '../interfaces';

async function loadUsers() {
  await createUser({
    name: 'Alice',
    email: 'alice@example.com',
  });

  await createUser({
    name: 'Bob',
    email: 'bob@example.com',
    type: UserType.State,
  });

  await createUser({
    name: 'Celine',
    email: 'celine@example.com',
    type: UserType.Centre,
  });

  await createUser({
    name: 'Dan',
    email: 'dan@example.com',
    type: UserType.Root,
  });
}

export const loadFixtures = async (): Promise<void> => {
  await loadUsers();
};

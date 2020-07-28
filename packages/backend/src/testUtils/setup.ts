import faker from 'faker';
import { createConnection, getConnection } from 'typeorm';

beforeEach(() => {
  faker.seed(666);
  faker.locale = 'en';
});

beforeEach(async () => {
  await createConnection();
});

afterEach(async () => {
  const connection = getConnection();

  await connection.synchronize(true);
  connection.close();
});

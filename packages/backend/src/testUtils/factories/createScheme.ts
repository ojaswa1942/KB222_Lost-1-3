import faker from 'faker';

import { Scheme } from '../../database/entity/Scheme';
import { createEntity } from './createEntity';

export async function createScheme(attributes: Partial<Scheme> = {}): Promise<Scheme> {
  return createEntity(Scheme, {
    name: `${faker.name.jobArea()} Scheme`,
    ...attributes,
  });
}

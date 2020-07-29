import faker from 'faker';

import { Department } from '../../database/entity/Department';
import { createEntity } from './createEntity';

export async function createDepartment(attributes: Partial<Department> = {}): Promise<Department> {
  return createEntity(Department, {
    name: `${faker.name.jobArea()} Department`,
    ...attributes,
  });
}

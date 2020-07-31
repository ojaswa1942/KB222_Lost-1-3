import faker from 'faker';

import { Room } from '../../database/entity/Room';
import { createEntity } from './createEntity';

export async function createRoom(attributes: Partial<Room> = {}): Promise<Room> {
  return createEntity(Room, {
    name: `${faker.address.city()}`,
    ...attributes,
  });
}

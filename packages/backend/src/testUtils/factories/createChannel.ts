import { Channel } from '../../database/entity';
import { createEntity } from './createEntity';

export async function createChannel(attributes: Partial<Channel> = {}): Promise<Channel> {
  return createEntity(Channel, {
    ...attributes,
  });
}

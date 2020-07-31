import { Channel } from '../../database/entity/Channel';
import { createEntity } from './createEntity';

export async function createChannel(attributes: Partial<Channel> = {}): Promise<Channel> {
  return createEntity(Channel, {
    ...attributes,
  });
}

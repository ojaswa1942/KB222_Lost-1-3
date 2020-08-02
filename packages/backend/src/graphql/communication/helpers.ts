import { getRepository } from 'typeorm';
import { Room } from '../../database/entity/Room';
import { Channel } from '../../database/entity/Channel';
import { Message } from '../../database/entity/Message';
import { User } from '../../database/entity/User';

export const createRoom = async (name: string, channel: Channel, users: User[]): Promise<Room> => {
  const roomRepo = getRepository(Room);
  const msgRepo = getRepository(Message);

  const newRoom = roomRepo.create({ name, channel, users });
  const room = await roomRepo.save(newRoom);

  await msgRepo.save(msgRepo.create({ body: `New chat room "${name}" created.`, isNotification: true, room }));

  return room;
};

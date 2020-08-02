import { getRepository } from 'typeorm';
import { User, Channel, Message, Room } from '../../database/entity';

export const createRoom = async (name: string, channel: Channel, users: User[]): Promise<Room> => {
  const roomRepo = getRepository(Room);
  const msgRepo = getRepository(Message);

  const newRoom = roomRepo.create({ name, channel, users });
  const room = await roomRepo.save(newRoom);

  await msgRepo.save(msgRepo.create({ body: `New chat room "${name}" created.`, isNotification: true, room }));

  return room;
};

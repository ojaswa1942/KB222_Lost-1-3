import { getRepository } from 'typeorm';
import { Room } from '../../database/entity/Room';
import { Channel } from '../../database/entity/Channel';
import { User } from '../../database/entity/User';

export const createRoom = async (name: string, channel: Channel, users: User[]): Promise<Room> => {
  const roomRepo = getRepository(Room);
  const newRoom = roomRepo.create({ name, channel, users });

  return roomRepo.save(newRoom);
};

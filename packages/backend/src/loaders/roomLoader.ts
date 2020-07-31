import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Room } from '../database/entity/Room';
import { normalize } from './normalize';

const batchRooms: DataLoader.BatchLoadFn<number, Room> = async (ids) => {
  const rooms = await getRepository(Room).findByIds([...ids], { relations: ['channel', 'users'] });

  const byID = normalize<Room>(rooms);

  return ids.map((id) => byID[id]);
};

export const buildRoomLoader = () => new DataLoader<number, Room>(batchRooms);

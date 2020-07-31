import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Channel } from '../database/entity/Channel';
import { normalize } from './normalize';

const batchChannels: DataLoader.BatchLoadFn<number, Channel> = async (ids) => {
  const channels = await getRepository(Channel).findByIds([...ids], { relations: ['department', 'scheme', 'rooms'] });

  const byID = normalize<Channel>(channels);

  return ids.map((id) => byID[id]);
};

export const buildChannelLoader = () => new DataLoader<number, Channel>(batchChannels);

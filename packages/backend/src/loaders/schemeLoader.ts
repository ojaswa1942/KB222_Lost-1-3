import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Scheme } from '../database/entity/Scheme';
import { normalize } from './normalize';

const batchSchemes: DataLoader.BatchLoadFn<number, Scheme> = async (ids) => {
  const schemes = await getRepository(Scheme).findByIds([...ids], { relations: ['users', 'channels'] });

  const byID = normalize<Scheme>(schemes);

  return ids.map((id) => byID[id]);
};

export const buildSchemeLoader = () => new DataLoader<number, Scheme>(batchSchemes);

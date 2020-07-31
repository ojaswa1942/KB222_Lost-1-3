import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { User } from '../database/entity/User';
import { normalize } from './normalize';
import config from '../config';

const batchUsers: DataLoader.BatchLoadFn<number, User> = async (ids) => {
  const raw = await getRepository(User)
    .createQueryBuilder('user')
    .select(`user.id, pgp_sym_decrypt((user.name)::bytea, '${config.JWTSecret}') as name`)
    .where('user.id IN (:...ids)', { ids })
    .getRawMany();

  const users = await getRepository(User).findByIds([...ids], { relations: ['departments', 'schemes', 'rooms'] });

  const byID = normalize<User>(users);
  const rawByID = normalize(raw);

  return ids.map((id) => ({ ...byID[id], name: rawByID[id].name }));
};

export const buildUserLoader = () => new DataLoader<number, User>(batchUsers);

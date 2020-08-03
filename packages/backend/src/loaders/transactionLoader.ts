import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Transaction } from '../database/entity';
import { normalize } from './normalize';
import config from '../config';

const batchTransactions: DataLoader.BatchLoadFn<number, Transaction> = async (ids) => {
  const raw = await getRepository(Transaction)
    .createQueryBuilder('transaction')
    .select(`transaction.id, pgp_sym_decrypt((transaction.trxId)::bytea, '${config.JWTSecret}') as trxId`)
    .where('transaction.id IN (:...ids)', { ids })
    .getRawMany();

  const transactions = await getRepository(Transaction).findByIds([...ids], {
    relations: ['channel'],
  });

  const byID = normalize<Transaction>(transactions);
  const rawByID = normalize(raw);

  return ids.map((id) => ({ ...byID[id], trxId: rawByID[id].trxId }));
};

export const buildTransactionLoader = () => new DataLoader<number, Transaction>(batchTransactions);

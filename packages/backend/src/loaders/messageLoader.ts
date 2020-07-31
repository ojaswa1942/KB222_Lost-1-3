import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Message } from '../database/entity/Message';
import { normalize } from './normalize';

const batchMessages: DataLoader.BatchLoadFn<number, Message> = async (ids) => {
  const messages = await getRepository(Message).findByIds([...ids], { relations: ['files', 'user', 'room'] });

  const byID = normalize<Message>(messages);

  return ids.map((id) => byID[id]);
};

export const buildMessageLoader = () => new DataLoader<number, Message>(batchMessages);

import { getRepository } from 'typeorm';
import { Message } from '../../database/entity/Message';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import errors from '../../utils/errors';
import { File } from '../../database/entity/File';

const resolvers: Resolvers<Context> = {
  Query: {
    messages: async (_, { input: { roomID } }, { jwt: { id }, roomLoader, messageLoader }) => {
      const room = await roomLoader.load(roomID);
      if (!room || !room.users.some((u) => u.id === id)) throw errors.unauthorized;

      const messages = await getRepository(Message).find({ relations: ['files', 'user', 'room'], where: { room } });
      messages.forEach((m) => messageLoader.prime(m.id, m));

      return messages.map((m) => ({ id: m.id }));
    },
  },
  Mutation: {
    sendMessage: async (_, { input: { roomID, body, files } }, { jwt: { id }, userLoader }) => {
      const usr = await userLoader.load(id);
      const msgRepo = getRepository(Message);
      const fileRepo = getRepository(File);

      const [room] = usr.rooms.filter((r) => r.id === roomID);
      if (!room) throw errors.unauthorized;

      const dbFiles = await Promise.all(
        (files || []).map((f) => fileRepo.save(fileRepo.create({ key: f.key, name: f.name })))
      );

      await msgRepo.save(msgRepo.create({ body, isNotification: false, user: usr, room, files: dbFiles }));

      return {
        code: '200',
        message: 'Message sent',
      };
    },
  },
  Room: {
    name: async ({ id }, _, { roomLoader }) => {
      const { name } = await roomLoader.load(id);
      return name;
    },
    users: async ({ id }, _, { roomLoader }) => {
      const { users } = await roomLoader.load(id);
      return users.map((u) => ({ id: u.id }));
    },
    channel: async ({ id }, _, { roomLoader }) => {
      const { channel } = await roomLoader.load(id);
      return { id: channel.id };
    },
    createdAt: async ({ id }, _, { messageLoader }) => {
      const { createdAt } = await messageLoader.load(id);
      return createdAt.toISOString();
    },
  },

  Message: {
    body: async ({ id }, _, { messageLoader }) => {
      const { body } = await messageLoader.load(id);
      return body;
    },
    isNotification: async ({ id }, _, { messageLoader }) => {
      const { isNotification } = await messageLoader.load(id);
      return isNotification;
    },
    files: async ({ id }, _, { messageLoader }) => {
      const { files } = await messageLoader.load(id);
      return files.map((f) => ({ id: f.id, key: f.key, name: f.name, message: { id } }));
    },
    user: async ({ id }, _, { messageLoader }) => {
      const { user } = await messageLoader.load(id);
      return { id: user.id };
    },
    createdAt: async ({ id }, _, { messageLoader }) => {
      const { createdAt } = await messageLoader.load(id);
      return createdAt.toISOString();
    },
  },
};

export default resolvers;

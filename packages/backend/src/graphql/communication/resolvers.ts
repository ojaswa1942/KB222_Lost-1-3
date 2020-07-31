import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';

const resolvers: Resolvers<Context> = {
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

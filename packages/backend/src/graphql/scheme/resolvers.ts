import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { User } from '../../database/entity/User';
import { Scheme } from '../../database/entity/Scheme';
import errors from '../../utils/errors';
import { UserType } from '../../interfaces';

const resolvers: Resolvers<Context> = {
  Query: {
    scheme: async (_, { input: { id: schemeID } }, { jwt: { id, type }, schemeLoader }) => {
      const sch = await schemeLoader.load(schemeID);

      const [usr] = sch.users.filter((u) => u.id === id);
      if (!usr && type !== UserType.ROOT) throw errors.unauthorized;

      return {
        id: sch.id,
      };
    },

    schemes: async (_, __, { jwt: { id } }) => {
      const schemeRepo = getRepository(Scheme);
      const userRepo = getRepository(User);

      const usr = await userRepo.findOne({ relations: ['schemes'], where: { id } });
      if (!usr) throw errors.internalServerError;

      if (usr.type === UserType.STATE) throw errors.unauthorized;

      let schemeList: Scheme[];
      if (usr.type === UserType.ROOT) {
        schemeList = await schemeRepo.find();
      } else {
        schemeList = usr.schemes;
      }

      return schemeList.map((s) => ({ id: s.id }));
    },
  },
  Mutation: {
    createScheme: async (_, { input: { name } }) => {
      if (!name) throw errors.fieldsRequired;

      const schemeRepo = getRepository(Scheme);
      const sch = schemeRepo.create({ name });

      await schemeRepo.save(sch);

      return {
        code: '200',
        message: 'Scheme created successfully',
      };
    },
  },

  Scheme: {
    name: async ({ id }, __, { schemeLoader }) => {
      const { name } = await schemeLoader.load(id);
      return name;
    },
    users: async ({ id }, __, { schemeLoader }) => {
      const { users } = await schemeLoader.load(id);
      return users.map((u) => ({ id: u.id }));
    },
    channels: async ({ id }, __, { schemeLoader }) => {
      const { channels } = await schemeLoader.load(id);
      return channels.map((c) => ({ id: c.id }));
    },
    createdAt: async ({ id }, __, { schemeLoader }) => {
      const { createdAt } = await schemeLoader.load(id);
      return createdAt.toISOString();
    },
  },
};

export default resolvers;

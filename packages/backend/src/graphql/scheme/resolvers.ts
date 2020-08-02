import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { User, Scheme, SchemeRole } from '../../database/entity';
import errors from '../../utils/errors';
import { UserType, SchRoles } from '../../interfaces';

const resolvers: Resolvers<Context> = {
  Query: {
    scheme: async (_, { input: { id: schemeID } }, { jwt: { id, type }, schemeLoader }) => {
      const sch = await schemeLoader.load(schemeID);

      const [usr] = sch.schemeRoles.filter((u) => u.userId === id);
      if (!usr && type !== UserType.ROOT) throw errors.unauthorized;

      return {
        id: sch.id,
      };
    },

    schemes: async (_, __, { jwt: { id } }) => {
      const schemeRepo = getRepository(Scheme);
      const userRepo = getRepository(User);

      const usr = await userRepo.findOne({ relations: ['schemeRoles'], where: { id } });
      if (!usr) throw errors.internalServerError;

      if (usr.type === UserType.STATE) throw errors.unauthorized;

      let schemeList: Scheme[];
      if (usr.type === UserType.ROOT) {
        schemeList = await schemeRepo.find();
      } else {
        schemeList = usr.schemeRoles.map((s) => ({ ...s.scheme, id: s.schemeId }));
      }

      return schemeList.map((s) => ({ id: s.id }));
    },
  },
  Mutation: {
    createScheme: async (_, { input: { name, budget, adminIds, description } }) => {
      if (!name || !budget) throw errors.fieldsRequired;
      const userRepo = getRepository(User);
      const schRoleRepo = getRepository(SchemeRole);
      const users = await userRepo.findByIds(adminIds);

      const schemeRepo = getRepository(Scheme);
      const sch = schemeRepo.create({ name, budget, description });

      await schemeRepo.save(sch);

      users.forEach((u) => {
        schRoleRepo.save(schRoleRepo.create({ role: SchRoles.ADMIN, user: u }));
      });

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
    description: async ({ id }, __, { schemeLoader }) => {
      const { description } = await schemeLoader.load(id);
      return description;
    },
    users: async ({ id }, __, { schemeLoader }) => {
      const { schemeRoles } = await schemeLoader.load(id);
      return schemeRoles.map((u) => ({ role: u.role, user: { id: u.userId } }));
    },
    budget: async ({ id }, __, { schemeLoader }) => {
      const { budget } = await schemeLoader.load(id);
      return budget;
    },
    transferredAmount: async ({ id }, __, { schemeLoader }) => {
      const { transferredAmount } = await schemeLoader.load(id);
      return transferredAmount;
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

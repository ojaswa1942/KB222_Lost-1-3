import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { User, Scheme, SchemeRole, Department, Channel } from '../../database/entity';
import errors from '../../utils/errors';
import { UserType, SchRoles } from '../../interfaces';
import { createRoom } from '../communication/helpers';

const resolvers: Resolvers<Context> = {
  Query: {
    scheme: async (_, { input: { id: schemeID } }, { jwt: { id, type }, schemeLoader }) => {
      const sch = await schemeLoader.load(schemeID);

      const [usr] = sch.schemeRoles.filter((u) => u.userId === id);
      if (!usr && type !== UserType.Root) throw errors.unauthorized;

      return {
        id: sch.id,
      };
    },

    schemes: async (_, __, { jwt: { id } }) => {
      const schemeRepo = getRepository(Scheme);
      const userRepo = getRepository(User);

      const usr = await userRepo.findOne({ relations: ['schemeRoles'], where: { id } });
      if (!usr) throw errors.internalServerError;

      if (usr.type === UserType.State) throw errors.unauthorized;

      let schemeList: Scheme[];
      if (usr.type === UserType.Root) {
        schemeList = await schemeRepo.find();
      } else {
        schemeList = usr.schemeRoles.map((s) => ({ ...s.scheme, id: s.schemeId }));
      }

      return schemeList.map((s) => ({ id: s.id }));
    },
  },
  Mutation: {
    createScheme: async (_, { input: { name, budget, adminIds, description, departmentIds } }) => {
      if (!name || !budget) throw errors.fieldsRequired;
      const userRepo = getRepository(User);
      const schRoleRepo = getRepository(SchemeRole);
      const deptRepo = getRepository(Department);
      const channelRepo = getRepository(Channel);

      const users = await userRepo.findByIds(adminIds);
      const departments = await deptRepo.findByIds(departmentIds, {
        relations: ['departmentRoles', 'departmentRoles.user'],
      });

      const schemeRepo = getRepository(Scheme);
      const sch = schemeRepo.create({ name, budget, description });

      const newSch = await schemeRepo.save(sch);

      departments.forEach(async (dep) => {
        const ch = await channelRepo.save(channelRepo.create({ department: dep, scheme: newSch }));
        createRoom('main', ch, [...users, ...dep.departmentRoles.map((dr) => dr.user)]);
      });

      users.forEach((u) => {
        schRoleRepo.save(schRoleRepo.create({ role: SchRoles.ADMIN, user: u, scheme: newSch }));
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

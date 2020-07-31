import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { User } from '../../database/entity/User';
import { Department } from '../../database/entity/Department';
import errors from '../../utils/errors';
import { UserType } from '../../interfaces';

const resolvers: Resolvers<Context> = {
  Query: {
    department: async (_, { input: { id: departmentID } }, { jwt: { id, type }, departmentLoader }) => {
      const dep = await departmentLoader.load(departmentID);

      const [usr] = dep.users.filter((u) => u.id === id);
      if (!usr && type !== UserType.ROOT) throw errors.unauthorized;

      return {
        id: dep.id,
      };
    },

    departments: async (_, __, { jwt: { id } }) => {
      const departmentRepo = getRepository(Department);
      const userRepo = getRepository(User);

      const usr = await userRepo.findOne({ relations: ['departments'], where: { id } });
      if (!usr) throw errors.internalServerError;

      if (usr.type === UserType.CENTRE) throw errors.unauthorized;

      let deps: Department[];
      if (usr.type === UserType.ROOT) {
        deps = await departmentRepo.find();
      } else {
        deps = usr.departments;
      }

      return deps.map((d) => ({ id: d.id }));
    },
  },
  Mutation: {
    createDepartment: async (_, { input: { name } }) => {
      if (!name) throw errors.fieldsRequired;

      const departmentRepo = getRepository(Department);
      const dep = departmentRepo.create({ name });

      await departmentRepo.save(dep);

      return {
        code: '200',
        message: 'Department created successfully',
      };
    },
  },

  Department: {
    name: async ({ id }, __, { departmentLoader }) => {
      const { name } = await departmentLoader.load(id);
      return name;
    },
    users: async ({ id }, __, { departmentLoader }) => {
      const { users } = await departmentLoader.load(id);
      return users.map((u) => ({ id: u.id }));
    },
    channels: async ({ id }, __, { departmentLoader }) => {
      const { channels } = await departmentLoader.load(id);
      return channels.map((c) => ({ id: c.id }));
    },
    createdAt: async ({ id }, __, { departmentLoader }) => {
      const { createdAt } = await departmentLoader.load(id);
      return createdAt.toISOString();
    },
  },
};

export default resolvers;

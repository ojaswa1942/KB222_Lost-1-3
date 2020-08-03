import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { User, Department, DepartmentRole } from '../../database/entity';
import errors from '../../utils/errors';
import { UserType, DeptRoles } from '../../interfaces';

const resolvers: Resolvers<Context> = {
  Query: {
    department: async (_, { input: { id: departmentID } }, { jwt: { id, type }, departmentLoader }) => {
      const dep = await departmentLoader.load(departmentID);

      const [usr] = dep.departmentRoles.filter((u) => u.userId === id);
      if (!usr && type !== UserType.Root) throw errors.unauthorized;

      return {
        id: dep.id,
      };
    },

    departments: async (_, __, { jwt: { id } }) => {
      const departmentRepo = getRepository(Department);
      const userRepo = getRepository(User);

      const usr = await userRepo.findOne({
        relations: ['departmentRoles', 'departmentRoles.department'],
        where: { id },
      });
      if (!usr) throw errors.internalServerError;

      if (usr.type === UserType.Centre) throw errors.unauthorized;

      let deps: Department[];
      if (usr.type === UserType.Root) {
        deps = await departmentRepo.find();
      } else {
        deps = usr.departmentRoles.map((d) => ({ ...d.department, id: d.departmentId }));
      }

      console.log('safe and sound');

      return deps.map((d) => ({ id: d.id }));
    },
  },
  Mutation: {
    createDepartment: async (_, { input: { name, adminIds, description } }) => {
      if (!name) throw errors.fieldsRequired;

      const departmentRepo = getRepository(Department);
      const userRepo = getRepository(User);
      const deptRoleRepo = getRepository(DepartmentRole);
      const users = await userRepo.findByIds(adminIds);
      const dep = departmentRepo.create({ name, description });

      const newDept = await departmentRepo.save(dep);

      users.forEach((u) => {
        deptRoleRepo.save(deptRoleRepo.create({ role: DeptRoles.ADMIN, user: u, department: newDept }));
      });

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
      const { departmentRoles } = await departmentLoader.load(id);
      return departmentRoles.map((u) => ({ role: u.role, user: { id: u.userId } }));
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

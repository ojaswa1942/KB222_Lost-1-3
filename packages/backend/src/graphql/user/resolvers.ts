import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { User } from '../../database/entity/User';
import errors from '../../utils/errors';
import { genHash } from '../../utils';
import config from '../../config';

const resolvers: Resolvers<Context> = {
  Mutation: {
    signup: async (_, { input: { email, name, password } }) => {
      if (!name || !email || !password) throw errors.fieldsRequired;
      const userRepo = getRepository(User);

      const chkUser = await userRepo.findOne({ email });
      if (chkUser) throw errors.emailExists;

      const hash = genHash(password);

      await userRepo
        .createQueryBuilder('user')
        .insert()
        .values({
          name: () => `pgp_sym_encrypt('${name}', '${config.JWTSecret}')`,
          email,
          hash,
          isVerified: true,
        })
        .execute();

      return {
        code: '200',
        message: 'Successfully signed up',
      };
    },
  },

  User: {
    name: async ({ id }, __, { userLoader }) => {
      const { name } = await userLoader.load(id);
      return name;
    },
    email: async ({ id }, __, { userLoader }) => {
      const { email } = await userLoader.load(id);
      return email;
    },
    type: async ({ id }, __, { userLoader }) => {
      const { type } = await userLoader.load(id);
      return type;
    },
    isVerified: async ({ id }, __, { userLoader }) => {
      const { isVerified } = await userLoader.load(id);
      return isVerified;
    },
    departments: async ({ id }, __, { userLoader }) => {
      const { departmentRoles } = await userLoader.load(id);
      return departmentRoles.map((d) => ({ role: d.role, department: { id: d.departmentId } }));
    },
    schemes: async ({ id }, __, { userLoader }) => {
      const { schemeRoles } = await userLoader.load(id);
      return schemeRoles.map((s) => ({ role: s.role, scheme: { id: s.schemeId } }));
    },
    createdAt: async ({ id }, __, { userLoader }) => {
      const { createdAt } = await userLoader.load(id);
      return createdAt.toISOString();
    },
  },
};

export default resolvers;

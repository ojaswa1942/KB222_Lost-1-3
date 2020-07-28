import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { User } from '../../database/entity/User';
import errors from '../../utils/errors';
import { genHash } from '../../utils';

const resolvers: Resolvers<Context> = {
  Mutation: {
    signup: async (_, { input: { email, name, password } }) => {
      if (!name || !email || !password) throw errors.fieldsRequired;
      const userRepo = getRepository(User);

      const chkUser = await userRepo.findOne({ email });
      if (chkUser) throw errors.emailExists;

      const hash = genHash(password);

      const user = userRepo.create({ name, email, hash, isVerified: true });

      await userRepo.save(user);

      return {
        code: '200',
        message: 'Successfully signed up',
        user,
      };
    },
  },
};

export default resolvers;

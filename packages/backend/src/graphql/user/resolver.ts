import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { User } from '../../database/entity/User';
import errors from '../../utils/errors';

const resolvers: Resolvers<Context> = {
  Mutation: {
    signup: async (_, { input: { email, name, password } }) => {
      if (!name || !email || !password) throw errors.fieldsRequired;
      const userRepo = getRepository(User);

      const chkUser = await userRepo.findOne({ email });
      if (chkUser) throw errors.emailExists;

      const hash = await bcrypt.hash(password, 8);

      const user = userRepo.create({ name, email, hash, isVerified: true });

      userRepo.save(user);

      return {
        code: '200',
        message: 'Successfully signed up',
        user,
      };
    },
  },
};

export default resolvers;

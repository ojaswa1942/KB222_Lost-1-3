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

      // const user = userRepo.create({ name, email, hash, isVerified: true });

      // await userRepo.save(user);
      const res = await userRepo
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
        user: {
          id: res.generatedMaps[0].id,
          name: name,
          email: email,
          isVerified: true,
          createdAt: res.generatedMaps[0].createdAt.toISOString(),
        },
      };
    },
  },
};

export default resolvers;

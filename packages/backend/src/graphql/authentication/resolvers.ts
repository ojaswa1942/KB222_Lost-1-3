import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { genToken, addAuthCookies } from '../../utils';
import { User } from '../../database/entity/User';
import errors from '../../utils/errors';
import { JWTPayload } from '../../interfaces';

const resolvers: Resolvers<Context> = {
  Query: {
    user: (_, __, { jwt: { id } }) => getRepository(User).findOne({ id }),
  },

  Mutation: {
    signin: async (_, { input: { email, password } }, { res }) => {
      if (!email || !password) throw errors.fieldsRequired;

      const user = await getRepository(User).findOne({ email });
      if (!user) throw errors.invalidCredentials;

      if (!user.isVerified) throw errors.notVerified;

      const match = await bcrypt.compare(password, user.hash);
      if (!match) throw errors.invalidCredentials;

      const payload: JWTPayload = {
        email: user.email,
        id: user.id,
      };

      const [token, expiry] = genToken(payload);

      const refreshToken = uuid();

      addAuthCookies(res, token, refreshToken, expiry);

      return {
        code: '200',
        message: 'Successfully signed in',
        expiry,
      };
    },
  },
};

export default resolvers;

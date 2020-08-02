import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import errors from '../../utils/errors';
import { getRepository } from 'typeorm';
import { Transaction } from '../../database/entity';
import config from '../../config';
import { UserType, SchRoles, TrxState } from '../../interfaces';

const resolvers: Resolvers<Context> = {
  Mutation: {
    createTransaction: async (
      _,
      { input: { amount, channelId, trxId } },
      { jwt: { id }, userLoader, channelLoader }
    ) => {
      if (!amount || !channelId || !trxId) throw errors.fieldsRequired;

      const user = await userLoader.load(id);
      const channel = await channelLoader.load(channelId);
      if (!user) throw errors.internalServerError;

      const [schRole] = user.schemeRoles.filter((sr) => sr.schemeId === channel.schemeId);

      if (user.type !== UserType.CENTRE || schRole.role !== SchRoles.ADMIN) throw errors.unauthorized;

      const trxRepo = getRepository(Transaction);

      await trxRepo
        .createQueryBuilder('transaction')
        .insert()
        .values({
          trxId: () => `pgp_sym_encrypt('${trxId}', '${config.JWTSecret}')`,
          amount,
          channel,
          user,
          state: TrxState.INITIATED,
        })
        .execute();

      return {
        code: '200',
        message: 'Successfully created transaction',
      };
    },
  },
  Transaction: {
    trxId: async ({ id }, _, { transactionLoader }) => {
      const { trxId } = await transactionLoader.load(id);
      return trxId;
    },
    amount: async ({ id }, _, { transactionLoader }) => {
      const { amount } = await transactionLoader.load(id);
      return amount;
    },
    state: async ({ id }, _, { transactionLoader }) => {
      const { state } = await transactionLoader.load(id);
      return state;
    },
    user: async ({ id }, _, { transactionLoader, userLoader }) => {
      const { userId } = await transactionLoader.load(id);
      const user = await userLoader.load(userId);
      return {
        id: user.id,
      };
    },
    channel: async ({ id }, _, { transactionLoader, channelLoader }) => {
      const { channel } = await transactionLoader.load(id);
      channelLoader.prime(channel.id, channel);
      return { id: channel.id };
    },
    createdAt: async ({ id }, _, { transactionLoader }) => {
      const { createdAt } = await transactionLoader.load(id);
      return createdAt.toISOString();
    },
    updatedAt: async ({ id }, _, { transactionLoader }) => {
      const { updatedAt } = await transactionLoader.load(id);
      return updatedAt.toISOString();
    },
  },
};

export default resolvers;

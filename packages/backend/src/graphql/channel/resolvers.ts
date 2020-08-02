import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { Channel, Department, Scheme } from '../../database/entity';
import errors from '../../utils/errors';
import { createRoom } from '../communication/helpers';

const resolvers: Resolvers<Context> = {
  Mutation: {
    createChannel: async (_, { input: { schemeID, departmentID } }) => {
      if (!schemeID || !departmentID) throw errors.fieldsRequired;
      const channelRepo = getRepository(Channel);
      const schemeRepo = getRepository(Scheme);
      const deptRepo = getRepository(Department);

      const chkScheme = await schemeRepo.findOne({
        where: { id: schemeID },
        relations: ['schemeRoles', 'schemeRoles.user'],
      });
      if (!chkScheme) throw errors.invalidInput;

      const chkDept = await deptRepo.findOne({
        where: { id: departmentID },
        relations: ['departmentRoles', 'departmentRoles.user'],
      });
      if (!chkDept) throw errors.invalidInput;

      const ch = await channelRepo.findOne({
        where: { scheme: chkScheme, department: chkDept },
        relations: ['scheme', 'department'],
      });
      if (ch) throw errors.channelExists;

      const newChannel = await channelRepo.save(channelRepo.create({ scheme: chkScheme, department: chkDept }));

      await createRoom('main', newChannel, [
        ...chkDept.departmentRoles.map((dr) => dr.user),
        ...chkScheme.schemeRoles.map((sr) => sr.user),
      ]);

      return {
        code: '200',
        message: 'Channel created successfully',
      };
    },
  },

  Channel: {
    department: async ({ id }, _, { channelLoader }) => {
      const { department } = await channelLoader.load(id);
      return { id: department.id };
    },
    scheme: async ({ id }, _, { channelLoader }) => {
      const { scheme } = await channelLoader.load(id);
      return { id: scheme.id };
    },
    transactions: async ({ id }, _, { channelLoader }) => {
      const { transactions } = await channelLoader.load(id);
      return transactions.map((trx) => ({ id: trx.id }));
    },
    rooms: async ({ id }, _, { channelLoader }) => {
      const { rooms } = await channelLoader.load(id);
      return rooms.map((r) => ({ id: r.id }));
    },
    createdAt: async ({ id }, _, { channelLoader }) => {
      const { createdAt } = await channelLoader.load(id);
      return createdAt.toISOString();
    },
  },
};

export default resolvers;

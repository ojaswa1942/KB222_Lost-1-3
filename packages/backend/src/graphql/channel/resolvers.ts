import { getRepository } from 'typeorm';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import { Channel } from '../../database/entity/Channel';
import { Department } from '../../database/entity/Department';
import { Scheme } from '../../database/entity/Scheme';
import errors from '../../utils/errors';
import { createRoom } from '../communication/helpers';

const resolvers: Resolvers<Context> = {
  Mutation: {
    createChannel: async (_, { input: { schemeID, departmentID } }) => {
      if (!schemeID || !departmentID) throw errors.fieldsRequired;
      const channelRepo = getRepository(Channel);
      const schemeRepo = getRepository(Scheme);
      const deptRepo = getRepository(Department);

      const chkScheme = await schemeRepo.findOne({ where: { id: schemeID }, relations: ['users'] });
      if (!chkScheme) throw errors.invalidInput;

      const chkDept = await deptRepo.findOne({ where: { id: departmentID }, relations: ['users'] });
      if (!chkDept) throw errors.invalidInput;

      const ch = await channelRepo.findOne({
        where: { scheme: chkScheme, department: chkDept },
        relations: ['scheme', 'department'],
      });
      if (ch) throw errors.channelExists;

      const newChannel = await channelRepo.save(channelRepo.create({ scheme: chkScheme, department: chkDept }));

      await createRoom('main', newChannel, [...chkDept.users, ...chkScheme.users]);

      return {
        code: '200',
        message: 'Channel created successfully',
      };
    },
  },
};

export default resolvers;

import path from 'path';
import { v4 as uuid } from 'uuid';
import { genWriteSignedUrl, genReadSignedUrl } from '../../utils/storage';
import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';
import errors from '../../utils/errors';
import { getRepository } from 'typeorm';
import { File } from '../../database/entity';

const resolvers: Resolvers<Context> = {
  Mutation: {
    upload: async (_, { input: { name } }) => {
      if (!name) throw errors.fieldsRequired;

      const ext = path.extname(name);
      const key = path.format({
        name: uuid(),
        ext,
      });

      const url = await genWriteSignedUrl(path.join('tmp/', key));

      return {
        code: '200',
        message: 'Generated pre-signed url',
        url,
        file: { key, name },
      };
    },
    download: async (_, { input: { key } }) => {
      const fileRepo = getRepository(File);

      const file = await fileRepo.findOne({ where: { key } });
      if (!file) throw errors.invalidInput;

      const url = await genReadSignedUrl(path.join('files', file.key), file.name);

      return {
        code: '200',
        message: 'Generated pre-signed url',
        url,
        file: {
          key,
          name: file.name,
        },
      };
    },
  },
  MutationResponse: {
    __resolveType: (mutationResponse) => Object.getPrototypeOf(mutationResponse).constructor.name,
  },
};

export default resolvers;

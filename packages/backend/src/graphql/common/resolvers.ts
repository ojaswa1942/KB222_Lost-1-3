import { Resolvers } from '../resolvers-types.generated';
import { Context } from '../../context';

const resolvers: Resolvers<Context> = {
  MutationResponse: {
    __resolveType: (mutationResponse) => Object.getPrototypeOf(mutationResponse).constructor.name,
  },
};

export default resolvers;

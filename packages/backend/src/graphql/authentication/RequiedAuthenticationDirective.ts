import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';

import { Context } from '../../context';
import errors from '../../utils/errors';

export class RequiredAuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, Context>) {
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = function (rootValue, args, context, info) {
      const { isValid } = context;

      if (!isValid) throw errors.unauthenticated;

      return originalResolve.call(this, rootValue, args, context, info);
    };
  }
}

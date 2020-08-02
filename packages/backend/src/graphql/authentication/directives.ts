import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';

import { Context } from '../../context';
import errors from '../../utils/errors';
import { UserType } from '../../interfaces';

export class RequiredAuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, Context>) {
    const isRoot = this.args.isRoot as boolean;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = function (rootValue, args, context, info) {
      const { isValid, jwt } = context;

      if (!isValid) throw errors.unauthenticated;
      if (isRoot && jwt.type !== UserType.ROOT) throw errors.unauthorized;

      return originalResolve.call(this, rootValue, args, context, info);
    };
  }
}

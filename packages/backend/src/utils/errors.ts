import { UserInputError, ApolloError, AuthenticationError } from 'apollo-server-express';

export default {
  internalServerError: new ApolloError('Some error occurred', 'INTERNAL_SERVER_ERROR'),
  fieldsRequired: new UserInputError('All fields are required'),
  emailExists: new ApolloError('User with given email already exists', 'EMAIL_EXISTS'),
  invalidCredentials: new ApolloError('Invalid email or password', 'INVALID_CREDENTIALS'),
  unauthenticated: new AuthenticationError('Unauthenticated'),
  unauthorized: new ApolloError('User not authorized', 'FORBIDDEN'),
  notVerified: new ApolloError('User not verified', 'NOT_VERIFIED'),
  invalidInput: new UserInputError('Invalid input'),
  channelExists: new ApolloError('Channel for given scheme and department already exists', 'CHANNEL_EXISTS'),
};

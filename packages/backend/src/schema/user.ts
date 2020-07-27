import { gql } from 'apollo-server-express';
export default gql`
  extend type Query {
    user: User
  }

  extend type Mutation {
    signup(input: SignUpInput): SignUpResponse
    signin(input: SignInInput): SignInResponse
  }

  enum UserType {
    ROOT
    CENTRE
    STATE
  }

  type User {
    id: Int
    name: String
    email: String
    type: UserType
    schemes: [Scheme]
    departments: [Department]
    isVerified: Boolean
    createdAt: String
  }

  type SignUpResponse implements MutationResponse {
    code: String!
    message: String!
    user: User!
  }

  type SignInResponse implements MutationResponse {
    code: String!
    message: String!
    expiry: String
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`;

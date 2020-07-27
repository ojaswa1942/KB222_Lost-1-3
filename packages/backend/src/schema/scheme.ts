import { gql } from 'apollo-server-express';
export default gql`
  extend type Query {
    scheme(input: SchemeInput): Scheme
    schemes: [Scheme]
  }

  type Scheme {
    id: Int
    name: String
    users: [User]
    channels: [Channel]
    createdAt: String
  }

  input SchemeInput {
    id: Int!
  }
`;

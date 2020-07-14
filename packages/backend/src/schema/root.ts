import { gql } from 'apollo-server-express';
export default gql`
  type Query {
    ping: String
  }

  type Mutation {
    ping: String
  }
`;

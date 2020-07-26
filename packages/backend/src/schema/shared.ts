import { gql } from 'apollo-server-express';

export default gql`
  interface MutationResponse {
    code: String!
    message: String!
  }
`;

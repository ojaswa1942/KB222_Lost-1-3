import { gql } from 'apollo-server-express';
export default gql`
  type Channel {
    id: Int
    name: String
    scheme: Scheme
    department: Department
    rooms: [Room]
    createdAt: String
  }
`;

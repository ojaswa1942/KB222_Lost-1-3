import { gql } from 'apollo-server-express';
export default gql`
  extend type Query {
    department(input: DepartmentInput): Department
    departments: [Department]
  }

  type Department {
    id: Int
    name: String
    users: [User]
    channels: [Channel]
    createdAt: String
  }

  input DepartmentInput {
    id: Int!
  }
`;

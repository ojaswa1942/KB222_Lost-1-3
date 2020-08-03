import { gql } from "@apollo/client";

export default gql`
  query Departments {
    departments {
      id
      name
      users {
        role
        user {
          id
          name
        }
      }
      channels {
        id
        scheme {
          id
          name
        }
        department {
          id
          name
        }
        rooms {
          id
          name
          lastMessage {
            body
            createdAt
          }
        }
      }
    }
  }
`;

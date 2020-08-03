import { gql } from "@apollo/client";

export default gql`
  query User {
    user {
      id
      name
      email
      type
      schemes {
        role
        scheme {
          id
          name
        }
      }
      departments {
        role
        department {
          id
          name
        }
      }
      rooms {
        id
        name
        createdAt
        lastMessage {
          body
          files
          isNotification
          user {
            name
          }
          createdAt
        }
      }
    }
  }
`;

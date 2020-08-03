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
        channel {
          scheme {
            id
          }
          department {
            id
          }
        }
        createdAt
        lastMessage {
          body
          files {
            key
            name
          }
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

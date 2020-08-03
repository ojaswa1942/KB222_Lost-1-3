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
          description
          budget
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
            transactions {
              id
              trxId
              amount
              state
              createdAt
              updatedAt
            }
          }
        }
      }
      departments {
        role
        department {
          id
          name
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
            transactions {
              id
              trxId
              amount
              state
              createdAt
              updatedAt
            }
          }
        }
      }
      rooms {
        id
        name
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

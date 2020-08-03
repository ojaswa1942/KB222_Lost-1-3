import { gql } from "@apollo/client";

export default gql`
  query Schemes {
    schemes {
      id
      name
      description
      budget
      transferredAmount
      users{
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
          lastMessage{
            body
            createdAt
          }
        }
      }      
    }
  }
`;

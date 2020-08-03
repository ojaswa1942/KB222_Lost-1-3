import { gql } from "@apollo/client";

export default gql`
  query Scheme($input: SchemeInput) {
    scheme(input: $input) {
      id
      name
      users {
        role
        user {
          id
          name
        }
      }
    }
  }
`;

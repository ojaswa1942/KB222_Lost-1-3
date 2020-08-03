import { gql } from "@apollo/client";

export default gql`
  query Messages($input: MessagesInput) {
    messages(input: $input) {
      name
      body
      files
      isNotification
      createdAt
      user {
        id
        name
      }
    }
  }
`;

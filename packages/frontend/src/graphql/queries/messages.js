import { gql } from "@apollo/client";

export default gql`
  query Messages($input: MessagesInput!) {
    messages(input: $input) {
      id
      body
      files {
        name
      }
      isNotification
      createdAt
    }
  }
`;

import { gql } from "@apollo/client";

export default gql`
  mutation SendMessage($input: SendMessageInput) {
    sendMessage(input: $input) {
      code
      message
    }
  }
`;

import { gql } from '@apollo/client';

export default gql`
  mutation Signin($input: SignInInput) {
    signin(input: $input) {
    	code
    	message
    	expiry
    } 
  }
`;

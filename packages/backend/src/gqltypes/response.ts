import { User } from './types';

export interface SignInResponse {
  code: string;
  message: string;
  expiry: string;
}

export interface SignUpResponse {
  code: string;
  message: string;
  user: User;
}

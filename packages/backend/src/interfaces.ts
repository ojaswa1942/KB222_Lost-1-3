export interface JWTPayload {
  email: string;
  id: number;
}

export enum UserType {
  ROOT = 'ROOT',
  CENTRE = 'CENTRE',
  STATE = 'STATE',
}

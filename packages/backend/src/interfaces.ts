export interface JWTPayload {
  email: string;
  id: number;
  type: UserType;
}

export enum UserType {
  ROOT = 'ROOT',
  CENTRE = 'CENTRE',
  STATE = 'STATE',
}

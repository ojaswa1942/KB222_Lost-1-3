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

export enum DeptRoles {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

export enum SchRoles {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

export enum TrxState {
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
}

export interface JWTPayload {
  email: string;
  id: number;
  type: UserType;
}

export enum UserType {
  Root = 'ROOT',
  Centre = 'CENTRE',
  State = 'STATE',
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

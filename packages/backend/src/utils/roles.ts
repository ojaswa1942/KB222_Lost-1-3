import { DeptRoles, SchRoles } from '../interfaces';

export enum StateAction {
  ViewRooms,
  ViewTransactions,
  AckTransaction,
  CreateRoom,
  AddDeptMembers,
}

export enum CenterAction {
  ViewRooms,
  ViewTransactions,
  InitiateTransaction,
  CreateRoom,
  AddSchMembers,
}

export const stateIsAuthorized = (action: StateAction, role: DeptRoles): boolean => {
  switch (action) {
    case StateAction.ViewRooms:
      return [DeptRoles.ADMIN, DeptRoles.VIEWER].includes(role);

    case StateAction.ViewTransactions:
      return [DeptRoles.ADMIN, DeptRoles.VIEWER].includes(role);

    case StateAction.AckTransaction:
      return [DeptRoles.ADMIN].includes(role);

    case StateAction.CreateRoom:
      return [DeptRoles.ADMIN].includes(role);

    case StateAction.AddDeptMembers:
      return [DeptRoles.ADMIN].includes(role);
  }
};

export const centreIsAuthorized = (action: CenterAction, role: SchRoles): boolean => {
  switch (action) {
    case CenterAction.ViewRooms:
      return [SchRoles.ADMIN, SchRoles.VIEWER].includes(role);

    case CenterAction.ViewTransactions:
      return [SchRoles.ADMIN, SchRoles.VIEWER].includes(role);

    case CenterAction.InitiateTransaction:
      return [SchRoles.ADMIN].includes(role);

    case CenterAction.CreateRoom:
      return [SchRoles.ADMIN].includes(role);

    case CenterAction.AddSchMembers:
      return [SchRoles.ADMIN].includes(role);
  }
};

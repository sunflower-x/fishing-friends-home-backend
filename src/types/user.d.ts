import { IdeptType } from './system';
import { IroleQueryType } from './system/role';

export interface userType {
  id?: number;
  userName?: string;
}


export interface userListType {
  count: number;
  rows: userType[];
}


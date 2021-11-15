export interface SystemLogListParams {}

export interface SystemLogModel {
  id: string;
  name: string;
  path: string;
  length: number;
  createDate: Date;
  modifyDate: Date;
  directory: boolean;
}

export interface SystemLogGetParams {
  id: string;
}

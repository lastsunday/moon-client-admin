export interface OperationLogListParams {
  operatorAccount: string;
  ip: string;
  createTime: Array<Date>;
  functionModule: number;
  operation: number;
  errorCode: number;
  notHasErrorCode: Boolean;
  request: string;
  response: string;
  pageNum: number;
  pageSize: number;
  order?: string;
  field?: string;
  sortOrder?: string;
  sortField?: string;
}

export interface OperationLogModel {
  id: string;
  operatorId: string;
  createTime: Date;
  functionModule: number;
  operation: number;
  operatorAccount: string;
  path: string;
  ip: string;
  request: string;
  response: string;
  errorCode: number;
  errorMessage: string;
}

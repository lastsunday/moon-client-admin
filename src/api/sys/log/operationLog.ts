import { OperationLogListParams, OperationLogModel } from '../model/operationLogModel';
import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = 'system/log/operationLogList',
}

export function list(params: OperationLogListParams, mode: ErrorMessageMode = 'modal') {
  if (params.order) {
    if (params.order == 'ascend') {
      params.sortOrder = 'ASC';
    } else {
      params.sortOrder = 'DESC';
    }
    delete params.order;
  }
  if (params.field) {
    if (params.field == 'createTime') {
      params.sortField = 'CREATE_TIME';
    } else {
      //skip
    }
    delete params.field;
  }
  return defHttp.request<OperationLogModel>(
    {
      url: Api.List,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

import { SystemLogGetParams, SystemLogModel, SystemLogListParams } from '../model/logModel';
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/@/utils/http/axios/types';

enum Api {
  List = 'system/log/list',
  Get = 'system/log/get',
}

export function list(params: SystemLogListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<SystemLogModel>(
    {
      url: Api.List,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

export function get(params: SystemLogGetParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request(
    {
      url: Api.Get,
      method: 'POST',
      params,
      responseType: 'blob',
    },
    {
      errorMessageMode: mode,
    }
  );
}

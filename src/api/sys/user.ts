import { defHttp } from '/@/utils/http/axios';
import {
  UserOnlineListParams,
  UserOnlineResultModel,
  UserOnlineForceLogoutParams,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  GetUserOnlineList = 'system/user/online/list',
  UserOnlineForceLogout = 'system/user/online/forceLogout',
}

/**
 * @description: user online list api
 */
export function getUserOnlineList(params: UserOnlineListParams, mode: ErrorMessageMode = 'modal') {
  if (params.order) {
    if (params.order == 'ascend') {
      params.sortOrder = 'ASC';
    } else {
      params.sortOrder = 'DESC';
    }
    delete params.order;
  }
  if (params.field) {
    if (params.field == 'loginTime') {
      params.sortField = 'LOGIN_TIME';
    } else {
      //skip
    }
    delete params.field;
  }
  return defHttp.request<UserOnlineResultModel>(
    {
      url: Api.GetUserOnlineList,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: user online forceLogout api
 */
export function userOnlineForceLogout(
  params: UserOnlineForceLogoutParams,
  mode: ErrorMessageMode = 'modal'
) {
  return defHttp.request<void>(
    {
      url: Api.UserOnlineForceLogout,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';
import {
  UserOnlineListParams,
  UserOnlineResultModel,
  UserOnlineForceLogoutParams,
} from './model/userModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = 'client/login',
  GetUserInfo = 'client/info',
  Logout = 'client/logout',
  GetUserOnlineList = 'system/user/online/list',
  UserOnlineForceLogout = 'system/user/online/forceLogout',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' }).then(data=>{
    return new Promise((resolve)=>{
      const result : GetUserInfoModel = {
        roles: data.roles,
        userId: "",
        username: data.name,
        realName: data.name,
        avatar: "",
        desc: ""
      }
      resolve(result);
    });
  });
}

export function getPermCode(){
  return defHttp.post<string[]>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' }).then(data=>{
    return new Promise((resolve)=>{
      const result : string[] = data.permissions;
      resolve(result);
    });
  });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
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
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
import {
  AdminListParams,
  AdminListModel,
  DeleteAdminRecordParams,
  UpdateAdminRecordParams,
  CreateAdminRecordResultModel,
  CreateAdminRecordParams,
  RoleOptionsListResultModel,
  ResetAdminPasswordParams,
} from './model/adminModel';

enum Api {
  GetAdminList = 'system/user/list',
  DeleteAdminRecord = 'system/user/delete',
  UpdateAdminRecord = 'system/user/update',
  CreateAdminRecord = 'system/user/create',
  GetRoleOptionsList = 'system/role/options',
  ResetAdminPassword = 'system/user/resetPassword',
}

/**
 * @description: Admin list api
 */
export function getAdminList(params: AdminListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<AdminListModel>(
    {
      url: Api.GetAdminList,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Delete admin record api
 */
export function deleteAdminRecord(
  params: DeleteAdminRecordParams,
  mode: ErrorMessageMode = 'modal'
) {
  return defHttp.request<void>(
    {
      url: Api.DeleteAdminRecord,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Update admin record api
 */
export function updateAdminRecord(
  params: UpdateAdminRecordParams,
  mode: ErrorMessageMode = 'modal'
) {
  return defHttp.request<void>(
    {
      url: Api.UpdateAdminRecord,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Reset admin password api
 */
export function resetAdminPassword(
  params: ResetAdminPasswordParams,
  mode: ErrorMessageMode = 'modal'
) {
  return defHttp.request<void>(
    {
      url: Api.ResetAdminPassword,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Create admin record api
 */
export function createAdminRecord(
  params: CreateAdminRecordParams,
  mode: ErrorMessageMode = 'modal'
) {
  return defHttp.request<CreateAdminRecordResultModel>(
    {
      url: Api.CreateAdminRecord,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Role options list api
 */
export function getRoleOptionsList(mode: ErrorMessageMode = 'modal') {
  return defHttp.request<RoleOptionsListResultModel>(
    {
      url: Api.GetRoleOptionsList,
      method: 'POST',
    },
    {
      errorMessageMode: mode,
    }
  );
}

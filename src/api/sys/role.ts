import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
import {
  RoleListParams,
  RoleListModel,
  DeleteRoleRecordParams,
  UpdateRoleRecordParams,
  CreateRoleRecordResultModel,
  CreateRoleRecordParams,
  RolePermissionResultModel,
} from './model/roleModel';

enum Api {
  GetRoleList = 'system/role/list',
  DeleteRoleRecord = 'system/role/delete',
  UpdateRoleRecord = 'system/role/update',
  CreateRoleRecord = 'system/role/create',
  RolePermission = 'system/permission/listAll',
}

/**
 * @description: Role list api
 */
export function getRoleList(params: RoleListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<RoleListModel>(
    {
      url: Api.GetRoleList,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Delete role record api
 */
export function deleteRoleRecord(params: DeleteRoleRecordParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<void>(
    {
      url: Api.DeleteRoleRecord,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Update role record api
 */
export function updateRoleRecord(params: UpdateRoleRecordParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<void>(
    {
      url: Api.UpdateRoleRecord,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Create role record api
 */
export function createRoleRecord(params: CreateRoleRecordParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<CreateRoleRecordResultModel>(
    {
      url: Api.CreateRoleRecord,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Role permission api
 */
export function rolePermission(mode: ErrorMessageMode = 'modal') {
  return defHttp.request<RolePermissionResultModel>(
    {
      url: Api.RolePermission,
      method: 'POST',
    },
    {
      errorMessageMode: mode,
    }
  );
}

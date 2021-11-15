/**
 * @description: Create role record interface parameters
 */
export interface CreateRoleRecordParams {
  desc: string;
  name: string;
  permissions: string[];
  status: number;
}

/**
 * @description: Create role record interface return value
 */
export interface CreateRoleRecordResultModel {
  desc: string;
  id: string;
  name: string;
  status: number;
}

/**
 * @description: Delete role record interface parameters
 */
export interface DeleteRoleRecordParams {
  id: string;
}

/**
 * @description: update role record interface parameters
 */
export interface UpdateRoleRecordParams {
  desc: string;
  id: string;
  name: string;
  permissions: string[];
  status: number;
}
/**
 * @description: Role list interface parameters
 */
export interface RoleListParams {
  field: string;
  name: string;
  order: string;
  pageNum: number;
  pageSize: number;
}

/**
 * @description: Role list interface return value
 */
export interface RoleListResultModel {
  endRow: number;
  items: RoleListModel[];
  pageNum: number;
  pageSize: number;
  pages: number;
  startRow: number;
  total: number;
}

export interface RoleListModel {
  desc: string;
  id: string;
  name: string;
  permissions: string[];
  remark: string;
  status: number;
}

/**
 * @description: Role permission interface return value
 */
export interface RolePermissionResultModel {
  items: string[];
}

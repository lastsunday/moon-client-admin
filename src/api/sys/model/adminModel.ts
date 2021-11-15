/**
 * @description: Create admin record interface parameters
 */
export interface CreateAdminRecordParams {
  account: string;
  email: string;
  gender: number;
  name: string;
  password: string;
  phone: string;
  remark: string;
  roleIds: string[];
  status: number;
}

/**
 * @description: Create admin record interface return value
 */
export interface CreateAdminRecordResultModel {
  id: string;
  name: string;
  nickName: string;
  password: string;
  phonenumber: string;
  roleIds: string[];
  status: number;
}

/**
 * @description: Delete admin record interface parameters
 */
export interface DeleteAdminRecordParams {
  id: string;
}

/**
 * @description: update admin record interface parameters
 */
export interface UpdateAdminRecordParams {
  email: string;
  gender: number;
  id: string;
  name: string;
  password: string;
  phone: string;
  remark: string;
  roleIds: string[];
  status: number;
}

/**
 * @description: reset admin password interface parameters
 */
export interface ResetAdminPasswordParams {
  newPassword: string;
  userId: string;
}

/**
 * @description: Admin list interface parameters
 */
export interface AdminListParams {
  account: string;
  roleIds: string[];
  pageNum: number;
  pageSize: number;
}

/**
 * @description: Admin list interface return value
 */
export interface AdminListResultModel {
  endRow: number;
  pageNum: number;
  pageSize: number;
  pages: number;
  startRow: number;
  total: number;
  items: AdminListModel[];
}

export interface AdminListModel {
  account: string;
  email: string;
  gender: number;
  id: string;
  name: string;
  password: string;
  phone: string;
  remark: string;
  roleIds: string[];
  status: number;
}

/**
 * @description: Role Options list interface return value
 */
export type RoleOptionsListResultModel = RoleOptionsListModel[];

export interface RoleOptionsListModel {
  label: string;
  value: string;
}

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
  uuid: string;
  verifyCode: string;
}

/**
 * @description: Get user information
 */
export interface GetUserInfoByUserIdParams {
  userId: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoByUserIdModel {
  permissions: Array<string>;
  role: RoleInfo;
  account: string;
  name: string;
  avatar: string;
  desc?: string;
}

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
  uuid?: string;
  verifyCode?: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

/**
 * @description: UserOnline list interface parameters
 */
 export interface UserOnlineListParams {
  pageNum: number;
  pageSize: number;
  ipaddr: string;
  userName: string;
  order?: string;
  field?: string;
  sortOrder?: string;
  sortField?: string;
}

/**
 * @description: UserOnline forceLogout interface parameters
 */
export interface UserOnlineForceLogoutParams {
  tokenId: string;
}

export interface UserOnlineModel {
  tokenId: string;
  deptName: string;
  userName: string;
  ipaddr: string;
  loginLocation: string;
  browser: string;
  os: string;
  loginTime: number;
}

/**
 * @description: UserOnline list interface return value
 */
export interface UserOnlineResultModel {
  pageNum: number;
  pageSize: number;
  startRow: number;
  endRow: number;
  total: number;
  pages: number;
  items: UserOnlineModel[];
}

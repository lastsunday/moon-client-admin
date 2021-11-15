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

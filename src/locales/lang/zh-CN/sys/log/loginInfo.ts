export default {
  table: {
    columns: {
      id: 'ID',
      userName: '用户名称',
      ipaddr: '登录地址',
      ipplace: '登录地点',
      browser: '浏览器',
      os: '操作系统',
      status: '登录状态',
      operationInfo: '操作信息',
      loginDate: '登录日期',
    },
    form: {
      columns: {
        ipaddr: '登录地址',
        userName: '用户名称',
        status: '登录状态',
        loginRangDate: '登录起止时间',
      },
      promptFormat: {
        promptIpAddrIsNull: '请输入登录地址',
        promptUserNameIsNull: '请输入用户名称',
        promptStatusIsNull: '请选择登录状态',
      },
      status: {
        success: '成功',
        failed: '失败',
      },
    },
    action: {
      delete: '删除',
      empty: '清空',
      export: '导出',
    },
    deleteContent: {
      warn: '警告',
      promptContent: '是否确定要删除所选日志?',
      successContent: '删除成功。',
      failedContent: '删除失败。',
      selectIsNull: '未勾选日志。',
    },
    exportLogToSheetXlsx: {
      warn: '警告',
      promptContent: '是否确定导出所有日志数据?',
      successContent: '导出成功。',
      failedContent: '导出失败。',
    },
    deleteAllContent: {
      warn: '警告',
      promptContent: '是否确定要删除所有日志？',
      successContent: '删除成功。',
      failedContent: '删除失败。',
    },
  },
};

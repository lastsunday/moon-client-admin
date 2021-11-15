export default {
  table: {
    columns: {
      tokenId: '会话编号',
      userName: '登录名称',
      ipaddr: '主机地址',
      browser: '浏览器',
      os: '操作系统',
      loginTime: '登录时间',
    },
    form: {
      userName: '登录名称',
      ipaddr: '主机地址',
      loginRangeDate: '登录起止时间',
      promptFormat: {
        promptUserNameIsNull: '请输入登录名称',
        promptIpaddrIsNull: '请输入主机地址',
      },
    },
    action: {
      operation: '操作',
      forceLogout: '强退',
    },
  },
  modal: {
    warn: '警告',
    promptContent: '是否确认强退登录名称为{userName}的数据项?',
    successContent: '强退成功！',
  },
};

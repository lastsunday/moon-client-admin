export default {
  table: {
    columns: {
      tokenId: 'TokenId',
      userName: 'UserName',
      ipaddr: 'IpAddress',
      browser: 'Browser',
      os: 'OS',
      loginTime: 'LoginTime',
    },
    form: {
      userName: 'UserName',
      ipaddr: 'IpAddress',
      loginRangeDate: 'RangDate',
      promptFormat: {
        promptUserNameIsNull: 'Please enter user name',
        promptIpaddrIsNull: 'Please enter ip address',
      },
    },
    action: {
      operation: 'Operation',
      forceLogout: 'Force Logout',
    },
  },
  modal: {
    warn: 'Warn',
    promptContent: 'Are you sure you want to force back the data item with login name {userName}?',
    successContent: 'Forced retreat success!',
  },
};

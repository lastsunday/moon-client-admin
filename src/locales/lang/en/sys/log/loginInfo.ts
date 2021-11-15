export default {
  table: {
    columns: {
      id: 'ID',
      userName: 'UserName',
      ipaddr: 'IpAddress',
      ipplace: 'IpPlace',
      browser: 'Browser',
      os: 'OS',
      status: 'Status',
      operationInfo: 'OperationInfo',
      loginDate: 'LoginDate',
    },
    form: {
      columns: {
        ipaddr: 'IpAddress',
        userName: 'UserName',
        status: 'Status',
        loginRangDate: 'RangDate',
      },
      promptFormat: {
        promptIpAddrIsNull: 'Please enter ip address',
        promptUserNameIsNull: 'Please enter user name',
        promptStatusIsNull: 'Please select login status',
      },
      status: {
        success: 'SUCCESS',
        failed: 'FAILED',
      },
    },
    action: {
      delete: 'delete',
      empty: 'empty',
      export: 'export',
    },
    deleteContent: {
      warn: 'Warn',
      promptContent: 'Are you sure you want to delete the selected log?',
      successContent: 'Deleted success.',
      failedContent: 'Deleted failed.',
      selectIsNull: 'Log not checked.',
    },
    exportLogToSheetXlsx: {
      warn: 'Warn',
      promptContent: 'Are you sure to export all log data?',
      successContent: 'Export success',
      failedContent: 'Export failed',
    },
    deleteAllContent: {
      warn: 'Warn',
      promptContent: 'Are you sure you want to delete the All log?',
      successContent: 'Deleted success.',
      failedContent: 'Deleted failed.',
    },
  },
};

export default {
  table: {
    columns: {
      adminId: 'AdminID',
      adminName: 'AdminName',
      adminRole: 'AdminRole',
      operation: 'Operation',
    },
    form: {
      adminName: 'AdminName',
      adminRole: 'AdminRole',
      suprAdmin: 'SuprAdmin',
      guest: 'Guest',
      promptFormat: {
        promptAdminNameIsNull: 'Please enter admin name.',
        promptAdminRoleIsNull: 'Please select admin role.',
      },
    },
    action: {
      create: 'Create',
      modify: 'Modify',
      delete: 'Delete',
      reset: 'Reset',
    },
    deleteContent: {
      warn: 'Warn',
      promptContent: 'Are you sure you want to delete the entry with the account "{adminName}"?',
      successContent: 'Deleted success.',
      failedContent: 'Deleted failed.',
    },
  },
  modal: {
    title: {
      create: 'Create Admin',
      modify: 'Modify Admin',
      reset: 'Reset Password',
    },
    action: {
      cancel: 'Cancel',
      ok: 'OK',
    },
    columns: {
      account: 'Account',
      password: 'Password',
      phone: 'Phone',
      name: 'Name',
      roleIds: 'RoleIds',
      gender: 'Gender',
      email: 'Email',
      remark: 'Remark',
      status: 'Status',
    },
    gender: {
      man: 'Man',
      woman: 'Woman',
      secrecy: 'Secrecy',
    },
    status: {
      startUsing: 'StartUsing',
      forbidden: 'Forbidden',
    },
    roleIds: {
      guest: 'Guest',
      superAdmin: 'SuperAdmin',
    },
    createContent: {
      successContent: 'Create success.',
      failedContent: 'Create failed.',
    },
    modifyContent: {
      successContent: 'Update success.',
      failedContent: 'Update failed.',
    },
    promptFormat: {
      promptFormat: 'Please enter a valid email address.',
      promptRemarkIsNull: 'Please enter remark.',
      promptPhoneIsNull: 'Please enter phone.',
      promptAccountIsNull: 'Please enter account.',
      promptNewPasswordIsNull: 'Please enter new password for the account {account}.',
      promptPasswordIsNull: 'Please enter password.',
      promptNameIsNull: 'Please enter name.',
      promptRoleIdsIsNull: 'Please select role.',
    },
  },
};

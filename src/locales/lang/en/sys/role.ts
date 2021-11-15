export default {
  table: {
    columns: {
      roleName: 'RoleName',
      roleDesc: 'RoleDesc',
      operation: 'Operation',
    },
    form: {
      roleName: 'RoleName',
      promptFormat: {
        promptRoleNameIsNull: 'Please enter name',
      },
    },
    action: {
      create: 'Create',
      modify: 'Modify',
      delete: 'Delete',
    },
    deleteContent: {
      warn: 'Warn',
      promptContent: 'Are you sure you want to delete the entry with the role name "{roleName}"?',
      successContent: 'Deleted success.',
      failedContent: 'Deleted failed.',
    },
  },
  modal: {
    title: {
      create: 'Create Role',
      modify: 'Modify Role',
    },
    columns: {
      name: 'Name',
      permissions: 'Permissions',
      desc: 'Desc',
      status: 'Status',
    },
    status: {
      startUsing: 'StartUsing',
      forbidden: 'Forbidden',
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
      promptNameIsNull: 'Please enter name.',
      promptDescIsNull: 'Please enter desc.',
      promptPermitssionsIsNull: 'Please select permitssions.',
    },
  },
};

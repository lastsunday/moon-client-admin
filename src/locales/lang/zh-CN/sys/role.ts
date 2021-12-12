export default {
  table: {
    columns: {
      roleName: '角色名称',
      roleDesc: '角色说明',
      operation: '操作',
    },
    form: {
      roleName: '角色名称',
      promptFormat: {
        promptRoleNameIsNull: '请输入角色名称',
      },
    },
    action: {
      browse: '查看',
      create: '创建',
      modify: '编辑',
      delete: '删除',
    },
    deleteContent: {
      warn: '警告',
      promptContent: '是否删除角色名称为"{roleName}"的数据项?',
      successContent: '删除成功。',
      failedContent: '删除失败。',
    },
  },
  modal: {
    title: {
      browse: '查看角色',
      create: '创建角色',
      modify: '编辑角色',
    },
    columns: {
      name: '名称',
      permissions: '权限',
      desc: '说明',
      status: '状态',
    },
    status: {
      startUsing: '启用',
      forbidden: '禁用',
    },
    createContent: {
      successContent: '创建成功。',
      failedContent: '创建失败。',
    },
    modifyContent: {
      successContent: '修改成功。',
      failedContent: '修改失败。',
    },
    promptFormat: {
      promptNameIsNull: '请输入角色名称。',
      promptDescIsNull: '请输入角色说明。',
      promptPermitssionsIsNull: '请选择角色权限。',
    },
  },
};

export default {
  table: {
    columns: {
      adminId: '管理员ID',
      adminName: '管理员名称',
      adminRole: '管理员角色',
      operation: '操作',
    },
    form: {
      adminName: '管理员名称',
      adminRole: '管理员角色',
      suprAdmin: '超级管理员',
      guest: '客户',
      promptFormat: {
        promptAdminNameIsNull: '请输入管理员名称',
        promptAdminRoleIsNull: '请选择管理员角色',
      },
    },
    action: {
      create: '创建',
      modify: '编辑',
      delete: '删除',
      reset: '重置',
    },
    deleteContent: {
      warn: '警告',
      promptContent: '是否删除账号为"{adminName}"的数据项?',
      successContent: '删除成功',
      failedContent: '删除失败',
    },
  },
  modal: {
    title: {
      create: '创建用户',
      modify: '编辑用户',
      reset: '重置密码',
    },
    action: {
      cancel: '取消',
      ok: '确定',
    },
    columns: {
      account: '账号',
      gender: '性别',
      password: '密码',
      phone: '手机号码',
      email: '电子邮件',
      name: '用户名',
      roleIds: '角色',
      remark: '备注',
      status: '状态',
    },
    gender: {
      man: '男',
      woman: '女',
      secrecy: '保密',
    },
    status: {
      startUsing: '启用',
      forbidden: '禁用',
    },
    roleIds: {
      guest: '客户',
      superAdmin: '超级管理员',
    },
    createContent: {
      successContent: '创建成功',
      failedContent: '创建失败',
    },
    modifyContent: {
      successContent: '修改成功',
      failedContent: '修改失败',
    },
    promptFormat: {
      promptFormat: '请输入有效的电子邮件地址',
      promptRemarkIsNull: '请输入备注',
      promptPhoneIsNull: '请输入手机号码',
      promptAccountIsNull: '请输入用户账号',
      promptNewPasswordIsNull: '请输入账号为"{account}"的新密码',
      promptPasswordIsNull: '请输入密码',
      promptNameIsNull: '请输入用户名',
      promptRoleIdsIsNull: '请选择授权角色',
    },
  },
};

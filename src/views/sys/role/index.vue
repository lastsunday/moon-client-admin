<template>
  <PageWrapper>
    <BasicTable
      class="basic-table"
      @register="registerTable"
      ref="tableRef"
      :pagination="pagination"
    >
      <template #toolbar>
        <a-button type="primary" @click="openCreateModal()">
          <EditOutlined />
          {{ t('sys.role.table.action.create') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('sys.role.table.action.browse'),
              icon: 'ant-design:eye-outlined',
              onClick: openBrowseModal.bind(null, record),
              ifShow: !record.canModify,
            },
            {
              label: t('sys.role.table.action.modify'),
              icon: 'ant-design:form-outlined',
              onClick: openModifyModal.bind(null, record),
              ifShow: record.canModify,
            },
            {
              label: t('sys.role.table.action.delete'),
              icon: 'ic:outline-delete-outline',
              onClick: deleteRecord.bind(null, record),
              disabled: !record.canModify,
              color: 'error',
            },
          ]"
        />
      </template>
    </BasicTable>
    <CreateOrModifyFormModal @register="createOrModifyModal" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, toRaw, ref, unref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { EditOutlined } from '@ant-design/icons-vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    FormProps,
    TableActionType,
  } from '/@/components/Table';
  import {
    getRoleList,
    rolePermission,
    deleteRoleRecord,
    createRoleRecord,
    updateRoleRecord,
  } from '/@/api/sys/role';
  import {
    RoleListModel,
    UpdateRoleRecordParams,
    CreateRoleRecordParams,
  } from '/@/api/sys/model/roleModel';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import CreateOrModifyFormModal from './CreateOrModifyFormModal.vue';
  export default defineComponent({
    name: 'Role',
    components: {
      BasicTable,
      TableAction,
      EditOutlined,
      PageWrapper,
      CreateOrModifyFormModal,
    },
    setup() {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const pagination = ref<any>(true);

      const { createConfirm, createMessage } = useMessage();
      const { success, error } = createMessage;
      const permissionList = ref<any>([]);
      const allPermissionList = ref<string[]>([]);
      const { t } = useI18n();

      const columns = [
        {
          title: t('sys.role.table.columns.roleName'),
          dataIndex: 'name',
        },
        {
          title: t('sys.role.table.columns.roleDesc'),
          dataIndex: 'desc',
        },
      ];

      onMounted(() => {
        rolePermission().then((data) => {
          permissionList.value = convertPermissionToTree(data.items);
          allPermissionList.value = data.items;
        });

        setCreateOrModifyModalProps({
          okText: t('sys.admin.modal.action.ok'),
          cancelText: t('sys.admin.modal.action.cancel'),
          minHeight: 350,
        });
      });

      function convertPermissionToTree(permissionArray: any) {
        let result = [];
        const permissionMap = new Map();
        const SPLIT_CHAR = ':';
        for (let i = 0; i < permissionArray.length; i++) {
          const permission = permissionArray[i];
          const splitPermission = permission.split(SPLIT_CHAR);
          let tempPermission = '';
          for (let n = 0; n < splitPermission.length; n++) {
            let splitItem = splitPermission[n];
            let previousItem = tempPermission;
            if (n == 0) {
              tempPermission += splitItem;
            } else {
              tempPermission += SPLIT_CHAR + splitItem;
            }
            if (permissionMap.has(tempPermission)) {
              // skip
            } else {
              permissionMap.set(tempPermission, {
                key: tempPermission,
                title:
                  t('permission.' + splitItem) === 'permission.' + splitItem
                    ? tempPermission
                    : t('permission.' + splitItem),
                children: [],
              });
              if (n == 0) {
                result.push(permissionMap.get(tempPermission));
              }
            }
            if (n == 0) {
              //skip
            } else {
              if (
                permissionMap.get(previousItem).children.includes(permissionMap.get(tempPermission))
              ) {
                //skip
              } else {
                permissionMap.get(previousItem).children.push(permissionMap.get(tempPermission));
              }
            }
          }
        }
        if (result.length == 1) {
          //not show root
          let rootChildren = result[0].children;
          result = [];
          for (let i = 0; i < rootChildren.length; i++) {
            result.push(rootChildren[i]);
          }
        }
        return result;
      }

      const formConfig: Partial<FormProps> = {
        labelWidth: 100,
        schemas: [
          {
            field: 'name',
            label: t('sys.role.table.form.roleName'),
            component: 'Input',
            colProps: {
              xl: 12,
            },
            componentProps: {
              placeholder: t('sys.role.table.form.promptFormat.promptRoleNameIsNull'),
            },
          },
        ],
      };

      function openCreateModal() {
        setCreateOrModifyModalProps({
          title: t('sys.role.modal.title.create'),
          showCancelBtn: true,
          showOkBtn: true,
        });
        const data = {
          formData: { status: 0 },
          formConfig: {
            initData: {
              permissions: permissionList,
              allPermissionList,
            },
            confirmCallback: createRecord,
          },
        };
        openCreateOrModifyModal(true, data);
      }

      function openBrowseModal(record: UpdateRoleRecordParams) {
        setCreateOrModifyModalProps({
          title: t('sys.role.modal.title.browse'),
          showCancelBtn: false,
          showOkBtn: false,
        });
        const data = {
          formData: record,
          formConfig: {
            initData: {
              permissions: permissionList,
              allPermissionList,
            },
          },
        };
        openCreateOrModifyModal(true, data);
      }

      function openModifyModal(record: UpdateRoleRecordParams) {
        setCreateOrModifyModalProps({
          title: t('sys.role.modal.title.modify'),
          showCancelBtn: true,
          showOkBtn: true,
        });
        const data = {
          formData: record,
          formConfig: {
            initData: {
              permissions: permissionList,
              allPermissionList,
            },
            confirmCallback: updateRecord,
          },
        };
        openCreateOrModifyModal(true, data);
      }

      function createRecord(formData: CreateRoleRecordParams, closeForm: Function) {
        setCreateOrModifyModalProps({ loading: true });
        if (!formData.permissions) {
          formData.permissions = [];
        }
        const param: CreateRoleRecordParams = toRaw(formData);
        const targetPermissions: string[] = [];
        for (let i = 0; i < param.permissions.length; i++) {
          const permission = param.permissions[i];
          if (allPermissionList.value.includes(permission)) {
            targetPermissions.push(permission);
          }
        }
        param.permissions = targetPermissions;
        createRoleRecord(toRaw(formData)).then(
          () => {
            setCreateOrModifyModalProps({ loading: false });
            success(t('sys.role.modal.createContent.successContent'));
            closeForm();
            reloadTableData();
          },
          () => {
            setCreateOrModifyModalProps({ loading: false });
            error(t('sys.role.modal.createContent.failedContent'));
          },
        );
      }

      function deleteRecord(record: RoleListModel) {
        createConfirm({
          iconType: 'warning',
          title: t('sys.role.table.deleteContent.warn'),
          content: t('sys.role.table.deleteContent.promptContent', {
            roleName: record.name,
          }),
          onOk: async () => {
            setLoading(true);
            deleteRoleRecord(toRaw({ id: record.id })).then(
              () => {
                setLoading(false);
                success(t('sys.role.table.deleteContent.successContent'));
                reloadTableData();
              },
              () => {
                setLoading(false);
                error(t('sys.role.table.deleteContent.failedContent'));
              },
            );
          },
        });
      }

      function updateRecord(formData: UpdateRoleRecordParams, closeForm: Function) {
        setCreateOrModifyModalProps({ loading: true });
        if (!formData.permissions) {
          formData.permissions = [];
        }
        const param: UpdateRoleRecordParams = toRaw(formData);
        const targetPermissions: string[] = [];
        for (let i = 0; i < param.permissions.length; i++) {
          const permission = param.permissions[i];
          if (allPermissionList.value.includes(permission)) {
            targetPermissions.push(permission);
          }
        }
        param.permissions = targetPermissions;
        updateRoleRecord(param).then(
          () => {
            setCreateOrModifyModalProps({ loading: false });
            success(t('sys.role.modal.modifyContent.successContent'));
            closeForm();
            reloadTableData();
          },
          () => {
            setCreateOrModifyModalProps({ loading: false });
            error(t('sys.role.modal.modifyContent.failedContent'));
          },
        );
      }

      function reloadTableData() {
        const tableAction = unref(tableRef);
        if (tableAction !== null) {
          tableAction.reload();
        } else {
          // skip
        }
      }

      const [
        createOrModifyModal,
        { openModal: openCreateOrModifyModal, setModalProps: setCreateOrModifyModalProps },
      ] = useModal();

      const [registerTable, { setLoading }] = useTable({
        api: getRoleList,
        columns: columns,
        formConfig: formConfig,
        useSearchForm: true,
        showTableSetting: true,
        actionColumn: {
          width: 200,
          title: t('sys.role.table.columns.operation'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      return {
        registerTable,
        createOrModifyModal,
        deleteRecord,
        tableRef,
        pagination,
        openBrowseModal,
        openCreateModal,
        openModifyModal,
        t,
      };
    },
  });
</script>

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
              label: t('sys.role.table.action.modify'),
              icon: 'ant-design:form-outlined',
              onClick: openModifyModal.bind(null, record),
            },
            {
              label: t('sys.role.table.action.delete'),
              icon: 'ic:outline-delete-outline',
              onClick: deleteRecord.bind(null, record),
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
        });

        setCreateOrModifyModalProps({
          okText: t('sys.admin.modal.action.ok'),
          cancelText: t('sys.admin.modal.action.cancel'),
          minHeight: 350,
        });
      });

      function convertPermissionToTree(permissionArray: any) {
        const result = [];
        const permissionMap = new Map();
        const PARENT_GROUP_INDEX = 0;
        const GROUP_INDEX = 1;
        const OPERATION_INDEX = 2;
        const SPLIT_CHAR = ':';
        const LABLE_SPLIT_CHAR = '_';
        for (let i = 0; i < permissionArray.length; i++) {
          const permission = permissionArray[i];
          const splitPermission = permission.split(SPLIT_CHAR);
          const parentGroup = splitPermission[PARENT_GROUP_INDEX];
          const group = splitPermission[GROUP_INDEX];
          const operation = splitPermission[OPERATION_INDEX];
          const key = parentGroup + SPLIT_CHAR + group;
          const parentGroupLable = parentGroup + LABLE_SPLIT_CHAR + group;
          if (permissionMap.has(key)) {
            // skip
          } else {
            permissionMap.set(key, {
              key: key,
              title:
                t('permission.' + parentGroupLable) === parentGroupLable
                  ? parentGroupLable
                  : t('permission.' + parentGroupLable),
              children: [],
            });
          }
          permissionMap.get(key).children.push({
            key: permission,
            title:
              t('permission.' + operation) === operation ? operation : t('permission.' + operation),
            api: permission,
          });
        }
        for (const key of permissionMap.keys()) {
          result.push(permissionMap.get(key));
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
        });
        const data = {
          formData: { status: 0 },
          formConfig: {
            initData: {
              permissions: permissionList,
            },
            confirmCallback: createRecord,
          },
        };
        openCreateOrModifyModal(true, data);
      }

      function openModifyModal(record: UpdateRoleRecordParams) {
        setCreateOrModifyModalProps({
          title: t('sys.role.modal.title.modify'),
        });
        const data = {
          formData: record,
          formConfig: {
            initData: {
              permissions: permissionList,
            },
            confirmCallback: updateRecord,
          },
        };
        openCreateOrModifyModal(true, data);
      }

      function createRecord(formData: CreateRoleRecordParams, closeForm: Function) {
        setCreateOrModifyModalProps({ loading: true });
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
          }
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
              }
            );
          },
        });
      }

      function updateRecord(formData: UpdateRoleRecordParams, closeForm: Function) {
        setCreateOrModifyModalProps({ loading: true });
        updateRoleRecord(toRaw(formData)).then(
          () => {
            setCreateOrModifyModalProps({ loading: false });
            success(t('sys.role.modal.modifyContent.successContent'));
            closeForm();
            reloadTableData();
          },
          () => {
            setCreateOrModifyModalProps({ loading: false });
            error(t('sys.role.modal.modifyContent.failedContent'));
          }
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
        openCreateModal,
        openModifyModal,
        t,
      };
    },
  });
</script>
<style lang="less">
  .basic-table {
    padding: 0;
  }
</style>

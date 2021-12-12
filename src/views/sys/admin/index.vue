<template>
  <PageWrapper>
    <BasicTable @register="registerTable" ref="tableRef">
      <template #toolbar>
        <a-button type="primary" @click="showCreateModal()">
          <g-icon icon="ant-design:edit-outlined" />
          {{ t('sys.admin.table.action.create') }}
        </a-button>
      </template>
      <template #roleIds="{ record }">
        <Tag class="roleIds radian" v-for="role in record.roleIds" :key="role">
          {{ roleIdListMap.get(role) ? roleIdListMap.get(role) : role }}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('sys.admin.table.action.modify'),
              icon: 'ant-design:form-outlined',
              onClick: showModifyModal.bind(null, record),
            },
            {
              label: t('sys.admin.table.action.delete'),
              icon: 'ic:outline-delete-outline',
              onClick: deleteRecord.bind(null, record),
              color: 'error',
            },
            {
              label: t('sys.admin.table.action.reset'),
              icon: 'fe:key',
              onClick: showResetModal.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <CreateOrModifyFormModal @register="createOrModifyModal" />
    <ResetFormModal @register="resetModal" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, toRaw, ref, unref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import {
    BasicTable,
    useTable,
    TableAction,
    FormProps,
    TableActionType,
  } from '/@/components/Table';
  import {
    getAdminList,
    deleteAdminRecord,
    getRoleOptionsList,
    createAdminRecord,
    updateAdminRecord,
    resetAdminPassword,
  } from '/@/api/sys/admin';
  import {
    AdminListModel,
    RoleOptionsListResultModel,
    ResetAdminPasswordParams,
    CreateAdminRecordParams,
    UpdateAdminRecordParams,
  } from '/@/api/sys/model/adminModel';
  import { Tag } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import CreateOrModifyFormModal from './CreateOrModifyFormModal.vue';
  import ResetFormModal from './ResetFormModal.vue';

  export default defineComponent({
    name: 'Admin',
    components: {
      BasicTable,
      PageWrapper,
      CreateOrModifyFormModal,
      ResetFormModal,
      TableAction,
      Tag,
    },
    setup() {
      const tableRef = ref<Nullable<TableActionType>>(null);

      const { createConfirm, createMessage } = useMessage();
      const { success, error } = createMessage;
      const roleIdList = ref<RoleOptionsListResultModel>([]);
      const roleIdListMap = new Map();
      const { t } = useI18n();

      const columns = [
        {
          title: t('sys.admin.table.columns.adminId'),
          dataIndex: 'id',
        },
        {
          title: t('sys.admin.table.columns.adminName'),
          dataIndex: 'account',
        },
        {
          title: t('sys.admin.table.columns.adminRole'),
          dataIndex: 'roleIds',
          slots: { customRender: 'roleIds' },
        },
      ];

      const formConfig: Partial<FormProps> = {
        labelWidth: 100,
        schemas: [
          {
            field: 'account',
            label: t('sys.admin.table.form.adminName'),
            component: 'Input',
            componentProps: {
              placeholder: t('sys.admin.table.form.promptFormat.promptAdminNameIsNull'),
            },
            colProps: {
              xl: 12,
            },
          },
          {
            field: 'roleIds',
            label: t('sys.admin.table.form.adminRole'),
            component: 'Select',
            componentProps: {
              mode: 'multiple',
              filterOption: filterAdminRole,
              options: roleIdList,
              placeholder: t('sys.admin.table.form.promptFormat.promptAdminRoleIsNull'),
            },
            colProps: {
              xl: 12,
            },
          },
        ],
      };

      onMounted(() => {
        setLoading(true);
        getRoleOptionsList().then((data) => {
          setLoading(false);
          roleIdList.value = data;
          for (let i = 0; i < data.length; i++) {
            roleIdListMap.set(data[i].value, data[i].label);
          }
        });
        setCreateOrModifyModalProps({
          okText: t('sys.admin.modal.action.ok'),
          cancelText: t('sys.admin.modal.action.cancel'),
        });
        setResetModalProps({
          minHeight: 50,
          centered: true,
          okText: t('sys.admin.modal.action.ok'),
          cancelText: t('sys.admin.modal.action.cancel'),
        });
      });

      function filterAdminRole(inputValue: any, option: any) {
        const label = option.label.toLowerCase();
        const inputLabel = inputValue.toLowerCase();
        return label.indexOf(inputLabel) != -1;
      }

      function showCreateModal() {
        setCreateOrModifyModalProps({
          title: t('sys.admin.modal.title.create'),
        });
        const data = {
          formData: {
            status: 0,
            gender: 2,
          },
          formConfig: {
            initData: {
              roleIds: roleIdList,
              isDisabledAccount: false,
              isShowPassword: true,
            },
            confirmCallback: createRecord,
          },
        };
        openCreateOrModifyModal(true, data);
      }

      function showModifyModal(record: UpdateAdminRecordParams) {
        setCreateOrModifyModalProps({
          title: t('sys.admin.modal.title.modify'),
        });
        const data = {
          formData: record,
          formConfig: {
            initData: {
              roleIds: roleIdList,
              isDisabledAccount: true,
              isShowPassword: false,
            },
            confirmCallback: updateRecord,
          },
        };
        openCreateOrModifyModal(true, data);
      }

      function showResetModal(record: AdminListModel) {
        setResetModalProps({
          title: t('sys.admin.modal.title.reset'),
        });
        const data = {
          formData: {
            userId: record.id,
            account: record.account,
          },
          formConfig: {
            confirmCallback: resetPassword,
          },
        };
        openResetModal(true, data);
      }

      function createRecord(formData: CreateAdminRecordParams, closeForm: Function) {
        setCreateOrModifyModalProps({ loading: true });
        createAdminRecord(toRaw(formData)).then(
          () => {
            setCreateOrModifyModalProps({ loading: false });
            success(t('sys.admin.modal.createContent.successContent'));
            closeForm();
            reloadTableData();
          },
          () => {
            setCreateOrModifyModalProps({ loading: false });
            error(t('sys.admin.modal.createContent.failedContent'));
          },
        );
      }

      function deleteRecord(record: AdminListModel) {
        createConfirm({
          iconType: 'warning',
          title: t('sys.admin.table.deleteContent.warn'),
          content: t('sys.admin.table.deleteContent.promptContent', {
            adminName: record.account,
          }),
          onOk: async () => {
            setLoading(true);
            deleteAdminRecord(toRaw({ id: record.id })).then(
              () => {
                setLoading(false);
                success(t('sys.admin.table.deleteContent.successContent'));
                reloadTableData();
              },
              () => {
                setLoading(false);
                error(t('sys.admin.table.deleteContent.failedContent'));
              },
            );
          },
        });
      }

      function updateRecord(formData: AdminListModel, closeForm: Function) {
        setCreateOrModifyModalProps({ loading: true });
        updateAdminRecord(toRaw(formData)).then(
          () => {
            setCreateOrModifyModalProps({ loading: false });
            success(t('sys.admin.modal.modifyContent.successContent'));
            closeForm();
            reloadTableData();
          },
          () => {
            setCreateOrModifyModalProps({ loading: false });
            error(t('sys.admin.modal.modifyContent.failedContent'));
          },
        );
      }

      function resetPassword(formData: ResetAdminPasswordParams, closeForm: Function) {
        setResetModalProps({ loading: true });
        resetAdminPassword(toRaw(formData)).then(
          () => {
            setResetModalProps({ loading: false });
            success(t('sys.admin.modal.modifyContent.successContent'));
            closeForm();
            reloadTableData();
          },
          () => {
            setResetModalProps({ loading: false });
            error(t('sys.admin.modal.modifyContent.failedContent'));
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

      const [resetModal, { openModal: openResetModal, setModalProps: setResetModalProps }] =
        useModal();

      const [registerTable, { setLoading }] = useTable({
        api: getAdminList,
        columns: columns,
        formConfig: formConfig,
        useSearchForm: true,
        showTableSetting: true,
        actionColumn: {
          width: 260,
          title: t('sys.admin.table.columns.operation'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      return {
        registerTable,
        createOrModifyModal,
        deleteRecord,
        resetModal,
        tableRef,
        showCreateModal,
        showModifyModal,
        showResetModal,
        roleIdListMap,
        t,
      };
    },
  });
</script>
<style lang="less">
  .basic-table {
    .radian {
      border-radius: 4px;
    }

    .roleIds {
      padding: 2px 5px;
      margin: 0 5px;
      color: #1890ff;
      background: #bce4ec;
      border: solid 1px #1890ff;
    }
  }
</style>

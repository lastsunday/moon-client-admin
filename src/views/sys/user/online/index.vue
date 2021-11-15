<template>
  <BasicTable @register="registerTable" ref="tableRef" :pagination="pagination">
    <template #loginTime="{ record }">
      {{ formatToDateTime(record.loginTime) }}
    </template>
    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            label: t('sys.user.online.table.action.forceLogout'),
            icon: 'ic:outline-delete-outline',
            onClick: handleForceLogout.bind(null, record),
          },
        ]"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, toRaw, ref, unref } from 'vue';
  import { BasicTable, useTable, TableActionType } from '/@/components/Table';
  import { userOnlineForceLogout, getUserOnlineList } from '/@/api/sys/user';
  import { FormProps, TableAction, FetchParams } from '/@/components/Table';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { UserOnlineModel } from '/@/api/sys/model/userModel';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'Online',
    components: { BasicTable, TableAction },
    setup() {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const pagination = ref<any>(true);

      const { t } = useI18n();

      const columns = [
        {
          title: t('sys.user.online.table.columns.tokenId'),
          dataIndex: 'tokenId',
        },
        {
          title: t('sys.user.online.table.columns.userName'),
          dataIndex: 'userName',
        },
        {
          title: t('sys.user.online.table.columns.ipaddr'),
          dataIndex: 'ipaddr',
        },
        {
          title: t('sys.user.online.table.columns.browser'),
          dataIndex: 'browser',
        },
        {
          title: t('sys.user.online.table.columns.os'),
          dataIndex: 'os',
        },
        {
          title: t('sys.user.online.table.columns.loginTime'),
          dataIndex: 'loginTime',
          sorter: true,
          slots: { customRender: 'loginTime' },
        },
      ];

      const formConfig: Partial<FormProps> = {
        labelWidth: 100,
        schemas: [
          {
            field: 'userName',
            label: t('sys.user.online.table.columns.userName'),
            component: 'Input',
            componentProps: {
              placeholder: t('sys.user.online.table.form.promptFormat.promptUserNameIsNull'),
            },
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'loginRangeDate',
            component: 'RangePicker',
            label: t('sys.user.online.table.form.loginRangeDate'),
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'ipaddr',
            label: t('sys.user.online.table.columns.ipaddr'),
            component: 'Input',
            componentProps: {
              placeholder: t('sys.user.online.table.form.promptFormat.promptIpaddrIsNull'),
            },
            colProps: {
              xl: 8,
            },
          },
        ],
      };

      const [registerTable] = useTable({
        api: getUserOnlineList,
        columns: columns,
        useSearchForm: true,
        formConfig: formConfig,
        showTableSetting: true,
        actionColumn: {
          width: 160,
          title: t('sys.user.online.table.action.operation'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleForceLogout(record: UserOnlineModel) {
        const { createConfirm, createSuccessModal } = useMessage();
        createConfirm({
          iconType: 'warning',
          title: t('sys.user.online.modal.warn'),
          content: t('sys.user.online.modal.promptContent', { userName: record.userName }),
          onOk: async () => {
            userOnlineForceLogout(
              toRaw({
                tokenId: record.tokenId,
              })
            ).then(() => {
              const tableAction = unref(tableRef);
              if (tableAction !== null) {
                const fetchParams: FetchParams = {
                  searchInfo: {
                    userName: '',
                    ipaddr: '',
                  },
                };
                tableAction.reload(fetchParams);
              }
              createSuccessModal({
                content: t('sys.user.online.modal.successContent'),
              });
            });
          },
        });
      }
      t;
      return {
        registerTable,
        formatToDateTime,
        handleForceLogout,
        tableRef,
        pagination,
        t,
      };
    },
  });
</script>
<style lang="less"></style>

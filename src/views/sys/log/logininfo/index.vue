<template>
  <PageWrapper>
    <BasicTable @register="registerTable" ref="tableRef" class="basic-table">
      <template #toolbar>
        <a-button type="primary" color="error" @click="deleteSelectLog">
          <g-icon icon="ic:outline-delete-outline" />
          {{ t('sys.log.loginInfo.table.action.delete') }}
        </a-button>
        <a-button type="primary" color="error" @click="deleteAllLog">
          <g-icon icon="ic:outline-delete-outline" />
          {{ t('sys.log.loginInfo.table.action.empty') }}
        </a-button>
        <a-button type="primary" @click="exportLogToSheetXlsx">
          <g-icon icon="feather:download" />
          {{ t('sys.log.loginInfo.table.action.export') }}
        </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getLoginLogInfo } from '/@/api/sys/log/loginInfo';
  import { FormProps } from '/@/components/Table';
  import { TableActionType } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  export default defineComponent({
    name: 'LoginInfo',
    components: { PageWrapper, BasicTable },
    setup() {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const { t } = useI18n();
      const columns = [
        {
          title: t('sys.log.loginInfo.table.columns.userName'),
          dataIndex: 'userName',
        },
        {
          title: t('sys.log.loginInfo.table.columns.ipaddr'),
          dataIndex: 'ipaddr',
        },
        {
          title: t('sys.log.loginInfo.table.columns.ipplace'),
          dataIndex: 'ipplace',
        },
        {
          title: t('sys.log.loginInfo.table.columns.browser'),
          dataIndex: 'browser',
        },
        {
          title: t('sys.log.loginInfo.table.columns.os'),
          dataIndex: 'os',
        },
        {
          title: t('sys.log.loginInfo.table.columns.status'),
          dataIndex: 'status',
        },
        {
          title: t('sys.log.loginInfo.table.columns.operationInfo'),
          dataIndex: 'operationInfo',
        },
        {
          title: t('sys.log.loginInfo.table.columns.loginDate'),
          dataIndex: 'loginDate',
        },
      ];

      const formConfig: Partial<FormProps> = {
        labelWidth: 100,
        schemas: [
          {
            field: 'ipaddr',
            label: t('sys.log.loginInfo.table.form.columns.ipaddr'),
            component: 'Input',
            componentProps: {
              placeholder: t('sys.log.loginInfo.table.form.promptFormat.promptIpAddrIsNull'),
            },
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'userName',
            label: t('sys.log.loginInfo.table.form.columns.userName'),
            component: 'Input',
            componentProps: {
              placeholder: t('sys.log.loginInfo.table.form.promptFormat.promptUserNameIsNull'),
            },
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'status',
            label: t('sys.log.loginInfo.table.form.columns.status'),
            component: 'Select',
            componentProps: {
              placeholder: t('sys.log.loginInfo.table.form.promptFormat.promptStatusIsNull'),
              options: [
                {
                  label: t('sys.log.loginInfo.table.form.status.success'),
                  value: '0',
                },
                {
                  label: t('sys.log.loginInfo.table.form.status.failed'),
                  value: '1',
                },
              ],
            },
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'loginRangDate',
            label: t('sys.log.loginInfo.table.form.columns.loginRangDate'),
            component: 'RangePicker',
            colProps: {
              xl: 8,
            },
          },
        ],
      };

      /*
       * 获取当天日期对象
       */
      function getTodayDate() {
        const date = new Date();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        if (date.getMonth() + 1 < 9) {
          month = '0' + (date.getMonth() + 1).toString();
        }
        if (date.getDate() < 9) {
          day = '0' + date.getDate().toString();
        }
        const today = {
          year: date.getFullYear().toString(),
          month: month,
          day: day,
          hours: date.getHours().toString(),
          minttes: date.getMinutes().toString(),
          seconds: date.getSeconds().toString(),
        };
        return today;
      }

      /*
       * 导入数据到jsonToSheetXlsx方法
       */
      function customSheetXlsxHeader() {
        const data = getLoginLogInfo();
        const date = getTodayDate();
        const today = date.year + '' + date.month + '' + date.day;
        jsonToSheetXlsx({
          data,
          header: {
            id: t('sys.log.loginInfo.table.columns.id'),
            userName: t('sys.log.loginInfo.table.columns.userName'),
            ipaddr: t('sys.log.loginInfo.table.columns.ipaddr'),
            ipplace: t('sys.log.loginInfo.table.columns.ipplace'),
            browser: t('sys.log.loginInfo.table.columns.browser'),
            os: t('sys.log.loginInfo.table.columns.os'),
            status: t('sys.log.loginInfo.table.columns.status'),
            operationInfo: t('sys.log.loginInfo.table.columns.operationInfo'),
            loginDate: t('sys.log.loginInfo.table.columns.loginDate'),
          },
          filename: today + '登录日志.xlsx',
        });
      }

      function exportLogToSheetXlsx() {
        createConfirm({
          iconType: 'warning',
          title: t('sys.log.loginInfo.table.exportLogToSheetXlsx.warn'),
          content: t('sys.log.loginInfo.table.exportLogToSheetXlsx.promptContent'),
          onOk: async () => {
            customSheetXlsxHeader();
          },
        });
      }

      function deleteSelectLog() {
        const selectData = getSelectRows();
        if (selectData.length > 0) {
          createConfirm({
            iconType: 'warning',
            title: t('sys.log.loginInfo.table.deleteContent.warn'),
            content: t('sys.log.loginInfo.table.deleteContent.promptContent'),
            onOk: () => {
              success(t('sys.log.loginInfo.table.deleteContent.successContent'));
              clearSelectedRowKeys();
            },
          });
        } else {
          error(t('sys.log.loginInfo.table.deleteContent.selectIsNull'));
          clearSelectedRowKeys();
        }
      }

      function deleteAllLog() {
        createConfirm({
          iconType: 'warning',
          title: t('sys.log.loginInfo.table.deleteContent.warn'),
          content: t('sys.log.loginInfo.table.deleteContent.promptContent'),
          onOk: () => {
            success(t('sys.log.loginInfo.table.deleteContent.successContent'));
            clearSelectedRowKeys();
          },
        });
      }

      const { createConfirm, createMessage } = useMessage();

      const { success, error } = createMessage;

      const [registerTable, { getSelectRows, clearSelectedRowKeys }] = useTable({
        dataSource: getLoginLogInfo(),
        columns: columns,

        showTableSetting: true,
        clickToRowSelect: false,
        useSearchForm: true,
        formConfig: formConfig,
        rowSelection: {
          type: 'checkbox',
        },
      });

      return {
        t,
        exportLogToSheetXlsx,
        deleteAllLog,
        deleteSelectLog,
        registerTable,
        tableRef,
      };
    },
  });
</script>

<style lang="less">
  .basic-table {
    padding: 0;
  }
</style>

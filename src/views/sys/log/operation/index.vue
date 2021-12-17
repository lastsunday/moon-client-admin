<template>
  <PageWrapper>
    <BasicTable @register="registerTable" ref="tableRef">
      <template #expandedRowRender="{ record }">
        <div>
          <span class="expandItemTitle">{{ t('sys.log.operation.path') }}</span>
          <div class="expandItemContent">{{ record.path ? record.path : '' }}</div>
        </div>
        <div>
          <span class="expandItemTitle">{{ t('sys.log.operation.request') }}</span>
          <div class="expandItemContent">{{ record.request ? record.request : '' }}</div>
        </div>
        <div>
          <span class="expandItemTitle">{{ t('sys.log.operation.response') }}</span>
          <div class="expandItemContent">{{ record.response ? record.response : '' }}</div>
        </div>
        <span v-if="record.errorCode">
          <span class="expandItemTitle">{{ t('sys.log.operation.errorCode') }}</span>
          <div class="expandItemContent">{{ record.errorCode }} ({{ record.errorMessage }})</div>
        </span>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FormProps } from '/@/components/Table';
  import { TableActionType } from '/@/components/Table';
  import { list } from '/@/api/sys/log/operationLog';
  import { formatToDateTime } from '/@/utils/dateUtil';
  export default defineComponent({
    name: 'OperationLog',
    components: { PageWrapper, BasicTable },
    setup() {
      const { t } = useI18n();
      const functionModuleCodes = [20000, 30000, 40000, 50000];
      const operationCodes = [10001, 10002, 10003, 10004, 20001, 20002, 20003, 30001, 30002, 50001];
      const functionModuleOption = [];
      const operationCodeOption = [];
      for (let i = 0; i < functionModuleCodes.length; i++) {
        const code = functionModuleCodes[i];
        functionModuleOption.push({
          label: t('sys.log.operation.functionModuleCode.' + code),
          value: code,
        });
      }
      for (let i = 0; i < operationCodes.length; i++) {
        const code = operationCodes[i];
        operationCodeOption.push({
          label: t('sys.log.operation.operationCode.' + code),
          value: code,
        });
      }
      const tableRef = ref<Nullable<TableActionType>>(null);
      function convertCode(prefix: string, code: string) {
        return t(prefix + code) == prefix + code ? code : t(prefix + code);
      }
      const columns = [
        {
          title: t('sys.log.operation.functionModule'),
          dataIndex: 'functionModule',
          format: (text, record, index) => {
            return convertCode('sys.log.operation.functionModuleCode.', text);
          },
        },
        {
          title: t('sys.log.operation.operation'),
          dataIndex: 'operation',
          format: (text, record, index) => {
            return convertCode('sys.log.operation.operationCode.', text);
          },
        },
        {
          title: t('sys.log.operation.errorCode'),
          dataIndex: 'errorCode',
        },
        {
          title: t('sys.log.operation.operator'),
          dataIndex: 'operatorAccount',
        },
        {
          title: t('sys.log.operation.address'),
          dataIndex: 'ip',
        },
        {
          title: t('sys.log.operation.operationTime'),
          dataIndex: 'createTime',
          sorter: true,
          format: (text, record, index) => {
            return formatToDateTime(text);
          },
        },
      ];

      const formConfig: Partial<FormProps> = {
        labelWidth: 100,
        schemas: [
          {
            field: 'operatorAccount',
            label: t('sys.log.operation.operator'),
            component: 'Input',
            componentProps: {},
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'ip',
            label: t('sys.log.operation.address'),
            component: 'Input',
            componentProps: {},
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'createTime',
            label: t('sys.log.operation.operationTime'),
            component: 'RangePicker',
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'functionModule',
            label: t('sys.log.operation.functionModule'),
            component: 'Select',
            componentProps: {
              options: functionModuleOption,
            },
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'operation',
            label: t('sys.log.operation.operation'),
            component: 'Select',
            componentProps: {
              options: operationCodeOption,
            },
            colProps: {
              xl: 8,
            },
          },
          {
            field: 'notHasErrorCode',
            label: t('sys.log.operation.notHasErrorCode'),
            component: 'Checkbox',
            colProps: {
              xl: 2,
            },
          },
          {
            field: 'errorCode',
            label: t('sys.log.operation.errorCode'),
            component: 'Input',
            colProps: {
              xl: 6,
            },
          },
          {
            field: 'request',
            label: t('sys.log.operation.request'),
            component: 'Input',
            componentProps: {},
            colProps: {
              xl: 24,
            },
          },
          {
            field: 'response',
            label: t('sys.log.operation.response'),
            component: 'Input',
            componentProps: {},
            colProps: {
              xl: 24,
            },
          },
        ],
      };

      const [registerTable] = useTable({
        api: list,
        columns: columns,
        showTableSetting: true,
        clickToRowSelect: false,
        useSearchForm: true,
        formConfig: formConfig,
        expandRowByClick: true,
      });

      return {
        t,
        registerTable,
        tableRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  .expandItemTitle {
    font-weight: bold;
  }
  .expandItemContent {
    padding-left: 32px;
  }
</style>

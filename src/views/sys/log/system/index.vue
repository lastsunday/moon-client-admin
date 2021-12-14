<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="batchDownloadLogFile">
          <g-icon icon="feather:download" />
          {{ t('sys.log.system.table.action.batchDownload') }}
        </a-button>
      </template>
      <template #action="data">
        <TableAction
          :actions="[
            {
              label: t('sys.log.system.table.action.consult'),
              icon: 'mdi:file-eye-outline',
              onClick: showConsultModal.bind(null, data),
              disabled: !data.record.name.endsWith('log'),
            },
            {
              label: t('sys.log.system.table.action.download'),
              icon: 'feather:download',
              onClick: downloadLogFile.bind(null, data),
            },
          ]"
        />
      </template>
    </BasicTable>
    <ConsultModal @register="consultModal" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, toRaw } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { list, get } from '/@/api/sys/log/system';
  import { downloadByData } from '/@/utils/file/download';
  import ConsultModal from './ConsultModal.vue';
  import numeral from 'numeral';
  import { formatToDateTime } from '/@/utils/dateUtil';

  export default defineComponent({
    name: 'System',
    components: { PageWrapper, TableAction, BasicTable, ConsultModal },
    setup() {
      const { t } = useI18n();

      const columns = [
        {
          title: t('sys.log.system.table.columns.name'),
          dataIndex: 'name',
        },
        {
          title: t('sys.log.system.table.columns.updateDate'),
          dataIndex: 'modifyDate',
          format: (text, record, index) => {
            return formatToDateTime(text);
          },
        },
        {
          title: t('sys.log.system.table.columns.size'),
          dataIndex: 'length',
          sorter: (a, b) => a.length - b.length,
          format: (text, record, index) => {
            return `${numeral(text).format('0 ib')}`;
          },
        },
        {
          title: t('sys.log.system.table.columns.createDate'),
          dataIndex: 'createDate',
          format: (text, record, index) => {
            return formatToDateTime(text);
          },
        },
      ];

      const [consultModal, { openModal: openConsultModal, setModalProps: setConsultModalProps }] =
        useModal();

      const [registerTable, { getSelectRows, clearSelectedRowKeys }] = useTable({
        api: list,
        columns: columns,
        pagination: false,
        showTableSetting: true,
        clickToRowSelect: false,
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 200,
          title: t('sys.admin.table.columns.operation'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function batchDownloadLogFile() {
        const downloadLogFiles = getSelectRows();
        if (downloadLogFiles.length > 0) {
          for (let i = 0; i < downloadLogFiles.length; i++) {
            const record = toRaw(downloadLogFiles[i]);
            get({ id: record.id }).then((res) => {
              downloadByData(res, record.name);
            });
          }
          clearSelectedRowKeys();
        } else {
          // skip
        }
      }

      function downloadLogFile(data) {
        const record = toRaw(data.record);
        get({ id: record.id }).then((res) => {
          downloadByData(res, record.name);
        });
      }

      function showConsultModal(data) {
        let record = data.record;
        get({ id: record.id }).then((res) => {
          setConsultModalProps({
            title: record.name,
            width: 700,
            minHeight: 650,
            useWrapper: true,
            defaultFullscreen: true,
            showCancelBtn: false,
            showOkBtn: false,
          });
          var reader = new FileReader();
          reader.readAsText(res, 'utf-8');
          reader.onload = function (e) {
            data.record.fileData = reader.result;
            openConsultModal(true, data);
          };
        });
      }
      return {
        t,
        registerTable,
        consultModal,
        showConsultModal,
        downloadLogFile,
        batchDownloadLogFile,
      };
    },
  });
</script>

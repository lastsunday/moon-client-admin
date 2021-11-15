<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="batchDownloadLogFile">
          <g-icon icon="feather:download" />
          {{ t('sys.log.system.table.action.batchDownload') }}
        </a-button>
      </template>
      <template #action="record">
        <TableAction
          :actions="[
            {
              label: t('sys.log.system.table.action.consult'),
              icon: 'mdi:file-eye-outline',
              onClick: showConsultModal.bind(null, record),
            },
            {
              label: t('sys.log.system.table.action.download'),
              icon: 'feather:download',
              onClick: downloadLogFile.bind(null, record),
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
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'System',
    components: { PageWrapper, TableAction, BasicTable, ConsultModal },
    setup() {
      const { t } = useI18n();
      const { notification } = useMessage();

      const columns = [
        {
          title: t('sys.log.system.table.columns.name'),
          dataIndex: 'name',
        },
        {
          title: t('sys.log.system.table.columns.updateDate'),
          dataIndex: 'modifyDate',
        },
        {
          title: t('sys.log.system.table.columns.size'),
          dataIndex: 'length',
        },
        {
          title: t('sys.log.system.table.columns.createDate'),
          dataIndex: 'createDate',
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
        notification.warn({
          message: t('common.functionNotImplementYet'),
          duration: 3,
        });
        // TODO implement function
        const downloadLogFiles = getSelectRows();
        if (downloadLogFiles.length > 0) {
          for (let i = 0; i < downloadLogFiles.length; i++) {
            const record = toRaw(downloadLogFiles[i]);
            downloadByData(record.logContent, record.name + '.txt');
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
        //TODO handle error
      }

      function showConsultModal(data) {
        notification.warn({
          message: t('common.functionNotImplementYet'),
          duration: 3,
        });
        // TODO implement function
        setConsultModalProps({
          title: t('sys.log.system.modal.title'),
          width: 700,
          minHeight: 650,
          showCancelBtn: false,
          showOkBtn: false,
          useWrapper: false,
        });
        openConsultModal(true, data);
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
<style lang="less"></style>

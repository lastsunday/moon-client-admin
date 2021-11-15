export default {
  table: {
    columns: {
      name: 'LogName',
      updateDate: 'UpdateDate',
      size: 'LogSize',
      createDate: 'CreateDate',
      operation: 'Operation',
    },
    action: {
      consult: 'Consult',
      download: 'Download',
      batchDownload: 'BatchDownload',
    },
  },
  modal: {
    title: 'Consult Log',
    logInfo: {
      name: 'Name：{name}',
      size: 'Size：{size}',
    },
  },
};

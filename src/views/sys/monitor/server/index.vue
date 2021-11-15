<template>
  <PageWrapper>
    <div class="row bottom">
      <BasicTable @register="register_CPU" class="right" />
      <BasicTable @register="register_RAM" />
    </div>
    <Description @register="register_serverInfo" class="bottom" />
    <Description @register="register_JVMInfo" class="bottom" />
    <BasicTable @register="register_diskStatus" class="bottom" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    getServerInfo,
    getJVMInfo,
    getCPUInfo,
    getRAMInfo,
    getDiskStatusInfo,
  } from '/@/api/sys/monitor/server';
  export default defineComponent({
    name: 'Server',
    components: { BasicTable, Description, PageWrapper },
    setup() {
      const { t } = useI18n();
      const columns_CPU = [
        {
          title: t('sys.monitor.server.table_cpu.columns.attributes'),
          dataIndex: 'attributes',
        },
        {
          title: t('sys.monitor.server.table_cpu.columns.value'),
          dataIndex: 'value',
        },
      ];
      const columns_RAM = [
        {
          title: t('sys.monitor.server.table_ram.columns.attributes'),
          dataIndex: 'attributes',
        },
        {
          title: t('sys.monitor.server.table_ram.columns.ram'),
          dataIndex: 'ram',
        },
        {
          title: t('sys.monitor.server.table_ram.columns.jvm'),
          dataIndex: 'jvm',
        },
      ];
      const columns_diskStatus = [
        {
          title: t('sys.monitor.server.table_diskStatus.columns.driveLetterPath'),
          dataIndex: 'driveLetterPath',
        },
        {
          title: t('sys.monitor.server.table_diskStatus.columns.fileSystem'),
          dataIndex: 'fileSystem',
        },
        {
          title: t('sys.monitor.server.table_diskStatus.columns.driveLetterType'),
          dataIndex: 'driveLetterType',
        },
        {
          title: t('sys.monitor.server.table_diskStatus.columns.totalSize'),
          dataIndex: 'totalSize',
        },
        {
          title: t('sys.monitor.server.table_diskStatus.columns.availableSize'),
          dataIndex: 'availableSize',
        },
        {
          title: t('sys.monitor.server.table_diskStatus.columns.usedSize'),
          dataIndex: 'usedSize',
        },
        {
          title: t('sys.monitor.server.table_diskStatus.columns.usedPercent'),
          dataIndex: 'usedPercent',
        },
      ];
      const schema_serverInfo: DescItem[] = [
        {
          field: 'serverName',
          label: t('sys.monitor.server.description_serverInfo.schema.serverName'),
        },
        {
          field: 'operatingSystem',
          label: t('sys.monitor.server.description_serverInfo.schema.operatingSystem'),
        },
        {
          field: 'serverIP',
          label: t('sys.monitor.server.description_serverInfo.schema.serverIP'),
        },
        {
          field: 'systemStructure',
          label: t('sys.monitor.server.description_serverInfo.schema.systemStructure'),
        },
      ];
      const schema_JVMInfo: DescItem[] = [
        {
          field: 'javaName',
          label: t('sys.monitor.server.description_jvmInfo.schema.javaName'),
        },
        {
          field: 'javaVersion',
          label: t('sys.monitor.server.description_jvmInfo.schema.javaVersion'),
        },
        {
          field: 'startTime',
          label: t('sys.monitor.server.description_jvmInfo.schema.startTime'),
        },
        {
          field: 'runningTime',
          label: t('sys.monitor.server.description_jvmInfo.schema.runningTime'),
        },
        {
          field: 'installationPath',
          label: t('sys.monitor.server.description_jvmInfo.schema.installationPath'),
          span: 2,
        },
        {
          field: 'projectPath',
          label: t('sys.monitor.server.description_jvmInfo.schema.projectPath'),
          span: 2,
        },
      ];
      const [register_CPU] = useTable({
        title: t('sys.monitor.server.table_cpu.title'),
        dataSource: getCPUInfo(),
        columns: columns_CPU,
        pagination: false,
        canResize: false,
        striped: false,
        ellipsis: false,
        showIndexColumn: false,
      });
      const [register_RAM] = useTable({
        title: t('sys.monitor.server.table_ram.title'),
        dataSource: getRAMInfo(),
        columns: columns_RAM,
        pagination: false,
        canResize: false,
        striped: false,
        ellipsis: false,
        showIndexColumn: false,
      });
      const [register_diskStatus] = useTable({
        title: t('sys.monitor.server.table_diskStatus.title'),
        dataSource: getDiskStatusInfo(),
        columns: columns_diskStatus,
        pagination: false,
        canResize: false,
        striped: false,
        ellipsis: false,
        showIndexColumn: false,
      });
      const [register_serverInfo] = useDescription({
        title: t('sys.monitor.server.description_serverInfo.title'),
        data: getServerInfo(),
        column: 2,
        schema: schema_serverInfo,
      });
      const [register_JVMInfo] = useDescription({
        title: t('sys.monitor.server.description_jvmInfo.title'),
        data: getJVMInfo(),
        column: 2,
        schema: schema_JVMInfo,
      });
      return {
        register_CPU,
        register_RAM,
        register_serverInfo,
        register_JVMInfo,
        register_diskStatus,
      };
    },
  });
</script>
<style lang="less">
  .row {
    display: flex;
    flex-flow: row nowrap;
  }

  .bottom {
    margin-bottom: 15px;
  }

  .right {
    margin-right: 10px;
  }
</style>

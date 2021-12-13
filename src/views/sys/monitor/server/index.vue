<template>
  <PageWrapper>
    <div class="row bottom">
      <Description @register="registerCpu" class="right" />
      <Description @register="registerMem" class="mem" />
    </div>
    <Description @register="registerServerInfo" class="bottom" />
    <Description @register="registerJvmInfo" class="bottom" />
    <BasicTable @register="registerDiskStatus" class="bottom" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicColumn, BasicTable, useTable } from '/@/components/Table';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getMonitorServer } from '/@/api/sys/monitor/server';
  import { Cpu, Jvm, Mem, Sys, SysFile } from '/@/api/sys/model/monitorModel';
  import numeral from 'numeral';
  import { Loading, useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'Server',
    components: { BasicTable, Description, PageWrapper, Loading },
    setup() {
      const { t } = useI18n();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.loadingText'),
      });
      const schemaCPU = [
        {
          field: 'cpuNum',
          label: t('sys.monitor.server.cpu.cpuNum'),
        },
        {
          field: 'free',
          label: t('sys.monitor.server.cpu.free'),
        },
        {
          field: 'sys',
          label: t('sys.monitor.server.cpu.sys'),
        },
        {
          field: 'total',
          label: t('sys.monitor.server.cpu.total'),
        },
        {
          field: 'used',
          label: t('sys.monitor.server.cpu.used'),
        },
        {
          field: 'wait',
          label: t('sys.monitor.server.cpu.wait'),
        },
      ];
      const cpuInfo = ref<Cpu>();
      const [registerCpu] = useDescription({
        title: t('sys.monitor.server.cpu.title'),
        data: cpuInfo,
        column: 2,
        schema: schemaCPU,
      });
      const schemaMem = [
        {
          field: 'total',
          label: t('sys.monitor.server.mem.total'),
          render: (curVal, data) => {
            return `${numeral(curVal).format('0 ib')}`;
          },
        },
        {
          field: 'used',
          label: t('sys.monitor.server.mem.used'),
          render: (curVal, data) => {
            return `${numeral(curVal).format('0 ib')}`;
          },
        },
        {
          field: 'free',
          label: t('sys.monitor.server.mem.free'),
          render: (curVal, data) => {
            return `${numeral(curVal).format('0 ib')}`;
          },
        },
        {
          field: 'usage',
          label: t('sys.monitor.server.mem.usage'),
          render: (curVal, data) => {
            return `${curVal}%`;
          },
        },
      ];
      const memInfo = ref<Mem>();
      const [registerMem] = useDescription({
        title: t('sys.monitor.server.mem.title'),
        data: memInfo,
        schema: schemaMem,
      });
      const columnsDiskStatus: BasicColumn[] = [
        {
          title: t('sys.monitor.server.disk.driveLetterPath'),
          dataIndex: 'dirName',
        },
        {
          title: t('sys.monitor.server.disk.fileSystem'),
          dataIndex: 'typeName',
        },
        {
          title: t('sys.monitor.server.disk.driveLetterType'),
          dataIndex: 'sysTypeName',
        },
        {
          title: t('sys.monitor.server.disk.totalSize'),
          dataIndex: 'total',
          format: (text, record, index) => {
            return `${numeral(text).format('0 ib')}`;
          },
        },
        {
          title: t('sys.monitor.server.disk.availableSize'),
          dataIndex: 'free',
          format: (text, record, index) => {
            return `${numeral(text).format('0 ib')}`;
          },
        },
        {
          title: t('sys.monitor.server.disk.usedSize'),
          dataIndex: 'used',
          format: (text, record, index) => {
            return `${numeral(text).format('0 ib')}`;
          },
        },
        {
          title: t('sys.monitor.server.disk.usedPercent'),
          dataIndex: 'usage',
          format: (text, record, index) => {
            return `${text}%`;
          },
        },
      ];
      const diskInfo = ref<SysFile[]>();
      const [registerDiskStatus] = useTable({
        title: t('sys.monitor.server.disk.title'),
        dataSource: diskInfo,
        columns: columnsDiskStatus,
        pagination: false,
        canResize: false,
        striped: false,
        ellipsis: false,
        showIndexColumn: false,
      });

      const schemaServerInfo: DescItem[] = [
        {
          field: 'computerName',
          label: t('sys.monitor.server.server.serverName'),
        },
        {
          field: 'osName',
          label: t('sys.monitor.server.server.operatingSystem'),
        },
        {
          field: 'computerIp',
          label: t('sys.monitor.server.server.serverIP'),
        },
        {
          field: 'osArch',
          label: t('sys.monitor.server.server.systemStructure'),
        },
        {
          field: 'userDir',
          label: t('sys.monitor.server.server.userDir'),
        },
      ];
      const sysInfo = ref<Sys>();
      const [registerServerInfo] = useDescription({
        title: t('sys.monitor.server.server.title'),
        data: sysInfo,
        column: 2,
        schema: schemaServerInfo,
      });

      const schemaJvmInfo: DescItem[] = [
        {
          field: 'name',
          label: t('sys.monitor.server.jvm.javaName'),
        },
        {
          field: 'version',
          label: t('sys.monitor.server.jvm.javaVersion'),
        },
        {
          field: 'startTime',
          label: t('sys.monitor.server.jvm.startTime'),
        },
        {
          field: 'total',
          label: t('sys.monitor.server.jvm.total'),
          render: (curVal, data) => {
            return `${numeral(curVal).format('0 ib')}`;
          },
        },
        {
          field: 'max',
          label: t('sys.monitor.server.jvm.max'),
          render: (curVal, data) => {
            return `${numeral(curVal).format('0 ib')}`;
          },
        },
        {
          field: 'runTime',
          label: t('sys.monitor.server.jvm.runTime'),
          render: (curVal, data) => {
            return `${numeral(curVal / 1000).format('00:00:00')}`;
          },
        },
        {
          field: 'free',
          label: t('sys.monitor.server.jvm.free'),
          render: (curVal, data) => {
            return `${numeral(curVal).format('0 ib')}`;
          },
        },
        {
          field: 'used',
          label: t('sys.monitor.server.jvm.used'),
          render: (curVal, data) => {
            return `${numeral(curVal).format('0 ib')}`;
          },
        },
        {
          field: 'usage',
          label: t('sys.monitor.server.jvm.usage'),
          render: (curVal, data) => {
            return `${curVal}%`;
          },
        },
        {
          field: 'home',
          label: t('sys.monitor.server.jvm.installationPath'),
        },
      ];
      const jvmInfo = ref<Jvm>();
      const [registerJvmInfo] = useDescription({
        title: t('sys.monitor.server.jvm.title'),
        data: jvmInfo,
        column: 2,
        schema: schemaJvmInfo,
      });

      const refreshData = async () => {
        setTimeout(() => {
          openFullLoading();
        }, 0);
        try {
          const monitorServerModel = await getMonitorServer();
          const serverInfo = monitorServerModel.serverInfo;
          cpuInfo.value = serverInfo.cpu;
          memInfo.value = serverInfo.mem;
          diskInfo.value = serverInfo.sysFiles;
          sysInfo.value = serverInfo.sys;
          jvmInfo.value = serverInfo.jvm;
        } finally {
          closeFullLoading();
        }
      };

      return {
        registerCpu,
        registerMem,
        registerDiskStatus,
        registerServerInfo,
        registerJvmInfo,
        refreshData,
      };
    },
    mounted() {
      this.refreshData();
    },
  });
</script>
<style lang="less" scope>
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
  .mem {
    flex: 1;
  }
</style>

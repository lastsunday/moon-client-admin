export default {
  table_cpu: {
    title: 'CPU',
    columns: {
      attributes: '属性',
      value: '值',
    },
  },
  table_ram: {
    title: '内存',
    columns: {
      attributes: '属性',
      ram: 'RAM',
      jvm: 'JVM',
    },
  },
  table_diskStatus: {
    title: '磁盘状态',
    columns: {
      driveLetterPath: '盘符路径',
      fileSystem: '文件系统',
      driveLetterType: '盘符类型',
      totalSize: '总大小',
      availableSize: '可用大小',
      usedSize: '已用大小',
      usedPercent: '已用百分比',
    },
  },
  description_serverInfo: {
    title: '服务器信息',
    schema: {
      serverName: '服务器名称',
      operatingSystem: '操作系统',
      serverIP: '服务器IP',
      systemStructure: '系统架构',
    },
  },
  description_jvmInfo: {
    title: 'Java虚拟机信息',
    schema: {
      javaName: 'Java名称',
      javaVersion: 'Java版本',
      startTime: '启动时间',
      runningTime: '运行时长',
      installationPath: '安装路径',
      projectPath: '项目路径',
    },
  },
};

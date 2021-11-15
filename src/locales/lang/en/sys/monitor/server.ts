export default {
  table_cpu: {
    title: 'CPU',
    columns: {
      attributes: 'Attributes',
      value: 'Value',
    },
  },
  table_ram: {
    title: 'RAM',
    columns: {
      attributes: 'Attributes',
      ram: 'RAM',
      jvm: 'JVM',
    },
  },
  table_diskStatus: {
    title: 'Disk Status',
    columns: {
      driveLetterPath: 'DriveLetterPath',
      fileSystem: 'FileSystem',
      driveLetterType: 'DriveLetterType',
      totalSize: 'TotalSize',
      availableSize: 'AvailableSize',
      usedSize: 'UsedSize',
      usedPercent: 'UsedPercent',
    },
  },
  description_serverInfo: {
    title: 'Server Information',
    schema: {
      serverName: 'ServerName',
      operatingSystem: 'OperatingSystem',
      serverIP: 'ServerIP',
      systemStructure: 'SystemStructure',
    },
  },
  description_jvmInfo: {
    title: 'JVM Information',
    schema: {
      javaName: 'JavaName',
      javaVersion: 'JavaVersion',
      startTime: 'StartTime',
      runningTime: 'RunningTime',
      installationPath: 'InstallationPath',
      projectPath: 'ProjectPath',
    },
  },
};

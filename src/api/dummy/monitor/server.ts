/**
 * @description: monitor server server info dummy
 */
export function serverInfo() {
  const serverInfo: Recordable = {
    serverName: '170f01407662',
    operatingSystem: 'Linux',
    serverIP: '172.18.0.2',
    systemStructure: 'amd64',
  };
  return serverInfo;
}

/**
 * @description: monitor server JVM info dummy
 */
export function JVMInfo() {
  const jvmInfo: Recordable = {
    javaName: 'OpenJDK 64-Bit Server VM',
    javaVersion: '1.8.0_275',
    startTime: '2021-02-22 02:43:13',
    runningTime: '0天8小时3分钟',
    installationPath: '	/usr/lib/jvm/java-8-openjdk-amd64/jre',
    projectPath: '/usr/local/app/workspace',
  };
  return jvmInfo;
}

/**
 * @description: monitor server CPU info dummy
 */
export function CPUInfo() {
  const cpuInfo = [
    {
      attributes: '核心数',
      value: '4',
    },
    {
      attributes: '用户使用率',
      value: '0.25%',
    },
    {
      attributes: '系统使用率',
      value: '0.5%',
    },
    {
      attributes: '当前空闲率',
      value: '99.25%',
    },
  ];
  return cpuInfo;
}

/**
 * @description: monitor server RAM info dummy
 */
export function RAMInfo() {
  const ramInfo = [
    {
      attributes: '总内存',
      ram: '7.8G',
      jvm: '783.5M',
    },
    {
      attributes: '已用内存',
      ram: '4.99G',
      jvm: '262.46M',
    },
    {
      attributes: '剩余内存',
      ram: '2.81G',
      jvm: '521.04M',
    },
    {
      attributes: '使用率',
      ram: '63.95%',
      jvm: '33.5%',
    },
  ];
  return ramInfo;
}

/**
 * @description: monitor server disk status info dummy
 */
export function diskStatusInfo() {
  const diskStatusInfo = [
    {
      driveLetterPath: '/',
      fileSystem: 'overlay',
      driveLetterType: '/',
      totalSize: '77.7 GB',
      availableSize: '48.2 GB',
      usedSize: '29.5 GB',
      usedPercent: '38.01%',
    },
    {
      driveLetterPath: '/etc/hostname',
      fileSystem: 'ext4',
      driveLetterType: '/dev/sda1',
      totalSize: '77.7 GB',
      availableSize: '48.2 GB',
      usedSize: '29.5 GB',
      usedPercent: '38.01%',
    },
    {
      driveLetterPath: '/etc/hosts',
      fileSystem: 'ext4',
      driveLetterType: '/dev/sda1',
      totalSize: '77.7 GB',
      availableSize: '48.2 GB',
      usedSize: '29.5 GB',
      usedPercent: '38.01%',
    },
    {
      driveLetterPath: '/etc/resolv.conf',
      fileSystem: 'ext4',
      driveLetterType: '/dev/sda1',
      totalSize: '77.7 GB',
      availableSize: '48.2 GB',
      usedSize: '29.5 GB',
      usedPercent: '38.01%',
    },
    {
      driveLetterPath: '/var/lib/mysql',
      fileSystem: 'ext4',
      driveLetterType: '/dev/sda1',
      totalSize: '77.7 GB',
      availableSize: '48.2 GB',
      usedSize: '29.5 GB',
      usedPercent: '38.01%',
    },
  ];
  return diskStatusInfo;
}

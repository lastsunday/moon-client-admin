export interface MonitorServerModel {
  serverInfo: ServerInfo;
}

export interface ServerInfo {
  cpu: Cpu;
  jvm: Jvm;
  mem: Mem;
  sys: Sys;
  sysFiles: SysFile[];
}

export interface Cpu {
  cpuNum: number;
  free: number;
  sys: number;
  total: number;
  used: number;
  wait: number;
}

export interface Jvm {
  free: number;
  home: string;
  max: number;
  name: string;
  runTime: number;
  startTime: Date;
  total: number;
  usage: number;
  used: number;
  version: string;
}

export interface Mem {
  free: number;
  total: number;
  usage: number;
  used: number;
}

export interface Sys {
  computerIp: string;
  computerName: string;
  osArch: string;
  osName: string;
  userDir: string;
}

export interface SysFile {
  dirName: string;
  free: number;
  sysTypeName: string;
  total: number;
  typeName: string;
  usage: number;
  used: number;
}

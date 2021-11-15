import { serverInfo, JVMInfo, CPUInfo, RAMInfo, diskStatusInfo } from '/@/api/dummy/monitor/server';

/**
 * @description: monitor server server info api
 */
export function getServerInfo() {
  return serverInfo();
}

/**
 * @description: monitor server JVM info api
 */
export function getJVMInfo() {
  return JVMInfo();
}

/**
 * @description: monitor server CPU info api
 */
export function getCPUInfo() {
  return CPUInfo();
}

/**
 * @description: monitor server RAM info api
 */
export function getRAMInfo() {
  return RAMInfo();
}

/**
 * @description: monitor server disk status info api
 */
export function getDiskStatusInfo() {
  return diskStatusInfo();
}

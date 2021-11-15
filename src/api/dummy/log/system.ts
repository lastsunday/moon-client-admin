import { ref } from 'vue';

/**
 * @description: log system info dummy
 */
export function setSystemLogInfo() {
  const systemLogInfo = [
    {
      name: '系统日志-1',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-1'),
    },
    {
      name: '系统日志-2',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-2'),
    },
    {
      name: '系统日志-3',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-3'),
    },
    {
      name: '系统日志-4',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-4'),
    },
    {
      name: '系统日志-5',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-5'),
    },
    {
      name: '系统日志-6',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-6'),
    },
    {
      name: '系统日志-7',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-7'),
    },
    {
      name: '系统日志-8',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-8'),
    },
    {
      name: '系统日志-9',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-9'),
    },
    {
      name: '系统日志-10',
      updateDate: '2021-02-24',
      size: '100KB',
      createDate: '2021-02-24',
      logContent: setLogContent('系统日志-10'),
    },
  ];
  return systemLogInfo;
}

export function setLogContent(value) {
  const text = ref<string>('"' + value + '"的日志信息。');
  for (let i = 0; i < 50; i++) {
    text.value = '"' + value + '"的日志信息。\n\n' + text.value;
  }
  return text;
}

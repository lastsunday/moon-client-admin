import { MonitorServerModel } from '../model/monitorModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetMonitorServer = 'system/monitor/server',
}

export function getMonitorServer() {
  return defHttp.post<MonitorServerModel>({
    url: Api.GetMonitorServer,
  });
}

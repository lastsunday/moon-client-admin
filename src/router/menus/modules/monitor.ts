import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const user: MenuModule = {
  orderNo: 3,
  menu: {
    path: '/monitor',
    name: t('routes.sys.systemMonitor'),
    icon: 'mdi:monitor-dashboard',
    children: [
      {
        path: 'server',
        name: t('routes.sys.serverMonitor'),
        icon: 'clarity:rack-server-line',
      },
    ],
  },
};
export default user;

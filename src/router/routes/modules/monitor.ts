import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const userManagement: AppRouteModule = {
  path: '/monitor',
  name: 'monitor',
  component: LAYOUT,
  redirect: '/monitor/server',
  meta: {
    icon: 'mdi:monitor-dashboard',
    title: t('routes.sys.systemMonitor'),
  },
  children: [
    {
      path: 'server',
      name: 'server',
      component: () => import('/@/views/sys/monitor/server/index.vue'),
      meta: {
        title: t('routes.sys.serverMonitor'),
        icon: 'clarity:rack-server-line',
        permissions: ['system:monitor:server'],
      },
    },
  ],
};

export default userManagement;

import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const userManagement: AppRouteModule = {
  path: '/log',
  name: 'log',
  component: LAYOUT,
  redirect: '/log/system',
  meta: {
    orderNo: 40,
    icon: 'codicon:book',
    title: t('routes.sys.log'),
  },
  children: [
    {
      path: 'operation',
      name: 'operation',
      component: () => import('/@/views/sys/log/operation/index.vue'),
      meta: {
        title: t('routes.sys.operationLog'),
        icon: 'uil:file-edit-alt',
        permissions: ['system:log:list'],
      },
    },
    {
      path: 'system',
      name: 'system',
      component: () => import('/@/views/sys/log/system/index.vue'),
      meta: {
        title: t('routes.sys.systemLog'),
        icon: 'mdi:monitor-edit',
        permissions: ['system:log:list'],
      },
    },
  ],
};

export default userManagement;

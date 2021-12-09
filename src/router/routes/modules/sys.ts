import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/sys',
  name: 'System',
  component: LAYOUT,
  redirect: '/sys/admin',
  meta: {
    orderNo: 50,
    icon: 'carbon:inventory-management',
    title: t('routes.sys.management'),
  },
  children: [
    {
      path: 'admin',
      name: 'Admin',
      component: () => import('/@/views/sys/admin/index.vue'),
      meta: {
        title: t('routes.sys.admin'),
        icon: 'carbon:user-admin',
        permissions: ['system:user:list'],
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('/@/views/sys/role/index.vue'),
      meta: {
        title: t('routes.sys.role'),
        icon: 'carbon:user-role',
        permissions: ['system:role:list'],
      },
    },
  ],
};

export default system;

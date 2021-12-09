import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const userManagement: AppRouteModule = {
  path: '/user',
  name: 'user',
  component: LAYOUT,
  redirect: '/user/online',
  meta: {
    orderNo: 20,
    icon: 'grommet-icons:user-manager',
    title: t('routes.sys.userManagement'),
  },
  children: [
    {
      path: 'online',
      name: 'online',
      component: () => import('/@/views/sys/user/online/index.vue'),
      meta: {
        title: t('routes.sys.onlineUser'),
        icon: 'carbon-user-online',
        permissions: ['system:user:online:list'],
      },
    },
  ],
};

export default userManagement;

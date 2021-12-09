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
      path: 'logininfo',
      name: 'logininfo',
      component: () => import('/@/views/sys/log/logininfo/index.vue'),
      meta: {
        title: t('routes.sys.loginLog'),
        icon: 'uil:file-edit-alt',
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

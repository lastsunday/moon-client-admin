import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 1,
  menu: {
    path: '/sys',
    name: t('routes.sys.management'),
    icon: 'carbon:inventory-management',
    children: [
      {
        path: 'admin',
        name: t('routes.sys.admin'),
        icon: 'carbon:user-admin',
      },
      {
        path: 'role',
        name: t('routes.sys.role'),
        icon: 'carbon:user-role',
      },
    ],
  },
};
export default menu;

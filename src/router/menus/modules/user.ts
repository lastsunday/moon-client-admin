import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const user: MenuModule = {
  orderNo: 2,
  menu: {
    path: '/user',
    name: t('routes.sys.userManagement'),
    icon: 'grommet-icons:user-manager',
    children: [
      {
        path: 'online',
        name: t('routes.sys.onlineUser'),
        icon: 'carbon-user-online',
      },
    ],
  },
};
export default user;

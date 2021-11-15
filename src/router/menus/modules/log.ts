import type { MenuModule } from '/@/router/types.d';
import { t } from '/@/hooks/web/useI18n';

const user: MenuModule = {
  orderNo: 4,
  menu: {
    path: '/log',
    name: t('routes.sys.log'),
    icon: 'codicon:book',
    children: [
      {
        path: 'system',
        name: t('routes.sys.systemLog'),
        icon: 'mdi:monitor-edit',
      },
      {
        path: 'logininfo',
        name: t('routes.sys.loginLog'),
        icon: 'uil:file-edit-alt',
      },
    ],
  },
};
export default user;

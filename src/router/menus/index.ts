import type { Menu, MenuModule } from '/@/router/types';
import type { RouteRecordNormalized } from 'vue-router';

import { transformMenuModule, getAllParentPath } from '/@/router/helper/menuHelper';
import { filter } from '/@/utils/helper/treeHelper';
import { isUrl } from '/@/utils/is';
import { router } from '/@/router';
import { pathToRegexp } from 'path-to-regexp';

const modules = import.meta.globEager('./modules/**/*.ts');

const menuModules: MenuModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modList);
});

// ===========================
// ==========Helper===========
// ===========================
const staticMenus: Menu[] = [];
(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0);
  });

  for (const menu of menuModules) {
    staticMenus.push(transformMenuModule(menu));
  }
})();

async function getAsyncMenus() {
  // 前端角色控制菜单 直接取菜单文件
  const allMenu: Menu[] = [];
  for (const menu of staticMenus) {
    allMenu.push(menu);
  }
  return allMenu;
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus();
  const routes = router.getRoutes();
  return filter(menus, basicFilter(routes));
};

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  const allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus();
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }));
  return shallowMenuList.filter(basicFilter(routes));
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus();
  const parent = menus.find((item) => item.path === parentPath);
  if (!parent) return [] as Menu[];
  return parent.children;
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true;

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path);
      }
      const isSame = route.path === menu.path;
      if (!isSame) return false;

      if (route.meta?.ignoreAuth) return true;

      return isSame || pathToRegexp(route.path).test(menu.path);
    });
    if (matchRoute?.redirect) {
      return false;
    }
    if (!matchRoute) return false;
    menu.icon = (menu.icon || matchRoute.meta.icon) as string;
    menu.meta = matchRoute.meta;
    return true;
  };
}

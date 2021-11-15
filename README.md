## 预安装

### 环境要求

- `Node.js`: - 版本大于 `12.0.0`
- `yarn` : - 包管理工具.

### UI 框架

- [Tailwind CSS](https://tailwindcss.com/) - 2.0.0-beta.5 已删除
- [Ant Design Vue 2.0](https://2x.antdv.com/docs/vue/introduce-cn/)

### 图标

- [Ant Design Vue Icon Component](https://2x.antdv.com/components/icon-cn/) - 按需引入所需图标.
- [Iconify](https://iconify.design) - 使用任何图标集中的图标 [Icônes](https://icones.netlify.app/)
- [PurgeIcons](https://github.com/antfu/purge-icons) - 仅打包所使用到的图标.

### 插件

- [Vue Router Next](https://github.com/vuejs/vue-router-next)
- [Vuex Next](https://github.com/vuejs/vuex)
- [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) - vuex 模块化
- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - 基于 vite 的 mock 插件.
- [vue-i18n](https://github.com/intlify/vue-i18n-next) - 国际化
- [lodash-es](https://github.com/lodash/lodash) - JavaScript 实用程序库
- [axios](https://github.com/axios/axios) - Http 数据交互
- [TypeScript](https://www.typescriptlang.org/)

### 建议开发环境

- `Git`: - 版本管理工具
- `Visual Studio Code` - (VSCode): 最新版本
  - [VS Code Extensions](./.vscode/extensions.json)
    - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)
    - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind Css 样式联想
    - [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - vue 开发必备
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
    - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化

### 开发环境

```bash
yarn serve
```

### 打包

```bash

yarn build # 打包

yarn build:no-cache # 打包，执行之前会先删除缓存

yarn report # 生成构建包报表预览
```

### 格式化

```bash
yarn lint:stylelint # 样式格式化

yarn lint:prettier # js/ts代码格式化
```

### 其他

```bash
yarn reinstall # 删除依赖重新装，兼容window

yarn preview # 本地进行打包预览

yarn log # 生成CHANGELOG

yarn clean:cache # 删除缓存

yarn clean:lib # 删除node_modules，兼容window系统
```

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome`浏览器,在火狐浏览器进行开发相对卡顿。

支持现代浏览器, IE 暂不支持，后续考虑支持 ie11

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ES%20Module)

## Base on

[anncwb/vue-vben-admin: A modern vue admin. It is based on Vue3, vite and TypeScript. It's fast！ (github.com)](https://github.com/anncwb/vue-vben-admin)

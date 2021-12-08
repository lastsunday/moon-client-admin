import type { GlobConfig } from '/#/config';

import { warn } from '/@/utils/log';
import { getAppEnvConfig } from '/@/utils/env';

let globSetting: any;

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_DEFAULT_ADMIN_ACCOUNT,
    VITE_GLOB_DEFAULT_ADMIN_PASSWORD,
    VITE_GLOB_LOGIN_CAPTCHA_CHECKING_ENABLE,
  } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  if (globSetting) {
    //skip
  } else {
    const result = {
      title: VITE_GLOB_APP_TITLE,
      apiUrl: VITE_GLOB_API_URL,
      shortName: VITE_GLOB_APP_SHORT_NAME,
      urlPrefix: VITE_GLOB_API_URL_PREFIX,
      uploadUrl: VITE_GLOB_UPLOAD_URL,
      //默认管理员账号
      defaultAdminAccount: VITE_GLOB_DEFAULT_ADMIN_ACCOUNT,
      //默认管理员密码
      defaultAdminPassword: VITE_GLOB_DEFAULT_ADMIN_PASSWORD,
      //登录是否校验验证码
      loginCaptchaCheckingEnable: VITE_GLOB_LOGIN_CAPTCHA_CHECKING_ENABLE,
    };
    if (window['APP_CONFIG' as any]) {
      Object.assign(result, window['APP_CONFIG' as any]);
    } else {
      //skip
    }
    if (window.location.search && window.location.search.split('?').length > 1) {
      const queryArray = window.location.search.split('?')[1].split('&');
      const hrefParam = {} as any;
      const INDEX_KEY = 0;
      const INDEX_VALUE = 1;
      for (let i = 0; i < queryArray.length; i++) {
        const itemSplitArray = queryArray[i].split('=');
        const key = itemSplitArray[INDEX_KEY];
        const value = itemSplitArray[INDEX_VALUE];
        hrefParam[key] = value;
      }
      Object.assign(result, hrefParam);
    } else {
      //skip
    }
    result.loginCaptchaCheckingEnable = JSON.parse(result.loginCaptchaCheckingEnable as any);
    globSetting = result;
  }
  // Take global configuration
  const glob: Readonly<GlobConfig> = globSetting;
  console.log(glob);
  return glob;
};

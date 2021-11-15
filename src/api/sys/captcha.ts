import { defHttp } from '/@/utils/http/axios';
import { GetCaptchaResultModel } from './model/captchaModel';

enum Api {
  getCaptcha = 'captcha',
}

// 获取验证码
export function getCaptcha() {
  return defHttp.request<GetCaptchaResultModel>({
    url: Api.getCaptcha,
    method: 'GET',
  });
}

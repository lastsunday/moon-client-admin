import { useI18n } from '/@/hooks/web/useI18n';

export function translateErrorMessage(response: any): string {
  const { t } = useI18n();
  if (response && response.data) {
    const errorCode = response.data.errorCode;
    let errorMessage = response.data.errorMessage;
    const key = 'error.index.' + errorCode;
    const i18nErrorMessage = t(key);
    if (i18nErrorMessage !== key) {
      errorMessage = i18nErrorMessage;
    }
    return '[' + errorCode + ']' + errorMessage;
  } else {
    return '';
  }
}

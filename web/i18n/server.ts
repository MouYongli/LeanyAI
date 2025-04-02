import i18nConfig from './config'
import type { Locale } from './language'

// 导入语言资源
import enCommon from './en/common'
import zhCommon from './zh/common'
import deCommon from './de/common'

// 服务端翻译资源
const resources = {
  en: { common: enCommon },
  zh: { common: zhCommon },
  de: { common: deCommon }
}

// 获取服务器端的语言设置 - 始终返回默认语言
export const getLocaleOnServer = async (): Promise<Locale> => {
  console.log('[Server] Using default locale:', i18nConfig.defaultLocale);
  return i18nConfig.defaultLocale as Locale;
}

// 服务器端简单翻译函数
export function getTranslation(locale: Locale = i18nConfig.defaultLocale as Locale) {
  const t = (key: string, params?: Record<string, any>) => {
    const keys = key.split('.');
    const namespace = keys.length > 1 ? keys[0] : 'common';
    const actualKey = keys.length > 1 ? keys.slice(1).join('.') : keys[0];

    try {
      const translation = resources[locale]?.[namespace]?.[actualKey] 
        || resources[i18nConfig.defaultLocale as Locale]?.[namespace]?.[actualKey] 
        || key;
      
      if (params) {
        return translation.replace(/\{(\w+)\}/g, (_, key) => 
          params[key] !== undefined ? params[key] : `{${key}}`
        );
      }
      
      return translation;
    } catch (error) {
      return key;
    }
  };

  return {
    t,
    locale
  };
}
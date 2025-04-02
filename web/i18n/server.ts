import i18nConfig from './config'
import type { Locale } from './language'

// 导入语言资源
import enCommon from './en/common'
import zhCommon from './zh/common'
import deCommon from './de/common'

// 定义资源的接口类型
interface TranslationResource {
  [key: string]: string | TranslationResource;
}

interface Resources {
  [locale: string]: {
    [namespace: string]: TranslationResource;
  };
}

// 服务端翻译资源
const resources: Resources = {
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
      const translation = resources[locale]?.[namespace]?.[actualKey] as string
        || resources[i18nConfig.defaultLocale as Locale]?.[namespace]?.[actualKey] as string
        || key;
      
      if (params) {
        return translation.replace(/\{(\w+)\}/g, (_: string, paramKey: string) => 
          params[paramKey] !== undefined ? params[paramKey] : `{${paramKey}}`
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
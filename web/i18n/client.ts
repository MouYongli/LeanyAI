import i18nConfig from './config'
import type { Locale } from './language'

// 获取客户端的语言设置 - 始终返回默认语言
export const getLocaleOnClient = (): Locale => {
  return i18nConfig.defaultLocale as Locale;
}

// 空函数，不再在客户端保存语言偏好
export const setLocaleOnClient = (_locale: Locale) => {
  // 不做任何事情
}

// 客户端 i18n 基础配置
export const i18nClient = {
  t: (key: string, _options?: Record<string, any>) => {
    // 这里将被 useI18n hook 中的真实翻译函数替代
    return key;
  },
  changeLanguage: (locale: Locale) => {
    return Promise.resolve();
  }
}
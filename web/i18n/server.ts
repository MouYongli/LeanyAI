import i18nConfig from './config'

export type Locale = (typeof i18nConfig.locales)[number]

// 简化版的服务器端i18n实现
export const getLocaleOnServer = (): Locale => {
  return i18nConfig.defaultLocale
}

// 简化版的翻译函数
export function useTranslation(namespace?: string, options?: any) {
  return {
    t: (key: string) => key, // 简单返回键名作为翻译结果
    i18n: { language: i18nConfig.defaultLocale }
  }
}
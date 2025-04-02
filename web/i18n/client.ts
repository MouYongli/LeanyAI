import i18nConfig from './config'

export type Locale = (typeof i18nConfig.locales)[number]

export const getLocaleOnClient = (): Locale => {
  // 尝试从 localStorage 获取语言设置
  if (typeof window !== 'undefined') {
    const savedLocale = localStorage.getItem('locale') as Locale | null
    if (savedLocale && i18nConfig.locales.includes(savedLocale))
      return savedLocale
  }

  return i18nConfig.defaultLocale
}

// 简化版的i18n客户端，不依赖next-i18n-router
export const i18n = {
  // 这里可以添加必要的方法
}

export function setLocaleOnClient(locale: Locale) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale)
    window.location.reload()
  }
}
// 支持的语言列表
export const LanguagesSupported = ['en', 'zh', 'de'] as const

export type Locale = typeof LanguagesSupported[number]

interface LanguageInfo {
  name: string
  icon: string
}

export const languages: Record<Locale, LanguageInfo> = {
  en: {
    name: 'English',
    icon: '🇺🇸'
  },
  zh: {
    name: '中文',
    icon: '🇨🇳'
  },
  de: {
    name: 'Deutsch',
    icon: '🇩🇪'
  }
}
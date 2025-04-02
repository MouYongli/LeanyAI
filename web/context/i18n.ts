import { createContext, useContext } from 'react'
import { languages } from '@/i18n/language'
import type { Locale } from '@/i18n/language'

// 创建默认值
const defaultContextValue = {
  locale: 'en' as Locale,
  setLocale: (locale: Locale) => {},
  t: (key: string, params?: Record<string, any>) => key
}

export const I18NContext = createContext(defaultContextValue)

export const useI18N = () => {
  const context = useContext(I18NContext)
  if (context === undefined) {
    throw new Error('useI18N must be used within an I18NProvider')
  }
  return context
}

export const useGetLanguage = () => {
  const { locale } = useI18N()
  return languages[locale]
}
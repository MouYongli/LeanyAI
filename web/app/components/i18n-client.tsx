'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/i18n/client'
import { getLocaleOnClient, setLocaleOnClient } from '@/i18n/client'
import type { Language } from '@/i18n/language'
import { LanguagesSupported } from '@/i18n/language'

type I18nContextProps = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
  currentLanguage: Language
}

const defaultTranslations: Record<string, Record<string, string>> = {
  en: {
    'common.home': 'Home',
    'common.about': 'About',
    'common.language': 'Language',
    'common.switchTo': 'Switch to',
    'home.title': 'LeanyAI Web Application',
    'home.description': 'Welcome to LeanyAI Web application. This is an empty homepage that you can customize as needed.',
    'about.title': 'About LeanyAI',
    'about.description': 'LeanyAI is a web application demonstrating Next.js features with internationalization.',
    'about.features': 'Features',
    'about.feature1': 'Internationalization Support',
    'about.feature2': 'Responsive Design',
    'about.feature3': 'Modern UI Components',
    'about.moreInfo': 'For more information, please contact us.'
  },
  zh: {
    'common.home': '首页',
    'common.about': '关于',
    'common.language': '语言',
    'common.switchTo': '切换到',
    'home.title': 'LeanyAI 网页应用',
    'home.description': '欢迎使用 LeanyAI Web 应用。这是一个空的首页，您可以根据需要添加内容。',
    'about.title': '关于 LeanyAI',
    'about.description': 'LeanyAI 是一个展示 Next.js 功能和国际化的网页应用。',
    'about.features': '功能特性',
    'about.feature1': '国际化支持',
    'about.feature2': '响应式设计',
    'about.feature3': '现代化 UI 组件',
    'about.moreInfo': '如需更多信息，请联系我们。'
  },
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [locale, setLocaleState] = useState<Locale>('en') // 默认使用英语

  useEffect(() => {
    // 初始化语言设置
    const savedLocale = getLocaleOnClient()
    setLocaleState(savedLocale)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleOnClient(newLocale)
    setLocaleState(newLocale)
  }

  const t = (key: string, params?: Record<string, string>) => {
    let translation = defaultTranslations[locale]?.[key] || key
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue)
      })
    }
    
    return translation
  }

  return (
    <I18nContext.Provider value={{ 
      locale, 
      setLocale, 
      t,
      currentLanguage: locale as Language,
    }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
'use client'

import { useI18n } from './i18n-client'
import { languages } from '@/i18n/language'
import type { Locale } from '@/i18n/language'
import { useGetLanguage } from '@/hooks/use-i18n'
import { useCallback, useState } from 'react'

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n()
  const currentLanguage = useGetLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLanguageChange = useCallback((newLocale: Locale) => {
    // 避免选择相同的语言
    if (newLocale === locale) {
      setIsMenuOpen(false)
      return
    }
    
    console.log('Changing language to:', newLocale)
    
    // 设置新的语言 - 纯客户端处理，不再重载页面
    setLocale(newLocale)
    setIsMenuOpen(false)
  }, [locale, setLocale])

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <div className="relative flex items-center">
      <div 
        className="flex items-center gap-1 cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={toggleMenu}
        data-testid="language-switcher"
      >
        <span className="text-xl">{currentLanguage?.icon || '🌐'}</span>
        <span suppressHydrationWarning>{currentLanguage?.name || locale}</span>
      </div>
      
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Locale)}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                code === locale ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              data-testid={`lang-${code}`}
            >
              <span className="text-xl">{lang.icon}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
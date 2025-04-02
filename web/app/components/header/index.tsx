'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '../i18n-client'
import { LanguagesSupported } from '@/i18n/language'
import type { Locale } from '@/i18n/client'
import Logo from '../logo'

export default function Header() {
  const { t, locale, setLocale } = useI18n()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsMenuOpen(false)
  }

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center">
        <Logo />
        <div className="ml-8 hidden sm:flex space-x-6">
          <Link 
            href="/" 
            className={`text-sm font-medium ${
              pathname === '/' 
              ? 'text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('common.home')}
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium ${
              pathname === '/about' 
              ? 'text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('common.about')}
          </Link>
        </div>
      </div>

      <div className="relative">
        <button 
          onClick={toggleMenu}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <span>{t('common.language')}</span>
          <svg 
            className={`ml-1 h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {(Object.keys(LanguagesSupported) as Array<keyof typeof LanguagesSupported>).map((langKey) => (
                <button
                  key={langKey}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    locale === langKey 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => handleLanguageChange(langKey as Locale)}
                >
                  {LanguagesSupported[langKey]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
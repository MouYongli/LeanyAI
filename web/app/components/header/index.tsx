'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '../i18n-client'
import LanguageSwitcher from '../language-switcher'
import Logo from '../logo'

export default function Header() {
  const { t } = useI18n()
  const pathname = usePathname()
  
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
            <span suppressHydrationWarning>{t('home')}</span>
          </Link>
          <Link 
            href="/workflow" 
            className={`text-sm font-medium ${
              pathname === '/workflow' 
              ? 'text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span suppressHydrationWarning>{t('workflow')}</span>
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium ${
              pathname === '/about' 
              ? 'text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span suppressHydrationWarning>{t('about')}</span>
          </Link>
          <Link
            href="/studio"
            className={`text-sm font-medium ${
              pathname === '/studio'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span suppressHydrationWarning>{t('studio')}</span>
          </Link>
          <Link
            href="/knowledge"
            className={`text-sm font-medium ${
              pathname === '/knowledge'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span suppressHydrationWarning>{t('knowledge')}</span>
          </Link>
        </div>
      </div>
      
      <LanguageSwitcher />
    </header>
  )
}
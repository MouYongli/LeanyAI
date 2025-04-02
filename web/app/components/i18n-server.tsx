import { getLocaleOnServer } from '@/i18n/server'
import { I18NClient } from './i18n-client'
import { ReactNode } from 'react'
import type { Locale } from '@/i18n/language'
import i18nConfig from '@/i18n/config'

interface I18NServerProps {
  children: ReactNode
  locale?: Locale
}

export const I18NServer = async ({ children, locale }: I18NServerProps) => {
  // 如果提供了 locale，使用它；否则使用默认语言（英语）
  const serverLocale = locale || i18nConfig.defaultLocale as Locale;
  
  console.log('[I18NServer] Using locale:', serverLocale);
  
  // 将服务器端的语言传递给客户端组件
  return (
    <I18NClient locale={serverLocale}>
      {children}
    </I18NClient>
  )
}
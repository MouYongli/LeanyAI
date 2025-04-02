'use client'

import { I18NProvider } from '@/context/i18n-provider'
import type { Locale } from '@/i18n/language'
import { useI18N } from '@/hooks/use-i18n'

interface I18NClientProps {
  children: React.ReactNode
  locale: string
}

export const I18NClient = ({ children, locale }: I18NClientProps) => {
  // 直接使用从服务器端接收的语言设置，不进行客户端存储
  console.log('[I18NClient] Using server locale:', locale);
  
  // 直接将服务器端语言传给 I18NProvider
  return (
    <I18NProvider initialLocale={locale as Locale}>
      {children}
    </I18NProvider>
  )
}

export const useI18n = useI18N
export default I18NClient
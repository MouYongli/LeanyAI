'use client'

import { useState, useEffect, useRef } from 'react'
import { I18NContext } from '@/context/i18n'
import type { Locale } from '@/i18n/language'
import i18nextClient from '@/i18n/i18next-client-config'

interface I18NProviderProps {
  children: React.ReactNode
  initialLocale: Locale
}

export const I18NProvider = ({ children, initialLocale }: I18NProviderProps) => {
  // 使用 ref 跟踪初始化状态
  const initialized = useRef(false);
  
  // 状态直接使用服务器传递的语言
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // 初始化 i18next 实例
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    console.log('[I18NProvider] Initializing with locale:', initialLocale);
    
    // 设置 i18next 实例的语言
    i18nextClient.changeLanguage(initialLocale).then(() => {
      console.log('[I18NProvider] i18next language set to:', i18nextClient.language);
    });
  }, [initialLocale]);

  // 设置语言的方法（简化版，不再保存到本地存储）
  const setLocale = (newLocale: Locale) => {
    console.log('[I18NProvider] Setting new locale:', newLocale);
    
    // 更新状态
    setLocaleState(newLocale);
    
    // 更新 i18next 实例
    i18nextClient.changeLanguage(newLocale).then(() => {
      console.log('[I18NProvider] i18next language updated to:', newLocale);
    });
  }

  // 翻译函数
  const t = (key: string, options?: Record<string, any>) => {
    return i18nextClient.t(key, options);
  }

  const value = {
    locale,
    setLocale,
    t
  }

  return <I18NContext.Provider value={value}>{children}</I18NContext.Provider>
}
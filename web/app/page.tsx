'use client'

import { useI18n } from './components/i18n-client'
import CommonLayout from './components/common-layout'
import { useEffect } from 'react'

export default function Home() {
  const { t, locale } = useI18n()
  
  // 添加调试信息，确认当前使用的语言
  useEffect(() => {
    console.log('[HomePage] 当前使用的语言:', locale);
    console.log('[HomePage] 标题翻译:', t('home.title'));
    console.log('[HomePage] 描述翻译:', t('home.description'));
  }, [locale, t]);
  
  return (
    <CommonLayout>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-center mb-6" suppressHydrationWarning>
          {t('home.title')}
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-8" suppressHydrationWarning>
          {t('home.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {/* 可以在这里添加卡片或特性展示 */}
        </div>
      </div>
    </CommonLayout>
  )
}

'use client'

import { useI18n } from './components/i18n-client'
import CommonLayout from './components/common-layout'

export default function Home() {
  const { t } = useI18n()
  
  return (
    <CommonLayout>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          {t('home.title')}
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
          {t('home.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {/* 可以在这里添加卡片或特性展示 */}
        </div>
      </div>
    </CommonLayout>
  )
}

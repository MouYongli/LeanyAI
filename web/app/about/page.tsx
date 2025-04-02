'use client'

import { useI18n } from '../components/i18n-client'
import CommonLayout from '../components/common-layout'

export default function About() {
  const { t } = useI18n()
  
  const features = [
    { id: 1, title: t('about.feature1') },
    { id: 2, title: t('about.feature2') },
    { id: 3, title: t('about.feature3') },
  ]
  
  return (
    <CommonLayout>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          {t('about.title')}
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-12">
          {t('about.description')}
        </p>
        
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">
            {t('about.features')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              {t('about.moreInfo')}
            </p>
          </div>
        </div>
      </div>
    </CommonLayout>
  )
}
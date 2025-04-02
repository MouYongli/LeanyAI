import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18nConfig from './config'

// 导入语言资源
import enCommon from './en/common'
import zhCommon from './zh/common'
import deCommon from './de/common'

// 配置 i18next
i18next.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon
    },
    zh: {
      common: zhCommon
    },
    de: {
      common: deCommon
    }
  },
  lng: i18nConfig.defaultLocale,
  fallbackLng: i18nConfig.defaultLocale,
  interpolation: {
    escapeValue: false
  },
  defaultNS: 'common'
})

export default i18next
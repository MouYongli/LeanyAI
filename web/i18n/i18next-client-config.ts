'use client'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18nConfig from './config'

// 导入语言资源
import enCommon from './en/common'
import zhCommon from './zh/common'
import deCommon from './de/common'

// 创建 i18next 实例
const i18nextClient = i18next.createInstance();

// 初始化 i18next 实例，始终使用默认语言
i18nextClient.use(initReactI18next).init({
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
  // 初始化时默认使用英语，后续会通过 changeLanguage 修改
  lng: i18nConfig.defaultLocale,
  fallbackLng: i18nConfig.defaultLocale,
  interpolation: {
    escapeValue: false
  },
  defaultNS: 'common',
  react: {
    useSuspense: false
    // wait 属性已从最新版本的 react-i18next 中移除
  }
});

// 在开发模式下打印日志
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  console.log('[i18next] Initialized with default language:', i18nextClient.language);
  
  // 监听语言变化
  i18nextClient.on('languageChanged', (lng) => {
    console.log('[i18next] Language changed to:', lng);
  });
}

export default i18nextClient
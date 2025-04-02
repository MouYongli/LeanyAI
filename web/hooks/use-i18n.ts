import { useContext } from 'react'
import { I18NContext } from '@/context/i18n'
import { languages } from '@/i18n/language'
import type { Locale } from '@/i18n/language'

// 获取当前语言环境并提供翻译功能
export function useI18N() {
  const context = useContext(I18NContext)
  if (!context) {
    throw new Error('useI18N must be used within an I18NProvider')
  }
  return context
}

// 渲染国际化对象
export const renderI18nObject = (obj: Record<string, string>, language: string) => {
  if (!obj) return ''
  if (obj?.[language]) return obj[language]
  if (obj?.en) return obj.en
  return Object.values(obj)[0]
}

// 获取当前语言信息
export const useGetLanguage = () => {
  const { locale } = useI18N()
  return languages[locale as Locale]
}

// 提供渲染国际化对象的钩子
export const useRenderI18nObject = () => {
  const { locale } = useI18N()
  return (obj: Record<string, string>) => {
    return renderI18nObject(obj, locale)
  }
}

export default useI18N
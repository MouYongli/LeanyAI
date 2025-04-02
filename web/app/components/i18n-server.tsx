import React from 'react'
import { getLocaleOnServer } from '@/i18n/server'

interface I18nServerProps {
  children: React.ReactNode
}

const I18nServer = (props: I18nServerProps) => {
  const { children } = props
  
  // 简单实现，不依赖外部库
  return children
}

export default I18nServer
export enum LanguagesSupported {
  en = 'English',
  zh = '中文',
}

export type Language = keyof typeof LanguagesSupported
# LeanyAI i18n 说明

## 1. i18n 是如何工作的

本项目采用 i18next + react-i18next 实现多语言支持，支持 SSR/CSR 场景。主要原理如下：

- **配置支持语言**：`i18n/config.ts` 定义 `locales` 和 `defaultLocale`。
- **语言资源组织**：每种语言一个目录（如 `en/`、`zh/`、`de/`），每个目录下有 `common.ts`，采用扁平 key-value 格式。
- **语言类型与信息**：`i18n/language.ts` 定义所有支持的语言代码、名称和图标。
- **服务端/客户端统一上下文**：
  - 服务端通过 `i18n/server.ts` 提供 `getLocaleOnServer` 和 `getTranslation`，用于 SSR。
  - 客户端通过 React Context（`context/i18n-provider.tsx`）和自定义 hook（`hooks/use-i18n.ts`）管理当前语言和翻译函数。
- **切换语言**：`LanguageSwitcher` 组件调用 `setLocale`，实时切换语言，无需刷新页面。
- **翻译函数**：`t(key, params)` 支持参数替换，找不到时回退到默认语言。

## 2. 如何增加语言

1. 在 `i18n/` 下新建对应语言目录（如 `fr/`），并添加 `common.ts`，内容为该语言的所有 key-value 翻译。
2. 在 `i18n/config.ts` 的 `locales` 数组中加入新语言代码（如 'fr'）。
3. 在 `i18n/language.ts` 的 `LanguagesSupported` 和 `languages` 对象中添加新语言的代码、名称和图标。
4. 在 `i18next-client-config.ts` 和 `server.ts` 的 `resources` 中引入新语言的资源。
5. 重新启动前端服务即可生效。

**示例：**
- 新增法语：
  - `i18n/fr/common.ts`
  - `config.ts` locales: ['en', 'zh', 'de', 'fr']
  - `language.ts` 添加 { name: 'Français', icon: '🇫🇷' }

更多细节见源码注释和主项目 README。
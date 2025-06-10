多语言支持实现计划与代码工作原理分析
通过分析现有代码和Dify的i18n实现方式，我可以看出Dify使用了更直接、更现代的国际化实现方式。下面是对代码工作原理的分析和修改实现计划。

代码工作原理
Dify的i18n实现主要依赖以下几个核心组件：

i18n配置文件：定义支持的语言列表和默认语言
语言文件：每种语言对应一个目录，包含翻译内容
客户端上下文：基于React Context管理语言状态和翻译功能
服务端支持：提供服务端渲染时的翻译能力
hooks机制：通过自定义hooks简化翻译使用
与我们当前项目不同的是，Dify没有使用clients文件进行语言处理，而是采用了更现代化的React hooks实现。这种方式使得代码更简洁、更易于维护，并且能够更好地支持服务端渲染(SSR)和客户端组件。

修改实现计划
文件结构

web/
  ├── i18n/
  │   ├── config.ts            # 定义支持的语言和默认语言
  │   ├── client.ts            # 客户端语言处理逻辑
  │   ├── server.ts            # 服务端语言处理逻辑
  │   ├── language.ts          # 语言类型和语言列表定义
  │   ├── en/
  │   │   └── common.json      # 英文翻译
  │   ├── zh/
  │   │   └── common.json      # 中文翻译
  │   └── de/
  │       └── common.json      # 德文翻译
  ├── app/
  │   ├── components/
  │   │   ├── i18n-client.tsx  # 客户端i18n上下文组件
  │   │   └── i18n-server.tsx  # 服务端i18n组件
  │   └── [lang]/              # 国际化路由
  │       └── layout.tsx       # 语言布局组件
  └── context/
      └── i18n.ts              # 已弃用，用app/components/i18n-client.tsx替代


/
核心文件功能说明
1. i18n/config.ts
定义支持的语言列表和默认语言：

导出i18nConfig对象，包含locales数组和defaultLocale字符串
提供语言配置信息给其他模块使用
2. i18n/language.ts
定义语言类型和语言列表：

导出LanguagesSupported枚举或数组，包含支持的语言代码
导出languages对象，映射语言代码到语言名称和图标
3. client.ts
客户端语言处理逻辑：

导出getLocaleOnClient函数，从localStorage获取用户选择的语言
导出setLocaleOnClient函数，设置语言并重新加载页面
导出Locale类型
4. i18n/server.ts
服务端语言处理逻辑：

导出getLocaleOnServer函数，从请求头或cookie获取语言
导出useTranslation函数，使用由服务器初始化的翻译函数
5. i18n-client.tsx
客户端i18n上下文组件：

创建I18nContext React上下文
实现I18nProvider组件，提供翻译功能和语言切换功能
实现useI18n hook，供客户端组件获取翻译功能
缓存默认翻译，减少不必要的网络请求
6. app/components/i18n-server.tsx
服务端i18n组件：

实现对服务端渲染的i18n支持
提供初始语言状态和翻译函数
7. 各语言翻译文件
每个语言的翻译文件使用JSON格式：

采用扁平的键值对格式，便于维护和查找
使用命名空间前缀（如common.）组织不同模块的翻译
工作流程
初始化：

通过配置文件确定支持的语言
应用启动时，通过getLocaleOnClient或getLocaleOnServer确定初始语言
上下文设置：

在应用根组件中包裹I18nProvider
提供语言状态和切换功能
翻译使用：

客户端组件通过useI18n hook获取翻译函数
服务端组件通过useTranslation获取翻译函数
语言切换：

用户切换语言时，调用setLocaleOnClient
保存语言到localStorage
重新加载页面应用新语言
路由处理：

使用[lang]参数化路由实现URL中的语言标识
根据URL中的语言自动设置当前语言
Hook机制详解
useI18n hook是整个i18n系统的核心，它提供了：

当前语言：通过上下文获取当前选择的语言
翻译函数：提供t(key, params)函数，支持参数替换
语言切换：提供setLocale函数，用于切换语言
语言信息：提供当前语言的完整信息（名称、图标等）
hook内部实现了翻译查找逻辑，包括：

从当前语言翻译文件中查找
如果不存在，回退到默认语言
支持参数替换，如t('hello', {name: 'world'})为"Hello, {name}"替换参数
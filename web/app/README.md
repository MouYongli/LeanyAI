# app 目录结构与页面布局说明

## 目录结构

```
app/
  ├── favicon.ico
  ├── globals.css
  ├── layout.tsx         # 全局布局，包含 Header、main、footer
  ├── page.tsx           # 首页内容
  ├── about/
  │     └── page.tsx     # About 页面
  ├── components/
  │     ├── i18n-client.tsx
  │     ├── i18n-server.tsx
  │     ├── language-switcher.tsx
  │     ├── header/
  │     │     └── index.tsx
  │     ├── logo/
  │     │     └── index.tsx
  │     └── workflows/
  │           ├── index.tsx
  │           └── nodes/
  │                 └── index.tsx
```

## 页面 layout 组成

- 全局布局由 `app/layout.tsx` 控制，所有页面内容会自动包裹在统一的布局中。
- 布局结构如下：
  - Header（头部导航，`components/header`）
  - main（页面内容区域，插入各页面的 children）
  - footer（底部版权信息）

- 各页面（如 `page.tsx`, `about/page.tsx`）只需专注于自身内容，无需再引入布局组件。

# Leany AI Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

```bash
yarn create next-app
```
<details>
    <summary>Yarn vs NPM</summary>

| 特性 | Yarn | NPM |
|------|------|-----|
| 安装速度 | 通常更快（并行安装） | 较慢（顺序安装） |
| 安全性 | 使用校验和验证包完整性 | npm 5+也添加了类似功能 |
| 确定性 | 通过yarn.lock确保一致安装 | 通过package-lock.json确保一致性 |
| 缓存系统 | 离线缓存，重装更快 | 也有缓存但实现不同 |

常用命令对比

| 操作 | Yarn | NPM |
|------|------|-----|
| 安装依赖 | `yarn` 或 `yarn install` | `npm install` |
| 添加依赖 | `yarn add [package]` | `npm install [package]` |
| 添加开发依赖 | `yarn add [package] --dev` | `npm install [package] --save-dev` |
| 移除依赖 | `yarn remove [package]` | `npm uninstall [package]` |
| 升级依赖 | `yarn upgrade [package]` | `npm update [package]` |
</details>



## Getting Started



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

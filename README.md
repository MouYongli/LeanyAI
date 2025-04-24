![Mainpage](docs/images/image.png)
![Mainpage](docs/images/workflow.png)

# LeanyAI
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue)](https://hub.docker.com/r/YOUR_DOCKER_IMAGE)
[![GitHub Action](https://github.com/MouYongli/LeanyAI/actions/workflows/check-dev.yml/badge.svg)](https://github.com/MouYongli/LeanyAI/actions/workflows/check-dev.yml)


[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-F69220?logo=pnpm)](https://pnpm.io/)
[![Nginx](https://img.shields.io/badge/Nginx-1.25+-009639?logo=nginx)](https://nginx.org/)
[![i18n](https://img.shields.io/badge/i18n-multilingual-blueviolet?logo=googletranslate)](https://www.i18next.com/)

LeanyAI 是一个基于 Next.js 的多语言 AI 平台，支持前后端分离部署。

## 目录结构
```
web/           前端 Next.js 应用，支持多语言、SSR、i18n，详见 web/README.md
api/           后端服务（预留，未来可扩展）
docker/        Docker Compose 与 Nginx 统一编排部署，详见 docker/README.md
docs/          说明文档、项目截图与架构文档
├── images/        项目截图与图片资源
├── mindstrom/     设计与架构文档
│   ├── 0416.md
│   ├── fastapi.png
│   ├── image.png
│   ├── mindstrom.md
│   └── structure.jpg
└── ...
difyCode.xml   由 Repomix 生成的 AI 友好代码包
```

## 一键启动
1. 进入 docker 目录
   ```bash
   cd docker
   docker-compose -p leanyai up --build
   ```
2. 访问 http://localhost:8300 通过 Nginx 统一入口访问前端/后端

## 工具介绍
- difyCode.xml 由 Repomix 生成，可用于 AI 代码理解与分析。
- Repomix 可将整个代码仓库打包成单个 AI 友好的文件，便于大模型理解。


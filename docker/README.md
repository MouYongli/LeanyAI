# Docker 部署 / Deployment Guide

## 概述 / Overview
本目录提供 Docker Compose 配置（含可选 Nginx 反向代理）用于一键部署 LeanyAI 平台：
- 前端：Next.js
- 后端：FastAPI

## 目录结构 / Directory Structure
```text
docker/
├── docker-compose.yml           # 无 Nginx 模式：web + api
├── docker-compose-nginx.yml     # 有 Nginx 模式：nginx + web + api
├── nginx.conf                   # Nginx 配置
└── README.md
```

## 端口映射关系 / Port Mapping
端口映射关系配置在 `.env` 文件中，主要端口如下：

| 服务 Service | 容器端口 Container Port | 主机端口 Host Port |
|--------------|----------------------|-------------------|
| Web (Next.js)| 3000                 | 8301              |
| FastAPI      | 8000                 | 8302              |
| MinIO API    | 9000                 | 9000              |
| MinIO Console| 9001                 | 9001              |

如需修改端口，请直接编辑 `.env` 文件并同步调整相关 compose 配置。

## 使用说明 / Usage
1. 进入目录：
   ```bash
   cd docker
   ```
2. 启动所有服务：
   ```bash
   docker compose -f docker-compose.yml up -d --build
   ```

### 重建单个服务 / Rebuild Single Service
```bash
docker compose up -d --build --force-recreate api
```

### 重启服务 / Restart Services witthout Rebuild
```bash
docker compose up -d --build
```

### 停止并清理 / Stop & Clean
```bash
docker compose down
```

## 测试模式 / Test Mode
- 单元测试：`docker compose up minio-test`
- 集成测试：`docker compose up fastapi-test`

## 注意事项 / Notes
- 修改端口、挂载等，请编辑对应的 `.env` 与 `docker-compose*.yml`、`nginx.conf`(/etc/nginx/sites-available) 文件。

# Docker 部署说明 / Docker Deployment Guide

## 项目概述 / Overview
本目录提供一组 Docker Compose 配置和 Nginx 配置，用于一键部署前后端分离的 LeanyAI 平台。  
This directory contains Docker Compose and Nginx configurations for unified deployment of the decoupled frontend (Next.js) and backend (FastAPI) services.

## 目录 / Table of Contents
- [先决条件 / Prerequisites](#先决条件--prerequisites)
- [目录结构 / Directory Structure](#目录结构--directory-structure)
- [配置说明 / Configuration](#配置说明--configuration)
- [部署与启动 / Deployment & Startup](#部署与启动--deployment--startup)
  - [有 Nginx / With Nginx](#有-nginx--with-nginx)
  - [无 Nginx / Without Nginx](#无-nginx--without-nginx)
- [注意事项 / Notes](#注意事项--notes)
- [许可证 / License](#许可证--license)

## 先决条件 / Prerequisites
- Docker >= 20.10
- Docker Compose >= 1.29
- Web 服务(Dockerfile)和 API 服务(Dockerfile)在各自目录中

## 目录结构 / Directory Structure
```text
docker/
├── docker-compose.yml           # 无 Nginx 模式，仅 web 和 api 服务
├── docker-compose-nginx.yml     # 有 Nginx 模式，包含 nginx、web、api 服务
├── nginx.conf                   # Nginx 配置文件
└── README.md
```

## 配置说明 / Configuration
- docker-compose.yml：直接启动 web 与 api 服务，无 Nginx 反向代理
- docker-compose-nginx.yml：包含 nginx 容器，统一代理 web 和 api 服务，使用 nginx.conf
  - nginx.conf：定义 /api 路径转发至 api 服务，其余流量转发至 web 服务

## 端口映射关系 / Port Mapping
端口映射关系配置在 `.env` 文件中，主要端口如下：

| 服务 Service | 容器端口 Container Port | 主机端口 Host Port |
|--------------|----------------------|-------------------|
| Web (Next.js)| 3000                 | 8301              |
| FastAPI      | 8302                 | 8302              |
| MinIO API    | 9000                 | 9000              |
| MinIO Console| 9001                 | 9001              |

如需修改端口，请直接编辑 `.env` 文件并同步调整相关 compose 配置。

## 部署与启动 / Deployment & Startup

1. 进入目录：
   ```bash
   cd docker
   ```
2. 启动并构建：
   ```bash
   docker compose -f docker-compose.yml up -d --build
   ```
3. 访问 web 服务端口 (默认 http://localhost:3000)

## 注意事项 / Notes
- 可根据需求调整端口和挂载路径，请修改 `docker-compose*.yml` 和 `nginx.conf`。
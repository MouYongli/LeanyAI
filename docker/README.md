# Docker Compose 多服务统一编排说明

本目录下包含 docker-compose.yml 和 nginx.conf，实现前后端分离部署。

## 整体流程
- docker-compose 统一编排和启动所有服务（如 web、api、nginx）。
- nginx 作为独立容器服务，由 compose 管理。
- nginx 通过配置挂载，将前端 web 服务（3003 端口）和后端 api 服务（目前未设置，比如 5001 端口）代理到外部，统一对外提供接口和页面访问。
- 用户访问 nginx，nginx 决定请求转发到 web 还是 api 服务，实现前后端分离和安全隔离。
- 总结：compose 管理所有服务，nginx 作为流量入口，代理 web 和 api 服务。

## 主要文件说明
- docker-compose.yml：定义 web（Next.js）、api（后端）、nginx 三个服务。nginx 通过 depends_on 保证 web、api 启动后再启动。
- nginx.conf：配置 Nginx 代理规则，将 /api/ 路径转发到 api 服务，其余流量转发到 web 服务。

## 启动方式
1. 进入 docker 目录：
   ```bash
   cd docker
   ```
2. 构建并启动所有服务：
   ```bash
   docker-compose -p leanyai up --build
   ```
3. 访问 http://localhost:8300 端口访问 即可通过 nginx 访问前端和后端接口。

## 目录结构
- docker/
  - docker-compose.yml
  - nginx.conf
  - README.md
- web/
  - Dockerfile
- api/
  - Dockerfile

## 注意事项
- 需确保 web 和 api 目录下均有 Dockerfile。
- 如需自定义端口或代理规则，请修改 nginx.conf。


# Docker Compose 多服务统一编排说明

本目录下包含 docker-compose.yml 和 nginx.conf，实现前后端分离部署。

## 整体流程
- docker-compose 统一编排和启动所有服务（如 web、api、nginx）。
- nginx 作为独立容器服务，由 compose 管理。
- nginx 通过配置挂载,代理到外部，统一对外提供接口和页面访问。
   - 将前端 web 服务（3003 端口）
   - 后端 api 服务（目前未设置，比如 5001 端口）
- 用户访问 nginx，nginx 决定请求转发到 web 还是 api 服务，实现前后端分离和安全隔离。
- 总结：compose 管理所有服务，nginx 作为**流量入口**，代理 web 和 api 服务。

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

## 部署方式

本项目支持三种不同的部署方式：

1. **Nginx 直接部署**：
   - 使用 `docker-compose-nginx-direct.yml` 文件，通过 Nginx 作为反向代理部署项目。
   - 命令：`docker-compose -f docker/docker-compose-nginx-direct.yml up --build`

2. **挂载已经存在的 Nginx**：
   - 使用 `docker-compose-existing-nginx.yml` 文件，通过挂载已经存在的 Nginx 实例部署项目。
   - 命令：`docker-compose -f docker/docker-compose-existing-nginx.yml up --build`

3. **不用 Nginx**：
   - 使用 `docker-compose-no-nginx.yml` 文件，直接暴露 web 服务，不使用 Nginx 作为反向代理。
   - 命令：`docker-compose -f docker/docker-compose-no-nginx.yml up --build`

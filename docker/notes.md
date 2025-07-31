    ports:
      - "${FASTAPI_PORT}:8000"

${FASTAPI_PORT}在.env文件中定义。

environment是当前 service 要依赖或者使用的环境。

docker 让前端和后端可以独立运行，并且可以互相依赖。
但是端口配置变得复杂了。

如果本地开发，那么 全部使用 localhost 端口。

docker 部署的话，就变成了端口映射。
比如 web 使用 web:3000 端口，api 使用 api:8000 端口。
这叫 容器间通信。
web 调用 api 的时候，需要使用 api：8000.

web：3000 映射到 8301
我现在通过 http://localhost:8301/ 访问 web 程序。

api：8000 映射到 8302
我现在通过 http://localhost:8302/ 访问 api 程序。

web 和 api 如何通信呢？


1. Next.js 环境变量处理机制
Next.js 有一个特殊的机制：以 NEXT_PUBLIC_ 开头的环境变量需要在构建时就确定，而不是运行时。这意味着：
在 docker-compose.yml 中设置的 NEXT_PUBLIC_API_BASE_URL=http://api:8000 只在运行时生效
但 Next.js 在构建阶段就需要这个变量，此时它还是空的

# LeanyAI API 项目结构与启动说明


## 目录结构

```
api/
├── fastapi_app/
│   ├── main.py            # FastAPI 应用入口
├── minio_service/
│   ├── minio_client.py    # MinIO 客户端封装
│   ├── test_minio_api.py  # MinIO 相关测试
│   └── ...
├── agents/
│   ├── agent_service.py   # 代理服务逻辑
├── Dockerfile.fastapi     # FastAPI 服务 Dockerfile
├── Dockerfile.minio       # MinIO 服务 Dockerfile
├── README.md              # 本说明文档
└── ...                    # 其他模块、数据等

../../EvoAgentX/
```
denpendency: *EvoAgentX* needs to be installed in the parent directory, same level as this LeanyAI API directory.

## 启动方式

1. 启动依赖服务（如 MinIO）
   ```bash
   # 构建并运行 MinIO 容器
   docker build -f Dockerfile.minio -t leanyai-minio .
   docker run -d --name leanyai-minio \
     -p 9000:9000 -p 9001:9001 \
     -v ~/minio/data:/data \
     leanyai-minio server /data --console-address ":9001"
   ```
   > 完成后请访问 http://localhost:9001 （MinIO 控制台）和 http://localhost:8302 （FastAPI 服务）。

2. 启动 FastAPI 服务
   * 使用 Docker 部署（推荐）
     ```bash
     # 构建并运行 FastAPI 容器
     docker build -f Dockerfile.fastapi -t leanyai-api .
     docker run -d --name leanyai-api -p 8300:8000 leanyai-api
     ```

   * 本地开发
     ```bash
     # install uv
     pip install uv
     uv venv .venv --python=python3.10

     # activate virtual environment and install dependencies
     source .venv/bin/activate && pip install -r requirements.txt
     cd ../../EvoAgentX && pip install -e . && cd ../LeanyAI/api

     # `--reload` 适用于开发环境，代码变动会自动重载。
     #  默认监听 8000 端口 ，如需更改可修改 `--port` 参数。
     uvicorn fastapi_app.main:app --reload
     ```
     > 默认端口8000，http://localhost:8000
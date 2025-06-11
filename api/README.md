
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
├── Dockerfile.fastapi     # FastAPI 服务 Dockerfile
├── Dockerfile.minio       # MinIO 服务 Dockerfile
├── README.md              # 本说明文档
└── ...                    # 其他模块、数据等
```

## 启动方式

1. 启动依赖服务（如 MinIO）
   ```bash
   # 构建并运行 MinIO 容器
   docker build -f Dockerfile.minio -t leanyai-minio .
   docker run -d --name leanyai-minio \
     -p 9000:9000 -p 9001:9001 \
     -e "MINIO_ROOT_USER=minioadmin" \
     -e "MINIO_ROOT_PASSWORD=minioadmin" \
     -v ~/minio/data:/data \
     leanyai-minio server /data --console-address ":9001"
   ```

2. 启动 FastAPI 服务
   * 使用 Docker 部署（推荐）
     ```bash
     # 构建并运行 FastAPI 容器
     docker build -f Dockerfile.fastapi -t leanyai-api .
     docker run -d --name leanyai-api -p 8302:8302 leanyai-api
     ```
   * 本地开发
     ```bash
     pip install uv
     uv venv .venv --python=python3.10
     source .venv/bin/activate && pip install -r requirements.txt && uvicorn fastapi_app.main:app --reload
     ```

> 完成后请访问 http://localhost:9001 （MinIO 控制台）和 http://localhost:8302 （FastAPI 服务）。
> 需确保本地 MinIO 服务已启动，默认端口9000，账号/密码 minioadmin。


## 端口映射关系 / Port Mapping
端口映射关系配置在 `.env` 文件中，主要端口如下：

| 服务 Service | 容器端口 Container Port | 主机端口 Host Port |
|--------------|----------------------|-------------------|
| Web (Next.js)| 3000                 | 8301              |
| FastAPI      | 8302                 | 8302              |
| MinIO API    | 9000                 | 9000              |
| MinIO Console| 9001                 | 9001              |

如需修改端口，请直接编辑 `.env` 文件并同步调整相关 compose 配置。

---

如需扩展，可增加 tests/ 目录用于单元测试，或 docs/ 目录补充接口文档。
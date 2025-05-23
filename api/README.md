
# LeanyAI API 项目结构与启动说明


## 目录结构（建议整理后）

```
api/
├── fastapi_app/
│   ├── main.py            # FastAPI 应用入口
│   ├── requirements.txt   # FastAPI 依赖
│   └── ...
├── minio_service/
│   ├── minio_client.py    # MinIO 客户端封装
│   ├── test_minio_api.py  # MinIO 相关测试
│   └── ...
├── Dockerfile.fastapi     # FastAPI 服务 Dockerfile
├── Dockerfile.minio       # MinIO 服务 Dockerfile
├── README.md              # 本说明文档
├── learnMinio.md          # MinIO 相关学习笔记
├── 进度总结.md             # 开发进度与计划
└── ...                    # 其他模块、数据等
```

请将 fastapi 相关文件（如 main.py、requirements.txt）放入 fastapi_app/，minio 相关文件（如 minio_client.py、test_minio_api.py）放入 minio_service/。

## 启动方式

1. 推荐使用 Docker 部署服务，无需本地安装 uv。
   - FastAPI 服务请参考 `Dockerfile.fastapi`。
   - MinIO 服务请参考 `Dockerfile.minio`。
   - 统一编排可参考根目录下 `docker/` 相关 compose 文件。
2. 如需本地开发，可选择使用 uv 或 venv，但生产环境建议全部容器化。
   ```bash
   pip install uv
   ```
2. 创建并激活虚拟环境（推荐 .venv 隐藏目录）
   ```bash
   cd api
   uv venv .venv --python=python3.10
   ```

3. 激活虚拟环境
   ```bash
   source .venv/bin/activate
   ```

   激活成功后，命令行前会出现 (.venv) 前缀，表示当前已在虚拟环境中。

4. 安装依赖
   ```bash
   uv pip install -r requirements.txt
   ```

5. 下载并启动 MinIO（推荐使用 Docker 部署）
   - 推荐使用 Docker 快速部署 MinIO，命令如下：
     ```bash
     docker run -d \
       --name minio \
       -p 9000:9000 \
       -p 9001:9001 \
       -e "MINIO_ROOT_USER=minioadmin" \
       -e "MINIO_ROOT_PASSWORD=minioadmin" \
       -v ~/minio/data:/data \
       minio/minio server /data --console-address ":9001"
     ```

   - 默认管理后台 http://localhost:9001，API 端口 http://localhost:9000
   - 默认账号/密码：minioadmin / minioadmin

5. 启动 FastAPI 服务
   ```bash
   uvicorn fastapi_app.main:app --reload
   ```

6. 测试
   在 uv 虚拟环境下运行测试脚本：

   ```bash
   python test_minio_fastapi.py
   ```
   
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
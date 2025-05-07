
# LeanyAI API 项目结构与启动说明

## 目录结构

```
api/
├── README.md                # 本说明文档
├── requirements.txt         # Python 依赖列表
├── main.py                  # FastAPI 应用入口
├── minio_client.py          # MinIO 客户端封装，负责与 MinIO 服务交互
├── .gitignore               # 忽略虚拟环境、缓存等
├── .venv/                   # Python 虚拟环境目录（已忽略）
├── 进度总结.md               # 开发进度与计划
└── ...                      # 其他模块（如 models/、routes/、utils/ 等）
```

## 启动方式

1. 安装 uv（如未安装）  
   uv 是一个虚拟环境管理工具，更多信息请参考其 [官方文档](https://pypi.org/project/uv/)。  
   ```bash
   pip install uv
   ```
2. 创建并激活虚拟环境（推荐 .venv 隐藏目录）
   ```bash
   cd api
   uv venv .venv --python=python3.10
   source .venv/bin/activate
   ```
3. 安装依赖
   ```bash
   uv pip install -r requirements.txt
   ```

4. 下载并启动 MinIO（如本地未安装）
   - 访问 https://min.io/download#/linux 下载 MinIO Server
   -  在 home 目录，用如下命令下载安装（Linux 示例）：
     ```bash
     wget https://dl.min.io/server/minio/release/linux-amd64/minio
     chmod +x minio
     ```
   - 在 home 目录启动
     ```bash
      ./minio server ./data --console-address ":9001"
     ```


   - 默认管理后台 http://localhost:9001，API 端口 http://localhost:9000
   - 默认账号/密码：minioadmin / minioadmin

5. 启动 FastAPI 服务
   ```bash
   uvicorn main:app --reload
   ```

> 需确保本地 MinIO 服务已启动，默认端口9000，账号/密码 minioadmin。

---

如需扩展，可增加 tests/ 目录用于单元测试，或 docs/ 目录补充接口文档。
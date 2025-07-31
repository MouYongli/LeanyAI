# LeanyAI FastAPI 应用

## 项目结构

```
fastapi_app/
├── main.py              # 主应用入口
├── routers/             # 路由模块
│   ├── __init__.py      # 路由包初始化
│   ├── minio.py         # MinIO 文件存储相关端点
│   └── agent.py         # Agent 服务相关端点
└── README.md            # 本文档
```

## 启动说明

### 开发环境

在 `api/` 目录下运行：

```bash
uvicorn fastapi_app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 生产环境

```bash
uvicorn fastapi_app.main:app --host 0.0.0.0 --port 8000
```

## 依赖安装

如未安装依赖，请先执行：

```bash
pip install -r requirements.txt
```

## API 文档

启动服务后，可以通过以下地址访问：

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Root Info**: http://localhost:8000/

## API 端点列表

### 文件存储 (MinIO)

| 方法   | 路径                   | 描述                     | 标签    |
| ------ | ---------------------- | ------------------------ | ------- |
| POST   | `/upload/`             | 上传文件到 MinIO 存储     | files   |
| DELETE | `/delete/{filename}`   | 删除指定文件             | files   |
| GET    | `/download/{filename}` | 下载指定文件             | files   |
| GET    | `/files/`              | 获取文件列表             | files   |

### Agent 服务

| 方法   | 路径           | 描述                     | 标签    |
| ------ | -------------- | ------------------------ | ------- |
| GET    | `/agent/`      | 获取最新生成的任务计划    | agent   |
| POST   | `/agent/plan`  | 根据用户消息生成新计划    | agent   |

### 其他服务

| 方法   | 路径         | 描述                     | 标签      |
| ------ | ------------ | ------------------------ | --------- |
| GET    | `/`          | API 基本信息             | root      |
| GET    | `/example/`  | 示例服务                 | example   |

## 模块化设计

### 路由模块

- **`routers/minio.py`**: 包含所有文件存储相关的端点
- **`routers/agent.py`**: 包含所有 AI 任务规划相关的端点

### 优势

1. **模块化**: 不同功能的端点分离，便于维护
2. **可扩展**: 易于添加新的功能模块
3. **清晰的结构**: 代码组织更清晰
4. **标签分组**: 在 API 文档中按功能分组显示

## 部署说明

推荐使用 Docker 部署，详见项目根目录的 Docker 配置文件。
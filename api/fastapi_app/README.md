# FastAPI 应用启动说明

## 启动命令

在本目录下运行以下命令启动 FastAPI 服务：

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 依赖安装

如未安装依赖，请先执行：

```bash
pip install -r requirements.txt
```

## 说明
- `--reload` 适用于开发环境，代码变动会自动重载。
- 默认监听 8000 端口，如需更改可修改 `--port` 参数。

我目前没有本地运行，我都是用 docker 部署。
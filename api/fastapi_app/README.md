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
  - 默认监听 8000 端口，如需更改可修改 `--port` 参数。
## API 列表
以下是当前支持的接口列表：

| 方法   | 路径                   | 描述                                                         | 参数说明                        | 返回值说明                        |
| ------ | ---------------------- | ------------------------------------------------------------ | ------------------------------- | --------------------------------- |
| POST   | `/upload/`             | 上传文件                                                     | 表单字段：`file`                | `{ msg, filename }`               |
| DELETE | `/delete/{filename}`   | 删除指定文件                                                 | 路径参数：`filename`            | `{ msg, filename }`               |
| GET    | `/download/{filename}` | 下载指定文件（以 `application/octet-stream` 流形式返回）     | 路径参数：`filename`            | 文件流                            |
| GET    | `/files/`              | 获取文件列表                                                 | 无                              | `{ files: string[] }`             |

我目前没有本地运行，我都是用 docker 部署。
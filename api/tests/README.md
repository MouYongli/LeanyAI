# LeanyAI API 测试说明

本目录包含 LeanyAI API 的测试文件和示例代码。

## 测试文件列表

### Agent API 测试
- `test_agent_api.py` - Agent API 的完整测试套件
- `agent_api_examples.py` - Agent API 使用示例和演示

### MinIO API 测试  
- `test_minio_fastapi.py` - MinIO 相关 API 测试

## 环境搭建

1. 进入 `tests` 目录：
   ```bash
   cd api/tests
   ```

2. 确保 API 服务器正在运行：
   ```bash
   # 在另一个终端窗口中，从项目根目录运行：
   cd api && source .venv/bin/activate && uvicorn fastapi_app.main:app --reload
   ```

3. 安装测试依赖（如果需要）：
   ```bash
   pip install requests
   ```

## 运行测试

### Agent API 测试

1. **完整测试套件**：
   ```bash
   python test_agent_api.py
   ```

2. **特定测试**：
   ```bash
   # 测试获取计划
   python test_agent_api.py --test get_plan
   
   # 测试生成计划
   python test_agent_api.py --test generate_plan --message "你的项目目标"
   ```

3. **使用示例**：
   ```bash
   python agent_api_examples.py
   ```

### MinIO API 测试

```bash
python test_minio_fastapi.py
```

## API 端点

### Agent API (端口 8000)
- `GET /agent/` - 获取最新生成的计划
- `POST /agent/plan` - 根据用户消息生成新计划

### 其他 API
- 文件上传/下载相关 API (具体端口见主 README)

## 注意事项

- 确保相应的 API 服务器正在运行
- Agent API 需要配置好环境变量（Azure OpenAI 相关配置）
- 测试前请检查 API 端点是否可访问
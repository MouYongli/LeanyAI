# 测试环境搭建说明

1. 进入 `tests` 目录：

   ```bash
   cd tests
   ```

2. 创建并激活 Python 3.10 虚拟环境（推荐使用 [uv](https://github.com/astral-sh/uv) 工具）：

   ```bash
   uv venv .venv --python=python3.10
   source .venv/bin/activate
   ```

3. 安装依赖：

   ```bash
   uv pip install -r requirements.txt
   ```

4. 运行测试（如有需要）：

   ```bash
   python test_minio_fastapi.py
   ```

> 注：如未安装 `uv`，可用 `pip install uv` 进行安装，或将上述命令中的 `uv` 替换为 `python`/`pip`。
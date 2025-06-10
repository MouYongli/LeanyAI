"""
pip install git+https://github.com/EvoAgentX/EvoAgentX.git
本模块演示如何安装并使用 EvoAgentX 库来生成工作流。

步骤说明:
1. 使用 pip 安装 EvoAgentX 库:

2. 安装完成后, 导入 EvoAgentX 包。

3. 通过 WorkFlowGenerator 类, 并传入 llm 参数, 实例化工作流生成器:

4. 使用 EvoAgentX 提供的类来生成和管理工作流。

注意:
- 请确保已正确安装 EvoAgentX 及其依赖。
- llm 参数需为已初始化的语言模型实例。

也就是要写好调用的代码，给 fastapi/main 模块提供一个接口来生成工作流。

In this module, we will demonstrate how to use the EvoAgentX library to generate workflows.
we will create a demo to use the EvoAgentX library to generate workflows. When it succeeds, then connect it to the FastAPI application.

we are using uv and .venv to manage the virtual environment and run the application.
1. install EvoAgentX library.
2. test the function "generate_workflow"

from dotenv import load_dotenv  # ensure we can load .env variables
"""

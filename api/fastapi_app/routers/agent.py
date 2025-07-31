"""
Agent 服务相关的 API 路由

包含任务规划生成和管理功能的端点。
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agent.agent_service import generate_plan, get_latest_plan


# 定义请求模型
class MessageRequest(BaseModel):
    message: str


router = APIRouter(
    prefix="/agent",
    tags=["agent"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def agent_service():
    """
    获取最新生成的任务计划。
    
    返回最新的任务计划数据，包含子任务列表和状态信息。
    """
    return get_latest_plan()


@router.post("/plan")
def agent_plan_service(request: MessageRequest):
    """
    根据用户消息生成新的任务计划。
    
    - **request**: 包含用户消息的请求体
        - **message**: 用户的项目目标或需求描述
    
    返回生成的任务计划，包含结构化的子任务分解。
    
    示例请求体：
    ```json
    {
        "message": "开发一个在线聊天应用"
    }
    ```
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")
    
    return generate_plan(goal=request.message)
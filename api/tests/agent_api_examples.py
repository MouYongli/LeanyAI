#!/usr/bin/env python3
"""
LeanyAI Agent API 使用示例

演示如何与 Agent API 交互来生成和管理任务计划
"""

import requests
import json
from typing import Dict, Any


BASE_URL = "http://localhost:8000"


def get_current_plan() -> Dict[str, Any]:
    """获取当前最新的计划"""
    response = requests.get(f"{BASE_URL}/agent/")
    return response.json()


def generate_new_plan(goal: str) -> Dict[str, Any]:
    """根据目标生成新的计划"""
    response = requests.post(
        f"{BASE_URL}/agent/plan",
        json={"message": goal},
        headers={"Content-Type": "application/json"}
    )
    return response.json()


def print_plan_summary(plan: Dict[str, Any], title: str = "计划概览"):
    """打印计划摘要"""
    print(f"\n📋 {title}")
    print("=" * 50)
    
    if 'sub_tasks' in plan:
        print(f"📝 子任务数量: {len(plan['sub_tasks'])}")
        print("\n任务列表:")
        
        for i, task in enumerate(plan['sub_tasks'], 1):
            if isinstance(task, dict):
                name = task.get('name', f'Task_{i}')
                desc = task.get('description', 'No description')
                status = task.get('status', 'unknown')
                
                print(f"\n{i}. {name} [{status}]")
                print(f"   📄 {desc[:80]}{'...' if len(desc) > 80 else ''}")


# 示例用法
if __name__ == "__main__":
    # 示例1: 获取当前计划
    print("🔍 获取当前计划...")
    current_plan = get_current_plan()
    print_plan_summary(current_plan, "当前计划")
    
    # 示例2: 生成新计划
    print("\n🚀 生成新计划...")
    new_goal = "开发一个个人博客系统"
    new_plan = generate_new_plan(new_goal)
    print_plan_summary(new_plan, f"新计划: {new_goal}")
    
    # 示例3: 再次获取计划（应该是刚生成的）
    print("\n🔄 获取更新后的计划...")
    updated_plan = get_current_plan()
    print_plan_summary(updated_plan, "更新后的计划")
    
    # 示例4: 生成不同类型的项目计划
    project_ideas = [
        "构建一个在线教育平台",
        "开发一个任务管理工具",
        "创建一个图片分享社区"
    ]
    
    print("\n🎲 生成不同类型的项目计划:")
    for idea in project_ideas:
        print(f"\n🎯 项目: {idea}")
        plan = generate_new_plan(idea)
        task_count = len(plan.get('sub_tasks', []))
        print(f"   ✅ 生成了 {task_count} 个子任务")
        
        # 显示前3个任务名称
        for i, task in enumerate(plan.get('sub_tasks', [])[:3], 1):
            if isinstance(task, dict):
                name = task.get('name', f'Task_{i}')
                print(f"   {i}. {name}")
    
    print("\n🏁 示例演示完成!")
#!/usr/bin/env python3
"""
测试 LeanyAI API 的 agent 功能

使用方法:
python test_agent_api.py

或者测试特定功能:
python test_agent_api.py --test get_plan
python test_agent_api.py --test generate_plan
"""

import requests
import json
import argparse
from typing import Dict, Any


BASE_URL = "http://localhost:8000"


def test_get_latest_plan() -> Dict[str, Any]:
    """测试获取最新计划的 API"""
    print("🔍 测试 GET /agent/ - 获取最新计划")
    print("-" * 50)
    
    try:
        response = requests.get(f"{BASE_URL}/agent/")
        response.raise_for_status()
        
        plan = response.json()
        print("✅ 成功获取计划!")
        print(f"📊 响应状态码: {response.status_code}")
        print(f"📋 计划类型: {plan.get('class_name', 'Unknown')}")
        
        if 'sub_tasks' in plan:
            print(f"📝 子任务数量: {len(plan['sub_tasks'])}")
            for i, task in enumerate(plan['sub_tasks'], 1):
                if isinstance(task, dict):
                    task_name = task.get('name', f'Task_{i}')
                    task_status = task.get('status', 'unknown')
                    print(f"   {i}. {task_name} ({task_status})")
        
        return plan
        
    except requests.exceptions.ConnectionError:
        print("❌ 连接失败! 请确保 API 服务器正在运行在 http://localhost:8302")
        return {}
    except requests.exceptions.RequestException as e:
        print(f"❌ 请求失败: {e}")
        return {}


def test_generate_plan(message: str = None) -> Dict[str, Any]:
    """测试生成计划的 API"""
    if message is None:
        message = "创建一个简单的待办事项应用"
    
    print("🚀 测试 POST /agent/plan - 生成新计划")
    print(f"💬 用户消息: '{message}'")
    print("-" * 50)
    
    try:
        payload = {"message": message}
        response = requests.post(
            f"{BASE_URL}/agent/plan",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        
        plan = response.json()
        print("✅ 成功生成新计划!")
        print(f"📊 响应状态码: {response.status_code}")
        print(f"📋 计划类型: {plan.get('class_name', 'Unknown')}")
        
        if 'sub_tasks' in plan:
            print(f"📝 生成的子任务数量: {len(plan['sub_tasks'])}")
            for i, task in enumerate(plan['sub_tasks'], 1):
                if isinstance(task, dict):
                    task_name = task.get('name', f'Task_{i}')
                    task_desc = task.get('description', 'No description')
                    print(f"   {i}. {task_name}")
                    print(f"      📄 {task_desc[:100]}{'...' if len(task_desc) > 100 else ''}")
        
        return plan
        
    except requests.exceptions.ConnectionError:
        print("❌ 连接失败! 请确保 API 服务器正在运行在 http://localhost:8302")
        return {}
    except requests.exceptions.RequestException as e:
        print(f"❌ 请求失败: {e}")
        return {}


def test_invalid_request():
    """测试无效请求的处理"""
    print("🧪 测试无效请求处理")
    print("-" * 50)
    
    try:
        # 测试空消息
        response = requests.post(
            f"{BASE_URL}/agent/plan",
            json={"message": ""},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 400:
            print("✅ 正确处理空消息请求 (400 错误)")
        else:
            print(f"⚠️  空消息请求返回状态码: {response.status_code}")
            
        # 测试缺失字段
        response = requests.post(
            f"{BASE_URL}/agent/plan",
            json={},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code in [400, 422]:
            print("✅ 正确处理缺失字段请求")
        else:
            print(f"⚠️  缺失字段请求返回状态码: {response.status_code}")
            
    except Exception as e:
        print(f"❌ 测试异常: {e}")


def run_comprehensive_test():
    """运行完整测试套件"""
    print("🎯 LeanyAI Agent API 综合测试")
    print("=" * 60)
    
    # 1. 测试获取最新计划
    plan1 = test_get_latest_plan()
    print("\n")
    
    # 2. 测试生成新计划
    plan2 = test_generate_plan("开发一个在线聊天应用")
    print("\n")
    
    # 3. 再次获取最新计划（应该是刚生成的）
    print("🔄 再次获取最新计划（应该是刚生成的）")
    plan3 = test_get_latest_plan()
    print("\n")
    
    # 4. 测试无效请求
    test_invalid_request()
    print("\n")
    
    # 5. 测试不同类型的目标
    test_goals = [
        "构建一个电商网站",
        "创建数据可视化仪表板",
        "开发移动应用原型"
    ]
    
    print("🎲 测试不同类型的目标:")
    for goal in test_goals:
        print(f"\n🎯 测试目标: {goal}")
        plan = test_generate_plan(goal)
        if plan:
            task_count = len(plan.get('sub_tasks', []))
            print(f"   ✅ 生成了 {task_count} 个子任务")
    
    print("\n" + "=" * 60)
    print("🏁 测试完成!")


def main():
    parser = argparse.ArgumentParser(description="测试 LeanyAI Agent API")
    parser.add_argument(
        "--test", 
        choices=["get_plan", "generate_plan", "all"],
        default="all",
        help="选择要运行的测试"
    )
    parser.add_argument(
        "--message",
        type=str,
        help="自定义测试消息（仅用于 generate_plan 测试）"
    )
    
    args = parser.parse_args()
    
    if args.test == "get_plan":
        test_get_latest_plan()
    elif args.test == "generate_plan":
        test_generate_plan(args.message)
    else:
        run_comprehensive_test()


if __name__ == "__main__":
    main()
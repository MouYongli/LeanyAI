# Agent Page 数据流动序列图 (简化版)

这个序列图展示了从用户输入消息到后端处理并更新工作流图的核心函数调用。

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant ChatPanel as 💬 ChatPanel
    participant AgentPage as 📄 AgentPage
    participant useAgentApi as 🔌 useAgentApi
    participant Backend as 🖥️ Backend
    participant WorkflowViz as 📊 WorkflowVisualizer

    Note over User,WorkflowViz: 核心函数调用流程

    %% 1. 用户输入
    User->>ChatPanel: 输入 "Build weather app"
    ChatPanel->>AgentPage: onSend("Build weather app")
    
    %% 2. 发送消息
    AgentPage->>AgentPage: handleSend(text)
    AgentPage->>useAgentApi: sendMessage(text)
    
    activate useAgentApi
    useAgentApi->>Backend: POST /agent/plan
    Backend-->>useAgentApi: 返回计划
    deactivate useAgentApi
    
    %% 3. 获取工作流
    AgentPage->>useAgentApi: getDefinition()
    
    activate useAgentApi
    useAgentApi->>Backend: GET /agent/
    Backend-->>useAgentApi: 返回TaskPlanningOutput
    useAgentApi->>useAgentApi: buildDefinition(plan)
    useAgentApi-->>AgentPage: Mermaid定义字符串
    deactivate useAgentApi
    
    %% 4. 更新UI
    AgentPage->>ChatPanel: 更新messages
    AgentPage->>WorkflowViz: 传递definition
    WorkflowViz->>WorkflowViz: useEffect触发重新渲染
    WorkflowViz->>User: 显示工作流图表
    
    Note over User,WorkflowViz: 用户看到消息和工作流图
```

## 核心函数调用

### 1. 消息传递链
```
用户输入 → ChatPanel.onSend() → AgentPage.handleSend() → useAgentApi.sendMessage()
```

### 2. API调用
```
POST /agent/plan  // 发送用户消息
GET /agent/       // 获取最新工作流
```

### 3. 数据转换
```
TaskPlanningOutput → AgentPlan → Mermaid字符串
```

### 4. 状态更新
```
setMessages() → setDefinition() → UI重新渲染
```

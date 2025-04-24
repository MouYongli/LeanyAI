# Workflow 编辑器开发计划

## 一、项目目标

构建一个基于 ReactFlow 的可视化工作流编辑器，实现节点的添加、拖拽、连接、配置及持久化功能，支持多种节点类型和可拓展的配置面板。

## 二、开发阶段

1. 环境搭建
   - 安装并配置 ReactFlow、Tailwind CSS
   - 搭建基础页面与路由（`/studio`）

2. 画布容器与基础功能
   - 实现 `WorkflowPanel` 容器
   - 集成 `ReactFlowProvider` 并渲染 `<ReactFlow>`
   - 管理节点（nodes）和连线（edges）状态

3. 节点管理
   - 实现 `Toolbar`：点击按钮添加新节点
   - 实现 `NodeListPanel`：拖拽节点到画布
   - 支持多种节点类型注册（`nodeTypes`）

4. 边与节点交互
   - 实现连线（onConnect）与自动排布
   - 支持删除节点与连线
   - 添加选中高亮与右键菜单（后续）

5. 节点配置面板
   - 根据节点类型显示配置表单
   - 编辑并保存节点 `data` 属性

6. 状态管理与持久化
   - 引入 Zustand 管理全局状态和历史记录（撤销/重做）
   - 实现流程数据的保存与加载接口（后端或 LocalStorage）

7. 高级功能与优化
   - 自定义边样式与节点大小调整
   - 缩放适应视图、实时预览
   - 性能优化与单元测试覆盖

## 三、当前进度

- ✅ 环境搭建：引入 ReactFlow、配置 Tailwind CSS
- ✅ 实现 `WorkflowPanel`：基础画布容器与 ReactFlow 集成
- ✅ 注册单一 `CustomNode` 节点类型并渲染
- ✅ `Toolbar` 组件：点击按钮动态添加节点
- ✅ `NodeListPanel` 组件：拖拽添加 Custom Node
- ✅ 在 `/studio` 页面中集成工作流编辑器，并在 Header 注册 Studio 选项卡

## 四、后续待办 (TODO)

- [ ] 删除节点和连线功能
- [ ] 节点选中高亮及右键菜单操作
- [ ] 多种节点类型扩展与注册示例
- [ ] 开发节点配置面板，编辑并持久化节点属性
- [ ] 引入并整合 Zustand，实现全局状态管理与撤销/重做
- [ ] 接口对接：工作流保存与加载
- [ ] 自定义边类型与样式优化
- [ ] 画布缩放、适应视图功能
- [ ] 单元测试及代码文档补充

## 五、代码结构概要

```text
web/app/components/workflows/
├── index.tsx           # WorkflowPanel：工作流画布主容器，集成 ReactFlow
├── Toolbar.tsx         # 工具栏：添加节点按钮组件
├── NodeListPanel.tsx   # 节点列表侧边栏：拖拽节点到画布
├── nodes/              # 自定义节点组件目录
│   └── index.tsx       # CustomNode：节点视觉组件
├── edges/              # 自定义边组件（待添加）
├── nodeConfig/         # 节点配置面板（待添加）
├── store/              # 状态管理（待添加：Zustand store）
└── README.md           # 本文档：开发计划、进度及结构概要
```

```text

├── components
│   ├── workflow-children.tsx
│   ├── workflow-header
│   │   ├── chat-variable-trigger.tsx
│   │   ├── features-trigger.tsx
│   │   └── index.tsx
│   ├── workflow-main.tsx
│   └── workflow-panel.tsx
├── hooks
│   ├── index.ts
│   ├── use-is-chat-mode.ts
│   ├── use-nodes-sync-draft.ts
│   ├── use-workflow-init.ts
│   ├── use-workflow-run.ts
│   ├── use-workflow-start-run.tsx
│   └── use-workflow-template.ts
├── index.tsx
└── store
    └── workflow
        └── workflow-slice.ts
```text

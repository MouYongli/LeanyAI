https://reactflow.dev/

好的，我们来分析一下 Dify（特别是 `web` 前端部分）代码库中与 Workflow UI 相关部分，以及如何将这部分功能迁移到你的项目中。

Dify 的 Workflow UI 主要基于强大的 `reactflow` 库构建，并结合了 `zustand` 进行状态管理，以及 `tailwindcss` 进行样式设计。

**核心相关代码模块/组件：**

1.  **`reactflow` 的集成与配置 (`web/app/components/workflow/`)**:
    * **`Panel.tsx`**: 这通常是 Workflow 画布的主容器。它会初始化 `ReactFlowProvider`，设置 `reactflow` 实例，并渲染核心的 `<ReactFlow>` 组件。这里会传入 `nodes`, `edges`, `nodeTypes`, `edgeTypes`, `onNodesChange`, `onEdgesChange`, `onConnect` 等关键属性和回调函数。
    * **`NodesWrap.tsx`**: 可能用于包裹和管理所有节点渲染逻辑。
    * **`NodeResizer.tsx`**: 用于实现节点大小调整的功能。
    * **`Operator.tsx`**: 可能包含画布的操作控件，如放大、缩小、适应视图、撤销/重做等。

2.  **自定义节点 (`web/app/components/workflow/nodes/`)**:
    * 这是 Workflow 的核心视觉元素。Dify 为每种类型的操作（如 Start, LLM, Knowledge Retrieval, Code, Answer 等）都定义了自定义的 React 组件。
    * **`node/index.tsx` (或类似结构)**: 通常会有一个基础节点组件 (`BaseNode.tsx` 或直接在各节点内实现)，包含通用逻辑（如选中状态、拖拽句柄、端口等）。
    * **具体节点组件 (例如 `StartNode.tsx`, `LLMNode.tsx`, `AnswerNode.tsx` 等)**: 每个文件定义了一个特定类型节点的外观和基本交互。它们接收来自 `reactflow` 的 `data` prop，其中包含节点的配置信息，并据此渲染 UI。
    * **节点注册**: 在 `Panel.tsx` 或其父组件中，会定义一个 `nodeTypes` 对象，将节点类型字符串（如 'start', 'llm'）映射到对应的 React 组件。

3.  **自定义边 (`web/app/components/workflow/edges/`)**:
    * **`CustomEdge.tsx`**: 定义节点之间连接线的样式和行为。Dify 可能使用了自定义边来添加交互，如删除按钮或特定样式。
    * **边的注册**: 类似 `nodeTypes`，会在 `Panel.tsx` 或其父组件中定义 `edgeTypes` 对象。

4.  **节点配置面板 (`web/app/components/workflow/nodes/*/panel.tsx` 或 `web/app/components/workflow/node-panel/`)**:
    * 当用户选中一个节点时，通常会显示一个侧边栏或弹出窗口，让用户配置该节点的具体参数。
    * **`ConfigPanel.tsx` / `NodeDetailPanel.tsx` (或类似)**: 这是一个容器组件，根据当前选中的节点类型，动态加载并显示对应的配置表单。
    * **具体节点的配置组件 (例如 `LLMNode/panel.tsx`, `CodeNode/panel.tsx`)**: 每个节点类型有其专属的配置表单组件，用于编辑该节点的 `data` 属性。这些组件通常包含各种表单输入元素。

5.  **状态管理 (`web/app/components/workflow/store/`)**:
    * Dify 使用 `zustand` 来管理 Workflow 的状态，包括节点列表、边列表、视口状态、当前选中的节点/边、节点配置数据等。
    * **`workflowStore.ts` (或类似)**: 定义了 store 的结构 (state) 和更新逻辑 (actions)。这里会包含添加/删除节点/边、更新节点数据、处理连接、撤销/重做等核心逻辑。
    * React 组件通过调用 store 提供的 hooks (如 `useWorkflowStore(...)`) 来访问状态和触发更新。`onNodesChange`, `onEdgesChange`, `onConnect` 这些来自 `reactflow` 的回调通常会调用 store 中的 action 来更新状态。

6.  **工具栏/节点添加 (`web/app/components/workflow/tools/` 或 `web/app/components/workflow/nodes-panel/`)**:
    * **`ToolSelector.tsx` / `NodesPanel.tsx`**: 提供一个列表或菜单，让用户可以选择并拖拽新的节点类型到画布上。
    * **添加节点逻辑**: 拖拽结束或点击添加时，会调用 `zustand` store 中的 action 来创建新节点并更新状态。

**代码结构概要：**

```
web/app/components/workflow/
├── index.tsx           # 可能的主入口或导出文件
├── Panel.tsx           # Workflow 画布核心容器 (集成 ReactFlow)
├── Operator.tsx        # 画布操作控件 (Zoom, FitView etc.)
├── NodesWrap.tsx       # 节点渲染的管理包裹层
├── NodeResizer.tsx     # 节点大小调整组件
├── constants.ts        # 工作流相关的常量
├── types.ts            # TypeScript 类型定义
│
├── nodes/              # 自定义节点组件
│   ├── index.tsx       # 导出所有节点或基础节点逻辑
│   ├── utils.ts        # 节点相关的工具函数
│   ├── types.ts        # 节点相关的类型
│   ├── BaseNode.tsx    # (可能存在) 基础节点抽象
│   ├── StartNode/
│   │   ├── node.tsx    # Start 节点的视觉组件
│   │   └── panel.tsx   # Start 节点的配置面板组件
│   ├── LLMNode/
│   │   ├── node.tsx
│   │   └── panel.tsx
│   ├── CodeNode/
│   │   ├── node.tsx
│   │   └── panel.tsx
│   └── ... (其他节点类型)
│
├── edges/              # 自定义边组件
│   └── CustomEdge.tsx
│
├── node-panel/         # 节点配置面板容器
│   └── index.tsx       # 根据选中节点动态加载配置表单
│
├── store/              # Zustand 状态管理
│   ├── index.ts
│   ├── node.ts         # (可能拆分) 节点相关的 state 和 actions
│   ├── edge.ts         # (可能拆分) 边相关的 state 和 actions
│   └── workflow.ts     # (可能拆分) 整体工作流的 state 和 actions
│
└── tools/              # 工具栏/节点选择器
    └── index.tsx
```

*(注意：以上结构是根据 Dify 的功能和通用实践推测的，实际文件名和层级可能略有不同，你需要实际查看 Dify 的 `web` 目录来确认。)*

**迁移到你的项目中的步骤：**

1.  **安装依赖**:
    * 确保你的项目是基于 React 的。
    * 安装核心依赖：`reactflow`, `zustand`。
    * 安装 Dify 使用的 UI 库和样式方案：很可能是 `tailwindcss`，以及可能的组件库（如 `@radix-ui/react-*`, `shadcn/ui` 等）。检查 Dify `web/package.json` 获取完整列表。
    * 安装其他辅助库，如 `classnames` 或 `clsx` (用于条件样式), 图标库等。

2.  **复制核心组件**:
    * **识别范围**: 仔细研究 Dify `web/app/components/workflow/` 目录下的代码。确定你需要哪些组件。至少需要 `Panel.tsx` (或类似的核心画布组件)、`nodes/` 目录下的所有节点组件（或你需要的子集）、`edges/` 目录下的边组件、`store/` 目录下的状态管理逻辑、以及 `node-panel/` (或节点内部的 `panel.tsx`) 配置面板组件。
    * **复制代码**: 将识别出的相关 `.tsx`, `.ts`, `.css` (如果是 Tailwind，主要是 `className`) 文件和目录结构复制到你的项目中的合适位置（例如 `src/components/workflow/`）。

3.  **整合状态管理**:
    * 将 Dify 的 `zustand` store (`store/` 目录) 复制过来。
    * 在你的应用入口或 Workflow 组件的顶层，确保 store 被正确初始化和提供（如果需要全局访问）。
    * 检查 store 中的 action 是否依赖 Dify 特定的 API 调用或全局状态，如果是，你需要移除或替换这些依赖。

4.  **处理样式**:
    * **Tailwind CSS**: 如果你的项目还没有使用 Tailwind CSS，你需要按照 Tailwind 的文档进行安装和配置 (`tailwind.config.js`, `postcss.config.js`, 全局 CSS 引入)。确保 Dify 使用的 Tailwind 插件（如果有）和自定义配置也被迁移过来。
    * **CSS Modules/Styled Components**: 如果 Dify 使用了其他 CSS 方案（可能性较小），你需要相应地迁移。
    * **复制类名**: 大量的样式是通过 `className` 应用的，直接复制过来即可（前提是 Tailwind 配置正确）。

5.  **调整导入路径**:
    * 复制过来的代码文件中的 `import` 语句需要更新，以指向它们在你项目中的新位置。仔细检查并修复所有相对和绝对导入路径。

6.  **处理数据和 API 调用**:
    * **关键点**: Dify 的 Workflow UI 组件与它的后端 API 紧密耦合，用于加载、保存 Workflow 定义，获取知识库列表，执行调试等。
    * **剥离**: 你需要仔细检查代码，特别是 `store/` 中的 action 和配置面板组件 (`panel.tsx`)，找到所有 Dify 特定的 API 调用 (`Workspace` 或封装的 service 调用)。
    * **替换**: 将这些 API 调用替换为你自己项目的后端接口调用或本地数据处理逻辑。例如，加载 Workflow 数据需要从你的数据源获取，保存时需要调用你的保存接口。节点配置中涉及的动态数据（如模型列表、知识库列表）也需要从你的后端获取。

7.  **定制化**:
    * **移除不需要的节点**: 如果你不需要 Dify 的所有节点类型，可以删除对应的节点组件 (`nodes/NodeType/`) 和其在 `nodeTypes` 中的注册。
    * **修改节点/面板**: 根据你的业务需求修改节点的外观、行为和配置项。
    * **调整 UI**: 修改样式、布局、交互以适应你的项目风格。

8.  **测试和调试**:
    * 彻底测试 Workflow 的所有功能：节点拖拽、连接、删除、配置、保存、加载等。
    * 使用浏览器的开发者工具（特别是 React DevTools 和控制台）来调试问题。

**重要考虑和建议：**

* **复杂度**: 这不是一个简单的复制粘贴任务。Dify 的 Workflow 是一个相当复杂的功能模块，深入耦合了其前端架构和后端 API。你需要有扎实的 React, TypeScript, React Flow, Zustand 和 Tailwind CSS 基础。


总之，迁移 Dify 的 Workflow UI 是可行的，但需要细致的代码分析、剥离、替换和集成工作。重点在于理解其基于 `reactflow` 和 `zustand` 的核心架构，并将数据交互部分适配到你自己的项目中。


目前做了以下工作：
- 已集成 ReactFlow 并添加了简单的 CustomNode 节点类型
- 在 `/studio` 路由下创建 Studio 页面，并在 Header 中注册 Studio 选项卡
- 实现了 Toolbar 组件，可通过按钮动态添加节点
- 实现了 NodeListPanel 组件，可拖拽 Custom Node 到画布并在对应坐标生成节点

**待办 (TODO)：**
- 支持删除节点和连线功能
- 为节点添加配置面板（编辑节点 data 属性）
- 支持多种节点类型（注册不同 nodeTypes）
- 实现流程的保存与加载
- 引入并使用 zustand 管理节点/边状态

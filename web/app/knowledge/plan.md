
# Knowledge Tab Layout Design

在 `web/app/knowledge` 下新增“Knowledge”标签页，包含“添加”和“删除”按钮，以及一个文件列表视图，从后端数据库中拉取并展示所有知识文件。

---

## 1. 路径与文件

- `web/app/knowledge/page.tsx`  
  — 主页面入口，包含“Add”和“Delete Selected”按钮及文件列表  
- `web/app/knowledge/FileList.tsx`  
  — 文件列表组件，仅展示文件名  
- `web/app/knowledge/types.ts` (可选)  
  — 类型定义，例如 `KnowledgeFile { id: string; name: string }`

---

## 2. 页面结构

-```
┌─────────────────────────────────────────────┐
│ Header（可选）                              │
├─────────────────────────────────────────────┤
│ [Add] button   [Delete Selected] button     │ （暂不触发弹窗，仅布局）
├─────────────────────────────────────────────┤
│ ┌───────────┐                              │
│ │ FileList │                              │
│ ├───────────┤                              │
│ │ foo.md    │                              │
│ │ bar.md    │                              │
│ └───────────┘                              │
└─────────────────────────────────────────────┘
```

- **Header**：可放置面包屑或页面标题“Knowledge”  
- **工具栏**：  
  - “Add” 按钮，点击后弹出 `AddKnowledgeModal`  
  - “Delete Selected” 按钮，仅在选中至少一个文件时可用，点击后弹出 `DeleteConfirmation`  
- **文件列表** (`FileList`)  
  - 带多选框，支持多选删除  
  - 列：选择框、文件名、创建/更新时间  

---

## 3. 组件设计

1. **FileList**  
   - Props:  
     - `files: KnowledgeFile[]`  
   - 渲染：列表形式，仅展示文件名  
2. **Buttons**  
   - 在 `page.tsx` 放置 `Add` / `Delete Selected` 按钮，暂不绑定弹窗逻辑  

---

## 4. 数据与交互

- 页面 `page.tsx`  
  1. `useEffect` mock 拉取知识列表（静态数组），填充 `files` state  
  2. 本地 state 管理 `files`  
  3. 点击 `Add` / `Delete Selected` 打印日志或占位函数，刷新时重新加载 mock 列表  

---

## 5. 样式与可访问性

- 使用 Tailwind CSS（项目已有）  
- 按钮：`btn-primary`/`btn-danger`  
- Modal 居中、光标聚焦、ESC 关闭  
- 列表可键盘导航  

---

> 下一步：根据此设计创建各组件文件，并在 `page.tsx` 中组合调用。

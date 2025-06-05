# Knowledge Tab Layout Design

在 `web/app/knowledge` 下新增“Knowledge”标签页，包含“添加”和“删除”按钮，以及一个文件列表视图，从后端数据库中拉取并展示所有知识文件。

---

## 1. 路径与文件

- `web/app/knowledge/page.tsx`  
  — 主页面入口，组合布局组件 (layout)，不直接包含业务逻辑
- `web/app/knowledge/types.ts`  
  — 类型定义，例如 `KnowledgeFile { id: string; name: string; selected?: boolean }`
- `web/app/knowledge/components/knowledge/`  
  — 业务逻辑组件 (logic) 与布局组件 (layout) 分离目录
  
  Logic (只包含调用接口、状态管理):  
  - `UploadButton.tsx`  
  - `DeleteButton.tsx`  
  - `useKnowledgeApi.ts` (hooks)  

  Layout (只负责 UI 渲染，不包含 fetch 逻辑):  
  - `FileList.tsx`  
  - `FileListItem.tsx`  

---

## 2. API 接口设计 (TypeScript 接口)
```ts
// web/app/knowledge/types.ts
export interface KnowledgeFile {
  id: string;
  name: string;
  selected?: boolean;
}

// web/app/knowledge/components/knowledge/useKnowledgeApi.ts
export interface KnowledgeApi {
  listFiles(): Promise<KnowledgeFile[]>;
  uploadFiles(files: File[]): Promise<void>;
  deleteFiles(ids: string[]): Promise<void>;
}
```

- GET `/files/` 返回 `{ files: string[] }` 用于 `listFiles`
- POST `/files/upload` 接收 `FormData`，字段 `files`，返回上传结果
- DELETE `/files/` 接收 JSON `{ ids: string[] }`，返回删除结果

---

## 3. 组件设计

1. **FileList**  
   - Props:  
     - `files: KnowledgeFile[]`  
   - 渲染：列表形式，仅展示文件名  
2. **Buttons**  
   - 在 `page.tsx` 放置 `Add` / `Delete Selected` 按钮，暂不绑定弹窗逻辑  

### Logic 组件 (web/app/knowledge/components/knowledge)

- **useKnowledgeApi.ts**  
  Hook 封装所有 HTTP 调用，返回上文定义的 `KnowledgeApi` 方法

- **UploadButton.tsx**  
  Props:
  ```ts
  interface UploadButtonProps {
    api: KnowledgeApi;
    onUploaded?: () => void;
  }
  ```
  逻辑：打开文件选择、上传、完成后调用 `onUploaded`

- **DeleteButton.tsx**  
  Props:
  ```ts
  interface DeleteButtonProps {
    api: KnowledgeApi;
    selectedIds: string[];
    onDeleted?: () => void;
  }
  ```
  逻辑：确认后调用 `deleteFiles(selectedIds)`，完成后调用 `onDeleted`

### Layout 组件 (web/app/knowledge/components/knowledge)

- **FileList.tsx**  
  Props:
  ```ts
  interface FileListProps {
    files: KnowledgeFile[];
    onToggleSelect(id: string): void;
  }
  ```
  渲染列表，遍历调用 `FileListItem`

- **FileListItem.tsx**  
  Props:
  ```ts
  interface FileListItemProps {
    file: KnowledgeFile;
    onToggle(): void;
  }
  ```
  渲染复选框 + 文件名

---

## 4. 页面布局 (`page.tsx`)

- 引入并使用 Logic 组件和 Layout 组件：
  ```tsx
  const api = useKnowledgeApi();
  const [files, setFiles] = useState<KnowledgeFile[]>([]);
  
  // load, upload, delete 调用 api 后刷新列表
  // ...existing code...
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Knowledge</h1>
      <div className="flex space-x-2 mb-4">
        <UploadButton api={api} onUploaded={loadFiles} />
        <DeleteButton api={api} selectedIds={files.filter(f=>f.selected).map(f=>f.id)} onDeleted={loadFiles} />
      </div>
      <FileList files={files} onToggleSelect={...} />
    </div>
  );
  ```



uplodad button 需要弹窗，然后用户选择文件后上传。
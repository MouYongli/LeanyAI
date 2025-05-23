"use client";
import React, { useState, useEffect } from 'react';
import FileList from './FileList';
import type { KnowledgeFile } from './types';

// 常量 mockData 可移除，使用真实接口分发数据

export default function KnowledgePage() {
  const [files, setFiles] = useState<KnowledgeFile[]>([]);

  const loadFiles = async () => {
    try {
      // 调用 FastAPI 后端获取文件列表
      const res = await fetch('http://localhost:8302/files/');
      const data = await res.json();
      // data.files 是 string[]
      const list: KnowledgeFile[] = (data.files || []).map((name: string) => ({ id: name, name }));
      setFiles(list);
    } catch (err) {
      console.error('Failed to fetch files', err);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Knowledge</h1>
      <div className="flex space-x-2 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            console.log('Add clicked');
            loadFiles();
          }}
        >
          Add
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            console.log('Delete Selected clicked');
            loadFiles();
          }}
        >
          Delete Selected
        </button>
      </div>
      <FileList files={files} />
    </div>
  );
}

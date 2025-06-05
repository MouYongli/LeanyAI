"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Stack } from '@mui/material';
import FileList from './FileList';
import type { KnowledgeFile } from './types';
import { useKnowledgeApi } from './components/knowledge/useKnowledgeApi';
import UploadButton from './components/knowledge/UploadButton';
import DeleteButton from './components/knowledge/DeleteButton';

export default function KnowledgePage() {
  const [files, setFiles] = useState<KnowledgeFile[]>([]);
  const api = useKnowledgeApi();

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
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Knowledge
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <UploadButton api={api} onUploaded={loadFiles} />
        <DeleteButton api={api} selectedIds={[]} onDeleted={loadFiles} />
      </Stack>
      <FileList files={files} />
    </Container>
  );
}

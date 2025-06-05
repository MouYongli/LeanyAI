"use client";
import React from 'react';
import type { KnowledgeFile } from './types';
import { List, ListItem, ListItemText } from '@mui/material';

interface FileListProps {
  files: KnowledgeFile[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <List>
      {files.map((file) => (
        <ListItem key={file.id} disableGutters>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;

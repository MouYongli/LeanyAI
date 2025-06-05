"use client";
import React from 'react';
import type { KnowledgeFile } from '../../types';

export interface FileListItemProps {
  file: KnowledgeFile;
  onToggle: () => void;
}

const FileListItem: React.FC<FileListItemProps> = ({ file, onToggle }) => {
  return (
    <li className="py-1 flex items-center">
      <input
        type="checkbox"
        className="mr-2"
        checked={file.selected || false}
        onChange={onToggle}
      />
      <span>{file.name}</span>
    </li>
  );
};

export default FileListItem;

"use client";
import React from 'react';
import type { KnowledgeFile } from './types';

interface FileListProps {
  files: KnowledgeFile[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <ul className="list-disc pl-5">
      {files.map((file) => (
        <li key={file.id} className="py-1">
          {file.name}
        </li>
      ))}
    </ul>
  );
};

export default FileList;

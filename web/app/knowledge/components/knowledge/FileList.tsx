import React from "react";
import type { KnowledgeFile } from "../../types";
import FileListItem from "./FileListItem";

interface FileListProps {
  files: KnowledgeFile[];
  onToggleSelect(id: string): void;
}

const FileList: React.FC<FileListProps> = ({ files, onToggleSelect }) => {
  return (
    <ul className="list-disc pl-5">
      {files.map((file) => (
        <FileListItem
          key={file.id}
          file={file}
          onToggle={() => onToggleSelect(file.id)}
        />
      ))}
    </ul>
  );
};

export default FileList;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions */
"use client";
import React, { useState } from 'react';
import type { KnowledgeFile } from '../../types';
import UploadModal from './UploadModal';
import Button from '@mui/material/Button';

export interface UploadButtonProps {
  api: any; // TODO: replace with KnowledgeApi
  onUploaded?: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ api, onUploaded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleUpload = async (files: File[]) => {
    await api.uploadFiles(files);
    onUploaded && onUploaded();
    setIsOpen(false);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setIsOpen(true)}>
        Upload
      </Button>
      <UploadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onUpload={handleUpload}
      />
    </>
  );
};

export default UploadButton;

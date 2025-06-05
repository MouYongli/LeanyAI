"use client";

import React, { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Upload Files</h2>
        <input
          type="file"
          multiple
          onChange={(e) => setSelectedFiles(e.target.files)}
          className="mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!selectedFiles || selectedFiles.length === 0}
            onClick={() => {
              if (selectedFiles) onUpload(Array.from(selectedFiles));
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

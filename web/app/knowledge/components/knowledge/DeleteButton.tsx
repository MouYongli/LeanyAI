/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import type { KnowledgeFile } from '../../types';

export interface DeleteButtonProps {
  api: any; // TODO: replace with KnowledgeApi
  selectedIds: string[];
  onDeleted?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ api, selectedIds, onDeleted }) => {
  return (
    <button className="btn btn-danger px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all">
      Delete Selected
    </button>
  );
};

export default DeleteButton;

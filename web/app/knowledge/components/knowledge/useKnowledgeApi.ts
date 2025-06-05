"use client";

import type { KnowledgeFile } from '../../types';

export function useKnowledgeApi() {
  return {
    listFiles: async (): Promise<KnowledgeFile[]> => {
      return [];
    },
    uploadFiles: async (files: File[]): Promise<void> => {
      console.log('uploadFiles called', files);
    },
    deleteFiles: async (ids: string[]): Promise<void> => {
      console.log('deleteFiles called', ids);
    }
  };
}

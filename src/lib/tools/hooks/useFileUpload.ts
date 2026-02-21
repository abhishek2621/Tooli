"use client";

import { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { validateFiles, FILE_LIMITS } from "@/lib/validation";
import { toast } from "@/lib/toast";
import { FileItem } from "../core/types";

type FileType = "pdf" | "image" | "text";

interface UseFileUploadOptions {
  fileType: FileType;
  maxFiles?: number;
  onFilesAdded?: (files: FileItem[]) => void;
}

export function useFileUpload(options: UseFileUploadOptions) {
  const { fileType, maxFiles = 20, onFilesAdded } = options;
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      for (const rejection of rejectedFiles) {
        const errorMsg = rejection.errors[0]?.message || "File rejected";
        toast.error(rejection.file.name, { description: errorMsg });
      }

      const validation = validateFiles(acceptedFiles, fileType, maxFiles);

      if (validation.errors.length > 0) {
        validation.errors.forEach((err: string) => {
          toast.error("File validation failed", { description: err });
        });
      }

      if (validation.validFiles.length > 0) {
        const newFiles: FileItem[] = validation.validFiles.map((file) => ({
          id: Math.random().toString(36).substring(7),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        }));

        setFiles((prev) => [...prev, ...newFiles]);
        onFilesAdded?.(newFiles);
      }
    },
    [fileType, maxFiles, onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxFiles,
    accept: getAcceptForType(fileType),
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const validation = validateFiles(newFiles, fileType, maxFiles);

      if (validation.errors.length > 0) {
        validation.errors.forEach((err: string) => {
          toast.error("File validation failed", { description: err });
        });
      }

      if (validation.validFiles.length > 0) {
        const fileItems: FileItem[] = validation.validFiles.map((file) => ({
          id: Math.random().toString(36).substring(7),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        }));

        setFiles((prev) => [...prev, ...fileItems]);
        onFilesAdded?.(fileItems);
      }
    },
    [fileType, maxFiles, onFilesAdded]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    isDragging: isDragActive,
    getRootProps,
    getInputProps,
  };
}

function getAcceptForType(fileType: FileType): Record<string, string[]> {
  switch (fileType) {
    case "pdf":
      return { "application/pdf": [".pdf"] };
    case "image":
      return {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      };
    case "text":
      return { "text/plain": [".txt"] };
    default:
      return {};
  }
}

"use client";

import { useCallback } from "react";
import { triggerHaptic } from "@/lib/utils";

export function useDownload() {
  const download = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
    triggerHaptic(10);
  }, []);

  const downloadMultiple = useCallback(
    (files: { blob: Blob; name: string }[]) => {
      files.forEach(({ blob, name }) => {
        download(blob, name);
      });
    },
    [download]
  );

  return { download, downloadMultiple };
}

"use client";

import { useCallback, useMemo, useState } from "react";

export function useAttachmentUpload() {
  const [isOpen, setOpen] = useState(false);
  const [stagedUrl, setStagedUrl] = useState<null | string>(null);
  const [isUploading, setUploading] = useState(false);

  const onUploaded = useCallback((url: string) => {
    setStagedUrl(url);
    setUploading(false);
    setOpen(false);
  }, []);

  const Clear = useCallback(() => {
    setStagedUrl(null);
    setUploading(false);
  }, []);

  return useMemo(
    () => ({
      isOpen,
      setOpen,
      onUploaded,
      stagedUrl,
      isUploading,
      Clear,
    }),
    [isOpen, setOpen, onUploaded, stagedUrl, isUploading, Clear]
  );
}

export type useAttachmentUploadType = ReturnType<typeof useAttachmentUpload>;

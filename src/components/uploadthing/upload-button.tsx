"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function LinkIconUploader({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  return (
    <UploadButton<OurFileRouter, "linkIcon">
      endpoint="linkIcon"
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          onUploaded(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        alert(`Erro no upload: ${error.message}`);
      }}
      appearance={{
        button:
          "ut-ready:bg-primary ut-ready:hover:bg-primary/80 ut-uploading:cursor-not-allowed rounded-lg px-4 py-2 text-white",
        container: "flex justify-start",
      }}
    />
  );
}

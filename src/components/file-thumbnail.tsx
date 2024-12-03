import * as React from "react";
import { FileIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface FileThumbnailProps {
  fileName: string;
  className?: string;
}

const FileThumbnail = React.forwardRef<HTMLDivElement, FileThumbnailProps>(
  ({ fileName, className }, ref) => {
    // Extract the file extension from the file name
    const fileExtension = fileName
      .slice(fileName.lastIndexOf(".") + 1)
      .toUpperCase();

    return (
      <div ref={ref} className={cn("relative size-8", className)}>
        <FileIcon className="size-full stroke-1" aria-labelledby="file-name" />
        <div
          className="absolute inset-0 flex justify-center items-center text-[6px] font-black"
          id="file-name"
          aria-hidden
        >
          <span>{fileExtension}</span>
          <span className="sr-only">File</span>
        </div>
      </div>
    );
  }
);
FileThumbnail.displayName = "FileThumbnail";

export { FileThumbnail };

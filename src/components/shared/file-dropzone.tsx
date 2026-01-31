"use client";

import { useDropzone, DropzoneOptions } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps extends DropzoneOptions {
    title?: string;
    description?: string;
    className?: string;
    onDrop: (files: File[]) => void;
}

export function FileDropzone({
    title = "Upload Files",
    description = "Drag & drop or click to select files",
    className,
    onDrop,
    ...props
}: FileDropzoneProps) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        ...props
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-900/30 dark:hover:bg-slate-900/50",
                isDragActive ? "border-primary bg-primary/5" : "border-border",
                className
            )}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <Upload className="h-8 w-8" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        {isDragActive ? "Drop files here" : title}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

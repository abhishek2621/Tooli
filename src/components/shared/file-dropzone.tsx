"use client";

import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { Upload, FileWarning } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateFiles, FILE_LIMITS } from "@/lib/validation";
import { toast } from "@/lib/toast";

interface FileDropzoneProps {
    title?: string;
    description?: string;
    className?: string;
    onDrop: (files: File[]) => void;
    fileType?: "pdf" | "image" | "text";
    maxFiles?: number;
    showLimits?: boolean;
    accept?: DropzoneOptions["accept"];
}

export function FileDropzone({
    title = "Upload Files",
    description = "Drag & drop or click to select files",
    className,
    onDrop,
    fileType = "pdf",
    maxFiles = 20,
    showLimits = true,
    accept,
    ...props
}: FileDropzoneProps) {
    const limits = FILE_LIMITS[fileType.toUpperCase() as keyof typeof FILE_LIMITS];

    const defaultAccept: Record<string, string[]> = (() => {
        switch (fileType) {
            case "pdf":
                return { "application/pdf": [".pdf"] } as Record<string, string[]>;
            case "image":
                return { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] } as Record<string, string[]>;
            case "text":
                return { "text/plain": [".txt"] } as Record<string, string[]>;
            default:
                return {} as Record<string, string[]>;
        }
    })();

    const handleDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        for (const rejection of rejectedFiles) {
            const errorMsg = rejection.errors[0]?.message || "File rejected";
            toast.error(rejection.file.name, {
                description: errorMsg,
            });
        }
        
        const validation = validateFiles(acceptedFiles, fileType, maxFiles);
        
        if (validation.errors.length > 0) {
            validation.errors.forEach((err: string) => {
                toast.error("File validation failed", { description: err });
            });
        }
        
        if (validation.validFiles.length > 0) {
            onDrop(validation.validFiles);
        }
    };

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop: handleDrop,
        maxFiles,
        accept: accept || defaultAccept,
        ...props,
    } as DropzoneOptions);

    return (
        <div
            {...getRootProps()}
            className={cn(
                "min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-900/30 dark:hover:bg-slate-900/50",
                isDragActive && !isDragReject && "border-primary bg-primary/5",
                isDragReject && "border-destructive bg-destructive/5",
                !isDragActive && "border-border",
                className
            )}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
                <div className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center mb-2",
                    isDragReject ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                )}>
                    {isDragReject ? (
                        <FileWarning className="h-8 w-8" />
                    ) : (
                        <Upload className="h-8 w-8" />
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        {isDragActive ? (isDragReject ? "Invalid file type" : "Drop files here") : title}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                        {description}
                    </p>
                    {showLimits && (
                        <p className="text-xs text-muted-foreground mt-2">
                            Max {limits.maxSizeMB}MB per file • {maxFiles} files max
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export { validateFiles, FILE_LIMITS } from "@/lib/validation";

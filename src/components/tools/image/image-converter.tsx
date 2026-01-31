"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    Upload,
    Image as ImageIcon,
    X,
    Download,
    RefreshCcw,
    Check,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ImageFile {
    file: File;
    id: string;
    preview: string;
    targetFormat: "png" | "jpeg" | "webp";
    status: "idle" | "converting" | "done" | "error";
    convertedUrl?: string;
}

export function ImageConverter() {
    const [files, setFiles] = useState<ImageFile[]>([]);
    const [globalFormat, setGlobalFormat] = useState<"png" | "jpeg" | "webp">("png");

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => ({
            file,
            id: Math.random().toString(36).substring(7),
            preview: URL.createObjectURL(file),
            targetFormat: globalFormat,
            status: "idle" as const
        }));
        setFiles(prev => [...prev, ...newFiles]);
    }, [globalFormat]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
            'image/gif': [],
            'image/bmp': []
        }
    });

    const removeFile = (id: string) => {
        setFiles(prev => {
            const newFiles = prev.filter(f => f.id !== id);
            // Cleanup previews to avoid memory leaks
            const fileToRemove = prev.find(f => f.id === id);
            if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
            return newFiles;
        });
    };

    const convertSingleFile = async (id: string) => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, status: "converting" } : f));

        const fileObj = files.find(f => f.id === id);
        if (!fileObj) return;

        try {
            const img = new Image();
            img.src = fileObj.preview;
            await new Promise((resolve) => { img.onload = resolve; });

            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (!ctx) throw new Error("Could not get canvas context");

            // Handle transparency for JPEG
            if (fileObj.targetFormat === "jpeg") {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            const mimeType = `image/${fileObj.targetFormat}`;
            const dataUrl = canvas.toDataURL(mimeType, 0.9);

            setFiles(prev => prev.map(f => f.id === id ? {
                ...f,
                status: "done",
                convertedUrl: dataUrl
            } : f));

        } catch (err) {
            console.error(err);
            setFiles(prev => prev.map(f => f.id === id ? { ...f, status: "error" } : f));
        }
    };

    const convertAll = () => {
        files.forEach(f => {
            if (f.status === "idle") convertSingleFile(f.id);
        });
    };

    const downloadFile = (file: ImageFile) => {
        if (!file.convertedUrl) return;

        const link = document.createElement("a");
        link.href = file.convertedUrl;
        const nameWithoutExt = file.file.name.substring(0, file.file.name.lastIndexOf('.'));
        link.download = `${nameWithoutExt}.${file.targetFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Upload Area */}
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-900/30 dark:hover:bg-slate-900/50",
                    isDragActive ? "border-primary bg-primary/5" : "border-border"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100/80 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-2">
                        <Upload className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">
                            {isDragActive ? "Drop images here" : "Choose Images"}
                        </h3>
                        <p className="text-muted-foreground">
                            Convert JPG, PNG, WEBP, and more
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            {files.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">Convert all to:</span>
                        <Select
                            value={globalFormat}
                            onValueChange={(v: any) => {
                                setGlobalFormat(v);
                                setFiles(prev => prev.map(f => f.status === "idle" ? { ...f, targetFormat: v } : f));
                            }}
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="png">PNG</SelectItem>
                                <SelectItem value="jpeg">JPG</SelectItem>
                                <SelectItem value="webp">WEBP</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={convertAll} size="lg" className="w-full sm:w-auto">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Convert All
                    </Button>
                </div>
            )}

            {/* File List */}
            <div className="space-y-4">
                {files.map(file => (
                    <Card key={file.id} className="overflow-hidden">
                        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-6">
                            {/* Preview */}
                            <div className="h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border">
                                <img src={file.preview} alt="" className="h-full w-full object-cover" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                                <p className="font-medium truncate" title={file.file.name}>
                                    {file.file.name}
                                </p>
                                <div className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                                    <Badge variant="outline" className="uppercase font-normal">{file.file.name.split('.').pop()}</Badge>
                                    <ArrowRight className="h-3 w-3" />
                                    <Select
                                        value={file.targetFormat}
                                        onValueChange={(v: any) => {
                                            if (file.status === "idle") {
                                                setFiles(prev => prev.map(f => f.id === file.id ? { ...f, targetFormat: v } : f));
                                            }
                                        }}
                                        disabled={file.status !== "idle"}
                                    >
                                        <SelectTrigger className="h-7 w-[90px] text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="png">PNG</SelectItem>
                                            <SelectItem value="jpeg">JPG</SelectItem>
                                            <SelectItem value="webp">WEBP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                {file.status === "idle" && (
                                    <>
                                        <Button size="sm" onClick={() => convertSingleFile(file.id)}>
                                            Convert
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                                {file.status === "converting" && (
                                    <Button disabled size="sm" variant="secondary">
                                        <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                                        Processing
                                    </Button>
                                )}
                                {file.status === "done" && (
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => downloadFile(file)}>
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                {file.status === "error" && (
                                    <div className="flex items-center gap-2 text-red-500">
                                        <span className="text-sm font-medium">Error</span>
                                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center text-sm text-muted-foreground pt-8">
                <p>Files are processed securely in your browser.</p>
            </div>
        </div>
    );
}

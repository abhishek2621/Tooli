"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import {
    Upload,
    FileText,
    X,
    MoveLeft,
    MoveRight,
    Download,
    Settings2,
    RotateCcw,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn, triggerHaptic } from "@/lib/utils";
import { toast } from "@/lib/toast";

interface PdfFile {
    file: File;
    id: string;
    pageCount?: number;
    error?: string;
}

function formatPdfError(error: string): string {
    const lower = error.toLowerCase();
    if (lower.includes("encrypt") || lower.includes("password")) {
        return "One of the files is password protected.";
    }
    if (lower.includes("corrupt") || lower.includes("invalid")) {
        return "One of the files appears to be corrupted.";
    }
    if (lower.includes("size") || lower.includes("memory")) {
        return "Files are too large. Try merging fewer files.";
    }
    return "Please try again with different files.";
}

export function PdfMerger() {
    const [files, setFiles] = useState<PdfFile[]>([]);
    const [isMerging, setIsMerging] = useState(false);
    const [filename, setFilename] = useState("merged-document");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const workerRef = useRef<Worker | null>(null);
    const retryCountRef = useRef(0);
    const MAX_RETRIES = 2;

    const triggerMerge = useCallback(async () => {
        if (files.length < 2 || !workerRef.current) return;
        setIsMerging(true);
        setProgress(0);
        setError(null);

        try {
            const BATCH_SIZE = 4;
            const fileBuffers: ArrayBuffer[] = [];

            for (let i = 0; i < files.length; i += BATCH_SIZE) {
                const batch = files.slice(i, i + BATCH_SIZE);
                const batchBuffers = await Promise.all(batch.map(f => f.file.arrayBuffer()));
                fileBuffers.push(...batchBuffers);
            }

            workerRef.current.postMessage({
                type: 'MERGE',
                files: fileBuffers
            }, fileBuffers);
        } catch (error) {
            console.error("Merge setup failed", error);
            setError("Failed to prepare files for merging.");
            setIsMerging(false);
        }
    }, [files]);

    useEffect(() => {
        workerRef.current = new Worker(new URL('@/workers/pdf-merger.worker.ts', import.meta.url));

        workerRef.current.onmessage = (e) => {
            const { type, progress, data, message, error: workerError } = e.data;

            if (type === 'STATUS') {
                setProgress(progress);
            } else if (type === 'DONE') {
                triggerHaptic([50, 30, 50]);
                toast.success("PDF merged successfully!", {
                    description: "Your file is ready to download."
                });
                const blob = new Blob([data], { type: 'application/pdf' });
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `${filename}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);

                setIsMerging(false);
                setProgress(0);
                setError(null);
                retryCountRef.current = 0;
            } else if (type === 'ERROR') {
                console.error("Merge Worker Error:", message || workerError);

                const errorMessage = message || workerError || "Unknown error";

                if (retryCountRef.current < MAX_RETRIES) {
                    retryCountRef.current += 1;
                    toast.warning("Retrying merge...", {
                        description: `Attempt ${retryCountRef.current}/${MAX_RETRIES}`
                    });

                    setTimeout(() => {
                        if (files.length >= 2 && workerRef.current) {
                            triggerMerge();
                        }
                    }, 1000);
                } else {
                    setError(errorMessage);
                    toast.error("Failed to merge PDFs", {
                        description: formatPdfError(errorMessage)
                    });
                    setIsMerging(false);
                    retryCountRef.current = 0;
                }
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, [filename, files, triggerMerge]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // We load pdf-lib only to get page count if needed, or we can skip it to save bundle
        // For now, let's skip page count to keep main thread light, or move it to a small utility worker if critical.
        // Or better: just show file size.

        for (const file of acceptedFiles) {
            setFiles(prev => [...prev, {
                file,
                id: Math.random().toString(36).substring(7),
                pageCount: undefined // Optimizing bundle: removed lazy page count check on main thread
            }]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        }
    });

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const moveFile = (index: number, direction: 'left' | 'right') => {
        if (direction === 'left' && index === 0) return;
        if (direction === 'right' && index === files.length - 1) return;

        setFiles(prev => {
            const newFiles = [...prev];
            const targetIndex = direction === 'left' ? index - 1 : index + 1;
            [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
            return newFiles;
        });
    };

    const mergePdfs = async () => {
        retryCountRef.current = 0;
        triggerMerge();
    };

    const handleRetry = () => {
        retryCountRef.current = 0;
        triggerMerge();
    };

    const resetTool = () => {
        setFiles([]);
        setError(null);
        setProgress(0);
        setIsMerging(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Upload & Grid */}
            <div className="lg:col-span-2 space-y-6">
                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-900/30 dark:hover:bg-slate-900/50",
                        isDragActive ? "border-primary bg-primary/5" : "border-border"
                    )}
                    role="button"
                    aria-label="Upload PDF files dropzone"
                    tabIndex={0}
                >
                    <input {...getInputProps()} aria-label="Upload PDF files input" />
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-red-100/80 dark:bg-red-900/20 flex items-center justify-center text-red-600 mb-2">
                            <Upload className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">
                                {isDragActive ? "Drop PDFs here" : "Add PDF Files"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Combine multiple PDF documents
                            </p>
                        </div>
                    </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {files.map((pdf, index) => (
                            <div key={pdf.id} className="relative group bg-card border rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
                                <div className="h-12 w-12 rounded bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 shrink-0">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate text-sm" title={pdf.file.name}>{pdf.file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {(pdf.file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-muted-foreground"
                                        onClick={() => moveFile(index, 'left')}
                                        disabled={index === 0}
                                    >
                                        <MoveLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-muted-foreground"
                                        onClick={() => moveFile(index, 'right')}
                                        disabled={index === files.length - 1}
                                    >
                                        <MoveRight className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={() => removeFile(pdf.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="absolute top-2 left-2 flex items-center justify-center h-5 w-5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Col: Settings */}
            <div className="space-y-6">
                <Card className="sticky top-24">
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b">
                            <Settings2 className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Merge Settings</h3>
                        </div>

                        {/* Filename */}
                        <div className="space-y-2">
                            <Label htmlFor="filename">Output Filename</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="filename"
                                    value={filename}
                                    onChange={(e) => setFilename(e.target.value)}
                                />
                                <span className="text-sm text-muted-foreground">.pdf</span>
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border">
                                <p>Total Files: <span className="font-medium text-foreground">{files.length}</span></p>
                            </div>
                        )}

                        <div className="pt-6 border-t">
                            {isMerging && (
                                <div className="mb-4 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span>Merging files...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {error && !isMerging && (
                                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                    <div className="flex items-start gap-2 text-sm text-destructive">
                                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                </div>
                            )}

                            {error ? (
                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1 h-12 text-base"
                                        onClick={handleRetry}
                                    >
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Try Again
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-12"
                                        onClick={resetTool}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    className="w-full h-12 text-base shadow-lg shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white"
                                    onClick={mergePdfs}
                                    disabled={isMerging || files.length < 2}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    {isMerging ? "Merging..." : "Merge Files"}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

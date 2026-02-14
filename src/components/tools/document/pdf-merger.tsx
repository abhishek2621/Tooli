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
    Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn, triggerHaptic } from "@/lib/utils";

interface PdfFile {
    file: File;
    id: string;
    pageCount?: number;
}

export function PdfMerger() {
    const [files, setFiles] = useState<PdfFile[]>([]);
    const [isMerging, setIsMerging] = useState(false);
    const [filename, setFilename] = useState("merged-document");
    const [progress, setProgress] = useState(0);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        workerRef.current = new Worker(new URL('@/workers/pdf-merger.worker.ts', import.meta.url));

        workerRef.current.onmessage = (e) => {
            const { type, progress, data, message, error } = e.data;

            if (type === 'STATUS') {
                setProgress(progress);
            } else if (type === 'DONE') {
                triggerHaptic([50, 30, 50]);
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
            } else if (type === 'ERROR') {
                console.error("Merge Worker Error:", message || error);
                alert("Failed to merge PDFs. One of the files might be encrypted or corrupted.");
                setIsMerging(false);
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, [filename]);

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
        if (files.length < 2 || !workerRef.current) return;
        setIsMerging(true);
        setProgress(0);

        try {
            const fileBuffers = await Promise.all(files.map(async (f) => {
                return await f.file.arrayBuffer();
            }));

            workerRef.current.postMessage({
                type: 'MERGE',
                files: fileBuffers
            }, fileBuffers); // Transfer buffers
        } catch (error) {
            console.error("Merge setup failed", error);
            setIsMerging(false);
        }
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
                            <Button
                                className="w-full h-12 text-base shadow-lg shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white"
                                onClick={mergePdfs}
                                disabled={isMerging || files.length < 2}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isMerging ? "Merging..." : "Merge Files"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

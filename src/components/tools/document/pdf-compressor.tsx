"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import {
    Download,
    X,
    Loader2,
    ArrowRight,
    Settings2,
    FileText,
    Minimize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, triggerHaptic } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { filesize } from "filesize";

type CompressionLevel = "low" | "medium" | "high" | "extreme";

interface PdfFile {
    id: string;
    originalFile: File;
    compressedPdf: Uint8Array | null;
    status: "pending" | "compressing" | "done" | "error";
    progress: number;
    originalSize: number;
    newSize: number;
    message: string;
}

export function PdfCompressor() {
    const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
    const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium");
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // Initialize worker
        workerRef.current = new Worker(new URL('@/workers/pdf-compressor.worker.ts', import.meta.url));

        workerRef.current.onmessage = (event) => {
            const { type, data, progress, message } = event.data;

            if (type === 'PROGRESS') {
                setPdfFile(prev => prev ? { ...prev, progress, message } : null);
            } else if (type === 'DONE') {
                setPdfFile(prev => prev ? {
                    ...prev,
                    compressedPdf: data,
                    newSize: data.byteLength,
                    status: "done",
                    progress: 100,
                    message: "Done!"
                } : null);
                triggerHaptic([50, 30, 50]);
            } else if (type === 'ERROR') {
                console.error("Worker error:", message);
                setPdfFile(prev => prev ? {
                    ...prev,
                    status: "error",
                    message: "Compression failed. File might be corrupted."
                } : null);
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setPdfFile({
                id: Math.random().toString(36).substring(7),
                originalFile: file,
                compressedPdf: null,
                status: "pending",
                progress: 0,
                originalSize: file.size,
                newSize: 0,
                message: "Ready to compress"
            });
        }
    }, []);

    const compressPdf = async () => {
        if (!pdfFile || !workerRef.current) return;

        setPdfFile(prev => prev ? { ...prev, status: "compressing", progress: 0, message: "Initializing..." } : null);

        try {
            const arrayBuffer = await pdfFile.originalFile.arrayBuffer();
            workerRef.current.postMessage({
                type: 'COMPRESS',
                file: arrayBuffer,
                level: compressionLevel
            }, [arrayBuffer]); // Transferable
        } catch (error) {
            console.error("Compression start error:", error);
            setPdfFile(prev => prev ? {
                ...prev,
                status: "error",
                message: "Failed to start compression."
            } : null);
        }
    };

    const removeFile = () => {
        setPdfFile(null);
    };

    const downloadPdf = () => {
        if (!pdfFile || !pdfFile.compressedPdf) return;
        const blob = new Blob([pdfFile.compressedPdf as BlobPart], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `compressed-${pdfFile.originalFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Left Column: Dropzone & File Card */}
            <div className="lg:col-span-8 space-y-6">
                {!pdfFile ? (
                    <FileDropzone
                        onDrop={onDrop}
                        fileType="pdf"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        maxFiles={1}
                        title="Upload PDF"
                        description="Drag & drop or click to select a PDF file"
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        <div className={cn(
                            "relative flex flex-col sm:flex-row gap-6 p-6 rounded-xl border-2 transition-all bg-card",
                            pdfFile.status === "compressing" ? "border-primary/50" : "border-primary"
                        )}>
                            {/* Icon Preview */}
                            <div className="h-24 w-24 flex-shrink-0 bg-red-50 dark:bg-red-900/20 rounded-lg border flex items-center justify-center text-red-600">
                                <FileText className="h-10 w-10" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
                                <div>
                                    <h4 className="font-semibold text-lg truncate" title={pdfFile.originalFile.name}>
                                        {pdfFile.originalFile.name}
                                    </h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <span>{filesize(pdfFile.originalSize, { standard: "jedec" }) as string}</span>
                                        {pdfFile.status === "done" && (
                                            <>
                                                <ArrowRight className="h-4 w-4" />
                                                <span className="font-bold text-foreground">
                                                    {filesize(pdfFile.newSize, { standard: "jedec" }) as string}
                                                </span>
                                                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100">
                                                    -{Math.round(((pdfFile.originalSize - pdfFile.newSize) / pdfFile.originalSize) * 100)}%
                                                </Badge>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {pdfFile.status === "compressing" && (
                                    <div className="space-y-2 w-full max-w-md">
                                        <Progress value={pdfFile.progress} className="h-2" />
                                        <p className="text-xs text-muted-foreground">{pdfFile.message}</p>
                                    </div>
                                )}

                                {pdfFile.status === "error" && (
                                    <p className="text-sm text-destructive font-medium">{pdfFile.message}</p>
                                )}
                            </div>

                            {/* Actions (Top Right) */}
                            <div className="absolute top-4 right-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={removeFile}
                                    className="hover:bg-destructive/10 hover:text-destructive"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column: Settings Panel (Sticky) */}
            <div className="lg:col-span-4 sticky top-6 space-y-4">
                <Card className="border-2 shadow-sm">
                    <CardHeader className="pb-4 border-b bg-muted/20">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Settings2 className="h-4 w-4" />
                            Compression Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {/* Compression Level */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">Compression Level</Label>
                            <Select
                                value={compressionLevel}
                                onValueChange={(val: CompressionLevel) => setCompressionLevel(val)}
                                disabled={pdfFile?.status === "compressing"}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low (High Quality)</SelectItem>
                                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                                    <SelectItem value="high">High (Small Size)</SelectItem>
                                    <SelectItem value="extreme">Extreme (Smallest)</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Balances file size vs. visual quality. "Extreme" may make text harder to read.
                            </p>
                        </div>

                        <Separator />

                        {/* Primary Action */}
                        <div className="pt-2">
                            {!pdfFile ? (
                                <Button className="w-full" disabled>
                                    Select a File
                                </Button>
                            ) : pdfFile.status === "done" ? (
                                <Button className="w-full" size="lg" onClick={downloadPdf}>
                                    <Download className="h-5 w-5 mr-2" />
                                    Download Compressed PDF
                                </Button>
                            ) : pdfFile.status === "compressing" ? (
                                <Button className="w-full" disabled>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Compressing...
                                </Button>
                            ) : (
                                <Button className="w-full" size="lg" onClick={compressPdf}>
                                    <Minimize2 className="h-5 w-5 mr-2" />
                                    Compress PDF
                                </Button>
                            )}
                        </div>

                        {pdfFile?.status === "done" && (
                            <Button variant="outline" className="w-full" onClick={removeFile}>
                                Compress Another File
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

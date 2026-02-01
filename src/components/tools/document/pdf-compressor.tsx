"use client";

import { useState, useCallback, useEffect } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";

import {
    FileText,
    X,
    Download,
    Minimize2,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Initialize PDF.js worker


type CompressionLevel = "low" | "medium" | "high" | "extreme";

interface CompressionOptions {
    scale: number;
    quality: number;
}

const COMPRESSION_PRESETS: Record<CompressionLevel, CompressionOptions> = {
    low: { scale: 1.0, quality: 0.8 },
    medium: { scale: 0.8, quality: 0.6 },
    high: { scale: 0.6, quality: 0.4 },
    extreme: { scale: 0.5, quality: 0.2 },
};

export function PdfCompressor() {
    const [file, setFile] = useState<File | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState("");
    const [compressedPdf, setCompressedPdf] = useState<Uint8Array | null>(null);
    const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium");
    const [compressionStats, setCompressionStats] = useState<{
        originalSize: number;
        newSize: number;
        reduction: number;
    } | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setCompressedPdf(null);
            setCompressionStats(null);
            setProgress(0);
            setStatusMessage("");
        }
    }, []);

    // useDropzone replaced by FileDropzone

    const compressPdf = async () => {
        if (!file) return;
        setIsCompressing(true);
        setCompressedPdf(null);
        setCompressionStats(null);

        try {
            setStatusMessage("Loading PDF libraries...");

            // Dynamic imports
            const [pdfjsLib, { PDFDocument }] = await Promise.all([
                import("pdfjs-dist"),
                import("pdf-lib")
            ]);

            // Initialize worker if needed (client-side only)
            if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
            }

            setStatusMessage("Loading PDF...");
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            const totalPages = pdf.numPages;
            const newPdfDoc = await PDFDocument.create();
            const options = COMPRESSION_PRESETS[compressionLevel];

            for (let i = 1; i <= totalPages; i++) {
                setStatusMessage(`Processing page ${i} of ${totalPages}...`);
                const page = await pdf.getPage(i);

                // Determine scale based on viewport and compression settings
                const viewport = page.getViewport({ scale: options.scale * 1.5 }); // Base multiplier for clarity

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                if (!context) throw new Error("Canvas context not available");

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Correctly typed render call
                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                } as any).promise;

                // Compress image to JPEG
                const imageDataUrl = canvas.toDataURL("image/jpeg", options.quality);
                const imageBytes = await fetch(imageDataUrl).then((res) => res.arrayBuffer());

                // Embed into new PDF
                const embeddedImage = await newPdfDoc.embedJpg(imageBytes);
                const newPage = newPdfDoc.addPage([embeddedImage.width, embeddedImage.height]);

                newPage.drawImage(embeddedImage, {
                    x: 0,
                    y: 0,
                    width: embeddedImage.width,
                    height: embeddedImage.height,
                });

                // Update progress
                setProgress(Math.round((i / totalPages) * 100));

                // Cleanup
                // page.cleanup(); // verify if needed for latest pdfjs
            }

            setStatusMessage("Finalizing PDF...");
            const pdfBytes = await newPdfDoc.save();
            const newSize = pdfBytes.byteLength;
            const originalSize = file.size;

            setCompressedPdf(pdfBytes);
            setCompressionStats({
                originalSize,
                newSize,
                reduction: ((originalSize - newSize) / originalSize) * 100
            });
            setStatusMessage("Done!");

        } catch (error) {
            console.error("Compression failed", error);
            setStatusMessage("Error occurred during compression.");
            alert(`Failed to process PDF: ${(error as Error).message || "Unknown error"}. Check console for details.`);
        } finally {
            setIsCompressing(false);
        }
    };

    const downloadPdf = () => {
        if (!compressedPdf || !file) return;

        const blob = new Blob([compressedPdf as BlobPart], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `compressed-${file.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Upload Area */}
            {!file ? (
                <FileDropzone
                    onDrop={onDrop}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxFiles={1}
                    title="Choose PDF File"
                    description="Reduce PDF file size efficiently"
                />
            ) : (
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-6 flex items-center justify-between border-b bg-muted/20">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-medium truncate max-w-[200px] sm:max-w-md" title={file.name}>{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={isCompressing}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="p-8 text-center space-y-8">
                            {!compressedPdf ? (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    <div className="max-w-xs mx-auto space-y-4 text-left">
                                        <div className="space-y-2">
                                            <Label>Compression Level</Label>
                                            <Select
                                                value={compressionLevel}
                                                onValueChange={(val: CompressionLevel) => setCompressionLevel(val)}
                                                disabled={isCompressing}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="low">Low (Better Quality)</SelectItem>
                                                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                                                    <SelectItem value="high">High (Smaller Size)</SelectItem>
                                                    <SelectItem value="extreme">Extreme (Smallest)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <p className="text-xs text-muted-foreground">
                                                Note: Text will be rasterized to guarantee size reduction.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <Button
                                            size="lg"
                                            className="h-12 px-8 text-base bg-orange-600 hover:bg-orange-700 text-white min-w-[200px]"
                                            onClick={compressPdf}
                                            disabled={isCompressing}
                                        >
                                            {isCompressing ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processsing...
                                                </>
                                            ) : (
                                                <>
                                                    <Minimize2 className="h-4 w-4 mr-2" /> Compress PDF
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {isCompressing && (
                                        <div className="space-y-2 max-w-sm mx-auto">
                                            <Progress value={progress} className="h-2" />
                                            <p className="text-sm text-muted-foreground animate-pulse">{statusMessage}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                                        <div className="text-center">
                                            <div className="text-sm text-muted-foreground mb-1">Original Size</div>
                                            <div className="font-medium decoration-slice line-through opacity-70">
                                                {formatSize(compressionStats?.originalSize || 0)}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center text-green-600 dark:text-green-500">
                                            <ArrowRight className="h-6 w-6 hidden sm:block" />
                                            <span className="text-xs font-bold mt-1">
                                                {compressionStats?.reduction && compressionStats.reduction > 0 ?
                                                    `-${compressionStats.reduction.toFixed(1)}%` : "~0%"}
                                            </span>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-sm text-muted-foreground mb-1">Optimized Size</div>
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {formatSize(compressionStats?.newSize || 0)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            size="lg"
                                            className="h-12 px-8 text-base"
                                            onClick={downloadPdf}
                                        >
                                            <Download className="h-4 w-4 mr-2" /> Download Compressed PDF
                                        </Button>

                                        <Button variant="link" className="mt-4 block mx-auto text-muted-foreground text-xs" onClick={() => {
                                            setCompressedPdf(null);
                                            setCompressionStats(null);
                                        }}>
                                            Compress another file
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="text-center text-sm text-muted-foreground">
                <p>Files are processed entirely in your browser using secure technology.</p>
            </div>
        </div>
    );
}

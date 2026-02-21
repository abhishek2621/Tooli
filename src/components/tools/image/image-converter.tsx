"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import {
    Download,
    X,
    Loader2,
    ArrowRight,
    Settings2,
    Layers,
    Trash2,
    Check,
    FileType
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
import { filesize } from "filesize";

type ImageFormat = "png" | "jpeg" | "webp";

interface ConversionSettings {
    format: ImageFormat;
}

interface ImageFile {
    id: string;
    originalFile: File;
    convertedUrl: string | null;
    originalPreview: string;
    status: "pending" | "converting" | "done" | "error";
    settings: ConversionSettings;
}

const DEFAULT_SETTINGS: ConversionSettings = {
    format: "png"
};

export function ImageConverter() {
    const [globalSettings, setGlobalSettings] = useState<ConversionSettings>(DEFAULT_SETTINGS);
    const [images, setImages] = useState<ImageFile[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const workerRef = useRef<Worker | null>(null);

    // Initialize worker
    useEffect(() => {
        const worker = new Worker(new URL('../../../workers/image-converter.worker', import.meta.url));
        workerRef.current = worker;

        worker.onmessage = (e) => {
            const { type, id, blob, message } = e.data;

            if (type === 'DONE') {
                const convertedUrl = URL.createObjectURL(blob);
                setImages(prev => prev.map(item => item.id === id ? {
                    ...item,
                    convertedUrl,
                    status: "done" as const,
                } : item));
                triggerHaptic(10);
                setIsProcessing(false);
            } else if (type === 'ERROR') {
                console.error("Conversion worker error:", message);
                setImages(prev => prev.map(item => item.id === id ? {
                    ...item,
                    status: "error" as const,
                } : item));
                setIsProcessing(false);
            }
        };

        return () => {
            worker.terminate();
            workerRef.current = null;
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Optimization: Memoize derived state
    const { selectedImage, activeSettings, isGlobalMode } = useMemo(() => {
        const img = images.find(img => img.id === selectedId) || null;
        return {
            selectedImage: img,
            activeSettings: img ? img.settings : globalSettings,
            isGlobalMode: !img
        };
    }, [images, selectedId, globalSettings]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substring(7),
            originalFile: file,
            convertedUrl: null,
            originalPreview: URL.createObjectURL(file),
            status: "pending" as const,
            settings: { ...globalSettings }
        }));

        setImages(prev => [...prev, ...newImages]);
    }, [globalSettings]);

    // Dispatch conversion to worker
    const convertSingleFile = useCallback(async (id: string, currentImages: ImageFile[]) => {
        const imgData = currentImages.find(img => img.id === id);
        if (!imgData || !workerRef.current) return;

        setImages(prev => prev.map(item => item.id === id ? { ...item, status: "converting" as const } : item));

        try {
            // Get image dimensions
            const img = new Image();
            img.src = imgData.originalPreview;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const buffer = await imgData.originalFile.arrayBuffer();

            workerRef.current.postMessage(
                { id, buffer, width: img.width, height: img.height, format: imgData.settings.format },
                [buffer] // Transfer the buffer (zero-copy)
            );
        } catch (error) {
            console.error("Conversion dispatch error:", error);
            setImages(prev => prev.map(item => item.id === id ? { ...item, status: "error" as const } : item));
            setIsProcessing(false);
        }
    }, []);

    // Process queue: pick next pending file
    useEffect(() => {
        if (isProcessing) return;
        const nextPending = images.find(img => img.status === "pending");
        if (nextPending) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsProcessing(true);
            convertSingleFile(nextPending.id, images);
        }
    }, [images, isProcessing, convertSingleFile]);

    const updateActiveSettings = useCallback((newSettings: Partial<ConversionSettings>) => {
        if (isGlobalMode) {
            setGlobalSettings(prev => ({ ...prev, ...newSettings }));
            setImages(prev => prev.map(img => ({
                ...img,
                status: "pending",
                settings: { ...img.settings, ...newSettings }
            })));
        } else {
            setImages(prev => prev.map(img => img.id === selectedId ? {
                ...img,
                status: "pending",
                settings: { ...img.settings, ...newSettings }
            } : img));
        }
    }, [isGlobalMode, selectedId]);

    const applyToAll = useCallback(() => {
        if (!activeSettings) return;
        setImages(prev => prev.map(img => ({
            ...img,
            status: "pending",
            settings: { ...activeSettings }
        })));
        if (selectedImage) {
            setGlobalSettings(selectedImage.settings);
        }
    }, [activeSettings, selectedImage]);

    const removeImage = useCallback((id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setImages(prev => {
            const img = prev.find(i => i.id === id);
            if (img) URL.revokeObjectURL(img.originalPreview);
            return prev.filter(i => i.id !== id);
        });
        if (selectedId === id) setSelectedId(null);
    }, [selectedId]);

    const downloadImage = useCallback((img: ImageFile, e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!img.convertedUrl) return;

        const link = document.createElement("a");
        link.href = img.convertedUrl;
        const nameWithoutExt = img.originalFile.name.substring(0, img.originalFile.name.lastIndexOf('.'));
        link.download = `${nameWithoutExt}.${img.settings.format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    const downloadAll = useCallback(() => {
        images.forEach(img => {
            if (img.status === "done") downloadImage(img);
        });
    }, [images, downloadImage]);

    const downloadZip = useCallback(async () => {
        const doneImages = images.filter(img => img.status === "done" && img.convertedUrl);
        if (doneImages.length === 0) return;

        // Prepare file entries for the worker
        const fileEntries = await Promise.all(doneImages.map(async (img) => {
            const response = await fetch(img.convertedUrl!);
            const blob = await response.blob();
            const buffer = await blob.arrayBuffer();
            const nameWithoutExt = img.originalFile.name.substring(0, img.originalFile.name.lastIndexOf('.'));
            return { name: `${nameWithoutExt}.${img.settings.format}`, data: buffer };
        }));

        const worker = new Worker(new URL('../../../workers/zip-generator.worker', import.meta.url));

        worker.onmessage = (e) => {
            const { type, blob } = e.data;

            if (type === 'DONE') {
                triggerHaptic([50, 30, 50]);
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = "converted-images.zip";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                worker.terminate();
            } else if (type === 'ERROR') {
                console.error("ZIP worker error:", e.data.message);
                worker.terminate();
            }
        };

        worker.postMessage(
            { type: 'GENERATE', files: fileEntries, zipFilename: 'converted-images' },
            fileEntries.map(f => f.data) // Transfer buffers
        );
    }, [images]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            <div className="lg:col-span-8 space-y-6">
                <FileDropzone
                    onDrop={onDrop}
                    fileType="image"
                    accept={{
                        'image/jpeg': [],
                        'image/png': [],
                        'image/webp': [],
                        'image/gif': [],
                        'image/bmp': []
                    }}
                    title="Upload Images to Convert"
                    description="Drag & drop or click to select JPG, PNG, WEBP, GIF, BMP files"
                />

                {images.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                        {images.map((img) => (
                            <div
                                key={img.id}
                                onClick={() => setSelectedId(img.id)}
                                className={cn(
                                    "group relative flex flex-col sm:flex-row gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer bg-card hover:bg-accent/50",
                                    selectedId === img.id ? "border-primary ring-1 ring-primary/20 bg-accent/20" : "border-border hover:border-primary/50"
                                )}
                            >
                                <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border">
                                    <img
                                        src={img.originalPreview}
                                        alt={img.originalFile.name}
                                        className="h-full w-full object-cover"
                                    />
                                    {img.status === "done" && (
                                        <Badge className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] bg-green-600">
                                            {img.settings.format.toUpperCase()}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h4 className="font-medium truncate text-sm sm:text-base pr-8" title={img.originalFile.name}>
                                                {img.originalFile.name}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                                {filesize(img.originalFile.size, { standard: "jedec" }) as string}
                                                <ArrowRight className="h-3 w-3" />
                                                <span className="font-medium text-foreground">{img.settings.format.toUpperCase()}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        {img.status === "converting" ? (
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Loader2 className="h-3 w-3 animate-spin" /> Converting...
                                            </div>
                                        ) : img.status === "done" ? (
                                            <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                                                <Check className="h-3 w-3" /> Ready
                                            </div>
                                        ) : img.status === "error" ? (
                                            <div className="text-xs text-destructive font-medium">Conversion Failed</div>
                                        ) : (
                                            <div className="text-xs text-muted-foreground">Pending...</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex sm:flex-col gap-2 items-center sm:justify-center">
                                    {img.status === "done" && (
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={(e) => downloadImage(img, e)}
                                            className="h-8 w-8 text-primary shrink-0"
                                            title="Download"
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={(e) => removeImage(img.id, e)}
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                                        title="Remove"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="lg:col-span-4 sticky top-6 space-y-4">
                <Card className="border-2 shadow-sm">
                    <CardHeader className="pb-4 border-b bg-muted/20">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Settings2 className="h-4 w-4" />
                                {isGlobalMode ? "Global Settings" : "Image Settings"}
                            </CardTitle>
                            {!isGlobalMode && (
                                <Badge variant="secondary" className="text-[10px] font-normal cursor-pointer" onClick={() => setSelectedId(null)}>
                                    Switch to Global
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-3">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <FileType className="h-4 w-4" /> Output Format
                            </Label>
                            <Select
                                value={activeSettings.format}
                                onValueChange={(val: ImageFormat) => updateActiveSettings({ format: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="png">PNG</SelectItem>
                                    <SelectItem value="jpeg">JPG</SelectItem>
                                    <SelectItem value="webp">WebP</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                {activeSettings.format === "jpeg" && "Best for photos (smaller size). No transparency."}
                                {activeSettings.format === "png" && "Good for graphics. Supports transparency."}
                                {activeSettings.format === "webp" && "Modern format. Best compression & quality."}
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-2 pt-2">
                            {!isGlobalMode && (
                                <Button variant="outline" className="w-full" onClick={applyToAll}>
                                    <Layers className="h-4 w-4 mr-2" />
                                    Apply to All Images
                                </Button>
                            )}

                            {images.some(i => i.status === "done") && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Button variant="outline" className="w-full" onClick={downloadAll}>
                                        <Download className="h-4 w-4 mr-2" />
                                        Files
                                    </Button>
                                    <Button className="w-full" onClick={downloadZip}>
                                        <Layers className="h-4 w-4 mr-2" />
                                        ZIP
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>

                    <div className="bg-muted/30 p-4 border-t text-xs text-muted-foreground">
                        <p>
                            {isGlobalMode
                                ? "This format will apply to all uploaded images."
                                : "You are changing the format for this specific image."}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

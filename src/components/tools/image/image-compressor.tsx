"use client";

import { useState, useCallback, useEffect } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import imageCompression from "browser-image-compression";
import { filesize } from "filesize";
import { Download, Upload, X, Loader2, ArrowRight, Settings2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CompressionSettings {
    quality: number; // 0-100
    width?: number;
    height?: number;
    useOriginalResolution: boolean;
    targetSize?: number;
    targetUnit: "KB" | "MB";
}

interface CompressedImage {
    originalFile: File;
    compressedFile: File | null;
    originalPreview: string;
    compressedPreview: string | null;
    status: "pending" | "compressing" | "done" | "error";
    progress: number;
    settings: CompressionSettings;
}

export function ImageCompressor() {
    // Global settings state
    const [globalSettings, setGlobalSettings] = useState<CompressionSettings>({
        quality: 80,
        width: 1920,
        height: 1080,
        useOriginalResolution: true,
        targetUnit: "KB"
    });

    const [images, setImages] = useState<CompressedImage[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => ({
            originalFile: file,
            compressedFile: null,
            originalPreview: URL.createObjectURL(file),
            compressedPreview: null,
            status: "pending" as const,
            progress: 0,
            settings: { ...globalSettings } // Copy current global settings
        }));

        setImages(prev => [...prev, ...newImages]);
    }, [globalSettings]);

    // useDropzone replaced by FileDropzone component

    const compressImage = async (index: number) => {
        const img = images[index];
        // Optimistic update
        setImages(prev => prev.map((item, i) => i === index ? { ...item, status: "compressing", progress: 10 } : item));

        try {
            const maxDimension = Math.max(img.settings.width || 0, img.settings.height || 0);

            // Calculate maxSizeMB
            let maxSizeMB = undefined;
            if (img.settings.targetSize && img.settings.targetSize > 0) {
                if (img.settings.targetUnit === "MB") {
                    maxSizeMB = img.settings.targetSize;
                } else {
                    maxSizeMB = img.settings.targetSize / 1024;
                }
            }

            const options = {
                maxWidthOrHeight: img.settings.useOriginalResolution ? undefined : (maxDimension || undefined),
                maxSizeMB: maxSizeMB,
                useWebWorker: true,
                initialQuality: img.settings.quality / 100,
                onProgress: (p: number) => {
                    setImages(prev => prev.map((item, i) => i === index ? { ...item, progress: p } : item));
                }
            };

            const compressedFile = await imageCompression(img.originalFile, options);

            const compressedPreview = URL.createObjectURL(compressedFile);

            setImages(prev => prev.map((item, i) => i === index ? {
                ...item,
                compressedFile,
                compressedPreview,
                status: "done",
                progress: 100
            } : item));

        } catch (error) {
            console.error(error);
            setImages(prev => prev.map((item, i) => i === index ? { ...item, status: "error", progress: 0 } : item));
        }
    };

    // Trigger compression when settings change OR new image added
    useEffect(() => {
        images.forEach((img, index) => {
            if (img.status === "pending") {
                compressImage(index);
            }
        });
    }, [images]);

    const updateImageSettings = (index: number, newSettings: Partial<CompressionSettings>) => {
        setImages(prev => prev.map((item, i) => i === index ? {
            ...item,
            status: "pending", // Mark as pending to re-trigger compression
            settings: { ...item.settings, ...newSettings }
        } : item));
    };

    const removeImage = (index: number) => {
        URL.revokeObjectURL(images[index].originalPreview);
        if (images[index].compressedPreview) URL.revokeObjectURL(images[index].compressedPreview!);
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const downloadImage = (img: CompressedImage) => {
        if (!img.compressedFile) return;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(img.compressedFile);
        link.download = `compressed-${img.originalFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8">
            {/* Dropzone */}
            <FileDropzone
                onDrop={onDrop}
                accept={{
                    'image/jpeg': [],
                    'image/png': [],
                    'image/webp': []
                }}
                title="Upload Images"
                description="Drag & drop or click to select JPG, PNG, WEBP files"
            />

            {/* Image List */}
            <div className="space-y-4">
                {images.map((img, index) => (
                    <Card key={index} className="overflow-hidden">
                        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[200px_1fr_auto] gap-6 items-start">
                            {/* Preview Area */}
                            <div className="flex flex-col gap-2">
                                <div className="relative group aspect-square bg-slate-100 dark:bg-slate-950 rounded-md overflow-hidden border">
                                    <img
                                        src={img.compressedPreview || img.originalPreview}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                    {img.status === "done" && img.compressedFile && (
                                        <Badge className={cn(
                                            "absolute top-2 right-2",
                                            img.compressedFile.size < img.originalFile.size ? "bg-green-500" : "bg-yellow-500"
                                        )}>
                                            {img.compressedFile.size < img.originalFile.size
                                                ? `-${Math.round((1 - (img.compressedFile.size / img.originalFile.size)) * 100)}%`
                                                : "+0%"}
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-xs text-center text-muted-foreground truncate px-1">
                                    {img.originalFile.name}
                                </div>
                            </div>

                            {/* Controls & Info Area */}
                            <div className="space-y-4 w-full bg-muted/30 rounded-lg border p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80 mb-4">
                                    <Settings2 className="h-4 w-4" /> Compression Settings
                                </div>

                                <div className="space-y-6">
                                    {/* Resolution Control */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Resize Dimensions</Label>
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor={`res-${index}`} className="text-xs font-normal text-muted-foreground">Maintain Resolution</Label>
                                                <Switch
                                                    id={`res-${index}`}
                                                    checked={img.settings.useOriginalResolution}
                                                    onCheckedChange={(checked) => updateImageSettings(index, { useOriginalResolution: checked })}
                                                />
                                            </div>
                                        </div>

                                        {!img.settings.useOriginalResolution && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <Label className="text-xs text-muted-foreground">Max Width (px)</Label>
                                                    <Input
                                                        type="number"
                                                        value={img.settings.width}
                                                        onChange={(e) => updateImageSettings(index, { width: Number(e.target.value) })}
                                                        className="h-8"
                                                        placeholder="Width"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-xs text-muted-foreground">Max Height (px)</Label>
                                                    <Input
                                                        type="number"
                                                        value={img.settings.height}
                                                        onChange={(e) => updateImageSettings(index, { height: Number(e.target.value) })}
                                                        className="h-8"
                                                        placeholder="Height"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quality Control */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <Label>Quality: {img.settings.quality}%</Label>
                                        </div>
                                        <Slider
                                            value={[img.settings.quality]}
                                            min={10}
                                            max={100}
                                            step={5}
                                            onValueChange={(val) => updateImageSettings(index, { quality: val[0] })}
                                            className="py-2"
                                        />
                                    </div>

                                    {/* Target Size Control */}
                                    <div className="space-y-3 pt-4 border-t">
                                        <Label>Target Size (Optional)</Label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                value={img.settings.targetSize || ''}
                                                onChange={(e) => updateImageSettings(index, { targetSize: e.target.value ? Number(e.target.value) : undefined })}
                                                className="h-9"
                                                placeholder="e.g. 500"
                                            />
                                            <Select
                                                value={img.settings.targetUnit}
                                                onValueChange={(val: "KB" | "MB") => updateImageSettings(index, { targetUnit: val })}
                                            >
                                                <SelectTrigger className="w-[80px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="KB">KB</SelectItem>
                                                    <SelectItem value="MB">MB</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Leave empty to use quality setting only.
                                        </p>
                                    </div>
                                </div>

                                {/* Size Results */}
                                <div className="flex items-center justify-between p-3 bg-background rounded-lg mt-6 border">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">Original</span>
                                        <span className="font-mono text-sm">{filesize(img.originalFile.size, { standard: "jedec" }) as string}</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-muted-foreground">Compressed</span>
                                        <div className="flex items-center gap-2">
                                            {img.status === "compressing" ? (
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Loader2 className="h-3 w-3 animate-spin" /> ...
                                                </span>
                                            ) : (
                                                <span className={cn("font-mono text-sm font-bold", img.status === "done" && "text-primary")}>
                                                    {img.compressedFile ? (filesize(img.compressedFile.size, { standard: "jedec" }) as string) : "..."}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col items-center gap-2 w-full">
                                {img.status === "done" && (
                                    <Button onClick={() => downloadImage(img)} className="w-full">
                                        <Download className="h-4 w-4 mr-2" />
                                        Save
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    onClick={() => compressImage(index)} // Manual refresh
                                    className="w-full"
                                    disabled={img.status === "compressing"}
                                >
                                    <RefreshCw className={cn("h-4 w-4 mr-2", img.status === "compressing" && "animate-spin")} />
                                    {img.status === "compressing" ? "Working" : "Redo"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeImage(index)}
                                    className="hover:text-destructive lg:w-full lg:h-8"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

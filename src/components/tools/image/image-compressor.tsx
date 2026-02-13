"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import { filesize } from "filesize";
import { Download, Loader2, ArrowRight, Settings2, Layers, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn, triggerHaptic } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";

interface CompressionSettings {
    quality: number; // 0-100
    width?: number; // Optional max width
    height?: number; // Optional max height
    useOriginalResolution: boolean;
    maintainAspectRatio: boolean;
    targetSize?: number;
    targetUnit: "KB" | "MB";
    format: "original" | "jpeg" | "png" | "webp";
}

interface CompressedImage {
    id: string;
    originalFile: File;
    compressedFile: File | null;
    originalPreview: string;
    compressedPreview: string | null;
    status: "pending" | "compressing" | "done" | "error";
    progress: number;
    settings: CompressionSettings;
}

const DEFAULT_SETTINGS: CompressionSettings = {
    quality: 80,
    useOriginalResolution: true,
    maintainAspectRatio: true,
    targetUnit: "KB",
    format: "original"
};

export function ImageCompressor() {
    const [globalSettings, setGlobalSettings] = useState<CompressionSettings>(DEFAULT_SETTINGS);
    const [images, setImages] = useState<CompressedImage[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Optimization: Memorialize derived states
    const { selectedImage, activeSettings, isGlobalMode } = useMemo(() => {
        const img = images.find(img => img.id === selectedId) || null;
        return {
            selectedImage: img,
            activeSettings: img ? img.settings : globalSettings,
            isGlobalMode: !img
        }
    }, [images, selectedId, globalSettings]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substring(7),
            originalFile: file,
            compressedFile: null,
            originalPreview: URL.createObjectURL(file),
            compressedPreview: null,
            status: "pending" as const,
            progress: 0,
            settings: { ...globalSettings }
        }));

        setImages(prev => [...prev, ...newImages]);
    }, [globalSettings]);

    const compressImage = async (id: string, currentImages: CompressedImage[]) => {
        const index = currentImages.findIndex(img => img.id === id);
        if (index === -1) return;

        const img = currentImages[index];
        setImages(prev => prev.map(item => item.id === id ? { ...item, status: "compressing", progress: 10 } : item));

        try {
            const imageCompression = (await import("browser-image-compression")).default;

            const maxDimension = Math.max(img.settings.width || 0, img.settings.height || 0);
            let maxSizeMB = undefined;
            if (img.settings.targetSize && img.settings.targetSize > 0) {
                maxSizeMB = img.settings.targetUnit === "MB" ? img.settings.targetSize : img.settings.targetSize / 1024;
            }

            const options = {
                maxWidthOrHeight: img.settings.useOriginalResolution ? undefined : (maxDimension || undefined),
                maxSizeMB: maxSizeMB,
                useWebWorker: true,
                initialQuality: img.settings.quality / 100,
                fileType: img.settings.format === "original" ? undefined : `image/${img.settings.format}` as string,
                onProgress: (p: number) => {
                    setImages(prev => prev.map(item => item.id === id ? { ...item, progress: p } : item));
                }
            };

            const compressedFile = await imageCompression(img.originalFile, options);
            const compressedPreview = URL.createObjectURL(compressedFile);

            setImages(prev => prev.map(item => {
                if (item.id === id) {
                    if (item.compressedPreview) URL.revokeObjectURL(item.compressedPreview);
                    return {
                        ...item,
                        compressedFile,
                        compressedPreview,
                        status: "done",
                        progress: 100
                    };
                }
                return item;
            }));

            triggerHaptic(10);
        } catch (error) {
            console.error("Compression error:", error);
            setImages(prev => prev.map(item => item.id === id ? { ...item, status: "error", progress: 0 } : item));
        }
    };

    useEffect(() => {
        const processQueue = async () => {
            if (isProcessing) return;
            const nextPending = images.find(img => img.status === "pending");
            if (nextPending) {
                setIsProcessing(true);
                await compressImage(nextPending.id, images);
                setIsProcessing(false);
            }
        };
        processQueue();
    }, [images, isProcessing]);

    const updateActiveSettings = useCallback((newSettings: Partial<CompressionSettings>) => {
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
            if (img) {
                URL.revokeObjectURL(img.originalPreview);
                if (img.compressedPreview) URL.revokeObjectURL(img.compressedPreview);
            }
            return prev.filter(i => i.id !== id);
        });
        if (selectedId === id) setSelectedId(null);
    }, [selectedId]);

    const downloadImage = useCallback((img: CompressedImage, e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!img.compressedFile) return;
        const url = URL.createObjectURL(img.compressedFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = `compressed-${img.originalFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, []);

    const downloadAll = useCallback(() => {
        images.forEach(img => {
            if (img.status === "done") downloadImage(img);
        });
    }, [images, downloadImage]);

    const downloadZip = useCallback(async () => {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();

        images.forEach(img => {
            if (img.status === "done" && img.compressedFile) {
                zip.file(`compressed-${img.originalFile.name}`, img.compressedFile);
            }
        });

        const content = await zip.generateAsync({ type: "blob" });
        triggerHaptic([50, 30, 50]);
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = "compressed-images.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [images]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            <div className="lg:col-span-8 space-y-6">
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
                                        src={img.compressedPreview || img.originalPreview}
                                        alt={img.originalFile.name}
                                        className="h-full w-full object-cover"
                                    />
                                    {img.status === "done" && img.compressedFile && (
                                        <Badge className={cn(
                                            "absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px]",
                                            (img.compressedFile.size < img.originalFile.size) ? "bg-green-600" : "bg-amber-600"
                                        )}>
                                            {img.compressedFile.size < img.originalFile.size
                                                ? `-${Math.round((1 - (img.compressedFile.size / img.originalFile.size)) * 100)}%`
                                                : "+0%"}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h4 className="font-medium truncate text-sm sm:text-base pr-8" title={img.originalFile.name}>
                                                {img.originalFile.name}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {filesize(img.originalFile.size, { standard: "jedec" }) as string}
                                                <ArrowRight className="inline-block h-3 w-3 mx-1" />
                                                {img.status === "done" && img.compressedFile ? (
                                                    <span className="font-bold text-primary">
                                                        {filesize(img.compressedFile.size, { standard: "jedec" }) as string}
                                                    </span>
                                                ) : (
                                                    <span>...</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        {img.status === "compressing" ? (
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Loader2 className="h-3 w-3 animate-spin" /> Compressing...
                                            </div>
                                        ) : img.status === "done" ? (
                                            <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                                                <Check className="h-3 w-3" /> Ready
                                            </div>
                                        ) : img.status === "error" ? (
                                            <div className="text-xs text-destructive font-medium">Compression Failed</div>
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
                                            aria-label={`Download ${img.originalFile.name}`}
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
                                        aria-label={`Remove ${img.originalFile.name}`}
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
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                                    aria-label="Switch to global settings"
                                >
                                    <Badge variant="secondary" className="text-[10px] font-normal cursor-pointer hover:bg-secondary/80">
                                        Switch to Global
                                    </Badge>
                                </button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">Quality</Label>
                                <span className="text-sm font-mono text-muted-foreground">{activeSettings.quality}%</span>
                            </div>
                            <Slider
                                aria-label="Image Quality"
                                value={[activeSettings.quality]}
                                min={10}
                                max={100}
                                step={5}
                                onValueChange={(val) => updateActiveSettings({ quality: val[0] })}
                                className="py-2"
                            />
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <Label className="text-sm font-medium">Output Format</Label>
                            <Select
                                value={activeSettings.format}
                                onValueChange={(val: CompressionSettings['format']) => updateActiveSettings({ format: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Original" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="original">Match Original</SelectItem>
                                    <SelectItem value="jpeg">JPEG</SelectItem>
                                    <SelectItem value="png">PNG</SelectItem>
                                    <SelectItem value="webp">WebP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Maintain Aspect Ratio</Label>
                                <Switch
                                    aria-label="Maintain Aspect Ratio"
                                    checked={activeSettings.maintainAspectRatio}
                                    onCheckedChange={(checked) => updateActiveSettings({ maintainAspectRatio: checked, useOriginalResolution: checked })}
                                />
                            </div>

                            {!activeSettings.maintainAspectRatio && (
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">Width (px)</Label>
                                        <Input
                                            type="number"
                                            value={activeSettings.width || ''}
                                            placeholder="Auto"
                                            onChange={(e) => updateActiveSettings({ width: e.target.value ? Number(e.target.value) : undefined })}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">Height (px)</Label>
                                        <Input
                                            type="number"
                                            value={activeSettings.height || ''}
                                            placeholder="Auto"
                                            onChange={(e) => updateActiveSettings({ height: e.target.value ? Number(e.target.value) : undefined })}
                                            className="h-9"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Set Target File Size</Label>
                                <Switch
                                    aria-label="Set Target File Size"
                                    checked={!!activeSettings.targetSize}
                                    onCheckedChange={(checked) => updateActiveSettings({ targetSize: checked ? 100 : undefined })}
                                />
                            </div>

                            {activeSettings.targetSize !== undefined && (
                                <>
                                    <div className="flex gap-2 pt-2">
                                        <Input
                                            type="number"
                                            value={activeSettings.targetSize || ''}
                                            placeholder="e.g., 100"
                                            onChange={(e) => updateActiveSettings({ targetSize: e.target.value ? Number(e.target.value) : undefined })}
                                            className="h-9"
                                        />
                                        <Select
                                            value={activeSettings.targetUnit}
                                            onValueChange={(val: "KB" | "MB") => updateActiveSettings({ targetUnit: val })}
                                        >
                                            <SelectTrigger className="w-20 h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="KB">KB</SelectItem>
                                                <SelectItem value="MB">MB</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Automatically adjust quality to reach target size
                                    </p>
                                </>
                            )}
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
                                ? "These settings will apply to all newly added images and existing images."
                                : "You are editing settings for a specific image."}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

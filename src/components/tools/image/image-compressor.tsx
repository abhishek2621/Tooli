"use client";

import { useState, useCallback, useEffect } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import { filesize } from "filesize";
import { Download, Upload, X, Loader2, ArrowRight, Settings2, RefreshCw, Layers, Image as ImageIcon, Trash2, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
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
    // Global settings serve as the default for new uploads
    const [globalSettings, setGlobalSettings] = useState<CompressionSettings>(DEFAULT_SETTINGS);
    const [images, setImages] = useState<CompressedImage[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Derived state
    const selectedImageIndex = images.findIndex(img => img.id === selectedId);
    const selectedImage = selectedImageIndex !== -1 ? images[selectedImageIndex] : null;

    // Use global settings if no image is selected, otherwise use the selected image's settings
    const activeSettings = selectedImage ? selectedImage.settings : globalSettings;
    const isGlobalMode = !selectedImage;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substring(7),
            originalFile: file,
            compressedFile: null,
            originalPreview: URL.createObjectURL(file), // Create object URL immediately
            compressedPreview: null,
            status: "pending" as const,
            progress: 0,
            settings: { ...globalSettings } // Copy current global settings
        }));

        setImages(prev => {
            const combined = [...prev, ...newImages];
            // If this is the first upload batch, select the first image
            if (prev.length === 0 && newImages.length > 0) {
                // We'll update selectedId in an effect or here if we could, 
                // but setting state is async. We'll let the user select.
                // Actually, staying on "Global" mode is often better for batch workflows.
                // Let's NOT auto-select to keep "Global Settings" visible by default.
            }
            return combined;
        });
    }, [globalSettings]);

    const compressImage = async (id: string, currentImages: CompressedImage[]) => {
        const index = currentImages.findIndex(img => img.id === id);
        if (index === -1) return;

        const img = currentImages[index];

        // Update status to compressing
        setImages(prev => prev.map(item => item.id === id ? { ...item, status: "compressing", progress: 10 } : item));

        try {
            const imageCompression = (await import("browser-image-compression")).default;

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
                fileType: img.settings.format === "original" ? undefined : `image/${img.settings.format}`,
                onProgress: (p: number) => {
                    setImages(prev => prev.map(item => item.id === id ? { ...item, progress: p } : item));
                }
            };

            const compressedFile = await imageCompression(img.originalFile, options);
            const compressedPreview = URL.createObjectURL(compressedFile);

            setImages(prev => prev.map(item => item.id === id ? {
                ...item,
                compressedFile,
                compressedPreview,
                status: "done",
                progress: 100
            } : item));

        } catch (error) {
            console.error("Compression error:", error);
            setImages(prev => prev.map(item => item.id === id ? { ...item, status: "error", progress: 0 } : item));
        }
    };

    // Watch for pending images and compress them ONE AT A TIME
    // This is crucial for Mobile INP to prevent blocking the main thread with multiple workers
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

    const updateActiveSettings = (newSettings: Partial<CompressionSettings>) => {
        if (isGlobalMode) {
            setGlobalSettings(prev => ({ ...prev, ...newSettings }));
            // Optionally, apply to ALL pending/existing images? 
            // Usually global settings only apply to NEW uploads or if explicitly applied.
            // But for a "Global Settings" panel, users expect it to change everything.
            // Let's update ALL images to match global settings if in global mode.
            setImages(prev => prev.map(img => ({
                ...img,
                status: "pending", // Re-compress
                settings: { ...img.settings, ...newSettings }
            })));
        } else if (selectedImage) {
            setImages(prev => prev.map(img => img.id === selectedId ? {
                ...img,
                status: "pending",
                settings: { ...img.settings, ...newSettings }
            } : img));
        }
    };

    // Apply current settings to all images (useful when in single selection mode but want to broadcast)
    const applyToAll = () => {
        if (!activeSettings) return;
        setImages(prev => prev.map(img => ({
            ...img,
            status: "pending",
            settings: { ...activeSettings }
        })));
        if (selectedImage) {
            setGlobalSettings(selectedImage.settings); // Sync global
        }
    };

    const removeImage = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        const img = images.find(i => i.id === id);
        if (img) {
            URL.revokeObjectURL(img.originalPreview);
            if (img.compressedPreview) URL.revokeObjectURL(img.compressedPreview);
        }
        setImages(prev => prev.filter(i => i.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    const downloadImage = (img: CompressedImage, e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!img.compressedFile) return;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(img.compressedFile);
        link.download = `compressed-${img.originalFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadAll = () => {
        images.forEach(img => {
            if (img.status === "done") downloadImage(img);
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Left Column: Dropzone & List */}
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
                                {/* Preview */}
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

                                {/* Info */}
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

                                    {/* Status Bar */}
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

                                {/* Quick Actions */}
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

            {/* Right Column: Settings Panel (Sticky) */}
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
                        {/* Quality Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">Quality</Label>
                                <span className="text-sm font-mono text-muted-foreground">{activeSettings.quality}%</span>
                            </div>
                            <Slider
                                value={[activeSettings.quality]}
                                min={10}
                                max={100}
                                step={5}
                                onValueChange={(val) => updateActiveSettings({ quality: val[0] })}
                                className="py-2"
                            />
                        </div>

                        <Separator />

                        {/* Format Selection */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">Output Format</Label>
                            <Select
                                value={activeSettings.format}
                                onValueChange={(val: any) => updateActiveSettings({ format: val })}
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

                        {/* Dimension Controls */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Maintain Aspect Ratio</Label>
                                <Switch
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

                        {/* Target File Size */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Set Target File Size</Label>
                                <Switch
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

                        {/* Action Buttons */}
                        <div className="space-y-2 pt-2">
                            {!isGlobalMode && (
                                <Button variant="outline" className="w-full" onClick={applyToAll}>
                                    <Layers className="h-4 w-4 mr-2" />
                                    Apply to All Images
                                </Button>
                            )}

                            {images.some(i => i.status === "done") && (
                                <Button className="w-full" onClick={downloadAll}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download All {images.filter(i => i.status === "done").length > 0 && `(${images.filter(i => i.status === "done").length})`}
                                </Button>
                            )}
                        </div>
                    </CardContent>

                    {/* Helper Text */}
                    <div className="bg-muted/30 p-4 border-t text-xs text-muted-foreground">
                        <p>
                            {isGlobalMode
                                ? "These settings will apply to all newly added images and existing images."
                                : "You are editing settings for a specific image."}
                        </p>
                    </div>
                </Card>
            </div>
        </div >
    );
}

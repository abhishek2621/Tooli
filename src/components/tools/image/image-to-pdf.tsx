"use client";

import { useState, useCallback } from "react";
import { FileDropzone } from "@/components/shared/file-dropzone";
import {
    Download,
    Upload,
    X,
    FileText,
    MoveLeft,
    MoveRight,
    ImageIcon,
    Settings2,
    Check,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface PdfImage {
    id: string;
    file: File;
    preview: string;
    width: number;
    height: number;
}

export function ImageToPdf() {
    const [images, setImages] = useState<PdfImage[]>([]);
    const [pageSize, setPageSize] = useState("a4");
    const [orientation, setOrientation] = useState("portrait");
    const [margin, setMargin] = useState("normal");
    const [filename, setFilename] = useState("images-merged");
    const [isGenerating, setIsGenerating] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setImages(prev => [...prev, {
                        id: Math.random().toString(36).substring(7),
                        file,
                        preview: e.target?.result as string,
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    }]);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const moveImage = (index: number, direction: 'left' | 'right', e?: React.MouseEvent) => {
        e?.stopPropagation(); // Prevent drag/drop interference if we add detailed DND later
        if (direction === 'left' && index === 0) return;
        if (direction === 'right' && index === images.length - 1) return;

        setImages(prev => {
            const newImages = [...prev];
            const targetIndex = direction === 'left' ? index - 1 : index + 1;
            [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
            return newImages;
        });
    };

    const generatePdf = async () => {
        if (images.length === 0) return;
        setIsGenerating(true);

        try {
            const { jsPDF } = await import("jspdf");

            // Correct orientation type for jsPDF
            const orientationMode = orientation === "portrait" ? "p" : "l";

            const doc = new jsPDF({
                orientation: orientationMode,
                unit: "pt",
                format: pageSize
            });

            // Standard margin logic (pt)
            let marginPt = 0;
            if (margin === "small") marginPt = 20;
            if (margin === "normal") marginPt = 40;
            if (margin === "big") marginPt = 72;

            images.forEach((img, index) => {
                if (index > 0) {
                    doc.addPage(pageSize, orientationMode);
                }

                // Get page dimensions
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                const availableWidth = pageWidth - (marginPt * 2);
                const availableHeight = pageHeight - (marginPt * 2);

                // Calculate aspect ratios
                const imgRatio = img.width / img.height;
                const pageRatio = availableWidth / availableHeight;

                let finalWidth, finalHeight;

                // Fit image within available space while maintaining aspect ratio
                if (imgRatio > pageRatio) {
                    finalWidth = availableWidth;
                    finalHeight = availableWidth / imgRatio;
                } else {
                    finalHeight = availableHeight;
                    finalWidth = availableHeight * imgRatio;
                }

                // Center image
                const x = (pageWidth - finalWidth) / 2;
                const y = (pageHeight - finalHeight) / 2;

                doc.addImage(img.preview, 'JPEG', x, y, finalWidth, finalHeight);
            });

            doc.save(`${filename}.pdf`);
        } catch (error) {
            console.error("PDF generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Left Column: Dropzone & Grid */}
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <div key={img.id} className="group relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border shadow-sm hover:ring-2 hover:ring-primary/50 transition-all">
                                <img
                                    src={img.preview}
                                    alt={`Page ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />

                                {/* Page Number Badge */}
                                <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm z-10">
                                    Page {index + 1}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                    <div className="flex gap-1 w-full justify-center">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8 rounded-full"
                                            onClick={(e) => moveImage(index, 'left', e)}
                                            disabled={index === 0}
                                            title="Move Left"
                                        >
                                            <MoveLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8 rounded-full"
                                            onClick={(e) => moveImage(index, 'right', e)}
                                            disabled={index === images.length - 1}
                                            title="Move Right"
                                        >
                                            <MoveRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="h-8 gap-2 px-3 rounded-full"
                                        onClick={() => removeImage(img.id)}
                                    >
                                        <X className="h-3 w-3" /> Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {images.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground bg-muted/20 border-2 border-dashed rounded-xl">
                        <ImageIcon className="h-12 w-12 opacity-20 mb-3" />
                        <p className="text-sm">Uploaded images will appear here in a grid.</p>
                    </div>
                )}
            </div>

            {/* Right Column: Settings Panel (Sticky) */}
            <div className="lg:col-span-4 sticky top-6 space-y-4">
                <Card className="border-2 shadow-sm">
                    <CardHeader className="pb-4 border-b bg-muted/20">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Settings2 className="h-4 w-4" />
                            PDF Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {/* Filename */}
                        <div className="space-y-2">
                            <Label htmlFor="filename">Filename</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="filename"
                                    value={filename}
                                    onChange={(e) => setFilename(e.target.value)}
                                    className="flex-1"
                                />
                                <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1.5 rounded-md">.pdf</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Page Size & Orientation */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label>Page Size</Label>
                                <Select value={pageSize} onValueChange={setPageSize}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="a4">A4 (Standard)</SelectItem>
                                        <SelectItem value="letter">Letter (US)</SelectItem>
                                        <SelectItem value="legal">Legal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Orientation</Label>
                                <div className="grid grid-cols-2 gap-2 bg-muted/50 p-1 rounded-lg">
                                    <Button
                                        variant={orientation === "portrait" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setOrientation("portrait")}
                                        className={cn("w-full transition-all", orientation === "portrait" && "shadow-sm")}
                                    >
                                        Portrait
                                    </Button>
                                    <Button
                                        variant={orientation === "landscape" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setOrientation("landscape")}
                                        className={cn("w-full transition-all", orientation === "landscape" && "shadow-sm")}
                                    >
                                        Landscape
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Margins */}
                        <div className="space-y-2">
                            <Label>Margins</Label>
                            <Select value={margin} onValueChange={setMargin}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None (Full Bleed)</SelectItem>
                                    <SelectItem value="small">Small</SelectItem>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="big">Big</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        <div className="pt-2">
                            <Button
                                className="w-full h-11 text-base"
                                onClick={generatePdf}
                                disabled={isGenerating || images.length === 0}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isGenerating ? "Generating..." : `Convert ${images.length > 0 ? images.length + ' ' : ''}Images`}
                            </Button>
                            {images.length === 0 && (
                                <p className="text-xs text-center text-muted-foreground mt-2">
                                    Add at least one image to convert
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}

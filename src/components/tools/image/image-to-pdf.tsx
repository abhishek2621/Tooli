"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import jsPDF from "jspdf";
import {
    Download,
    Upload,
    X,
    FileText,
    MoveLeft,
    MoveRight,
    ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PdfImage {
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
                // Create an image element to get natural dimensions
                const img = new Image();
                img.onload = () => {
                    setImages(prev => [...prev, {
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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': []
        }
    });

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const moveImage = (index: number, direction: 'left' | 'right') => {
        if (direction === 'left' && index === 0) return;
        if (direction === 'right' && index === images.length - 1) return;

        setImages(prev => {
            const newImages = [...prev];
            const targetIndex = direction === 'left' ? index - 1 : index + 1;
            [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
            return newImages;
        });
    };

    const generatePdf = () => {
        if (images.length === 0) return;
        setIsGenerating(true);

        try {
            const doc = new jsPDF({
                orientation: orientation as "portrait" | "landscape",
                unit: "pt",
                format: pageSize === "fit" ? undefined : pageSize // 'fit' handled custom logic below logic? No, jspdf needs format.
                // For 'fit', we might want to just set a default and resize pages per image? 
                // Creating a new doc for each page if easy? 
                // Simplest 'Fit' implementation: use A4 but scale image to fit perfectly on the page.
            });

            // If pageSize is 'fit', we should probably iterate and addPage with specific dimensions?
            // Actually jsPDF constructor sets the FIRST page.
            // Let's stick to standard sizes first for stability, or custom logic.

            // Standard margin logic
            let marginPt = 0;
            if (margin === "small") marginPt = 20;
            if (margin === "normal") marginPt = 40;
            if (margin === "big") marginPt = 72;

            images.forEach((img, index) => {
                if (index > 0) {
                    if (pageSize === "fit") {
                        // For fit to image, add page with image dimensions!
                        doc.addPage([img.width, img.height], img.width > img.height ? "l" : "p");
                    } else {
                        doc.addPage();
                    }
                } else if (pageSize === "fit") {
                    // Resize first page? jsPDF doesn't make it easy to resize first page after init.
                    // Workaround: delete first page? 
                    // Better: We can set the doc initially to the first image size.
                }

                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                const availableWidth = pageWidth - (marginPt * 2);
                const availableHeight = pageHeight - (marginPt * 2);

                // Calculate ratios to fit image within margins
                const widthRatio = availableWidth / img.width;
                const heightRatio = availableHeight / img.height;
                const ratio = Math.min(widthRatio, heightRatio, 1); // 1 means don't upscale if smaller

                const finalWidth = img.width * ratio;
                const finalHeight = img.height * ratio;

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
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <Upload className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">
                                {isDragActive ? "Drop images here" : "Add Images"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                JPG, PNG, WEBP supported
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Grid */}
                {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative group aspect-[3/4] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border shadow-sm">
                                <img
                                    src={img.preview}
                                    alt={`Page ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                                    {index + 1}
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8"
                                            onClick={() => moveImage(index, 'left')}
                                            disabled={index === 0}
                                        >
                                            <MoveLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8"
                                            onClick={() => moveImage(index, 'right')}
                                            disabled={index === images.length - 1}
                                        >
                                            <MoveRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => removeImage(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {images.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-muted">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No images selected yet</p>
                    </div>
                )}
            </div>

            {/* Right Col: Settings */}
            <div className="space-y-6">
                <Card className="sticky top-24">
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b">
                            <FileText className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">PDF Settings</h3>
                        </div>

                        {/* Filename */}
                        <div className="space-y-2">
                            <Label htmlFor="filename">Filename</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="filename"
                                    value={filename}
                                    onChange={(e) => setFilename(e.target.value)}
                                />
                                <span className="text-sm text-muted-foreground">.pdf</span>
                            </div>
                        </div>

                        {/* Page Size */}
                        <div className="space-y-2">
                            <Label>Page Size</Label>
                            <Select value={pageSize} onValueChange={setPageSize}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="a4">A4</SelectItem>
                                    <SelectItem value="letter">Letter</SelectItem>
                                    {/* Fit to image is tricky with JS PDF single doc, can be unstable, let's omit for MVP */}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Orientation */}
                        <div className="space-y-2">
                            <Label>Orientation</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant={orientation === "portrait" ? "default" : "outline"}
                                    onClick={() => setOrientation("portrait")}
                                    className="w-full"
                                >
                                    Portrait
                                </Button>
                                <Button
                                    variant={orientation === "landscape" ? "default" : "outline"}
                                    onClick={() => setOrientation("landscape")}
                                    className="w-full"
                                >
                                    Landscape
                                </Button>
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
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="small">Small</SelectItem>
                                    <SelectItem value="normal">Normal (Default)</SelectItem>
                                    <SelectItem value="big">Big</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="pt-6 border-t">
                            <Button
                                className="w-full h-12 text-base shadow-lg shadow-primary/20"
                                onClick={generatePdf}
                                disabled={isGenerating || images.length === 0}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isGenerating ? "Generating..." : `Convert ${images.length} Images`}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

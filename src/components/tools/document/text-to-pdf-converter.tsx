"use client";

import { useState } from "react";

import { Download, FileText, Upload, Trash2, FileType } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function TextToPdfConverter() {
    const [text, setText] = useState("");
    const [fontSize, setFontSize] = useState(12);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [pageSize, setPageSize] = useState("a4");
    const [orientation, setOrientation] = useState("portrait");
    const [filename, setFilename] = useState("document");
    const [isGenerating, setIsGenerating] = useState(false);

    // File Upload Handler
    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setText(content);
                // Auto-set filename from uploaded file
                setFilename(file.name.replace(/\.[^/.]+$/, ""));
            };
            reader.readAsText(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/plain': ['.txt', '.md', '.json', '.csv'] },
        multiple: false
    });

    const generatePdf = async () => {
        setIsGenerating(true);
        try {
            // Initialize jsPDF
            // Unit: pt (points) is standard for typography
            const { jsPDF } = await import("jspdf");
            const doc = new jsPDF({
                orientation: orientation as "portrait" | "landscape",
                unit: "pt",
                format: pageSize
            });

            // Set Font
            doc.setFont("helvetica", "normal");
            doc.setFontSize(fontSize);

            // Page Config
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 40; // 40pt margin
            const maxWidth = pageWidth - (margin * 2);

            // Validate Text
            const textToPrint = text || " ";

            // Logic to split text into lines that fit the page width
            const lines = doc.splitTextToSize(textToPrint, maxWidth);

            // Render text
            // Manual pagination loop
            let cursorY = margin + fontSize; // Start position
            const lineHeightPt = fontSize * lineHeight;

            lines.forEach((line: string) => {
                if (cursorY + lineHeightPt > pageHeight - margin) {
                    doc.addPage();
                    cursorY = margin + fontSize;
                }
                doc.text(line, margin, cursorY);
                cursorY += lineHeightPt;
            });

            // Save
            doc.save(`${filename}.pdf`);
        } catch (error) {
            console.error("PDF Generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Input Area */}
            <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="type" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="type">Type / Paste Text</TabsTrigger>
                        <TabsTrigger value="upload">Upload File</TabsTrigger>
                    </TabsList>

                    <TabsContent value="type" className="mt-4">
                        <div className="relative">
                            <Textarea
                                placeholder="Start typing or paste your text here..."
                                className="min-h-[500px] font-mono text-base p-6 resize-none shadow-sm focus-visible:ring-primary"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                                {text.length} characters
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="upload" className="mt-4">
                        <div
                            {...getRootProps()}
                            className={cn(
                                "border-2 border-dashed rounded-xl h-[500px] flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-900/30 dark:hover:bg-slate-900/50 p-12",
                                isDragActive ? "border-primary bg-primary/5" : "border-border"
                            )}
                            role="button"
                            aria-label="Upload text file dropzone"
                            tabIndex={0}
                        >
                            <input {...getInputProps()} />
                            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Upload className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {isDragActive ? "Drop text file here" : "Upload Text File"}
                            </h3>
                            <p className="text-muted-foreground max-w-sm">
                                Drag & drop .txt, .md, .json, or .csv files here to load their content.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Right Col: Settings & Actions */}
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
                                    <SelectItem value="legal">Legal</SelectItem>
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

                        {/* Font Size */}
                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between">
                                <Label>Font Size: {fontSize}pt</Label>
                            </div>
                            <Slider
                                value={[fontSize]}
                                min={8}
                                max={72}
                                step={1}
                                onValueChange={(val) => setFontSize(val[0])}
                            />
                        </div>

                        {/* Line Height */}
                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between">
                                <Label>Line Height: {lineHeight}x</Label>
                            </div>
                            <Slider
                                value={[lineHeight]}
                                min={1}
                                max={3}
                                step={0.1}
                                onValueChange={(val) => setLineHeight(val[0])}
                            />
                        </div>

                        <div className="pt-6 border-t">
                            <Button
                                className="w-full h-12 text-base shadow-lg shadow-primary/20"
                                onClick={generatePdf}
                                disabled={isGenerating || !text}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isGenerating ? "Generating..." : "Download PDF"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

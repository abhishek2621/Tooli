"use client";

import { useState } from "react";
import { Download, Upload, FileText, Settings2, Trash2, AlignLeft, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { FileDropzone } from "@/components/shared/file-dropzone";

export function TextToPdfConverter() {
    const [text, setText] = useState("");
    const [fontSize, setFontSize] = useState(12);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [pageSize, setPageSize] = useState("a4");
    const [orientation, setOrientation] = useState("portrait");
    const [filename, setFilename] = useState("document");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState("type");

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
                setActiveTab("type"); // Switch to view content
            };
            reader.readAsText(file);
        }
    };

    const generatePdf = async () => {
        setIsGenerating(true);
        try {
            const worker = new Worker(new URL('../../../workers/text-to-pdf.worker', import.meta.url));

            worker.onmessage = (e) => {
                const { type, blob, filename: outFilename } = e.data;

                if (type === 'DONE') {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${outFilename}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    setIsGenerating(false);
                    worker.terminate();
                } else if (type === 'ERROR') {
                    console.error("Text-to-PDF worker error:", e.data.message);
                    setIsGenerating(false);
                    worker.terminate();
                }
            };

            worker.postMessage({
                text,
                pageSize,
                orientation,
                fontSize,
                lineHeight,
                filename
            });
        } catch (error) {
            console.error("PDF Generation failed", error);
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Left Column: Input Area */}
            <div className="lg:col-span-8 space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="type">Type / Edit Text</TabsTrigger>
                        <TabsTrigger value="upload">Upload File</TabsTrigger>
                    </TabsList>

                    <TabsContent value="type" className="mt-6 animate-in fade-in-50 duration-300">
                        <div className="relative">
                            <Textarea
                                placeholder="Start typing or paste your text here to convert to PDF..."
                                className="min-h-[600px] font-mono text-base p-6 resize-none shadow-sm border-2 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border shadow-sm">
                                {text.length} characters
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="upload" className="mt-6 animate-in fade-in-50 duration-300">
                        <FileDropzone
                            onDrop={onDrop}
                            accept={{ 'text/plain': ['.txt', '.md', '.json', '.csv'] }}
                            title="Upload Text File"
                            description="Drag & drop .txt, .md, .json, or .csv files here"
                            className="min-h-[400px]"
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Right Column: Settings & Actions */}
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

                        {/* Document Settings */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                <FileText className="h-4 w-4" /> Layout
                            </h4>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label className="text-xs">Page Size</Label>
                                    <Select value={pageSize} onValueChange={setPageSize}>
                                        <SelectTrigger className="h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="a4">A4</SelectItem>
                                            <SelectItem value="letter">Letter</SelectItem>
                                            <SelectItem value="legal">Legal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs">Orientation</Label>
                                    <Select value={orientation} onValueChange={setOrientation}>
                                        <SelectTrigger className="h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="portrait">Portrait</SelectItem>
                                            <SelectItem value="landscape">Landscape</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Typography Settings */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                <Type className="h-4 w-4" /> Typography
                            </h4>

                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label className="text-xs">Font Size</Label>
                                        <span className="text-xs text-muted-foreground">{fontSize}pt</span>
                                    </div>
                                    <Slider
                                        value={[fontSize]}
                                        min={8}
                                        max={32}
                                        step={1}
                                        onValueChange={(val) => setFontSize(val[0])}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label className="text-xs">Line Spacing</Label>
                                        <span className="text-xs text-muted-foreground">{lineHeight}x</span>
                                    </div>
                                    <Slider
                                        value={[lineHeight]}
                                        min={1}
                                        max={2.5}
                                        step={0.1}
                                        onValueChange={(val) => setLineHeight(val[0])}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="pt-2">
                            <Button
                                className="w-full h-11 text-base shadow-sm"
                                onClick={generatePdf}
                                disabled={isGenerating || !text.trim()}
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

"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Share2, Type, Link as LinkIcon, Mail, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function QrCodeGenerator() {
    const [value, setValue] = useState("https://example.com");
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("L");
    const [includeMargin, setIncludeMargin] = useState(true);

    const svgRef = useRef<SVGSVGElement>(null);

    const downloadQrCode = () => {
        if (!svgRef.current) return;

        const svgData = new XMLSerializer().serializeToString(svgRef.current);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx?.drawImage(img, 0, 0);

            const pngFile = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.download = "qrcode.png";
            downloadLink.href = pngFile;
            downloadLink.click();

            URL.revokeObjectURL(url);
        };

        img.src = url;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <Tabs defaultValue="url" className="w-full">
                            <TabsList className="w-full grid grid-cols-3 mb-6">
                                <TabsTrigger value="url" className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" /> URL
                                </TabsTrigger>
                                <TabsTrigger value="text" className="flex items-center gap-2">
                                    <Type className="h-4 w-4" /> Text
                                </TabsTrigger>
                                <TabsTrigger value="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> Email
                                </TabsTrigger>
                            </TabsList>

                            <div className="space-y-4">
                                <TabsContent value="url" className="mt-0">
                                    <Label htmlFor="url-input">Website URL</Label>
                                    <Input
                                        id="url-input"
                                        placeholder="https://example.com"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="h-12"
                                    />
                                </TabsContent>
                                <TabsContent value="text" className="mt-0">
                                    <Label htmlFor="text-input">Content</Label>
                                    <Input
                                        id="text-input"
                                        placeholder="Enter your text here"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="h-12"
                                    />
                                </TabsContent>
                                <TabsContent value="email" className="mt-0">
                                    <Label htmlFor="email-input">Email Address</Label>
                                    <Input
                                        id="email-input"
                                        placeholder="name@example.com"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="h-12"
                                    />
                                </TabsContent>
                            </div>
                        </Tabs>

                        <div className="space-y-6 pt-6 border-t">
                            <div className="flex items-center gap-2 font-medium text-muted-foreground">
                                <Settings2 className="h-4 w-4" />
                                <span>Customization</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fg-color">Foreground Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="fg-color"
                                            type="color"
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                            className="h-10 w-12 p-1 cursor-pointer"
                                        />
                                        <Input
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                            className="uppercase font-mono"
                                            maxLength={7}
                                            aria-label="Foreground color hex code"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bg-color">Background Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="bg-color"
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="h-10 w-12 p-1 cursor-pointer"
                                        />
                                        <Input
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="uppercase font-mono"
                                            maxLength={7}
                                            aria-label="Background color hex code"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>Size ({size}px)</Label>
                                </div>
                                <Slider
                                    value={[size]}
                                    min={128}
                                    max={1024}
                                    step={8}
                                    onValueChange={(vals) => setSize(vals[0])}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Error Correction</Label>
                                    <Select value={level} onValueChange={(v: "L" | "M" | "Q" | "H") => setLevel(v)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="L">Low (7%)</SelectItem>
                                            <SelectItem value="M">Medium (15%)</SelectItem>
                                            <SelectItem value="Q">Quartile (25%)</SelectItem>
                                            <SelectItem value="H">High (30%)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Format</Label>
                                    <Select defaultValue="png" disabled>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="png">PNG</SelectItem>
                                            <SelectItem value="svg">SVG</SelectItem>
                                            <SelectItem value="jpg">JPG</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Preview */}
            <div className="lg:col-span-5 space-y-6">
                <Card className="sticky top-24 overflow-hidden bg-slate-50 dark:bg-slate-900 border-none shadow-lg">
                    <CardContent className="p-8 flex flex-col items-center gap-8">
                        <div
                            className="bg-white p-4 rounded-xl shadow-sm"
                            style={{ background: bgColor }}
                        >
                            <QRCodeSVG
                                ref={svgRef}
                                value={value}
                                size={256} // Always show preview at generic size, but scale export
                                bgColor={bgColor}
                                fgColor={fgColor}
                                level={level}
                                includeMargin={includeMargin}
                                className="max-w-full h-auto"
                            />
                        </div>

                        <div className="space-y-4 w-full text-center">
                            <h3 className="font-semibold text-lg">Your QR Code is ready!</h3>
                            <Button
                                size="lg"
                                className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
                                onClick={downloadQrCode}
                            >
                                <Download className="h-5 w-5 mr-2" /> Download PNG
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

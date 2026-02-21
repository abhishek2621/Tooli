"use client";

import { useState } from "react";
import { Copy, Trash2, AlignLeft, CaseSensitive, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function WordCounter() {
    const [text, setText] = useState("");
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length;
    const readTime = Math.ceil(words / 200); // Avg reading speed 200 wpm

    const stats = { words, characters, sentences, paragraphs, readTime };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        setText("");
    };

    const handleCaseChange = (type: "upper" | "lower" | "title" | "sentence") => {
        let newText = text;
        if (type === "upper") newText = text.toUpperCase();
        if (type === "lower") newText = text.toLowerCase();
        if (type === "title") {
            newText = text.toLowerCase().split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        }
        if (type === "sentence") {
            newText = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        }
        setText(newText);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Enter Text
                    </Label>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleClear} className="h-8">
                            <Trash2 className="h-4 w-4 mr-2" /> Clear
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
                            <Copy className="h-4 w-4 mr-2" /> Copy
                        </Button>
                    </div>
                </div>

                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="min-h-[400px] text-lg p-6 leading-relaxed resize-y bg-slate-50 dark:bg-slate-900 border-2 focus-visible:ring-primary/20"
                />

                <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleCaseChange("upper")}>UPPERCASE</Button>
                    <Button variant="secondary" size="sm" onClick={() => handleCaseChange("lower")}>lowercase</Button>
                    <Button variant="secondary" size="sm" onClick={() => handleCaseChange("title")}>Title Case</Button>
                    <Button variant="secondary" size="sm" onClick={() => handleCaseChange("sentence")}>Sentence case</Button>
                </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
                <Card className="sticky top-24">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <AlignLeft className="h-5 w-5 text-primary" />
                            Statistics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-primary/5 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold text-primary">{stats.words}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Words</div>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold">{stats.characters}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Characters</div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Sentences</span>
                                <span className="font-semibold">{stats.sentences}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Paragraphs</span>
                                <span className="font-semibold">{stats.paragraphs}</span>
                            </div>
                            <div className="flex justify-between items-center bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                                <span className="text-green-700 dark:text-green-400 font-medium">Reading Time</span>
                                <span className="font-bold text-green-700 dark:text-green-400">~ {stats.readTime} min</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

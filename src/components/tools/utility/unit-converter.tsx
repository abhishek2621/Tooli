"use client";

import { useState, useEffect } from "react";
import { Copy, ArrowRightLeft, Check, Ruler, Scale, Pipette, Thermometer, Database, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { unitCategories, units, convertUnit, UnitCategory } from "@/lib/converters";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// Map icons to categories
const CategoryIcons: Record<string, any> = {
    length: Ruler,
    mass: Scale,
    volume: Pipette,
    temperature: Thermometer,
    digital: Database
};

export function UnitConverter() {
    const [category, setCategory] = useState<UnitCategory>("length");
    const [amount, setAmount] = useState<string>("1"); // String to allow empty input
    const [fromUnit, setFromUnit] = useState<string>(units["length"][0].id);
    const [toUnit, setToUnit] = useState<string>(units["length"][1].id);
    const [result, setResult] = useState<number>(0);
    const [copied, setCopied] = useState(false);

    // Initial default setup when category changes
    useEffect(() => {
        const catUnits = units[category];
        if (catUnits && catUnits.length >= 2) {
            // Keep existing selections if valid, else reset
            const validFrom = catUnits.find(u => u.id === fromUnit);
            const validTo = catUnits.find(u => u.id === toUnit);

            if (!validFrom) setFromUnit(catUnits[0].id);
            if (!validTo) setToUnit(catUnits[1].id);
        }
    }, [category]); // Removed fromUnit, toUnit from dependencies to prevent loop

    // Calculate result
    useEffect(() => {
        const val = parseFloat(amount);
        if (isNaN(val)) {
            setResult(0);
            return;
        }

        const res = convertUnit(val, fromUnit, toUnit, category);
        setResult(res);
    }, [amount, fromUnit, toUnit, category]);

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setAmount(formatResult(result)); // Also swap the value to keep context? Or just units. Usually users want to reverse calculation.
    };

    const copyResult = () => {
        navigator.clipboard.writeText(formatResult(result));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatResult = (num: number) => {
        // Avoid scientific notation for reasonably small numbers if possible, or just standard tostring
        if (num === 0) return "0";
        // Check if integer
        if (Number.isInteger(num)) return num.toString();
        // Float logic
        return parseFloat(num.toFixed(6)).toString();
    };

    const CurrentIcon = CategoryIcons[category] || Ruler;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Left Column: Input Area */}
            <div className="lg:col-span-8 space-y-6">
                <Card className="border-2 border-dashed shadow-none bg-slate-50/50 dark:bg-slate-900/20 min-h-[400px] flex flex-col justify-center">
                    <CardContent className="p-8 sm:p-12 space-y-12">

                        {/* Category Selector as Tabs inside the main area for focus */}
                        <div className="flex justify-center">
                            <Tabs
                                value={category}
                                onValueChange={(v) => setCategory(v as UnitCategory)}
                                className="w-full max-w-2xl"
                            >
                                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto p-1.5 bg-background border shadow-sm rounded-xl">
                                    {Object.entries(unitCategories).map(([key, label]) => {
                                        const Icon = CategoryIcons[key];
                                        return (
                                            <TabsTrigger
                                                key={key}
                                                value={key}
                                                className="rounded-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all flex flex-col items-center gap-1.5"
                                            >
                                                {Icon && <Icon className="h-4 w-4" />}
                                                <span className="text-xs font-medium">{label}</span>
                                            </TabsTrigger>
                                        );
                                    })}
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* Conversion Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-3xl mx-auto w-full">
                            {/* From Section */}
                            <div className="space-y-4 bg-background p-6 rounded-2xl border shadow-sm ring-offset-background transition-all focus-within:ring-2 focus-within:ring-primary/20">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wider font-bold ml-1">Input</Label>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="text-4xl font-bold h-16 border-none shadow-none bg-transparent p-0 focus-visible:ring-0 tracking-tight"
                                    placeholder="0"
                                />
                                <Separator />
                                <Select value={fromUnit} onValueChange={setFromUnit}>
                                    <SelectTrigger className="w-full border-0 bg-muted/50 shadow-none h-12 font-medium">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {units[category]?.map((u: any) => (
                                            <SelectItem key={u.id} value={u.id}>{u.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Swap Button */}
                            <div className="flex justify-center -my-3 md:my-0 z-10">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-12 w-12 bg-background border-2 shadow-sm hover:border-primary hover:text-primary transition-all active:scale-95"
                                    onClick={handleSwap}
                                    aria-label="Swap units"
                                >
                                    <ArrowRightLeft className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* To Section */}
                            <div className="space-y-4 bg-primary/5 p-6 rounded-2xl border border-primary/10 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                                <Label className="text-xs text-primary/80 uppercase tracking-wider font-bold ml-1">Result</Label>
                                <div className="flex items-center justify-between h-16">
                                    <span className="text-4xl font-bold text-primary tracking-tight truncate pr-4">
                                        {formatResult(result)}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={copyResult}
                                        className="h-10 w-10 text-primary/60 hover:text-primary hover:bg-primary/10 rounded-full"
                                    >
                                        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                    </Button>
                                </div>
                                <Separator className="bg-primary/10" />
                                <Select value={toUnit} onValueChange={setToUnit}>
                                    <SelectTrigger className="w-full border-0 bg-background/50 shadow-none h-12 font-medium focus:ring-primary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {units[category]?.map((u: any) => (
                                            <SelectItem key={u.id} value={u.id}>{u.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Info Panel (Sticky) */}
            <div className="lg:col-span-4 sticky top-6 space-y-4">
                <Card className="border-2 shadow-sm">
                    <CardHeader className="pb-4 border-b bg-muted/20">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <CurrentIcon className="h-4 w-4" />
                            Conversion Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-4">
                            <div className="p-4 bg-muted/30 rounded-lg space-y-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Formula</p>
                                <p className="font-mono text-sm break-words">
                                    <span className="text-primary font-bold">1</span> {units[category].find(u => u.id === fromUnit)?.label} =
                                    <br />
                                    <span className="text-primary font-bold">{formatResult(convertUnit(1, fromUnit, toUnit, category))}</span> {units[category].find(u => u.id === toUnit)?.label}
                                </p>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <h4 className="font-medium text-sm">Common Conversions</h4>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    {/* Simple examples based on category */}
                                    {category === 'length' && (
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>1 Kilometer = 1000 Meters</li>
                                            <li>1 Mile ≈ 1.609 Kilometers</li>
                                            <li>1 Inch = 2.54 Centimeters</li>
                                        </ul>
                                    )}
                                    {category === 'mass' && (
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>1 Kilogram = 1000 Grams</li>
                                            <li>1 Pound ≈ 0.453 Kilograms</li>
                                            <li>1 Ounce ≈ 28.35 Grams</li>
                                        </ul>
                                    )}
                                    {/* Add others or keep generic */}
                                    {!['length', 'mass'].includes(category) && (
                                        <p>Type values on the left to instantly see conversions.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

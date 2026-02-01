"use client";

import { useState, useEffect } from "react";
import { Copy, ArrowRightLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { unitCategories, units, convertUnit, UnitCategory } from "@/lib/converters";
import { cn } from "@/lib/utils";

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
    }, [category, fromUnit, toUnit]);

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
    };

    const copyResult = () => {
        navigator.clipboard.writeText(formatResult(result));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatResult = (num: number) => {
        // Dynamic precision: if integer, show integer. If float, show up to 6 decimal places but strip zeros.
        return parseFloat(num.toFixed(6)).toString();
    };

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-lg">
            <CardContent className="p-6 sm:p-8 space-y-8">
                {/* Category Tabs */}
                <Tabs
                    value={category}
                    onValueChange={(v) => setCategory(v as UnitCategory)}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-muted/50 rounded-xl">
                        {Object.entries(unitCategories).map(([key, label]) => (
                            <TabsTrigger
                                key={key}
                                value={key}
                                className="rounded-lg py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                            >
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    {/* From Section */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-transparent focus-within:border-primary/20 transition-colors">
                        <Label htmlFor="from-amount" className="text-xs text-muted-foreground uppercase tracking-wider font-semibold ml-1">From</Label>
                        <div className="flex gap-2">
                            <Input
                                id="from-amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="text-2xl font-bold h-12 border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
                                placeholder="0"
                            />
                        </div>
                        <Select value={fromUnit} onValueChange={setFromUnit}>
                            <SelectTrigger className="w-full border-0 bg-background shadow-sm h-10" aria-label="From Unit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {units[category].map((u) => (
                                    <SelectItem key={u.id} value={u.id}>{u.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-2 md:my-0 z-10">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-10 w-10 bg-background shadow-sm hover:border-primary/50 hover:text-primary transition-colors"
                            onClick={handleSwap}
                            aria-label="Swap units"
                        >
                            <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* To Section */}
                    <div className="space-y-3 bg-primary/5 p-5 rounded-2xl border border-primary/10">
                        <Label htmlFor="to-unit-select" className="text-xs text-primary/70 uppercase tracking-wider font-semibold ml-1">To</Label>
                        <div className="flex gap-2 items-center justify-between h-12">
                            <span className="text-2xl font-bold text-primary truncate">
                                {formatResult(result)}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-primary/60 hover:text-primary hover:bg-primary/10"
                                onClick={copyResult}
                                title="Copy result"
                                aria-label="Copy result"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Select value={toUnit} onValueChange={setToUnit}>
                            <SelectTrigger id="to-unit-select" className="w-full border-0 bg-background shadow-sm h-10 ring-offset-primary/5 focus:ring-primary/20" aria-label="To Unit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {units[category].map((u) => (
                                    <SelectItem key={u.id} value={u.id}>{u.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Formula / Info (Optional) */}
                <div className="text-center text-sm text-muted-foreground pt-4">
                    Converting <span className="font-medium text-foreground">{1} {units[category].find(u => u.id === fromUnit)?.label}</span> = <span className="font-medium text-foreground">{formatResult(convertUnit(1, fromUnit, toUnit, category))} {units[category].find(u => u.id === toUnit)?.label}</span>
                </div>
            </CardContent>
        </Card>
    );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function GSTCalculatorForm() {
    const [amount, setAmount] = useState<number | string>(1000); // Allow string for better typing exp
    const [rate, setRate] = useState<number>(18);

    const numAmount = Number(amount) || 0;
    const gstAmount = (numAmount * rate) / 100;
    const totalAmount = numAmount + gstAmount;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Calculate GST</CardTitle>
                <CardDescription>Enter the amount and select the tax slab.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Net Amount (₹)</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="e.g. 5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>GST Slab</Label>
                        <div className="flex flex-wrap gap-2">
                            {[5, 12, 18, 28].map((slab) => (
                                <Button
                                    key={slab}
                                    variant={rate === slab ? "default" : "outline"}
                                    onClick={() => setRate(slab)}
                                    className="flex-1"
                                >
                                    {slab}%
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-slate-50 dark:bg-slate-900 border p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">GST Amount ({rate}%):</span>
                        <span className="font-medium font-mono text-base text-red-600 dark:text-red-400">
                            + ₹{gstAmount.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-dashed">
                        <span className="font-semibold">Gross Total:</span>
                        <span className="font-bold text-2xl font-mono text-primary">₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
                <Button variant="outline" className="w-full" onClick={() => { setAmount(0); setRate(18) }}>Reset</Button>
                <Button className="w-full">Print / Save PDF</Button>
            </CardFooter>
        </Card>
    )
}

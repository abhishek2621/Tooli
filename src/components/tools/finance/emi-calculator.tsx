"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { IndianRupee, Calculator, Percent, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface EMIResult {
    monthlyEMI: number;
    totalInterest: number;
    totalAmount: number;
}

export function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(10.5);
    const [tenure, setTenure] = useState(5);
    const [tenureType, setTenureType] = useState<"years" | "months">("years");
    const [result, setResult] = useState<EMIResult | null>(null);

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, tenure, tenureType]);

    const calculateEMI = () => {
        const principal = loanAmount;
        const ratePerMonth = interestRate / 12 / 100;
        const months = tenureType === "years" ? tenure * 12 : tenure;

        // EMI Formula: P x R x (1+R)^N / [(1+R)^N-1]

        let emi = 0;
        if (ratePerMonth === 0) {
            emi = principal / months;
        } else {
            emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) /
                (Math.pow(1 + ratePerMonth, months) - 1);
        }

        const totalAmount = emi * months;
        const totalInterest = totalAmount - principal;

        setResult({
            monthlyEMI: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalAmount: Math.round(totalAmount)
        });
    };

    const data = result ? [
        { name: 'Principal Amount', value: loanAmount, color: '#94a3b8' }, // Slate 400
        { name: 'Total Interest', value: result.totalInterest, color: '#ef4444' }, // Red 500
    ] : [];

    const formatRupee = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-primary" />
                        Loan Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Loan Amount */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Loan Amount</Label>
                            <div className="relative w-36">
                                <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="pl-8 text-right"
                                />
                            </div>
                        </div>
                        <Slider
                            value={[loanAmount]}
                            min={10000}
                            max={10000000}
                            step={10000}
                            onValueChange={(val) => setLoanAmount(val[0])}
                        />
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Interest Rate (p.a)</Label>
                            <div className="relative w-36">
                                <Input
                                    type="number"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="pr-8 text-right"
                                />
                                <Percent className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                        <Slider
                            value={[interestRate]}
                            min={1}
                            max={30}
                            step={0.1}
                            onValueChange={(val) => setInterestRate(val[0])}
                        />
                    </div>

                    {/* Tenure */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Loan Tenure</Label>
                            <div className="flex gap-2 w-48">
                                <Input
                                    type="number"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="text-right flex-1"
                                />
                                <Select
                                    value={tenureType}
                                    onValueChange={(v) => setTenureType(v as "years" | "months")}
                                >
                                    <SelectTrigger className="w-24">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="years">Yr</SelectItem>
                                        <SelectItem value="months">Mo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Slider
                            value={[tenure]}
                            min={1}
                            max={tenureType === "years" ? 30 : 360}
                            step={1}
                            onValueChange={(val) => setTenure(val[0])}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Result Section */}
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Repayment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {result && (
                        <>
                            {/* EMI Highlight */}
                            <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/20">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Monthly EMI</span>
                                <div className="text-4xl font-bold text-primary mt-2">
                                    {formatRupee(result.monthlyEMI)}
                                </div>
                            </div>

                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number | undefined) => formatRupee(value || 0)}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-muted-foreground">Principal Loan</span>
                                    <span className="font-semibold">{formatRupee(loanAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-muted-foreground">Total Interest</span>
                                    <span className="font-semibold text-red-500">{formatRupee(result.totalInterest)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border-t-2 border-slate-200 dark:border-slate-800">
                                    <span className="font-bold">Total Amount</span>
                                    <span className="font-bold">{formatRupee(result.totalAmount)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

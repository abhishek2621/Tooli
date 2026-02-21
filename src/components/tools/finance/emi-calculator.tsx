"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { IndianRupee, Calculator, Percent } from "lucide-react";
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

// Load heavy charts only when needed
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import("recharts").then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then(mod => mod.Cell), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import("recharts").then(mod => mod.Legend), { ssr: false });


export function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(10.5);
    const [tenure, setTenure] = useState(5);
    const [tenureType, setTenureType] = useState<"years" | "months">("years");

    // Optimization: Memorialize calculation result
    const result = useMemo(() => {
        const principal = loanAmount;
        const ratePerMonth = interestRate / 12 / 100;
        const months = tenureType === "years" ? tenure * 12 : tenure;

        let emi = 0;
        if (ratePerMonth === 0) {
            emi = principal / months;
        } else {
            emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) /
                (Math.pow(1 + ratePerMonth, months) - 1);
        }

        const totalAmount = emi * months;
        const totalInterest = totalAmount - principal;

        return {
            monthlyEMI: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalAmount: Math.round(totalAmount)
        };
    }, [loanAmount, interestRate, tenure, tenureType]);

    const chartData = useMemo(() => [
        { name: 'Principal Amount', value: loanAmount, color: '#94a3b8' },
        { name: 'Total Interest', value: result.totalInterest, color: '#ef4444' },
    ], [loanAmount, result.totalInterest]);

    const formatRupee = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-bold">
                        <Calculator className="h-5 w-5 text-primary" />
                        Loan Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="loan-amount" className="font-medium text-muted-foreground">Loan Amount</Label>
                            <div className="relative w-36">
                                <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="loan-amount"
                                    type="number"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="pl-8 text-right font-mono"
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

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="interest-rate" className="font-medium text-muted-foreground">Interest Rate (p.a)</Label>
                            <div className="relative w-36">
                                <Input
                                    id="interest-rate"
                                    type="number"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="pr-8 text-right font-mono"
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

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="loan-tenure" className="font-medium text-muted-foreground">Loan Tenure</Label>
                            <div className="flex gap-2 w-48">
                                <Input
                                    id="loan-tenure"
                                    type="number"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="text-right flex-1 font-mono"
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

            <Card className="h-fit">
                <CardHeader>
                    <CardTitle className="font-bold">Repayment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/20">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Estimated Monthly EMI</span>
                        <div className="text-5xl font-black text-primary mt-2">
                            {formatRupee(result.monthlyEMI)}
                        </div>
                    </div>

                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: unknown) => formatRupee(Number(value) || 0)}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <span className="text-muted-foreground font-medium">Principal Amount</span>
                            <span className="font-bold">{formatRupee(loanAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <span className="text-muted-foreground font-medium">Total Interest</span>
                            <span className="font-bold text-red-500">{formatRupee(result.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-primary/10 text-primary rounded-xl border-t-2 border-primary/20">
                            <span className="font-black">Total Payable</span>
                            <span className="font-black text-lg">{formatRupee(result.totalAmount)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

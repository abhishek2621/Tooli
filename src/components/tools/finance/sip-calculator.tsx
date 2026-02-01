"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { IndianRupee, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SIPResult {
    investedAmount: number;
    estimatedReturns: number;
    totalValue: number;
}

export function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);
    const [result, setResult] = useState<SIPResult | null>(null);

    useEffect(() => {
        calculateSIP();
    }, [monthlyInvestment, expectedReturn, timePeriod]);

    const calculateSIP = () => {
        const monthlyRate = expectedReturn / 12 / 100;
        const months = timePeriod * 12;

        // SIP Formula: P * ({[1 + i]^n - 1} / i) * (1 + i)
        // P = Monthly inv, i = monthly rate, n = months

        const totalValue = monthlyInvestment *
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate);

        const investedAmount = monthlyInvestment * months;
        const estimatedReturns = totalValue - investedAmount;

        setResult({
            investedAmount: Math.round(investedAmount),
            estimatedReturns: Math.round(estimatedReturns),
            totalValue: Math.round(totalValue)
        });
    };

    const data = result ? [
        { name: 'Invested Amount', value: result.investedAmount, color: '#94a3b8' }, // Slate 400
        { name: 'Est. Returns', value: result.estimatedReturns, color: '#22c55e' }, // Green 500
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
                        <TrendingUp className="h-5 w-5 text-primary" />
                        SIP Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Monthly Investment */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="monthly-investment">Monthly Investment</Label>
                            <div className="relative w-32">
                                <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="monthly-investment"
                                    type="number"
                                    value={monthlyInvestment}
                                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                    className="pl-8 text-right"
                                />
                            </div>
                        </div>
                        <Slider
                            value={[monthlyInvestment]}
                            min={500}
                            max={100000}
                            step={500}
                            onValueChange={(val) => setMonthlyInvestment(val[0])}
                            aria-label="Monthly Investment Slider"
                        />
                    </div>

                    {/* Expected Return */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="expected-return">Expected Return Rate (p.a)</Label>
                            <div className="relative w-32">
                                <Input
                                    id="expected-return"
                                    type="number"
                                    value={expectedReturn}
                                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                    className="pr-8 text-right"
                                />
                                <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
                            </div>
                        </div>
                        <Slider
                            value={[expectedReturn]}
                            min={1}
                            max={30}
                            step={0.5}
                            onValueChange={(val) => setExpectedReturn(val[0])}
                            aria-label="Expected Return Slider"
                        />
                    </div>

                    {/* Time Period */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="time-period">Time Period</Label>
                            <div className="relative w-32">
                                <Input
                                    id="time-period"
                                    type="number"
                                    value={timePeriod}
                                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                                    className="pr-12 text-right"
                                />
                                <span className="absolute right-3 top-2.5 text-muted-foreground">Yr</span>
                            </div>
                        </div>
                        <Slider
                            value={[timePeriod]}
                            min={1}
                            max={40}
                            step={1}
                            onValueChange={(val) => setTimePeriod(val[0])}
                            aria-label="Time Period Slider"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Result Section */}
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Projected Returns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {result && (
                        <>
                            <div className="h-[250px] w-full">
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
                                    <span className="text-muted-foreground">Invested Amount</span>
                                    <span className="font-semibold">{formatRupee(result.investedAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                    <span className="text-muted-foreground">Est. Returns</span>
                                    <span className="font-semibold text-green-600">{formatRupee(result.estimatedReturns)}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                                    <span className="font-bold text-primary">Total Value</span>
                                    <span className="font-bold text-xl text-primary">{formatRupee(result.totalValue)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

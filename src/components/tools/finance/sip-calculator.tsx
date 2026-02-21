"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { IndianRupee, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamic imports for charting libraries to keep bundle light
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import("recharts").then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then(mod => mod.Cell), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import("recharts").then(mod => mod.Legend), { ssr: false });

export function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);

    // Optimization: Memorialize calculations
    const result = useMemo(() => {
        const monthlyRate = expectedReturn / 12 / 100;
        const months = timePeriod * 12;

        const totalValue = monthlyInvestment *
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate);

        const investedAmount = monthlyInvestment * months;
        const estimatedReturns = totalValue - investedAmount;

        return {
            investedAmount: Math.round(investedAmount),
            estimatedReturns: Math.round(estimatedReturns),
            totalValue: Math.round(totalValue)
        };
    }, [monthlyInvestment, expectedReturn, timePeriod]);

    const chartData = useMemo(() => [
        { name: 'Invested Amount', value: result.investedAmount, color: '#94a3b8' },
        { name: 'Est. Returns', value: result.estimatedReturns, color: '#22c55e' },
    ], [result.investedAmount, result.estimatedReturns]);

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
                        <TrendingUp className="h-5 w-5 text-primary" />
                        SIP Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="monthly-investment" className="font-medium text-muted-foreground">Monthly Investment</Label>
                            <div className="relative w-32">
                                <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="monthly-investment"
                                    type="number"
                                    value={monthlyInvestment}
                                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                    className="pl-8 text-right font-mono"
                                />
                            </div>
                        </div>
                        <Slider
                            value={[monthlyInvestment]}
                            min={500}
                            max={100000}
                            step={500}
                            onValueChange={(val) => setMonthlyInvestment(val[0])}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="expected-return" className="font-medium text-muted-foreground">Expected Return Rate (p.a)</Label>
                            <div className="relative w-32">
                                <Input
                                    id="expected-return"
                                    type="number"
                                    value={expectedReturn}
                                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                    className="pr-8 text-right font-mono"
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
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="time-period" className="font-medium text-muted-foreground">Time Period (Years)</Label>
                            <div className="relative w-32">
                                <Input
                                    id="time-period"
                                    type="number"
                                    value={timePeriod}
                                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                                    className="pr-12 text-right font-mono"
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
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="h-fit">
                <CardHeader>
                    <CardTitle className="font-bold">Projected Wealth</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
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
                            <span className="text-muted-foreground font-medium">Invested Amount</span>
                            <span className="font-bold">{formatRupee(result.investedAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <span className="text-muted-foreground font-medium">Est. Returns</span>
                            <span className="font-bold text-green-600">{formatRupee(result.estimatedReturns)}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 bg-primary/10 text-primary rounded-xl border border-primary/20">
                            <span className="font-black">Total Wealth</span>
                            <span className="font-black text-2xl">{formatRupee(result.totalValue)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

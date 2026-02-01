"use client";

import { useState } from "react";
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, isValid } from "date-fns";
import { CalendarIcon, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function AgeCalculator() {
    // Default to a date 20 years ago for better UX
    const [date, setDate] = useState<Date | undefined>(
        new Date(new Date().setFullYear(new Date().getFullYear() - 20))
    );
    const [today, setToday] = useState<Date>(new Date());

    const calculateAge = () => {
        if (!date || !today) return null;

        const years = differenceInYears(today, date);
        const months = differenceInMonths(today, date) % 12;
        const days = differenceInDays(today, new Date(today.getFullYear(), today.getMonth() - months, today.getDate())); // Approx logic needs refining for exact days

        // More precise "age" usually is Years, Months, Days
        // We can use a simpler approach:

        let d1 = date.getDate();
        let m1 = date.getMonth() + 1;
        let y1 = date.getFullYear();

        let d2 = today.getDate();
        let m2 = today.getMonth() + 1;
        let y2 = today.getFullYear();

        let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (d1 > d2) {
            d2 = d2 + month[m2 - 1]; // Borrow days from prev month
            m2 = m2 - 1;
        }

        if (m1 > m2) {
            m2 = m2 + 12;
            y2 = y2 - 1;
        }

        const d = d2 - d1;
        const m = m2 - m1;
        const y = y2 - y1;

        // Extra stats
        const totalMonths = differenceInMonths(today, date);
        const totalWeeks = differenceInWeeks(today, date);
        const totalDays = differenceInDays(today, date);
        const totalHours = totalDays * 24;

        return {
            age: { years: y, months: m, days: d },
            stats: { totalMonths, totalWeeks, totalDays, totalHours }
        };
    };

    const result = calculateAge();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Enter Your Birth Date</CardTitle>
                    <CardDescription>Select the date you were born.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="dob-trigger">Date of Birth</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="dob-trigger"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                    captionLayout="dropdown"
                                    fromYear={1900}
                                    toYear={new Date().getFullYear()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="calc-date-trigger">Calculate Age At Date (Optional)</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="calc-date-trigger"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !today && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {today ? format(today, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={today}
                                    onSelect={(d) => d && setToday(d)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="pt-4">
                        <Button
                            className="w-full"
                            variant="secondary"
                            onClick={() => {
                                setDate(new Date(new Date().setFullYear(new Date().getFullYear() - 20)));
                                setToday(new Date());
                            }}
                        >
                            <RefreshCw className="mr-2 h-4 w-4" /> Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-900 border-dashed">
                <CardHeader>
                    <CardTitle>Your Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {result && date && today && (result.stats.totalDays >= 0) ? (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="text-center p-6 bg-background rounded-xl border shadow-sm">
                                <div className="text-4xl font-bold text-primary mb-1">
                                    {result.age.years}
                                </div>
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Years</div>

                                <div className="flex items-center justify-center gap-4 text-lg">
                                    <div className="flex flex-col items-center">
                                        <span className="font-semibold">{result.age.months}</span>
                                        <span className="text-xs text-muted-foreground">Months</span>
                                    </div>
                                    <div className="h-8 w-px bg-border"></div>
                                    <div className="flex flex-col items-center">
                                        <span className="font-semibold">{result.age.days}</span>
                                        <span className="text-xs text-muted-foreground">Days</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-background p-4 rounded-lg border text-center">
                                    <div className="text-xl font-bold">{result.stats.totalMonths.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Total Months</div>
                                </div>
                                <div className="bg-background p-4 rounded-lg border text-center">
                                    <div className="text-xl font-bold">{result.stats.totalWeeks.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Total Weeks</div>
                                </div>
                                <div className="bg-background p-4 rounded-lg border text-center">
                                    <div className="text-xl font-bold">{result.stats.totalDays.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Total Days</div>
                                </div>
                                <div className="bg-background p-4 rounded-lg border text-center">
                                    <div className="text-xl font-bold">{result.stats.totalHours.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Total Hours</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center py-12">
                            <CalendarIcon className="h-12 w-12 mb-4 opacity-20" />
                            <p>Enter your birth date <br />to see results.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

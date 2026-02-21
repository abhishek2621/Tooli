"use client";

import { useState, ElementType } from "react";
import { Calendar as CalendarIcon, Cake, Clock, Settings2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface AgeResult {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthday: Date;
    daysUntilBirthday: number;
}

const StatCard = ({ icon: Icon, label, value, unit }: { icon: ElementType, label: string, value: number, unit: string }) => (
    <div className="p-4 rounded-lg bg-muted/50 border hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">{value.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
    </div>
);

export function AgeCalculator() {
    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
    const [targetDate, setTargetDate] = useState<Date>(new Date());

    const calculateAge = (birth: Date, target: Date): AgeResult => {
        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;

        // Calculate next birthday
        const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < target) {
            nextBirthday.setFullYear(target.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.floor((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

        return {
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalMonths,
            totalHours,
            totalMinutes,
            nextBirthday,
            daysUntilBirthday
        };
    };

    const ageResult = birthDate ? calculateAge(birthDate, targetDate) : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Left Column: Results */}
            <div className="lg:col-span-8 space-y-6">
                {/* Main Age Display */}
                {ageResult ? (
                    <>
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-accent/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                    <Cake className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">Your Age</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-2 pb-8">
                                <div className="flex justify-center items-baseline gap-4 flex-wrap">
                                    <div className="text-center">
                                        <div className="text-6xl font-bold text-primary">{ageResult.years}</div>
                                        <div className="text-sm text-muted-foreground mt-1">Years</div>
                                    </div>
                                    <div className="text-4xl text-muted-foreground">·</div>
                                    <div className="text-center">
                                        <div className="text-6xl font-bold text-primary">{ageResult.months}</div>
                                        <div className="text-sm text-muted-foreground mt-1">Months</div>
                                    </div>
                                    <div className="text-4xl text-muted-foreground">·</div>
                                    <div className="text-center">
                                        <div className="text-6xl font-bold text-primary">{ageResult.days}</div>
                                        <div className="text-sm text-muted-foreground mt-1">Days</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="text-center space-y-2">
                                    <p className="text-sm text-muted-foreground">Next Birthday</p>
                                    <p className="text-lg font-semibold">{format(ageResult.nextBirthday, "MMMM dd, yyyy")}</p>
                                    <p className="text-sm text-primary font-medium">
                                        {ageResult.daysUntilBirthday === 0 ? "🎉 Today is your birthday!" : `${ageResult.daysUntilBirthday} days to go`}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detailed Statistics */}
                        <Card className="border shadow-none bg-muted/20">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" /> Detailed Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <StatCard icon={Clock} label="Total Months" value={ageResult.totalMonths} unit="months" />
                                <StatCard icon={Clock} label="Total Weeks" value={ageResult.totalWeeks} unit="weeks" />
                                <StatCard icon={Clock} label="Total Days" value={ageResult.totalDays} unit="days" />
                                <StatCard icon={Clock} label="Total Hours" value={ageResult.totalHours} unit="hours" />
                                <StatCard icon={Clock} label="Total Minutes" value={ageResult.totalMinutes} unit="minutes" />
                                <StatCard icon={CalendarIcon} label="Age in Years" value={ageResult.years} unit="years" />
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <Card className="border-2 border-dashed shadow-none bg-slate-50/50 dark:bg-slate-900/20 min-h-[400px] flex flex-col items-center justify-center">
                        <CardContent className="text-center p-12">
                            <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Select Your Birth Date</h3>
                            <p className="text-muted-foreground">
                                Choose your date of birth from the settings panel to calculate your exact age.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Right Column: Settings (Sticky) */}
            <div className="lg:col-span-4 sticky top-6 space-y-4">
                <Card className="border-2 shadow-sm">
                    <CardHeader className="pb-4 border-b bg-muted/20">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Settings2 className="h-4 w-4" />
                            Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {/* Birth Date Picker */}
                        <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal h-11",
                                            !birthDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {birthDate ? format(birthDate, "PPP") : "Pick your birth date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={birthDate}
                                        onSelect={setBirthDate}
                                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                        initialFocus
                                        captionLayout="dropdown"
                                        fromYear={1900}
                                        toYear={new Date().getFullYear()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Separator />

                        {/* Target Date Picker */}
                        <div className="space-y-2">
                            <Label>Calculate Age On</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal h-11"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(targetDate, "PPP")}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={targetDate}
                                        onSelect={(date) => date && setTargetDate(date)}
                                        disabled={(date) => birthDate ? date < birthDate : false}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setTargetDate(new Date())}
                            >
                                Reset to Today
                            </Button>
                        </div>

                        {birthDate && (
                            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                                <p className="text-xs text-muted-foreground mb-1">Birth Date</p>
                                <p className="font-medium">{format(birthDate, "MMMM dd, yyyy")}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

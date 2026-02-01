"use client";

import { useState, useEffect } from "react";
import { Plus, X, Globe, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

// Get all supported timezones
const ALL_ZONES = Intl.supportedValuesOf('timeZone');

// Common zones for quick access
const POPULAR_ZONES = [
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Asia/Kolkata",
    "Australia/Sydney",
    "Europe/Paris",
    "America/Los_Angeles",
];

export function TimezoneConverter() {
    // Base time is the source of truth (keep it as a timestamp number for easier slider math)
    const [baseTime, setBaseTime] = useState<number>(new Date().getTime());
    const [selectedZones, setSelectedZones] = useState<string[]>([
        Intl.DateTimeFormat().resolvedOptions().timeZone, // User's local time
        "UTC",
        "America/New_York",
        "Europe/London",
        "Asia/Tokyo"
    ]);
    const [openCombobox, setOpenCombobox] = useState(false);

    // Update base time every minute if user hasn't interacted recently? 
    // For a converter, usually you want it static once you start messing with it.
    // Let's just initialize it to now.

    const handleSliderChange = (value: number[]) => {
        // Slider value is minutes from midnight (0-1440)
        // We need to apply this to the current baseTime's date component *relative to the first zone*?
        // Or simpler: Just shift the baseTime by the difference.

        // Actually, a "time travel" slider usually shifts hours forward/backward from "now".
        // Let's make the slider a +/- 24h offset or similar.

        // Better UX: A time scrubber for the *first* card (Local time usually).
        // Let's implement a time scrubber that sets the hour/minute of the baseTime.

        const date = new Date(baseTime);
        date.setHours(0, 0, 0, 0); // Start of day
        date.setMinutes(value[0]);
        setBaseTime(date.getTime());
    };

    const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [hours, minutes] = e.target.value.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) return;

        const date = new Date(baseTime);
        date.setHours(hours);
        date.setMinutes(minutes);
        setBaseTime(date.getTime());
    };

    // Calculate minutes from midnight for the slider (based on local time for now)
    const getSliderValue = () => {
        const date = new Date(baseTime);
        return date.getHours() * 60 + date.getMinutes();
    };

    const addZone = (zone: string) => {
        if (!selectedZones.includes(zone)) {
            setSelectedZones([...selectedZones, zone]);
        }
        setOpenCombobox(false);
    };

    const removeZone = (zone: string) => {
        setSelectedZones(selectedZones.filter(z => z !== zone));
    };

    const formatTime = (time: number, zone: string) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: zone,
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }).format(new Date(time));
        } catch (e) {
            return "--:--";
        }
    };

    const formatDate = (time: number, zone: string) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: zone,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            }).format(new Date(time));
        } catch (e) {
            return "Invalid Zone";
        }
    };

    const getOffset = (zone: string) => {
        try {
            const date = new Date();
            const timeString = date.toLocaleString('en-US', { timeZone: zone, timeZoneName: 'shortOffset' });
            return timeString.split(' ').pop();
        } catch (e) {
            return "";
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Global Controls */}
            <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground mr-auto">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">Time Scrubber</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Input
                            type="time"
                            value={`${new Date(baseTime).getHours().toString().padStart(2, '0')}:${new Date(baseTime).getMinutes().toString().padStart(2, '0')}`}
                            onChange={handleTimeInputChange}
                            className="w-auto cursor-pointer"
                            aria-label="Time Scrubber Input"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setBaseTime(new Date().getTime())}
                        >
                            Reset to Now
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <Slider
                        value={[getSliderValue()]}
                        min={0}
                        max={1439} // 24 * 60 - 1
                        step={15}
                        onValueChange={handleSliderChange}
                        className="py-4"
                        aria-label="Time Scrubber Slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                        <span>12 AM</span>
                        <span>6 AM</span>
                        <span>12 PM</span>
                        <span>6 PM</span>
                        <span>11:59 PM</span>
                    </div>
                </div>
            </div>

            {/* Time Cards */}
            <div className="space-y-3">
                {selectedZones.map((zone) => (
                    <Card key={zone} className="overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <CardContent className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                                    <Globe className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-lg truncate mb-0.5">
                                        {zone.split('/').pop()?.replace(/_/g, ' ')}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{getOffset(zone)}</span>
                                        <span>•</span>
                                        <span>{formatDate(baseTime, zone)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                                <div className="text-right">
                                    <div className="text-2xl font-bold font-mono tracking-tight">
                                        {formatTime(baseTime, zone)}
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive"
                                    onClick={() => removeZone(zone)}
                                    aria-label={`Remove ${zone}`}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Add New Zone */}
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full h-12 border-dashed text-muted-foreground hover:text-primary hover:border-primary/50">
                            <Plus className="h-4 w-4 mr-2" /> Add Time Zone
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[300px]" align="center">
                        <Command>
                            <CommandInput placeholder="Search city or timezone..." />
                            <CommandList>
                                <CommandEmpty>No timezone found.</CommandEmpty>
                                <CommandGroup heading="Popular">
                                    {POPULAR_ZONES.map((zone) => (
                                        <CommandItem
                                            key={zone}
                                            value={zone}
                                            onSelect={() => addZone(zone)}
                                        >
                                            {zone.replace(/_/g, ' ')}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <CommandGroup heading="All Timezones">
                                    <ScrollArea className="h-[200px]">
                                        {ALL_ZONES.filter(z => !POPULAR_ZONES.includes(z)).map((zone) => (
                                            <CommandItem
                                                key={zone}
                                                value={zone}
                                                onSelect={() => addZone(zone)}
                                            >
                                                {zone.replace(/_/g, ' ')}
                                            </CommandItem>
                                        ))}
                                    </ScrollArea>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

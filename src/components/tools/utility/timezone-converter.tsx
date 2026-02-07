"use client";

import { useState } from "react";
import { Plus, X, Globe, Clock, Settings2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
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
import { Separator } from "@/components/ui/separator";

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
    "Asia/Dubai",
    "America/Chicago",
];

export function TimezoneConverter() {
    const [baseTime, setBaseTime] = useState<number>(new Date().getTime());
    const [selectedZones, setSelectedZones] = useState<string[]>([
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        "UTC",
        "America/New_York",
        "Europe/London",
    ]);
    const [openCombobox, setOpenCombobox] = useState(false);

    const handleSliderChange = (value: number[]) => {
        const date = new Date(baseTime);
        date.setHours(0, 0, 0, 0);
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
        if (selectedZones.length > 1) {
            setSelectedZones(selectedZones.filter(z => z !== zone));
        }
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Left Column: Time Zone Cards */}
            <div className="lg:col-span-8 space-y-4">
                {selectedZones.map((zone, index) => (
                    <Card
                        key={zone}
                        className={`overflow-hidden transition-all hover:shadow-md ${index === 0 ? 'border-2 border-primary/20 bg-primary/5' : 'bg-slate-50/50 dark:bg-slate-900/50'
                            }`}
                    >
                        <CardContent className="p-5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${index === 0
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                                    }`}>
                                    {index === 0 ? <MapPin className="h-6 w-6" /> : <Globe className="h-6 w-6" />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-xl truncate">
                                            {zone.split('/').pop()?.replace(/_/g, ' ')}
                                        </h3>
                                        {index === 0 && (
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                                Local
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-mono">{getOffset(zone)}</span>
                                        <span>•</span>
                                        <span>{formatDate(baseTime, zone)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                    <div className="text-3xl font-bold font-mono tracking-tight">
                                        {formatTime(baseTime, zone)}
                                    </div>
                                </div>
                                {selectedZones.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-destructive h-9 w-9"
                                        onClick={() => removeZone(zone)}
                                        aria-label={`Remove ${zone}`}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Add New Zone Button */}
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full h-14 border-2 border-dashed text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                        >
                            <Plus className="h-5 w-5 mr-2" /> Add Time Zone
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[320px]" align="center">
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
                                            disabled={selectedZones.includes(zone)}
                                        >
                                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
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
                                                disabled={selectedZones.includes(zone)}
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

            {/* Right Column: Time Controls (Sticky) */}
            <div className="lg:col-span-4 sticky top-6 space-y-4">
                <Card className="border-2 shadow-sm">
                    <CardHeader className="pb-4 border-b bg-muted/20">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Time Control
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {/* Time Input */}
                        <div className="space-y-2">
                            <Label>Set Time</Label>
                            <Input
                                type="time"
                                value={`${new Date(baseTime).getHours().toString().padStart(2, '0')}:${new Date(baseTime).getMinutes().toString().padStart(2, '0')}`}
                                onChange={handleTimeInputChange}
                                className="h-11 text-lg font-mono cursor-pointer"
                            />
                        </div>

                        <Separator />

                        {/* Time Slider */}
                        <div className="space-y-4">
                            <Label className="text-sm text-muted-foreground">Time Scrubber</Label>
                            <Slider
                                value={[getSliderValue()]}
                                min={0}
                                max={1439}
                                step={15}
                                onValueChange={handleSliderChange}
                                className="py-4"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                <span>12 AM</span>
                                <span>6 AM</span>
                                <span>12 PM</span>
                                <span>6 PM</span>
                                <span>11:59 PM</span>
                            </div>
                        </div>

                        <Separator />

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setBaseTime(new Date().getTime())}
                        >
                            Reset to Current Time
                        </Button>

                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                            <p className="text-xs text-muted-foreground mb-1">Current Selection</p>
                            <p className="font-mono font-medium text-sm">
                                {new Date(baseTime).toLocaleString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

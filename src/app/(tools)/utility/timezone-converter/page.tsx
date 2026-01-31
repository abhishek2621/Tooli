import type { Metadata } from 'next'
import { TimezoneConverter } from "@/components/tools/utility/timezone-converter";

export const metadata: Metadata = {
    title: 'Free Time Zone Converter | Meeting Planner',
    description: 'Convert time across different time zones instantly. Compare world clocks for international meeting scheduling.',
    keywords: ['time zone converter', 'world clock', 'meeting planner', 'pst to est', 'utc converter', 'time difference'],
}

export default function TimeZonePage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">Time Zone Converter</h1>
                <p className="text-lg text-muted-foreground">
                    Compare global times and schedule meetings easily.
                </p>
            </div>

            <TimezoneConverter />
        </div>
    )
}

import type { Metadata } from 'next'
import { TimezoneConverter } from "@/components/tools/utility/timezone-converter";

export const metadata: Metadata = {
    title: 'Time Zone Converter – Compare Time Across Countries',
    description: 'Convert time across different time zones instantly. Compare world clocks for international meeting scheduling. Free online tool.',
    keywords: ['time zone converter', 'world time converter', 'convert time zones online', 'time difference calculator'],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: 'https://www.tooli.in/utility/timezone-converter',
    },
}

export default function TimeZonePage() {
    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Time Zone Converter – Compare Time Across Countries</h1>
                <p className="text-lg text-muted-foreground">
                    Compare global times and schedule meetings easily.
                </p>
            </div>

            <TimezoneConverter />
        </div>
    )
}

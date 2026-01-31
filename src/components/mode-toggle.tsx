"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ModeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-16 h-8 rounded-full border bg-muted/30 opacity-50" />
        )
    }

    const isDark = resolvedTheme === "dark"

    return (
        <div
            className={cn(
                "relative flex w-16 h-8 cursor-pointer rounded-full p-1 transition-colors duration-300 items-center border",
                isDark ? "bg-slate-950 border-slate-800" : "bg-sky-100 border-sky-200"
            )}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            role="switch"
            aria-checked={isDark}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setTheme(isDark ? "light" : "dark")
                }
            }}
        >
            <div className="flex justify-between items-center w-full px-1">
                <Sun className={cn("h-4 w-4 text-amber-500 transition-opacity duration-300", isDark ? "opacity-50" : "opacity-100")} />
                <Moon className={cn("h-4 w-4 text-blue-400 transition-opacity duration-300", isDark ? "opacity-100" : "opacity-50")} />
            </div>

            <div
                className={cn(
                    "absolute top-1 left-1 h-6 w-6 rounded-full shadow-md transition-transform duration-300 flex items-center justify-center",
                    isDark ? "translate-x-8 bg-slate-800" : "translate-x-0 bg-white"
                )}
            >
                {isDark ? (
                    <Moon className="h-3 w-3 text-blue-200" />
                ) : (
                    <Sun className="h-3 w-3 text-amber-500" />
                )}
            </div>
            <span className="sr-only">Toggle theme</span>
        </div>
    )
}

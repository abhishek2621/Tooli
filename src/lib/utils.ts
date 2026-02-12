import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function triggerHaptic(pattern: number | number[] = 10) {
    if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate(pattern);
    }
}

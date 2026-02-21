const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

class RateCache<T> {
    private cache = new Map<string, CacheEntry<T>>();

    get(key: string): T | null {
        const entry = this.cache.get(key);
        
        if (!entry) return null;
        
        const isExpired = Date.now() - entry.timestamp > CACHE_DURATION_MS;
        
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }
        
        return entry.data;
    }

    set(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    clear(): void {
        this.cache.clear();
    }
}

const currencyCache = new RateCache<number>();

export async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs: number = 5000
): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function fetchCurrencyRate(
    from: string,
    to: string,
    fallbackRates: Record<string, number>
): Promise<{ rate: number; source: "api" | "fallback" }> {
    const cacheKey = `${from}-${to}`;
    
    const cached = currencyCache.get(cacheKey);
    if (cached !== null) {
        return { rate: cached, source: "api" };
    }

    try {
        const response = await fetchWithTimeout(
            `https://api.frankfurter.app/latest?amount=1&from=${from}&to=${to}`,
            {},
            5000
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const rate = data.rates[to];

        if (rate && typeof rate === "number") {
            currencyCache.set(cacheKey, rate);
            return { rate, source: "api" };
        }

        throw new Error("Invalid response format");
    } catch (error) {
        console.warn("Currency API failed, using fallback:", error);

        const fallback = getFallbackRate(from, to, fallbackRates);
        
        if (fallback !== null) {
            return { rate: fallback, source: "fallback" };
        }

        if (from === to) {
            return { rate: 1, source: "fallback" };
        }

        throw new Error("Could not fetch exchange rate");
    }
}

function getFallbackRate(
    from: string,
    to: string,
    fallbackRates: Record<string, number>
): number | null {
    const directKey = `${from}-${to}`;
    
    if (fallbackRates[directKey]) {
        return fallbackRates[directKey];
    }
    
    const reverseKey = `${to}-${from}`;
    if (fallbackRates[reverseKey]) {
        return 1 / fallbackRates[reverseKey];
    }
    
    if (from !== "USD" && to !== "USD") {
        const fromToUSD = fallbackRates[`${from}-USD`] || (1 / fallbackRates[`USD-${from}`]);
        const usdToTo = fallbackRates[`USD-${to}`] || (1 / fallbackRates[`${to}-USD`]);
        
        if (fromToUSD && usdToTo) {
            return fromToUSD * usdToTo;
        }
    }
    
    return null;
}

export function clearCurrencyCache(): void {
    currencyCache.clear();
}

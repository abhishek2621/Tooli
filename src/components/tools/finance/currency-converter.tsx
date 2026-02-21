"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRightLeft, RefreshCw, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import { withRetry } from "@/lib/errorHandler";

// Supported currencies with flags (subset of Frankfurter supported currencies)
const currencies = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
    { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
    { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
    { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
    { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
    { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
    { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
    { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
];

// Fallback rates for offline mode (approximate - updated periodically)
const fallbackRates: Record<string, number> = {
    "USD-INR": 83.5, "INR-USD": 0.012,
    "USD-EUR": 0.92, "EUR-USD": 1.09,
    "EUR-INR": 90.5, "INR-EUR": 0.011,
    "GBP-INR": 105.2, "INR-GBP": 0.0095,
    "USD-JPY": 149.5, "JPY-USD": 0.0067,
    "USD-AUD": 1.53, "AUD-USD": 0.65,
    "USD-CAD": 1.36, "CAD-USD": 0.74,
    "USD-CNY": 7.24, "CNY-USD": 0.14,
    "USD-SGD": 1.34, "SGD-USD": 0.75,
    "USD-AED": 3.67, "AED-USD": 0.27,
    "USD-THB": 35.2, "THB-USD": 0.028,
    "USD-CHF": 0.88, "CHF-USD": 1.14,
    "USD-HKD": 7.82, "HKD-USD": 0.13,
    "USD-MYR": 4.72, "MYR-USD": 0.21,
    // Cross rates
    "EUR-GBP": 0.86, "GBP-EUR": 1.16,
    "EUR-JPY": 162.5, "JPY-EUR": 0.0062,
    "GBP-JPY": 189.2, "JPY-GBP": 0.0053,
};

type FetchStatus = "idle" | "loading" | "success" | "error" | "offline";

export function CurrencyConverter() {
    const [amount, setAmount] = useState<string>("1");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [rate, setRate] = useState<number | null>(null);
    const [status, setStatus] = useState<FetchStatus>("idle");
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    const getFallbackRate = useCallback((from: string, to: string): number | null => {
        const directKey = `${from}-${to}`;

        if (fallbackRates[directKey]) {
            return fallbackRates[directKey];
        }

        // Try reverse
        const reverseKey = `${to}-${from}`;
        if (fallbackRates[reverseKey]) {
            return 1 / fallbackRates[reverseKey];
        }

        // Try via USD
        if (from !== "USD" && to !== "USD") {
            const fromToUSD = fallbackRates[`${from}-USD`] || (1 / fallbackRates[`USD-${from}`]);
            const usdToTo = fallbackRates[`USD-${to}`] || (1 / fallbackRates[`${to}-USD`]);

            if (fromToUSD && usdToTo) {
                return fromToUSD * usdToTo;
            }
        }

        return null;
    }, []);

    const fetchRate = useCallback(async () => {
        setStatus("loading");

        try {
            const fetchedRate = await withRetry(
                async () => {
                    const res = await fetch(
                        `https://api.frankfurter.app/latest?amount=1&from=${fromCurrency}&to=${toCurrency}`
                    );

                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }

                    const data = await res.json();
                    return data.rates[toCurrency];
                },
                {
                    maxRetries: 3,
                    delayMs: 1000,
                    backoffMultiplier: 2,
                }
            );

            setRate(fetchedRate);
            setLastUpdated(new Date().toLocaleTimeString());
            setStatus("success");
            setRetryCount(0);

        } catch (error) {
            console.error("Currency fetch error:", error);

            const fallback = getFallbackRate(fromCurrency, toCurrency);

            if (fallback) {
                setRate(fallback);
                setStatus("offline");

                if (retryCount > 0) {
                    toast.info("Using offline rates", {
                        description: "Could not fetch live rates. Showing approximate values."
                    });
                }
            } else if (fromCurrency === toCurrency) {
                setRate(1);
                setStatus("success");
            } else {
                setStatus("error");
                toast.error("Failed to fetch rates", {
                    description: "Please check your connection and try again."
                });
            }
        }
    }, [fromCurrency, toCurrency, getFallbackRate, retryCount]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStatus("idle");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRetryCount(0);
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (status === "idle") {
                fetchRate();
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [status, fetchRate]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
        fetchRate();
    };

    const convertedAmount = rate && !isNaN(parseFloat(amount))
        ? (parseFloat(amount) * rate).toFixed(2)
        : "---";

    const showOfflineIndicator = status === "offline" || (status === "error" && rate !== null);

    return (
        <Card className="w-full max-w-lg mx-auto shadow-lg">
            <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="flex justify-between items-center">
                    <span>Converter</span>
                    {status === "loading" && <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />}
                </CardTitle>
                <CardDescription>
                    Live exchange rates provided by Frankfurter API.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">

                {/* Amount Input */}
                <div className="space-y-2">
                    <Label htmlFor="amount-input">Amount</Label>
                    <Input
                        id="amount-input"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-lg font-semibold h-12"
                        placeholder="Enter amount"
                        min="0"
                    />
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                    {/* From Currency */}
                    <div className="space-y-2">
                        <Label htmlFor="from-currency">From</Label>
                        <Select value={fromCurrency} onValueChange={setFromCurrency}>
                            <SelectTrigger id="from-currency" className="h-12" aria-label="From Currency">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((c) => (
                                    <SelectItem key={c.code} value={c.code}>
                                        <span className="mr-2">{c.flag}</span>
                                        {c.code}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Swap Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full mb-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={handleSwap}
                        aria-label="Swap currencies"
                    >
                        <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                    </Button>

                    {/* To Currency */}
                    <div className="space-y-2">
                        <Label htmlFor="to-currency">To</Label>
                        <Select value={toCurrency} onValueChange={setToCurrency}>
                            <SelectTrigger id="to-currency" className="h-12" aria-label="To Currency">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((c) => (
                                    <SelectItem key={c.code} value={c.code}>
                                        <span className="mr-2">{c.flag}</span>
                                        {c.code}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Result Box */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 text-center space-y-2 border border-border/50">
                    <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                        {amount || "0"} {fromCurrency} =
                    </div>
                    {status === "loading" && !rate ? (
                        <div className="flex justify-center py-2">
                            <Skeleton className="h-10 w-32" />
                        </div>
                    ) : status === "error" && !rate ? (
                        <div className="py-4">
                            <Button variant="outline" onClick={handleRetry} className="gap-2">
                                <RefreshCw className="h-4 w-4" />
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <div className="text-4xl font-bold text-primary break-words">
                            {convertedAmount} <span className="text-xl text-primary/70">{toCurrency}</span>
                        </div>
                    )}

                    <div className="text-xs text-muted-foreground pt-2 flex items-center justify-center gap-1">
                        {rate && (
                            <>
                                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                            </>
                        )}
                    </div>
                </div>

                {lastUpdated && !showOfflineIndicator && (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/60">
                        <Info className="h-3 w-3" />
                        <span>Last updated: {lastUpdated}</span>
                    </div>
                )}

                {showOfflineIndicator && (
                    <div className="flex items-center justify-center gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-2 rounded text-center">
                        <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                        <span>Using offline rates. May not reflect current market values.</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

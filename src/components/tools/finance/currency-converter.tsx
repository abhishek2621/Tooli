"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCw, Info } from "lucide-react";
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

export function CurrencyConverter() {
    const [amount, setAmount] = useState<string>("1");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [rate, setRate] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    // Fallback rates for offline mode (approximate)
    const fallbackRates: Record<string, number> = {
        "USD-INR": 83.5, "INR-USD": 0.012,
        "USD-EUR": 0.92, "EUR-USD": 1.09,
        "EUR-INR": 90.5, "INR-EUR": 0.011,
        // Add more critical pairs if needed, or rely on base 1 logic
    };

    const fetchRate = async () => {
        setLoading(true);
        setError(null);
        try {
            // Check cache or fetch
            // Using frankfurter API: https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
            const res = await fetch(`https://api.frankfurter.app/latest?amount=1&from=${fromCurrency}&to=${toCurrency}`);

            if (!res.ok) throw new Error("Failed to fetch rates");

            const data = await res.json();
            const fetchedRate = data.rates[toCurrency];

            setRate(fetchedRate);
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            console.error("Currency fetch error:", err);
            // Try fallback
            const pair = `${fromCurrency}-${toCurrency}`;
            if (fallbackRates[pair]) {
                setRate(fallbackRates[pair]);
                setError("Using offline rates");
            } else if (fromCurrency === toCurrency) {
                setRate(1);
            } else {
                setError("Could not fetch live rate");
                setRate(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRate();
    }, [fromCurrency, toCurrency]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const convertedAmount = rate && !isNaN(parseFloat(amount))
        ? (parseFloat(amount) * rate).toFixed(2)
        : "---";

    return (
        <Card className="w-full max-w-lg mx-auto shadow-lg">
            <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="flex justify-between items-center">
                    <span>Converter</span>
                    {loading && <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />}
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
                    {loading && !rate ? (
                        <div className="flex justify-center py-2">
                            <Skeleton className="h-10 w-32" />
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
                        {/* {error && <span className="text-red-500 ml-2">({error})</span>} */}
                    </div>
                </div>

                {lastUpdated && !error && (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/60">
                        <Info className="h-3 w-3" />
                        <span>Last updated: {lastUpdated}</span>
                        {/* {loading && <span>(Refreshing...)</span>} */}
                    </div>
                )}

                {error && (
                    <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-2 rounded text-center">
                        ⚠️ Unable to fetch live rates. Showing estimates.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

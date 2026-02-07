"use client"

import { useState, useEffect } from "react"
import { Copy, RefreshCw, Check, Wand2, ShieldCheck, History, Settings2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface PasswordHistoryItem {
    id: string;
    value: string;
    strength: number;
    timestamp: number;
}

export function PasswordGeneratorForm() {
    const [length, setLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    const [password, setPassword] = useState("")
    const [strength, setStrength] = useState(0)
    const [copied, setCopied] = useState(false)
    const [history, setHistory] = useState<PasswordHistoryItem[]>([])

    const calculateStrength = (pass: string) => {
        let s = 0;
        if (pass.length > 8) s += 20;
        if (pass.length > 12) s += 20;
        if (/[A-Z]/.test(pass)) s += 15;
        if (/[a-z]/.test(pass)) s += 15;
        if (/[0-9]/.test(pass)) s += 15;
        if (/[^A-Za-z0-9]/.test(pass)) s += 15;
        return Math.min(s, 100);
    }

    const generatePassword = () => {
        let charset = ""
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (includeNumbers) charset += "0123456789"
        if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="

        if (charset === "") {
            setPassword("")
            setStrength(0)
            return
        }

        let retVal = ""
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n))
        }

        const newStrength = calculateStrength(retVal);
        setPassword(retVal)
        setStrength(newStrength)
        setCopied(false)

        // Add to history
        setHistory(prev => {
            const newItem: PasswordHistoryItem = {
                id: Math.random().toString(36).substring(7),
                value: retVal,
                strength: newStrength,
                timestamp: Date.now()
            };
            return [newItem, ...prev].slice(0, 10); // Keep last 10
        });
    }

    // Initial generation
    useEffect(() => {
        generatePassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const copyToClipboard = (text: string) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const getStrengthColor = (s: number) => {
        if (s < 40) return "bg-red-500";
        if (s < 70) return "bg-yellow-500";
        if (s < 90) return "bg-blue-500";
        return "bg-green-500";
    }

    const getStrengthLabel = (s: number) => {
        if (s < 40) return "Weak";
        if (s < 70) return "Fair";
        if (s < 90) return "Good";
        return "Strong";
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
            {/* Left Column: Result & History */}
            <div className="lg:col-span-8 space-y-6">
                {/* Main Display Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-accent/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Generated Password</CardTitle>
                        <CardDescription>Secure, random, and unique</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-2 pb-8">
                        <div className="relative group max-w-2xl mx-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative flex flex-col items-center justify-center p-8 bg-background rounded-xl border shadow-sm">
                                <div className="w-full flex items-center justify-between gap-4">
                                    <code className="text-3xl md:text-4xl font-mono font-bold tracking-wider break-all text-primary text-center w-full select-all">
                                        {password || "Select Options"}
                                    </code>
                                </div>
                            </div>
                        </div>

                        {/* Actions & Strength */}
                        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                            <div className="flex items-center gap-4 w-full">
                                <Button
                                    size="lg"
                                    className="flex-1 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                                    onClick={() => copyToClipboard(password)}
                                    disabled={!password}
                                >
                                    {copied ? <Check className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
                                    {copied ? "Copied!" : "Copy Password"}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="h-12 w-12 px-0 shrink-0"
                                    onClick={generatePassword}
                                    title="Regenerate"
                                >
                                    <RefreshCw className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="w-full space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Strength</span>
                                    <span className={cn("font-medium",
                                        strength < 40 ? "text-red-500" :
                                            strength < 70 ? "text-yellow-500" :
                                                strength < 90 ? "text-blue-500" : "text-green-500"
                                    )}>
                                        {getStrengthLabel(strength)}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full transition-all duration-500 rounded-full", getStrengthColor(strength))}
                                        style={{ width: `${Math.max(5, strength)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* History Section */}
                {history.length > 1 && (
                    <Card className="border shadow-none bg-muted/20">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <History className="h-5 w-5" /> Recent Passwords
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {history.slice(1).map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-background border hover:border-primary/50 transition-colors group">
                                    <code className="font-mono text-sm truncate max-w-[200px] sm:max-w-md text-muted-foreground group-hover:text-foreground transition-colors">
                                        {item.value}
                                    </code>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-2 h-2 rounded-full", getStrengthColor(item.strength))} title={`Strength: ${item.strength}%`} />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => copyToClipboard(item.value)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-end pt-2">
                                <Button variant="ghost" size="sm" onClick={() => setHistory([])} className="text-muted-foreground hover:text-destructive text-xs">
                                    <Trash2 className="h-3 w-3 mr-1" /> Clear History
                                </Button>
                            </div>
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
                        {/* Length Slider */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="length" className="font-medium">Length</Label>
                                <span className="inline-flex items-center justify-center h-7 w-10 rounded-md bg-primary/10 text-primary text-sm font-bold shadow-sm">
                                    {length}
                                </span>
                            </div>
                            <Slider
                                id="length"
                                value={[length]}
                                min={4}
                                max={64}
                                step={1}
                                onValueChange={(vals) => setLength(vals[0])}
                                className="py-2"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                <span>4</span>
                                <span>32</span>
                                <span>64</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Character Options */}
                        <div className="space-y-3">
                            <Label className="font-medium text-sm text-muted-foreground">Characters</Label>
                            {[
                                { id: "uppercase", label: "Uppercase (A-Z)", checked: includeUppercase, set: setIncludeUppercase },
                                { id: "lowercase", label: "Lowercase (a-z)", checked: includeLowercase, set: setIncludeLowercase },
                                { id: "numbers", label: "Numbers (0-9)", checked: includeNumbers, set: setIncludeNumbers },
                                { id: "symbols", label: "Symbols (!@#$)", checked: includeSymbols, set: setIncludeSymbols },
                            ].map((opt) => (
                                <div
                                    key={opt.id}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                                    onClick={() => opt.set(!opt.checked)}
                                >
                                    <span className="text-sm">{opt.label}</span>
                                    <Switch
                                        id={opt.id}
                                        checked={opt.checked}
                                        onCheckedChange={opt.set}
                                    />
                                </div>
                            ))}
                        </div>

                        <Separator />

                        <Button
                            className="w-full h-11 text-base font-semibold"
                            onClick={generatePassword}
                        >
                            <Wand2 className="h-4 w-4 mr-2" /> Generate New
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

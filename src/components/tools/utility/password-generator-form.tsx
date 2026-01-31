"use client"

import { useState, useEffect } from "react"
import { Copy, RefreshCw, Check, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function PasswordGeneratorForm() {
    const [length, setLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    const [password, setPassword] = useState("")
    const [copied, setCopied] = useState(false)
    const [strength, setStrength] = useState(0)

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
        setPassword(retVal)
        setCopied(false)
        calculateStrength(retVal)
    }

    const calculateStrength = (pass: string) => {
        let s = 0;
        if (pass.length > 8) s += 20;
        if (pass.length > 12) s += 20;
        if (/[A-Z]/.test(pass)) s += 15;
        if (/[a-z]/.test(pass)) s += 15;
        if (/[0-9]/.test(pass)) s += 15;
        if (/[^A-Za-z0-9]/.test(pass)) s += 15;
        setStrength(Math.min(s, 100));
    }

    // Initial generation
    useEffect(() => {
        generatePassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const copyToClipboard = () => {
        if (!password) return
        navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card className="w-full glass-panel border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <CardHeader className="pb-2 text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent flex items-center justify-center gap-2">
                    <Wand2 className="h-6 w-6 text-primary" />
                    SecureGen
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground/80">
                    Generate unbreakable passwords in seconds
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 pt-6">
                {/* Result Display */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative flex flex-col items-center justify-center p-6 bg-background/80 backdrop-blur-xl rounded-xl border border-primary/10 shadow-inner">
                        <div className="w-full flex items-center justify-between gap-4">
                            <code className="flex-1 text-center text-2xl md:text-3xl font-mono font-semibold tracking-wider break-all text-primary select-all">
                                {password || "..."}
                            </code>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0 h-10 w-10 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                                onClick={copyToClipboard}
                                disabled={!password}
                            >
                                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                                <span className="sr-only">Copy password</span>
                            </Button>
                        </div>
                        {/* Strength Indicator */}
                        <div className="w-full mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-500 rounded-full",
                                    strength < 30 ? "bg-red-500" :
                                        strength < 60 ? "bg-yellow-500" :
                                            strength < 90 ? "bg-blue-500" : "bg-green-500"
                                )}
                                style={{ width: `${strength}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                    {/* Length Slider */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="length" className="text-base font-medium">Password Length</Label>
                            <span className="inline-flex items-center justify-center h-8 w-12 rounded-md bg-background border text-sm font-bold shadow-sm">
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
                            className="w-full py-2 hover:cursor-grab active:cursor-grabbing"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground px-1">
                            <span>4</span>
                            <span>32</span>
                            <span>64</span>
                        </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { id: "uppercase", label: "Uppercase (A-Z)", checked: includeUppercase, set: setIncludeUppercase },
                            { id: "lowercase", label: "Lowercase (a-z)", checked: includeLowercase, set: setIncludeLowercase },
                            { id: "numbers", label: "Numbers (0-9)", checked: includeNumbers, set: setIncludeNumbers },
                            { id: "symbols", label: "Symbols (!@#$)", checked: includeSymbols, set: setIncludeSymbols },
                        ].map((opt) => (
                            <div
                                key={opt.id}
                                className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors duration-200 cursor-pointer"
                                onClick={() => opt.set(!opt.checked)}
                            >
                                <Label htmlFor={opt.id} className="cursor-pointer font-medium">{opt.label}</Label>
                                <Switch
                                    id={opt.id}
                                    checked={opt.checked}
                                    onCheckedChange={opt.set}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pb-8">
                <Button
                    size="lg"
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                    onClick={generatePassword}
                >
                    <RefreshCw className={cn("mr-2 h-5 w-5", false && "animate-spin")} />
                    Generate New Password
                </Button>
            </CardFooter>
        </Card>
    )
}

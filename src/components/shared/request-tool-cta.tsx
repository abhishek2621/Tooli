"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus } from "lucide-react";
import { useState } from "react";

export function RequestToolCta() {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send to API/DB. Here we just mock it.
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setOpen(false);
        }, 2000);
    };

    return (
        <div className="rounded-2xl border bg-muted/30 p-8 text-center md:text-left md:flex md:items-center md:justify-between gap-6">
            <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">Missing a tool?</h3>
                <p className="text-muted-foreground max-w-md">
                    We are constantly adding new utilities. Let us know what you need and we will build it.
                </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" className="mt-4 md:mt-0 shrink-0">
                        <MessageSquarePlus className="mr-2 h-4 w-4" />
                        Request Feature
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request a New Tool</DialogTitle>
                        <DialogDescription>
                            Tell us what tool or calculator you want to see effectively next on Tooli.
                        </DialogDescription>
                    </DialogHeader>
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 dark:bg-green-900/30 dark:text-green-400">
                                <MessageSquarePlus className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-lg">Request Received!</h3>
                            <p className="text-muted-foreground text-sm mt-1">Thanks for your feedback.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email (Optional)</Label>
                                <Input id="email" type="email" placeholder="you@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="request">Tool Description</Label>
                                <Textarea
                                    id="request"
                                    placeholder="I need a tool that converts Markdown to HTML..."
                                    className="min-h-[100px]"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Submit Request
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

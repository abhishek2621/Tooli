import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Tooli - Privacy-First Online Tools",
    description: "Learn about Tooli's mission to provide free, secure, and client-side online tools for everyone.",
};

export default function AboutPage() {
    return (
        <div className="container max-w-4xl py-12 space-y-12">
            <section className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Tooli</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    We believe essential digital tools should be free, fast, and most importantly, private.
                </p>
            </section>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4 p-6 rounded-2xl bg-muted/30 border">
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        In a web filled with ad-cluttered, paywalled, and data-harvesting tool sites, Tooli stands apart.
                        Our goal is simple: Create the most useful collection of calculators and converters that respect your time and data.
                    </p>
                </div>
                <div className="space-y-4 p-6 rounded-2xl bg-muted/30 border">
                    <h2 className="text-2xl font-bold">How It Works</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Tooli uses modern web technologies (WebAssembly, Service Workers) to process your files
                        <strong> directly in your browser</strong>. Whether you're compressing a PDF or converting an image,
                        the file never leaves your device.
                    </p>
                </div>
            </div>

            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Why Choose Tooli?</h2>
                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="space-y-2 text-center p-4">
                        <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="font-bold">100% Private</h3>
                        <p className="text-sm text-muted-foreground">Your files never touch our servers. Everything happens on your device.</p>
                    </div>
                    <div className="space-y-2 text-center p-4">
                        <div className="mx-auto h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 mb-4">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="font-bold">Blazing Fast</h3>
                        <p className="text-sm text-muted-foreground">No upload or download wait times. Instant processing powered by your hardware.</p>
                    </div>
                    <div className="space-y-2 text-center p-4">
                        <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 mb-4">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold">Always Free</h3>
                        <p className="text-sm text-muted-foreground">No subscriptions, no hidden fees. Just useful tools for everyone.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

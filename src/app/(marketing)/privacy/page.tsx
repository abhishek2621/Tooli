import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Tooli",
    description: "Read our privacy policy to understand how Tooli protects your data.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: 'https://www.tooli.in/privacy',
    },
};

export default function PrivacyPage() {
    return (
        <div className="container max-w-3xl py-12 space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                <p className="text-muted-foreground">Last updated: August 14, 2026</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">1. Overview</h2>
                    <p className="text-muted-foreground">
                        At Tooli, we take your privacy seriously. Unlike most online tools, we have built our architecture
                        to ensure that <strong>your files never leave your device</strong>. When you use our PDF compressor,
                        image converter, or any other file-processing tool, the operation is performed locally in your browser.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">2. Data Collection</h2>
                    <p className="text-muted-foreground">
                        We do not collect, store, or transmit any of the files you process on Tooli.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><strong>Files:</strong> Your photos and key documents stay on your computer. We never see them.</li>
                        <li><strong>Personal Info:</strong> We do not require registration, email, or phone numbers.</li>
                        <li><strong>Analytics:</strong> We use privacy-friendly analytics solely to understand which tools are popular. This data is anonymized.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">3. Advertising & Cookies (Google AdSense)</h2>
                    <p className="text-muted-foreground">
                        We use Google AdSense to serve advertisements on our website to support our free service:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites.</li>
                        <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</li>
                        <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-primary underline">Google Ad Settings</a>, or by visiting <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-primary underline">www.aboutads.info</a> to opt out of a third-party vendor&apos;s use of cookies for personalized advertising.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">4. Local Storage</h2>
                    <p className="text-muted-foreground">
                        We may use your browser&apos;s local storage to save your preferences (like Dark/Light mode theme) or
                        temporary tool settings (like your last used image compression quality). This data stays on your device
                        and can be cleared by you at any time.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
                    <p className="text-muted-foreground">
                        We host this website on Vercel. While Vercel may log basic request data (like IP addresses) for security
                        and performance monitoring, this is standard for all websites and does not involve your processed files.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">6. Contact Us</h2>
                    <p className="text-muted-foreground">
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:abhishekkr2621@gmail.com" className="text-primary underline">abhishekkr2621@gmail.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}

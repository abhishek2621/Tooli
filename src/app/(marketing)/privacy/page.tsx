import { Metadata } from "next";
import Link from "next/link";

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
                <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
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
                        <li><strong>Files:</strong> Your photos key documents stay on your computer. We never see them.</li>
                        <li><strong>Personal Info:</strong> We do not require registration, email, or phone numbers.</li>
                        <li><strong>Analytics:</strong> We use privacy-friendly analytics solely to understand which tools are popular. This data is anonymized.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">3. Local Storage</h2>
                    <p className="text-muted-foreground">
                        We may use your browser's local storage to save your preferences (like Dark/Light mode theme) or
                        temporary tool settings (like your last used image compression quality). This data stays on your device
                        and can be cleared by you at any time.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
                    <p className="text-muted-foreground">
                        We host this website on Vercel. While Vercel may log basic request data (like IP addresses) for security
                        and performance monitoring, this is standard for all websites and does not involve your processed files.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">5. Contact Us</h2>
                    <p className="text-muted-foreground">
                        If you have any questions about this Privacy Policy, please contact us at privacy@tooli.com.
                    </p>
                </section>
            </div>
        </div>
    );
}

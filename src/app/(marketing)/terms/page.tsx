import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - Tooli",
    description: "Terms and conditions for using Tooli.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: 'https://www.tooli.in/terms',
    },
};

export default function TermsPage() {
    return (
        <div className="container max-w-3xl py-12 space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                        By accessing and using Tooli ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">2. Use License</h2>
                    <p className="text-muted-foreground">
                        Permission is granted to use Tooli for personal, non-commercial, or commercial transitory viewing only.
                        This is the grant of a license, not a transfer of title.
                    </p>
                    <p className="text-muted-foreground">
                        All tools provided are free to use. You may not attempt to reverse engineer any software contained on the Tooli website.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">3. Disclaimer</h2>
                    <p className="text-muted-foreground">
                        The materials on Tooli's website are provided on an 'as is' basis. Tooli makes no warranties, expressed or implied,
                        and hereby disclaims and negates all other warranties including, without limitation, implied warranties or
                        conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                    </p>
                    <p className="text-muted-foreground">
                        Further, Tooli does not warrant or make any representations concerning the accuracy, likely results, or reliability
                        of the use of the materials on its website. Calculations (financial, unit conversions, etc.) should be verified independently
                        before being relied upon for critical tasks.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">4. Limitations</h2>
                    <p className="text-muted-foreground">
                        In no event shall Tooli or its suppliers be liable for any damages (including, without limitation, damages for loss of
                        data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tooli's website.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">5. Modifications</h2>
                    <p className="text-muted-foreground">
                        Tooli may revise these terms of service for its website at any time without notice. By using this website you are
                        agreeing to be bound by the then current version of these terms of service.
                    </p>
                </section>
            </div>
        </div>
    );
}

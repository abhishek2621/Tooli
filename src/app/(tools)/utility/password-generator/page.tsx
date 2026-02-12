import type { Metadata } from 'next'
import { PasswordGeneratorForm } from '@/components/tools/utility/password-generator-form'
import { SEOContent } from "@/components/shared/seo-content";

export const metadata: Metadata = {
    title: 'Password Generator – Strong, Secure & Ad-Free',
    description: 'Generate strong, secure random passwords online. Ad-free, custom length and characters. Protect your accounts with this free tool.',
    keywords: ['password generator online', 'strong password generator', 'random password generator', 'secure password generator', 'ad-free password generator']
}

export default function PasswordGeneratorPage() {
    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Password Generator – Strong, Secure & Ad-Free</h1>
                <p className="text-lg text-muted-foreground">
                    Create strong, unique passwords with custom settings. Secure, ad-free, and client-side.
                </p>
            </div>

            <PasswordGeneratorForm />

            <SEOContent
                title="Password Security Guidelines 2026"
                items={[
                    {
                        heading: "Minimum Length",
                        content: "Use 16+ characters for maximum security. Longer passwords exponentially increase cracking time, protecting against brute force attacks."
                    },
                    {
                        heading: "Character Variety",
                        content: "Mix uppercase, lowercase, numbers, and symbols. Diverse character sets create 218 trillion possible combinations for a 12-character password."
                    },
                    {
                        heading: "Avoid Common Patterns",
                        content: "Never use dictionary words, birthdays, or sequential characters. 80% of data breaches involve weak or reused passwords."
                    },
                    {
                        heading: "Unique Per Account",
                        content: "Generate different passwords for each service. Password reuse across sites amplifies breach impact and compromises multiple accounts."
                    },
                    {
                        heading: "Password Managers",
                        content: "Store generated passwords in encrypted managers like Bitwarden or 1Password. Impossible to remember strong passwords for 100+ accounts."
                    },
                    {
                        heading: "Regular Updates",
                        content: "Change passwords every 90 days for sensitive accounts. Immediate reset if service reports data breach or suspicious activity detected."
                    }
                ]}
            />
        </div>
    )
}

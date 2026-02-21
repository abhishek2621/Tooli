import type { Metadata } from 'next'
import { PasswordGeneratorForm } from '@/components/tools/utility/password-generator-form'
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { PASSWORD_GENERATOR_FAQS } from "@/components/shared/faq-section";

export const metadata: Metadata = generateToolMetadata({
    title: 'Password Generator – Strong, Secure & Ad-Free',
    description: 'Generate strong, secure random passwords online. Ad-free, custom length and characters. Protect your accounts with this free tool.',
    canonical: 'https://www.tooli.in/utility/password-generator',
    keywords: ['password generator online', 'strong password generator', 'random password generator', 'secure password generator', 'ad-free password generator', 'password generator 2026'],
})

export default function PasswordGeneratorPage() {
    return (
        <ToolSEOWrapper
            title="Password Generator"
            description="Generate strong, secure random passwords online. Ad-free, custom length and characters."
            canonical="https://www.tooli.in/utility/password-generator"
            category="UtilitiesApplication"
            faqs={PASSWORD_GENERATOR_FAQS}
        >
            <div className="flex flex-col gap-2 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Password Generator – Strong, Secure & Ad-Free</h1>
                <p className="text-lg text-muted-foreground">
                    Create strong, unique passwords with custom settings. Secure, ad-free, and client-side.
                </p>
            </div>

            <PasswordGeneratorForm />
        </ToolSEOWrapper>
    )
}

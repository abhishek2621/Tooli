import type { Metadata } from 'next'
import { PasswordGeneratorForm } from '@/components/tools/utility/password-generator-form'

export const metadata: Metadata = {
    title: 'Password Generator – Create Strong & Secure Passwords',
    description: 'Generate strong, secure random passwords online. Custom length and characters. Protect your accounts with this free tool.',
    keywords: ['password generator online', 'strong password generator', 'random password generator', 'secure password generator']
}

export default function PasswordGeneratorPage() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex flex-col gap-2 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">Password Generator – Create Strong & Secure Passwords</h1>
                <p className="text-lg text-muted-foreground">
                    Create strong, unique passwords with custom settings. Secure and client-side.
                </p>
            </div>

            <PasswordGeneratorForm />
        </div>
    )
}

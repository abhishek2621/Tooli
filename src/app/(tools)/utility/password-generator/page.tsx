import type { Metadata } from 'next'
import { PasswordGeneratorForm } from '@/components/tools/utility/password-generator-form'

export const metadata: Metadata = {
    title: 'Strong Random Password Generator',
    description: 'Generate, random passwords to protect your accounts.',
}

export default function PasswordGeneratorPage() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex flex-col gap-2 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">Password Generator</h1>
                <p className="text-lg text-muted-foreground">
                    Create strong, unique passwords with custom settings.
                </p>
            </div>

            <PasswordGeneratorForm />
        </div>
    )
}

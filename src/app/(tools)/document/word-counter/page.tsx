import type { Metadata } from 'next'
import { WordCounter } from "@/components/tools/document/word-counter";

export const metadata: Metadata = {
    title: 'Free Word Counter | Character count, Sentence count',
    description: 'Count words, characters, sentences, and paragraphs in real-time. Also estimates reading time.',
    keywords: [
        'word counter', 'character counter', 'word count tool', 'sentence counter',
        'reading time calculator', 'text analyzer'
    ]
}

export default function WordCounterPage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Word Counter</h1>
                <p className="text-lg text-muted-foreground">
                    Analyze your text for word count, character count, and reading time.
                </p>
            </div>

            <WordCounter />
        </div>
    )
}

import type { Metadata } from 'next'
import { WordCounter } from "@/components/tools/document/word-counter";

export const metadata: Metadata = {
    title: 'Word Counter Online – Count Words & Characters',
    description: 'Count words, characters, sentences, and paragraphs in real-time. Also estimates reading time. Free online tool.',
    keywords: [
        'word counter online', 'character counter', 'sentence counter',
        'online word count tool', 'free word counter'
    ]
}

export default function WordCounterPage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Word Counter Online – Count Words & Characters</h1>
                <p className="text-lg text-muted-foreground">
                    Analyze your text for word count, character count, and reading time.
                </p>
            </div>

            <WordCounter />
        </div>
    )
}

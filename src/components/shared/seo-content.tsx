interface SEOContentProps {
    title: string;
    items: {
        heading: string;
        content: string;
    }[];
}

export function SEOContent({ title, items }: SEOContentProps) {
    return (
        <div className="prose prose-gray max-w-none dark:prose-invert mt-12 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border">
            <h2 className="text-xl font-bold mb-6">{title}</h2>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                        <strong className="text-foreground">{item.heading}:</strong>{' '}
                        <span className="text-muted-foreground">{item.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

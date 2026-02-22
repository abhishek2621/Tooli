interface SEOSection {
    title: string;
    content: string | string[];
    subsections?: {
        title: string;
        content: string;
    }[];
}

interface SEOContentProps {
    title: string;
    sections: SEOSection[];
}

export function SEOContent({ title, sections }: SEOContentProps) {
    return (
        <div className="prose prose-gray max-w-none dark:prose-invert mt-12 bg-white dark:bg-slate-900/40 p-8 md:p-12 lg:p-16 rounded-3xl border shadow-sm border-slate-200 dark:border-slate-800">
            <h2 className="text-3xl font-bold mb-10 text-foreground tracking-tight">{title}</h2>

            <div className="space-y-12">
                {sections.map((section, idx) => (
                    <section key={idx} className="space-y-6">
                        <h3 className="text-xl font-bold text-foreground/90">{section.title}</h3>
                        {Array.isArray(section.content) ? (
                            <div className="space-y-4">
                                {section.content.map((p, i) => (
                                    <p key={i} className="text-muted-foreground leading-relaxed">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground leading-relaxed">
                                {section.content}
                            </p>
                        )}

                        {section.subsections && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                {section.subsections.map((sub, sidx) => (
                                    <div key={sidx} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                        <h4 className="font-bold text-foreground text-lg mb-3">{sub.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{sub.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
}

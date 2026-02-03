import { Footer } from "@/components/shared/layout/footer";
import { Navbar } from "@/components/shared/layout/navbar";
import { ToolSidebar } from "@/components/shared/layout/sidebar";
import { BackgroundBlobs } from "@/components/shared/background-blobs";
import { RelatedTools } from "@/components/shared/related-tools";

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col relative isolate">
            <BackgroundBlobs />
            <Navbar />
            <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
                <ToolSidebar />
                <main className="relative py-6 lg:gap-10 lg:py-8">
                    <div className="mx-auto w-full min-w-0 max-w-5xl">
                        {children}
                        <RelatedTools />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

import { cn } from "@/lib/utils";

export function BackgroundBlobs() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none sticky-background">
            <div className="absolute inset-0 bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div
                className={cn(
                    "hidden md:block absolute top-0 left-[-20%] w-[70vh] h-[70vh] rounded-full bg-indigo-500/10 filter blur-[80px] opacity-40 will-change-transform",
                    "animate-blob-1"
                )}
            />

            <div
                className={cn(
                    "hidden md:block absolute top-[20%] right-[-20%] w-[60vh] h-[60vh] rounded-full bg-purple-500/10 filter blur-[80px] opacity-40 will-change-transform",
                    "animate-blob-2"
                )}
            />

            <div
                className={cn(
                    "hidden md:block absolute bottom-[-20%] left-[20%] w-[80vh] h-[80vh] rounded-full bg-blue-500/10 filter blur-[80px] opacity-30 will-change-transform",
                    "animate-blob-3"
                )}
            />
        </div>
    );
}

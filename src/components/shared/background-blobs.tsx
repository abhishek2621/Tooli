"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundBlobs() {
    // Start with a mounted check to avoid hydration mismatch if random values are used
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none sticky-background">
            <div className="absolute inset-0 bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <motion.div
                className="absolute top-0 left-[-20%] w-[70vh] h-[70vh] rounded-full bg-indigo-500/20 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 will-change-transform"
                animate={{
                    x: ["-20%", "20%", "-20%"],
                    y: ["-20%", "10%", "-20%"],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-[20%] right-[-20%] w-[60vh] h-[60vh] rounded-full bg-purple-500/20 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 will-change-transform"
                animate={{
                    x: ["20%", "-10%", "20%"],
                    y: ["0%", "30%", "0%"],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute bottom-[-20%] left-[20%] w-[80vh] h-[80vh] rounded-full bg-blue-500/20 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-30 will-change-transform"
                animate={{
                    x: ["0%", "15%", "0%"],
                    y: ["0%", "-20%", "0%"],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    );
}

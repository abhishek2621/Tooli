"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundBlobs() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if window is mobile to disable heavy animations
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // If mobile, we return a static version to keep INP low and save battery/CPU
    if (isMobile) {
        return (
            <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none sticky-background">
                <div className="absolute inset-0 bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 left-[-10%] w-[50vh] h-[50vh] rounded-full bg-indigo-500/5 filter blur-[80px] opacity-30" />
                <div className="absolute top-[20%] right-[-10%] w-[40vh] h-[40vh] rounded-full bg-purple-500/5 filter blur-[80px] opacity-30" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none sticky-background">
            <div className="absolute inset-0 bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <motion.div
                className="absolute top-0 left-[-20%] w-[70vh] h-[70vh] rounded-full bg-indigo-500/10 filter blur-[80px] opacity-40 will-change-transform"
                animate={{
                    x: ["-20%", "20%", "-20%"],
                    y: ["-20%", "10%", "-20%"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.div
                className="absolute top-[20%] right-[-20%] w-[60vh] h-[60vh] rounded-full bg-purple-500/10 filter blur-[80px] opacity-40 will-change-transform"
                animate={{
                    x: ["20%", "-10%", "20%"],
                    y: ["0%", "30%", "0%"],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute bottom-[-20%] left-[20%] w-[80vh] h-[80vh] rounded-full bg-blue-500/10 filter blur-[80px] opacity-30 will-change-transform"
                animate={{
                    x: ["0%", "15%", "0%"],
                    y: ["0%", "-20%", "0%"],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5,
                }}
            />
        </div>
    );
}

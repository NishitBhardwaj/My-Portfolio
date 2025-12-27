"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResumePage() {
    const [stars, setStars] = useState<{ left: string; top: string; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 60 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
        }));
        setStars(newStars);
    }, []);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Nishit_Bhardwaj_Resume.pdf";
        link.click();
    };

    return (
        <div className="min-h-screen bg-cosmic-dark flex flex-col p-6 overflow-hidden">
            {/* Background stars */}
            <div className="fixed inset-0 pointer-events-none">
                {stars.map((star, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/30"
                        style={{
                            left: star.left,
                            top: star.top,
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                        <span>📄</span>
                        Resume Viewer
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Nishit Bhardwaj — Software Development Engineer
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <motion.button
                        onClick={handleDownload}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl text-sm font-mono bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                    >
                        ⬇ Download PDF
                    </motion.button>
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-xl text-sm font-mono bg-neon-violet/10 border border-neon-violet/30 text-neon-violet hover:bg-neon-violet/20 transition-colors"
                        >
                            ← Terminal
                        </motion.button>
                    </Link>
                </div>
            </header>

            {/* PDF Viewer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 relative z-10"
            >
                <div
                    className="w-full h-full rounded-2xl border border-neon-cyan/30 overflow-hidden flex flex-col"
                    style={{
                        boxShadow: "0 0 40px rgba(35, 243, 255, 0.1), 0 0 80px rgba(157, 78, 221, 0.05)",
                    }}
                >
                    {/* PDF using iframe for better compatibility */}
                    <iframe
                        src="/resume.pdf"
                        className="w-full flex-1 min-h-[500px] bg-gray-900"
                        title="Nishit Bhardwaj Resume"
                    />

                    {/* Always show download option */}
                    <div className="p-6 bg-black/50 border-t border-terminal-border text-center">
                        <p className="text-gray-400 text-sm mb-3">
                            Can&apos;t see the resume? Download it directly:
                        </p>
                        <motion.button
                            onClick={handleDownload}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-xl text-sm font-mono bg-gradient-to-r from-neon-cyan to-neon-violet text-white"
                        >
                            ⬇ Download Resume PDF
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

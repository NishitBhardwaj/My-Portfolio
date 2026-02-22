"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Resume type definitions
const RESUME_TYPES = {
    sd: {
        label: "Software Developer",
        icon: "💻",
        color: "#23f3ff",
        borderColor: "border-neon-cyan/30",
        bgColor: "bg-neon-cyan/10",
        hoverBg: "hover:bg-neon-cyan/20",
        textColor: "text-neon-cyan",
        file: "/resumes/Nishit Bhardwaj  SD.pdf",
        apiUrl: "/api/resume/sd",
        downloadName: "Nishit_Bhardwaj_SD_Resume.pdf",
        description: "Backend systems, APIs, microservices, and scalable architecture.",
    },
    ml: {
        label: "Machine Learning Engineer",
        icon: "🧠",
        color: "#9d4edd",
        borderColor: "border-neon-violet/30",
        bgColor: "bg-neon-violet/10",
        hoverBg: "hover:bg-neon-violet/20",
        textColor: "text-neon-violet",
        file: "/resumes/Nishit Bhardwaj ML.pdf",
        apiUrl: "/api/resume/ml",
        downloadName: "Nishit_Bhardwaj_ML_Resume.pdf",
        description: "ML pipelines, model training, data engineering, and analytics.",
    },
    fs: {
        label: "Full Stack Developer",
        icon: "🚀",
        color: "#ff00e6",
        borderColor: "border-neon-pink/30",
        bgColor: "bg-neon-pink/10",
        hoverBg: "hover:bg-neon-pink/20",
        textColor: "text-neon-pink",
        file: "/resumes/Nishit Bhardwaj Full Stack.pdf",
        apiUrl: "/api/resume/fs",
        downloadName: "Nishit_Bhardwaj_FS_Resume.pdf",
        description: "React, Node.js, databases, and end-to-end web applications.",
    },
} as const;

type ResumeType = keyof typeof RESUME_TYPES;

// Starfield background (only used on selection page)
function StarBackground() {
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

    return (
        <div className="fixed inset-0 pointer-events-none">
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white/30"
                    style={{ left: star.left, top: star.top }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
                />
            ))}
        </div>
    );
}

// Resume Selection Screen (no type in URL)
function ResumeSelection() {
    return (
        <div className="min-h-screen bg-cosmic-dark flex flex-col items-center justify-center p-6 overflow-hidden">
            <StarBackground />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                    📄 Select Resume
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                    Choose which role-specific resume you&apos;d like to view
                </p>
            </motion.div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                {(Object.entries(RESUME_TYPES) as [ResumeType, typeof RESUME_TYPES[ResumeType]][]).map(
                    ([key, resume], index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <Link href={`/resume?type=${key}`}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-6 rounded-2xl border ${resume.borderColor} ${resume.bgColor} ${resume.hoverBg} transition-colors cursor-pointer group`}
                                    style={{
                                        boxShadow: `0 0 30px ${resume.color}15, 0 0 60px ${resume.color}08`,
                                    }}
                                >
                                    <div className="text-4xl mb-4">{resume.icon}</div>
                                    <h2 className={`text-lg font-display font-bold ${resume.textColor} mb-2`}>
                                        {resume.label}
                                    </h2>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {resume.description}
                                    </p>
                                    <div
                                        className={`mt-4 text-xs ${resume.textColor} opacity-60 group-hover:opacity-100 transition-opacity font-mono`}
                                    >
                                        Click to view →
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    )
                )}
            </div>

            {/* Back to Terminal */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative z-10 mt-10"
            >
                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2.5 rounded-xl text-sm font-mono bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                    >
                        ← Back to Terminal
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}

// Dynamically import the PDF viewer with SSR disabled
const PdfViewerClient = dynamic(() => import('@/components/PdfViewerClient'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-cosmic-dark gap-4">
            <div className="w-10 h-10 border-3 border-neon-cyan border-t-transparent rounded-full animate-spin" />
            <p className="text-white/60 text-sm font-mono">Loading Interactive Resume...</p>
        </div>
    )
});

// Inner component that uses useSearchParams
function ResumePageInner() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type") as ResumeType | null;

    if (type && type in RESUME_TYPES) {
        return <PdfViewerClient resume={RESUME_TYPES[type]} />;
    }

    return <ResumeSelection />;
}

// Main page wrapped in Suspense for useSearchParams
export default function ResumePage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
                    <p className="text-gray-400 font-mono">Loading...</p>
                </div>
            }
        >
            <ResumePageInner />
        </Suspense>
    );
}

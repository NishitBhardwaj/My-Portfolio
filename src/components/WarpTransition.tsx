"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface WarpTransitionProps {
    destination: string;
}

// Fallback animation when Lottie file isn't available
function FallbackWarpAnimation() {
    return (
        <div className="relative w-64 h-64">
            {/* Outer ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-4 border-neon-cyan opacity-50"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.2, 0.5],
                    rotate: [0, 180, 360],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Middle ring */}
            <motion.div
                className="absolute inset-4 rounded-full border-4 border-neon-violet opacity-60"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.3, 0.6],
                    rotate: [0, -180, -360],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inner ring */}
            <motion.div
                className="absolute inset-8 rounded-full border-4 border-neon-pink opacity-70"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.4, 0.7],
                    rotate: [0, 360, 720],
                }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Center vortex */}
            <motion.div
                className="absolute inset-16 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(35, 243, 255, 0.8) 0%, rgba(157, 78, 221, 0.6) 50%, rgba(255, 0, 230, 0.4) 100%)",
                }}
                animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [1, 0.8, 1],
                }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                        left: "50%",
                        top: "50%",
                    }}
                    animate={{
                        x: [0, Math.cos((i * Math.PI) / 6) * 120, 0],
                        y: [0, Math.sin((i * Math.PI) / 6) * 120, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

export default function WarpTransition({ destination }: WarpTransitionProps) {
    const [lottieData, setLottieData] = useState<object | null>(null);

    useEffect(() => {
        // Try to load Lottie animation
        fetch("/warp-animation.json")
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("Lottie file not found");
            })
            .then(setLottieData)
            .catch(() => {
                // Fallback to CSS animation
                setLottieData(null);
            });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="warp-container"
        >
            {/* Stars rushing by effect */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-8 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.7 + 0.3,
                        }}
                        animate={{
                            y: [0, -window.innerHeight],
                            opacity: [0.8, 0],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: Math.random() * 0.5,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Warp animation */}
            <div className="relative z-10">
                {lottieData ? (
                    <Lottie
                        animationData={lottieData}
                        loop
                        className="w-64 h-64"
                    />
                ) : (
                    <FallbackWarpAnimation />
                )}
            </div>

            {/* Warp text */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="warp-text"
            >
                Warping to dimension: <span className="font-bold">{destination}</span>
            </motion.p>

            {/* Progress bar */}
            <motion.div
                className="mt-6 w-48 h-1 bg-cosmic-dark rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.div>
    );
}

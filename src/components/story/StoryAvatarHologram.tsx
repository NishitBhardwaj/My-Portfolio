"use client";

import { motion } from "framer-motion";

export default function StoryAvatarHologram() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
        >
            <div className="w-48 h-48 md:w-64 md:h-64 relative">
                {/* Holographic container */}
                <div className="absolute inset-0 rounded-full holographic flex items-center justify-center overflow-hidden">
                    {/* Rotating gradient */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            background:
                                "conic-gradient(from 0deg, rgba(35, 243, 255, 0.3), rgba(157, 78, 221, 0.3), rgba(255, 0, 230, 0.3), rgba(35, 243, 255, 0.3))",
                        }}
                    />

                    {/* Inner content */}
                    <div className="relative z-10 text-center">
                        <div className="text-6xl md:text-7xl">🌌</div>
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xs font-mono text-neon-cyan block mt-2"
                        >
                            Avatar.load()
                        </motion.span>
                    </div>
                </div>

                {/* Orbiting particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: i % 2 === 0 ? "#23f3ff" : "#9d4edd",
                            left: "50%",
                            top: "50%",
                        }}
                        animate={{
                            x: [
                                Math.cos((i * Math.PI) / 3) * 80,
                                Math.cos((i * Math.PI) / 3 + Math.PI) * 80,
                                Math.cos((i * Math.PI) / 3) * 80,
                            ],
                            y: [
                                Math.sin((i * Math.PI) / 3) * 80,
                                Math.sin((i * Math.PI) / 3 + Math.PI) * 80,
                                Math.sin((i * Math.PI) / 3) * 80,
                            ],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Outer glow rings */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-neon-cyan/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border border-neon-violet/20"
                    animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.2, 0.05, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
            </div>
        </motion.div>
    );
}

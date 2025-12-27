"use client";

import { motion } from "framer-motion";

export default function AvatarPlaceholder() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="my-6 flex justify-center"
        >
            <div className="relative">
                {/* Holographic container */}
                <div className="w-48 h-48 rounded-full holographic flex items-center justify-center overflow-hidden relative">
                    {/* Animated gradient background */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(45deg, #2b0a3d 0%, #0c2340 50%, #2b0a3d 100%)",
                            animation: "rotate 8s linear infinite",
                        }}
                    />

                    {/* Galaxy avatar placeholder */}
                    <div className="relative z-10 text-center">
                        <div className="text-6xl mb-2">🌌</div>
                        <span className="text-xs text-neon-cyan font-mono">
                            3D Avatar Loading...
                        </span>
                    </div>

                    {/* Particle effects */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-neon-cyan rounded-full"
                            initial={{ opacity: 0.5 }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.5, 1, 0.5],
                                x: [0, Math.cos((i * Math.PI) / 4) * 80, 0],
                                y: [0, Math.sin((i * Math.PI) / 4) * 80, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut",
                            }}
                            style={{
                                left: "50%",
                                top: "50%",
                                marginLeft: "-4px",
                                marginTop: "-4px",
                            }}
                        />
                    ))}
                </div>

                {/* Outer glow ring */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, transparent 60%, rgba(35, 243, 255, 0.2) 100%)",
                        animation: "pulse 2s ease-in-out infinite",
                    }}
                />
            </div>

            <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      `}</style>
        </motion.div>
    );
}

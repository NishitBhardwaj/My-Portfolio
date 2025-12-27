"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface UniversePlaceholderProps {
    name: string;
    icon: string;
    description: string;
}

export default function UniversePlaceholder({
    name,
    icon,
    description,
}: UniversePlaceholderProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center p-8"
        >
            <div className="text-center max-w-lg">
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    className="text-8xl mb-8"
                >
                    {icon}
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-display font-bold text-neon-cyan mb-4 text-neon-glow"
                >
                    {name}
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 mb-2"
                >
                    {description}
                </motion.p>

                {/* Under construction message */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="holographic rounded-lg p-6 mt-8"
                >
                    <p className="text-neon-violet font-mono text-sm mb-4">
                        🚧 This universe is under construction.
                    </p>
                    <p className="text-gray-500 font-mono text-sm">
                        Return home with{" "}
                        <code className="text-neon-cyan bg-cosmic-dark px-2 py-1 rounded">
                            cd /
                        </code>{" "}
                        or type{" "}
                        <code className="text-neon-cyan bg-cosmic-dark px-2 py-1 rounded">
                            home
                        </code>
                    </p>
                </motion.div>

                {/* Home button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                >
                    <Link href="/" className="btn-neon inline-block">
                        ← Return to Terminal
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}

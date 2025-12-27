"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ReturnHomeButton() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-6 left-6 z-50"
        >
            <Link href="/">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm holographic group"
                >
                    <span className="text-neon-cyan group-hover:text-neon-glow transition-all">
                        ←
                    </span>
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                        cd /terminal
                    </span>
                </motion.button>
            </Link>
        </motion.div>
    );
}

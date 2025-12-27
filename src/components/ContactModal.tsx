"use client";

import { motion } from "framer-motion";
import { USER_INFO, SOCIAL_LINKS } from "@/lib/constants";

interface ContactModalProps {
    onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative z-10 w-full max-w-md holographic rounded-xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-neon-cyan transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Header */}
                <h2 className="text-2xl font-display font-bold text-neon-cyan mb-6 text-neon-glow">
                    📡 Contact Portal
                </h2>

                {/* Contact Info */}
                <div className="space-y-4">
                    {/* Email */}
                    <a
                        href={SOCIAL_LINKS.email}
                        className="flex items-center gap-4 p-3 rounded-lg bg-cosmic-dark/50 hover:bg-cosmic-dark/80 transition-all group"
                    >
                        <span className="text-2xl">✉️</span>
                        <div>
                            <div className="text-sm text-gray-400">Email</div>
                            <div className="text-neon-cyan group-hover:text-neon-glow transition-all">
                                {USER_INFO.email}
                            </div>
                        </div>
                    </a>

                    {/* GitHub */}
                    <a
                        href={USER_INFO.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg bg-cosmic-dark/50 hover:bg-cosmic-dark/80 transition-all group"
                    >
                        <span className="text-2xl">🐙</span>
                        <div>
                            <div className="text-sm text-gray-400">GitHub</div>
                            <div className="text-neon-violet group-hover:text-violet-glow transition-all">
                                NishitBhardwaj
                            </div>
                        </div>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href={USER_INFO.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg bg-cosmic-dark/50 hover:bg-cosmic-dark/80 transition-all group"
                    >
                        <span className="text-2xl">💼</span>
                        <div>
                            <div className="text-sm text-gray-400">LinkedIn</div>
                            <div className="text-neon-pink group-hover:text-pink-glow transition-all">
                                nishitbhardwaj4
                            </div>
                        </div>
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-cosmic-dark/50">
                        <span className="text-2xl">📍</span>
                        <div>
                            <div className="text-sm text-gray-400">Location</div>
                            <div className="text-terminal-text">{USER_INFO.location}</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-terminal-border text-center">
                    <p className="text-sm text-gray-500 font-mono">
                        {"// Transmissions welcome across all dimensions"}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

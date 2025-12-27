"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SkillDetail, skillDetails } from "./mapData";

interface DetailPanelProps {
    nodeId: string | null;
    onClose: () => void;
}

export default function DetailPanel({ nodeId, onClose }: DetailPanelProps) {
    const detail: SkillDetail | undefined = nodeId ? skillDetails[nodeId] : undefined;

    return (
        <AnimatePresence>
            {nodeId && detail && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 h-full w-80 md:w-96 bg-cosmic-dark/95 backdrop-blur-md border-l border-neon-cyan/30 z-40 overflow-y-auto"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Content */}
                    <div className="p-6 pt-16">
                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-display font-bold text-neon-cyan mb-4"
                        >
                            {detail.title}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-300 mb-6 leading-relaxed"
                        >
                            {detail.description}
                        </motion.p>

                        {/* Tech Context */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-6"
                        >
                            <h3 className="text-sm font-mono text-neon-violet mb-3">Tech Context</h3>
                            <ul className="space-y-2">
                                {detail.techContext.map((context, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="flex items-center gap-2 text-sm text-gray-400"
                                    >
                                        <span className="text-neon-cyan">→</span>
                                        {context}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3"
                        >
                            {detail.projectLink && (
                                <a
                                    href={detail.projectLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full px-4 py-3 rounded-lg text-center font-mono text-sm transition-all"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(35, 243, 255, 0.2), rgba(157, 78, 221, 0.2))",
                                        border: "1px solid rgba(35, 243, 255, 0.4)",
                                    }}
                                >
                                    <span className="text-white">View GitHub Repo →</span>
                                </a>
                            )}

                            <Link
                                href="/mission"
                                className="block w-full px-4 py-3 rounded-lg text-center font-mono text-sm transition-all"
                                style={{
                                    background: "linear-gradient(135deg, rgba(157, 78, 221, 0.2), rgba(255, 0, 230, 0.2))",
                                    border: "1px solid rgba(157, 78, 221, 0.4)",
                                }}
                            >
                                <span className="text-white">Open Mission Control →</span>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

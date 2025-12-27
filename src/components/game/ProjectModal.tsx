"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "./gameConstants";

interface ProjectModalProps {
    isOpen: boolean;
    projectIndex: number;
    onClose: () => void;
}

export default function ProjectModal({ isOpen, projectIndex, onClose }: ProjectModalProps) {
    const project = PROJECTS[projectIndex];

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                    >
                        {/* Pixel frame */}
                        <div
                            className="relative rounded-lg p-1"
                            style={{
                                background: "linear-gradient(135deg, #23f3ff, #9d4edd, #ff00e6)",
                            }}
                        >
                            <div className="bg-cosmic-dark rounded-lg p-6">
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
                                >
                                    [X]
                                </button>

                                {/* Content */}
                                <div className="text-center mb-6">
                                    <span className="text-4xl block mb-4">🚀</span>
                                    <h3
                                        className="text-neon-cyan mb-2"
                                        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "14px" }}
                                    >
                                        {project.name}
                                    </h3>
                                </div>

                                {/* Tech stack */}
                                <div className="mb-4">
                                    <p
                                        className="text-neon-violet text-center"
                                        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
                                    >
                                        {project.tech}
                                    </p>
                                </div>

                                {/* Description */}
                                <p
                                    className="text-gray-300 text-center mb-6"
                                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", lineHeight: "1.8" }}
                                >
                                    {project.description}
                                </p>

                                {/* GitHub button */}
                                <div className="flex justify-center">
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 rounded"
                                        style={{
                                            fontFamily: "'Press Start 2P', monospace",
                                            fontSize: "10px",
                                            background: "linear-gradient(135deg, rgba(35, 243, 255, 0.3), rgba(157, 78, 221, 0.3))",
                                            border: "2px solid #23f3ff",
                                            color: "#fff",
                                        }}
                                    >
                                        View on GitHub →
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ControlsOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function ControlsOverlay({ isVisible, onClose }: ControlsOverlayProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative p-1 rounded-lg"
                        style={{
                            background: "linear-gradient(135deg, #23f3ff, #9d4edd, #ff00e6)",
                        }}
                    >
                        <div className="bg-cosmic-dark rounded-lg p-8 text-center">
                            <h2
                                className="text-neon-cyan mb-6"
                                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "16px" }}
                            >
                                🎮 CONTROLS
                            </h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <div
                                            className="w-10 h-10 rounded border-2 border-neon-cyan flex items-center justify-center"
                                            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px" }}
                                        >
                                            W
                                        </div>
                                        <div className="flex gap-1">
                                            <div
                                                className="w-10 h-10 rounded border-2 border-neon-cyan flex items-center justify-center"
                                                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px" }}
                                            >
                                                A
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded border-2 border-neon-cyan flex items-center justify-center"
                                                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px" }}
                                            >
                                                S
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded border-2 border-neon-cyan flex items-center justify-center"
                                                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px" }}
                                            >
                                                D
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-gray-400">or</span>
                                    <div className="flex flex-col items-center gap-1">
                                        <div
                                            className="w-10 h-10 rounded border-2 border-neon-violet flex items-center justify-center text-xl"
                                        >
                                            ↑
                                        </div>
                                        <div className="flex gap-1">
                                            <div
                                                className="w-10 h-10 rounded border-2 border-neon-violet flex items-center justify-center text-xl"
                                            >
                                                ←
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded border-2 border-neon-violet flex items-center justify-center text-xl"
                                            >
                                                ↓
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded border-2 border-neon-violet flex items-center justify-center text-xl"
                                            >
                                                →
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p
                                    className="text-gray-300"
                                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
                                >
                                    → Move
                                </p>

                                <div className="pt-4 border-t border-terminal-border">
                                    <div
                                        className="px-8 py-3 rounded border-2 border-neon-pink inline-block"
                                        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px" }}
                                    >
                                        SPACE / ENTER
                                    </div>
                                    <p
                                        className="text-gray-300 mt-2"
                                        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
                                    >
                                        → Interact
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-terminal-border">
                                    <div
                                        className="px-8 py-3 rounded border-2 border-gray-500 inline-block"
                                        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px" }}
                                    >
                                        ESC
                                    </div>
                                    <p
                                        className="text-gray-300 mt-2"
                                        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
                                    >
                                        → Close dialogs
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="px-8 py-3 rounded"
                                style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                    fontSize: "12px",
                                    background: "linear-gradient(135deg, rgba(35, 243, 255, 0.3), rgba(157, 78, 221, 0.3))",
                                    border: "2px solid #23f3ff",
                                    color: "#fff",
                                }}
                            >
                                START GAME
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

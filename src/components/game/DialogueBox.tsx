"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DialogueState } from "./gameConstants";

interface DialogueBoxProps {
    dialogue: DialogueState;
    onClose: () => void;
    onAction: (action: string, data?: unknown) => void;
    onAdvanceLine?: () => void;
}

export default function DialogueBox({ dialogue, onClose, onAction, onAdvanceLine }: DialogueBoxProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (!dialogue.isOpen) return;

        const fullText = dialogue.lines[dialogue.currentLine] || "";
        setDisplayedText("");
        setIsTyping(true);

        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(typeInterval);
            }
        }, 30);

        return () => clearInterval(typeInterval);
    }, [dialogue.isOpen, dialogue.currentLine, dialogue.lines]);

    // Handle keyboard for dialogue
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!dialogue.isOpen) return;

            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                if (isTyping) {
                    // Skip to end of current line
                    setDisplayedText(dialogue.lines[dialogue.currentLine] || "");
                    setIsTyping(false);
                } else if (dialogue.currentLine < dialogue.lines.length - 1) {
                    // Advance to next line
                    onAdvanceLine?.();
                }
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [dialogue, isTyping, onClose, onAdvanceLine]);

    return (
        <AnimatePresence>
            {dialogue.isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
                >
                    <div className="relative">
                        {/* Pixel border frame */}
                        <div
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: "linear-gradient(135deg, #23f3ff, #9d4edd, #ff00e6)",
                                padding: "3px",
                            }}
                        >
                            <div className="w-full h-full bg-cosmic-dark rounded-lg" />
                        </div>

                        {/* Content */}
                        <div className="relative p-6">
                            {/* Title */}
                            <h3
                                className="text-sm font-mono mb-4"
                                style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                    color: "#23f3ff",
                                }}
                            >
                                {dialogue.title}
                            </h3>

                            {/* Dialogue text */}
                            <div
                                className="min-h-[60px] mb-4"
                                style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                    fontSize: "12px",
                                    lineHeight: "1.8",
                                    color: "#fff",
                                }}
                            >
                                {displayedText}
                                {isTyping && (
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        ▌
                                    </motion.span>
                                )}
                            </div>

                            {/* Line indicator */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-mono">
                                    {dialogue.currentLine + 1}/{dialogue.lines.length}
                                </span>

                                {!isTyping && dialogue.currentLine < dialogue.lines.length - 1 && (
                                    <span className="text-xs text-neon-cyan font-mono animate-pulse">
                                        [SPACE] Continue →
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            {!isTyping && dialogue.currentLine === dialogue.lines.length - 1 && dialogue.actions && (
                                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-terminal-border">
                                    {dialogue.actions.map((action, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onAction(action.action, action.data)}
                                            className="px-4 py-2 rounded text-xs font-mono"
                                            style={{
                                                fontFamily: "'Press Start 2P', monospace",
                                                background: "linear-gradient(135deg, rgba(35, 243, 255, 0.2), rgba(157, 78, 221, 0.2))",
                                                border: "2px solid #23f3ff",
                                                color: "#fff",
                                            }}
                                        >
                                            {action.label}
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Close hint */}
                            <div className="absolute top-2 right-4 text-xs text-gray-500 font-mono">
                                [ESC] Close
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

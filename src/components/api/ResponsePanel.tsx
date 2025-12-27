"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ApiEndpoint } from "./apiData";

interface ResponsePanelProps {
    endpoint: ApiEndpoint | null;
    isLoading: boolean;
    onClose: () => void;
}

export default function ResponsePanel({ endpoint, isLoading, onClose }: ResponsePanelProps) {
    return (
        <AnimatePresence>
            {endpoint && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-96 shrink-0 border-l border-neon-cyan/20 bg-cosmic-dark/80 backdrop-blur-md overflow-y-auto"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-terminal-border">
                        <h3 className="text-sm font-mono text-neon-cyan">Response</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Status */}
                    <div className="p-4 border-b border-terminal-border">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/30">
                                200 OK
                            </span>
                            <span className="text-xs text-gray-500">
                                {isLoading ? "Loading..." : "42ms"}
                            </span>
                        </div>
                    </div>

                    {/* Request info */}
                    <div className="p-4 border-b border-terminal-border">
                        <div className="text-xs font-mono text-gray-500 mb-2">Request</div>
                        <code className="text-sm font-mono text-white">
                            {endpoint.method} {endpoint.path}
                        </code>
                    </div>

                    {/* Response body */}
                    <div className="p-4">
                        <div className="text-xs font-mono text-gray-500 mb-2">Response Body</div>
                        {isLoading ? (
                            <div className="flex items-center gap-2 text-neon-cyan">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    ⟳
                                </motion.div>
                                <span className="text-sm">Fetching response...</span>
                            </div>
                        ) : (
                            <motion.pre
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="p-3 rounded bg-black/50 text-sm font-mono overflow-x-auto"
                            >
                                <code>
                                    {/* Syntax highlighted JSON */}
                                    {JSON.stringify(endpoint.response, null, 2)
                                        .split("\n")
                                        .map((line, i) => (
                                            <div key={i} className="leading-relaxed">
                                                {line.split(/("[\w_]+")/g).map((part, j) => {
                                                    if (part.match(/^"[\w_]+"$/)) {
                                                        return (
                                                            <span key={j} className="text-neon-cyan">
                                                                {part}
                                                            </span>
                                                        );
                                                    }
                                                    if (part.includes(":")) {
                                                        const [key, val] = part.split(":");
                                                        return (
                                                            <span key={j}>
                                                                {key}:
                                                                <span className="text-neon-violet">{val}</span>
                                                            </span>
                                                        );
                                                    }
                                                    if (part.match(/true|false/)) {
                                                        return (
                                                            <span key={j} className="text-yellow-400">
                                                                {part}
                                                            </span>
                                                        );
                                                    }
                                                    if (part.match(/\d+/)) {
                                                        return (
                                                            <span key={j} className="text-green-400">
                                                                {part}
                                                            </span>
                                                        );
                                                    }
                                                    return <span key={j} className="text-gray-300">{part}</span>;
                                                })}
                                            </div>
                                        ))}
                                </code>
                            </motion.pre>
                        )}
                    </div>

                    {/* Copy button */}
                    <div className="p-4 border-t border-terminal-border">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigator.clipboard.writeText(JSON.stringify(endpoint.response, null, 2))}
                            className="w-full px-4 py-2 rounded-lg text-sm font-mono bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                            📋 Copy Response
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

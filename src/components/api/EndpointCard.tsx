"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ApiEndpoint } from "./apiData";

interface EndpointCardProps {
    endpoint: ApiEndpoint;
    onTryIt: (endpoint: ApiEndpoint) => void;
}

const methodColors: Record<string, { bg: string; text: string; border: string }> = {
    GET: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
    POST: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
    PUT: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
    DELETE: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
};

export default function EndpointCard({ endpoint, onTryIt }: EndpointCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const colors = methodColors[endpoint.method];

    return (
        <motion.div
            layout
            className="rounded-lg border border-terminal-border bg-cosmic-dark/50 overflow-hidden"
        >
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
            >
                {/* Method badge */}
                <span
                    className={`px-2 py-1 rounded text-xs font-mono font-bold ${colors.bg} ${colors.text} border ${colors.border}`}
                >
                    {endpoint.method}
                </span>

                {/* Path */}
                <code className="text-white font-mono text-sm">{endpoint.path}</code>

                {/* Summary */}
                <span className="text-gray-400 text-sm ml-auto">{endpoint.summary}</span>

                {/* Expand indicator */}
                <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-gray-500"
                >
                    ▼
                </motion.span>
            </button>

            {/* Expanded content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-terminal-border"
                    >
                        <div className="p-4 space-y-4">
                            {/* Description */}
                            <p className="text-gray-400 text-sm">{endpoint.description}</p>

                            {/* Request body */}
                            {endpoint.requestBody && (
                                <div>
                                    <h4 className="text-xs font-mono text-neon-cyan mb-2">Request Body</h4>
                                    <pre className="p-3 rounded bg-black/50 text-sm font-mono overflow-x-auto">
                                        <code className="text-gray-300">
                                            {JSON.stringify(endpoint.requestBody, null, 2)}
                                        </code>
                                    </pre>
                                </div>
                            )}

                            {/* Response preview */}
                            <div>
                                <h4 className="text-xs font-mono text-neon-violet mb-2">Response Schema</h4>
                                <pre className="p-3 rounded bg-black/50 text-sm font-mono overflow-x-auto max-h-48">
                                    <code className="text-gray-300">
                                        {JSON.stringify(endpoint.response, null, 2)}
                                    </code>
                                </pre>
                            </div>

                            {/* Try it button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onTryIt(endpoint)}
                                className="px-4 py-2 rounded-lg text-sm font-mono transition-all"
                                style={{
                                    background: "linear-gradient(135deg, rgba(35, 243, 255, 0.2), rgba(157, 78, 221, 0.2))",
                                    border: "1px solid rgba(35, 243, 255, 0.4)",
                                    color: "#23f3ff",
                                }}
                            >
                                ▶ Try Request
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

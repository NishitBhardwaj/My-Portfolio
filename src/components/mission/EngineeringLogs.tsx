"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const logTemplates = [
    { type: "INFO", message: "Booting Auth Service..." },
    { type: "OK", message: "API Gateway reached in 20ms" },
    { type: "STREAM", message: "Rebalancing load across services" },
    { type: "DB", message: "MongoDB read/write latency: 36ms" },
    { type: "MODEL", message: "ML model loaded: RandomForest_v1" },
    { type: "DEPLOY", message: "CI/CD pipeline completed successfully" },
    { type: "INFO", message: "Health check passed for all services" },
    { type: "OK", message: "Cache hit ratio: 94.2%" },
    { type: "STREAM", message: "Processing incoming requests..." },
    { type: "DB", message: "MySQL connection pool: 15/20 active" },
    { type: "INFO", message: "Rate limiter configured: 1000 req/min" },
    { type: "OK", message: "JWT token validation: success" },
    { type: "DEPLOY", message: "Docker containers healthy: 8/8" },
    { type: "MODEL", message: "Inference latency: 45ms avg" },
    { type: "STREAM", message: "WebSocket connections: 142 active" },
];

const typeColors: Record<string, string> = {
    INFO: "#23f3ff",
    OK: "#22c55e",
    STREAM: "#9d4edd",
    DB: "#ff00e6",
    MODEL: "#eab308",
    DEPLOY: "#22c55e",
};

interface LogEntry {
    id: number;
    type: string;
    message: string;
    timestamp: string;
}

export default function EngineeringLogs() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const idCounter = useRef(0);

    useEffect(() => {
        // Initial logs
        const initialLogs = logTemplates.slice(0, 6).map((log) => ({
            ...log,
            id: idCounter.current++,
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        }));
        setLogs(initialLogs);

        // Add new logs periodically
        const interval = setInterval(() => {
            const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
            const newLog = {
                ...randomLog,
                id: idCounter.current++,
                timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
            };

            setLogs((prev) => {
                const updated = [...prev, newLog];
                return updated.slice(-15); // Keep last 15 logs
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Auto-scroll to bottom
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <section className="mb-8">
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">📋</span> ENGINEERING LOGS
            </h2>
            <div className="holographic rounded-xl overflow-hidden">
                <div className="bg-cosmic-dark/80 px-4 py-2 border-b border-terminal-border flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-gray-500 font-mono">system.log</span>
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-auto text-xs text-neon-cyan font-mono"
                    >
                        ● LIVE
                    </motion.span>
                </div>
                <div
                    ref={containerRef}
                    className="p-4 h-64 overflow-y-auto font-mono text-sm space-y-1"
                >
                    {logs.map((log, index) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex gap-2"
                        >
                            <span className="text-gray-600">{log.timestamp}</span>
                            <span
                                className="font-bold"
                                style={{ color: typeColors[log.type] || "#fff" }}
                            >
                                [{log.type}]
                            </span>
                            <span className="text-gray-300">{log.message}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

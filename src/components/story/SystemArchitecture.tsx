"use client";

import { motion } from "framer-motion";

const architectureNodes = [
    { id: "client", label: "Client", icon: "💻", x: 0, y: 50 },
    { id: "gateway", label: "API Gateway", icon: "🚪", x: 20, y: 50 },
    { id: "auth", label: "Auth Service", icon: "🔐", x: 40, y: 25 },
    { id: "api", label: "API Service", icon: "⚡", x: 40, y: 50 },
    { id: "cache", label: "Cache", icon: "💨", x: 40, y: 75 },
    { id: "mongo", label: "MongoDB", icon: "🍃", x: 60, y: 35 },
    { id: "mysql", label: "MySQL", icon: "🐬", x: 60, y: 65 },
];

const connections = [
    { from: "client", to: "gateway" },
    { from: "gateway", to: "auth" },
    { from: "gateway", to: "api" },
    { from: "gateway", to: "cache" },
    { from: "api", to: "mongo" },
    { from: "api", to: "mysql" },
];

export default function SystemArchitecture() {
    return (
        <div className="relative w-full max-w-4xl mx-auto mt-8 p-8">
            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: "300px" }}>
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#23f3ff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#9d4edd" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
                {connections.map((conn, index) => {
                    const fromNode = architectureNodes.find(n => n.id === conn.from);
                    const toNode = architectureNodes.find(n => n.id === conn.to);
                    if (!fromNode || !toNode) return null;

                    return (
                        <motion.line
                            key={`${conn.from}-${conn.to}`}
                            x1={`${fromNode.x + 5}%`}
                            y1={`${fromNode.y}%`}
                            x2={`${toNode.x}%`}
                            y2={`${toNode.y}%`}
                            stroke="url(#lineGradient)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        />
                    );
                })}
            </svg>

            {/* Nodes */}
            <div className="relative" style={{ minHeight: "300px" }}>
                {architectureNodes.map((node, index) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 200,
                        }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        className="absolute holographic rounded-xl p-3 flex flex-col items-center cursor-pointer"
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: "translate(-50%, -50%)",
                            minWidth: "80px",
                        }}
                    >
                        <span className="text-2xl mb-1">{node.icon}</span>
                        <span className="text-xs font-mono text-gray-400 whitespace-nowrap">{node.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="mt-8 flex flex-wrap justify-center gap-4"
            >
                {["RESTful APIs", "JWT Auth", "Microservices", "Caching", "Load Balancing"].map((item, i) => (
                    <span
                        key={item}
                        className="px-3 py-1 text-xs font-mono rounded-full holographic text-neon-cyan"
                    >
                        • {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

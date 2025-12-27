"use client";

import { motion } from "framer-motion";

const nodes = [
    { id: "client", x: 10, y: 50, label: "Client", icon: "💻" },
    { id: "gateway", x: 30, y: 50, label: "API Gateway", icon: "🚪" },
    { id: "auth", x: 50, y: 20, label: "Auth Service", icon: "🔐" },
    { id: "user", x: 50, y: 40, label: "User Service", icon: "👤" },
    { id: "data", x: 50, y: 60, label: "Data Processing", icon: "📊" },
    { id: "ml", x: 50, y: 80, label: "ML Engine", icon: "🧠" },
    { id: "mongo", x: 75, y: 35, label: "MongoDB", icon: "🍃", status: "Operational" },
    { id: "mysql", x: 75, y: 65, label: "MySQL", icon: "🐬", status: "Relational" },
];

const connections = [
    { from: "client", to: "gateway" },
    { from: "gateway", to: "auth" },
    { from: "gateway", to: "user" },
    { from: "gateway", to: "data" },
    { from: "gateway", to: "ml" },
    { from: "auth", to: "mongo" },
    { from: "user", to: "mongo" },
    { from: "data", to: "mysql" },
    { from: "ml", to: "mongo" },
];

export default function ArchitectureMap() {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-pink">🏗️</span> ARCHITECTURE MAP
            </h2>
            <div className="holographic rounded-xl p-6 relative" style={{ minHeight: "350px" }}>
                {/* SVG Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ minHeight: "350px" }}>
                    <defs>
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#23f3ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#9d4edd" stopOpacity="0.8" />
                        </linearGradient>
                        {/* Animated glow filter */}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {connections.map((conn, index) => {
                        const fromNode = nodes.find((n) => n.id === conn.from);
                        const toNode = nodes.find((n) => n.id === conn.to);
                        if (!fromNode || !toNode) return null;

                        return (
                            <motion.line
                                key={`${conn.from}-${conn.to}`}
                                x1={`${fromNode.x + 5}%`}
                                y1={`${fromNode.y}%`}
                                x2={`${toNode.x - 2}%`}
                                y2={`${toNode.y}%`}
                                stroke="url(#connectionGradient)"
                                strokeWidth="2"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                        );
                    })}

                    {/* Animated data flow particles */}
                    {connections.slice(0, 5).map((conn, index) => {
                        const fromNode = nodes.find((n) => n.id === conn.from);
                        const toNode = nodes.find((n) => n.id === conn.to);
                        if (!fromNode || !toNode) return null;

                        return (
                            <motion.circle
                                key={`particle-${conn.from}-${conn.to}`}
                                r="3"
                                fill="#23f3ff"
                                filter="url(#glow)"
                                initial={{
                                    cx: `${fromNode.x + 5}%`,
                                    cy: `${fromNode.y}%`,
                                    opacity: 0
                                }}
                                animate={{
                                    cx: [`${fromNode.x + 5}%`, `${toNode.x - 2}%`],
                                    cy: [`${fromNode.y}%`, `${toNode.y}%`],
                                    opacity: [0, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.5,
                                    ease: "linear",
                                }}
                            />
                        );
                    })}
                </svg>

                {/* Nodes */}
                {nodes.map((node, index) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 150,
                        }}
                        whileHover={{ scale: 1.1, zIndex: 20 }}
                        className="absolute holographic rounded-lg p-2 flex flex-col items-center cursor-pointer"
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: "translate(-50%, -50%)",
                            minWidth: "80px",
                        }}
                    >
                        <span className="text-xl">{node.icon}</span>
                        <span className="text-xs font-mono text-white whitespace-nowrap">
                            {node.label}
                        </span>
                        {node.status && (
                            <span className="text-[10px] font-mono text-neon-cyan">
                                {node.status}
                            </span>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

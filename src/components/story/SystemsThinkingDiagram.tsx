"use client";

import { motion } from "framer-motion";

const systemNodes = [
    { id: "users", label: "Users", icon: "👥", x: 5 },
    { id: "lb", label: "Load Balancer", icon: "⚖️", x: 20 },
    { id: "api", label: "API Layer", icon: "🔌", x: 35 },
    { id: "services", label: "Microservices", icon: "🧩", x: 50 },
    { id: "db", label: "Databases", icon: "🗄️", x: 65 },
    { id: "monitor", label: "Monitoring", icon: "📊", x: 80 },
];

const badges = [
    "System Design",
    "Microservices",
    "Architecture",
    "CI/CD",
];

export default function SystemsThinkingDiagram() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-8">
            {/* Flow Diagram */}
            <div className="relative py-8">
                {/* Connection Line */}
                <motion.div
                    className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                        background: "linear-gradient(90deg, #23f3ff 0%, #9d4edd 50%, #ff00e6 100%)",
                        transformOrigin: "left",
                    }}
                />

                {/* Nodes */}
                <div className="relative flex justify-between items-center px-4">
                    {systemNodes.map((node, index) => (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 150,
                            }}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.2 },
                            }}
                            className="flex flex-col items-center z-10"
                        >
                            <motion.div
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full holographic flex items-center justify-center text-2xl md:text-3xl mb-2"
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(35, 243, 255, 0.3)",
                                        "0 0 40px rgba(157, 78, 221, 0.4)",
                                        "0 0 20px rgba(35, 243, 255, 0.3)",
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.3,
                                }}
                            >
                                {node.icon}
                            </motion.div>
                            <span className="text-xs md:text-sm font-mono text-gray-400 text-center whitespace-nowrap">
                                {node.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Arrows */}
                <div className="absolute top-1/2 left-0 right-0 flex justify-between px-16 -translate-y-1/2 pointer-events-none">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.2 }}
                            className="text-neon-cyan text-xl"
                        >
                            →
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Badges */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
            >
                {badges.map((badge, i) => (
                    <motion.span
                        key={badge}
                        whileHover={{ scale: 1.1 }}
                        className="px-4 py-2 rounded-lg text-sm font-semibold"
                        style={{
                            background: `linear-gradient(135deg, rgba(35, 243, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)`,
                            border: "1px solid rgba(35, 243, 255, 0.4)",
                            color: "#23f3ff",
                        }}
                    >
                        {badge}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}

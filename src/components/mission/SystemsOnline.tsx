"use client";

import { motion } from "framer-motion";

const systems = [
    { name: "Auth Service", status: "ACTIVE", color: "#22c55e", icon: "🔐" },
    { name: "API Gateway", status: "OPERATIONAL", color: "#22c55e", icon: "🚪" },
    { name: "Data Services", status: "STABLE", color: "#22c55e", icon: "📊" },
    { name: "ML Pipeline", status: "RUNNING", color: "#eab308", icon: "🧠" },
    { name: "CI/CD", status: "AUTOMATED", color: "#22c55e", icon: "🔄" },
    { name: "Deployment", status: "SUCCESS", color: "#22c55e", icon: "🚀" },
];

export default function SystemsOnline() {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">📡</span> SYSTEMS ONLINE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {systems.map((system, index) => (
                    <motion.div
                        key={system.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="holographic rounded-xl p-4 text-center relative overflow-hidden"
                    >
                        {/* Pulse effect */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    `0 0 10px ${system.color}40`,
                                    `0 0 30px ${system.color}60`,
                                    `0 0 10px ${system.color}40`,
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-xl"
                        />

                        <div className="relative z-10">
                            <span className="text-3xl block mb-2">{system.icon}</span>
                            <h3 className="text-sm font-mono text-white mb-1">{system.name}</h3>
                            <div className="flex items-center justify-center gap-2">
                                <motion.div
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: system.color }}
                                />
                                <span
                                    className="text-xs font-mono"
                                    style={{ color: system.color }}
                                >
                                    {system.status}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

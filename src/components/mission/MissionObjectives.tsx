"use client";

import { motion } from "framer-motion";

const objectives = [
    { icon: "🏗️", title: "Build scalable backend systems", priority: "HIGH" },
    { icon: "🛡️", title: "Improve service resiliency", priority: "HIGH" },
    { icon: "⚡", title: "Accelerate deployments", priority: "MEDIUM" },
    { icon: "🤖", title: "Automate monitoring & error handling", priority: "MEDIUM" },
    { icon: "🔄", title: "Architect fault tolerance", priority: "HIGH" },
];

export default function MissionObjectives() {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-violet">🎯</span> MISSION OBJECTIVES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {objectives.map((objective, index) => (
                    <motion.div
                        key={objective.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="holographic rounded-xl p-4 flex items-start gap-3"
                    >
                        <span className="text-2xl">{objective.icon}</span>
                        <div className="flex-1">
                            <p className="text-sm text-white font-medium">{objective.title}</p>
                            <span
                                className={`text-xs font-mono mt-1 inline-block px-2 py-0.5 rounded ${objective.priority === "HIGH"
                                        ? "bg-red-500/20 text-red-400"
                                        : "bg-yellow-500/20 text-yellow-400"
                                    }`}
                            >
                                {objective.priority}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

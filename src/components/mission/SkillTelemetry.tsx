"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "Backend Engineering", value: 90, color: "#23f3ff" },
    { name: "System Design", value: 87, color: "#9d4edd" },
    { name: "Databases", value: 84, color: "#ff00e6" },
    { name: "API Architecture", value: 88, color: "#23f3ff" },
    { name: "Cloud & DevOps", value: 80, color: "#9d4edd" },
    { name: "AI/ML Integration", value: 75, color: "#ff00e6" },
];

function GaugeBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
        >
            <div className="flex justify-between mb-1">
                <span className="text-sm font-mono text-gray-400">{skill.name}</span>
                <span className="text-sm font-mono" style={{ color: skill.color }}>
                    {skill.value}%
                </span>
            </div>
            <div className="h-3 bg-cosmic-dark rounded-full overflow-hidden border border-terminal-border">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full relative"
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`,
                    }}
                >
                    {/* Glow effect */}
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute right-0 top-0 w-4 h-full"
                        style={{
                            background: `radial-gradient(circle at right, ${skill.color}, transparent)`,
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function SkillTelemetry() {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-violet">📊</span> TECH TELEMETRY
            </h2>
            <div className="holographic rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {skills.map((skill, index) => (
                        <GaugeBar key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

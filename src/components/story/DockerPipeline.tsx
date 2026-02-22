"use client";

import { motion } from "framer-motion";

const pipelineStages = [
    { id: "code", label: "Code", icon: "📝", color: "#23f3ff", desc: "Git Push" },
    { id: "build", label: "Build", icon: "🔨", color: "#9d4edd", desc: "npm / pip" },
    { id: "test", label: "Test", icon: "✅", color: "#47A248", desc: "Jest / Pytest" },
    { id: "docker", label: "Docker", icon: "🐳", color: "#2496ED", desc: "Containerize" },
    { id: "registry", label: "Registry", icon: "📦", color: "#FF9900", desc: "ECR / Hub" },
    { id: "deploy", label: "Deploy", icon: "🚀", color: "#ff00e6", desc: "ECS / K8s" },
    { id: "monitor", label: "Monitor", icon: "📊", color: "#DC382D", desc: "CloudWatch" },
];

export default function DockerPipeline() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-12">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-display font-bold text-center mb-8"
                style={{ background: "linear-gradient(90deg, #2496ED, #23f3ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
                🐳 Docker CI/CD Pipeline
            </motion.h3>

            {/* Pipeline — flex row of nodes with arrows between them */}
            <div className="flex items-start justify-center gap-1 md:gap-2 px-2 flex-wrap">
                {pipelineStages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center">
                        {/* Node */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 200,
                            }}
                            whileHover={{
                                y: -6,
                                scale: 1.08,
                                transition: { duration: 0.2 },
                            }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                className="w-14 h-14 md:w-16 md:h-16 rounded-xl holographic flex items-center justify-center text-2xl md:text-3xl mb-2"
                                animate={{
                                    boxShadow: [
                                        `0 0 12px ${stage.color}35`,
                                        `0 0 28px ${stage.color}55`,
                                        `0 0 12px ${stage.color}35`,
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                }}
                            >
                                {stage.icon}
                            </motion.div>
                            <span className="text-xs md:text-sm font-mono text-white text-center font-semibold">
                                {stage.label}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500 text-center">
                                {stage.desc}
                            </span>
                        </motion.div>

                        {/* Arrow between nodes (skip after last) */}
                        {index < pipelineStages.length - 1 && (
                            <motion.div
                                className="flex items-center mx-1 md:mx-2 mb-6"
                                initial={{ opacity: 0, x: -5 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                {/* Animated flowing arrow */}
                                <div className="relative flex items-center">
                                    <div
                                        className="w-6 md:w-10 h-0.5 rounded-full overflow-hidden"
                                        style={{
                                            background: `linear-gradient(90deg, ${stage.color}50, ${pipelineStages[index + 1].color}50)`,
                                        }}
                                    >
                                        {/* Flowing pulse */}
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{
                                                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                                                backgroundSize: "200% 100%",
                                            }}
                                            animate={{
                                                backgroundPosition: ["-200% 0%", "200% 0%"],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: index * 0.3,
                                            }}
                                        />
                                    </div>
                                    <motion.span
                                        className="text-sm ml-0.5"
                                        style={{ color: pipelineStages[index + 1].color }}
                                        animate={{ opacity: [0.4, 1, 0.4], x: [0, 2, 0] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.2 }}
                                    >
                                        ›
                                    </motion.span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

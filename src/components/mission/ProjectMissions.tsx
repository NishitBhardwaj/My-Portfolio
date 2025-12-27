"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

const projectMissions = [
    {
        ...PROJECTS[0],
        icon: "🚀",
        codename: "FALCON",
    },
    {
        ...PROJECTS[1],
        icon: "🛰️",
        codename: "ORACLE",
    },
    {
        name: "Machine Learning Pipeline",
        tech: "Python + Scikit-learn + Automation",
        description: "Automated ML model training and deployment pipeline",
        github: "https://github.com/NishitBhardwaj/ml-models",
        icon: "🧠",
        codename: "NEURAL",
    },
    {
        ...PROJECTS[3],
        icon: "🌍",
        codename: "VOYAGER",
    },
];

export default function ProjectMissions() {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-pink">🚀</span> PROJECT MISSIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectMissions.map((project, index) => (
                    <motion.a
                        key={project.name}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            y: -5,
                            rotateY: 5,
                            rotateX: -2,
                            scale: 1.02,
                        }}
                        className="holographic rounded-xl p-5 block group cursor-pointer"
                        style={{ perspective: "1000px" }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">{project.icon}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded">
                                        {project.codename}
                                    </span>
                                </div>
                                <h3 className="text-lg font-display font-bold text-white mb-1">
                                    {project.name}
                                </h3>
                                <p className="text-xs font-mono text-neon-violet mb-2">
                                    {project.tech}
                                </p>
                                <p className="text-sm text-gray-400">{project.description}</p>
                            </div>
                        </div>

                        {/* Hover indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute top-4 right-4 text-neon-cyan text-sm font-mono"
                        >
                            View Mission →
                        </motion.div>

                        {/* Glow effect on hover */}
                        <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(circle at center, rgba(35, 243, 255, 0.1) 0%, transparent 70%)",
                            }}
                        />
                    </motion.a>
                ))}
            </div>
        </section>
    );
}

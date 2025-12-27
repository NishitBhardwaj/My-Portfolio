"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

interface ProjectCardProps {
    project: typeof PROJECTS[0];
    index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
                y: -10,
                rotateY: 5,
                rotateX: -5,
                transition: { duration: 0.3 },
            }}
            className="relative group"
            style={{ perspective: "1000px" }}
        >
            <div className="holographic rounded-xl p-6 h-full transition-all duration-300 group-hover:shadow-neon-cyan">
                {/* Project Number */}
                <div className="absolute top-4 right-4 text-4xl font-bold opacity-20 text-neon-cyan font-display">
                    0{index + 1}
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-xl font-display font-bold text-white mb-2">
                        {project.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.split(" + ").map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs font-mono rounded bg-cosmic-dark/50 text-neon-violet"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-400 text-sm mb-6">
                        {project.description}
                    </p>

                    {/* CTA Button */}
                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                        style={{
                            background: "linear-gradient(135deg, rgba(35, 243, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)",
                            border: "1px solid rgba(35, 243, 255, 0.4)",
                            color: "#23f3ff",
                        }}
                    >
                        <span>View on GitHub</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </motion.a>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at center, rgba(35, 243, 255, 0.1) 0%, transparent 70%)",
                    }}
                />
            </div>
        </motion.div>
    );
}

export default function ProjectShowcase() {
    // Take the first 3 key projects
    const featuredProjects = PROJECTS.slice(0, 3);

    return (
        <div className="w-full max-w-5xl mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project, index) => (
                    <ProjectCard key={project.name} project={project} index={index} />
                ))}
            </div>
        </div>
    );
}

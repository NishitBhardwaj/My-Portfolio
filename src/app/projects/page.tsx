"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categoryNames, categoryColors, Project } from "@/components/projects/projectData";
import { executeProjectCommand, CLILine } from "@/components/projects/projectCommands";

type ViewMode = "cards" | "table" | "terminal";

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("cards");
    const [filter, setFilter] = useState<string>("all");
    const [terminalOutput, setTerminalOutput] = useState<CLILine[]>([]);
    const [terminalInput, setTerminalInput] = useState("");

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter);

    const handleTerminalCommand = () => {
        if (!terminalInput.trim()) return;
        const result = executeProjectCommand(terminalInput.trim().split(/\s+/));

        if (result.action === "github" && result.url) {
            window.open(result.url, "_blank");
        }

        setTerminalOutput([...terminalOutput, ...result.lines]);
        setTerminalInput("");
    };

    return (
        <div className="min-h-screen bg-cosmic-dark overflow-hidden">
            {/* Background stars */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(100)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header className="relative z-10 px-6 py-6 border-b border-neon-cyan/20 bg-cosmic-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                            <span>🚀</span>
                            Project Explorer
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Browse the Dev Multiverse project catalog
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Toggle */}
                        <div className="flex rounded-lg overflow-hidden border border-neon-cyan/30">
                            {(["cards", "table", "terminal"] as ViewMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-3 py-2 text-xs font-mono transition-colors ${viewMode === mode
                                            ? "bg-neon-cyan/20 text-neon-cyan"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {mode === "cards" ? "📦 Cards" : mode === "table" ? "📊 Table" : "💻 Terminal"}
                                </button>
                            ))}
                        </div>

                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-lg text-sm font-mono bg-neon-violet/10 border border-neon-violet/30 text-neon-violet hover:bg-neon-violet/20 transition-colors"
                            >
                                ← Terminal
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Filter bar */}
            {viewMode !== "terminal" && (
                <div className="relative z-10 px-6 py-4 border-b border-terminal-border">
                    <div className="max-w-7xl mx-auto flex gap-3">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${filter === "all"
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            All ({projects.length})
                        </button>
                        {Object.entries(categoryNames).map(([key, name]) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${filter === key
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                                style={filter === key ? { backgroundColor: `${categoryColors[key]}20`, borderColor: categoryColors[key] } : {}}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Content */}
            <main className="relative z-10 p-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        {/* Cards View */}
                        {viewMode === "cards" && (
                            <motion.div
                                key="cards"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                            >
                                {filteredProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </motion.div>
                        )}

                        {/* Table View */}
                        {viewMode === "table" && (
                            <motion.div
                                key="table"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="overflow-x-auto"
                            >
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-left border-b border-terminal-border">
                                            <th className="py-3 px-4 text-xs font-mono text-gray-500 uppercase">ID</th>
                                            <th className="py-3 px-4 text-xs font-mono text-gray-500 uppercase">Title</th>
                                            <th className="py-3 px-4 text-xs font-mono text-gray-500 uppercase">Category</th>
                                            <th className="py-3 px-4 text-xs font-mono text-gray-500 uppercase">Stack</th>
                                            <th className="py-3 px-4 text-xs font-mono text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProjects.map((project) => (
                                            <motion.tr
                                                key={project.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="border-b border-terminal-border/50 hover:bg-white/5"
                                            >
                                                <td className="py-3 px-4 text-sm font-mono text-gray-400">#{project.id}</td>
                                                <td className="py-3 px-4">
                                                    <span className="text-white font-semibold">{project.title}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className="px-2 py-1 rounded text-xs font-mono"
                                                        style={{
                                                            backgroundColor: `${categoryColors[project.category]}20`,
                                                            color: categoryColors[project.category],
                                                        }}
                                                    >
                                                        {project.category}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {project.stack.slice(0, 3).map((tech) => (
                                                            <span key={tech} className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {project.stack.length > 3 && (
                                                            <span className="text-xs text-gray-500">+{project.stack.length - 3}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-neon-cyan hover:underline text-sm"
                                                    >
                                                        GitHub →
                                                    </a>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}

                        {/* Terminal View */}
                        {viewMode === "terminal" && (
                            <motion.div
                                key="terminal"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="terminal-container">
                                    <div className="terminal-header">
                                        <div className="terminal-dot bg-red-500"></div>
                                        <div className="terminal-dot bg-yellow-500"></div>
                                        <div className="terminal-dot bg-green-500"></div>
                                        <span className="ml-4 text-sm text-gray-400 font-mono">
                                            project-explorer — bash
                                        </span>
                                    </div>

                                    <div className="terminal-body min-h-[400px] max-h-[60vh]">
                                        {/* Initial help message */}
                                        {terminalOutput.length === 0 && (
                                            <div className="text-gray-500 mb-4">
                                                <p>Welcome to Project Explorer Terminal.</p>
                                                <p>Type <span className="text-neon-cyan">help</span> for available commands.</p>
                                            </div>
                                        )}

                                        {/* Output */}
                                        {terminalOutput.map((line, index) => (
                                            <div
                                                key={index}
                                                className="mb-1 whitespace-pre-wrap font-mono text-sm"
                                                style={{
                                                    color: line.color || "#888",
                                                    paddingLeft: line.indent ? `${line.indent * 16}px` : undefined,
                                                }}
                                            >
                                                {line.content}
                                            </div>
                                        ))}

                                        {/* Input */}
                                        <div className="flex items-center mt-2">
                                            <span className="terminal-prompt">projects $ </span>
                                            <input
                                                type="text"
                                                value={terminalInput}
                                                onChange={(e) => setTerminalInput(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && handleTerminalCommand()}
                                                className="terminal-input flex-1"
                                                placeholder="help"
                                                spellCheck={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-terminal-border px-6 py-8 text-center text-sm text-gray-500">
                <p>Built with ❤️ in Nishit&apos;s Dev Multiverse</p>
            </footer>
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="rounded-xl border border-terminal-border bg-cosmic-dark/50 backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: `0 0 20px ${categoryColors[project.category]}10` }}
        >
            {/* Category bar */}
            <div
                className="h-1"
                style={{ background: `linear-gradient(90deg, ${categoryColors[project.category]}, transparent)` }}
            />

            <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-display font-bold text-white">{project.title}</h3>
                        <span
                            className="text-xs font-mono"
                            style={{ color: categoryColors[project.category] }}
                        >
                            {categoryNames[project.category]}
                        </span>
                    </div>
                    <span className="text-xs font-mono text-gray-600">#{project.id}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400">{project.description}</p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 rounded text-xs font-mono bg-neon-cyan/10 text-neon-cyan"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Architecture */}
                <div className="text-xs font-mono text-gray-500 border-l-2 border-neon-violet/30 pl-3">
                    {project.architecture}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-4 py-2 rounded-lg text-sm font-mono bg-neon-violet/10 border border-neon-violet/30 text-neon-violet hover:bg-neon-violet/20 transition-colors"
                        >
                            View on GitHub →
                        </motion.button>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

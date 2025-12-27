"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { apiSections, ApiEndpoint, curlExample } from "@/components/api/apiData";
import ApiSidebar from "@/components/api/ApiSidebar";
import EndpointCard from "@/components/api/EndpointCard";
import ResponsePanel from "@/components/api/ResponsePanel";

export default function ApiDocsPage() {
    const [activeSection, setActiveSection] = useState("overview");
    const [activeEndpoint, setActiveEndpoint] = useState<ApiEndpoint | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleSectionClick = useCallback((id: string) => {
        setActiveSection(id);
        sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleTryIt = useCallback((endpoint: ApiEndpoint) => {
        setIsLoading(true);
        setActiveEndpoint(endpoint);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    // Update active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = document.querySelector("#main-content")?.scrollTop || 0;
            for (const section of apiSections) {
                const el = sectionRefs.current[section.id];
                if (el && el.offsetTop <= scrollPos + 100) {
                    setActiveSection(section.id);
                }
            }
        };
        const mainContent = document.querySelector("#main-content");
        mainContent?.addEventListener("scroll", handleScroll);
        return () => mainContent?.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="h-screen flex flex-col bg-cosmic-dark">
            {/* Header */}
            <header className="shrink-0 px-6 py-4 border-b border-neon-cyan/20 bg-cosmic-dark/80 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
                            <span>📡</span>
                            Nishit&apos;s Dev Multiverse — Public API
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Programmatic access to my skills, experience & projects
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded text-xs font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                            v1.0.0
                        </span>
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-lg text-sm font-mono bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                            >
                                ← Terminal
                            </motion.button>
                        </Link>
                        <a href="https://github.com/NishitBhardwaj" target="_blank" rel="noopener noreferrer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-lg text-sm font-mono bg-neon-violet/10 border border-neon-violet/30 text-neon-violet hover:bg-neon-violet/20 transition-colors"
                            >
                                GitHub →
                            </motion.button>
                        </a>
                    </div>
                </div>
            </header>

            {/* Main layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <ApiSidebar activeSection={activeSection} onSectionClick={handleSectionClick} />

                {/* Main content */}
                <main
                    id="main-content"
                    className="flex-1 overflow-y-auto p-6 space-y-12"
                >
                    {/* Overview section */}
                    <section
                        ref={(el) => { sectionRefs.current["overview"] = el; }}
                        id="overview"
                        className="space-y-6"
                    >
                        <div>
                            <h2 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-2">
                                📋 Overview
                            </h2>
                            <p className="text-gray-400 max-w-2xl">
                                {apiSections[0].description}
                            </p>
                        </div>

                        {/* Example request */}
                        <div className="rounded-lg border border-terminal-border bg-black/30 overflow-hidden max-w-2xl">
                            <div className="px-4 py-2 border-b border-terminal-border bg-white/5 flex items-center justify-between">
                                <span className="text-xs font-mono text-gray-500">Example Request</span>
                                <span className="text-xs font-mono text-neon-cyan">cURL</span>
                            </div>
                            <pre className="p-4 text-sm font-mono overflow-x-auto">
                                <code className="text-gray-300">{curlExample}</code>
                            </pre>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Base URL:</span>
                            <code className="px-2 py-1 rounded bg-white/5 text-neon-cyan font-mono">
                                https://nishitsdevmultiverse.com/api
                            </code>
                        </div>
                    </section>

                    {/* Other sections */}
                    {apiSections.slice(1).map((section) => (
                        <section
                            key={section.id}
                            ref={(el) => { sectionRefs.current[section.id] = el; }}
                            id={section.id}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-2">
                                    {section.icon} {section.title}
                                </h2>
                                {section.description && (
                                    <p className="text-gray-400 max-w-2xl">{section.description}</p>
                                )}
                            </div>

                            {/* Endpoints */}
                            {section.endpoints.length > 0 && (
                                <div className="space-y-4">
                                    {section.endpoints.map((endpoint) => (
                                        <EndpointCard
                                            key={endpoint.id}
                                            endpoint={endpoint}
                                            onTryIt={handleTryIt}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Support section special content */}
                            {section.id === "support" && (
                                <div className="flex flex-wrap gap-4">
                                    <a href="mailto:nishitbhardwaj11@gmail.com">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 rounded-lg text-sm font-mono"
                                            style={{
                                                background: "linear-gradient(135deg, rgba(35, 243, 255, 0.2), rgba(157, 78, 221, 0.2))",
                                                border: "1px solid rgba(35, 243, 255, 0.4)",
                                                color: "#fff",
                                            }}
                                        >
                                            ✉️ Email Mission Commander
                                        </motion.button>
                                    </a>
                                    <a href="https://linkedin.com/in/nishit-bhardwaj" target="_blank" rel="noopener noreferrer">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 rounded-lg text-sm font-mono"
                                            style={{
                                                background: "rgba(10, 102, 194, 0.2)",
                                                border: "1px solid rgba(10, 102, 194, 0.4)",
                                                color: "#fff",
                                            }}
                                        >
                                            💼 Connect on LinkedIn
                                        </motion.button>
                                    </a>
                                </div>
                            )}
                        </section>
                    ))}

                    {/* Footer */}
                    <footer className="border-t border-terminal-border pt-8 text-center text-sm text-gray-500">
                        <p>Built with ❤️ in Nishit&apos;s Dev Multiverse</p>
                        <p className="mt-1">© 2025 Nishit Bhardwaj</p>
                    </footer>
                </main>

                {/* Response Panel */}
                <ResponsePanel
                    endpoint={activeEndpoint}
                    isLoading={isLoading}
                    onClose={() => setActiveEndpoint(null)}
                />
            </div>
        </div>
    );
}

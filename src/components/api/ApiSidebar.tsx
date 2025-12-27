"use client";

import { motion } from "framer-motion";
import { apiSections } from "./apiData";

interface SidebarProps {
    activeSection: string;
    onSectionClick: (id: string) => void;
}

export default function ApiSidebar({ activeSection, onSectionClick }: SidebarProps) {
    return (
        <aside className="w-64 shrink-0 border-r border-neon-cyan/20 bg-cosmic-dark/50 backdrop-blur-sm overflow-y-auto">
            <div className="p-4">
                <h2 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">
                    API Reference
                </h2>
                <nav className="space-y-1">
                    {apiSections.map((section) => (
                        <motion.button
                            key={section.id}
                            whileHover={{ x: 4 }}
                            onClick={() => onSectionClick(section.id)}
                            className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-mono transition-all
                ${activeSection === section.id
                                    ? "bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }
              `}
                        >
                            <span>{section.icon}</span>
                            <span>{section.title}</span>
                            {section.endpoints.length > 0 && (
                                <span className="ml-auto text-xs text-gray-600">
                                    {section.endpoints.length}
                                </span>
                            )}
                        </motion.button>
                    ))}
                </nav>
            </div>

            {/* Version badge */}
            <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 rounded text-xs font-mono bg-neon-violet/10 text-neon-violet border border-neon-violet/30">
                    v1.0.0
                </span>
            </div>
        </aside>
    );
}

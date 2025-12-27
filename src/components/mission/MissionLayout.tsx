"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { USER_INFO } from "@/lib/constants";

interface SidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

const menuItems = [
    { id: "home", label: "Home", icon: "🏠", path: "/" },
    { id: "story", label: "Story", icon: "📖", path: "/story" },
    { id: "services", label: "APIs & Services", icon: "⚡" },
    { id: "databases", label: "Databases", icon: "🗄️" },
    { id: "telemetry", label: "Skills Telemetry", icon: "📊" },
    { id: "devops", label: "DevOps Monitoring", icon: "🔧" },
    { id: "contact", label: "Contact Commander", icon: "📡" },
];

export function MissionHeader() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="h-16 bg-cosmic-dark/80 backdrop-blur-md border-b border-terminal-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-2xl"
                >
                    🛰️
                </motion.div>
                <div>
                    <h1 className="text-lg font-display font-bold text-white">
                        {USER_INFO.portfolioName}
                    </h1>
                    <p className="text-xs text-neon-cyan font-mono">MISSION CONTROL CENTER</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-500"
                    />
                    <span className="text-xs font-mono text-gray-400">ALL SYSTEMS NOMINAL</span>
                </div>

                {/* Timestamp */}
                <div className="text-right">
                    <p className="text-xs text-gray-500 font-mono">Last Sync</p>
                    <p className="text-sm text-neon-cyan font-mono">
                        {time.toLocaleTimeString("en-US", { hour12: false })}
                    </p>
                </div>
            </div>
        </header>
    );
}

export function MissionSidebar({ activeSection, onSectionChange }: SidebarProps) {
    return (
        <aside className="w-64 bg-cosmic-dark/60 backdrop-blur-md border-r border-terminal-border h-full overflow-y-auto">
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const isExternalLink = item.path;
                    const isActive = activeSection === item.id;

                    const content = (
                        <motion.div
                            whileHover={{ x: 5 }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${isActive
                                    ? "bg-neon-cyan/20 border border-neon-cyan/40"
                                    : "hover:bg-terminal-bg"
                                }`}
                            onClick={() => !isExternalLink && onSectionChange(item.id)}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span
                                className={`text-sm font-mono ${isActive ? "text-neon-cyan" : "text-gray-400"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </motion.div>
                    );

                    if (isExternalLink) {
                        return (
                            <Link key={item.id} href={item.path}>
                                {content}
                            </Link>
                        );
                    }

                    return <div key={item.id}>{content}</div>;
                })}
            </nav>

            {/* Radar Animation */}
            <div className="p-4 mt-auto">
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 rounded-full border border-neon-cyan/30" />
                    <div className="absolute inset-4 rounded-full border border-neon-cyan/20" />
                    <div className="absolute inset-8 rounded-full border border-neon-cyan/10" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent 0%, rgba(35, 243, 255, 0.3) 10%, transparent 20%)",
                            borderRadius: "50%",
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-mono text-neon-cyan">SCAN</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

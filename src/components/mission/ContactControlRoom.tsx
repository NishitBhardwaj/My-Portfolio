"use client";

import { motion } from "framer-motion";
import { USER_INFO } from "@/lib/constants";
import Link from "next/link";

const contacts = [
    {
        icon: "✉️",
        label: "Email",
        value: USER_INFO.email,
        href: `mailto:${USER_INFO.email}`,
        color: "#23f3ff",
    },
    {
        icon: "🐙",
        label: "GitHub",
        value: "github.com/NishitBhardwaj",
        href: USER_INFO.github,
        color: "#9d4edd",
    },
    {
        icon: "💼",
        label: "LinkedIn",
        value: "linkedin.com/in/nishitbhardwaj4",
        href: USER_INFO.linkedin,
        color: "#ff00e6",
    },
];

export default function ContactControlRoom() {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">📡</span> CONTACT CONTROL ROOM
            </h2>
            <div className="holographic rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {contacts.map((contact, index) => (
                        <motion.a
                            key={contact.label}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="flex items-center gap-4 p-4 rounded-lg bg-cosmic-dark/50 hover:bg-cosmic-dark/80 transition-all group"
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                                style={{
                                    background: `${contact.color}20`,
                                    boxShadow: `0 0 20px ${contact.color}30`,
                                }}
                            >
                                {contact.icon}
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-mono">{contact.label}</p>
                                <p
                                    className="text-sm font-medium group-hover:text-neon-glow transition-all"
                                    style={{ color: contact.color }}
                                >
                                    {contact.value}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Return Home Button */}
                <div className="flex justify-center">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-lg font-mono text-sm flex items-center gap-3"
                            style={{
                                background: "linear-gradient(135deg, rgba(35, 243, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%)",
                                border: "1px solid rgba(35, 243, 255, 0.4)",
                                color: "#23f3ff",
                            }}
                        >
                            <span>←</span>
                            <span>Return to Terminal</span>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

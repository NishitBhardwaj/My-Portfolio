"use client";

import { motion } from "framer-motion";

const techLogos = [
    { name: "React.js", color: "#61DAFB", icon: "⚛️" },
    { name: "Node.js", color: "#339933", icon: "🟢" },
    { name: "FastAPI", color: "#009688", icon: "⚡" },
    { name: "Docker", color: "#2496ED", icon: "🐳" },
    { name: "AWS", color: "#FF9900", icon: "☁️" },
    { name: "MongoDB", color: "#47A248", icon: "🍃" },
];

export default function TechLogosReveal() {
    return (
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-8">
            {techLogos.map((tech, index) => (
                <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.15,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    whileHover={{
                        scale: 1.1,
                        y: -5,
                        transition: { duration: 0.2 }
                    }}
                    className="flex flex-col items-center gap-2"
                >
                    <div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-3xl md:text-4xl holographic"
                        style={{
                            boxShadow: `0 0 30px ${tech.color}40`,
                        }}
                    >
                        {tech.icon}
                    </div>
                    <span className="text-sm font-mono text-gray-400">{tech.name}</span>
                </motion.div>
            ))}
        </div>
    );
}

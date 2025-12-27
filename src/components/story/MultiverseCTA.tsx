"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import WarpTransition from "@/components/WarpTransition";

const universes = [
    {
        id: "mission",
        name: "Mission Control",
        icon: "🚀",
        description: "NASA Dashboard UI",
        path: "/mission",
        color: "#23f3ff",
    },
    {
        id: "game",
        name: "Game Universe",
        icon: "🎮",
        description: "Pixel Retro World",
        path: "/game",
        color: "#9d4edd",
    },
    {
        id: "map",
        name: "Mind Map",
        icon: "🗺️",
        description: "Skills Visualization",
        path: "/map",
        color: "#ff00e6",
    },
];

export default function MultiverseCTA() {
    const router = useRouter();
    const [isWarping, setIsWarping] = useState(false);
    const [warpDestination, setWarpDestination] = useState("");

    const handleNavigate = (path: string, name: string) => {
        setWarpDestination(name);
        setIsWarping(true);
        setTimeout(() => {
            router.push(path);
        }, 2000);
    };

    return (
        <>
            <AnimatePresence>
                {isWarping && <WarpTransition destination={warpDestination} />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl mx-auto text-center"
            >
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
                    Where will you go next?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {universes.map((universe, index) => (
                        <motion.button
                            key={universe.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.05,
                                y: -5,
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleNavigate(universe.path, universe.name)}
                            className="holographic rounded-xl p-6 text-left transition-all cursor-pointer group"
                            style={{
                                boxShadow: `0 0 20px ${universe.color}20`,
                            }}
                        >
                            <div className="text-4xl mb-3">{universe.icon}</div>
                            <h4
                                className="text-lg font-display font-bold mb-1"
                                style={{ color: universe.color }}
                            >
                                {universe.name}
                            </h4>
                            <p className="text-sm text-gray-500">{universe.description}</p>

                            {/* Arrow indicator */}
                            <div
                                className="mt-4 flex items-center gap-2 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: universe.color }}
                            >
                                <span>Enter</span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </>
    );
}

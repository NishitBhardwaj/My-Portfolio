"use client";

import { motion } from "framer-motion";

/* ── node data ────────────────────────────────────────── */
const rows = [
    // Row 0 – entry
    [
        { id: "client", label: "React Client", icon: "⚛️", color: "#61DAFB" },
        { id: "gateway", label: "API Gateway", icon: "🚪", color: "#FF9900" },
    ],
    // Row 1 – services
    [
        { id: "auth", label: "Auth / JWT", icon: "🔐", color: "#9d4edd" },
        { id: "fastapi", label: "FastAPI", icon: "⚡", color: "#009688" },
        { id: "redis", label: "Redis Cache", icon: "🔴", color: "#DC382D" },
    ],
    // Row 2 – data stores + infra
    [
        { id: "mongo", label: "MongoDB", icon: "🍃", color: "#47A248" },
        { id: "cassandra", label: "Cassandra", icon: "👁️", color: "#1287B1" },
        { id: "docker", label: "Docker", icon: "🐳", color: "#2496ED" },
    ],
];

const allNodes = rows.flat();

/* ── connections between nodes ────────────────────────── */
const connections: [string, string][] = [
    ["client", "gateway"],
    ["gateway", "auth"],
    ["gateway", "fastapi"],
    ["gateway", "redis"],
    ["fastapi", "mongo"],
    ["fastapi", "cassandra"],
    ["mongo", "docker"],
    ["cassandra", "docker"],
];

/* ── animated connector arrow between two nodes ──────── */
function ConnectorArrow({ delay }: { delay: number }) {
    return (
        <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <motion.span
                className="text-neon-cyan text-lg"
                animate={{ opacity: [0.3, 1, 0.3], x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                →
            </motion.span>
        </motion.div>
    );
}

function DownArrow({ delay, color = "#23f3ff" }: { delay: number; color?: string }) {
    return (
        <motion.div
            className="flex items-center justify-center py-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <motion.span
                style={{ color }}
                className="text-lg"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                ↓
            </motion.span>
        </motion.div>
    );
}

/* ── single node card ─────────────────────────────────── */
function NodeCard({ node, index }: { node: typeof allNodes[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, y: -4, transition: { duration: 0.2 } }}
            className="holographic rounded-xl p-3 flex flex-col items-center cursor-pointer min-w-[85px]"
            style={{ boxShadow: `0 0 18px ${node.color}25` }}
        >
            <span className="text-2xl mb-1">{node.icon}</span>
            <span className="text-xs font-mono text-gray-400 whitespace-nowrap">{node.label}</span>
        </motion.div>
    );
}

/* ── main component ───────────────────────────────────── */
export default function SystemArchitecture() {
    return (
        <div className="w-full max-w-3xl mx-auto mt-8 px-4">
            {/* Row 0: Client → Gateway */}
            <div className="flex items-center justify-center gap-4">
                <NodeCard node={rows[0][0]} index={0} />
                <ConnectorArrow delay={0.3} />
                <NodeCard node={rows[0][1]} index={1} />
            </div>

            {/* Down arrows from Gateway to Row 1 */}
            <div className="flex justify-center gap-16 md:gap-24">
                <DownArrow delay={0.5} color="#FF9900" />
                <DownArrow delay={0.6} color="#FF9900" />
                <DownArrow delay={0.7} color="#FF9900" />
            </div>

            {/* Row 1: Auth | FastAPI | Redis */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
                <NodeCard node={rows[1][0]} index={2} />
                <ConnectorArrow delay={0.7} />
                <NodeCard node={rows[1][1]} index={3} />
                <ConnectorArrow delay={0.8} />
                <NodeCard node={rows[1][2]} index={4} />
            </div>

            {/* Down arrows from services to data */}
            <div className="flex justify-center gap-16 md:gap-24">
                <DownArrow delay={0.9} color="#009688" />
                <DownArrow delay={1.0} color="#009688" />
                <DownArrow delay={1.1} color="#009688" />
            </div>

            {/* Row 2: MongoDB | Cassandra | Docker */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
                <NodeCard node={rows[2][0]} index={5} />
                <ConnectorArrow delay={1.1} />
                <NodeCard node={rows[2][1]} index={6} />
                <ConnectorArrow delay={1.2} />
                <NodeCard node={rows[2][2]} index={7} />
            </div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4 }}
                className="mt-8 flex flex-wrap justify-center gap-3"
            >
                {["RESTful APIs", "JWT Auth", "Microservices", "Redis Caching", "FastAPI", "NoSQL"].map((item) => (
                    <span
                        key={item}
                        className="px-3 py-1 text-xs font-mono rounded-full holographic text-neon-cyan"
                    >
                        • {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

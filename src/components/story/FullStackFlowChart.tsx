"use client";

import { motion } from "framer-motion";

const flowSteps = [
    { id: "user", label: "User Request", icon: "👤", color: "#23f3ff" },
    { id: "react", label: "React Frontend", icon: "⚛️", color: "#61DAFB" },
    { id: "gateway", label: "API Gateway", icon: "🚪", color: "#FF9900" },
    { id: "fastapi", label: "FastAPI Service", icon: "⚡", color: "#009688" },
    { id: "auth", label: "JWT Auth", icon: "🔐", color: "#9d4edd" },
    { id: "logic", label: "Business Logic", icon: "🧠", color: "#ff00e6" },
];

const dataStores = [
    { id: "redis", label: "Redis Cache", icon: "🔴", color: "#DC382D" },
    { id: "mongo", label: "MongoDB", icon: "🍃", color: "#47A248" },
    { id: "cassandra", label: "Cassandra", icon: "👁️", color: "#1287B1" },
    { id: "mysql", label: "MySQL", icon: "🐬", color: "#4479A1" },
];

const responseFlow = [
    { id: "serialize", label: "JSON Response", icon: "📄", color: "#23f3ff" },
    { id: "cdn", label: "CDN Cache", icon: "🌍", color: "#8C4FFF" },
    { id: "client", label: "Client Render", icon: "🖥️", color: "#61DAFB" },
];

/* Inline arrow between nodes */
function FlowArrow({ delay, color = "#23f3ff" }: { delay: number; color?: string }) {
    return (
        <motion.div
            className="flex items-center mx-0.5 md:mx-1 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <motion.span
                style={{ color }}
                className="text-sm"
                animate={{ opacity: [0.3, 1, 0.3], x: [0, 2, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
            >
                →
            </motion.span>
        </motion.div>
    );
}

/* Node card */
function NodeCard({ node, index, delay = 0 }: { node: { id: string; label: string; icon: string; color: string }; index: number; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + index * 0.08, type: "spring", stiffness: 200 }}
            whileHover={{ y: -5, scale: 1.08, transition: { duration: 0.2 } }}
            className="flex flex-col items-center"
        >
            <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl holographic flex items-center justify-center text-xl md:text-2xl mb-1"
                animate={{
                    boxShadow: [
                        `0 0 8px ${node.color}25`,
                        `0 0 20px ${node.color}45`,
                        `0 0 8px ${node.color}25`,
                    ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
            >
                {node.icon}
            </motion.div>
            <span className="text-[10px] md:text-xs font-mono text-gray-400 text-center whitespace-nowrap">
                {node.label}
            </span>
        </motion.div>
    );
}

/* Data store card (slightly different style) */
function DataCard({ node, index }: { node: { id: string; label: string; icon: string; color: string }; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ y: -4, scale: 1.08, transition: { duration: 0.2 } }}
            className="flex flex-col items-center"
        >
            <motion.div
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl mb-1"
                style={{
                    background: `linear-gradient(135deg, ${node.color}12, ${node.color}06)`,
                    border: `1px solid ${node.color}35`,
                }}
                animate={{
                    borderColor: [`${node.color}35`, `${node.color}70`, `${node.color}35`],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
            >
                {node.icon}
            </motion.div>
            <span className="text-[10px] md:text-xs font-mono text-gray-400 text-center">
                {node.label}
            </span>
        </motion.div>
    );
}

export default function FullStackFlowChart() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-12">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-display font-bold text-center mb-8"
                style={{ background: "linear-gradient(90deg, #23f3ff, #9d4edd, #ff00e6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
                🔄 Full Stack Request Lifecycle
            </motion.h3>

            {/* ── REQUEST FLOW ── */}
            <motion.div
                className="text-xs font-mono text-neon-cyan mb-3 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                REQUEST FLOW →
            </motion.div>

            <div className="flex items-start justify-center flex-wrap gap-y-2 px-2">
                {flowSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <NodeCard node={step} index={index} />
                        {index < flowSteps.length - 1 && (
                            <FlowArrow delay={0.3 + index * 0.08} color={step.color} />
                        )}
                    </div>
                ))}
            </div>

            {/* ── DATA LAYER ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-xs font-mono text-neon-violet my-4 text-center"
            >
                ↓ DATA LAYER ↓
            </motion.div>

            <div className="flex justify-center gap-4 md:gap-8">
                {dataStores.map((store, index) => (
                    <DataCard key={store.id} node={store} index={index} />
                ))}
            </div>

            {/* ── RESPONSE FLOW ── */}
            <motion.div
                className="text-xs font-mono text-neon-pink my-4 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
            >
                ← RESPONSE FLOW
            </motion.div>

            <div className="flex items-start justify-center gap-y-2 px-2">
                {responseFlow.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <NodeCard node={step} index={index} delay={1.2} />
                        {index < responseFlow.length - 1 && (
                            <FlowArrow delay={1.3 + index * 0.1} color={step.color} />
                        )}
                    </div>
                ))}
            </div>

            {/* Tech badges */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
            >
                {["FastAPI", "Redis", "Cassandra", "MongoDB", "Docker", "WebSocket", "gRPC"].map((badge) => (
                    <motion.span
                        key={badge}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 text-xs font-mono rounded-full"
                        style={{
                            background: "linear-gradient(135deg, rgba(35,243,255,0.1), rgba(157,78,221,0.1))",
                            border: "1px solid rgba(35,243,255,0.3)",
                            color: "#23f3ff",
                        }}
                    >
                        {badge}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}

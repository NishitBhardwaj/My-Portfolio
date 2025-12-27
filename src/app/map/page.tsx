"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Node,
} from "reactflow";
import "reactflow/dist/style.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { initialNodes, initialEdges } from "@/components/map/mapData";
import { nodeTypes } from "@/components/map/CustomNodes";
import DetailPanel from "@/components/map/DetailPanel";

export default function MapPage() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedNode(node.id);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    return (
        <div className="h-screen w-full relative overflow-hidden">
            {/* Background stars */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse at center, #2b0a3d 0%, #0c2340 40%, #0a0a0f 100%)",
                }}
            >
                {/* Star field */}
                {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 2 + 1 + "px",
                            height: Math.random() * 2 + 1 + "px",
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <div className="absolute top-4 left-4 z-30">
                <h1 className="text-2xl font-display font-bold text-white mb-1">
                    🔮 Skill Mind Map
                </h1>
                <p className="text-sm text-gray-400 font-mono">
                    Click nodes to explore • Scroll to zoom • Drag to pan
                </p>
            </div>

            {/* React Flow */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                fitView
                minZoom={0.3}
                maxZoom={2}
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                className="z-10"
            >
                <Controls
                    className="!bg-cosmic-dark/80 !border-neon-cyan/30"
                />
                <Background color="#23f3ff" gap={50} size={1} style={{ opacity: 0.1 }} />
            </ReactFlow>

            {/* Detail Panel */}
            <DetailPanel nodeId={selectedNode} onClose={() => setSelectedNode(null)} />

            {/* Bottom Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex gap-3 px-6 py-3 rounded-full"
                    style={{
                        background: "rgba(10, 10, 15, 0.8)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(35, 243, 255, 0.3)",
                    }}
                >
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg text-xs font-mono"
                            style={{
                                background: "rgba(35, 243, 255, 0.1)",
                                border: "1px solid rgba(35, 243, 255, 0.3)",
                                color: "#23f3ff",
                            }}
                        >
                            🖥️ Terminal
                        </motion.button>
                    </Link>

                    <Link href="/game">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg text-xs font-mono"
                            style={{
                                background: "rgba(157, 78, 221, 0.1)",
                                border: "1px solid rgba(157, 78, 221, 0.3)",
                                color: "#9d4edd",
                            }}
                        >
                            🎮 Game World
                        </motion.button>
                    </Link>

                    <Link href="/mission">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg text-xs font-mono"
                            style={{
                                background: "rgba(255, 0, 230, 0.1)",
                                border: "1px solid rgba(255, 0, 230, 0.3)",
                                color: "#ff00e6",
                            }}
                        >
                            🛰️ Mission Control
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

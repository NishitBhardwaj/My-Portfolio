"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { motion } from "framer-motion";

// Center Node - Main node for Nishit
export const CenterNode = memo(({ data }: NodeProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer"
        >
            {/* Outer glow ring */}
            <motion.div
                animate={{
                    boxShadow: [
                        "0 0 20px rgba(35, 243, 255, 0.5), 0 0 40px rgba(157, 78, 221, 0.3)",
                        "0 0 40px rgba(35, 243, 255, 0.7), 0 0 60px rgba(157, 78, 221, 0.5)",
                        "0 0 20px rgba(35, 243, 255, 0.5), 0 0 40px rgba(157, 78, 221, 0.3)",
                    ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
            />

            {/* Node body */}
            <div
                className="relative px-8 py-6 rounded-full text-center"
                style={{
                    background: "linear-gradient(135deg, rgba(35, 243, 255, 0.2), rgba(157, 78, 221, 0.2))",
                    border: "2px solid rgba(35, 243, 255, 0.6)",
                    minWidth: "180px",
                }}
            >
                <div className="text-2xl mb-1">🔮</div>
                <div className="text-white font-display font-bold text-lg">{data.label}</div>
                <div className="text-neon-cyan text-xs font-mono">{data.subtitle}</div>
            </div>

            {/* Handles for connections */}
            <Handle type="source" position={Position.Top} className="!bg-neon-cyan" />
            <Handle type="source" position={Position.Bottom} className="!bg-neon-cyan" />
            <Handle type="source" position={Position.Left} className="!bg-neon-cyan" />
            <Handle type="source" position={Position.Right} className="!bg-neon-cyan" />
        </motion.div>
    );
});
CenterNode.displayName = "CenterNode";

// Branch Node - Main category nodes
export const BranchNode = memo(({ data }: NodeProps) => {
    const color = data.color || "#23f3ff";

    return (
        <motion.div
            whileHover={{ scale: 1.15 }}
            className="relative cursor-pointer"
        >
            {/* Glow effect */}
            <motion.div
                animate={{
                    boxShadow: [
                        `0 0 15px ${color}60`,
                        `0 0 25px ${color}80`,
                        `0 0 15px ${color}60`,
                    ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-xl"
            />

            {/* Node body */}
            <div
                className="relative px-6 py-4 rounded-xl text-center"
                style={{
                    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                    border: `2px solid ${color}80`,
                    minWidth: "140px",
                }}
            >
                <div className="font-display font-bold text-white">{data.label}</div>
            </div>

            {/* Handles */}
            <Handle type="target" position={Position.Top} className="!bg-neon-cyan !w-2 !h-2" style={{ background: color }} />
            <Handle type="source" position={Position.Bottom} className="!bg-neon-cyan !w-2 !h-2" style={{ background: color }} />
            <Handle type="source" position={Position.Left} className="!bg-neon-cyan !w-2 !h-2" style={{ background: color }} />
            <Handle type="source" position={Position.Right} className="!bg-neon-cyan !w-2 !h-2" style={{ background: color }} />
        </motion.div>
    );
});
BranchNode.displayName = "BranchNode";

// Skill Node - Individual skill nodes
export const SkillNode = memo(({ data, selected }: NodeProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            className="relative cursor-pointer"
        >
            {/* Selection indicator */}
            {selected && (
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -inset-2 rounded-lg border-2 border-neon-cyan"
                />
            )}

            {/* Node body */}
            <div
                className="relative px-4 py-2 rounded-lg text-center transition-all"
                style={{
                    background: selected
                        ? "linear-gradient(135deg, rgba(35, 243, 255, 0.3), rgba(157, 78, 221, 0.3))"
                        : "rgba(10, 10, 15, 0.8)",
                    border: selected ? "1px solid #23f3ff" : "1px solid rgba(35, 243, 255, 0.3)",
                    boxShadow: selected ? "0 0 20px rgba(35, 243, 255, 0.5)" : "none",
                }}
            >
                <div className="text-sm font-mono text-white whitespace-nowrap">{data.label}</div>
            </div>

            {/* Handle */}
            <Handle type="target" position={Position.Top} className="!bg-neon-cyan !w-1.5 !h-1.5" />
        </motion.div>
    );
});
SkillNode.displayName = "SkillNode";

// Export node types for React Flow
export const nodeTypes = {
    centerNode: CenterNode,
    branchNode: BranchNode,
    skillNode: SkillNode,
};

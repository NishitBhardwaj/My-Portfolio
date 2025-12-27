"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building, DialogueState } from "@/components/game/gameConstants";
import DialogueBox from "@/components/game/DialogueBox";
import ProjectModal from "@/components/game/ProjectModal";
import ControlsOverlay from "@/components/game/ControlsOverlay";

// Dynamic import to avoid SSR issues with canvas
const GameCanvas = dynamic(() => import("@/components/game/GameCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-[70vh]">
            <div className="text-neon-cyan font-mono animate-pulse">Loading game...</div>
        </div>
    ),
});

export default function GamePage() {
    const router = useRouter();
    const [showControls, setShowControls] = useState(true);
    const [dialogue, setDialogue] = useState<DialogueState>({
        isOpen: false,
        title: "",
        lines: [],
        currentLine: 0,
        displayedText: "",
        actions: undefined,
    });
    const [projectModal, setProjectModal] = useState({
        isOpen: false,
        projectIndex: 0,
    });

    const handleInteract = useCallback((building: Building) => {
        setDialogue({
            isOpen: true,
            title: building.name,
            lines: building.dialogue,
            currentLine: 0,
            displayedText: "",
            actions: building.actions,
        });
    }, []);

    const handleDialogueClose = useCallback(() => {
        setDialogue((prev) => ({ ...prev, isOpen: false }));
    }, []);

    const handleAdvanceLine = useCallback(() => {
        setDialogue((prev) => ({
            ...prev,
            currentLine: prev.currentLine + 1,
        }));
    }, []);

    const handleDialogueAction = useCallback(
        (action: string, data?: unknown) => {
            switch (action) {
                case "project":
                    setDialogue((prev) => ({ ...prev, isOpen: false }));
                    setProjectModal({ isOpen: true, projectIndex: data as number });
                    break;
                case "navigate":
                    router.push(data as string);
                    break;
                case "link":
                    window.open(data as string, "_blank");
                    break;
                default:
                    break;
            }
        },
        [router]
    );

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{
                background: "linear-gradient(180deg, #0a0a0f 0%, #2b0a3d 50%, #0c2340 100%)",
            }}
        >
            {/* Header */}
            <div className="text-center mb-4">
                <h1
                    className="text-neon-cyan mb-2"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "20px" }}
                >
                    🎮 PIXEL WORLD
                </h1>
                <p
                    className="text-gray-400"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
                >
                    Nishit&apos;s Dev Multiverse
                </p>
            </div>

            {/* Game Container */}
            <div className="relative">
                {/* Scanline overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-10 opacity-10"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                    }}
                />

                {/* Game Canvas */}
                <GameCanvas onInteract={handleInteract} />

                {/* Dialogue Box */}
                <DialogueBox
                    dialogue={dialogue}
                    onClose={handleDialogueClose}
                    onAction={handleDialogueAction}
                    onAdvanceLine={handleAdvanceLine}
                />
            </div>

            {/* Controls hint */}
            <div className="mt-4 flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowControls(true)}
                    className="px-4 py-2 rounded text-xs"
                    style={{
                        fontFamily: "'Press Start 2P', monospace",
                        background: "rgba(35, 243, 255, 0.1)",
                        border: "1px solid rgba(35, 243, 255, 0.3)",
                        color: "#23f3ff",
                    }}
                >
                    [?] Controls
                </motion.button>

                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded text-xs"
                        style={{
                            fontFamily: "'Press Start 2P', monospace",
                            background: "rgba(157, 78, 221, 0.1)",
                            border: "1px solid rgba(157, 78, 221, 0.3)",
                            color: "#9d4edd",
                        }}
                    >
                        ← Exit to Terminal
                    </motion.button>
                </Link>
            </div>

            {/* Project Modal */}
            <ProjectModal
                isOpen={projectModal.isOpen}
                projectIndex={projectModal.projectIndex}
                onClose={() => setProjectModal({ isOpen: false, projectIndex: 0 })}
            />

            {/* Controls Overlay */}
            <ControlsOverlay isVisible={showControls} onClose={() => setShowControls(false)} />
        </div>
    );
}

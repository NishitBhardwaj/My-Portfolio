"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BOOT_MESSAGES, TERMINAL_COMMANDS, USER_INFO, SKILLS_SIGNATURE, PROJECTS } from "@/lib/constants";
import AvatarPlaceholder from "./AvatarPlaceholder";
import ContactModal from "./ContactModal";
import WarpTransition from "./WarpTransition";
import { executeProjectCommand, CLILine } from "./projects/projectCommands";

interface OutputLine {
    type: "system" | "command" | "response" | "error" | "ascii" | "cli";
    content: string;
    color?: string;
    indent?: number;
}

export default function Terminal() {
    const router = useRouter();
    const [output, setOutput] = useState<OutputLine[]>([]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isBooting, setIsBooting] = useState(true);
    const [showCursor, setShowCursor] = useState(true);
    const [showAvatar, setShowAvatar] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [isWarping, setIsWarping] = useState(false);
    const [warpDestination, setWarpDestination] = useState("");
    const [lastContext, setLastContext] = useState<"" | "resume" | "resume-download">("");

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Boot sequence
    useEffect(() => {
        let index = 0;
        const bootInterval = setInterval(() => {
            if (index < BOOT_MESSAGES.length) {
                setOutput((prev) => [
                    ...prev,
                    { type: "system", content: BOOT_MESSAGES[index] },
                ]);
                index++;
            } else {
                clearInterval(bootInterval);
                setIsBooting(false);
            }
        }, 200);

        return () => clearInterval(bootInterval);
    }, []);

    // Scroll to bottom on new output
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    // Focus input
    useEffect(() => {
        if (!isBooting) {
            inputRef.current?.focus();
        }
    }, [isBooting]);

    // Cursor blink
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(blinkInterval);
    }, []);

    const navigateWithWarp = (path: string, name: string) => {
        setWarpDestination(name);
        setIsWarping(true);
        setTimeout(() => {
            router.push(path);
        }, 2000);
    };

    const handleCommand = (cmd: string) => {
        let trimmedCmd = cmd.trim().toLowerCase();

        if (!trimmedCmd) return;

        // Context-aware numeric shortcuts
        // If user typed 1/2/3 after seeing resume options, remap to the correct command
        const numericMap: Record<string, Record<string, string>> = {
            resume: { "1": "resume sd", "2": "resume ml", "3": "resume fs" },
            "resume-download": { "1": "resume download sd", "2": "resume download ml", "3": "resume download fs" },
        };

        // Support both bare "1"/"2"/"3" and "resume 1"/"resume 2"/"resume 3"
        if (lastContext && numericMap[lastContext]?.[trimmedCmd]) {
            trimmedCmd = numericMap[lastContext][trimmedCmd];
        } else if (trimmedCmd === "resume 1") {
            trimmedCmd = "resume sd";
        } else if (trimmedCmd === "resume 2") {
            trimmedCmd = "resume ml";
        } else if (trimmedCmd === "resume 3") {
            trimmedCmd = "resume fs";
        }

        // Reset context for non-resume commands
        if (!trimmedCmd.startsWith("resume")) {
            setLastContext("");
        }

        // Add to history
        setHistory((prev) => [...prev, trimmedCmd]);
        setHistoryIndex(-1);

        // Add command to output
        setOutput((prev) => [
            ...prev,
            { type: "command", content: `[visitor@earth]~$ ${trimmedCmd}` },
        ]);

        // Process commands
        switch (trimmedCmd) {
            case "help":
                const helpOutput = Object.entries(TERMINAL_COMMANDS)
                    .map(([cmd, desc]) => `  ${cmd.padEnd(12)} → ${desc}`)
                    .join("\n");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Available commands:\n" + helpOutput },
                ]);
                break;

            case "story":
                navigateWithWarp("/story", "Story Universe");
                break;

            case "mission":
                navigateWithWarp("/mission", "Mission Control");
                break;

            case "game":
                navigateWithWarp("/game", "Game Universe");
                break;

            case "map":
                navigateWithWarp("/map", "Mind Map");
                break;

            case "api":
                navigateWithWarp("/api", "API Docs");
                break;

            case "about":
                setOutput((prev) => [
                    ...prev,
                    {
                        type: "response",
                        content: `\n👨‍💻 ${USER_INFO.name}\n   ${USER_INFO.role}\n   📍 ${USER_INFO.location}\n   ✉️  ${USER_INFO.email}\n`,
                    },
                ]);
                setShowAvatar(true);
                break;

            case "skills":
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: `\n🛠️ Skills & Technologies:\n\n   ${SKILLS_SIGNATURE}\n` },
                ]);
                break;

            case "contact":
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "\n📡 Contact Options:\n" },
                    { type: "cli", content: "  1. contact send     → Open contact form", color: "#23f3ff" },
                    { type: "cli", content: "  2. contact email    → nishitbhardwaj11@gmail.com", color: "#9d4edd" },
                    { type: "cli", content: "  3. contact linkedin → Open LinkedIn profile", color: "#0a66c2" },
                    { type: "cli", content: "  4. contact github   → Open GitHub profile", color: "#888" },
                    { type: "cli", content: "\n  Type 'contact <option>' to proceed.\n", color: "#666" },
                ]);
                break;

            case "contact send":
                navigateWithWarp("/contact", "Contact Form");
                break;

            case "contact email":
                window.open("mailto:nishitbhardwaj11@gmail.com", "_blank");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Opening email client..." },
                ]);
                break;

            case "contact linkedin":
                window.open(USER_INFO.linkedin, "_blank");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Opening LinkedIn..." },
                ]);
                break;

            case "contact github":
                window.open(USER_INFO.github, "_blank");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Opening GitHub..." },
                ]);
                break;

            case "github":
                window.open(USER_INFO.github, "_blank");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Opening GitHub in new tab..." },
                ]);
                break;

            case "linkedin":
                window.open(USER_INFO.linkedin, "_blank");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Opening LinkedIn in new tab..." },
                ]);
                break;

            case "resume":
            case "resume view":
                setLastContext("resume");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "\n📄 Select Resume Type:\n" },
                    { type: "cli", content: "  1. resume sd   → Software Developer", color: "#23f3ff" },
                    { type: "cli", content: "  2. resume ml   → Machine Learning Engineer", color: "#9d4edd" },
                    { type: "cli", content: "  3. resume fs   → Full Stack Developer", color: "#ff00e6" },
                    { type: "cli", content: "" },
                    { type: "cli", content: "  Other options:", color: "#888" },
                    { type: "cli", content: "  resume download  → Download a resume", color: "#888" },
                    { type: "cli", content: "  resume email     → Email me about it", color: "#888" },
                    { type: "cli", content: "\n  Type option number (1-3) or full command.\n", color: "#666" },
                ]);
                break;

            case "resume sd":
                setLastContext("");
                navigateWithWarp("/resume?type=sd", "Software Developer Resume");
                break;

            case "resume ml":
                setLastContext("");
                navigateWithWarp("/resume?type=ml", "ML Engineer Resume");
                break;

            case "resume fs":
                setLastContext("");
                navigateWithWarp("/resume?type=fs", "Full Stack Developer Resume");
                break;

            case "resume download":
                setLastContext("resume-download");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "\n⬇ Download Resume:\n" },
                    { type: "cli", content: "  1. resume download sd   → Software Developer", color: "#23f3ff" },
                    { type: "cli", content: "  2. resume download ml   → ML Engineer", color: "#9d4edd" },
                    { type: "cli", content: "  3. resume download fs   → Full Stack Developer", color: "#ff00e6" },
                    { type: "cli", content: "\n  Type option number (1-3) or full command.\n", color: "#666" },
                ]);
                break;

            case "resume download sd": {
                const sdLink = document.createElement("a");
                sdLink.href = "/resumes/software-developer.pdf";
                sdLink.download = "Nishit_Bhardwaj_SD_Resume.pdf";
                sdLink.click();
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Downloading Software Developer resume..." },
                ]);
                break;
            }

            case "resume download ml": {
                const mlLink = document.createElement("a");
                mlLink.href = "/resumes/ml-engineer.pdf";
                mlLink.download = "Nishit_Bhardwaj_ML_Resume.pdf";
                mlLink.click();
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Downloading ML Engineer resume..." },
                ]);
                break;
            }

            case "resume download fs": {
                const fsLink = document.createElement("a");
                fsLink.href = "/resumes/fullstack-developer.pdf";
                fsLink.download = "Nishit_Bhardwaj_FS_Resume.pdf";
                fsLink.click();
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Downloading Full Stack Developer resume..." },
                ]);
                break;
            }

            case "resume email":
                window.open("mailto:nishitbhardwaj11@gmail.com?subject=Regarding Your Resume", "_blank");
                setOutput((prev) => [
                    ...prev,
                    { type: "response", content: "Opening email client..." },
                ]);
                break;

            case "clear":
                setOutput([]);
                setShowAvatar(false);
                break;

            case "home":
            case "cd /":
            case "cd ~":
                // Just reset the terminal since we're already on the home page
                setOutput([]);
                setShowAvatar(false);
                setOutput([{ type: "system", content: "Terminal refreshed. Type 'help' for commands." }]);
                break;

            default:
                // Check for projects commands
                if (trimmedCmd.startsWith("projects")) {
                    const args = trimmedCmd.slice(9).trim().split(/\s+/);
                    const result = executeProjectCommand(args);

                    // Handle actions
                    if (result.action === "clear") {
                        // Just don't add any output
                    } else if (result.action === "open" && result.url) {
                        navigateWithWarp(result.url, "Project Page");
                    } else if (result.action === "github" && result.url) {
                        window.open(result.url, "_blank");
                        setOutput((prev) => [
                            ...prev,
                            ...result.lines.map((line) => ({
                                type: "cli" as const,
                                content: line.content,
                                color: line.color,
                                indent: line.indent,
                            })),
                        ]);
                    } else {
                        setOutput((prev) => [
                            ...prev,
                            ...result.lines.map((line) => ({
                                type: "cli" as const,
                                content: line.content,
                                color: line.color,
                                indent: line.indent,
                            })),
                        ]);
                    }
                } else {
                    setOutput((prev) => [
                        ...prev,
                        {
                            type: "error",
                            content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`,
                        },
                    ]);
                }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex] || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex] || "");
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        }
    };

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <>
            <AnimatePresence>
                {isWarping && <WarpTransition destination={warpDestination} />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mx-auto p-4"
            >
                <div className="terminal-container" onClick={handleTerminalClick}>
                    {/* Terminal Header */}
                    <div className="terminal-header">
                        <div className="terminal-dot bg-red-500"></div>
                        <div className="terminal-dot bg-yellow-500"></div>
                        <div className="terminal-dot bg-green-500"></div>
                        <span className="ml-4 text-sm text-gray-400 font-mono">
                            {USER_INFO.portfolioName} — bash
                        </span>
                    </div>

                    {/* Terminal Body */}
                    <div ref={terminalRef} className="terminal-body min-h-[400px] max-h-[70vh]">
                        {/* Output */}
                        {output.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.1 }}
                                className={`mb-1 whitespace-pre-wrap ${line.type === "command"
                                    ? "text-neon-cyan"
                                    : line.type === "error"
                                        ? "text-red-400"
                                        : line.type === "system"
                                            ? "text-gray-500"
                                            : line.type === "cli"
                                                ? ""
                                                : "text-terminal-text"
                                    }`}
                                style={line.type === "cli" ? {
                                    color: line.color || "#888",
                                    paddingLeft: line.indent ? `${line.indent * 16}px` : undefined,
                                } : undefined}
                            >
                                {line.content}
                            </motion.div>
                        ))}

                        {/* Avatar Placeholder */}
                        <AnimatePresence>
                            {showAvatar && <AvatarPlaceholder />}
                        </AnimatePresence>

                        {/* Input Line */}
                        {!isBooting && !isWarping && (
                            <div className="flex items-center mt-2">
                                <span className="terminal-prompt">[visitor@earth]~$ </span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="terminal-input flex-1"
                                    spellCheck={false}
                                    autoComplete="off"
                                />
                                <span
                                    className={`w-2 h-5 bg-neon-cyan ${showCursor ? "opacity-100" : "opacity-0"
                                        }`}
                                ></span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Contact Modal */}
            <AnimatePresence>
                {showContact && <ContactModal onClose={() => setShowContact(false)} />}
            </AnimatePresence>
        </>
    );
}

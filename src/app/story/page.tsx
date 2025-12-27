"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import {
    Chapter,
    ChapterTitle,
    ChapterSubtitle,
    ChapterContent,
    FadeInWhenVisible,
} from "@/components/story/ChapterComponents";
import TechLogosReveal from "@/components/story/TechLogosReveal";
import CodeSnippetCard from "@/components/story/CodeSnippetCard";
import SystemArchitecture from "@/components/story/SystemArchitecture";
import SystemsThinkingDiagram from "@/components/story/SystemsThinkingDiagram";
import ProjectShowcase from "@/components/story/ProjectShowcase";
import MultiverseCTA from "@/components/story/MultiverseCTA";
import ReturnHomeButton from "@/components/story/ReturnHomeButton";
import StoryAvatarHologram from "@/components/story/StoryAvatarHologram";
import { USER_INFO } from "@/lib/constants";

// Dynamic import for parallax stars to avoid SSR issues
const ParallaxStars = dynamic(() => import("@/components/story/ParallaxStars"), {
    ssr: false,
});

export default function StoryPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <div className="relative">
            {/* Parallax Background */}
            <ParallaxStars />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-neon-cyan z-50"
                style={{
                    scaleX,
                    transformOrigin: "left",
                    background: "linear-gradient(90deg, #23f3ff 0%, #9d4edd 50%, #ff00e6 100%)",
                }}
            />

            {/* Return Home Button */}
            <ReturnHomeButton />

            {/* Main Content */}
            <div className="relative z-10">
                {/* ==================== INTRO ==================== */}
                <Chapter className="relative">
                    <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left flex-1">
                            <ChapterTitle>Welcome to my Origin Story</ChapterTitle>
                            <ChapterSubtitle>
                                How I became a Software Development Engineer
                            </ChapterSubtitle>
                            <ChapterContent className="mt-6">
                                <p className="text-gray-500 font-mono text-sm">
                                    Scroll to explore my journey through code, systems, and endless curiosity.
                                </p>
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="mt-8 text-neon-cyan text-2xl"
                                >
                                    ↓
                                </motion.div>
                            </ChapterContent>
                        </div>
                        <ChapterContent className="flex-shrink-0">
                            <StoryAvatarHologram />
                        </ChapterContent>
                    </div>
                </Chapter>

                {/* ==================== CHAPTER 1: THE BUILDER ==================== */}
                <Chapter>
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeInWhenVisible>
                            <span className="text-neon-violet font-mono text-sm mb-4 block">
                                CHAPTER 01
                            </span>
                        </FadeInWhenVisible>
                        <ChapterTitle>The Builder</ChapterTitle>
                        <ChapterSubtitle className="mx-auto">
                            I started as a curious developer — building things to learn how systems work.
                        </ChapterSubtitle>
                        <TechLogosReveal />
                        <CodeSnippetCard />
                    </div>
                </Chapter>

                {/* ==================== CHAPTER 2: THE ENGINEER ==================== */}
                <Chapter>
                    <div className="max-w-5xl mx-auto text-center">
                        <FadeInWhenVisible>
                            <span className="text-neon-violet font-mono text-sm mb-4 block">
                                CHAPTER 02
                            </span>
                        </FadeInWhenVisible>
                        <ChapterTitle>The Engineer</ChapterTitle>
                        <ChapterSubtitle className="mx-auto">
                            I evolved into a Backend & System Design Engineer.
                        </ChapterSubtitle>
                        <SystemArchitecture />
                    </div>
                </Chapter>

                {/* ==================== CHAPTER 3: THE PROFESSIONAL ==================== */}
                <Chapter>
                    <div className="max-w-4xl mx-auto">
                        <FadeInWhenVisible className="text-center mb-12">
                            <span className="text-neon-violet font-mono text-sm mb-4 block">
                                CHAPTER 03
                            </span>
                            <ChapterTitle>The Professional</ChapterTitle>
                        </FadeInWhenVisible>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column - Profile */}
                            <FadeInWhenVisible delay={0.2}>
                                <div className="holographic rounded-xl p-6">
                                    <h3 className="text-xl font-display font-bold text-white mb-4">
                                        Profile
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-gray-500 text-sm font-mono">Name</span>
                                            <p className="text-neon-cyan font-semibold">{USER_INFO.name}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-sm font-mono">Role</span>
                                            <p className="text-white">{USER_INFO.role}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-sm font-mono">Location</span>
                                            <p className="text-gray-300">{USER_INFO.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInWhenVisible>

                            {/* Right Column - Experience */}
                            <FadeInWhenVisible delay={0.4}>
                                <div className="holographic rounded-xl p-6">
                                    <h3 className="text-xl font-display font-bold text-white mb-4">
                                        Experience
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-lg holographic flex items-center justify-center text-2xl">
                                                💼
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">
                                                    Optimum Research Solutions
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    Software Development Engineer
                                                </p>
                                                <p className="text-neon-violet text-xs font-mono mt-1">
                                                    Building scalable backend systems
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        </div>
                    </div>
                </Chapter>

                {/* ==================== CHAPTER 4: SYSTEMS THINKING ==================== */}
                <Chapter>
                    <div className="max-w-6xl mx-auto text-center">
                        <FadeInWhenVisible>
                            <span className="text-neon-violet font-mono text-sm mb-4 block">
                                CHAPTER 04
                            </span>
                        </FadeInWhenVisible>
                        <ChapterTitle>Systems Thinking</ChapterTitle>
                        <ChapterSubtitle className="mx-auto">
                            Understanding how all the pieces connect to build reliable, scalable systems.
                        </ChapterSubtitle>
                        <SystemsThinkingDiagram />
                    </div>
                </Chapter>

                {/* ==================== CHAPTER 5: MY PROJECTS ==================== */}
                <Chapter>
                    <div className="max-w-5xl mx-auto text-center">
                        <FadeInWhenVisible>
                            <span className="text-neon-violet font-mono text-sm mb-4 block">
                                CHAPTER 05
                            </span>
                        </FadeInWhenVisible>
                        <ChapterTitle>My Projects Come Alive</ChapterTitle>
                        <ChapterSubtitle className="mx-auto mb-8">
                            Real-world applications built with passion and purpose.
                        </ChapterSubtitle>
                        <ProjectShowcase />
                    </div>
                </Chapter>

                {/* ==================== CTA: ENTER THE MULTIVERSE ==================== */}
                <Chapter>
                    <div className="max-w-5xl mx-auto text-center">
                        <FadeInWhenVisible>
                            <span className="text-neon-violet font-mono text-sm mb-4 block">
                                NEXT DESTINATION
                            </span>
                        </FadeInWhenVisible>
                        <ChapterTitle>Enter the Multiverse</ChapterTitle>
                        <ChapterSubtitle className="mx-auto mb-12">
                            My story is just the beginning. Explore the other dimensions of my developer universe.
                        </ChapterSubtitle>
                        <MultiverseCTA />
                    </div>
                </Chapter>

                {/* Footer Spacing */}
                <div className="h-32" />
            </div>
        </div>
    );
}

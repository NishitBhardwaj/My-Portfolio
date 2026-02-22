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
import DockerPipeline from "@/components/story/DockerPipeline";
import AWSArchitecture from "@/components/story/AWSArchitecture";
import FullStackFlowChart from "@/components/story/FullStackFlowChart";
import SystemsThinkingDiagram from "@/components/story/SystemsThinkingDiagram";
import ProjectShowcase from "@/components/story/ProjectShowcase";
import MultiverseCTA from "@/components/story/MultiverseCTA";
import ReturnHomeButton from "@/components/story/ReturnHomeButton";
import StoryAvatarHologram from "@/components/story/StoryAvatarHologram";

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
                                Full Stack Engineer · Backend Architect · Cloud & DevOps
                            </ChapterSubtitle>
                            <ChapterContent className="mt-6">
                                <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xl">
                                    I&apos;m Nishit Bhardwaj — a Full Stack Engineer who builds scalable backend
                                    systems with <span className="text-neon-cyan">Node.js</span>, <span className="text-neon-cyan">FastAPI</span>,
                                    and <span className="text-neon-cyan">React</span>. I architect microservices
                                    on <span className="text-neon-violet">AWS</span>, containerize
                                    with <span className="text-neon-violet">Docker</span>, and automate deployments
                                    through <span className="text-neon-pink">CI/CD pipelines</span>. From MongoDB &
                                    Cassandra to Redis & MySQL — I design systems that don&apos;t just work, they scale.
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
                        <DockerPipeline />
                        <AWSArchitecture />
                        <FullStackFlowChart />
                    </div>
                </Chapter>

                {/* ==================== CHAPTER 3: THE PROFESSIONAL ==================== */}
                <Chapter>
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeInWhenVisible>
                            <span className="text-neon-violet font-mono text-sm mb-4 block">
                                CHAPTER 03
                            </span>
                            <ChapterTitle>The Professional</ChapterTitle>
                        </FadeInWhenVisible>

                        {/* Animated Text Manifesto */}
                        <div className="mt-12 space-y-6">
                            {/* Line 1 */}
                            <motion.p
                                className="text-2xl md:text-4xl font-display font-bold leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <span className="text-white">I&apos;m not just an </span>
                                <motion.span
                                    className="text-neon-cyan"
                                    animate={{ textShadow: ["0 0 10px #23f3ff40", "0 0 30px #23f3ff80", "0 0 10px #23f3ff40"] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >SDE</motion.span>
                                <span className="text-white"> —</span>
                            </motion.p>

                            {/* Line 2 */}
                            <motion.p
                                className="text-xl md:text-3xl font-display font-bold leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <span className="text-gray-300">I&apos;m a </span>
                                <motion.span
                                    style={{ background: "linear-gradient(90deg, #23f3ff, #9d4edd, #ff00e6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >Full Stack Engineer</motion.span>
                            </motion.p>

                            {/* Line 3 — keyword list */}
                            <motion.p
                                className="text-lg md:text-2xl font-mono leading-loose"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <span className="text-gray-400">who builds </span>
                                <motion.span className="text-neon-violet" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>CI/CD pipelines</motion.span>
                                <span className="text-gray-600"> · </span>
                                <motion.span className="text-[#FF9900]" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>deploys on AWS</motion.span>
                                <span className="text-gray-600"> · </span>
                                <motion.span className="text-[#2496ED]" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>containerizes with Docker</motion.span>
                            </motion.p>

                            {/* Line 4 */}
                            <motion.p
                                className="text-lg md:text-2xl font-mono leading-loose"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 1.1 }}
                            >
                                <motion.span className="text-neon-pink" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}>architects microservices</motion.span>
                                <span className="text-gray-600"> · </span>
                                <motion.span className="text-neon-cyan" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}>designs cloud systems</motion.span>
                            </motion.p>

                            {/* Line 5 — closing statement */}
                            <motion.p
                                className="text-base md:text-xl font-mono mt-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 1.4 }}
                            >
                                <span className="text-gray-500">and turns ideas into </span>
                                <motion.span
                                    className="text-white font-bold"
                                    animate={{ textShadow: ["0 0 5px #ffffff40", "0 0 20px #ffffff80", "0 0 5px #ffffff40"] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >production-grade, scalable systems.</motion.span>
                            </motion.p>
                        </div>
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

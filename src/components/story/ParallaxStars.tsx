"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxStars() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 5; // Extended for scrolling
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Create star layers
        interface Star {
            x: number;
            y: number;
            size: number;
            opacity: number;
            layer: number;
        }

        const stars: Star[] = [];
        const numStars = 400;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                layer: Math.floor(Math.random() * 3),
            });
        }

        // Draw static stars
        stars.forEach((star) => {
            const colors = [
                `rgba(255, 255, 255, ${star.opacity})`,
                `rgba(35, 243, 255, ${star.opacity * 0.6})`,
                `rgba(157, 78, 221, ${star.opacity * 0.5})`,
            ];

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = colors[star.layer];
            ctx.fill();

            // Glow for larger stars
            if (star.size > 1.2) {
                const gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.size * 4
                );
                gradient.addColorStop(0, `rgba(35, 243, 255, ${star.opacity * 0.3})`);
                gradient.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        });

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Base gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(180deg, #2b0a3d 0%, #0c2340 30%, #0a0a0f 60%, #2b0a3d 100%)",
                }}
            />

            {/* Static star canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

            {/* Parallax floating orbs */}
            <motion.div
                className="absolute w-96 h-96 rounded-full opacity-20"
                style={{
                    y: y1,
                    background: "radial-gradient(circle, rgba(157, 78, 221, 0.4) 0%, transparent 70%)",
                    left: "10%",
                    top: "20%",
                }}
            />
            <motion.div
                className="absolute w-64 h-64 rounded-full opacity-30"
                style={{
                    y: y2,
                    background: "radial-gradient(circle, rgba(35, 243, 255, 0.3) 0%, transparent 70%)",
                    right: "15%",
                    top: "40%",
                }}
            />
            <motion.div
                className="absolute w-80 h-80 rounded-full opacity-20"
                style={{
                    y: y3,
                    background: "radial-gradient(circle, rgba(255, 0, 230, 0.3) 0%, transparent 70%)",
                    left: "50%",
                    top: "60%",
                }}
            />
        </div>
    );
}

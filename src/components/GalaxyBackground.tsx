"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
}

export default function GalaxyBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Create stars
        const stars: Star[] = [];
        const numStars = 200;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.5 + 0.1,
            });
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw stars
            stars.forEach((star) => {
                // Update position (slow upward drift)
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }

                // Twinkle effect
                const twinkle = Math.sin(Date.now() * 0.001 + star.x) * 0.3 + 0.7;

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
                ctx.fill();

                // Add glow effect for larger stars
                if (star.size > 1.5) {
                    const gradient = ctx.createRadialGradient(
                        star.x,
                        star.y,
                        0,
                        star.x,
                        star.y,
                        star.size * 4
                    );
                    gradient.addColorStop(0, `rgba(35, 243, 255, ${0.3 * twinkle})`);
                    gradient.addColorStop(1, "rgba(35, 243, 255, 0)");
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            });

            // Occasional shooting star
            if (Math.random() < 0.002) {
                const shootingX = Math.random() * canvas.width;
                const shootingY = Math.random() * canvas.height * 0.5;

                ctx.beginPath();
                ctx.moveTo(shootingX, shootingY);
                ctx.lineTo(shootingX + 100, shootingY + 50);

                const shootingGradient = ctx.createLinearGradient(
                    shootingX,
                    shootingY,
                    shootingX + 100,
                    shootingY + 50
                );
                shootingGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
                shootingGradient.addColorStop(1, "rgba(35, 243, 255, 0)");

                ctx.strokeStyle = shootingGradient;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                background:
                    "linear-gradient(135deg, #2b0a3d 0%, #0c2340 50%, #0a0a0f 100%)",
            }}
        />
    );
}

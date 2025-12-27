"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, COLORS, BUILDINGS, Building } from "./gameConstants";

interface PlayerState {
    x: number;
    y: number;
    direction: "up" | "down" | "left" | "right";
    isMoving: boolean;
}

interface GameCanvasProps {
    onInteract: (building: Building) => void;
}

export default function GameCanvas({ onInteract }: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [player, setPlayer] = useState<PlayerState>({
        x: MAP_WIDTH / 2 * TILE_SIZE,
        y: MAP_HEIGHT / 2 * TILE_SIZE,
        direction: "down",
        isMoving: false,
    });
    const keysPressed = useRef<Set<string>>(new Set());
    const animationFrame = useRef<number>(0);
    const starPositions = useRef<{ x: number; y: number; size: number; twinkle: number }[]>([]);

    // Generate star positions once
    useEffect(() => {
        starPositions.current = Array.from({ length: 100 }, () => ({
            x: Math.random() * MAP_WIDTH * TILE_SIZE,
            y: Math.random() * MAP_HEIGHT * TILE_SIZE,
            size: Math.random() * 2 + 0.5,
            twinkle: Math.random() * Math.PI * 2,
        }));
    }, []);

    // Check collision with buildings
    const checkCollision = useCallback((x: number, y: number): boolean => {
        const playerSize = TILE_SIZE * 0.8;
        for (const building of BUILDINGS) {
            const bx = building.x * TILE_SIZE;
            const by = building.y * TILE_SIZE;
            const bw = building.width * TILE_SIZE;
            const bh = building.height * TILE_SIZE;

            if (
                x < bx + bw &&
                x + playerSize > bx &&
                y < by + bh &&
                y + playerSize > by
            ) {
                return true;
            }
        }
        return false;
    }, []);

    // Check if near a building for interaction
    const getNearbyBuilding = useCallback((x: number, y: number): Building | null => {
        const interactionRange = TILE_SIZE * 1.5;
        const playerCenterX = x + TILE_SIZE / 2;
        const playerCenterY = y + TILE_SIZE / 2;

        for (const building of BUILDINGS) {
            const bCenterX = (building.x + building.width / 2) * TILE_SIZE;
            const bCenterY = (building.y + building.height / 2) * TILE_SIZE;
            const distance = Math.sqrt(
                Math.pow(playerCenterX - bCenterX, 2) + Math.pow(playerCenterY - bCenterY, 2)
            );

            if (distance < interactionRange + (building.width * TILE_SIZE) / 2) {
                return building;
            }
        }
        return null;
    }, []);

    // Handle keyboard input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            keysPressed.current.add(key);

            // Handle interaction
            if (key === " " || key === "enter") {
                e.preventDefault();
                const nearbyBuilding = getNearbyBuilding(player.x, player.y);
                if (nearbyBuilding) {
                    onInteract(nearbyBuilding);
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current.delete(e.key.toLowerCase());
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [player.x, player.y, getNearbyBuilding, onInteract]);

    // Game loop
    useEffect(() => {
        const speed = 4;

        const gameLoop = () => {
            let newX = player.x;
            let newY = player.y;
            let direction = player.direction;
            let isMoving = false;

            if (keysPressed.current.has("arrowup") || keysPressed.current.has("w")) {
                newY -= speed;
                direction = "up";
                isMoving = true;
            }
            if (keysPressed.current.has("arrowdown") || keysPressed.current.has("s")) {
                newY += speed;
                direction = "down";
                isMoving = true;
            }
            if (keysPressed.current.has("arrowleft") || keysPressed.current.has("a")) {
                newX -= speed;
                direction = "left";
                isMoving = true;
            }
            if (keysPressed.current.has("arrowright") || keysPressed.current.has("d")) {
                newX += speed;
                direction = "right";
                isMoving = true;
            }

            // Boundary check
            newX = Math.max(0, Math.min(newX, (MAP_WIDTH - 1) * TILE_SIZE));
            newY = Math.max(0, Math.min(newY, (MAP_HEIGHT - 1) * TILE_SIZE));

            // Collision check
            if (!checkCollision(newX, newY)) {
                setPlayer({ x: newX, y: newY, direction, isMoving });
            } else {
                setPlayer((prev) => ({ ...prev, direction, isMoving: false }));
            }

            animationFrame.current = requestAnimationFrame(gameLoop);
        };

        animationFrame.current = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(animationFrame.current);
    }, [player, checkCollision]);

    // Render
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const time = Date.now() / 1000;

        // Clear
        ctx.fillStyle = COLORS.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw stars
        starPositions.current.forEach((star) => {
            const twinkle = Math.sin(time * 2 + star.twinkle) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.8})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw path tiles
        ctx.fillStyle = COLORS.path;
        // Horizontal paths
        ctx.fillRect(0, 7 * TILE_SIZE, MAP_WIDTH * TILE_SIZE, TILE_SIZE);
        // Vertical path
        ctx.fillRect(9.5 * TILE_SIZE, 0, TILE_SIZE, MAP_HEIGHT * TILE_SIZE);

        // Draw buildings
        BUILDINGS.forEach((building) => {
            const x = building.x * TILE_SIZE;
            const y = building.y * TILE_SIZE;
            const w = building.width * TILE_SIZE;
            const h = building.height * TILE_SIZE;

            // Building shadow
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(x + 4, y + 4, w, h);

            // Building body
            ctx.fillStyle = building.color;
            ctx.fillRect(x, y, w, h);

            // Building border
            ctx.strokeStyle = building.accentColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, w, h);

            // Neon glow effect
            ctx.shadowColor = building.accentColor;
            ctx.shadowBlur = 10 + Math.sin(time * 3) * 5;
            ctx.strokeRect(x, y, w, h);
            ctx.shadowBlur = 0;

            // Building name
            ctx.font = "bold 10px 'Press Start 2P', monospace";
            ctx.fillStyle = building.accentColor;
            ctx.textAlign = "center";
            ctx.fillText(building.name, x + w / 2, y + h / 2);

            // Icon
            ctx.font = "20px sans-serif";
            ctx.fillText(building.icon, x + w / 2, y + h / 2 + 20);
        });

        // Draw player
        const nearbyBuilding = getNearbyBuilding(player.x, player.y);

        // Player glow when near building
        if (nearbyBuilding) {
            ctx.shadowColor = nearbyBuilding.accentColor;
            ctx.shadowBlur = 15;
        }

        // Player body
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(player.x + 4, player.y + 4, TILE_SIZE - 8, TILE_SIZE - 8);

        // Player face direction indicator
        ctx.fillStyle = "#fff";
        const faceOffset = {
            up: { x: TILE_SIZE / 2, y: 8 },
            down: { x: TILE_SIZE / 2, y: TILE_SIZE - 8 },
            left: { x: 8, y: TILE_SIZE / 2 },
            right: { x: TILE_SIZE - 8, y: TILE_SIZE / 2 },
        };
        ctx.beginPath();
        ctx.arc(
            player.x + faceOffset[player.direction].x,
            player.y + faceOffset[player.direction].y,
            4,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.shadowBlur = 0;

        // Draw interaction prompt
        if (nearbyBuilding) {
            ctx.font = "10px 'Press Start 2P', monospace";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText("[SPACE] to interact", player.x + TILE_SIZE / 2, player.y - 10);
        }
    });

    return (
        <canvas
            ref={canvasRef}
            width={MAP_WIDTH * TILE_SIZE}
            height={MAP_HEIGHT * TILE_SIZE}
            className="border-2 border-neon-cyan/30 rounded-lg"
            style={{
                imageRendering: "pixelated",
                maxWidth: "100%",
                maxHeight: "70vh",
            }}
        />
    );
}

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Galaxy Base Colors
                cosmic: {
                    deep: "#2b0a3d",
                    blue: "#0c2340",
                    dark: "#0a0a0f",
                },
                // Neon Accent Colors
                neon: {
                    cyan: "#23f3ff",
                    violet: "#9d4edd",
                    pink: "#ff00e6",
                },
                // UI Colors
                terminal: {
                    bg: "rgba(10, 10, 15, 0.85)",
                    border: "rgba(35, 243, 255, 0.3)",
                    text: "#e0e0e0",
                    prompt: "#23f3ff",
                },
            },
            fontFamily: {
                sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
                display: ["Poppins", "Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
            },
            backgroundImage: {
                "galaxy-gradient": "linear-gradient(135deg, #2b0a3d 0%, #0c2340 50%, #0a0a0f 100%)",
                "neon-glow": "linear-gradient(90deg, #23f3ff 0%, #9d4edd 50%, #ff00e6 100%)",
            },
            boxShadow: {
                "neon-cyan": "0 0 20px rgba(35, 243, 255, 0.5), 0 0 40px rgba(35, 243, 255, 0.3)",
                "neon-violet": "0 0 20px rgba(157, 78, 221, 0.5), 0 0 40px rgba(157, 78, 221, 0.3)",
                "neon-pink": "0 0 20px rgba(255, 0, 230, 0.5), 0 0 40px rgba(255, 0, 230, 0.3)",
                "terminal": "0 0 50px rgba(35, 243, 255, 0.15), inset 0 0 30px rgba(10, 10, 15, 0.5)",
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "blink": "blink 1s step-end infinite",
                "typing": "typing 3.5s steps(40, end)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(35, 243, 255, 0.5)" },
                    "100%": { boxShadow: "0 0 40px rgba(35, 243, 255, 0.8), 0 0 60px rgba(157, 78, 221, 0.4)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
                typing: {
                    "from": { width: "0" },
                    "to": { width: "100%" },
                },
            },
        },
    },
    plugins: [],
};

export default config;

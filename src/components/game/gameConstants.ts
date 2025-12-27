// Game constants and types
export const TILE_SIZE = 32;
export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 15;

export const COLORS = {
    background: "#0a0a0f",
    grass: "#1a1a2e",
    path: "#16213e",
    building: "#2b0a3d",
    buildingDark: "#1a0626",
    accent1: "#23f3ff",
    accent2: "#9d4edd",
    accent3: "#ff00e6",
    portal: "#00ff88",
};

export interface Building {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    accentColor: string;
    icon: string;
    dialogue: string[];
    actions?: { label: string; action: string; data?: unknown }[];
}

export interface DialogueState {
    isOpen: boolean;
    title: string;
    lines: string[];
    currentLine: number;
    displayedText: string;
    actions?: { label: string; action: string; data?: unknown }[];
}

export const BUILDINGS: Building[] = [
    {
        id: "project-lab",
        name: "PROJECT LAB",
        x: 8,
        y: 1,
        width: 4,
        height: 3,
        color: "#1e3a5f",
        accentColor: "#23f3ff",
        icon: "🔷",
        dialogue: ["Welcome to the Project Lab!", "Here you'll find my key projects!"],
        actions: [
            { label: "LMS Portal", action: "project", data: 0 },
            { label: "Churn Model", action: "project", data: 1 },
            { label: "ML Pipeline", action: "project", data: 2 },
            { label: "Travel Site", action: "project", data: 3 },
        ],
    },
    {
        id: "skill-tower",
        name: "SKILL TOWER",
        x: 15,
        y: 5,
        width: 4,
        height: 5,
        color: "#3d2e0a",
        accentColor: "#eab308",
        icon: "🔶",
        dialogue: [
            "Welcome to the Skill Tower!",
            "Floor 1: Languages - JS, Python, C++, Java, SQL",
            "Floor 2: Backend - Node, Express, FastAPI, REST",
            "Floor 3: Databases - MongoDB, MySQL",
            "Floor 4: DevOps - Docker, CI/CD, AWS",
            "Floor 5: System Design - Architecture, Scalability",
            "Each floor represents mastery in different domains!",
        ],
    },
    {
        id: "system-arena",
        name: "SYSTEM DESIGN ARENA",
        x: 1,
        y: 5,
        width: 4,
        height: 5,
        color: "#2b0a3d",
        accentColor: "#9d4edd",
        icon: "🟣",
        dialogue: [
            "Welcome to the System Design Arena!",
            "I build scalable systems with clear architecture!",
            "API Gateway → Microservices → Databases",
            "Want to see the real diagrams?",
        ],
        actions: [{ label: "Open Mission Control", action: "navigate", data: "/mission" }],
    },
    {
        id: "about-lounge",
        name: "ABOUT ME LOUNGE",
        x: 8,
        y: 11,
        width: 4,
        height: 3,
        color: "#0a2b3d",
        accentColor: "#ff00e6",
        icon: "🟡",
        dialogue: [
            "Hey, I'm Nishit!",
            "I'm a Software Development Engineer.",
            "Backend, System Design, Microservices, AI Integration.",
            "Feel free to connect with me!",
        ],
        actions: [
            { label: "GitHub", action: "link", data: "https://github.com/NishitBhardwaj" },
            { label: "LinkedIn", action: "link", data: "https://linkedin.com/in/nishitbhardwaj4" },
            { label: "Resume", action: "link", data: "/resume.pdf" },
        ],
    },
    {
        id: "exit-portal",
        name: "EXIT PORTAL",
        x: 18,
        y: 13,
        width: 2,
        height: 2,
        color: "#0a3d2b",
        accentColor: "#00ff88",
        icon: "🔻",
        dialogue: ["Warping back to main universe..."],
        actions: [{ label: "Enter Portal", action: "navigate", data: "/" }],
    },
];

export const PROJECTS = [
    {
        name: "LMS Academic Portal",
        tech: "MERN + TypeScript + JWT Auth",
        description: "Full-stack Learning Management System with role-based access control.",
        github: "https://github.com/NishitBhardwaj/lms-portal",
    },
    {
        name: "eCommerce Churn Model",
        tech: "Python + Streamlit + RandomForest",
        description: "ML model predicting customer churn with 87% accuracy.",
        github: "https://github.com/NishitBhardwaj/ecommerce-churn",
    },
    {
        name: "Machine Learning Pipeline",
        tech: "Python + Scikit-learn + Automation",
        description: "Automated ML model training and deployment pipeline.",
        github: "https://github.com/NishitBhardwaj/ml-models",
    },
    {
        name: "Travelling Website",
        tech: "React + Responsive Frontend",
        description: "Modern travel booking interface with smooth animations.",
        github: "https://github.com/NishitBhardwaj/travel-website",
    },
];

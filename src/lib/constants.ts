// User Information - Editable
export const USER_INFO = {
    name: "Nishit Bhardwaj",
    role: "Software Development Engineer (Backend & System Design)",
    location: "Jaipur, India",
    email: "nishitbhardwaj11@gmail.com",
    github: "https://github.com/NishitBhardwaj",
    linkedin: "https://linkedin.com/in/nishitbhardwaj4",
    portfolioName: "Nishit's Dev Multiverse",
};

// Skills Signature
export const SKILLS = [
    "JavaScript",
    "Python",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "React",
    "FastAPI",
    "Docker",
    "AWS",
    "System Design",
    "Microservices",
    "CI/CD",
];

export const SKILLS_SIGNATURE = SKILLS.join(" • ");

// Projects Data
export const PROJECTS = [
    {
        name: "LMS Academic Portal",
        tech: "MERN + TypeScript + JWT Auth",
        description: "Full-stack Learning Management System with role-based access",
        github: "https://github.com/NishitBhardwaj/lms-portal",
    },
    {
        name: "eCommerce Churn Model",
        tech: "Python + Streamlit",
        description: "ML model predicting customer churn with 87% accuracy",
        github: "https://github.com/NishitBhardwaj/ecommerce-churn",
    },
    {
        name: "ML Model Collection",
        tech: "Classification/Regression Pipeline",
        description: "Collection of ML models for various use cases",
        github: "https://github.com/NishitBhardwaj/ml-models",
    },
    {
        name: "Travelling Website",
        tech: "React Frontend",
        description: "Modern travel booking interface",
        github: "https://github.com/NishitBhardwaj/travel-website",
    },
];

// Social Links
export const SOCIAL_LINKS = {
    github: USER_INFO.github,
    linkedin: USER_INFO.linkedin,
    email: `mailto:${USER_INFO.email}`,
};

// Terminal Boot Messages
export const BOOT_MESSAGES = [
    "Initializing quantum processors...",
    "Loading neural network cores...",
    "Establishing multiverse connection...",
    "Syncing with parallel dimensions...",
    "Calibrating holographic display...",
    "Loading user profile: Nishit Bhardwaj",
    "System ready.",
    "",
    "Welcome to Nishit's Dev Multiverse",
    'Type "help" for available commands',
    "",
];

// Terminal Commands
export const TERMINAL_COMMANDS = {
    help: "Display available commands",
    story: "Navigate to Story Universe - My journey",
    mission: "Navigate to Mission Control - Dashboard",
    game: "Navigate to Game Universe - Pixel world",
    map: "Navigate to Mind Map - Skills & Tech",
    api: "Navigate to API Docs - Developer API",
    projects: "Display project portfolio",
    about: "Display about information",
    skills: "Display skills & technologies",
    contact: "Open contact modal",
    github: "Open GitHub profile",
    resume: "Select & view resume (SD / ML / FS)",
    clear: "Clear terminal screen",
    home: "Return to home terminal",
};

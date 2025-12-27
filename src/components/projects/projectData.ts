// Project data model for the Dev Multiverse
export interface Project {
    id: number;
    title: string;
    category: "web" | "ml" | "backend";
    stack: string[];
    description: string;
    github: string;
    architecture: string;
    impacts: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "LMS Academic Portal",
        category: "web",
        stack: ["React.js", "TypeScript", "JWT", "Node.js", "MongoDB"],
        description: "Full-stack LMS with role-based access & authentication.",
        github: "https://github.com/NishitBhardwaj/LMS-Academic-Portal-",
        architecture: "Client → REST API → Auth Service → MongoDB",
        impacts: [
            "JWT auth implementation",
            "Role-based access control",
            "Security-focused patterns",
        ],
    },
    {
        id: 2,
        title: "Churn Prediction System",
        category: "ml",
        stack: ["Python", "Streamlit", "Scikit-learn"],
        description: "ML pipeline predicting eCommerce churn w/ 87% accuracy.",
        github: "https://github.com/NishitBhardwaj/Building-a-Real-Time-eCommerce-Churn-Early-Warning-system",
        architecture: "Pipeline: ETL → Feature Engineering → RandomForest → Dashboard",
        impacts: [
            "87% Model accuracy",
            "Feature engineering automation",
            "Dashboard for business stakeholders",
        ],
    },
    {
        id: 3,
        title: "Machine Learning Model Repository",
        category: "ml",
        stack: ["Python", "Scikit-learn", "Visualization"],
        description: "Collection of ML models for classification & regression.",
        github: "https://github.com/NishitBhardwaj/Machine-Learning-Model",
        architecture: "Dataset → Preprocess → Train/Test → Metrics → Visualize",
        impacts: [
            "Cross-validated models",
            "Regression & Classification",
            "Visualization reporting",
        ],
    },
    {
        id: 4,
        title: "Travelling Website",
        category: "web",
        stack: ["React", "CSS", "Responsive UI"],
        description: "Modern responsive tourism website with interactive UI.",
        github: "https://github.com/NishitBhardwaj/Travelling-Website-",
        architecture: "Client-side SPA",
        impacts: [
            "SEO friendly",
            "Interactive galleries",
            "Mobile-first design",
        ],
    },
];

export const categoryNames: Record<string, string> = {
    web: "Web Development",
    ml: "Machine Learning",
    backend: "Backend & System Design",
};

export const categoryColors: Record<string, string> = {
    web: "#23f3ff",
    ml: "#9d4edd",
    backend: "#f97316",
};

export function getProjectById(id: number): Project | undefined {
    return projects.find((p) => p.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
    if (category === "all") return projects;
    return projects.filter((p) => p.category === category);
}

// Mock API data for documentation
export interface ApiEndpoint {
    id: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    summary: string;
    description: string;
    requestBody?: object;
    response: object;
}

export interface ApiSection {
    id: string;
    title: string;
    icon: string;
    description?: string;
    endpoints: ApiEndpoint[];
}

export const apiSections: ApiSection[] = [
    {
        id: "overview",
        title: "Overview",
        icon: "📋",
        description: "Welcome to Nishit's Dev Multiverse API. This API provides programmatic access to profile information, skills, projects, and downloadable resources.",
        endpoints: [],
    },
    {
        id: "authentication",
        title: "Authentication",
        icon: "🔐",
        description: "For demo purposes, this API is open. In production, JWT Auth applies.",
        endpoints: [
            {
                id: "auth-login",
                method: "POST",
                path: "/v1/auth/login",
                summary: "Authenticate user",
                description: "Simulates authentication flow. In production, returns JWT token.",
                requestBody: {
                    email: "string",
                    password: "string",
                },
                response: {
                    success: true,
                    message: "Authentication simulated. No real auth required for demo.",
                    token: "demo_jwt_token_xxxxxxxx",
                },
            },
        ],
    },
    {
        id: "profile",
        title: "Profile Endpoints",
        icon: "👤",
        endpoints: [
            {
                id: "get-profile",
                method: "GET",
                path: "/v1/profile",
                summary: "Get developer profile",
                description: "Returns complete profile information including name, role, and location.",
                response: {
                    name: "Nishit Bhardwaj",
                    role: "Software Development Engineer",
                    subtitle: "Backend & System Design",
                    location: "Jaipur, India",
                    email: "nishitbhardwaj11@gmail.com",
                    bio: "Passionate about building scalable backend systems and designing efficient architectures.",
                },
            },
            {
                id: "get-contact",
                method: "GET",
                path: "/v1/contact",
                summary: "Get contact information",
                description: "Returns all public contact methods and social links.",
                response: {
                    email: "nishitbhardwaj11@gmail.com",
                    linkedin: "https://linkedin.com/in/nishit-bhardwaj",
                    github: "https://github.com/NishitBhardwaj",
                    portfolio: "https://nishitsdevmultiverse.com",
                },
            },
        ],
    },
    {
        id: "projects",
        title: "Project Endpoints",
        icon: "🚀",
        endpoints: [
            {
                id: "get-projects",
                method: "GET",
                path: "/v1/projects",
                summary: "List all projects",
                description: "Returns an array of all portfolio projects with details.",
                response: {
                    projects: [
                        {
                            id: 1,
                            title: "LMS Academic Portal",
                            stack: ["React.js", "TypeScript", "JWT", "MongoDB", "Express"],
                            description: "Full-stack Learning Management System with role-based access control and real-time features.",
                            github: "https://github.com/NishitBhardwaj/LMS-Academic-Portal-",
                            status: "completed",
                        },
                        {
                            id: 2,
                            title: "eCommerce Churn Prediction",
                            stack: ["Python", "Scikit-learn", "Streamlit", "Pandas"],
                            description: "ML model predicting customer churn using Random Forest with 89% accuracy.",
                            github: "https://github.com/NishitBhardwaj/ecommerce-churn",
                            status: "completed",
                        },
                        {
                            id: 3,
                            title: "ML Model Collection",
                            stack: ["Python", "TensorFlow", "Scikit-learn", "Jupyter"],
                            description: "Repository of various machine learning models for classification and regression.",
                            github: "https://github.com/NishitBhardwaj/ml-models",
                            status: "active",
                        },
                        {
                            id: 4,
                            title: "Travel Booking Website",
                            stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
                            description: "Responsive travel booking interface with destination search and booking flow.",
                            github: "https://github.com/NishitBhardwaj/travel-website",
                            status: "completed",
                        },
                    ],
                    total: 4,
                },
            },
            {
                id: "get-project",
                method: "GET",
                path: "/v1/projects/:id",
                summary: "Get project by ID",
                description: "Returns detailed information about a specific project.",
                response: {
                    id: 1,
                    title: "LMS Academic Portal",
                    stack: ["React.js", "TypeScript", "JWT", "MongoDB", "Express"],
                    description: "Full-stack Learning Management System with role-based access control and real-time features.",
                    github: "https://github.com/NishitBhardwaj/LMS-Academic-Portal-",
                    features: [
                        "Role-based authentication (Admin, Teacher, Student)",
                        "Course management system",
                        "Real-time notifications",
                        "Assignment submission portal",
                    ],
                    status: "completed",
                },
            },
        ],
    },
    {
        id: "skills",
        title: "Skills Endpoints",
        icon: "⚡",
        endpoints: [
            {
                id: "get-skills",
                method: "GET",
                path: "/v1/skills",
                summary: "List all skills by category",
                description: "Returns skills organized by domain categories.",
                response: {
                    backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Auth", "API Gateway", "Microservices"],
                    system_design: ["Scalability", "Caching (Redis)", "Message Queues", "Horizontal Scaling", "Fault Tolerance", "CI/CD"],
                    databases: ["MongoDB", "MySQL", "Indexing", "Data Modeling", "ORM/ODM"],
                    languages: ["JavaScript (ES6+)", "Python", "C++", "Java", "SQL"],
                    tools: ["Docker", "Git", "GitHub Actions", "AWS (S3, EC2)"],
                    ml_integration: ["Scikit-learn", "Streamlit", "Data Pipelines", "PowerBI"],
                },
            },
        ],
    },
    {
        id: "downloadables",
        title: "Downloadables",
        icon: "📥",
        endpoints: [
            {
                id: "get-resume",
                method: "GET",
                path: "/v1/resume",
                summary: "Download resume",
                description: "Returns a link to download the latest resume PDF.",
                response: {
                    filename: "Nishit_Bhardwaj_Resume.pdf",
                    download_url: "/downloads/resume.pdf",
                    last_updated: "2024-12-15",
                    format: "application/pdf",
                },
            },
        ],
    },
    {
        id: "support",
        title: "Support",
        icon: "💬",
        description: "For collaboration or hiring inquiries, contact the Mission Commander directly.",
        endpoints: [],
    },
];

export const curlExample = `curl -X GET https://nishitsdevmultiverse.com/api/v1/profile \\
  -H "Content-Type: application/json"`;

export const responseExample = {
    name: "Nishit Bhardwaj",
    role: "Software Development Engineer",
    location: "Jaipur, India",
};

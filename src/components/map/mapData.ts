import { Node, Edge } from "reactflow";

// Node details for skill descriptions
export interface SkillDetail {
    title: string;
    description: string;
    techContext: string[];
    projectLink?: string;
}

export const skillDetails: Record<string, SkillDetail> = {
    // Center
    center: {
        title: "Nishit Bhardwaj",
        description:
            "Software Development Engineer specializing in Backend Engineering, System Design, and building scalable distributed systems.",
        techContext: [
            "Full-stack development expertise",
            "Backend & API architecture",
            "System design & scalability",
        ],
    },

    // Backend Engineering
    backend: {
        title: "Backend Engineering",
        description:
            "Building robust server-side applications and APIs that power modern web services.",
        techContext: ["RESTful API design", "Server-side logic", "Database integration"],
    },
    nodejs: {
        title: "Node.js",
        description:
            "Runtime environment for executing JavaScript on the server. Used for building scalable backend services and APIs.",
        techContext: ["Used in LMS Portal project", "Services connect to MongoDB", "JWT for auth flows"],
        projectLink: "https://github.com/NishitBhardwaj/lms-portal",
    },
    express: {
        title: "Express.js",
        description:
            "Minimal and flexible Node.js web application framework for building APIs and web applications.",
        techContext: ["REST API routing", "Middleware chains", "Request handling"],
    },
    fastapi: {
        title: "FastAPI",
        description:
            "Modern, fast Python web framework for building APIs with automatic validation and documentation.",
        techContext: ["Python async support", "Auto-generated docs", "Type hints validation"],
    },
    restapis: {
        title: "REST APIs",
        description:
            "Designing and implementing RESTful web services following industry best practices.",
        techContext: ["HTTP methods", "Status codes", "Resource-based routing"],
    },
    jwt: {
        title: "Authentication & JWT",
        description:
            "Implementing secure authentication flows using JSON Web Tokens for stateless auth.",
        techContext: ["Token-based auth", "Session management", "Access control"],
    },
    apigateway: {
        title: "API Gateway Concepts",
        description:
            "Understanding of API gateway patterns for routing, rate limiting, and service aggregation.",
        techContext: ["Request routing", "Load balancing", "Rate limiting"],
    },
    microservices: {
        title: "Microservices Basics",
        description:
            "Understanding of microservices architecture patterns for building distributed systems.",
        techContext: ["Service isolation", "Inter-service communication", "Deployment independence"],
    },

    // System Design
    systemdesign: {
        title: "System Design & Architecture",
        description:
            "Designing scalable, reliable, and maintainable software systems from ground up.",
        techContext: ["Architecture patterns", "Scalability planning", "Trade-off analysis"],
    },
    scalable: {
        title: "Scalable Systems",
        description:
            "Designing systems that can handle growing amounts of work by adding resources.",
        techContext: ["Horizontal scaling", "Load distribution", "Performance optimization"],
    },
    clientserver: {
        title: "Client → LB → Services → DB",
        description:
            "Understanding the full request flow from client through load balancers to services and databases.",
        techContext: ["Request lifecycle", "Multi-tier architecture", "Data flow"],
    },
    caching: {
        title: "Caching (Redis)",
        description:
            "Using in-memory data stores for caching to improve application performance.",
        techContext: ["Cache invalidation", "TTL strategies", "Cache-aside pattern"],
    },
    messagequeues: {
        title: "Message Queues",
        description:
            "Asynchronous communication between services using message brokers for decoupling.",
        techContext: ["Async processing", "Event-driven design", "Pub/Sub patterns"],
    },
    horizontalscaling: {
        title: "Horizontal Scaling",
        description:
            "Adding more machines to handle increased load rather than upgrading a single machine.",
        techContext: ["Load balancers", "Stateless services", "Auto-scaling"],
    },
    faulttolerance: {
        title: "Fault Tolerance",
        description:
            "Designing systems that continue operating properly even when components fail.",
        techContext: ["Redundancy", "Circuit breakers", "Graceful degradation"],
    },
    cicdoverview: {
        title: "CI/CD Overview",
        description:
            "Continuous Integration and Continuous Deployment practices for automated software delivery.",
        techContext: ["Automated testing", "Deployment pipelines", "Version control integration"],
    },

    // Databases
    databases: {
        title: "Databases & Storage",
        description:
            "Working with various database systems for efficient data storage and retrieval.",
        techContext: ["Data modeling", "Query optimization", "ACID properties"],
    },
    mongodb: {
        title: "MongoDB",
        description:
            "NoSQL document database for flexible, scalable data storage with JSON-like documents.",
        techContext: ["Document-based storage", "Aggregation pipelines", "Used in LMS project"],
        projectLink: "https://github.com/NishitBhardwaj/lms-portal",
    },
    mysql: {
        title: "MySQL",
        description:
            "Relational database management system for structured data with strong ACID compliance.",
        techContext: ["Relational data", "Complex queries", "Data integrity"],
    },
    indexing: {
        title: "Indexing & Query Efficiency",
        description:
            "Optimizing database queries through proper indexing strategies and query analysis.",
        techContext: ["Index optimization", "Query plans", "Performance tuning"],
    },
    datamodeling: {
        title: "Data Modeling",
        description:
            "Designing database schemas that efficiently represent business entities and relationships.",
        techContext: ["Schema design", "Normalization", "Entity relationships"],
    },
    crud: {
        title: "CRUD Operations",
        description:
            "Implementing Create, Read, Update, Delete operations for database interactions.",
        techContext: ["Data manipulation", "Validation", "Error handling"],
    },
    orm: {
        title: "ORM/ODM Basics",
        description:
            "Using Object-Relational/Document Mappers to interact with databases using code objects.",
        techContext: ["Mongoose", "Sequelize", "Data abstraction"],
    },

    // Languages & Tools
    languages: {
        title: "Languages & Tools",
        description:
            "Programming languages and development tools used for building software solutions.",
        techContext: ["Multi-language proficiency", "Development workflows", "Version control"],
    },
    javascript: {
        title: "JavaScript (ES6+)",
        description:
            "Modern JavaScript with ES6+ features for both frontend and backend development.",
        techContext: ["Async/await", "Destructuring", "Arrow functions"],
    },
    python: {
        title: "Python",
        description:
            "Versatile programming language used for backend development, ML, and data analysis.",
        techContext: ["Backend APIs", "ML models", "Data processing"],
        projectLink: "https://github.com/NishitBhardwaj/ecommerce-churn",
    },
    cpp: {
        title: "C++",
        description:
            "High-performance language for systems programming and algorithmic problem solving.",
        techContext: ["Data structures", "Algorithms", "Performance"],
    },
    java: {
        title: "Java",
        description:
            "Object-oriented language for enterprise applications and Android development.",
        techContext: ["OOP concepts", "Enterprise patterns", "Platform independence"],
    },
    sql: {
        title: "SQL",
        description:
            "Structured Query Language for managing and querying relational databases.",
        techContext: ["Complex queries", "Joins", "Data aggregation"],
    },
    docker: {
        title: "Docker",
        description:
            "Containerization platform for packaging applications with their dependencies.",
        techContext: ["Container orchestration", "Image building", "Deployment consistency"],
    },
    git: {
        title: "Git & CI/CD",
        description:
            "Version control and automated deployment pipelines for collaborative development.",
        techContext: ["GitHub Actions", "Branch strategies", "Code reviews"],
    },

    // Cloud & ML
    cloudml: {
        title: "Cloud, Ops & ML",
        description:
            "Cloud services, DevOps practices, and Machine Learning integration capabilities.",
        techContext: ["Cloud deployment", "ML pipelines", "Data analytics"],
    },
    aws: {
        title: "AWS Basics (S3, EC2)",
        description:
            "Amazon Web Services for cloud computing, storage, and deployment.",
        techContext: ["S3 storage", "EC2 instances", "Cloud deployment"],
    },
    mlintegration: {
        title: "ML Model Integration",
        description:
            "Integrating machine learning models into production applications.",
        techContext: ["Model serving", "API endpoints", "Prediction systems"],
        projectLink: "https://github.com/NishitBhardwaj/ecommerce-churn",
    },
    datapipelines: {
        title: "Data Pipelines",
        description:
            "Building automated data processing and transformation pipelines.",
        techContext: ["ETL processes", "Data transformation", "Batch processing"],
    },
    sklearn: {
        title: "Python Scikit-learn",
        description:
            "Machine learning library for classification, regression, and clustering in Python.",
        techContext: ["Random Forest", "Model training", "Feature engineering"],
        projectLink: "https://github.com/NishitBhardwaj/ml-models",
    },
    streamlit: {
        title: "Streamlit",
        description:
            "Python library for building interactive data science web applications quickly.",
        techContext: ["Data visualization", "ML demos", "Rapid prototyping"],
    },
    powerbi: {
        title: "PowerBI & Analytics",
        description:
            "Business intelligence tools for data visualization and analytics dashboards.",
        techContext: ["Data visualization", "Business insights", "Dashboard creation"],
    },
};

// Node positions for mind map layout
export const initialNodes: Node[] = [
    // Center node
    {
        id: "center",
        type: "centerNode",
        position: { x: 400, y: 300 },
        data: { label: "Nishit Bhardwaj", subtitle: "Software Development Engineer" },
    },

    // Branch 1: Backend Engineering
    {
        id: "backend",
        type: "branchNode",
        position: { x: 100, y: 100 },
        data: { label: "Backend Engineering", color: "#23f3ff" },
    },
    { id: "nodejs", type: "skillNode", position: { x: -50, y: -50 }, data: { label: "Node.js" } },
    { id: "express", type: "skillNode", position: { x: -100, y: 50 }, data: { label: "Express.js" } },
    { id: "fastapi", type: "skillNode", position: { x: -150, y: 150 }, data: { label: "FastAPI" } },
    { id: "restapis", type: "skillNode", position: { x: 0, y: -120 }, data: { label: "REST APIs" } },
    { id: "jwt", type: "skillNode", position: { x: 50, y: -30 }, data: { label: "JWT Auth" } },
    { id: "apigateway", type: "skillNode", position: { x: -50, y: 120 }, data: { label: "API Gateway" } },
    { id: "microservices", type: "skillNode", position: { x: 100, y: 60 }, data: { label: "Microservices" } },

    // Branch 2: System Design
    {
        id: "systemdesign",
        type: "branchNode",
        position: { x: 700, y: 100 },
        data: { label: "System Design", color: "#9d4edd" },
    },
    { id: "scalable", type: "skillNode", position: { x: 850, y: -20 }, data: { label: "Scalable Systems" } },
    { id: "clientserver", type: "skillNode", position: { x: 900, y: 80 }, data: { label: "Client→Server Flow" } },
    { id: "caching", type: "skillNode", position: { x: 850, y: 170 }, data: { label: "Caching (Redis)" } },
    { id: "messagequeues", type: "skillNode", position: { x: 750, y: -80 }, data: { label: "Message Queues" } },
    { id: "horizontalscaling", type: "skillNode", position: { x: 650, y: -40 }, data: { label: "Horizontal Scaling" } },
    { id: "faulttolerance", type: "skillNode", position: { x: 600, y: 50 }, data: { label: "Fault Tolerance" } },
    { id: "cicdoverview", type: "skillNode", position: { x: 750, y: 220 }, data: { label: "CI/CD Overview" } },

    // Branch 3: Databases
    {
        id: "databases",
        type: "branchNode",
        position: { x: 100, y: 500 },
        data: { label: "Databases & Storage", color: "#ff00e6" },
    },
    { id: "mongodb", type: "skillNode", position: { x: -50, y: 450 }, data: { label: "MongoDB" } },
    { id: "mysql", type: "skillNode", position: { x: -100, y: 550 }, data: { label: "MySQL" } },
    { id: "indexing", type: "skillNode", position: { x: 0, y: 650 }, data: { label: "Indexing" } },
    { id: "datamodeling", type: "skillNode", position: { x: 100, y: 600 }, data: { label: "Data Modeling" } },
    { id: "crud", type: "skillNode", position: { x: -150, y: 650 }, data: { label: "CRUD Ops" } },
    { id: "orm", type: "skillNode", position: { x: 50, y: 700 }, data: { label: "ORM/ODM" } },

    // Branch 4: Languages & Tools
    {
        id: "languages",
        type: "branchNode",
        position: { x: 700, y: 500 },
        data: { label: "Languages & Tools", color: "#eab308" },
    },
    { id: "javascript", type: "skillNode", position: { x: 850, y: 450 }, data: { label: "JavaScript" } },
    { id: "python", type: "skillNode", position: { x: 900, y: 550 }, data: { label: "Python" } },
    { id: "cpp", type: "skillNode", position: { x: 850, y: 650 }, data: { label: "C++" } },
    { id: "java", type: "skillNode", position: { x: 750, y: 600 }, data: { label: "Java" } },
    { id: "sql", type: "skillNode", position: { x: 650, y: 550 }, data: { label: "SQL" } },
    { id: "docker", type: "skillNode", position: { x: 600, y: 650 }, data: { label: "Docker" } },
    { id: "git", type: "skillNode", position: { x: 750, y: 700 }, data: { label: "Git & CI/CD" } },

    // Branch 5: Cloud & ML
    {
        id: "cloudml",
        type: "branchNode",
        position: { x: 400, y: 600 },
        data: { label: "Cloud & ML", color: "#22c55e" },
    },
    { id: "aws", type: "skillNode", position: { x: 300, y: 700 }, data: { label: "AWS (S3, EC2)" } },
    { id: "mlintegration", type: "skillNode", position: { x: 400, y: 750 }, data: { label: "ML Integration" } },
    { id: "datapipelines", type: "skillNode", position: { x: 500, y: 700 }, data: { label: "Data Pipelines" } },
    { id: "sklearn", type: "skillNode", position: { x: 350, y: 800 }, data: { label: "Scikit-learn" } },
    { id: "streamlit", type: "skillNode", position: { x: 450, y: 800 }, data: { label: "Streamlit" } },
    { id: "powerbi", type: "skillNode", position: { x: 400, y: 850 }, data: { label: "PowerBI" } },
];

export const initialEdges: Edge[] = [
    // Center to branches
    { id: "e-center-backend", source: "center", target: "backend", animated: true, style: { stroke: "#23f3ff", strokeWidth: 2 } },
    { id: "e-center-systemdesign", source: "center", target: "systemdesign", animated: true, style: { stroke: "#9d4edd", strokeWidth: 2 } },
    { id: "e-center-databases", source: "center", target: "databases", animated: true, style: { stroke: "#ff00e6", strokeWidth: 2 } },
    { id: "e-center-languages", source: "center", target: "languages", animated: true, style: { stroke: "#eab308", strokeWidth: 2 } },
    { id: "e-center-cloudml", source: "center", target: "cloudml", animated: true, style: { stroke: "#22c55e", strokeWidth: 2 } },

    // Backend branch
    { id: "e-backend-nodejs", source: "backend", target: "nodejs", style: { stroke: "#23f3ff" } },
    { id: "e-backend-express", source: "backend", target: "express", style: { stroke: "#23f3ff" } },
    { id: "e-backend-fastapi", source: "backend", target: "fastapi", style: { stroke: "#23f3ff" } },
    { id: "e-backend-restapis", source: "backend", target: "restapis", style: { stroke: "#23f3ff" } },
    { id: "e-backend-jwt", source: "backend", target: "jwt", style: { stroke: "#23f3ff" } },
    { id: "e-backend-apigateway", source: "backend", target: "apigateway", style: { stroke: "#23f3ff" } },
    { id: "e-backend-microservices", source: "backend", target: "microservices", style: { stroke: "#23f3ff" } },

    // System Design branch
    { id: "e-systemdesign-scalable", source: "systemdesign", target: "scalable", style: { stroke: "#9d4edd" } },
    { id: "e-systemdesign-clientserver", source: "systemdesign", target: "clientserver", style: { stroke: "#9d4edd" } },
    { id: "e-systemdesign-caching", source: "systemdesign", target: "caching", style: { stroke: "#9d4edd" } },
    { id: "e-systemdesign-messagequeues", source: "systemdesign", target: "messagequeues", style: { stroke: "#9d4edd" } },
    { id: "e-systemdesign-horizontalscaling", source: "systemdesign", target: "horizontalscaling", style: { stroke: "#9d4edd" } },
    { id: "e-systemdesign-faulttolerance", source: "systemdesign", target: "faulttolerance", style: { stroke: "#9d4edd" } },
    { id: "e-systemdesign-cicdoverview", source: "systemdesign", target: "cicdoverview", style: { stroke: "#9d4edd" } },

    // Databases branch
    { id: "e-databases-mongodb", source: "databases", target: "mongodb", style: { stroke: "#ff00e6" } },
    { id: "e-databases-mysql", source: "databases", target: "mysql", style: { stroke: "#ff00e6" } },
    { id: "e-databases-indexing", source: "databases", target: "indexing", style: { stroke: "#ff00e6" } },
    { id: "e-databases-datamodeling", source: "databases", target: "datamodeling", style: { stroke: "#ff00e6" } },
    { id: "e-databases-crud", source: "databases", target: "crud", style: { stroke: "#ff00e6" } },
    { id: "e-databases-orm", source: "databases", target: "orm", style: { stroke: "#ff00e6" } },

    // Languages branch
    { id: "e-languages-javascript", source: "languages", target: "javascript", style: { stroke: "#eab308" } },
    { id: "e-languages-python", source: "languages", target: "python", style: { stroke: "#eab308" } },
    { id: "e-languages-cpp", source: "languages", target: "cpp", style: { stroke: "#eab308" } },
    { id: "e-languages-java", source: "languages", target: "java", style: { stroke: "#eab308" } },
    { id: "e-languages-sql", source: "languages", target: "sql", style: { stroke: "#eab308" } },
    { id: "e-languages-docker", source: "languages", target: "docker", style: { stroke: "#eab308" } },
    { id: "e-languages-git", source: "languages", target: "git", style: { stroke: "#eab308" } },

    // Cloud & ML branch
    { id: "e-cloudml-aws", source: "cloudml", target: "aws", style: { stroke: "#22c55e" } },
    { id: "e-cloudml-mlintegration", source: "cloudml", target: "mlintegration", style: { stroke: "#22c55e" } },
    { id: "e-cloudml-datapipelines", source: "cloudml", target: "datapipelines", style: { stroke: "#22c55e" } },
    { id: "e-cloudml-sklearn", source: "cloudml", target: "sklearn", style: { stroke: "#22c55e" } },
    { id: "e-cloudml-streamlit", source: "cloudml", target: "streamlit", style: { stroke: "#22c55e" } },
    { id: "e-cloudml-powerbi", source: "cloudml", target: "powerbi", style: { stroke: "#22c55e" } },
];

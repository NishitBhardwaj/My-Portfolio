// CLI output formatter for project commands
import { Project, projects, getProjectById, getProjectsByCategory, categoryNames, categoryColors } from "./projectData";

export interface CLILine {
    type: "divider" | "text" | "title" | "category" | "stack" | "description" | "link" | "impact" | "error" | "help" | "blank";
    content: string;
    color?: string;
    indent?: number;
}

const DIVIDER = "─".repeat(50);

function formatDivider(): CLILine {
    return { type: "divider", content: DIVIDER, color: "#444" };
}

function formatProjectHeader(project: Project): CLILine[] {
    return [
        formatDivider(),
        { type: "title", content: `[${project.id}] ${project.title}`, color: "#9d4edd" },
        { type: "category", content: `    (${project.category})`, color: categoryColors[project.category] },
    ];
}

function formatProjectShort(project: Project): CLILine[] {
    return [
        ...formatProjectHeader(project),
        { type: "stack", content: `Stack: ${project.stack.join(", ")}`, color: "#23f3ff", indent: 1 },
        { type: "description", content: `${project.description}`, color: "#888", indent: 1 },
        { type: "link", content: `→ projects info ${project.id}`, color: "#666", indent: 1 },
    ];
}

function formatProjectFull(project: Project): CLILine[] {
    const lines: CLILine[] = [
        { type: "divider", content: `${"─".repeat(24)} PROJECT #${project.id}`, color: "#9d4edd" },
        { type: "blank", content: "" },
        { type: "text", content: `Title: ${project.title}`, color: "#fff" },
        { type: "text", content: `Category: ${categoryNames[project.category]}`, color: categoryColors[project.category] },
        { type: "stack", content: `Stack: ${project.stack.join(" • ")}`, color: "#23f3ff" },
        { type: "blank", content: "" },
        { type: "text", content: "Architecture:", color: "#888" },
        { type: "text", content: `   ${project.architecture}`, color: "#9d4edd" },
        { type: "blank", content: "" },
        { type: "text", content: "Impacts:", color: "#888" },
    ];

    project.impacts.forEach((impact) => {
        lines.push({ type: "impact", content: `✔ ${impact}`, color: "#4ade80", indent: 1 });
    });

    lines.push({ type: "blank", content: "" });
    lines.push({ type: "text", content: "GitHub:", color: "#888" });
    lines.push({ type: "link", content: `→ ${project.github.replace("https://", "")}`, color: "#23f3ff", indent: 1 });
    lines.push(formatDivider());

    return lines;
}

function formatStackOnly(project: Project): CLILine[] {
    return [
        { type: "title", content: `[ Tech Stack — ${project.title} ]`, color: "#9d4edd" },
        { type: "blank", content: "" },
        { type: "stack", content: project.stack.join(" • "), color: "#23f3ff" },
        { type: "blank", content: "" },
    ];
}

function formatArchitecture(project: Project): CLILine[] {
    return [
        { type: "title", content: `[ Architecture — ${project.title} ]`, color: "#9d4edd" },
        { type: "blank", content: "" },
        { type: "text", content: project.architecture, color: "#23f3ff" },
        { type: "blank", content: "" },
    ];
}

function formatCategories(): CLILine[] {
    const categories = [...new Set(projects.map((p) => p.category))];
    return [
        { type: "title", content: "Project Categories", color: "#9d4edd" },
        formatDivider(),
        ...categories.map((cat) => ({
            type: "text" as const,
            content: `• ${categoryNames[cat]} (${projects.filter((p) => p.category === cat).length} projects)`,
            color: categoryColors[cat],
        })),
        { type: "blank", content: "" },
        { type: "text", content: "Commands:", color: "#888" },
        { type: "text", content: "  projects web    → Web projects", color: "#666" },
        { type: "text", content: "  projects ml     → ML projects", color: "#666" },
        { type: "text", content: "  projects all    → All projects", color: "#666" },
        formatDivider(),
    ];
}

function formatHelp(): CLILine[] {
    return [
        { type: "title", content: "Project Explorer — Commands", color: "#9d4edd" },
        formatDivider(),
        { type: "text", content: "projects             Show project categories", color: "#888" },
        { type: "text", content: "projects all         List all projects", color: "#888" },
        { type: "text", content: "projects web         Web/Full-stack projects", color: "#888" },
        { type: "text", content: "projects ml          ML/Data Science projects", color: "#888" },
        { type: "text", content: "projects backend     Backend projects", color: "#888" },
        { type: "text", content: "projects info <id>   Full technical breakdown", color: "#888" },
        { type: "text", content: "projects stack <id>  Show tech stack only", color: "#888" },
        { type: "text", content: "projects arch <id>   Architecture diagram", color: "#888" },
        { type: "text", content: "projects open <id>   Open project page", color: "#888" },
        { type: "text", content: "projects git <id>    Open GitHub repo", color: "#888" },
        { type: "text", content: "projects clear       Clear output", color: "#888" },
        { type: "text", content: "projects help        Show this help", color: "#888" },
        formatDivider(),
    ];
}

function formatError(message: string): CLILine[] {
    return [{ type: "error", content: `Error: ${message}`, color: "#ef4444" }];
}

export interface CommandResult {
    lines: CLILine[];
    action?: "open" | "github" | "clear";
    url?: string;
}

export function executeProjectCommand(args: string[]): CommandResult {
    // No subcommand = show categories
    if (args.length === 0 || args[0] === "") {
        return { lines: formatCategories() };
    }

    const subcommand = args[0].toLowerCase();
    const param = args[1];

    switch (subcommand) {
        case "help":
            return { lines: formatHelp() };

        case "all":
            return {
                lines: [
                    { type: "title", content: "All Projects", color: "#9d4edd" },
                    ...projects.flatMap(formatProjectShort),
                    formatDivider(),
                ],
            };

        case "web":
        case "ml":
        case "backend": {
            const filtered = getProjectsByCategory(subcommand);
            if (filtered.length === 0) {
                return { lines: formatError(`No projects in category: ${subcommand}`) };
            }
            return {
                lines: [
                    { type: "title", content: `${categoryNames[subcommand]} Projects`, color: categoryColors[subcommand] },
                    ...filtered.flatMap(formatProjectShort),
                    formatDivider(),
                ],
            };
        }

        case "info": {
            const id = parseInt(param);
            if (isNaN(id)) return { lines: formatError("Usage: projects info <id>") };
            const project = getProjectById(id);
            if (!project) return { lines: formatError(`Project #${id} not found`) };
            return { lines: formatProjectFull(project) };
        }

        case "stack": {
            const id = parseInt(param);
            if (isNaN(id)) return { lines: formatError("Usage: projects stack <id>") };
            const project = getProjectById(id);
            if (!project) return { lines: formatError(`Project #${id} not found`) };
            return { lines: formatStackOnly(project) };
        }

        case "arch": {
            const id = parseInt(param);
            if (isNaN(id)) return { lines: formatError("Usage: projects arch <id>") };
            const project = getProjectById(id);
            if (!project) return { lines: formatError(`Project #${id} not found`) };
            return { lines: formatArchitecture(project) };
        }

        case "open": {
            const id = parseInt(param);
            if (isNaN(id)) return { lines: formatError("Usage: projects open <id>") };
            const project = getProjectById(id);
            if (!project) return { lines: formatError(`Project #${id} not found`) };
            return {
                lines: [{ type: "text", content: `Opening project: ${project.title}...`, color: "#23f3ff" }],
                action: "open",
                url: `/projects/${id}`,
            };
        }

        case "git": {
            const id = parseInt(param);
            if (isNaN(id)) return { lines: formatError("Usage: projects git <id>") };
            const project = getProjectById(id);
            if (!project) return { lines: formatError(`Project #${id} not found`) };
            return {
                lines: [{ type: "text", content: `Opening GitHub: ${project.github.replace("https://", "")}`, color: "#23f3ff" }],
                action: "github",
                url: project.github,
            };
        }

        case "clear":
            return { lines: [], action: "clear" };

        default:
            return { lines: formatError(`Unknown command: projects ${subcommand}. Type 'projects help' for usage.`) };
    }
}

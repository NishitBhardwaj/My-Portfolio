import type { Metadata } from "next";
import "./globals.css";
import GalaxyBackground from "@/components/GalaxyBackground";

export const metadata: Metadata = {
    metadataBase: new URL('https://nishitsdevmultiverse.com'),
    title: "Nishit's Dev Multiverse | Software Development Engineer",
    description:
        "Backend Engineering • System Design • AI-Integrated Systems • Interactive Multiverse Portfolio by Nishit Bhardwaj",
    keywords: [
        "Nishit Bhardwaj",
        "SDE",
        "Backend Developer",
        "System Design",
        "JavaScript",
        "Python",
        "Node.js",
        "React",
        "AWS",
        "MongoDB",
        "Full Stack Developer",
        "Portfolio",
    ],
    authors: [{ name: "Nishit Bhardwaj", url: "https://github.com/NishitBhardwaj" }],
    creator: "Nishit Bhardwaj",
    publisher: "Nishit Bhardwaj",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        type: "website",
        title: "Nishit's Dev Multiverse | Software Development Engineer",
        description: "Backend Engineering • System Design • AI-Integrated Systems",
        siteName: "Nishit's Dev Multiverse",
        locale: "en_US",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Nishit's Dev Multiverse Preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nishit's Dev Multiverse",
        description: "Backend Engineering • System Design • AI-Integrated Systems",
        images: ["/og-image.png"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

// JSON-LD structured data
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nishit Bhardwaj",
    jobTitle: "Software Development Engineer",
    description: "Backend Engineering, System Design, AI-Integrated Systems",
    url: "https://nishitsdevmultiverse.com",
    email: "nishitbhardwaj11@gmail.com",
    sameAs: [
        "https://github.com/NishitBhardwaj",
        "https://linkedin.com/in/nishit-bhardwaj",
    ],
    knowsAbout: [
        "Backend Development",
        "System Design",
        "Node.js",
        "Python",
        "JavaScript",
        "React",
        "MongoDB",
        "AWS",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                {/* Preload JetBrains Mono font */}
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
                    as="style"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="antialiased">
                <GalaxyBackground />
                <main className="relative z-10 min-h-screen">{children}</main>
            </body>
        </html>
    );
}

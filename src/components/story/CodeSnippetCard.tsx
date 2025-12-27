"use client";

import { motion } from "framer-motion";

const codeSnippet = `// Building systems that scale
async function handleRequest(req) {
  const user = await auth.verify(req);
  const data = await cache.get(key) 
    || await db.query(user.id);
  
  return Response.json(data);
}`;

export default function CodeSnippetCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
            }}
            className="mt-8 max-w-lg mx-auto"
            style={{ perspective: "1000px" }}
        >
            <div className="holographic rounded-xl p-1">
                <div className="bg-cosmic-dark rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-terminal-border">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-xs text-gray-500 font-mono">system.js</span>
                    </div>

                    {/* Code */}
                    <pre className="p-4 text-sm font-mono overflow-x-auto">
                        <code>
                            {codeSnippet.split("\n").map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                    className="whitespace-pre"
                                >
                                    <span className="text-gray-600 mr-4 select-none">{String(i + 1).padStart(2, " ")}</span>
                                    <span className={
                                        line.includes("//") ? "text-gray-500" :
                                            line.includes("async") || line.includes("await") || line.includes("return") ? "text-neon-pink" :
                                                line.includes("function") || line.includes("const") ? "text-neon-violet" :
                                                    "text-terminal-text"
                                    }>
                                        {line}
                                    </span>
                                </motion.div>
                            ))}
                        </code>
                    </pre>
                </div>
            </div>
        </motion.div>
    );
}

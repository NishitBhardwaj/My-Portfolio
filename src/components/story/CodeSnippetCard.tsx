"use client";

import { motion } from "framer-motion";

const codeSnippet = `# FastAPI microservice with Docker
from fastapi import FastAPI, Depends
from app.auth import verify_token
from app.cache import redis_cache

app = FastAPI()

@app.get("/api/v1/data/{id}")
async def get_data(id: str, user=Depends(verify_token)):
    cached = await redis_cache.get(f"data:{id}")
    if cached:
        return {"source": "cache", "data": cached}
    
    result = await db.query(id)
    await redis_cache.set(f"data:{id}", result)
    return {"source": "db", "data": result}`;

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
                        <span className="ml-2 text-xs text-gray-500 font-mono">service.py</span>
                        <span className="ml-auto text-xs text-gray-600 font-mono">🐳 Docker</span>
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
                                    transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                                    className="whitespace-pre"
                                >
                                    <span className="text-gray-600 mr-4 select-none">{String(i + 1).padStart(2, " ")}</span>
                                    <span className={
                                        line.includes("#") && !line.includes('f"') ? "text-gray-500" :
                                            line.includes("async") || line.includes("await") || line.includes("return") || line.includes("if") ? "text-neon-pink" :
                                                line.includes("from") || line.includes("import") || line.includes("def") || line.includes("app") ? "text-neon-violet" :
                                                    line.includes("@") ? "text-neon-cyan" :
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

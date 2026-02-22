"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import Link from "next/link";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker — served locally from public/
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface ResumeViewerClientProps {
    resume: {
        label: string;
        icon: string;
        color: string;
        borderColor: string;
        bgColor: string;
        hoverBg: string;
        textColor: string;
        file: string;
        apiUrl: string;
        downloadName: string;
        description: string;
    };
}

export default function ResumeViewerClient({ resume }: ResumeViewerClientProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState<number>(800);
    const [loadError, setLoadError] = useState<string>("");
    const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch PDF as base64 JSON from the API route
    // Turbopack has a bug where binary responses get stripped to 0 bytes,
    // so we encode as base64 JSON text which Turbopack passes through correctly
    useEffect(() => {
        let cancelled = false;

        async function loadPdf() {
            try {
                setLoading(true);
                setLoadError("");

                const res = await fetch(`${resume.apiUrl}?format=base64`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const json = await res.json();
                if (!json.data || json.data.length === 0) {
                    throw new Error("Empty PDF response");
                }

                // Decode base64 to Uint8Array
                const binaryString = atob(json.data);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                if (!cancelled) {
                    setPdfBytes(bytes);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    const msg = err instanceof Error ? err.message : "Failed to load PDF";
                    console.error("PDF fetch error:", msg);
                    setLoadError(msg);
                    setLoading(false);
                }
            }
        }

        loadPdf();
        return () => { cancelled = true; };
    }, [resume.apiUrl]);

    // Memoize the file prop to prevent react-pdf from re-loading on every render
    // react-pdf does a shallow comparison, so we need a stable reference
    const fileData = useMemo(() => {
        if (!pdfBytes) return null;
        return { data: pdfBytes };
    }, [pdfBytes]);

    const measureRef = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    setContainerWidth(entry.contentRect.width);
                }
            });
            observer.observe(node);
            setContainerWidth(node.clientWidth);
        }
    }, []);

    const handleDownload = () => {
        // Create a blob from the already-fetched data if available
        if (pdfBytes) {
            const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = resume.downloadName;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            // Fallback: open the API route directly (works for direct navigation)
            window.open(resume.apiUrl, "_blank");
        }
    };

    const handleOpenInNewTab = () => {
        if (pdfBytes) {
            const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
        } else {
            window.open(resume.apiUrl, "_blank");
        }
    };

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    function onDocumentLoadError(error: Error) {
        console.error("react-pdf load error:", error);
        setLoadError(error.message || "Failed to render PDF");
    }

    const pageWidth = Math.min(containerWidth - 40, 900);

    return (
        <div className="flex flex-col overflow-hidden" style={{ height: "100dvh" }}>
            {/* Header */}
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:px-6 gap-3 shrink-0 bg-cosmic-dark border-b border-white/10">
                <div>
                    <h1 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-3">
                        <span>{resume.icon}</span>
                        {resume.label} Resume
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Nishit Bhardwaj — {resume.label}
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <motion.button
                        onClick={handleDownload}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl text-sm font-mono ${resume.bgColor} border ${resume.borderColor} ${resume.textColor} ${resume.hoverBg} transition-colors`}
                    >
                        ⬇ Download PDF
                    </motion.button>
                    <Link href="/resume">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-xl text-sm font-mono bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                        >
                            ← Back
                        </motion.button>
                    </Link>
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-xl text-sm font-mono bg-neon-violet/10 border border-neon-violet/30 text-neon-violet hover:bg-neon-violet/20 transition-colors"
                        >
                            ⌂ Terminal
                        </motion.button>
                    </Link>
                </div>
            </header>

            {/* PDF Viewer */}
            <div
                ref={measureRef}
                className="flex-1 overflow-y-auto min-h-0 relative"
                style={{ backgroundColor: "#525659" }}
            >
                <div className="flex flex-col items-center py-4 px-2 min-h-full">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4 mt-20">
                            <div
                                className="w-10 h-10 border-3 rounded-full animate-spin"
                                style={{
                                    borderColor: resume.color,
                                    borderTopColor: "transparent",
                                }}
                            />
                            <p className="text-white/60 text-sm font-mono">Loading PDF...</p>
                        </div>
                    ) : loadError && !pdfBytes ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4 mt-20">
                            <p className="text-red-400 text-sm font-mono">
                                ⚠ {loadError}
                            </p>
                            <p className="text-gray-500 text-xs">
                                Try opening in a new tab or downloading.
                            </p>
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={handleOpenInNewTab}
                                    className="px-4 py-2 rounded-xl text-xs font-mono text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/10"
                                >
                                    Open in New Tab ↗
                                </button>
                                <motion.button
                                    onClick={handleDownload}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-xl text-xs font-mono bg-gradient-to-r from-neon-cyan to-neon-violet text-white"
                                >
                                    ⬇ Download
                                </motion.button>
                            </div>
                        </div>
                    ) : fileData ? (
                        <Document
                            file={fileData}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={
                                <div className="flex flex-col items-center justify-center py-20 gap-4 mt-20">
                                    <div
                                        className="w-10 h-10 border-3 rounded-full animate-spin"
                                        style={{
                                            borderColor: resume.color,
                                            borderTopColor: "transparent",
                                        }}
                                    />
                                    <p className="text-white/60 text-sm font-mono">Rendering PDF...</p>
                                </div>
                            }
                        >
                            {Array.from(new Array(numPages), (_, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    width={pageWidth}
                                    className="mb-4 shadow-lg rounded"
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                />
                            ))}
                        </Document>
                    ) : null}
                </div>
            </div>

            {/* Bottom bar — always visible */}
            <div className="p-3 bg-cosmic-dark border-t border-white/10 shrink-0 flex items-center justify-center gap-4">
                <button
                    onClick={handleOpenInNewTab}
                    className="text-xs font-mono text-neon-cyan hover:underline"
                >
                    Open in New Tab ↗
                </button>
                <span className="text-gray-700 text-xs">|</span>
                <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl text-sm font-mono bg-gradient-to-r from-neon-cyan to-neon-violet text-white"
                >
                    ⬇ Download {resume.label} Resume
                </motion.button>
            </div>
        </div>
    );
}

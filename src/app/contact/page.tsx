"use client";

import { useState, FormEvent, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function ContactForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const status = searchParams.get("status");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = () => {
        return (
            formData.name.trim() &&
            formData.email.trim() &&
            emailRegex.test(formData.email) &&
            formData.subject.trim() &&
            formData.message.trim()
        );
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("subject", formData.subject);
        form.append("message", formData.message);
        form.append("_next", `${window.location.origin}/?status=sent`);
        form.append("_captcha", "false");

        try {
            await fetch("https://formsubmit.co/ajax/nishitbhardwaj11@gmail.com", {
                method: "POST",
                body: form,
            });
            router.push("/?status=sent");
        } catch {
            setErrors({ submit: "Failed to send. Please try again." });
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Success Message */}
            <AnimatePresence>
                {status === "sent" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                    >
                        <div className="text-center p-8 rounded-xl border border-neon-cyan/30 bg-cosmic-dark/90 backdrop-blur-md">
                            <div className="text-4xl mb-4">✅</div>
                            <h2 className="text-xl font-display font-bold text-neon-cyan mb-2">
                                Transmission Delivered!
                            </h2>
                            <p className="text-gray-400 mb-6">
                                Message sent to Mission Commander.
                            </p>
                            <Link href="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl font-mono text-sm bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                                >
                                    Return to Terminal
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg"
            >
                <div
                    className="rounded-2xl border border-neon-cyan/30 bg-cosmic-dark/80 backdrop-blur-md p-8"
                    style={{
                        boxShadow: "0 0 40px rgba(35, 243, 255, 0.1), 0 0 80px rgba(157, 78, 221, 0.05)",
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-display font-bold text-white mb-2">
                            📡 Send Transmission
                        </h1>
                        <p className="text-sm text-gray-400">
                            Contact the Mission Commander
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-2">
                                NAME
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-white font-mono text-sm outline-none transition-colors ${errors.name ? "border-red-500" : "border-terminal-border focus:border-neon-cyan"
                                    }`}
                                placeholder="Your name"
                            />
                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-2">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-white font-mono text-sm outline-none transition-colors ${errors.email ? "border-red-500" : "border-terminal-border focus:border-neon-cyan"
                                    }`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-2">
                                SUBJECT
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-white font-mono text-sm outline-none transition-colors ${errors.subject ? "border-red-500" : "border-terminal-border focus:border-neon-cyan"
                                    }`}
                                placeholder="What's this about?"
                            />
                            {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-2">
                                MESSAGE
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-white font-mono text-sm outline-none transition-colors resize-none ${errors.message ? "border-red-500" : "border-terminal-border focus:border-neon-cyan"
                                    }`}
                                placeholder="Your message..."
                            />
                            {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                        </div>

                        {errors.submit && (
                            <p className="text-sm text-red-400 text-center">{errors.submit}</p>
                        )}

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={!isFormValid() || isSubmitting}
                            whileHover={isFormValid() && !isSubmitting ? { scale: 1.02 } : {}}
                            whileTap={isFormValid() && !isSubmitting ? { scale: 0.98 } : {}}
                            className={`w-full py-4 rounded-xl font-mono text-sm font-bold transition-all ${isFormValid() && !isSubmitting
                                ? "bg-gradient-to-r from-neon-cyan to-neon-violet text-white cursor-pointer"
                                : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {isSubmitting ? "Transmitting..." : "🚀 Send Transmission"}
                        </motion.button>
                    </form>

                    {/* Back link */}
                    <div className="text-center mt-6">
                        <Link href="/" className="text-sm text-gray-500 hover:text-neon-cyan transition-colors">
                            ← Back to Terminal
                        </Link>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default function ContactPage() {
    const [stars, setStars] = useState<{ left: string; top: string; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 80 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="min-h-screen bg-cosmic-dark flex items-center justify-center p-6 overflow-hidden">
            {/* Background stars */}
            <div className="fixed inset-0 pointer-events-none">
                {stars.map((star, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/30"
                        style={{
                            left: star.left,
                            top: star.top,
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                        }}
                    />
                ))}
            </div>

            {/* Wrap in Suspense for useSearchParams */}
            <Suspense fallback={
                <div className="text-center text-neon-cyan font-mono">
                    Loading...
                </div>
            }>
                <ContactForm />
            </Suspense>
        </div>
    );
}

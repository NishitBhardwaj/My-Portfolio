"use client";

import { motion } from "framer-motion";

const awsRows = [
    [
        { id: "route53", label: "Route 53", icon: "🌐", color: "#8C4FFF" },
        { id: "cloudfront", label: "CloudFront", icon: "🌍", color: "#8C4FFF" },
        { id: "elb", label: "Load Balancer", icon: "⚖️", color: "#FF9900" },
    ],
    [
        { id: "ec2", label: "EC2 / ECS", icon: "🖥️", color: "#FF9900" },
        { id: "lambda", label: "Lambda", icon: "⚡", color: "#FF9900" },
        { id: "sqs", label: "SQS Queue", icon: "📬", color: "#FF4F8B" },
    ],
    [
        { id: "rds", label: "RDS / MySQL", icon: "🐬", color: "#3B48CC" },
        { id: "dynamo", label: "DynamoDB", icon: "⚙️", color: "#3B48CC" },
        { id: "s3", label: "S3 Storage", icon: "🪣", color: "#3B48CC" },
    ],
];

function HArrow({ delay, color = "#FF9900" }: { delay: number; color?: string }) {
    return (
        <motion.div
            className="flex items-center justify-center px-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <motion.span
                style={{ color }}
                className="text-lg"
                animate={{ opacity: [0.3, 1, 0.3], x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                →
            </motion.span>
        </motion.div>
    );
}

function VArrowRow({ delay, color = "#FF9900" }: { delay: number; color?: string }) {
    return (
        <div className="flex justify-center gap-16 md:gap-28 py-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + i * 0.1 }}
                >
                    <motion.span
                        style={{ color }}
                        className="text-lg"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                        ↓
                    </motion.span>
                </motion.div>
            ))}
        </div>
    );
}

function ServiceCard({ svc, index }: { svc: { id: string; label: string; icon: string; color: string }; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.06, y: -3, transition: { duration: 0.2 } }}
            className="holographic rounded-xl p-4 flex flex-col items-center cursor-pointer flex-1 min-w-[90px]"
            style={{ boxShadow: `0 0 12px ${svc.color}18` }}
        >
            <motion.span
                className="text-3xl md:text-4xl mb-2"
                animate={{
                    filter: [
                        `drop-shadow(0 0 4px ${svc.color}30)`,
                        `drop-shadow(0 0 10px ${svc.color}60)`,
                        `drop-shadow(0 0 4px ${svc.color}30)`,
                    ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
            >
                {svc.icon}
            </motion.span>
            <span className="text-xs font-mono text-gray-400 text-center">{svc.label}</span>
        </motion.div>
    );
}

export default function AWSArchitecture() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-12">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-display font-bold text-center mb-8"
                style={{ background: "linear-gradient(90deg, #FF9900, #FF4F8B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
                ☁️ AWS Cloud Architecture
            </motion.h3>

            {/* Cloud container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl p-6 md:p-8"
                style={{
                    background: "linear-gradient(135deg, rgba(255,153,0,0.05) 0%, rgba(59,72,204,0.08) 100%)",
                    border: "1px solid rgba(255,153,0,0.2)",
                }}
            >
                {/* AWS Cloud label */}
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-mono"
                    style={{ background: "rgba(255,153,0,0.2)", border: "1px solid rgba(255,153,0,0.4)", color: "#FF9900" }}>
                    AWS Cloud
                </div>

                {/* Row 0: Route53 → CloudFront → Load Balancer */}
                <div className="flex items-center justify-center gap-2 md:gap-3">
                    <ServiceCard svc={awsRows[0][0]} index={0} />
                    <HArrow delay={0.3} color="#8C4FFF" />
                    <ServiceCard svc={awsRows[0][1]} index={1} />
                    <HArrow delay={0.4} color="#8C4FFF" />
                    <ServiceCard svc={awsRows[0][2]} index={2} />
                </div>

                <VArrowRow delay={0.5} color="#FF9900" />

                {/* Row 1: EC2 → Lambda → SQS */}
                <div className="flex items-center justify-center gap-2 md:gap-3">
                    <ServiceCard svc={awsRows[1][0]} index={3} />
                    <HArrow delay={0.6} color="#FF9900" />
                    <ServiceCard svc={awsRows[1][1]} index={4} />
                    <HArrow delay={0.7} color="#FF4F8B" />
                    <ServiceCard svc={awsRows[1][2]} index={5} />
                </div>

                <VArrowRow delay={0.8} color="#3B48CC" />

                {/* Row 2: RDS → DynamoDB → S3 */}
                <div className="flex items-center justify-center gap-2 md:gap-3">
                    <ServiceCard svc={awsRows[2][0]} index={6} />
                    <HArrow delay={0.9} color="#3B48CC" />
                    <ServiceCard svc={awsRows[2][1]} index={7} />
                    <HArrow delay={1.0} color="#3B48CC" />
                    <ServiceCard svc={awsRows[2][2]} index={8} />
                </div>
            </motion.div>

            {/* Badges */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap justify-center gap-3 mt-6"
            >
                {["EC2", "Lambda", "S3", "RDS", "CloudFront", "SQS", "DynamoDB"].map((badge) => (
                    <motion.span
                        key={badge}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 text-xs font-mono rounded-full"
                        style={{
                            background: "rgba(255,153,0,0.15)",
                            border: "1px solid rgba(255,153,0,0.3)",
                            color: "#FF9900",
                        }}
                    >
                        {badge}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}

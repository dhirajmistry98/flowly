"use client";

import { motion } from "motion/react";
import { MessageSquare, Layout, Sparkles, Zap, Users, Shield } from "lucide-react";

const capabilities = [
    {
        name: "Channel-based communication",
        description: "Organize discussions by team, topic, or project.",
        icon: Layout,
    },
    {
        name: "Threaded conversations",
        description: "Keep replies connected to the original message.",
        icon: MessageSquare,
    },
    {
        name: "AI-powered summaries",
        description: "Quickly highlight important insights from long discussions.",
        icon: Sparkles,
    },
    {
        name: "Real-time messaging",
        description: "Instant collaboration for teams of any size.",
        icon: Zap,
    },
    {
        name: "Member management",
        description: "Easily onboard and manage teammates and permissions.",
        icon: Users,
    },
    {
        name: "Structured workspaces",
        description: "Keep all team communication organized in one place.",
        icon: Shield,
    },
];

export function SolutionSection() {
    return (
        <section id="solution" className="py-24 sm:py-32 bg-primary/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-base font-semibold leading-7 text-primary"
                    >
                        Solution
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
                    >
                        The AI-Ready Hub for Team Communication
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-muted-foreground"
                    >
                        Flowly provides a modern solution for teams that need structured communication, real-time collaboration, and AI-powered productivity. Instead of scattered messages and disconnected tools, Flowly brings everything into a single organized workspace.
                    </motion.p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {capabilities.map((capability, index) => (
                            <motion.div
                                key={capability.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col bg-background p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow"
                            >
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                                    <capability.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                    {capability.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-sm leading-7 text-muted-foreground">
                                    <p className="flex-auto">{capability.description}</p>
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center text-lg leading-8 text-muted-foreground max-w-4xl mx-auto"
                >
                    <p>
                        With features like workspace management, member invitations, threaded discussions, and AI-powered summaries, Flowly ensures teams stay organized and aligned across projects.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

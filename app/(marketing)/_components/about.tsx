"use client";

import { motion } from "motion/react";

export function AboutSection() {
    return (
        <section id="about" className="py-24 sm:py-32 bg-secondary/10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-base font-semibold leading-7 text-primary"
                    >
                        About Flowly
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
                    >
                        Modern AI-powered team collaboration
                    </motion.p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6"
                        >
                            <p className="text-lg leading-8 text-muted-foreground">
                                Flowly is a modern AI-powered team collaboration platform built to help organizations communicate more effectively and stay aligned. Designed for startups, remote teams, and growing companies, Flowly transforms scattered conversations into structured and productive discussions.
                            </p>
                            <p className="text-lg leading-8 text-muted-foreground">
                                Traditional messaging tools often lead to cluttered conversations and lost context. Flowly solves this by organizing communication into workspaces, channels, and threaded discussions, ensuring that every conversation remains structured and easy to follow.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6"
                        >
                            <p className="text-lg leading-8 text-muted-foreground">
                                Teams can create dedicated channels for projects, departments, or topics, invite members to collaborate, and maintain focused discussions using threads. This allows teams to manage conversations efficiently without losing important information.
                            </p>
                            <p className="text-lg leading-8 text-muted-foreground">
                                Flowly also integrates AI-powered capabilities that help teams summarize long discussions, understand key insights quickly, and reduce the time spent searching for information.
                            </p>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", damping: 20 }}
                        className="mt-16 rounded-[2.5rem] bg-background p-12 border shadow-xl shadow-primary/5 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                        <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                        <p className="text-xl leading-8 text-muted-foreground max-w-3xl mx-auto font-medium">
                            "To build an intelligent communication platform that helps teams collaborate efficiently, stay organized, and work smarter with the support of AI."
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

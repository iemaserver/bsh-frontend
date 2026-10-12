import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Cpu, GraduationCap, Brain, Wrench, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RESEARCH_AREAS = [
    'Generative AI for De Novo Small-Molecule Design',
    'AI-Driven / Generative Drug Discovery',
    'Molecular Dynamics (MD) Simulations',
    'Docking, Virtual Screening, and High-Throughput Computation',
    'High-Throughput Virtual Screening and AI-Rescoring Pipelines',
    'Agentic Workflows for Lead Optimization and ADMET Prediction',
];

const QUALIFICATIONS = [
    'M.Sc./M. Pharm./M. Tech. in Chemistry or allied fields',
    'Suitable match between academic background and research area',
    'Selection test consists of a written exam followed by interview',
    'NET/GATE/GPAT/GAT-B/similar All India Entrance qualified candidates will get preference',
];

const CONTACTS = [
    { name: 'Dr. Chandan Adhikari', email: 'chandan.adhikari@iem.edu.in' },
    { name: 'Dr. Prabir Kumar Das', email: 'prabir.das@iem.edu.in' },
];

function Section({ icon: Icon, title, children }) {
    return (
        <Card className="overflow-hidden gradient-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                    <h2 className="font-heading font-bold text-xl text-foreground">{title}</h2>
                </div>
                {children}
            </CardContent>
        </Card>
    );
}

export default function OpenPositions() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16"
        >
            {/* Header */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-secondary/30 to-primary/5" />
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
                />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                            Research
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Open <span className="text-gradient">Positions</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Ph.D. position available — AI-driven drug discovery with supercomputing facilities
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-6 max-w-5xl space-y-8">
                    {/* Advertisement */}
                    <Card className="overflow-hidden gradient-border bg-card/50">
                        <a href="/phd-position-advertisement.jpg" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/phd-position-advertisement.jpg"
                                alt="Ph.D. Position Available — IEM / UEM, IIFR"
                                className="w-full h-auto object-contain bg-white"
                            />
                        </a>
                    </Card>

                    <div className="text-center">
                        <h2 className="font-heading font-bold text-3xl text-foreground">Ph.D. Position Available</h2>
                        <p className="text-muted-foreground mt-2">
                            Institute of Engineering &amp; Management (IEM) / University of Engineering &amp; Management (UEM) — IIFR
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Section icon={Brain} title="Research Areas">
                            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                                {RESEARCH_AREAS.map((a) => <li key={a}>{a}</li>)}
                            </ul>
                        </Section>

                        <Section icon={Cpu} title="Supercomputing Facility Available">
                            <p className="text-foreground font-medium mb-2">
                                NVIDIA DGX Spark: World’s Smallest and Fastest Supercomputer
                            </p>
                            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                                <li>128 GB Unified Coherent System Memory, 4 TB NVMe SSD</li>
                                <li>Full NVIDIA AI &amp; Scientific Software Stack</li>
                                <li>Secure, Private, and Scalable Local Computing</li>
                            </ul>
                        </Section>

                        <Section icon={Sparkles} title="GPU Workstation for Computational Work">
                            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                                <li>High-performance GPU workstation for AI, ML, and scientific computing</li>
                                <li>Ideal for deep learning, molecular modeling, data analysis, and simulation tasks</li>
                                <li>Equipped with latest GPUs, high-speed storage &amp; ample memory</li>
                                <li>Seamless integration with local and cluster resources</li>
                            </ul>
                        </Section>

                        <Section icon={GraduationCap} title="Essential Qualification &amp; Skills">
                            <p className="text-foreground font-semibold mb-1">Essential Qualification</p>
                            <ul className="space-y-2 text-muted-foreground list-disc pl-5 mb-4">
                                {QUALIFICATIONS.map((q) => <li key={q}>{q}</li>)}
                            </ul>
                            <p className="text-muted-foreground mb-3">
                                <span className="text-foreground font-semibold">Essential Skill Required: </span>
                                Python Programming, Machine Learning Fundamentals, Linux &amp; Command Line, CUDA &amp; GPU Computing
                            </p>
                            <p className="text-muted-foreground">
                                <span className="text-foreground font-semibold">Preferable Skills Required: </span>
                                Docker &amp; Containerization, Data Science &amp; Analytics, Model Optimization
                            </p>
                        </Section>
                    </div>

                    <Section icon={Mail} title="Contact">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {CONTACTS.map((c) => (
                                <div key={c.email} className="bg-secondary/50 rounded-lg px-4 py-3">
                                    <p className="font-semibold text-foreground">{c.name}</p>
                                    <a href={`mailto:${c.email}`} className="text-primary hover:underline break-all">
                                        {c.email}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </section>
        </motion.div>
    );
}

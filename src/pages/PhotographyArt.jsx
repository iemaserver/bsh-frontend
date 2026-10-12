import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Palette, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PORTAL_URL = 'https://chalchitra-competiti-wera.bolt.host/#gallery';

export default function PhotographyArt() {
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
                            Events
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Photography <span className="text-gradient">and Art</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Online submission portal for “রেখায়, আলোয় দুর্গা”
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-3xl">
                    <Link
                        to="/events"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Events
                    </Link>

                    <Card className="overflow-hidden gradient-border bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6 text-primary">
                                <Camera className="w-7 h-7" />
                                <Palette className="w-7 h-7" />
                            </div>

                            <p className="text-muted-foreground leading-relaxed text-lg mb-5">
                                Welcome to the online submission portal for{' '}
                                <span className="font-semibold text-foreground italic">“রেখায়, আলোয় দুর্গা”</span>,
                                a Durga Puja-themed photography and drawing competition organized by the
                                Department of Basic Science and Humanities (BSH), Institute of Engineering &
                                Management (IEM), Kolkata.
                            </p>

                            <p className="text-muted-foreground leading-relaxed text-lg mb-5">
                                Students are invited to express their creativity through photographs and
                                artwork inspired by the colours, traditions, emotions, and artistic beauty of
                                Durga Puja.
                            </p>

                            <p className="font-heading font-semibold text-xl text-foreground italic mb-8">
                                Capture the moments. Create the art. Celebrate Maa Durga.
                            </p>

                            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/20">
                                    Open Submission Portal &amp; Gallery
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </motion.div>
    );
}

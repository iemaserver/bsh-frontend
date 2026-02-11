import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Globe, ExternalLink, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function Clubs() {
    const [clubs, setClubs] = useState([]);
    
    const { clubs: contextClubs } = useData();

    useEffect(() => {
        if (contextClubs) setClubs(contextClubs);
    }, [contextClubs]);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <section className="bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-violet-600" />
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Clubs & Student Chapters
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore our vibrant student organizations fostering professional development,
                            networking, and extracurricular learning opportunities.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {clubs.map((club) => (
                            <motion.div
                                key={club.id}
                                variants={itemVariants}
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-t-4 border-t-violet-500">
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex-1">
                                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <Users className="w-6 h-6 text-white" />
                                            </div>

                                            <h3 className="font-heading font-bold text-lg mb-4 line-clamp-2">
                                                {club.name}
                                            </h3>

                                            {club.description && (
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                                    {club.description}
                                                </p>
                                            )}

                                            <div className="space-y-2 text-sm">
                                                {club.contactPerson && (
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Users className="w-4 h-4 flex-shrink-0" />
                                                        <span className="truncate">{club.contactPerson}</span>
                                                    </div>
                                                )}
                                                {club.email && (
                                                    <a
                                                        href={`mailto:${club.email}`}
                                                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        <Mail className="w-4 h-4 flex-shrink-0" />
                                                        <span className="truncate">{club.email}</span>
                                                    </a>
                                                )}
                                                {club.phone && (
                                                    <a
                                                        href={`tel:${club.phone}`}
                                                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        <Phone className="w-4 h-4 flex-shrink-0" />
                                                        <span>{club.phone}</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-6 pt-4 border-t">
                                            {club.websiteUrl && (
                                                <a
                                                    href={club.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1"
                                                >
                                                    <Button variant="outline" size="sm" className="w-full gap-2">
                                                        <Globe className="w-4 h-4" />
                                                        Website
                                                    </Button>
                                                </a>
                                            )}
                                            {club.activitiesUrl && (
                                                <a
                                                    href={club.activitiesUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1"
                                                >
                                                    <Button variant="default" size="sm" className="w-full gap-2">
                                                        <FileText className="w-4 h-4" />
                                                        Activities
                                                    </Button>
                                                </a>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {clubs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-xl font-heading font-semibold text-muted-foreground">
                                No clubs available
                            </h3>
                            <p className="text-muted-foreground mt-2">
                                Check back later for updates on student clubs and chapters.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 className="font-heading text-2xl font-bold mb-4">
                            Want to Start a New Club?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            If you have an idea for a new student club or chapter, reach out to the
                            department to discuss opportunities for creating new student organizations.
                        </p>
                        <Button asChild size="lg">
                            <a href="/contact">Contact Us</a>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

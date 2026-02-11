import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, ExternalLink, Users, Calendar, MapPin } from 'lucide-react';
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

const slideVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

export default function Journals() {
    const [journals, setJournals] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [activeTab, setActiveTab] = useState('journals');
    
    const { journals: contextJournals, conferences: contextConferences } = useData();

    useEffect(() => {
        if (contextJournals) setJournals(contextJournals);
        if (contextConferences) setConferences(contextConferences);
    }, [contextJournals, contextConferences]);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <section className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Journals & Conferences
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore our department's academic journals and international conferences
                            fostering research and knowledge exchange.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-8 border-b">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center gap-4">
                        <Button
                            variant={activeTab === 'journals' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('journals')}
                            className="gap-2"
                        >
                            <BookOpen className="w-4 h-4" />
                            Journals ({journals.length})
                        </Button>
                        <Button
                            variant={activeTab === 'conferences' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('conferences')}
                            className="gap-2"
                        >
                            <Users className="w-4 h-4" />
                            Conferences ({conferences.length})
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    {activeTab === 'journals' ? (
                        <motion.div 
                            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key="journals"
                        >
                            {journals.map((journal) => (
                                <motion.div
                                    key={journal.id}
                                    variants={itemVariants}
                                >
                                    <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow group">
                                        {journal.imageUrl && (
                                            <div className="aspect-video bg-muted overflow-hidden">
                                                <img
                                                    src={journal.imageUrl}
                                                    alt={journal.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <CardContent className="p-6">
                                            <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2">
                                                {journal.name}
                                            </h3>
                                            {journal.issn && (
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    ISSN: {journal.issn}
                                                </p>
                                            )}
                                            {journal.websiteUrl && (
                                                <a
                                                    href={journal.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button variant="outline" className="w-full gap-2">
                                                        <Globe className="w-4 h-4" />
                                                        Visit Journal
                                                        <ExternalLink className="w-3 h-3" />
                                                    </Button>
                                                </a>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="space-y-6 max-w-4xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key="conferences"
                        >
                            {conferences.map((conference) => (
                                <motion.div
                                    key={conference.id}
                                    variants={slideVariants}
                                >
                                    <Card className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                                                            {conference.shortName}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-heading font-bold text-lg mb-2">
                                                        {conference.name}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                        {conference.date && (
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-4 h-4" />
                                                                {new Date(conference.date).toLocaleDateString('en-IN', {
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    year: 'numeric'
                                                                })}
                                                            </span>
                                                        )}
                                                        {conference.venue && (
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-4 h-4" />
                                                                {conference.venue}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {conference.websiteUrl && (
                                                    <a
                                                        href={conference.websiteUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Button variant="default" className="gap-2 whitespace-nowrap">
                                                            <Globe className="w-4 h-4" />
                                                            Visit Website
                                                            <ExternalLink className="w-3 h-3" />
                                                        </Button>
                                                    </a>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

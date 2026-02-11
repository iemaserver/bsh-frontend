import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, FileText, ExternalLink, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

export default function Notices() {
    const { notices: noticesData } = useData();
    const [notices, setNotices] = useState([]);
    const [showAll, setShowAll] = useState(false);

    // Set notices data from context when available
    useEffect(() => {
        if (noticesData) {
            setNotices(noticesData);
        }
    }, [noticesData]);

    const formatDate = (dateString) => {
        if (!dateString) return 'No date';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const displayedNotices = showAll ? notices : notices.slice(0, 10);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16"
        >
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10" />
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
                />
                
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20"
                        >
                            <Bell className="w-10 h-10 text-white" />
                        </motion.div>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Notice <span className="text-gradient">Board</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Stay updated with the latest announcements, circulars, and important information
                            from the Department of Basic Science and Humanities.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Notices List */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    {notices.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <AlertCircle className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                            <h3 className="text-2xl font-heading font-bold text-muted-foreground mb-2">
                                No notices available
                            </h3>
                            <p className="text-muted-foreground">
                                Check back later for updates and announcements.
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            <div className="space-y-5">
                                {displayedNotices.map((notice, index) => (
                                    <motion.div
                                        key={notice.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <Card className="group gradient-border hover:shadow-xl transition-all duration-300 border-l-4 border-l-amber-500 bg-card/50 backdrop-blur-sm">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                                            <div className="flex items-center gap-1.5 bg-secondary/70 px-3 py-1 rounded-full">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                <span>{formatDate(notice.date)}</span>
                                                            </div>
                                                            {notice.isActive && (
                                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                                                    Active
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                                                            {notice.title}
                                                        </h3>
                                                        {notice.description && (
                                                            <p className="text-sm text-muted-foreground">
                                                                {notice.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {notice.documentUrl && (
                                                        <a
                                                            href={notice.documentUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-shrink-0"
                                                        >
                                                            <Button variant="outline" size="sm" className="gap-2 group/btn">
                                                                <FileText className="w-4 h-4" />
                                                                View
                                                                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                            </Button>
                                                        </a>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            {notices.length > 10 && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-center mt-10"
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => setShowAll(!showAll)}
                                        className="border-2 hover:border-primary/50 transition-all"
                                    >
                                        {showAll ? 'Show Less' : `Show All (${notices.length})`}
                                    </Button>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </motion.div>
    );
}

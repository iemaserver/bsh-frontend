import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award as AwardIcon, Medal, Star, ExternalLink, User, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function Awards() {
    const [awards, setAwards] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    
    const { awards: contextAwards } = useData();

    useEffect(() => {
        if (contextAwards) setAwards(contextAwards);
    }, [contextAwards]);

    const facultyAwards = awards.filter(a => a.category === 'faculty');
    const studentAwards = awards.filter(a => a.category === 'student');

    const getDisplayAwards = () => {
        switch (activeTab) {
            case 'faculty':
                return facultyAwards;
            case 'student':
                return studentAwards;
            default:
                return awards;
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <section className="bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-orange-500/10 py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Trophy className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Awards & Recognition
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Celebrating the achievements and excellence of our faculty members and students
                            in academics, research, and extracurricular activities.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-8 border-b">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="text-3xl font-heading font-bold text-primary">{awards.length}</div>
                            <div className="text-sm text-muted-foreground">Total Awards</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl font-heading font-bold text-amber-600">{facultyAwards.length}</div>
                            <div className="text-sm text-muted-foreground">Faculty Awards</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="text-3xl font-heading font-bold text-green-600">{studentAwards.length}</div>
                            <div className="text-sm text-muted-foreground">Student Awards</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-8">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center gap-4">
                        <Button
                            variant={activeTab === 'all' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('all')}
                            className="gap-2"
                        >
                            <Trophy className="w-4 h-4" />
                            All Awards
                        </Button>
                        <Button
                            variant={activeTab === 'faculty' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('faculty')}
                            className="gap-2"
                        >
                            <User className="w-4 h-4" />
                            Faculty Awards
                        </Button>
                        <Button
                            variant={activeTab === 'student' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('student')}
                            className="gap-2"
                        >
                            <Users className="w-4 h-4" />
                            Student Awards
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-8">
                <div className="container mx-auto px-6">
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={activeTab}
                    >
                        {getDisplayAwards().map((award) => (
                            <motion.div
                                key={award.id}
                                variants={itemVariants}
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                                    {award.imageUrl && (
                                        <div className="aspect-video bg-muted overflow-hidden">
                                            <img
                                                src={award.imageUrl}
                                                alt={award.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${award.category === 'faculty'
                                                    ? 'bg-amber-500/20'
                                                    : 'bg-green-500/20'
                                                }`}>
                                                <Medal className={`w-6 h-6 ${award.category === 'faculty'
                                                        ? 'text-amber-600'
                                                        : 'text-green-600'
                                                    }`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className={`inline-block px-2 py-0.5 text-xs rounded-full mb-2 ${award.category === 'faculty'
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    {award.category === 'faculty' ? 'Faculty' : 'Student'}
                                                </span>
                                                <h3 className="font-heading font-bold text-base mb-1 line-clamp-2">
                                                    {award.title}
                                                </h3>
                                                {award.year && (
                                                    <p className="text-sm text-muted-foreground mb-1">
                                                        Year: {award.year}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {award.recipientName && (
                                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-primary" />
                                                    <span className="text-sm font-medium">{award.recipientName}</span>
                                                </div>
                                            </div>
                                        )}

                                        {award.description && (
                                            <p className="text-sm text-muted-foreground mt-4 line-clamp-4">
                                                {award.description}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {getDisplayAwards().length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <Trophy className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-xl font-heading font-semibold text-muted-foreground">
                                No awards in this category
                            </h3>
                            <p className="text-muted-foreground mt-2">
                                Check back later for updates.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

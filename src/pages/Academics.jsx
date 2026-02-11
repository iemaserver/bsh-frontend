import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, FileText, Target, Users, ExternalLink, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

const tabs = [
    { id: 'syllabus', label: 'Syllabus', path: '/academics/syllabus', icon: BookOpen },
    { id: 'program-outcomes', label: 'Program Outcomes', path: '/academics/program-outcomes', icon: Target },
    { id: 'bos-meetings', label: 'BoS Meetings', path: '/academics/bos-meetings', icon: Users },
];

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

export default function Academics() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('syllabus');
    const [syllabi, setSyllabi] = useState([]);
    const [programOutcomes, setProgramOutcomes] = useState([]);
    const [bosMeetings, setBosMeetings] = useState([]);
    
    const { syllabi: contextSyllabi, programOutcomes: contextProgramOutcomes, bosMeetings: contextBosMeetings } = useData();

    useEffect(() => {
        if (location.pathname.includes('program-outcomes')) {
            setActiveTab('program-outcomes');
        } else if (location.pathname.includes('bos-meetings')) {
            setActiveTab('bos-meetings');
        } else {
            setActiveTab('syllabus');
        }
    }, [location.pathname]);

    useEffect(() => {
        if (contextSyllabi) setSyllabi(contextSyllabi);
        if (contextProgramOutcomes) setProgramOutcomes(contextProgramOutcomes);
        if (contextBosMeetings) setBosMeetings(contextBosMeetings);
    }, [contextSyllabi, contextProgramOutcomes, contextBosMeetings]);

    const syllabiByYear = syllabi.reduce((acc, item) => {
        const year = item.year || 'Other';
        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
    }, {});

    return (
        <div className="min-h-screen pt-24 pb-16">
            <section className="bg-secondary/30 py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Academics
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore our curriculum, program outcomes, and academic governance
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="border-b border-border sticky top-16 bg-background z-40">
                <div className="container mx-auto px-6">
                    <div className="flex gap-1 overflow-x-auto py-2">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                to={tab.path}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-6">
                    {activeTab === 'syllabus' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="font-heading text-2xl font-bold mb-8">Syllabus & Curriculum</h2>

                            {Object.entries(syllabiByYear).sort((a, b) => b[0].localeCompare(a[0])).map(([year, items]) => (
                                <motion.div 
                                    key={year} 
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h3 className="font-heading text-lg font-semibold mb-4 text-primary">{year}</h3>
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {items.map((syllabus) => (
                                            <motion.div key={syllabus.id} variants={itemVariants}>
                                                <Card className="h-full hover:shadow-lg transition-shadow">
                                                    <CardContent className="p-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="w-8 h-8 text-primary" />
                                                            <div>
                                                                <h4 className="font-medium text-sm">{syllabus.title}</h4>
                                                                {syllabus.category && (
                                                                    <span className="text-xs text-muted-foreground">{syllabus.category}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {syllabus.documentUrl && (
                                                            <Button variant="ghost" size="icon" asChild>
                                                                <a href={syllabus.documentUrl} target="_blank" rel="noopener noreferrer">
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            ))}

                            {syllabi.length === 0 && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-muted-foreground text-center py-12"
                                >
                                    No syllabus documents available.
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'program-outcomes' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="font-heading text-2xl font-bold mb-4">Program Outcomes (POs)</h2>
                            <p className="text-muted-foreground mb-8 max-w-3xl">
                                Our program outcomes define what students should know and be able to do upon graduation. These outcomes guide our curriculum and assessment.
                            </p>

                            <motion.div 
                                className="space-y-4"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {programOutcomes.map((po, index) => (
                                    <motion.div
                                        key={po.id}
                                        variants={itemVariants}
                                    >
                                        <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold">
                                                        {po.code?.split(' ')[1] || index + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-heading font-semibold text-lg mb-2">
                                                            {po.code}: {po.title}
                                                        </h3>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            {po.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {programOutcomes.length === 0 && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-muted-foreground text-center py-12"
                                >
                                    No program outcomes available.
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'bos-meetings' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="font-heading text-2xl font-bold mb-4">Board of Studies Meetings</h2>
                            <p className="text-muted-foreground mb-8 max-w-3xl">
                                The Board of Studies oversees academic programs and curriculum development. Below are the minutes from our BoS meetings.
                            </p>

                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {bosMeetings.map((meeting, index) => (
                                    <motion.div
                                        key={meeting.id}
                                        variants={itemVariants}
                                    >
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold">
                                                        {meeting.meetingNumber || index + 1}
                                                    </div>
                                                    <span className="text-base">{meeting.title}</span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                {meeting.date && (
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        {new Date(meeting.date).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                )}
                                                {meeting.documentUrl && (
                                                    <Button variant="outline" size="sm" className="w-full" asChild>
                                                        <a href={meeting.documentUrl} target="_blank" rel="noopener noreferrer">
                                                            <Download className="w-4 h-4 mr-2" />
                                                            View Minutes
                                                        </a>
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {bosMeetings.length === 0 && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-muted-foreground text-center py-12"
                                >
                                    No BoS meeting records available.
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

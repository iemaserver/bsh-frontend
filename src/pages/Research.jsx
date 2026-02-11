import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Microscope, GraduationCap, ExternalLink, Award, Users2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

const tabs = [
    { id: 'publications', label: 'Publications', path: '/research/publications', icon: FileText },
    { id: 'projects', label: 'Funded Projects', path: '/research/projects', icon: Microscope },
    { id: 'phd', label: 'PhD Program', path: '/research/phd', icon: GraduationCap },
    { id: 'collaborations', label: 'MoUs & Consultancy', path: '/research/collaborations', icon: Users2 },
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

export default function Research() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('publications');
    const [publications, setPublications] = useState([]);
    const [fundedProjects, setFundedProjects] = useState([]);
    const [patents, setPatents] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [phdStudents, setPhdStudents] = useState([]);
    const [mous, setMous] = useState([]);
    const [consultancies, setConsultancies] = useState([]);
    
    const { 
        publications: contextPublications, 
        fundedProjects: contextFundedProjects, 
        patents: contextPatents,
        researchSupervisors: contextSupervisors, 
        phdStudents: contextPhdStudents, 
        mous: contextMous, 
        consultancies: contextConsultancies 
    } = useData();

    useEffect(() => {
        if (location.pathname.includes('projects')) {
            setActiveTab('projects');
        } else if (location.pathname.includes('phd')) {
            setActiveTab('phd');
        } else if (location.pathname.includes('collaborations')) {
            setActiveTab('collaborations');
        } else {
            setActiveTab('publications');
        }
    }, [location.pathname]);

    useEffect(() => {
        if (contextPublications) setPublications(contextPublications);
        if (contextFundedProjects) setFundedProjects(contextFundedProjects);
        if (contextPatents) setPatents(contextPatents);
        if (contextSupervisors) setSupervisors(contextSupervisors);
        if (contextPhdStudents) setPhdStudents(contextPhdStudents);
        if (contextMous) setMous(contextMous);
        if (contextConsultancies) setConsultancies(contextConsultancies);
    }, [contextPublications, contextFundedProjects, contextPatents, contextSupervisors, contextPhdStudents, contextMous, contextConsultancies]);

    const pubsByType = publications.reduce((acc, item) => {
        const type = item.publicationType || 'other';
        if (!acc[type]) acc[type] = [];
        acc[type].push(item);
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
                            Research
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore our research publications, funded projects, and PhD program
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
                    {activeTab === 'publications' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="font-heading text-2xl font-bold mb-8">Publications</h2>

                            {['journal', 'conference', 'book'].map((type) => (
                                pubsByType[type]?.length > 0 && (
                                    <motion.div 
                                        key={type} 
                                        className="mb-10"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h3 className="font-heading text-lg font-semibold mb-4 text-primary capitalize flex items-center gap-2">
                                            <FileText className="w-5 h-5" />
                                            {type === 'journal' ? 'Journal Publications' :
                                                type === 'conference' ? 'Conference Publications' :
                                                    'Book/Book Chapters'}
                                        </h3>
                                        <motion.div 
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {pubsByType[type].map((pub) => (
                                                <motion.div key={pub.id} variants={itemVariants}>
                                                    <Card className="hover:shadow-lg transition-shadow">
                                                        <CardContent className="p-4 flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-medium text-sm">{pub.title}</h4>
                                                                <p className="text-xs text-muted-foreground mt-1">Year: {pub.year}</p>
                                                            </div>
                                                            {pub.documentUrl && (
                                                                <Button variant="ghost" size="icon" asChild>
                                                                    <a href={pub.documentUrl} target="_blank" rel="noopener noreferrer">
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
                                )
                            ))}

                            {patents.length > 0 && (
                                <motion.div 
                                    className="mb-10"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <h3 className="font-heading text-lg font-semibold mb-4 text-primary flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        Patents
                                    </h3>
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {patents.map((patent) => (
                                            <motion.div key={patent.id} variants={itemVariants}>
                                                <Card className="hover:shadow-lg transition-shadow">
                                                    <CardContent className="p-4 flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-medium text-sm">{patent.title}</h4>
                                                            {patent.patentNumber && (
                                                                <p className="text-xs text-muted-foreground mt-1">Patent #{patent.patentNumber}</p>
                                                            )}
                                                        </div>
                                                        {patent.documentUrl && (
                                                            <Button variant="ghost" size="icon" asChild>
                                                                <a href={patent.documentUrl} target="_blank" rel="noopener noreferrer">
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
                            )}

                            {publications.length === 0 && patents.length === 0 && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-muted-foreground text-center py-12"
                                >
                                    No publications available.
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'projects' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="font-heading text-2xl font-bold mb-8">Funded Research Projects</h2>

                            <motion.div 
                                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {fundedProjects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        variants={itemVariants}
                                    >
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="text-base leading-relaxed">{project.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2 text-sm">
                                                    {project.piName && (
                                                        <p><span className="text-muted-foreground">PI:</span> {project.piName}</p>
                                                    )}
                                                    {project.fundingAgency && (
                                                        <p><span className="text-muted-foreground">Funding:</span> {project.fundingAgency}</p>
                                                    )}
                                                    {project.amount && (
                                                        <p><span className="text-muted-foreground">Amount:</span> {project.amount}</p>
                                                    )}
                                                    {project.duration && (
                                                        <p><span className="text-muted-foreground">Duration:</span> {project.duration}</p>
                                                    )}
                                                    {project.status && (
                                                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${project.status === 'Ongoing'
                                                            ? 'bg-accent text-accent-foreground'
                                                            : 'bg-muted text-muted-foreground'
                                                            }`}>
                                                            {project.status}
                                                        </span>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {fundedProjects.length === 0 && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-muted-foreground text-center py-12"
                                >
                                    No funded projects available.
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'phd' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="font-heading text-2xl font-bold mb-8">PhD Program</h2>

                            <div className="mb-12">
                                <h3 className="font-heading text-lg font-semibold mb-6 text-primary">Research Supervisors</h3>
                                <motion.div 
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {supervisors.map((sup) => (
                                        <motion.div key={sup.id} variants={itemVariants}>
                                            <Card className="hover:shadow-lg transition-shadow">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <GraduationCap className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-sm">{sup.name}</h4>
                                                            <p className="text-xs text-muted-foreground">{sup.qualification}</p>
                                                        </div>
                                                    </div>
                                                    {sup.specialization && (
                                                        <p className="text-xs text-muted-foreground mt-3">{sup.specialization}</p>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            <div>
                                <h3 className="font-heading text-lg font-semibold mb-6 text-primary">PhD Students</h3>
                                <motion.div 
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {phdStudents.map((student) => (
                                        <motion.div key={student.id} variants={itemVariants}>
                                            <Card className="hover:shadow-lg transition-shadow">
                                                <CardContent className="p-4">
                                                    <h4 className="font-medium">{student.name}</h4>
                                                    {student.topic && (
                                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{student.topic}</p>
                                                    )}
                                                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${student.status === 'Ongoing'
                                                        ? 'bg-accent text-accent-foreground'
                                                        : 'bg-muted text-muted-foreground'
                                                        }`}>
                                                        {student.status}
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {phdStudents.length === 0 && (
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-muted-foreground text-center py-12"
                                    >
                                        No PhD students listed.
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'collaborations' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="font-heading text-2xl font-bold mb-8">MoUs & Consultancy</h2>

                            {mous.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="font-heading text-lg font-semibold mb-6 text-primary">Memoranda of Understanding</h3>
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {mous.map((mou) => (
                                            <motion.div key={mou.id} variants={itemVariants}>
                                                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                                    {mou.imageUrl && (
                                                        <div className="h-32 bg-muted">
                                                            <img src={mou.imageUrl} alt={mou.organization} className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                    <CardContent className="p-4">
                                                        <h4 className="font-medium">{mou.organization}</h4>
                                                        {mou.description && (
                                                            <p className="text-xs text-muted-foreground mt-1">{mou.description}</p>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            )}

                            {consultancies.length > 0 && (
                                <div>
                                    <h3 className="font-heading text-lg font-semibold mb-6 text-primary">Consultancy Projects</h3>
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {consultancies.map((cons) => (
                                            <motion.div key={cons.id} variants={itemVariants}>
                                                <Card className="hover:shadow-lg transition-shadow">
                                                    <CardContent className="p-4 flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-medium text-sm">{cons.title}</h4>
                                                            {cons.year && (
                                                                <p className="text-xs text-muted-foreground mt-1">Year: {cons.year}</p>
                                                            )}
                                                        </div>
                                                        {cons.documentUrl && (
                                                            <Button variant="ghost" size="icon" asChild>
                                                                <a href={cons.documentUrl} target="_blank" rel="noopener noreferrer">
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            )}

                            {mous.length === 0 && consultancies.length === 0 && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-muted-foreground text-center py-12"
                                >
                                    No collaborations available.
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

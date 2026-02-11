import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link2, Building, FileText, ExternalLink, Globe } from 'lucide-react';
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

export default function Consultancy() {
    const [mous, setMous] = useState([]);
    const [consultancies, setConsultancies] = useState([]);
    const [activeTab, setActiveTab] = useState('mou');
    
    const { mous: contextMous, consultancies: contextConsultancies } = useData();

    useEffect(() => {
        if (contextMous) setMous(contextMous);
        if (contextConsultancies) setConsultancies(contextConsultancies);
    }, [contextMous, contextConsultancies]);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <section className="bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10 py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Link2 className="w-8 h-8 text-teal-600" />
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Consultancy & MoU
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our collaborations and partnerships with industry and academia,
                            fostering knowledge exchange and professional development.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-8 border-b">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center gap-4">
                        <Button
                            variant={activeTab === 'mou' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('mou')}
                            className="gap-2"
                        >
                            <Link2 className="w-4 h-4" />
                            MoUs ({mous.length})
                        </Button>
                        <Button
                            variant={activeTab === 'consultancy' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('consultancy')}
                            className="gap-2"
                        >
                            <Building className="w-4 h-4" />
                            Consultancies ({consultancies.length})
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    {activeTab === 'mou' ? (
                        <motion.div 
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key="mous"
                        >
                            {mous.map((mou) => (
                                <motion.div
                                    key={mou.id}
                                    variants={itemVariants}
                                >
                                    <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                                        {mou.imageUrl && (
                                            <div className="aspect-video bg-muted overflow-hidden">
                                                <img
                                                    src={mou.imageUrl}
                                                    alt={mou.organization}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <Building className="w-6 h-6 text-teal-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-heading font-semibold text-base line-clamp-3">
                                                        {mou.organization}
                                                    </h3>
                                                    {mou.purpose && (
                                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                                            {mou.purpose}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                            {mous.length === 0 && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full text-center py-16"
                                >
                                    <Link2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                                    <h3 className="text-xl font-heading font-semibold text-muted-foreground">
                                        No MoUs available
                                    </h3>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="space-y-4 max-w-4xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key="consultancies"
                        >
                            {consultancies.map((consultancy) => (
                                <motion.div
                                    key={consultancy.id}
                                    variants={slideVariants}
                                >
                                    <Card className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <FileText className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-heading font-semibold">
                                                            {consultancy.title}
                                                        </h3>
                                                        {consultancy.year && (
                                                            <p className="text-sm text-muted-foreground">
                                                                Year: {consultancy.year}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {consultancy.documentUrl && (
                                                    <a
                                                        href={consultancy.documentUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Button variant="outline" size="sm" className="gap-2">
                                                            <FileText className="w-4 h-4" />
                                                            View Details
                                                            <ExternalLink className="w-3 h-3" />
                                                        </Button>
                                                    </a>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                            {consultancies.length === 0 && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <Building className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                                    <h3 className="text-xl font-heading font-semibold text-muted-foreground">
                                        No consultancies available
                                    </h3>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

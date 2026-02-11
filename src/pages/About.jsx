import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Quote, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useData } from '@/hooks/useData';

export default function About() {
    const { 
        department, 
        accreditations, 
        advisoryBoard,
        isLoadingOptional 
    } = useData();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16"
        >
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/30 to-accent/5" />
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                />
                
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                            About Us
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Department of{' '}
                            <span className="text-gradient">Basic Science</span>
                            <br />
                            <span className="text-foreground/80">& Humanities</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Institute of Engineering & Management, Kolkata
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <Card className="p-8 md:p-12 gradient-border bg-card/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="font-heading text-2xl font-bold">About Our Department</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {department?.about}
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-16 bg-secondary/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="h-full border-l-4 border-l-primary gradient-border hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Eye className="w-6 h-6 text-primary" />
                                        </div>
                                        <span className="font-heading text-xl">Our Vision</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {department?.vision}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="h-full border-l-4 border-l-accent gradient-border hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                            <Target className="w-6 h-6 text-accent" />
                                        </div>
                                        <span className="font-heading text-xl">Our Mission</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {department?.mission}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* HOD Message */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                                Leadership
                            </span>
                            <h2 className="font-heading text-4xl font-bold">Message from HOD</h2>
                        </div>

                        <Card className="p-8 md:p-12 gradient-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row gap-8">
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className="flex-shrink-0"
                                >
                                    <div className="w-40 h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden shadow-xl">
                                        <img
                                            src={department?.logoUrl || ''}
                                            alt={department?.hodName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <p className="font-heading font-bold text-lg">{department?.hodName}</p>
                                        <p className="text-sm text-muted-foreground">Head of Department</p>
                                    </div>
                                </motion.div>
                                <div className="flex-1">
                                    <Quote className="w-12 h-12 text-primary/20 mb-4" />
                                    <p className="text-muted-foreground leading-relaxed text-lg italic">
                                        {department?.hodMessage}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Facilities CTA Section - REPLACING Facilities Grid */}
            <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                            <Building2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                            World-Class Facilities
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                            Explore our state-of-the-art infrastructure designed for comprehensive learning, 
                            research, and innovation. From modern laboratories to advanced computing facilities, 
                            we provide everything you need to excel.
                        </p>
                        <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 group"
                            asChild
                        >
                            <Link to="/facilities">
                                Explore All Facilities <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Accreditation */}
            {accreditations?.length > 0 && (
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 gradient-primary opacity-95" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                            >
                                <Award className="w-10 h-10 text-white" />
                            </motion.div>
                            <h2 className="font-heading text-4xl font-bold text-white mb-8">Accreditation</h2>
                            {accreditations.map((accred) => (
                                <div key={accred.id} className="max-w-2xl mx-auto text-white">
                                    <p className="text-3xl font-heading font-bold mb-3">{accred.title}</p>
                                    <p className="text-xl opacity-90 mb-3">Grade: {accred.grade}</p>
                                    <p className="opacity-80">{accred.description}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Advisory Board */}
            {advisoryBoard?.length > 0 && (
                <section className="py-20 bg-secondary/20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                Governance
                            </span>
                            <h2 className="font-heading text-4xl font-bold mb-4">Advisory Board</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Distinguished members guiding our academic excellence
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {advisoryBoard.map((member, index) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card className="p-6 gradient-border hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm h-full">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                                                <Users className="w-7 h-7 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-heading font-bold text-lg">{member.name}</h3>
                                                <p className="text-sm text-muted-foreground">{member.designation}</p>
                                                <p className="text-xs text-primary mt-2 font-medium">{member.organization}</p>
                                                <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                                                    {member.category}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </motion.div>
    );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Users, BookOpen, Award, Calendar,
    ChevronRight, GraduationCap, Target, TrendingUp,
    Newspaper, Building2, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useData } from '@/hooks/useData';

// Counter animation component
function AnimatedCounter({ target, suffix = '' }) {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = parseInt(target) / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseInt(target)) {
                setCount(parseInt(target));
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        
        return () => clearInterval(timer);
    }, [target]);
    
    return <span>{count}{suffix}</span>;
}

export default function Home() {
    const { 
        department, 
        faculty, 
        events, 
        notices, 
        facilities
    } = useData();

    const stats = [
        { icon: Users, label: 'Faculty Members', value: '35', suffix: '+' },
        { icon: GraduationCap, label: 'Years of Excellence', value: '20', suffix: '+' },
        { icon: BookOpen, label: 'Research Publications', value: '500', suffix: '+' },
        { icon: Award, label: 'NAAC Accreditation', value: 'Grade A', suffix: '' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION - PROFESSIONAL NAVY */}
            <section className="relative min-h-screen bg-slate-900 overflow-hidden">
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }} />
                </div>
                
                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center">
                    <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-white"
                        >
                            {/* Badge */}
                            <div className="mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-medium">
                                    <Award className="w-4 h-4" />
                                    Institute of Engineering & Management
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                                Department of
                                <span className="block text-blue-400">Basic Science</span>
                                <span className="block text-slate-400">& Humanities</span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                                {department?.vision?.substring(0, 200)}...
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Button 
                                    size="lg" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold rounded-lg transition-all hover:-translate-y-0.5"
                                    asChild
                                >
                                    <Link to="/about">
                                        Explore Department <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="border-2 border-white text-slate-900 bg-white hover:bg-slate-100 hover:text-slate-900 px-8 py-6 text-base font-semibold rounded-lg transition-all"
                                    asChild
                                >
                                    <Link to="/faculty">Meet Our Faculty</Link>
                                </Button>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-12 flex gap-8">
                                {stats.slice(0, 3).map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-3xl font-bold text-blue-400">
                                            {stat.value}{stat.suffix}
                                        </div>
                                        <div className="text-sm text-slate-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Content - Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="hidden lg:block"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-2xl">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                    Department Highlights
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="text-center p-4 bg-slate-50 rounded-xl">
                                            <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                                                idx % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-700'
                                            }`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {stat.value}{stat.suffix}
                                            </div>
                                            <div className="text-sm text-slate-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm flex flex-col items-center gap-2">
                    <span>SCROLL</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* STATS SECTION - CLEAN BLUE */}
            <section className="py-20 bg-blue-600">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center text-white"
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2">
                                    {stat.value.includes('Grade') ? stat.value : <AnimatedCounter target={stat.value.replace(/\D/g, '')} suffix={stat.suffix} />}
                                </div>
                                <div className="text-blue-100 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT / HOD SECTION - CLEAN WHITE */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                            About Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Welcome to BSH Department
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* HOD Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Card className="h-full overflow-hidden border-l-4 border-l-blue-600 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="w-48 h-56 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={faculty?.[0]?.imageUrl || ''}
                                                alt={department?.hodName || 'HOD'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Target className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                                                    Message from HOD
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                                {department?.hodName}
                                            </h3>
                                            <p className="text-slate-500 font-medium mb-4">
                                                Head of Department
                                            </p>
                                            <p className="text-slate-600 leading-relaxed mb-6">
                                                {department?.hodMessage?.substring(0, 300)}...
                                            </p>
                                            <Button variant="outline" className="group" asChild>
                                                <Link to="/about">
                                                    Read Full Message 
                                                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Side Cards */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="bg-slate-900 text-white border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">NAAC Accredited</h3>
                                        <p className="text-slate-300 text-sm">
                                            Grade A accreditation by National Assessment and Accreditation Council
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                                            <TrendingUp className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Research Excellence</h3>
                                        <p className="text-slate-600 text-sm">
                                            DST SERB funded projects and cutting-edge research initiatives
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FACILITIES SECTION - CLEAN WHITE */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                            Infrastructure
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            World-Class Facilities
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            State-of-the-art infrastructure designed for comprehensive learning and innovation
                        </p>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {facilities?.slice(0, 6).map((facility, index) => (
                            <motion.div
                                key={facility.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                <Card className="h-full border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Building2 className="w-6 h-6 text-slate-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                                    {facility.name}
                                                </h3>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    {facility.description?.substring(0, 120)}...
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Button variant="outline" size="lg" className="group" asChild>
                            <Link to="/facilities">
                                View All Facilities 
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* EVENTS & NOTICES - CLEAN DESIGN */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Events Column */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex justify-between items-end mb-8"
                            >
                                <div>
                                    <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-2">
                                        Campus Life
                                    </span>
                                    <h2 className="text-3xl font-bold text-slate-900">Latest Events</h2>
                                </div>
                                <Button variant="ghost" className="group" asChild>
                                    <Link to="/events">
                                        View All <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </motion.div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {events?.slice(0, 4).map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
                                            <div className="h-48 bg-slate-200 overflow-hidden">
                                                <img
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <CardContent className="p-5">
                                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                                                    {event.category}
                                                </span>
                                                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {event.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                                    <Calendar className="w-4 h-4" />
                                                    {event.date && new Date(event.date).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Notices Column */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-8"
                            >
                                <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-2">
                                    Important Updates
                                </span>
                                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                                    <Newspaper className="w-7 h-7 text-slate-600" /> Notices
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border border-slate-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <ul className="space-y-4">
                                            {notices?.slice(0, 6).map((notice, index) => (
                                                <li key={notice.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                                    <a
                                                        href={notice.documentUrl || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group block"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                                            <div className="flex-1">
                                                                <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                                    {notice.title}
                                                                </p>
                                                                {notice.date && (
                                                                    <p className="text-xs text-slate-500 mt-1">
                                                                        {new Date(notice.date).toLocaleDateString('en-IN', {
                                                                            day: 'numeric',
                                                                            month: 'short',
                                                                            year: 'numeric'
                                                                        })}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 pt-4 border-t border-slate-200">
                                            <Button variant="ghost" className="w-full group" asChild>
                                                <Link to="/notices">
                                                    View All Notices <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FACULTY PREVIEW - CLEAN DESIGN */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                            Our Team
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Distinguished Faculty
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Meet the experts who guide and nurture our students towards excellence
                        </p>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6" />
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {faculty?.slice(0, 4).map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                <Card className="text-center border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                                    <div className="p-6">
                                        <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-blue-200 transition-colors">
                                            <img
                                                src={member.imageUrl}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-blue-600 font-medium">
                                            {member.designation}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 group" asChild>
                            <Link to="/faculty">
                                View All Faculty <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* CTA SECTION - NAVY */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Begin Your Journey?
                        </h2>
                        <p className="text-xl text-slate-300 mb-10">
                            Join the IEM family and be part of a legacy of excellence in engineering education
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8" asChild>
                                <Link to="/contact">Contact Us</Link>
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="border-2 border-white text-slate-900 bg-white hover:bg-slate-100 hover:text-slate-900 px-8"
                                asChild
                            >
                                <a href="https://iem.edu.in" target="_blank" rel="noopener noreferrer">
                                    Visit IEM Website
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

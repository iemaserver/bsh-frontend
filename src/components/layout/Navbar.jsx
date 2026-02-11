import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Faculty', path: '/faculty' },
    {
        label: 'Academics',
        path: '/academics',
        children: [
            { label: 'Syllabus', path: '/academics/syllabus' },
            { label: 'Program Outcomes', path: '/academics/program-outcomes' },
            { label: 'BoS Meetings', path: '/academics/bos-meetings' },
        ]
    },
    {
        label: 'Research',
        path: '/research',
        children: [
            { label: 'Publications', path: '/research/publications' },
            { label: 'Funded Projects', path: '/research/projects' },
            { label: 'PhD Students', path: '/research/phd' },
            { label: 'Consultancy & MoU', path: '/consultancy' },
        ]
    },
    {
        label: 'More',
        path: '#',
        children: [
            { label: 'Events', path: '/events' },
            { label: 'Notices', path: '/notices' },
            { label: 'Journals & Conferences', path: '/journals' },
            { label: 'Clubs & Chapters', path: '/clubs' },
            { label: 'Awards', path: '/awards' },
            { label: 'Photo Gallery', path: '/gallery' },
        ]
    },
    { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setOpenDropdown(null);
    }, [location.pathname]);

    const isActivePath = (path) => {
        if (path === '/') return location.pathname === '/';
        if (path === '#') return false;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200" : "bg-white border-b border-slate-100"
            )}
        >
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                            <GraduationCap className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <span className="font-heading font-bold text-lg text-foreground">IEM BSH</span>
                            <p className="text-xs text-muted-foreground hidden sm:block">Basic Science & Humanities</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <div
                                key={item.path + item.label}
                                className="relative"
                                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {item.path === '#' ? (
                                    <button
                                        className={cn(
                                            "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1",
                                            openDropdown === item.label
                                                ? "text-primary bg-primary/10"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        {item.label}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={cn(
                                            "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1",
                                            isActivePath(item.path)
                                                ? "text-primary bg-primary/10"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        {item.label}
                                        {item.children && <ChevronDown className="w-4 h-4" />}
                                    </Link>
                                )}

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {item.children && openDropdown === item.label && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-0 mt-1 py-2 bg-white border border-slate-200 rounded-lg shadow-xl min-w-[200px] z-50"
                                        >
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.path}
                                                    to={child.path}
                                                    className={cn(
                                                        "block px-4 py-2 text-sm transition-colors",
                                                        isActivePath(child.path)
                                                            ? "text-primary bg-primary/5"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                                    )}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden bg-slate-100 hover:bg-slate-200"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden mt-4 pb-4 bg-white border-t border-slate-100"
                        >
                            <div className="flex flex-col">
                                {navItems.map((item) => (
                                    <React.Fragment key={item.path + item.label}>
                                        {item.path !== '#' ? (
                                            <Link
                                                to={item.path}
                                                className={cn(
                                                    "px-4 py-3 text-sm font-medium transition-colors border-b border-slate-50",
                                                    isActivePath(item.path)
                                                        ? "text-blue-600 bg-blue-50"
                                                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <div className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border-b border-slate-100">
                                                {item.label}
                                            </div>
                                        )}
                                        {item.children && (
                                            <div className="bg-slate-50/50">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        to={child.path}
                                                        className={cn(
                                                            "block px-8 py-2.5 text-sm transition-colors border-b border-slate-100/50",
                                                            isActivePath(child.path)
                                                                ? "text-blue-600 bg-blue-50/50 font-medium"
                                                                : "text-slate-600 hover:text-blue-600 hover:bg-slate-100/50"
                                                        )}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}

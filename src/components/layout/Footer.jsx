import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const footerLinks = {
    quickLinks: [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Faculty', path: '/faculty' },
        { label: 'Notices', path: '/notices' },
        { label: 'Contact', path: '/contact' },
    ],
    academics: [
        { label: 'Syllabus', path: '/academics/syllabus' },
        { label: 'Program Outcomes', path: '/academics/program-outcomes' },
        { label: 'BoS Meetings', path: '/academics/bos-meetings' },
        { label: 'Journals', path: '/journals' },
    ],
    research: [
        { label: 'Publications', path: '/research/publications' },
        { label: 'Funded Projects', path: '/research/projects' },
        { label: 'PhD Program', path: '/research/phd' },
        { label: 'Consultancy', path: '/consultancy' },
    ],
    more: [
        { label: 'Events', path: '/events' },
        { label: 'Clubs & Chapters', path: '/clubs' },
        { label: 'Awards', path: '/awards' },
        { label: 'Photo Gallery', path: '/gallery' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <span className="font-heading font-bold text-lg">IEM BSH</span>
                                <p className="text-xs opacity-80">Basic Science & Humanities</p>
                            </div>
                        </div>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Department of Basic Science and Humanities at Institute of Engineering & Management,
                            Kolkata. Excellence in education, research, and innovation.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.facebook.com/profile.php?id=100063981480158"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCXnZ_fE64K5vFEjfYl52v1A"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Academics */}
                    <div>
                        <h3 className="font-heading font-semibold text-lg mb-4">Academics</h3>
                        <ul className="space-y-2">
                            {footerLinks.academics.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h3 className="font-heading font-semibold text-lg mb-4 mt-6">Research</h3>
                        <ul className="space-y-2">
                            {footerLinks.research.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More */}
                    <div>
                        <h3 className="font-heading font-semibold text-lg mb-4">Explore</h3>
                        <ul className="space-y-2">
                            {footerLinks.more.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-0.5 opacity-80" />
                                <span className="text-sm opacity-80">
                                    Y-12, Block EP, Sector V, Salt Lake City, Kolkata, West Bengal 700091
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 opacity-80" />
                                <span className="text-sm opacity-80">+91-33-2357-9030</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 opacity-80" />
                                <span className="text-sm opacity-80">info@iem.edu.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm opacity-60">
                        © {new Date().getFullYear()} IEM BSH. All rights reserved.
                    </p>
                    <p className="text-sm opacity-60">
                        Institute of Engineering & Management, Kolkata
                    </p>
                </div>
            </div>
        </footer>
    );
}

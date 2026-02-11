import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

// Helper to get display-ready image path
const getImagePath = (imageUrl) => {
    if (!imageUrl) return '/placeholder-avatar.png';
    if (imageUrl.startsWith('/') || imageUrl.startsWith('http')) return imageUrl;
    return `/${imageUrl}`;
};

export default function Faculty() {
    const { faculty: facultyData } = useData();
    const [faculty, setFaculty] = useState([]);
    const [filteredFaculty, setFilteredFaculty] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Set faculty data from context when available
    useEffect(() => {
        if (facultyData) {
            setFaculty(facultyData);
            setFilteredFaculty(facultyData);
        }
    }, [facultyData]);

    // Filter faculty based on search
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredFaculty(faculty);
        } else {
            const filtered = faculty.filter(
                (member) =>
                    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    member.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    member.researchArea?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFaculty(filtered);
        }
    }, [searchQuery, faculty]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16"
        >
            {/* Header */}
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
                        className="text-center mb-10"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                            Our Team
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Meet Our <span className="text-gradient">Faculty</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Distinguished educators bringing expertise, dedication, and passion to shape the future
                        </p>
                    </motion.div>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-lg mx-auto"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by name, designation, or research area..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-lg"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Faculty Grid */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <p className="text-sm text-muted-foreground mb-8">
                        Showing {filteredFaculty.length} of {faculty.length} faculty members
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredFaculty.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                            >
                                <Card className="h-full group gradient-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden bg-card/50 backdrop-blur-sm">
                                    <div className="p-6">
                                        <motion.div 
                                            whileHover={{ scale: 1.05 }}
                                            className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-5 border-4 border-secondary group-hover:border-primary/30 transition-colors shadow-xl"
                                        >
                                            <img
                                                src={getImagePath(member.imageUrl)}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                        <div className="text-center">
                                            <h3 className="font-heading font-bold text-foreground text-lg line-clamp-2 group-hover:text-primary transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-accent font-medium mt-2">
                                                {member.designation}
                                            </p>
                                            {member.qualification && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {member.qualification}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <CardContent className="pt-0 pb-6">
                                        {member.experience && (
                                            <p className="text-xs text-muted-foreground text-center mb-4">
                                                <span className="font-medium text-foreground">Experience:</span> {member.experience}
                                            </p>
                                        )}

                                        {member.researchArea && (
                                            <div className="mb-4">
                                                <p className="text-xs font-medium text-foreground mb-1.5">Research Area:</p>
                                                <p className="text-xs text-muted-foreground line-clamp-3">
                                                    {member.researchArea}
                                                </p>
                                            </div>
                                        )}

                                        {member.email && (
                                            <Button variant="outline" size="sm" className="w-full group/btn" asChild>
                                                <a href={`mailto:${member.email}`}>
                                                    <Mail className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                                    Contact
                                                </a>
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {filteredFaculty.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <p className="text-muted-foreground text-lg">No faculty members found matching your search.</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </motion.div>
    );
}

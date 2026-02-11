import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useData } from '@/hooks/useData';
import {
    Monitor,
    BookOpen,
    Atom,
    FlaskConical,
    Languages,
    Laptop,
    Trophy,
    Dumbbell,
    Lightbulb,
    PenTool,
    Zap,
    Wrench,
    Building2,
    Image,
    X,
    ChevronLeft,
    ChevronRight,
    Sparkles
} from 'lucide-react';

const iconMap = {
    Monitor, BookOpen, Atom, FlaskConical, Languages, Laptop, Trophy, Dumbbell, Lightbulb, PenTool, Zap, Wrench
};

// Helper to get icon component
const getIcon = (iconName) => {
    return iconMap[iconName] || Building2;
};

export default function Facilities() {
    const { facilities: facilitiesData } = useData();
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Set facilities data from context when available
    useEffect(() => {
        if (facilitiesData) {
            setFacilities(facilitiesData);
        }
    }, [facilitiesData]);

    // Helper to get images array - handles both imageUrl and image_url from API
    const getImages = (facility) => {
        const imageField = facility.imageUrl || facility.image_url || '';
        if (!imageField) return [];
        return imageField.split(',').filter(Boolean);
    };

    const openGallery = (facility) => {
        setSelectedFacility(facility);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = () => {
        setSelectedFacility(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (!selectedFacility) return;
        const images = getImages(selectedFacility);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (!selectedFacility) return;
        const images = getImages(selectedFacility);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Keyboard navigation for gallery
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedFacility) return;
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') nextImage(e);
            if (e.key === 'ArrowLeft') prevImage(e);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedFacility]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16"
        >
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-violet-500/5" />
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
                />
                
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20"
                        >
                            <Building2 className="w-10 h-10 text-white" />
                        </motion.div>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Our <span className="text-gradient">Facilities</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            World-class infrastructure designed to foster innovation, learning, and holistic development.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Facilities Grid */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((facility, index) => {
                            const Icon = getIcon(facility.icon);
                            const images = getImages(facility);
                            const hasImages = images.length > 0;

                            return (
                                <motion.div
                                    key={facility.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <Card className="h-full flex flex-col gradient-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden group bg-card/50 backdrop-blur-sm">
                                        {/* Image Preview (if available) */}
                                        {hasImages && (
                                            <div
                                                className="h-52 overflow-hidden relative cursor-pointer"
                                                onClick={() => openGallery(facility)}
                                            >
                                                <img
                                                    src={images[0]}
                                                    alt={facility.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white/30">
                                                        <Image className="w-4 h-4" />
                                                        View Gallery ({images.length})
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {!hasImages && (
                                            <div className="h-52 bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                                                <Icon className="w-20 h-20 text-muted-foreground/30" />
                                            </div>
                                        )}

                                        <CardContent className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">{facility.name}</h3>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed flex-1">
                                                {facility.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>

                    {facilities.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <Sparkles className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                            <p className="text-muted-foreground text-lg">No facilities available at the moment.</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Gallery Lightbox */}
            <AnimatePresence>
                {selectedFacility && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
                        onClick={closeGallery}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
                            onClick={closeGallery}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {getImages(selectedFacility).length > 1 && (
                            <>
                                <button
                                    className="absolute left-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    className="absolute right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        <motion.div
                            key={`${selectedFacility.id}-${currentImageIndex}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-[90vw] max-h-[85vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={getImages(selectedFacility)[currentImageIndex]}
                                alt={selectedFacility.name}
                                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white rounded-b-2xl">
                                <h3 className="font-heading font-bold text-xl mb-1">{selectedFacility.name}</h3>
                                <p className="text-sm text-white/70">
                                    Image {currentImageIndex + 1} of {getImages(selectedFacility).length}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

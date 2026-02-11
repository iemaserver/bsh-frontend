import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Calendar, X, ChevronLeft, ChevronRight, Grid, LayoutGrid } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.03 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
};

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const { gallery: contextGallery } = useData();

    useEffect(() => {
        if (contextGallery) setImages(contextGallery);
    }, [contextGallery]);

    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, currentIndex]);

    const categories = [...new Set(images.map(img => img.category).filter(Boolean))];

    return (
        <div className="min-h-screen pt-24 pb-16">
            <section className="bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-red-500/10 py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Image className="w-8 h-8 text-pink-600" />
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Photo Gallery
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore moments from events, celebrations, and activities at the
                            Department of Basic Science and Humanities.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    {images.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <Image className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-xl font-heading font-semibold text-muted-foreground">
                                No images available
                            </h3>
                            <p className="text-muted-foreground mt-2">
                                Check back later for photos from departmental events.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    variants={itemVariants}
                                    className="group cursor-pointer"
                                    onClick={() => openLightbox(image, index)}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card className="overflow-hidden aspect-square">
                                        <div className="relative w-full h-full">
                                            <img
                                                src={image.imageUrl}
                                                alt={image.title || 'Gallery image'}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                                                    <LayoutGrid className="w-8 h-8 mx-auto mb-2" />
                                                    <p className="text-sm font-medium line-clamp-2">
                                                        {image.title || 'View Image'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-50"
                            onClick={closeLightbox}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute left-4 text-white/80 hover:text-white p-2 z-50"
                            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>
                        <button
                            className="absolute right-4 text-white/80 hover:text-white p-2 z-50"
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        <motion.div
                            key={selectedImage.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-[90vw] max-h-[85vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title || 'Gallery image'}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                            />
                            {(selectedImage.title || selectedImage.date) && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
                                    {selectedImage.title && (
                                        <h3 className="font-heading font-semibold text-lg">
                                            {selectedImage.title}
                                        </h3>
                                    )}
                                    {selectedImage.date && (
                                        <p className="text-sm text-white/70 flex items-center gap-2 mt-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(selectedImage.date).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    )}
                                </div>
                            )}
                        </motion.div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

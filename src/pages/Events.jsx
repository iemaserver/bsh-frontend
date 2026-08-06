import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter, Sparkles, CalendarClock, X, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';
import { DISTINGUISHED_LECTURES_FALLBACK } from '@/data/distinguishedLecturesData';

const categories = ['All', 'Distinguished Lecture', 'Class', 'Olympiad', 'Workshop', 'Celebration', 'Competition', 'Social', 'Talk', 'Fest'];

export default function Events() {
    const { events: eventsData } = useData();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'upcoming'

    // Set events data from context when available; fall back to the
    // hardcoded Distinguished Lecture list if the database has no events yet
    useEffect(() => {
        const list = (eventsData && eventsData.length > 0) ? eventsData : DISTINGUISHED_LECTURES_FALLBACK;
        setEvents(list);
        setFilteredEvents(list);
    }, [eventsData]);

    // Filter events based on category and upcoming/all toggle
    useEffect(() => {
        let base = selectedCategory === 'All' ? events : events.filter((e) => e.category === selectedCategory);

        if (timeFilter === 'upcoming') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            base = base.filter((e) => e.date && new Date(e.date) >= today);
            // Soonest first for upcoming events
            base = base.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            // Newest first for all/past events
            base = base.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        }

        setFilteredEvents(base);
    }, [selectedCategory, timeFilter, events]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16"
        >
            {/* Header */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-secondary/30 to-primary/5" />
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
                />
                
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                            Campus Life
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Events & <span className="text-gradient">Activities</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Explore our vibrant academic events, olympiads, workshops, and celebrations
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Time Tabs */}
            <section className="py-6 border-b border-border/50">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-3">
                        <Button
                            variant={timeFilter === 'all' ? 'default' : 'outline'}
                            onClick={() => setTimeFilter('all')}
                            className={`gap-2 ${timeFilter === 'all' ? 'bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/20' : ''}`}
                        >
                            <Calendar className="w-4 h-4" />
                            All Events
                        </Button>
                        <Button
                            variant={timeFilter === 'upcoming' ? 'default' : 'outline'}
                            onClick={() => setTimeFilter('upcoming')}
                            className={`gap-2 ${timeFilter === 'upcoming' ? 'bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/20' : ''}`}
                        >
                            <CalendarClock className="w-4 h-4" />
                            Upcoming Events
                        </Button>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="py-6 border-b border-border/50 sticky top-16 bg-background/95 backdrop-blur z-40">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={`flex-shrink-0 transition-all duration-300 ${
                                    selectedCategory === category 
                                        ? 'bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/20' 
                                        : 'hover:border-primary/50'
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <p className="text-sm text-muted-foreground mb-8">
                        Showing {filteredEvents.length} events
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                            >
                                <Card
                                    className="overflow-hidden h-full group gradient-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 bg-card/50 backdrop-blur-sm cursor-pointer"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <div className="h-56 bg-muted overflow-hidden relative">
                                        {event.imageUrl ? (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center hero-gradient-violet">
                                                <Calendar className="w-12 h-12 text-white/70" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                        <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold bg-accent text-accent-foreground rounded-full shadow-lg">
                                            {event.category}
                                        </span>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors line-clamp-2 mb-3">
                                            {event.title}
                                        </h3>
                                        {event.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                {event.description}
                                            </p>
                                        )}
                                        {event.date && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-2 rounded-lg">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                {new Date(event.date).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                                            className="text-xs text-primary hover:underline mt-3 inline-block"
                                        >
                                            Read More →
                                        </button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {filteredEvents.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <Sparkles className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-muted-foreground text-lg">
                                {timeFilter === 'upcoming'
                                    ? 'No upcoming events scheduled right now — check back soon!'
                                    : 'No events found in this category.'}
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Event Detail Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                {selectedEvent.imageUrl ? (
                                    <img
                                        src={selectedEvent.imageUrl}
                                        alt={selectedEvent.title}
                                        className="w-full max-h-96 object-contain bg-black/5"
                                    />
                                ) : (
                                    <div className="w-full h-48 flex items-center justify-center hero-gradient-violet">
                                        <Calendar className="w-12 h-12 text-white/70" />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold bg-accent text-accent-foreground rounded-full shadow-lg">
                                    {selectedEvent.category}
                                </span>
                            </div>
                            <div className="p-6 md:p-8">
                                <h3 className="font-heading font-bold text-2xl mb-3">{selectedEvent.title}</h3>
                                {selectedEvent.date && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-2 rounded-lg w-fit mb-4">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        {new Date(selectedEvent.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </div>
                                )}
                                {selectedEvent.description && (
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {selectedEvent.description}
                                    </p>
                                )}
                                {selectedEvent.linkUrl && (
                                    <a
                                        href={selectedEvent.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-primary hover:underline mt-6 font-medium"
                                    >
                                        View Full Flyer <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Youtube, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';
import api from '@/lib/api';

export default function Contact() {
    const [contactInfo, setContactInfo] = useState(null);
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    
    const { contact: contextContact } = useData();

    useEffect(() => {
        if (contextContact) setContactInfo(contextContact);
    }, [contextContact]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await api.post('/contact-requests', formData);
            setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus({ type: 'error', message: error.response?.data?.error || 'Failed to send message. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            Contact Us
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Get in touch with the Department of Basic Science & Humanities
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="font-heading text-2xl font-bold mb-6">Get in Touch</h2>

                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Address</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {contactInfo?.address || 'Y-12, Block EP, Sector V, Salt Lake City, Kolkata, West Bengal 700091'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Phone</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {contactInfo?.phone || '+91-33-2357-9030'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Email</h3>
                                        <a href={`mailto:${contactInfo?.email || 'info@iem.edu.in'}`} className="text-sm text-primary hover:underline">
                                            {contactInfo?.email || 'info@iem.edu.in'}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-4 pt-4">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100063981480158"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
                                >
                                    <Facebook className="w-5 h-5 text-primary-foreground" />
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCXnZ_fE64K5vFEjfYl52v1A"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
                                >
                                    <Youtube className="w-5 h-5 text-primary-foreground" />
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>Send us a Message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {submitStatus && (
                                            <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                <div className="flex items-center gap-2">
                                                    {submitStatus.type === 'success' ? (
                                                        <CheckCircle className="w-5 h-5" />
                                                    ) : (
                                                        <span className="text-red-500">✕</span>
                                                    )}
                                                    <p className="text-sm font-medium">{submitStatus.message}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Name *</label>
                                            <input
                                                type="text"
                                                required
                                                disabled={isSubmitting}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Email *</label>
                                            <input
                                                type="email"
                                                required
                                                disabled={isSubmitting}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Subject</label>
                                            <input
                                                type="text"
                                                disabled={isSubmitting}
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                                                placeholder="Subject of your message"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Message *</label>
                                            <textarea
                                                required
                                                rows={5}
                                                disabled={isSubmitting}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none disabled:opacity-50"
                                                placeholder="Your message..."
                                            />
                                        </div>
                                        <Button 
                                            type="submit" 
                                            className="w-full" 
                                            size="lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 max-w-6xl mx-auto"
                    >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1984567890123!2d88.4317!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b020703c0d%3A0xece6f8e0fc2e1613!2sInstitute%20of%20Engineering%20%26%20Management!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="IEM Location"
                            />
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-node-roan.vercel.app/api';

const WebsitePopup = () => {
    const [popup, setPopup] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const fetchActivePopup = async () => {
            try {
                // Check if popup was already dismissed in this session
                const dismissedPopups = JSON.parse(sessionStorage.getItem('dismissedPopups') || '[]');

                const response = await axios.get(`${API_BASE_URL}/popup/active`);
                const activePopup = response.data;

                if (activePopup && !dismissedPopups.includes(activePopup.id)) {
                    setPopup(activePopup);
                    // Small delay before showing popup for better UX
                    setTimeout(() => setIsVisible(true), 1500);
                }
            } catch (error) {
                // Silently fail - popup is optional
                console.log('No active popup or error fetching');
            }
        };

        fetchActivePopup();
    }, []);

    useEffect(() => {
        if (popup?.autoClose && popup.autoClose > 0 && isVisible) {
            const timer = setTimeout(() => {
                handleClose();
            }, popup.autoClose * 1000);

            return () => clearTimeout(timer);
        }
    }, [popup, isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        if (popup) {
            const dismissedPopups = JSON.parse(sessionStorage.getItem('dismissedPopups') || '[]');
            dismissedPopups.push(popup.id);
            sessionStorage.setItem('dismissedPopups', JSON.stringify(dismissedPopups));
        }
        setTimeout(() => setDismissed(true), 300);
    };

    const getPositionClasses = () => {
        switch (popup?.position) {
            case 'top':
                return 'items-start pt-20';
            case 'bottom':
                return 'items-end pb-20';
            case 'bottom-right':
                return 'items-end justify-end p-6';
            case 'bottom-left':
                return 'items-end justify-start p-6';
            default:
                return 'items-center justify-center';
        }
    };

    const getPopupClasses = () => {
        switch (popup?.position) {
            case 'bottom-right':
            case 'bottom-left':
                return 'max-w-sm';
            default:
                return 'max-w-lg';
        }
    };

    if (dismissed || !popup) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed inset-0 z-[9999] flex ${getPositionClasses()}`}
                >
                    {/* Backdrop */}
                    {(popup.position === 'center' || !popup.position) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={popup.showCloseButton ? handleClose : undefined}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                    )}

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`relative ${getPopupClasses()} w-full rounded-2xl shadow-2xl overflow-hidden`}
                        style={{ backgroundColor: popup.backgroundColor || '#0f172a' }}
                    >
                        {/* Close Button */}
                        {popup.showCloseButton && (
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors z-10"
                                style={{ color: popup.textColor || '#ffffff' }}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}

                        {/* Image */}
                        {popup.imageUrl && (
                            <div className="relative">
                                <img
                                    src={popup.imageUrl}
                                    alt={popup.title}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => e.target.parentElement.style.display = 'none'}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8" style={{ color: popup.textColor || '#ffffff' }}>
                            <h2 className="font-heading font-bold text-2xl mb-3">
                                {popup.title}
                            </h2>
                            <p className="opacity-85 leading-relaxed mb-6 whitespace-pre-line">
                                {popup.content}
                            </p>

                            {/* Button */}
                            {popup.buttonText && (
                                <div className="flex gap-3">
                                    {popup.buttonUrl ? (
                                        <a
                                            href={popup.buttonUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
                                            style={{ backgroundColor: popup.buttonColor || '#14b8a6' }}
                                        >
                                            {popup.buttonText}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={handleClose}
                                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
                                            style={{ backgroundColor: popup.buttonColor || '#14b8a6' }}
                                        >
                                            {popup.buttonText}
                                        </button>
                                    )}
                                    {popup.showCloseButton && (
                                        <button
                                            onClick={handleClose}
                                            className="px-6 py-3 rounded-xl font-medium border border-current opacity-60 hover:opacity-100 transition-opacity"
                                        >
                                            Maybe Later
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Auto-close indicator */}
                        {popup.autoClose && popup.autoClose > 0 && (
                            <motion.div
                                initial={{ scaleX: 1 }}
                                animate={{ scaleX: 0 }}
                                transition={{ duration: popup.autoClose, ease: "linear" }}
                                className="absolute bottom-0 left-0 right-0 h-1 origin-left"
                                style={{ backgroundColor: popup.buttonColor || '#14b8a6' }}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WebsitePopup;

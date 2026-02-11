import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Megaphone,
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    AlertTriangle,
    Eye,
    EyeOff,
    RefreshCw,
    Palette,
    Type,
    Image,
    Link,
    ToggleLeft,
    ToggleRight,
    Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { popupApi, uploadApi } from '@/lib/adminApi';

const PopupManager = () => {
    const [popups, setPopups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingPopup, setEditingPopup] = useState(null);
    const [popupToDelete, setPopupToDelete] = useState(null);
    const [saving, setSaving] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        buttonText: 'Learn More',
        buttonUrl: '',
        imageUrl: '',
        backgroundColor: '#0f172a',
        textColor: '#ffffff',
        buttonColor: '#14b8a6',
        position: 'center',
        showCloseButton: true,
        autoClose: 0,
        isActive: false,
        startDate: '',
        endDate: '',
    });

    const fetchPopups = async () => {
        setLoading(true);
        try {
            const response = await popupApi.getAll();
            setPopups(response.data || []);
        } catch (error) {
            toast.error('Failed to fetch popups');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopups();
    }, []);

    const handleAdd = () => {
        setEditingPopup(null);
        setFormData({
            title: '',
            content: '',
            buttonText: 'Learn More',
            buttonUrl: '',
            imageUrl: '',
            backgroundColor: '#0f172a',
            textColor: '#ffffff',
            buttonColor: '#14b8a6',
            position: 'center',
            showCloseButton: true,
            autoClose: 0,
            isActive: false,
            startDate: '',
            endDate: '',
        });
        setIsModalOpen(true);
    };

    const handleEdit = (popup) => {
        setEditingPopup(popup);
        setFormData({
            title: popup.title || '',
            content: popup.content || '',
            buttonText: popup.buttonText || 'Learn More',
            buttonUrl: popup.buttonUrl || '',
            imageUrl: popup.imageUrl || '',
            backgroundColor: popup.backgroundColor || '#0f172a',
            textColor: popup.textColor || '#ffffff',
            buttonColor: popup.buttonColor || '#14b8a6',
            position: popup.position || 'center',
            showCloseButton: popup.showCloseButton ?? true,
            autoClose: popup.autoClose || 0,
            isActive: popup.isActive || false,
            startDate: popup.startDate ? new Date(popup.startDate).toISOString().split('T')[0] : '',
            endDate: popup.endDate ? new Date(popup.endDate).toISOString().split('T')[0] : '',
        });
        setIsModalOpen(true);
    };

    const handleDelete = (popup) => {
        setPopupToDelete(popup);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!popupToDelete) return;

        try {
            await popupApi.delete(popupToDelete.id);
            toast.success('Popup deleted successfully');
            fetchPopups();
        } catch (error) {
            toast.error('Failed to delete popup');
            console.error(error);
        } finally {
            setIsDeleteModalOpen(false);
            setPopupToDelete(null);
        }
    };

    const handleToggleActive = async (popup) => {
        try {
            if (popup.isActive) {
                await popupApi.deactivate(popup.id);
                toast.success('Popup deactivated');
            } else {
                await popupApi.activate(popup.id);
                toast.success('Popup activated');
            }
            fetchPopups();
        } catch (error) {
            toast.error('Failed to toggle popup');
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const submitData = {
                ...formData,
                autoClose: parseInt(formData.autoClose) || 0,
                startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
            };

            if (editingPopup) {
                await popupApi.update(editingPopup.id, submitData);
                toast.success('Popup updated successfully');
            } else {
                await popupApi.create(submitData);
                toast.success('Popup created successfully');
            }

            setIsModalOpen(false);
            fetchPopups();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Operation failed');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <Megaphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-white">Popup Manager</h1>
                        <p className="text-slate-400 text-sm">Create and manage website popups</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={fetchPopups}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                    <Button
                        onClick={handleAdd}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Popup
                    </Button>
                </div>
            </div>

            {/* Info Card */}
            <Card className="bg-amber-500/10 border-amber-500/30">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <Megaphone className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div>
                            <p className="text-amber-200 font-medium">How Popups Work</p>
                            <p className="text-amber-200/70 text-sm mt-1">
                                Create custom popups to display important announcements, promotions, or notices to website visitors.
                                Only one popup can be active at a time. Popups can be scheduled with start and end dates.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Popups Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className="bg-slate-800/50 border-slate-700/50">
                            <CardContent className="p-6">
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-6 bg-slate-700 rounded w-3/4" />
                                    <div className="h-20 bg-slate-700 rounded" />
                                    <div className="h-8 bg-slate-700 rounded w-1/2" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : popups.length === 0 ? (
                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardContent className="py-16 text-center">
                        <Megaphone className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-heading font-semibold text-white mb-2">No Popups Yet</h3>
                        <p className="text-slate-400 mb-6">Create your first popup to engage website visitors</p>
                        <Button
                            onClick={handleAdd}
                            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Your First Popup
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popups.map((popup) => (
                        <motion.div
                            key={popup.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className={`bg-slate-800/50 border-slate-700/50 overflow-hidden ${popup.isActive ? 'ring-2 ring-green-500/50' : ''
                                }`}>
                                {/* Preview */}
                                <div
                                    className="p-6 min-h-[120px] relative"
                                    style={{
                                        backgroundColor: popup.backgroundColor || '#0f172a',
                                        color: popup.textColor || '#ffffff'
                                    }}
                                >
                                    {popup.isActive && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                            LIVE
                                        </div>
                                    )}
                                    <h3 className="font-heading font-bold text-lg mb-2">{popup.title || 'Untitled Popup'}</h3>
                                    <p className="text-sm opacity-80 line-clamp-2">{popup.content || 'No content'}</p>
                                    {popup.buttonText && (
                                        <button
                                            className="mt-3 px-4 py-1.5 rounded-lg text-sm font-medium"
                                            style={{ backgroundColor: popup.buttonColor || '#14b8a6' }}
                                        >
                                            {popup.buttonText}
                                        </button>
                                    )}
                                </div>

                                {/* Actions */}
                                <CardContent className="p-4 bg-slate-800/80">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-slate-400">
                                            Position: {popup.position || 'center'}
                                        </span>
                                        <button
                                            onClick={() => handleToggleActive(popup)}
                                            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${popup.isActive
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-slate-700 text-slate-400'
                                                }`}
                                        >
                                            {popup.isActive ? (
                                                <>
                                                    <ToggleRight className="w-4 h-4" />
                                                    Active
                                                </>
                                            ) : (
                                                <>
                                                    <ToggleLeft className="w-4 h-4" />
                                                    Inactive
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(popup)}
                                            className="flex-1 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10"
                                        >
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(popup)}
                                            className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/60 z-50"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                            className="fixed left-1/2 top-1/2 w-full max-w-4xl z-50"
                        >
                            <Card className="bg-slate-800 border-slate-700 max-h-[90vh] flex flex-col p-4">
                                <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
                                    <CardTitle className="text-white">
                                        {editingPopup ? 'Edit Popup' : 'Create New Popup'}
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setPreviewMode(!previewMode)}
                                            className="text-slate-400 hover:text-white"
                                        >
                                            {previewMode ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                                            {previewMode ? 'Hide' : 'Preview'}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-slate-400 hover:text-white"
                                        >
                                            <X className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="overflow-y-auto flex-1">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    <Type className="w-4 h-4 inline mr-1" />
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => handleChange('title', e.target.value)}
                                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    placeholder="Popup title..."
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Content
                                                </label>
                                                <textarea
                                                    value={formData.content}
                                                    onChange={(e) => handleChange('content', e.target.value)}
                                                    rows={4}
                                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                                    placeholder="Popup message..."
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        Button Text
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.buttonText}
                                                        onChange={(e) => handleChange('buttonText', e.target.value)}
                                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        placeholder="Learn More"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        <Link className="w-4 h-4 inline mr-1" />
                                                        Button URL
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={formData.buttonUrl}
                                                        onChange={(e) => handleChange('buttonUrl', e.target.value)}
                                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    <Image className="w-4 h-4 inline mr-1" />
                                                    Image (optional)
                                                </label>
                                                <div className="space-y-3">
                                                    {formData.imageUrl && (
                                                        <div className="relative w-full h-40 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-600 flex items-center justify-center">
                                                            <img
                                                                src={formData.imageUrl.startsWith('http') ? formData.imageUrl : `/${formData.imageUrl.replace(/^(\/|puppeteer_assets\/)?/, 'puppeteer_assets/').replace(/\/+/g, '/')}`}
                                                                alt="Popup Preview"
                                                                className="h-full w-full object-contain"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleChange('imageUrl', '')}
                                                                className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="file"
                                                            id="file-popup-image"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={async (e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    const toastId = toast.loading('Uploading image...');
                                                                    try {
                                                                        const res = await uploadApi.uploadImage(file);
                                                                        handleChange('imageUrl', res.data.url);
                                                                        toast.dismiss(toastId);
                                                                        toast.success('Image uploaded successfully');
                                                                    } catch (err) {
                                                                        toast.dismiss(toastId);
                                                                        toast.error('Upload failed');
                                                                        console.error(err);
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="file-popup-image"
                                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors w-full border border-slate-600 border-dashed hover:border-solid hover:border-teal-500"
                                                        >
                                                            <Upload className="w-4 h-4" />
                                                            {formData.imageUrl ? 'Change Image' : 'Upload Image'}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    <Palette className="w-4 h-4 inline mr-1" />
                                                    Colors
                                                </label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="text-xs text-slate-400">Background</label>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <input
                                                                type="color"
                                                                value={formData.backgroundColor}
                                                                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                                                                className="w-14 h-10 rounded cursor-pointer flex-shrink-0"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={formData.backgroundColor}
                                                                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                                                                className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-slate-400">Text</label>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <input
                                                                type="color"
                                                                value={formData.textColor}
                                                                onChange={(e) => handleChange('textColor', e.target.value)}
                                                                className="w-14 h-10 rounded cursor-pointer flex-shrink-0"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={formData.textColor}
                                                                onChange={(e) => handleChange('textColor', e.target.value)}
                                                                className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-slate-400">Button</label>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <input
                                                                type="color"
                                                                value={formData.buttonColor}
                                                                onChange={(e) => handleChange('buttonColor', e.target.value)}
                                                                className="w-14 h-10 rounded cursor-pointer flex-shrink-0"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={formData.buttonColor}
                                                                onChange={(e) => handleChange('buttonColor', e.target.value)}
                                                                className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        Position
                                                    </label>
                                                    <select
                                                        value={formData.position}
                                                        onChange={(e) => handleChange('position', e.target.value)}
                                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    >
                                                        <option value="center">Center</option>
                                                        <option value="top">Top</option>
                                                        <option value="bottom">Bottom</option>
                                                        <option value="bottom-right">Bottom Right</option>
                                                        <option value="bottom-left">Bottom Left</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        Auto Close (seconds)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={formData.autoClose}
                                                        onChange={(e) => handleChange('autoClose', e.target.value)}
                                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        placeholder="0 = no auto close"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        Start Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={formData.startDate}
                                                        onChange={(e) => handleChange('startDate', e.target.value)}
                                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        End Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={formData.endDate}
                                                        onChange={(e) => handleChange('endDate', e.target.value)}
                                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.showCloseButton}
                                                        onChange={(e) => handleChange('showCloseButton', e.target.checked)}
                                                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500"
                                                    />
                                                    <span className="text-sm text-slate-300">Show Close Button</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.isActive}
                                                        onChange={(e) => handleChange('isActive', e.target.checked)}
                                                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500"
                                                    />
                                                    <span className="text-sm text-slate-300">Activate Immediately</span>
                                                </label>
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => setIsModalOpen(false)}
                                                    className="text-slate-400 hover:text-white"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={saving}
                                                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                                                >
                                                    {saving ? (
                                                        <>
                                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="w-4 h-4 mr-2" />
                                                            {editingPopup ? 'Update' : 'Create'} Popup
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>                                        {/* Live Preview */}
                                        <div className="hidden lg:block">
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Live Preview
                                            </label>
                                            <div className="bg-slate-900/50 rounded-lg p-4 min-h-[400px] flex items-center justify-center relative">
                                                <div className="absolute inset-0 bg-black/40 rounded-lg" />
                                                <div
                                                    className="relative z-10 max-w-sm w-full rounded-2xl shadow-2xl overflow-hidden"
                                                    style={{ backgroundColor: formData.backgroundColor }}
                                                >
                                                    {formData.showCloseButton && (
                                                        <button
                                                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center"
                                                            style={{ color: formData.textColor }}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {formData.imageUrl && (
                                                        <img
                                                            src={formData.imageUrl}
                                                            alt="Popup"
                                                            className="w-full h-40 object-cover"
                                                            onError={(e) => e.target.style.display = 'none'}
                                                        />
                                                    )}
                                                    <div className="p-6" style={{ color: formData.textColor }}>
                                                        <h3 className="font-heading font-bold text-xl mb-2">
                                                            {formData.title || 'Your Title Here'}
                                                        </h3>
                                                        <p className="opacity-80 text-sm mb-4">
                                                            {formData.content || 'Your popup content will appear here...'}
                                                        </p>
                                                        {formData.buttonText && (
                                                            <button
                                                                className="px-6 py-2.5 rounded-lg font-medium text-white"
                                                                style={{ backgroundColor: formData.buttonColor }}
                                                            >
                                                                {formData.buttonText}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="fixed inset-0 bg-black/60 z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                            className="fixed left-1/2 top-1/2 w-full max-w-md z-50"
                        >
                            <Card className="bg-slate-800 border-slate-700 p-4">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <AlertTriangle className="w-8 h-8 text-red-400" />
                                        </div>
                                        <h3 className="text-xl font-heading font-semibold text-white mb-2">
                                            Delete Popup?
                                        </h3>
                                        <p className="text-slate-400 mb-6">
                                            Are you sure you want to delete "{popupToDelete?.title}"? This action cannot be undone.
                                        </p>
                                        <div className="flex gap-3 justify-center">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setIsDeleteModalOpen(false)}
                                                className="text-slate-400 hover:text-white"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={confirmDelete}
                                                className="bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PopupManager;

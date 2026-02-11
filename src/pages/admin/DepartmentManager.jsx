import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Save, RefreshCw, Upload, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { departmentApi, uploadApi } from '@/lib/adminApi';

const DepartmentManager = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({});

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await departmentApi.get();
            setData(response.data);
            setFormData(response.data || {});
        } catch (error) {
            toast.error('Failed to fetch department info');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data?.id) {
            toast.error('Department data not loaded');
            return;
        }

        setSaving(true);
        try {
            await departmentApi.update(data.id, formData);
            toast.success('Department info updated successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to update department info');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-white">Department Information</h1>
                        <p className="text-slate-400 text-sm">Manage department details displayed on the website</p>
                    </div>
                </div>
                <Button
                    onClick={fetchData}
                    disabled={loading}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-white">Basic Information</CardTitle>
                        <CardDescription className="text-slate-400">
                            Core department details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Department of Basic Science and Humanities"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Short Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.shortName || ''}
                                    onChange={(e) => handleChange('shortName', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="BSH"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Department Description
                            </label>
                            <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                placeholder="About the department..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Vision
                            </label>
                            <textarea
                                value={formData.vision || ''}
                                onChange={(e) => handleChange('vision', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                placeholder="Department vision..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Mission
                            </label>
                            <textarea
                                value={formData.mission || ''}
                                onChange={(e) => handleChange('mission', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                placeholder="Department mission..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Logo
                                </label>
                                <div className="space-y-3">
                                    {formData.logoUrl && (
                                        <div className="relative w-full h-40 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-600 flex items-center justify-center">
                                            <img
                                                src={formData.logoUrl.startsWith('http') ? formData.logoUrl : `/${formData.logoUrl.replace(/^(\/|puppeteer_assets\/)?/, 'puppeteer_assets/').replace(/\/+/g, '/')}`}
                                                alt="Logo Preview"
                                                className="h-full w-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleChange('logoUrl', '')}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            id="file-logo"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const toastId = toast.loading('Uploading logo...');
                                                    try {
                                                        const res = await uploadApi.uploadImage(file);
                                                        handleChange('logoUrl', res.data.url);
                                                        toast.dismiss(toastId);
                                                        toast.success('Logo uploaded successfully');
                                                    } catch (err) {
                                                        toast.dismiss(toastId);
                                                        toast.error('Upload failed');
                                                        console.error(err);
                                                    }
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor="file-logo"
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors w-full border border-slate-600 border-dashed hover:border-solid hover:border-teal-500"
                                        >
                                            <Upload className="w-4 h-4" />
                                            {formData.logoUrl ? 'Change Logo' : 'Upload Logo'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Banner Image
                                </label>
                                <div className="space-y-3">
                                    {formData.bannerUrl && (
                                        <div className="relative w-full h-40 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-600 flex items-center justify-center">
                                            <img
                                                src={formData.bannerUrl.startsWith('http') ? formData.bannerUrl : `/${formData.bannerUrl.replace(/^(\/|puppeteer_assets\/)?/, 'puppeteer_assets/').replace(/\/+/g, '/')}`}
                                                alt="Banner Preview"
                                                className="h-full w-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleChange('bannerUrl', '')}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            id="file-banner"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const toastId = toast.loading('Uploading banner...');
                                                    try {
                                                        const res = await uploadApi.uploadImage(file);
                                                        handleChange('bannerUrl', res.data.url);
                                                        toast.dismiss(toastId);
                                                        toast.success('Banner uploaded successfully');
                                                    } catch (err) {
                                                        toast.dismiss(toastId);
                                                        toast.error('Upload failed');
                                                        console.error(err);
                                                    }
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor="file-banner"
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors w-full border border-slate-600 border-dashed hover:border-solid hover:border-teal-500"
                                        >
                                            <Upload className="w-4 h-4" />
                                            {formData.bannerUrl ? 'Change Banner' : 'Upload Banner'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-700">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
                            >
                                {saving ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default DepartmentManager;

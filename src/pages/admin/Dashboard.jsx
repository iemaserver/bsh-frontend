import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Bell,
    Calendar,
    Award,
    Image,
    BookOpen,
    TrendingUp,
    Eye,
    FileText,
    Activity,
    ArrowUpRight,
    RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
    facultyApi,
    noticesApi,
    eventsApi,
    awardsApi,
    galleryApi,
    publicationsApi
} from '@/lib/adminApi';

const Dashboard = () => {
    const [stats, setStats] = useState({
        faculty: 0,
        notices: 0,
        events: 0,
        awards: 0,
        gallery: 0,
        publications: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentActivity, setRecentActivity] = useState([]);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const [faculty, notices, events, awards, gallery, publications] = await Promise.all([
                facultyApi.getAll(),
                noticesApi.getAll(),
                eventsApi.getAll(),
                awardsApi.getAll(),
                galleryApi.getAll(),
                publicationsApi.getAll()
            ]);

            setStats({
                faculty: faculty.data?.length || 0,
                notices: notices.data?.length || 0,
                events: events.data?.length || 0,
                awards: awards.data?.length || 0,
                gallery: gallery.data?.length || 0,
                publications: publications.data?.length || 0
            });

            // Create recent activity from notices and events
            const allItems = [
                ...(notices.data || []).slice(0, 3).map(n => ({ ...n, type: 'notice' })),
                ...(events.data || []).slice(0, 3).map(e => ({ ...e, type: 'event' }))
            ].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
                .slice(0, 5);

            setRecentActivity(allItems);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Faculty', value: stats.faculty, icon: Users, color: 'from-blue-500 to-blue-600', link: '/admin/faculty' },
        { title: 'Active Notices', value: stats.notices, icon: Bell, color: 'from-amber-500 to-orange-600', link: '/admin/notices' },
        { title: 'Events', value: stats.events, icon: Calendar, color: 'from-violet-500 to-purple-600', link: '/admin/events' },
        { title: 'Awards', value: stats.awards, icon: Award, color: 'from-emerald-500 to-teal-600', link: '/admin/awards' },
        { title: 'Gallery Images', value: stats.gallery, icon: Image, color: 'from-pink-500 to-rose-600', link: '/admin/gallery' },
        { title: 'Publications', value: stats.publications, icon: BookOpen, color: 'from-cyan-500 to-sky-600', link: '/admin/publications' },
    ];

    const quickActions = [
        { title: 'Add Faculty', link: '/admin/faculty', icon: Users },
        { title: 'New Notice', link: '/admin/notices', icon: Bell },
        { title: 'Add Event', link: '/admin/events', icon: Calendar },
        { title: 'Upload Photo', link: '/admin/gallery', icon: Image },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white">Dashboard</h1>
                    <p className="text-slate-400 mt-1">Overview of your website content</p>
                </div>
                <Button
                    onClick={fetchStats}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={stat.link}>
                                <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-slate-400">{stat.title}</p>
                                                <p className="text-3xl font-bold text-white mt-1">
                                                    {loading ? '...' : stat.value}
                                                </p>
                                            </div>
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-4 text-slate-400 text-sm group-hover:text-teal-400 transition-colors">
                                            <span>Manage</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-teal-400" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Common tasks at your fingertips
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <Link key={action.title} to={action.link}>
                                    <Button
                                        className="w-full h-auto py-4 flex flex-col gap-2 bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-sm">{action.title}</span>
                                    </Button>
                                </Link>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-teal-400" />
                            Recent Content
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Latest notices and events
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-12 bg-slate-700/50 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        ) : recentActivity.length > 0 ? (
                            <div className="space-y-3">
                                {recentActivity.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === 'notice'
                                                ? 'bg-amber-500/20 text-amber-400'
                                                : 'bg-violet-500/20 text-violet-400'
                                            }`}>
                                            {item.type === 'notice' ? <Bell className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white truncate">{item.title}</p>
                                            <p className="text-xs text-slate-400">
                                                {item.type === 'notice' ? 'Notice' : 'Event'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-400">
                                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>No recent activity</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* System Info */}
            <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Eye className="w-5 h-5 text-teal-400" />
                        System Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                            <p className="text-xs text-slate-400">API Status</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm text-white">Online</span>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                            <p className="text-xs text-slate-400">Database</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm text-white">Connected</span>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                            <p className="text-xs text-slate-400">Last Updated</p>
                            <p className="text-sm text-white mt-1">{new Date().toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                            <p className="text-xs text-slate-400">Version</p>
                            <p className="text-sm text-white mt-1">1.0.0</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;

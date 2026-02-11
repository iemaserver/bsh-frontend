import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, 
    Check, 
    Trash2, 
    RefreshCw, 
    Mail, 
    User,
    Clock,
    Filter,
    Search,
    Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/api';

const ContactRequestsManager = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await api.get('/contact-requests');
            setRequests(response.data || []);
        } catch (error) {
            toast.error('Failed to fetch contact requests');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await api.patch(`/contact-requests/${id}/read`);
            toast.success('Marked as read');
            fetchRequests();
        } catch (error) {
            toast.error('Failed to mark as read');
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this request?')) return;
        
        try {
            await api.delete(`/contact-requests/${id}`);
            toast.success('Request deleted');
            fetchRequests();
            if (selectedRequest?.id === id) {
                setSelectedRequest(null);
            }
        } catch (error) {
            toast.error('Failed to delete request');
            console.error(error);
        }
    };

    const filteredRequests = requests.filter(request => {
        const matchesFilter = filter === 'all' ? true : 
            filter === 'unread' ? !request.isRead : 
            request.isRead;
        
        const matchesSearch = searchQuery === '' ||
            request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.message.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    const unreadCount = requests.filter(r => !r.isRead).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-white">Contact Requests</h1>
                        <p className="text-slate-400 text-sm">
                            {requests.length} total • {unreadCount} unread
                        </p>
                    </div>
                </div>
                <Button
                    onClick={fetchRequests}
                    disabled={loading}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Filters */}
            <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, email, or message..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-400" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Requests</option>
                                <option value="unread">Unread ({unreadCount})</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Requests List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* List */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-white">Messages</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-4 space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-20 bg-slate-700/50 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        ) : filteredRequests.length === 0 ? (
                            <div className="p-8 text-center text-slate-400">
                                <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No contact requests found</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-700/50 max-h-[600px] overflow-y-auto">
                                {filteredRequests.map((request) => (
                                    <motion.div
                                        key={request.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onClick={() => setSelectedRequest(request)}
                                        className={`p-4 cursor-pointer transition-colors hover:bg-slate-700/30 ${
                                            selectedRequest?.id === request.id ? 'bg-slate-700/50' : ''
                                        } ${!request.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                    <span className="font-medium text-white truncate">
                                                        {request.name}
                                                    </span>
                                                    {!request.isRead && (
                                                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                                                    <Mail className="w-3 h-3" />
                                                    <span className="truncate">{request.email}</span>
                                                </div>
                                                <p className="text-sm text-slate-300 line-clamp-2">
                                                    {request.message}
                                                </p>
                                                <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(request.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Detail View */}
                <AnimatePresence mode="wait">
                    {selectedRequest ? (
                        <motion.div
                            key={selectedRequest.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Card className="bg-slate-800/50 border-slate-700/50 h-full">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-blue-400" />
                                        Message Details
                                    </CardTitle>
                                    {!selectedRequest.isRead && (
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                                            Unread
                                        </span>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">From</label>
                                            <p className="text-white font-medium">{selectedRequest.name}</p>
                                            <a 
                                                href={`mailto:${selectedRequest.email}`}
                                                className="text-blue-400 hover:underline text-sm"
                                            >
                                                {selectedRequest.email}
                                            </a>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Subject</label>
                                            <p className="text-white">{selectedRequest.subject || 'No Subject'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Received</label>
                                            <p className="text-slate-300 text-sm">
                                                {new Date(selectedRequest.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Message</label>
                                            <div className="mt-2 p-4 bg-slate-700/30 rounded-lg">
                                                <p className="text-slate-200 whitespace-pre-wrap">
                                                    {selectedRequest.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                                        {!selectedRequest.isRead && (
                                            <Button
                                                onClick={() => handleMarkAsRead(selectedRequest.id)}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <Check className="w-4 h-4 mr-2" />
                                                Mark as Read
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => handleDelete(selectedRequest.id)}
                                            variant="outline"
                                            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <Card className="bg-slate-800/50 border-slate-700/50 h-full flex items-center justify-center min-h-[400px]">
                            <div className="text-center text-slate-400">
                                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                <p className="text-lg">Select a message to view details</p>
                            </div>
                        </Card>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ContactRequestsManager;
import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Bell,
    Calendar,
    Award,
    Image,
    BookOpen,
    Briefcase,
    FileText,
    Building2,
    GraduationCap,
    Lightbulb,
    Menu,
    X,
    LogOut,
    ChevronDown,
    Settings,
    MessageSquare,
    Megaphone,
    Shield,
    Home,
    Layers,
    Key,
    Lock,
    Mail
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
    {
        title: 'Overview',
        items: [
            { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
            { name: 'Popup Manager', path: '/admin/popups', icon: Megaphone },
        ]
    },
    {
        title: 'Content Management',
        items: [
            { name: 'Faculty', path: '/admin/faculty', icon: Users },
            { name: 'Notices', path: '/admin/notices', icon: Bell },
            { name: 'Events', path: '/admin/events', icon: Calendar },
            { name: 'Awards', path: '/admin/awards', icon: Award },
            { name: 'Photo Gallery', path: '/admin/gallery', icon: Image },
        ]
    },
    {
        title: 'Academic',
        items: [
            { name: 'Journals', path: '/admin/journals', icon: BookOpen },
            { name: 'Conferences', path: '/admin/conferences', icon: Briefcase },
            { name: 'Clubs', path: '/admin/clubs', icon: GraduationCap },
            { name: 'Syllabi', path: '/admin/syllabi', icon: FileText },
            { name: 'Program Outcomes', path: '/admin/program-outcomes', icon: Lightbulb },
        ]
    },
    {
        title: 'Research',
        items: [
            { name: 'Publications', path: '/admin/publications', icon: FileText },
            { name: 'Funded Projects', path: '/admin/funded-projects', icon: Briefcase },
            { name: 'Patents', path: '/admin/patents', icon: Shield },
            { name: 'PhD Students', path: '/admin/phd-students', icon: GraduationCap },
            { name: 'Research Supervisors', path: '/admin/research-supervisors', icon: Users },
        ]
    },
    {
        title: 'Collaborations',
        items: [
            { name: 'MoUs', path: '/admin/mous', icon: Building2 },
            { name: 'Consultancies', path: '/admin/consultancies', icon: Briefcase },
        ]
    },
    {
        title: 'Settings',
        items: [
            { name: 'Department Info', path: '/admin/department', icon: Building2 },
            { name: 'Facilities', path: '/admin/facilities', icon: Layers },
            { name: 'Advisory Board', path: '/admin/advisory-board', icon: Users },
            { name: 'Accreditation', path: '/admin/accreditation', icon: Award },
            { name: 'Contact Info', path: '/admin/contact', icon: MessageSquare },
            { name: 'BoS Meetings', path: '/admin/bos-meetings', icon: Calendar },
        ]
    },
    {
        title: 'Inquiries',
        items: [
            { name: 'Contact Requests', path: '/admin/contact-requests', icon: Mail },
        ]
    }
];

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState(['Overview', 'Content Management']);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSection = (title) => {
        setExpandedSections(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const isActive = (path) => location.pathname === path;

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 border-b border-slate-700/50">
                <Link to="/admin/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h1 className="font-heading font-bold text-white">Admin Panel</h1>
                            <p className="text-xs text-slate-400">IEM BSH Dept.</p>
                        </motion.div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {menuItems.map((section) => (
                    <div key={section.title}>
                        {sidebarOpen && (
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 hover:text-slate-300 transition-colors"
                            >
                                {section.title}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${expandedSections.includes(section.title) ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                        )}
                        <AnimatePresence>
                            {(expandedSections.includes(section.title) || !sidebarOpen) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1"
                                >
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive(item.path)
                                                        ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-400 border border-teal-500/30'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                                    }`}
                                            >
                                                <Icon className={`w-5 h-5 ${isActive(item.path) ? 'text-teal-400' : 'group-hover:text-teal-400'}`} />
                                                {sidebarOpen && <span className="text-sm">{item.name}</span>}
                                            </Link>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-slate-400" />
                    </div>
                    {sidebarOpen && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user?.username}</p>
                            <p className="text-xs text-slate-400">Administrator</p>
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowChangePassword(true)}
                        className="w-full text-slate-400 hover:text-white hover:bg-slate-700/50 justify-start"
                    >
                        <Key className="w-4 h-4" />
                        {sidebarOpen && <span className="ml-2">Change Password</span>}
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/')}
                            className="flex-1 text-slate-400 hover:text-white hover:bg-slate-700/50"
                        >
                            <Home className="w-4 h-4" />
                            {sidebarOpen && <span className="ml-2">View Site</span>}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <LogOut className="w-4 h-4" />
                            {sidebarOpen && <span className="ml-2">Logout</span>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-900 flex">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                className="hidden lg:flex flex-col bg-slate-800/50 border-r border-slate-700/50 backdrop-blur-xl fixed h-full z-30"
            >
                <SidebarContent />
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 z-40"
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-slate-800 z-50 shadow-2xl"
                        >
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className={`flex-1 ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-20'} transition-all duration-300`}>
                {/* Top Bar */}
                <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-4 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden text-slate-400 hover:text-white"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="hidden lg:block text-slate-400 hover:text-white"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h2 className="text-lg font-heading font-semibold text-white">
                                    {menuItems.flatMap(s => s.items).find(i => i.path === location.pathname)?.name || 'Dashboard'}
                                </h2>
                                <p className="text-xs text-slate-400">
                                    Welcome back, {user?.username}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button
                                size="sm"
                                onClick={() => navigate('/')}
                                className="hidden sm:flex bg-blue-600 text-white hover:bg-blue-700"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                View Site
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Change Password Modal */}
            <ChangePasswordModal 
                isOpen={showChangePassword} 
                onClose={() => setShowChangePassword(false)} 
            />
        </div>
    );
};

// Change Password Modal Component
function ChangePasswordModal({ isOpen, onClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    onClose();
                    setSuccess('');
                }, 2000);
            } else {
                setError(data.error || 'Failed to change password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }

        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl max-w-md w-full p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <Lock className="w-5 h-5 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Change Password</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                            {success}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter current password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {loading ? 'Changing...' : 'Change Password'}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default AdminLayout;

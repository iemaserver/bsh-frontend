import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';

// Layout
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

// UI Components
import WebsitePopup from '@/components/ui/WebsitePopup';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useData } from '@/hooks/useData';

// Public Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Faculty from '@/pages/Faculty';
import Academics from '@/pages/Academics';
import Research from '@/pages/Research';
import Events from '@/pages/Events';
import Contact from '@/pages/Contact';
import Notices from '@/pages/Notices';
import Journals from '@/pages/Journals';
import Clubs from '@/pages/Clubs';
import Awards from '@/pages/Awards';
import Gallery from '@/pages/Gallery';
import Consultancy from '@/pages/Consultancy';
import Facilities from '@/pages/Facilities';

// Admin Pages
import AdminLogin from '@/pages/admin/Login';
import Dashboard from '@/pages/admin/Dashboard';
import PopupManager from '@/pages/admin/PopupManager';
import FacultyManager from '@/pages/admin/FacultyManager';
import NoticesManager from '@/pages/admin/NoticesManager';
import EventsManager from '@/pages/admin/EventsManager';
import AwardsManager from '@/pages/admin/AwardsManager';
import GalleryManager from '@/pages/admin/GalleryManager';
import JournalsManager from '@/pages/admin/JournalsManager';
import ConferencesManager from '@/pages/admin/ConferencesManager';
import ClubsManager from '@/pages/admin/ClubsManager';
import PublicationsManager from '@/pages/admin/PublicationsManager';
import FundedProjectsManager from '@/pages/admin/FundedProjectsManager';
import PatentsManager from '@/pages/admin/PatentsManager';
import PhdStudentsManager from '@/pages/admin/PhdStudentsManager';
import ResearchSupervisorsManager from '@/pages/admin/ResearchSupervisorsManager';
import MousManager from '@/pages/admin/MousManager';
import ConsultanciesManager from '@/pages/admin/ConsultanciesManager';
import SyllabiManager from '@/pages/admin/SyllabiManager';
import ProgramOutcomesManager from '@/pages/admin/ProgramOutcomesManager';
import FacilitiesManager from '@/pages/admin/FacilitiesManager';
import AdvisoryBoardManager from '@/pages/admin/AdvisoryBoardManager';
import AccreditationManager from '@/pages/admin/AccreditationManager';
import BosMeetingsManager from '@/pages/admin/BosMeetingsManager';
import DepartmentManager from '@/pages/admin/DepartmentManager';
import ContactManager from '@/pages/admin/ContactManager';
import ContactRequestsManager from '@/pages/admin/ContactRequestsManager';

// Loading Wrapper - Shows loading screen while essential data loads
const LoadingWrapper = ({ children }) => {
    const { isReady, loadingProgress, loadingMessage } = useData();
    
    return (
        <>
            <AnimatePresence>
                {!isReady && (
                    <LoadingScreen 
                        progress={loadingProgress} 
                        message={loadingMessage} 
                    />
                )}
            </AnimatePresence>
            {isReady && children}
        </>
    );
};

// Public Layout wrapper
const PublicLayout = ({ children }) => (
    <>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WebsitePopup />
    </>
);

function AppContent() {
    return (
        <LoadingWrapper>
            <div className="min-h-screen flex flex-col">
                <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                        <Route path="/faculty" element={<PublicLayout><Faculty /></PublicLayout>} />
                        <Route path="/academics" element={<PublicLayout><Academics /></PublicLayout>} />
                        <Route path="/academics/syllabus" element={<PublicLayout><Academics /></PublicLayout>} />
                        <Route path="/academics/program-outcomes" element={<PublicLayout><Academics /></PublicLayout>} />
                        <Route path="/academics/bos-meetings" element={<PublicLayout><Academics /></PublicLayout>} />
                        <Route path="/research" element={<PublicLayout><Research /></PublicLayout>} />
                        <Route path="/research/publications" element={<PublicLayout><Research /></PublicLayout>} />
                        <Route path="/research/projects" element={<PublicLayout><Research /></PublicLayout>} />
                        <Route path="/research/phd" element={<PublicLayout><Research /></PublicLayout>} />
                        <Route path="/research/collaborations" element={<PublicLayout><Research /></PublicLayout>} />
                        <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
                        <Route path="/notices" element={<PublicLayout><Notices /></PublicLayout>} />
                        <Route path="/journals" element={<PublicLayout><Journals /></PublicLayout>} />
                        <Route path="/conferences" element={<PublicLayout><Journals /></PublicLayout>} />
                        <Route path="/clubs" element={<PublicLayout><Clubs /></PublicLayout>} />
                        <Route path="/awards" element={<PublicLayout><Awards /></PublicLayout>} />
                        <Route path="/awards/faculty" element={<PublicLayout><Awards /></PublicLayout>} />
                        <Route path="/awards/student" element={<PublicLayout><Awards /></PublicLayout>} />
                        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
                        <Route path="/consultancy" element={<PublicLayout><Consultancy /></PublicLayout>} />
                        <Route path="/facilities" element={<PublicLayout><Facilities /></PublicLayout>} />
                        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

                        {/* Admin Login (no layout) */}
                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* Protected Admin Routes */}
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="popups" element={<PopupManager />} />
                            <Route path="faculty" element={<FacultyManager />} />
                            <Route path="notices" element={<NoticesManager />} />
                            <Route path="events" element={<EventsManager />} />
                            <Route path="awards" element={<AwardsManager />} />
                            <Route path="gallery" element={<GalleryManager />} />
                            <Route path="journals" element={<JournalsManager />} />
                            <Route path="conferences" element={<ConferencesManager />} />
                            <Route path="clubs" element={<ClubsManager />} />
                            <Route path="publications" element={<PublicationsManager />} />
                            <Route path="funded-projects" element={<FundedProjectsManager />} />
                            <Route path="patents" element={<PatentsManager />} />
                            <Route path="phd-students" element={<PhdStudentsManager />} />
                            <Route path="research-supervisors" element={<ResearchSupervisorsManager />} />
                            <Route path="mous" element={<MousManager />} />
                            <Route path="consultancies" element={<ConsultanciesManager />} />
                            <Route path="syllabi" element={<SyllabiManager />} />
                            <Route path="program-outcomes" element={<ProgramOutcomesManager />} />
                            <Route path="facilities" element={<FacilitiesManager />} />
                            <Route path="advisory-board" element={<AdvisoryBoardManager />} />
                            <Route path="accreditation" element={<AccreditationManager />} />
                            <Route path="bos-meetings" element={<BosMeetingsManager />} />
                            <Route path="department" element={<DepartmentManager />} />
                            <Route path="contact" element={<ContactManager />} />
                            <Route path="contact-requests" element={<ContactRequestsManager />} />
                        </Route>
                    </Routes>
                    <Toaster position="bottom-right" />
                </div>
            </LoadingWrapper>
    );
}

function App() {
    return (
        <AuthProvider>
            <DataProvider>
                <Router>
                    <AppContent />
                </Router>
            </DataProvider>
        </AuthProvider>
    );
}

export default App;

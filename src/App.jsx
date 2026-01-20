import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider } from './context/UserContext';

// Composants Fixes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading'; 
import PageWrapper from './components/PageWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// --- PAGES ---
const Home = lazy(() => import('./pages/Home')); 
const Login = lazy(() => import('./pages/Login'));
const ITCurriculum = lazy(() => import('./components/ITCurriculum'));
const HECCurriculum = lazy(() => import('./components/HECCurriculum'));
const News = lazy(() => import('./pages/News'));
const Showroom = lazy(() => import('./pages/Showroom'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const VerifyStudent = lazy(() => import('./pages/VerifyStudent'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Profile = lazy(() => import('./pages/Profile'));

// Pages Étudiant
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const CareerCenter = lazy(() => import('./pages/CareerCenter'));
const CVGenerator = lazy(() => import('./pages/CVGenerator'));
const Challenges = lazy(() => import('./pages/Challenges'));
const Networking = lazy(() => import('./pages/Networking'));
const Elections = lazy(() => import('./pages/Elections'));

// Pages Admin
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminStudents = lazy(() => import('./pages/admin/AdminStudents'));
const AdminElections = lazy(() => import('./pages/admin/AdminElections'));
const AdminNews = lazy(() => import('./pages/admin/AdminNews'));

function AnimatedRoutes() {
  const location = useLocation();
  const isImmersiveMode = location.pathname.startsWith('/course/') || location.pathname.startsWith('/verify/');

  return (
    <>
      <ScrollToTop />
      {!isImmersiveMode && <Navbar />}
      
      <main className="flex-1 relative min-h-screen">
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              
              {/* === VISITEUR & TOUT PUBLIC === */}
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/formation/informatique" element={<PageWrapper><ITCurriculum /></PageWrapper>} />
              <Route path="/formation/hec" element={<PageWrapper><HECCurriculum /></PageWrapper>} />
              <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
              <Route path="/showroom" element={<PageWrapper><Showroom /></PageWrapper>} />
              <Route path="/project/:id" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
              <Route path="/verify/student/:token" element={<PageWrapper><VerifyStudent /></PageWrapper>} />

              {/* === ÉTUDIANT (Protégé) === */}
              <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
              <Route path="/knowledge" element={<ProtectedRoute><PageWrapper><Knowledge /></PageWrapper></ProtectedRoute>} />
              <Route path="/course/:id" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
              <Route path="/career" element={<ProtectedRoute><PageWrapper><CareerCenter /></PageWrapper></ProtectedRoute>} />
              <Route path="/cv-builder" element={<ProtectedRoute><PageWrapper><CVGenerator /></PageWrapper></ProtectedRoute>} />
              <Route path="/quizz" element={<ProtectedRoute><PageWrapper><Challenges /></PageWrapper></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/network" element={<ProtectedRoute><PageWrapper><Networking /></PageWrapper></ProtectedRoute>} />
              <Route path="/elections" element={<ProtectedRoute><PageWrapper><Elections /></PageWrapper></ProtectedRoute>} />

              {/* === ADMIN === */}
              <Route path="/admin/courses" element={<AdminRoute><PageWrapper><AdminCourses /></PageWrapper></AdminRoute>} />
              <Route path="/admin/students" element={<AdminRoute><PageWrapper><AdminStudents /></PageWrapper></AdminRoute>} />
              <Route path="/admin/elections" element={<AdminRoute><PageWrapper><AdminElections /></PageWrapper></AdminRoute>} />
              <Route path="/admin/news" element={<AdminRoute><PageWrapper><AdminNews /></PageWrapper></AdminRoute>} />
              
              <Route path="*" element={<NotFound />} />

            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isImmersiveMode && <Footer />}
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-ucak-dark text-gray-900 dark:text-white transition-colors duration-300">
          <AnimatedRoutes />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
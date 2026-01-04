import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Pages Publiques
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./pages/About'));
const News = lazy(() => import('./pages/News'));
const Showroom = lazy(() => import('./pages/Showroom'));
const ITCurriculum = lazy(() => import('./components/ITCurriculum'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const VerifyStudent = lazy(() => import('./pages/VerifyStudent'));

// Pages Étudiant
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CareerCenter = lazy(() => import('./pages/CareerCenter'));
const CVGenerator = lazy(() => import('./pages/CVGenerator'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const Challenges = lazy(() => import('./pages/Challenges'));
const Networking = lazy(() => import('./pages/Networking'));
const Elections = lazy(() => import('./pages/Elections'));

// Pages Admin
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminStudents = lazy(() => import('./pages/admin/AdminStudents'));
const AdminElections = lazy(() => import('./pages/admin/AdminElections')); // NOUVEAU
const AdminNews = lazy(() => import('./pages/admin/AdminNews'));           // NOUVEAU

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
              
              {/* === PUBLIQUE === */}
              <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/formation/informatique" element={<PageWrapper><ITCurriculum /></PageWrapper>} />
              <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
              <Route path="/showroom" element={<PageWrapper><Showroom /></PageWrapper>} />
              <Route path="/project/:id" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/verify/student/:token" element={<PageWrapper><VerifyStudent /></PageWrapper>} />

              {/* === ÉTUDIANT === */}
              <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
              <Route path="/career" element={<ProtectedRoute><PageWrapper><CareerCenter /></PageWrapper></ProtectedRoute>} />
              <Route path="/cv-builder" element={<ProtectedRoute><PageWrapper><CVGenerator /></PageWrapper></ProtectedRoute>} />
              <Route path="/knowledge" element={<ProtectedRoute><PageWrapper><Knowledge /></PageWrapper></ProtectedRoute>} />
              <Route path="/course/:id" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
              <Route path="/quizz" element={<ProtectedRoute><PageWrapper><Challenges /></PageWrapper></ProtectedRoute>} />
              <Route path="/network" element={<ProtectedRoute><PageWrapper><Networking /></PageWrapper></ProtectedRoute>} />
              <Route path="/elections" element={<ProtectedRoute><PageWrapper><Elections /></PageWrapper></ProtectedRoute>} />

              {/* === ADMIN (Tous les outils) === */}
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
        <div className="min-h-screen flex flex-col font-sans bg-ucak-light dark:bg-ucak-dark text-ucak-blue dark:text-white selection:bg-ucak-green selection:text-white transition-colors duration-300">
          <AnimatedRoutes />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
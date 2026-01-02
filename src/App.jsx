import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider } from './context/UserContext'; // <--- IMPORT ICI

// Composants Fixes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading'; 
import PageWrapper from './components/PageWrapper';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy Loading
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./pages/About'));
const News = lazy(() => import('./pages/News'));
const Showroom = lazy(() => import('./pages/Showroom'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const Challenges = lazy(() => import('./pages/Challenges'));
const Networking = lazy(() => import('./pages/Networking'));
const Elections = lazy(() => import('./pages/Elections'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CareerCenter = lazy(() => import('./pages/CareerCenter'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();
  const isImmersiveMode = location.pathname.startsWith('/course/');

  return (
    <>
      <ScrollToTop />
      {!isImmersiveMode && <Navbar />}
      
      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Routes Publiques */}
            <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
            <Route path="/showroom" element={<PageWrapper><Showroom /></PageWrapper>} />
            <Route path="/project/:id" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />

            {/* Routes Protégées */}
            <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
            <Route path="/career" element={<ProtectedRoute><PageWrapper><CareerCenter /></PageWrapper></ProtectedRoute>} />
            <Route path="/knowledge" element={<ProtectedRoute><PageWrapper><Knowledge /></PageWrapper></ProtectedRoute>} />
            <Route path="/course/:id" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
            <Route path="/quizz" element={<ProtectedRoute><PageWrapper><Challenges /></PageWrapper></ProtectedRoute>} />
            <Route path="/network" element={<ProtectedRoute><PageWrapper><Networking /></PageWrapper></ProtectedRoute>} />
            <Route path="/elections" element={<ProtectedRoute><PageWrapper><Elections /></PageWrapper></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      {!isImmersiveMode && <Footer />}
    </>
  );
}

function App() {
  return (
    <UserProvider> {/* <--- ENVELOPPER ICI */}
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-ucak-light dark:bg-ucak-dark text-ucak-blue dark:text-white selection:bg-ucak-green selection:text-white transition-colors duration-300">
          <AnimatedRoutes />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
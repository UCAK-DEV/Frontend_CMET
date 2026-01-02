import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Composants Fixes (Chargés immédiatement)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading'; 
import PageWrapper from './components/PageWrapper';

// --- OPTIMISATION : LAZY LOADING DES PAGES ---
// Ces pages ne se chargent que lorsque l'utilisateur clique dessus
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
      
      {/* Suspense affiche le Loading pendant le téléchargement de la page */}
      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
            <Route path="/showroom" element={<PageWrapper><Showroom /></PageWrapper>} />
            <Route path="/project/:id" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
            
            <Route path="/knowledge" element={<PageWrapper><Knowledge /></PageWrapper>} />
            <Route path="/course/:id" element={<CoursePlayer />} />
            
            <Route path="/quizz" element={<PageWrapper><Challenges /></PageWrapper>} />
            <Route path="/network" element={<PageWrapper><Networking /></PageWrapper>} />
            <Route path="/elections" element={<PageWrapper><Elections /></PageWrapper>} />
            
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/career" element={<PageWrapper><CareerCenter /></PageWrapper>} />
            
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
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-ucak-light dark:bg-ucak-dark text-ucak-blue dark:text-white selection:bg-ucak-green selection:text-white transition-colors duration-300">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
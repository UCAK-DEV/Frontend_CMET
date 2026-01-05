import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider, useUser } from './context/UserContext';

// Composants Fixes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading'; 
import PageWrapper from './components/PageWrapper';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading des pages
const Hero = lazy(() => import('./components/Hero'));
const Login = lazy(() => import('./pages/Login')); // Vérifiez que ce fichier existe bien !
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ITCurriculum = lazy(() => import('./components/ITCurriculum'));
const HECCurriculum = lazy(() => import('./components/HECCurriculum'));
const News = lazy(() => import('./pages/News'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const CareerCenter = lazy(() => import('./pages/CareerCenter'));

// Redirige si déjà connecté
const SmartHome = () => {
  const { user } = useUser();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Hero />;
};

function AnimatedRoutes() {
  const location = useLocation();
  // Masquer la Navbar sur la page de Login pour éviter les conflits visuels si souhaité
  // const isAuthPage = location.pathname === '/login'; 

  return (
    <>
      <ScrollToTop />
      <Navbar /> {/* La Navbar est toujours là */}
      
      <main className="flex-1 relative min-h-screen">
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              
              {/* ACCUEIL */}
              <Route path="/" element={<PageWrapper><SmartHome /></PageWrapper>} />

              {/* LOGIN (C'est ici que ça se joue) */}
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />

              {/* FORMATIONS */}
              <Route path="/formation/informatique" element={<PageWrapper><ITCurriculum /></PageWrapper>} />
              <Route path="/formation/hec" element={<PageWrapper><HECCurriculum /></PageWrapper>} />

              {/* AUTRES PAGES */}
              <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
              
              {/* PAGES PROTÉGÉES */}
              <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
              <Route path="/knowledge" element={<ProtectedRoute><PageWrapper><Knowledge /></PageWrapper></ProtectedRoute>} />
              <Route path="/career" element={<ProtectedRoute><PageWrapper><CareerCenter /></PageWrapper></ProtectedRoute>} />
              
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
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
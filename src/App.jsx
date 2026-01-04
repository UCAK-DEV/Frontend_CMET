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

// Lazy Loading des Pages
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
const CVGenerator = lazy(() => import('./pages/CVGenerator'));

// Import de la nouvelle page Formation
const ITCurriculum = lazy(() => import('./components/ITCurriculum'));

const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();
  // Le mode immersif cache Navbar et Footer (Lecteur de cours)
  const isImmersiveMode = location.pathname.startsWith('/course/');

  return (
    <>
      <ScrollToTop />
      
      {/* La Navbar est maintenant fixe en haut (z-50) */}
      {!isImmersiveMode && <Navbar />}
      
      {/* CORRECTION ICI : 
         On a supprimé 'pb-24' car la navigation est maintenant en haut.
         'flex-1' permet au contenu de pousser le footer en bas si la page est courte.
         'relative' permet le positionnement absolu des éléments internes si besoin.
      */}
      <main className="flex-1 relative min-h-screen">
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              
              {/* === ZONE PUBLIQUE (Accessible à tous) === */}
              <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/formation/informatique" element={<PageWrapper><ITCurriculum /></PageWrapper>} />
              <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
              <Route path="/showroom" element={<PageWrapper><Showroom /></PageWrapper>} />
              <Route path="/project/:id" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />

              {/* === ZONE PRIVÉE (Nécessite Connexion) === */}
              <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
              <Route path="/career" element={<ProtectedRoute><PageWrapper><CareerCenter /></PageWrapper></ProtectedRoute>} />
              <Route path="/cv-builder" element={<ProtectedRoute><PageWrapper><CVGenerator /></PageWrapper></ProtectedRoute>} />
              <Route path="/knowledge" element={<ProtectedRoute><PageWrapper><Knowledge /></PageWrapper></ProtectedRoute>} />
              <Route path="/course/:id" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
              <Route path="/quizz" element={<ProtectedRoute><PageWrapper><Challenges /></PageWrapper></ProtectedRoute>} />
              <Route path="/network" element={<ProtectedRoute><PageWrapper><Networking /></PageWrapper></ProtectedRoute>} />
              <Route path="/elections" element={<ProtectedRoute><PageWrapper><Elections /></PageWrapper></ProtectedRoute>} />
              
              {/* === 404 === */}
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
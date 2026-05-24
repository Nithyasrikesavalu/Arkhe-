import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';


// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import Insights from './pages/Insights';

// Scroll Restoration Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page on initial load or browser refresh
    navigate('/');
  }, []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      
      {/* Main Layout Container */}
      <div className="flex flex-col min-h-screen bg-[#F5F0FF] dark:bg-dark-bg text-slate-800 dark:text-slate-200 transition-colors duration-500">
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insights" element={<Insights />} />
            
            {/* Fallback Catch */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Brand Footer */}
        <Footer />



        {/* Premium feedback notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#333333',
              borderRadius: '16px',
              boxShadow: '0 8px 30px rgba(124, 77, 255, 0.08)',
              border: '1px solid rgba(179, 136, 255, 0.2)',
              fontSize: '13px',
              fontWeight: '500',
              padding: '12px 20px',
            },
            success: {
              iconTheme: {
                primary: '#7C4DFF',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
